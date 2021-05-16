export const setSearchFocus = () => {
    document.getElementById("search").focus();
}

export const showClearTextButton = () => {
    const clear = document.getElementById("clear");
    const search = document.getElementById("search");
    if(search.value.length){
        clear.classList.remove("none");
        clear.classList.add("flex");
    } else {
        clear.classList.add("none");
        clear.classList.remove("flex");
    }
}

export const clearSearchText = (event) => {
    event.preventDefault();
    document.getElementById("search").value = "";
    showClearTextButton();
    setSearchFocus();
}

export const clearPushListener = (event) => {
    event.preventDefault();
    if(event.key == "Enter" || event.key == " "){
        document.getElementById("search").click();
    }
}