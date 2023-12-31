"use strict";

let displayTerm = "";
let url = "";
let offsetValue = 0;

const prefix = "arj5881-";
const favoritesKey = prefix + "favorites";

let localArray = JSON.parse(localStorage.getItem(favoritesKey));

// create a key using the prefix
// create an array object using data from the local storage
    // access the data using the newly created key

// if the object is null, create an empty array

// when the a gif is removed / added to the favorites array
    // update array object
    // update local storage

// display favorites just displays each gif link in the array


window.onload = (e) => {
    document.querySelector("#search").onclick = displaySearch;
    document.querySelector("#favorites").onclick = displayFavorites;
    document.querySelector("#trend").onclick = displayTrending;
    document.querySelector("#next").onclick = nextClicked;
    document.querySelector("#previous").onclick = previousClicked;

    if (!localArray)
    {
        localArray = [];
    }
} 




function displaySearch() {
    offsetValue = 0;

    console.log("standard search initiated");

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
    let GIPHY_KEY = "zvaeWpD8U8jaNc39d8kXPgFVFGBGghxm";

    url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let limit = document.querySelector('#limit').value;
    url += "&limit=" + limit;

    let rating = document.querySelector('#rating').value;

    if (rating != "none") { url += "&rating=" + rating; }

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term.trim();
    term = encodeURIComponent(term);

    if (term.length < 1) { return; }

    url += "&q=" + term;
     
    console.log(url);

    getData(url);
}

function displayFavorites() {
    offsetValue = 0; // for now, the favorites display will show ALL of the favorites, hopefully able to seperate by offset value down the line

    console.log("pulling up locally stored favorites");

    document.querySelector("#content").innerHTML = "";

    for (let i = 0; i < localArray.length; i++)
    {
        document.querySelector("#content").innerHTML += localArray[i];
    }

    for(let button of document.querySelectorAll("#content button.favorite"))
    {
        button.onclick = checkFavorites;
    }

    for(let button of document.querySelectorAll("#content button.download"))
    {
        button.onclick = grabGIF;
    }
}

function displayTrending() {
    offsetValue = 0;

    console.log("looking for today's trending gifs");
    
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/trending?";
    let GIPHY_KEY = "zvaeWpD8U8jaNc39d8kXPgFVFGBGghxm";

    url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let limit = document.querySelector('#limit').value;
    url += "&limit=" + limit;

    let rating = document.querySelector('#rating').value;

    if (rating != "none") { url += "&rating=" + rating; }
     
    console.log(url);

    getData(url);
}





function checkFavorites(e) {
    let item = "<div class='result'>" + e.target.parentNode.parentNode.parentNode.innerHTML + "</div>";

    if (localArray.length == 0)
    {
        localArray.push(item);
    }

    else
    {
        for (let i = 0; i < localArray.length; i++)
        {
            if (item == localArray[i])
            {
                localArray.splice(i, 1);
                break;
            }

            else if (i == localArray.length - 1)
            {
                localArray.push(item);
                break; // array is now larger, need to break before next loop
            }
        }
    }
    localStorage.setItem(favoritesKey, JSON.stringify(localArray));
}

function grabGIF() {
    console.log("file has been downloaded! Or maybe copied to clipboard...");
}




function nextClicked() {
    if (url)
    {
        offsetValue += parseInt(document.querySelector('#limit').value);
        
        getData(url + "&offset=" + offsetValue);
    }
}

function previousClicked() {
    if (url)
    {
        offsetValue -= parseInt(document.querySelector('#limit').value);

        if (offsetValue < 0) { offsetValue = 0; }

        getData(url + "&offset=" + offsetValue)
    }
}




function getData(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET",url);
    xhr.send();
}



// Callback functions
function dataLoaded(e) {
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    if (!obj.data || obj.data.length == 0)
    {
        document.querySelector("#content").innerHTML = "No results found..."
        return;
    }

    let results = obj.data;

    let bigString = "";

    for (let i = 0; i < results.length; i++)
    {
        let result = results[i];

        let imgURL = result.images.fixed_width.url;

        if (!imgURL)
        {
            imgURL = "images/notFoundIMG.png";
        }

        let line = `<div class='result'><img src='${imgURL}' title='${result.id}' class='GIF'/><div class='underGIF'>`;
        line += `<p class='rating'>Rated: ${result.rating.toUpperCase()}</p>`;
        line += `<a target='_blank' href='${result.url}' class='sourceChunk'><button type="button" class='source'>Source</button></a>`;
        line += `<button type="button" class="favorite"><img src='images/emptyStar.png' /></button>`;
        line += `<a href='' download='${result.id}' class='sourceChunk'><button type="button" class="download"><img src='images/download.png' /></button></a></div></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    for(let button of document.querySelectorAll("#content button.favorite"))
    {
        button.onclick = checkFavorites;
    }

    for(let button of document.querySelectorAll("#content button.download"))
    {
        button.onclick = grabGIF;
    }
}

function dataError() {
    console.log("An error occured");
}