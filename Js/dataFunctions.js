const getSearchTerm = () => {
    let rawSearchTerm = document.getElementById("search").value.trim();
    const regex = /[ ]{2,}/gi;
    let searchTerm = rawSearchTerm.replaceAll(regex," ");
    return searchTerm;
}

export const retrieveSearchResults = async () => {
    let searchTerm = getSearchTerm();
    let wikiSearchString = getWikiSearchString(searchTerm);
    let wikiSearchResult = await requestData(wikiSearchString);
    let resultsArray = [];
    if(wikiSearchResult.hasOwnProperty("query"))
        resultsArray = processWikiResult(wikiSearchResult.query.pages);
    return resultsArray;
}

const getWikiSearchString = (searchTerm) => {
    let maxChars = getMaxChars();
    let rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    let searchString = encodeURI(rawSearchString);
    return searchString;
}

const getMaxChars = () => {
    let width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if(width < 414) maxChars = 65;
    else if(width >= 414 && width < 1400) maxChars = 100;
    else maxChars = 130;
    return maxChars; 
}

const requestData = async (searchString) => {
    try{
        let response = await fetch(searchString);
        let data = await response.json();
        return data;
    } catch(err){
        console.error(err);
    }
}

const processWikiResult = (result) => {
   let resultsArray = [];
   Object.keys(result).forEach(key => {
       let id = key;
       let title = result[key].title;
       let text = result[key].extract;
       let image = result[key].hasOwnProperty("thumbnail") ? result[key].thumbnail.source : null;
       let item = {
           id: id,
           title: title,
           text: text,
           image: image
       }
       resultsArray.push(item);
   });
   return resultsArray;
}