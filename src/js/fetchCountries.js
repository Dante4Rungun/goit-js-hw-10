import displayCountries from "./displayCountries";
import errorMess from "./errorMess";

export default function fetchCountries(value,list,info){
    if(value != ""){
        return fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw Error(`is not ok: ` + resp.status);
            }
            else {
                return response.json()
            }
        })
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
