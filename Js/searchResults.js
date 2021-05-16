export const deleteSearchResults = () => {
    const parent = document.getElementById("searchResults");
    while(parent.lastElementChild){
        let item = parent.lastElementChild;
        parent.removeChild(item);
    }
    clearStatsLine();
} 

export const clearStatsLine = () => {
    const stats = document.getElementById("stats");
    stats.textContent = "";
}

export const buildSearchResults = (resultsArray) => {
    const searchResults = document.getElementById("searchResults");
    resultsArray.forEach(result => {
        let resultItem = createResultItem(result);
        let resultContents = document.createElement("div");
        resultContents.classList.add("resultContents");
        let resultImage = createResultImage(result);
        if(resultImage) resultContents.append(resultImage);
        let resultText = createResultText(result);
        resultContents.append(resultText);
        resultItem.append(resultContents);
        searchResults.append(resultItem);
    });
}

const createResultItem = (result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("resultItem");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("resultTitle");
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem; 
}

const createResultImage = (result) => {
    if(result.image){
        const resultImage = document.createElement("div");
        resultImage.classList.add("resultImage");
        const image = document.createElement("img");
        image.src = result.image;
        resultImage.append(image);
        return resultImage;
    }
    return null;
}

const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("resultText");
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("resultDescription");
    resultDescription.textContent = result.text;
    resultText.append(resultDescription);
    return resultText;
}

export const setStatsLine = (numberOfResults) => {
    const stats = document.getElementById("stats");
    if(numberOfResults){
        stats.textContent = `Displaying ${numberOfResults} results.`;
    } else {
        stats.textContent = "Sorry, no results :(";
    }
}