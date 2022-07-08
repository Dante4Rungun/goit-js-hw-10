import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const search = document.getElementById('search-box')

const DEBOUNCE_DELAY = 300;

const list = document.querySelector('.country-list')
const info = document.querySelector('.country-info')

const countrySearch = debounce((value) => {
    fetchCountries(value,list,info)
},DEBOUNCE_DELAY)

search.addEventListener("input", (event) => {
    countrySearch(event.target.value.trim())
})

