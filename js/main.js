let countries = []

fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => {
  countries = data.slice(0, 15)
  countriesRender(countries, elFlagsList)
  regionFilter(countries, elOptionsList)
  function searchCountry(evt){
    evt.preventDefault()
   let searchedCountries = countries.filter((country) => {
    let regex = new RegExp(elSearch.value, 'gi')
    let countryName = country.name.common.match(regex)


    let filteredByRegion = elOptionsList.value === "0" ? country.region : elOptionsList.value === country.region
     return countryName && filteredByRegion
   })
   countriesRender(searchedCountries, elFlagsList)
  }
  elFilterForm.addEventListener('submit', searchCountry)
})
const elHeader = document.querySelector('.site-header')
const elHeaderBtn = document.querySelector('.js-header-btn')
const elMain = document.querySelector('.site-main')

// site-header--white

elHeaderBtn.addEventListener('click', () => {
  elHeader.classList.toggle('site-header--white')
  elMain.classList.toggle('site-main--white')
})
const selectElement = (element, parentElement = document) => parentElement.querySelector(element)
const createDOM = (element) => document.createElement(element)
const elCountryTemplate = selectElement(".flags-template").content
let elFlagsList = selectElement(".flags__list")
const elOptionsList = selectElement(".flags__select")
const elSearch = selectElement(".flags__input")
const elFilterForm = selectElement(".flags__form")


function countriesRender(countryArr, element){
  element.innerHTML = null

  countryArr.forEach(country => {
    let countryTemplate = elCountryTemplate.cloneNode(true)
    
    selectElement(".flags__item-img", countryTemplate).src = country.flags.png
    selectElement(".flags__item-tile", countryTemplate).textContent = country.name.common
    selectElement("#population", countryTemplate).textContent = country.population
    selectElement("#region", countryTemplate).textContent = country.region
    selectElement("#capital", countryTemplate).textContent = country.capital

    element.append(countryTemplate)
  });
}

function regionRender(regionsArr, optionList){
  regionsArr.forEach(element => {
    const option = createDOM("option")
    option.textContent = element
    option.value = element
    optionList.append(option)
  })
}
function regionFilter(countriesArr, optionList){
  let filteredRegions = []
  for (const country of countriesArr) {
    let region = country.region
    if (filteredRegions.includes(region)) {
      continue
    }
    filteredRegions.push(region)
  }
  regionRender(filteredRegions, optionList)
}
