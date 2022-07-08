import Notiflix from "notiflix";

function langList(object){
    list = ''
    for (const elem in object){
        list += elem + ', '
    }
    return list.slice(0, -2)
}

function countriesList(list,info,countries){
    list.innerHTML = ''
    info.innerHTML = ''
    let countryList = []
    for (const elem of countries){
        const item = document.createElement('li')
        item.classList.add('country-list__item')

        const img = document.createElement('img')
        img.setAttribute('src',elem.flags.svg)
        img.setAttribute('width','50')
        img.setAttribute('height','50')

        const text = document.createElement('p')
        text.textContent = elem.name.official
        text.classList.add('country-list__name')

        item.append(img)
        item.append(text)

        countryList.push(item)
    }
    //console.log(countryList)
    list.append(...countryList)
}

function countryInfo(list,info,countries){
    list.innerHTML = ''
    info.innerHTML = ''
    for (const elem of countries){
        const div = document.createElement('div')
        div.classList.add('country-info__head')

        const img = document.createElement('img')
        img.setAttribute('src',elem.flags.svg)
        img.setAttribute('width','50')
        img.setAttribute('height','50')

        const text = document.createElement('p')
        text.textContent = elem.name.official
        text.classList.add('country-list__name')

        const capital = document.createElement('p')
        capital.classList.add('country-info__points')
        const capHead = document.createElement('span')
        capHead.textContent = 'Capital: '
        capital.append(capHead)
        capital.append(`${elem.capital}`)

        const population = document.createElement('p')
        population.classList.add('country-info__points')
        const popHead = document.createElement('span')
        popHead.textContent = 'Population: '
        population.append(popHead)
        population.append(`${elem.population}`)

        const languages = document.createElement('p')
        languages.classList.add('country-info__points')
        const lanHead = document.createElement('span')
        lanHead.textContent = 'Languages: '
        languages.append(lanHead)
        languages.append(`${langList(elem.languages)}`)

        div.append(img)
        div.append(text)

        info.append(div)
        info.append(capital)
        info.append(population)
        info.append(languages)
    }
}

function warning(list,info){
    list.innerHTML = ''
    info.innerHTML = ''
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")  
}

function errorMess(list,info){
    list.innerHTML = ''
    info.innerHTML = ''
    Notiflix.Notify.failure("Oops, there is no country with that name")     
}

function displayCountries(list,info,countries){
    //console.log("countries inside then callback: ", countries);          
    if (countries.length > 10){
        warning(list,info)
    }
    else if (countries.length > 1) {
        countriesList(list,info,countries)
    }
    else if (countries.length = 1){
        countryInfo(list,info,countries)
    }
}

export default function fetchCountries(value,list,info){
    if(value != ""){
        return fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .then(countries => {
            displayCountries(list,info,countries)
        })
        .catch(error => {
            errorMess(list,info)
          })
    }
    else {
        list.innerHTML = ''
    }
}