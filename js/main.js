"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Rami Kassab
 */

// Hämtar formuläret och sökfältet från HTML-dokumentet
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");

// Hämtar elementet där meddelande recept ska visas
const errorMessage = document.getElementById("error");
const messageElement = document.getElementById("message");
const recipeElement = document.getElementById("recipe");

//Hanterar när användaren skickar in formuläret
searchForm.addEventListener("submit", function (event) {

// Förhindrar att formuläret skickas på vanligt sätt
    event.preventDefault(); 

    // Hämtar värdet från sökfältet
    const searchTerm = searchInput.value.trim();

    //Rensar tidigare felmeddelande
    errorMessage.textContent = "";

    //Kontrollerar om sökfältet är tomt
    if (searchTerm === "") {
        errorMessage.textContent = "Vänligen ange en sökfras.";
        return;
    }

    //Hämtar receptdata från API:et med den angivna sökfrasen
    fetchRecipe(searchTerm)
});


//Hämtar receptdata från API:et
async function fetchRecipe(searchTerm){
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

        // Rensar tidigare meddelanden
        messageElement.textContent = "";

    try {
        //Hämtar data från API:et
        const response = await fetch(url);
        //Kontrollerar om svaret är OK
        if (!response.ok) {
            throw new Error("Något gick fel vid hämtning av receptdata.");
        }
        //Konverterar svaret från JSON till Javaskript-data
        const data = await response.json();
        //kontrollerar att svaret innehåller receptdata
        if(!data.recipes || !Array.isArray(data.recipes)) {
            throw new Error("Receptdata saknas i svaret från API:et.");
        }

    //Kontrollerar om några recept hittades
    if (data.recipes.length === 0) {
        messageElement.textContent = "Inga recept hittades för sökfrasen: " + searchTerm;
        recipeElement.innerHTML = "";
        return;
    }

    // Hämtar det första receptet
    const recipe = data.recipes[0];
    
   //Visar receptet på sidan
    displayRecipe(recipe);

    }catch (error) {
        //tar bort tidigare recept från sidan
        recipeElement.innerHTML = "";

        //Visar felmeddelandet på sidan
        messageElement.textContent = 
        "Ett fel uppstod vid hämtning av receptdata. Vänligen försök igen senare.";
        //Visar information om felet i konsolen för felsökning
        console.error("Fel vid hämtning av receptdata:", error);
    }
}

//Skapar och visar receptet på sidan
function displayRecipe(recipe) {
     //Tar bort tidigare recept från sidan
    recipeElement.innerHTML = "";

    // Skapar ett nytt artikel-element för att visa receptet
    const articleElement = document.createElement("article");

    //Skapar en ny rubrik för receptet
    const titleElement = document.createElement("h3");
    titleElement.textContent = recipe.name;

    //Lägger rubriken i artikel-elementet
    articleElement.appendChild(titleElement);

    //skapar en bild för receptet
    const imageElement = document.createElement("img");
    //Sätter alt-texten för bilden
    imageElement.alt = 'Bild av ' + recipe.name;
    
    //Hämtar bildens URL från receptdata och sätter den som källan för bilden
    imageElement.src = recipe.image;

    //Lägger bilden i artikel-elementet
    articleElement.appendChild(imageElement);

    //skapar en behållare för receptinformationen
    const recipeInfo = document.createElement("div");
    recipeInfo.className = "recipe-info";

    //Skapar ett stycke för antal portioner
    const servingsElement = document.createElement("p");
    servingsElement.textContent = "Antal portioner: " + recipe.servings;

    //Lägger informationen i behållaren för receptinformationen
    recipeInfo.appendChild(servingsElement);

    //Skapar ett stycke för förberedelsetiden
    const prepTimeElement = document.createElement("p");
    prepTimeElement.textContent = "Förberedelsetid: " + recipe.prepTimeMinutes + " minuter";

    //Lägger förberedelsetiden i behållaren
    recipeInfo.appendChild(prepTimeElement);
    const cookTimeElement = document.createElement("p");
    cookTimeElement.textContent = "Tillagningstid: " + recipe.cookTimeMinutes + " minuter";

    //Lägger tillagningstiden i behållaren
    recipeInfo.appendChild(cookTimeElement);

    //Skapar ett stycke för svårighetsgraden
    const difficultyElement = document.createElement("p");
    difficultyElement.textContent = "Svårighetsgrad: " + recipe.difficulty;

    //Lägger svårighetsgraden i behållaren
    recipeInfo.appendChild(difficultyElement);

    //Lägger behållaren i artikeln
    articleElement.appendChild(recipeInfo);

    //Skapar en rubrik för ingredienserna
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredienser:";

    //Lägger ingredienserna i artikeln
    articleElement.appendChild(ingredientsTitle);

    //Skapar en lista för ingredienserna
    const ingredientsList = document.createElement("ul");

    //Går igenom varje ingrediens i receptet och skapar ett listobjekt för varje ingrediens
    recipe.ingredients.forEach(function (ingredient) {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
    });

    //Lägger listan med ingredienser i artikeln
    articleElement.appendChild(ingredientsList);

    //Skapar en rubrik för instruktionerna
    const instructionsTitle = document.createElement("h4");
    instructionsTitle.textContent = "Instruktioner:";

    //Lägger rubriken i artikeln
    articleElement.appendChild(instructionsTitle);

    //Skapar en numrerad lista för instruktionerna
    const instructionsList = document.createElement("ol");

    //Går igenom varje instruktion och skapar ett listobject 
    recipe.instructions.forEach(function (instruction) {
        const instructionItem = document.createElement("li");
        instructionItem.textContent = instruction;
        instructionsList.appendChild(instructionItem);
    });

    //Lägger listan med instruktioner i artikeln
    articleElement.appendChild(instructionsList);

    //Lägger artikeln i receptsektionen på sidan
    recipeElement.appendChild(articleElement);

}