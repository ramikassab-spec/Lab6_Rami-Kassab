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

    const response = await fetch(url);
    const data = await response.json();


    //Kontrollerar om några recept hittades
    if (data.recipes.length === 0) {
        messageElement.textContent = "Inga recept hittades för sökfrasen: " + searchTerm;
        recipeElement.innerHTML = "";
        return;
    }

    // Hämtar det första receptet
    const recipe = data.recipes[0];
    
    //Tar bort tidigare recept från sidan
    recipeElement.innerHTML = "";

    // Skapar ett nytt artikel-element för att visa receptet
    const articleElement = document.createElement("article");

    //Skapar en ny rubrik för receptet
    const titleElement = document.createElement("h3");
    titleElement.textContent = recipe.name;

    //Lägger rubriken i artikel-elementet
    articleElement.appendChild(titleElement);

    //Lägger rubriken i artikel-elementet
    recipeElement.appendChild(articleElement);
}