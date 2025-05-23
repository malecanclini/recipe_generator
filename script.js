const form = document.getElementById("form");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = userInput.value;

  resultDiv.textContent = "Generating...";

  const response = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  resultDiv.textContent = data.result;
});
