// Get DOM elements for manipulation
const serachBtn = document.querySelector('#search-btnn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Adding EventListners
serachBtn.addEventListener('click', getMealLIst);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>{
    mealDetailsContent.parentElement.classList.remove('showRecipe')
});



// Function to get meal lists
function getMealLIst() {
    let searchInputText = document.querySelector('#search-input').value
    // Using Fetch APi
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let mealsHTML = ``;
        if (data.meals) {
            data.meals.forEach(meal => {
                mealsHTML +=`
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="http://" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>`;
            });
            mealList.classList.remove('notfound')
        } else {
            mealsHTML= 'Sorry, we didnt find any meal!';
            mealList.classList.add('notfound');
        }

        mealList.innerHTML = mealsHTML;
    });
}

// Function to get meal Recipe

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// Recipe Create modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let recipeHTML = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="pic">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>`;
    mealDetailsContent.innerHTML = recipeHTML;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}