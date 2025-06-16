function displayRecipe(response) {
  // Selecciona el elemento HTML donde se mostrará la receta
  let recipeElement = document.querySelector("#recipe");
  // Borra cualquier contenido previo en el elemento de la receta
  recipeElement.innerHTML = "";

  // Utiliza Typewriter.js para mostrar la respuesta de la IA de forma animada
  new Typewriter("#recipe", {
    strings: response.data.answer, // El texto de la receta generada por la IA
    autoStart: true, // Inicia la animación automáticamente
    delay: 1, // Retraso entre caracteres para el efecto de escritura
    cursor: "", // Oculta el cursor al finalizar la escritura
  });
}

// Clave API para la llamada al servicio de IA (mantén tu clave aquí)
let apiKey = "4c2d34edtb05a9b0ao32170dd17e08f4";
// URL base de la API de SheCodes AI
let apiURL =
  "https://api.shecodes.io/ai/v1/generate?prompt={prompt}&context={context}&key={key}";

function generateRecipe(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  // Obtiene el valor del campo de entrada del usuario (ingredientes o tipo de cocina)
  let instructionsInput = document.querySelector(".instructions");
  // Crea el prompt para la IA, pidiéndole una receta basada en la entrada del usuario
  let prompt = `Genera una receta para "${instructionsInput.value}"`;
  // Define el contexto para la IA, indicándole que actúe como un chef experto y cómo formatear la respuesta
  let context =
    "Eres un chef profesional y un experto en recetas. Tu misión es generar una receta simple y deliciosa basada en la entrada del usuario. La receta debe incluir un título claro (usando <h3>), una lista de ingredientes (usando <ul> con <li> para cada ingrediente), y pasos de instrucción claros (usando <ol> con <li> para cada paso). Asegúrate de que cada ingrediente y cada paso de instrucción estén en su propia línea. Al final de la receta, firma con 'SheCodes AI Recipes' dentro de un elemento <strong>, y NO al principio del texto.";
  // Crea el objeto de parámetros para la solicitud a la API
  let params = {
    prompt: prompt,
    context: context,
    key: apiKey,
  };

  // Selecciona el elemento de la receta y lo hace visible
  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  // Muestra un mensaje de carga mientras se genera la receta
  recipeElement.innerHTML = `<div class="generating">⏳ Generando una receta para ${instructionsInput.value}...</div>`;

  // Realiza la llamada a la API de SheCodes AI
  axios
    .get(apiURL, { params })
    .then((response) => {
      // Si la llamada es exitosa, muestra la receta generada
      displayRecipe(response);
    })
    .catch((error) => {
      // Si hay un error, lo registra en la consola y muestra un mensaje al usuario
      console.error("Error generando la receta:", error);
      recipeElement.innerHTML =
        "Error generando la receta. Por favor, inténtalo de nuevo.";
    });
}

// Selecciona el formulario y añade un 'event listener' para cuando se envíe
let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);