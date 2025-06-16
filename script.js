const form = document.getElementById("form");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = userInput.value;

    resultDiv.textContent = "Generating...";

    try {
        const response = await fetch("/.netlify/functions/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
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