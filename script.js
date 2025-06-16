const form = document.getElementById("form");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = `Create a recipe using the following ingredients: ${userInput.value}.`;
    const apiKey = "YOUR_API_KEY";
    resultDiv.textContent = "Generating...";

    try {
        const response = await fetch(`https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&key=${apiKey}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error('Error en la red');
        }

        const data = await response.json();
        resultDiv.textContent = data.result;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});