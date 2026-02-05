// ------------------ RecipeJS App (IIFE) ------------------
const RecipeApp = (() => {

    console.log("RecipeApp initializing...");

    // ------------------ Recipe Data ------------------
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish.",
            category: "pasta",
            ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Black pepper"],
            steps: [
                "Boil pasta",
                "Cook pancetta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Beat eggs with parmesan",
                        "Mix with pancetta"
                    ]
                },
                "Combine pasta with sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken in spiced sauce.",
            category: "curry",
            ingredients: ["Chicken", "Yogurt", "Garam masala", "Tomato puree", "Cream"],
            steps: [
                "Marinate chicken",
                "Cook chicken in oven",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Sauté onions and garlic",
                        "Add tomato puree",
                        "Add cream and spices"
                    ]
                },
                "Combine chicken with sauce",
                "Garnish and serve"
            ]
        }
    ];

    // ------------------ DOM Elements ------------------
    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll(".filters button");
    const sortButtons = document.querySelectorAll(".sorts button");

    // ------------------ App State ------------------
    let currentFilter = "all";
    let currentSort = "none";

    // ------------------ Recursive Step Renderer ------------------
    const renderSteps = (steps) => {
        let html = "<ol>";

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else if (step.text && step.substeps) {
                html += `<li>${step.text}`;
                html += renderSteps(step.substeps); // recursion
                html += "</li>";
            }
        });

        html += "</ol>";
        return html;
    };

    // ------------------ Create Recipe Card ------------------
    const createRecipeCard = (recipe) => `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <p>${recipe.time} min | ${recipe.difficulty}</p>
            <p>${recipe.description}</p>

            <button class="toggle-btn" 
                data-recipe-id="${recipe.id}" 
                data-toggle="steps">
                Show Steps
            </button>

            <button class="toggle-btn" 
                data-recipe-id="${recipe.id}" 
                data-toggle="ingredients">
                Show Ingredients
            </button>

            <div class="steps-container" 
                data-recipe-id="${recipe.id}" 
                style="display:none;">
                ${renderSteps(recipe.steps)}
            </div>

            <div class="ingredients-container" 
                data-recipe-id="${recipe.id}" 
                style="display:none;">
                <ul>
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

    // ------------------ Filter Function (Pure) ------------------
    const filterRecipes = (recipes, filter) => {
        if (filter === "all") return recipes;
        if (filter === "quick") return recipes.filter(r => r.time <= 30);
        return recipes.filter(r => r.difficulty === filter);
    };

    // ------------------ Sort Function (Pure) ------------------
    const sortRecipes = (recipes, sortType) => {
        if (sortType === "name") {
            return [...recipes].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }

        if (sortType === "time") {
            return [...recipes].sort((a, b) =>
                a.time - b.time
            );
        }

        return recipes;
    };

    // ------------------ Render ------------------
    const renderRecipes = (recipesToRender) => {
        recipeContainer.innerHTML =
            recipesToRender.map(createRecipeCard).join("");
    };

    // ------------------ Update Display ------------------
    const updateDisplay = () => {
        const filtered = filterRecipes(recipes, currentFilter);
        const sorted = sortRecipes(filtered, currentSort);
        renderRecipes(sorted);
    };

    // ------------------ Event Delegation ------------------
    recipeContainer.addEventListener("click", (e) => {

        if (!e.target.classList.contains("toggle-btn")) return;

        const recipeId = e.target.dataset.recipeId;
        const toggleType = e.target.dataset.toggle;

        const container = document.querySelector(
            `.${toggleType}-container[data-recipe-id="${recipeId}"]`
        );

        if (!container) return;

        const isVisible = container.style.display === "block";

        container.style.display = isVisible ? "none" : "block";

        e.target.textContent =
            (isVisible ? "Show " : "Hide ") +
            (toggleType === "steps" ? "Steps" : "Ingredients");
    });

    // ------------------ Filter Buttons ------------------
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            updateDisplay();
        });
    });

    // ------------------ Sort Buttons ------------------
    sortButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentSort = button.dataset.sort;
            updateDisplay();
        });
    });

    // ------------------ Init ------------------
    const init = () => {
        console.log("RecipeApp ready!");
        updateDisplay();
    };

    return { init };

})();

// Initialize App
RecipeApp.init();
