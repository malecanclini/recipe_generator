const form = document.getElementById("form");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = `Generate a simple recipe using these ingredients: ${userInput.value}.`;
    const apiKey = "4c2d34edtb05a9b0ao32170dd17e08f4"; // Asegúrate de que la API key esté entre comillas
    
    const context = "You are a cooking expert. Could you generate a simple recipe for the user who indicates the ingredients available in their fridge?";

    resultDiv.textContent = "Generating...";

    try {
        const response = await fetch(`https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error('Network error');
        }

        const data = await response.json();
        console.log(data); // Verifica la respuesta

        const recipe = data.result || data.recipe || "No recipe generated. Please check the ingredients or try again.";
        resultDiv.innerHTML = `<h2>Generated Recipe</h2><p>${recipe}</p>`;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});