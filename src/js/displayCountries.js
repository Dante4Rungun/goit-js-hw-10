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
        capital.append(`Capital: ${elem.capital}`)

        const population = document.createElement('p')
        population.classList.add('country-info__points')
        population.append(`Population: ${elem.population}`)

        const languages = document.createElement('p')
        languages.classList.add('country-info__points')
        languages.append(`Languages: ${langList(elem.languages)}`)

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

export default function displayCountries(list,info,countries){
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
