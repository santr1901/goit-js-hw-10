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
    const inputCountryName = event.target.value.trim();

    if (inputCountryName === "") {
        clearList();
        return;
    } 
    
    fetchCountries(inputCountryName)
        .then(data => {
                if (data.length === 1) {
                clearList();
                countryCard(data) 
            } else if (data.length > 1 && data.length <= 10) {
                clearInfo();
                clearList();
                countriesList(data) 
            } else if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } 
                     
        }).catch(error => {
            console.log(error)
          Notiflix.Notify.failure("Oops, there is no country with that name");  
      
    })
}

function countriesList(data) {
 const markupCountriesList = data.map(({ name, flags }) =>
    `<li class="country-item" ><img src=${flags.svg} width="30" height="15">
    <b>${name.official}</b>
        </li>`
    ).join("");
   
    // countryList.innerHTML = markupCountriesList;
    countryList.insertAdjacentHTML("afterbegin", markupCountriesList)
    countryList.style.listStyle = "none";
}

function countryCard(data) {
    const markupCountryCard = data.map(({ name, capital, population, languages, flags }) =>
        `<div><img src=${flags.svg} width="40" height="20">
    <strong>${name.official}</strong>
        </div>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Language:</strong> ${Object.values(languages)}</p>`
    ).join("");
    
    info.innerHTML = markupCountryCard;
}
    
function clearInfo() {
    info.innerHTML = "";
}

function clearList() {
    countryList.innerHTML = ""
}
