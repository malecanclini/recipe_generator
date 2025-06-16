const form = document.getElementById("form");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ingredients = userInput.value;

    resultDiv.textContent = "Searching for recipes...";

    try {
        // Buscar recetas en TheMealDB
        const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredients)}`);
        
        if (!mealResponse.ok) {
            throw new Error('Network error for meal search');
        }

        const mealData = await mealResponse.json();
        if (mealData.meals) {
            resultDiv.innerHTML = `<h2>Possible Meals</h2><ul>`;
            mealData.meals.forEach(meal => {
                resultDiv.innerHTML += `<li>${meal.strMeal}</li>`;
            });
            resultDiv.innerHTML += `</ul>`;
        } else {
            resultDiv.innerHTML = `<p>No meals found for the given ingredients.</p>`;
        }
        
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});