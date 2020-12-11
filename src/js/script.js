document.addEventListener("DOMContentLoaded", function(){

    /*var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters


        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })*/


/*----------------------------------------------------------------------------------*/
    console.log('Parfait');
    let intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page
    const $scrollButton = document.querySelector('.retour'); // Reference to our scroll button

    function scrollStep() {
        // Check if we're at the top already. If so, stop scrolling by clearing the interval
        if (window.pageYOffset === 0) {
            clearInterval(intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
    }

    function scrollToTop() {
        // Call the function scrollStep() every 16.66 millisecons
        intervalId = setInterval(scrollStep, 16.66);
    }

// When the DOM is loaded, this click handler is added to our scroll button
    $scrollButton.addEventListener('click', scrollToTop);
/*----------------------------------------------------------------------------------*/

console.log("Ça fonctionne!!!");

var hamburgers = document.querySelectorAll('.hamburger');
var menuMobile = document.querySelector('.nav-primary-mobile');

for(let i = 0 ; i < hamburgers.length; i++){
    var hamburger = hamburgers[i];
    hamburger.addEventListener('click',openMenu);
}


function openMenu(evt){
    evt.preventDefault();

    var cible = evt.currentTarget;


    if(cible.classList.contains('open')){
        cible.classList.remove('open');
        menuMobile.classList.remove('open');
    }else{
        cible.classList.add("open");
        menuMobile.classList.add("open");
    }

}

/*----------------------------------------------------------------------------------*/
let connexion = new MovieDB();
//connexion.requeteDernierFilm();


 if(document.location.pathname.search('fiche-film.html')> 0){
    let params = new URL(document.location).searchParams;
    console.log(params)
    connexion.requeteInfoFilm(params.get('id'));
    connexion.requeteActeur(params.get('id'));
 }else{
     connexion.requeteDernierFilm();


     connexion.requeteCarouselFilm();
 }

 console.log(document.location.pathname.search);


});

class MovieDB{

    constructor(){
        console.log("new MovieDB()");
        this.apiKey = "62eff024c4b8a88d46d11bee98418750";
        this.lang = "fr-Ca";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;
        this.totalActeur = 6;
    }

    requeteDernierFilm(){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        requete.open('GET', this.baseUrl +"movie/top_rated?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
        requete.send();

    }
    retourDernierFilm(event){
        //console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results
        this.afficherDernierFilm(data);

    }
    afficherDernierFilm(data){
        //console.log('afficherDernierFilm')

        let section = document.querySelector(".liste-films");
        console.log(section);

        for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);


            let unArticle =  document.querySelector(".template>article.film").cloneNode(true);


            unArticle.querySelector("h2").innerHTML = data[i].title;
            unArticle.querySelector("h3").innerHTML = data[i].vote_average;
            unArticle.querySelector("h4").innerHTML = data[i].release_date;
            unArticle.querySelector("p.description").innerHTML = data[i].overview || "pas de description";

            let src = this.imgPath + "w185" + data[i].poster_path;
            //console.log(src);
            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            unArticle.querySelector('a').href = "fiche-film.html?id=" + data[i].id;

            section.appendChild(unArticle);


            document.querySelector(".liste-films").appendChild(unArticle);
        }
    }

    requeteCarouselFilm(){

        let carrousel =  new XMLHttpRequest();
        carrousel.addEventListener("loadend", this.retourCarrouselFilm.bind(this));
        carrousel.open('GET', this.baseUrl +"movie/popular?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
        carrousel.send();
    }
    retourCarrouselFilm(event){
        console.log('retourCarrouselFilm');
        let targetC = event.currentTarget;
        let dataC = JSON.parse(targetC.responseText).results
        this.afficherCarrouselFilm(dataC);
        //console.log(targetC.responseText);
    }
    afficherCarrouselFilm(dataC){



        //this.totalFilm = 9;
        for (let i = 0; i < this.totalFilm; i++) {

            console.log(dataC[i]);
            let unArticle = document.querySelector(".template-c>article.filmswiper").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = dataC[i].title;


            document.querySelector(".swiper-wrapper").appendChild(unArticle);

        }
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters


            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })
    }


    requeteInfoFilm(movieId){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourInfoFilm.bind(this));
        requete.open('GET', this.baseUrl +"movie/" + movieId + "?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
        requete.send();

    }
    retourInfoFilm(event){
        //console.log("retourInfoFilm")
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText)
        console.log(data);

        this.afficherInfoFilm(data);

    }
    afficherInfoFilm(data){
        console.log(data)
        this.requeteActeur();

        document.querySelector('h2').innerHTML = data.title;
        document.querySelector('p').innerHTML = data.overview;
        document.querySelector('h4').innerHTML = data.release_date;
        document.querySelector('.fiche-film h3').innerHTML = data.vote_average;

    }


    requeteActeur(movieId){

        let requete = new XMLHttpRequest();
        requete.addEventListener("readystatechange", this.retourActeur.bind(this));
        requete.open("GET", this.baseUrl + "movie/" + movieId + "/credits?api_key=" + this.apiKey);
        requete.send();
    }
    retourActeur(event){
        let target = event.currentTarget; //XMLHttpRequest
        let data;
        if (target.readyState === target.DONE) {
            data = JSON.parse(target.responseText).cast;
            this.afficheActeur(data);
        }
    }
    afficheActeur(data){


        for (let i = 0; i < this.totalActeur; i++) {

            console.log(data[i].name);
            let unActeur = document.querySelector(".template>article.acteur").cloneNode(true);

            unActeur.querySelector("h1").innerText = data[i].name;
            //let uneImage = unActeur.querySelector("img");
            //uneImage.setAttribute("src", this.imgPath + "w" + this.largeurTeteAffiche[1] + data[i].profile_path);


            document.querySelector("div.swiper-wrapper").appendChild(unActeur);
        }
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters


            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })

    }
}

