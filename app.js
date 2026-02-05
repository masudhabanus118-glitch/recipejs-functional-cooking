// Recipe Data Array
const recipes = [
  {
    id: 1,
    title: "Spaghetti Aglio e Olio",
    time: 20,
    difficulty: "easy",
    description: "A simple Italian pasta made with garlic, olive oil, and chili flakes.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    time: 25,
    difficulty: "easy",
    description: "Quick and healthy stir-fried vegetables with soy sauce.",
    category: "vegetarian"
  },
  {
    id: 3,
    title: "Chicken Biryani",
    time: 75,
    difficulty: "hard",
    description: "Aromatic rice dish layered with spiced chicken and herbs.",
    category: "curry"
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    time: 45,
    difficulty: "medium",
    description: "Creamy tomato-based curry with soft paneer cubes.",
    category: "curry"
  },
  {
    id: 5,
    title: "Caesar Salad",
    time: 15,
    difficulty: "easy",
    description: "Crisp lettuce tossed with Caesar dressing and croutons.",
    category: "salad"
  },
  {
    id: 6,
    title: "Beef Wellington",
    time: 90,
    difficulty: "hard",
    description: "Tender beef wrapped in puff pastry and baked to perfection.",
    category: "main-course"
  },
  {
    id: 7,
    title: "Mushroom Risotto",
    time: 50,
    difficulty: "medium",
    description: "Creamy Italian rice cooked slowly with mushrooms and broth.",
    category: "pasta"
  },
  {
    id: 8,
    title: "Chocolate Lava Cake",
    time: 35,
    difficulty: "medium",
    description: "Rich chocolate cake with a gooey molten center.",
    category: "dessert"
  }
];

// Select Container
const recipeContainer = document.querySelector("#recipe-container");

// Create Recipe Card
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// Render Recipes
const renderRecipes = (recipeArray) => {
  const recipeHTML = recipeArray
    .map(recipe => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

// Initialize App
renderRecipes(recipes);
