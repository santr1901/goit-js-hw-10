import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const search = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const info = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;


search.addEventListener("input", debounce((readInput), DEBOUNCE_DELAY));

function readInput(event) {
    const inputCountryName = event.target.value;

    fetchCountries(inputCountryName)
        .then(data => {
            if (data.length === 1) {
                clearList();
                countryCard(data) 
            } else if (data.length > 1 && data.length <= 10) {
                clearInfo();
                countriesList(data) 
            } else if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }    
                     
        })
}

function countriesList(data) {
 const markupCountriesList = data.map(({ name, flags }) =>
    `<li><img src=${flags.svg} width=40px height=20px>
    <h2>${name.official}</h2>
        </li>`
    ).join("");
    
    countryList.innerHTML = markupCountriesList;
}

function countryCard(data) {
    const markupCountryCard = data.map(({ name, capital, population, languages, flags }) =>
        `<div><img src=${flags.svg} width=40px height=20px>
    <h2>${name.official}</h2>
        </div>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Language: ${Object.values(languages)}</p>`
    ).join("");
    
    info.innerHTML = markupCountryCard;
}
    
function clearInfo() {
    info.innerHTML = "";
}

function clearList() {
    countryList.innerHTML = ""
}
