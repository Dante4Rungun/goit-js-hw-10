import Notiflix from "notiflix";

export default function errorMess(list,info){
    list.innerHTML = ''
    info.innerHTML = ''
    Notiflix.Notify.failure("Oops, there is no country with that name")     
}