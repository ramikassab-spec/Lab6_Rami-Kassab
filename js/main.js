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
