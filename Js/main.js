import {
    retrieveSearchResults
} from "./dataFunctions.js";

import {
    setSearchFocus,
    showClearTextButton,
    clearSearchText,
    clearPushListener
} from "./searchBar.js";

import {
    deleteSearchResults,
    clearStatsLine,
    buildSearchResults,
    setStatsLine
} from "./searchResults.js";

document.addEventListener("readystatechange", (event)=>{
    if(event.target.readyState === "complete") initApp();
});

function initApp() {
    setSearchFocus();
    const search = document.getElementById("search");
    search.addEventListener("input",showClearTextButton);
    const clear = document.getElementById("clear");
    clear.addEventListener("click",clearSearchText);
    clear.addEventListener("keydown",clearPushListener);
    const form = document.getElementById("searchBar");
    form.addEventListener("submit",submitTheSearch);
}

const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
}

const processTheSearch = async () => {
    clearStatsLine();
    let searchTerm = document.getElementById("search").value;
    if(!searchTerm.length) return;
    const resultsArray = await retrieveSearchResults();
    if(resultsArray.length) buildSearchResults(resultsArray);
    setStatsLine(resultsArray.length);
}