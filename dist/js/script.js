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
        this.largeurAffiche = ["92", "154", "185", "342", "500", "780"];
        this.largeurTeteAffiche = ["45", "185"];
        this.totalFilm = 9;
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

        let thing = document.querySelector(".fiche-film");

        thing.querySelector('h2').innerHTML = data.title;
        thing.querySelector('p').innerHTML = data.overview;
        thing.querySelector('.date').innerHTML = data.release_date;
        thing.querySelector('.langue').innerHTML = "Langue : " + data.original_language;
        thing.querySelector('.duree').innerHTML = "Durée : " + data.runtime + " mins";
        thing.querySelector('.budget').innerHTML = "Budget : " + data.budget +"$";
        thing.querySelector('.recette').innerHTML = "Revenu : " + data.revenue +"$";
        thing.querySelector('.fiche-film h3').innerHTML = data.vote_average;

        let src = this.imgPath + "w185" + data.poster_path;

        let uneImage = thing.querySelector("img");
        uneImage.setAttribute("src", src);
        uneImage.setAttribute("alt", data.title || "pas de photo");
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



        this.totalFilm = 9;
        //this.totalFilm = 9;
        for (let i = 0; i < this.totalFilm; i++) {

            console.log(dataC[i]);
            let unArticle = document.querySelector(".template-c>article.filmswiper").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = dataC[i].title;
            unArticle.querySelector("h3").innerHTML = dataC[i].vote_average;

            let src = this.imgPath + "w185" + dataC[i].poster_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", dataC[i].title);

            unArticle.querySelector('a').href = "fiche-film.html?id=" + dataC[i].id;

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

    requeteActeur(movieId){

        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourActeur.bind(this));
        requete.open("GET", this.baseUrl + "movie/" + movieId + "/credits?api_key=" + this.apiKey+"&language="+ this.lang +"&page=1");
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


            let src = this.imgPath + "w185" + data[i].profile_path;

            let uneImage = unActeur.querySelector("img");
            uneImage.setAttribute("src", src) ;
            uneImage.setAttribute("alt", data.title || "pas de photo");



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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvKnZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHJcblxyXG4gICAgICAgIC8vIElmIHdlIG5lZWQgcGFnaW5hdGlvblxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQW5kIGlmIHdlIG5lZWQgc2Nyb2xsYmFyXHJcbiAgICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1zY3JvbGxiYXInLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KSovXHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGNvbnNvbGUubG9nKCdQYXJmYWl0Jyk7XHJcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IDA7IC8vIE5lZWRlZCB0byBjYW5jZWwgdGhlIHNjcm9sbGluZyB3aGVuIHdlJ3JlIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2VcclxuICAgIGNvbnN0ICRzY3JvbGxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV0b3VyJyk7IC8vIFJlZmVyZW5jZSB0byBvdXIgc2Nyb2xsIGJ1dHRvblxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFN0ZXAoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgYXQgdGhlIHRvcCBhbHJlYWR5LiBJZiBzbywgc3RvcCBzY3JvbGxpbmcgYnkgY2xlYXJpbmcgdGhlIGludGVydmFsXHJcbiAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5wYWdlWU9mZnNldCAtIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcclxuICAgICAgICAvLyBDYWxsIHRoZSBmdW5jdGlvbiBzY3JvbGxTdGVwKCkgZXZlcnkgMTYuNjYgbWlsbGlzZWNvbnNcclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoc2Nyb2xsU3RlcCwgMTYuNjYpO1xyXG4gICAgfVxyXG5cclxuLy8gV2hlbiB0aGUgRE9NIGlzIGxvYWRlZCwgdGhpcyBjbGljayBoYW5kbGVyIGlzIGFkZGVkIHRvIG91ciBzY3JvbGwgYnV0dG9uXHJcbiAgICAkc2Nyb2xsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9Ub3ApO1xyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuY29uc29sZS5sb2coXCLDh2EgZm9uY3Rpb25uZSEhIVwiKTtcclxuXHJcbnZhciBoYW1idXJnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhhbWJ1cmdlcicpO1xyXG52YXIgbWVudU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtcHJpbWFyeS1tb2JpbGUnKTtcclxuXHJcbmZvcihsZXQgaSA9IDAgOyBpIDwgaGFtYnVyZ2Vycy5sZW5ndGg7IGkrKyl7XHJcbiAgICB2YXIgaGFtYnVyZ2VyID0gaGFtYnVyZ2Vyc1tpXTtcclxuICAgIGhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsb3Blbk1lbnUpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb3Blbk1lbnUoZXZ0KXtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBjaWJsZSA9IGV2dC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuXHJcbiAgICBpZihjaWJsZS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSl7XHJcbiAgICAgICAgY2libGUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG1lbnVNb2JpbGUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY2libGUuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbiAgICAgICAgbWVudU1vYmlsZS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG4vL2Nvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcblxyXG4gaWYoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKCdmaWNoZS1maWxtLmh0bWwnKT4gMCl7XHJcbiAgICBsZXQgcGFyYW1zID0gbmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikuc2VhcmNoUGFyYW1zO1xyXG4gICAgY29uc29sZS5sb2cocGFyYW1zKVxyXG4gICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KCdpZCcpKTtcclxuICAgIGNvbm5leGlvbi5yZXF1ZXRlQWN0ZXVyKHBhcmFtcy5nZXQoJ2lkJykpO1xyXG5cclxuIH1lbHNle1xyXG4gICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcblxyXG4gICAgIGNvbm5leGlvbi5yZXF1ZXRlQ2Fyb3VzZWxGaWxtKCk7XHJcbiB9XHJcblxyXG4gY29uc29sZS5sb2coZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKTtcclxuXHJcblxyXG59KTtcclxuXHJcbmNsYXNzIE1vdmllREJ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBNb3ZpZURCKClcIik7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIjYyZWZmMDI0YzRiOGE4OGQ0NmQxMWJlZTk4NDE4NzUwXCI7XHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DYVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9cIjtcclxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xyXG4gICAgICAgIHRoaXMubGFyZ2V1ckFmZmljaGUgPSBbXCI5MlwiLCBcIjE1NFwiLCBcIjE4NVwiLCBcIjM0MlwiLCBcIjUwMFwiLCBcIjc4MFwiXTtcclxuICAgICAgICB0aGlzLmxhcmdldXJUZXRlQWZmaWNoZSA9IFtcIjQ1XCIsIFwiMTg1XCJdO1xyXG4gICAgICAgIHRoaXMudG90YWxGaWxtID0gOTtcclxuICAgICAgICB0aGlzLnRvdGFsQWN0ZXVyID0gNjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpe1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL3RvcF9yYXRlZD9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpXHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnZvdGVfYXZlcmFnZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoNFwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnJlbGVhc2VfZGF0ZTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTg1XCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNyYyk7XHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5ocmVmID0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJJbmZvRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArXCJtb3ZpZS9cIiArIG1vdmllSWQgKyBcIj9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuICAgIHJldG91ckluZm9GaWxtKGV2ZW50KXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicmV0b3VySW5mb0ZpbG1cIilcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckluZm9GaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuICAgIGFmZmljaGVySW5mb0ZpbG0oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICB0aGlzLnJlcXVldGVBY3RldXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHRoaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWNoZS1maWxtXCIpO1xyXG5cclxuICAgICAgICB0aGluZy5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGEudGl0bGU7XHJcbiAgICAgICAgdGhpbmcucXVlcnlTZWxlY3RvcigncCcpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXc7XHJcbiAgICAgICAgdGhpbmcucXVlcnlTZWxlY3RvcignLmRhdGUnKS5pbm5lckhUTUwgPSBkYXRhLnJlbGVhc2VfZGF0ZTtcclxuICAgICAgICB0aGluZy5xdWVyeVNlbGVjdG9yKCcubGFuZ3VlJykuaW5uZXJIVE1MID0gXCJMYW5ndWUgOiBcIiArIGRhdGEub3JpZ2luYWxfbGFuZ3VhZ2U7XHJcbiAgICAgICAgdGhpbmcucXVlcnlTZWxlY3RvcignLmR1cmVlJykuaW5uZXJIVE1MID0gXCJEdXLDqWUgOiBcIiArIGRhdGEucnVudGltZSArIFwiIG1pbnNcIjtcclxuICAgICAgICB0aGluZy5xdWVyeVNlbGVjdG9yKCcuYnVkZ2V0JykuaW5uZXJIVE1MID0gXCJCdWRnZXQgOiBcIiArIGRhdGEuYnVkZ2V0ICtcIiRcIjtcclxuICAgICAgICB0aGluZy5xdWVyeVNlbGVjdG9yKCcucmVjZXR0ZScpLmlubmVySFRNTCA9IFwiUmV2ZW51IDogXCIgKyBkYXRhLnJldmVudWUgK1wiJFwiO1xyXG4gICAgICAgIHRoaW5nLnF1ZXJ5U2VsZWN0b3IoJy5maWNoZS1maWxtIGgzJykuaW5uZXJIVE1MID0gZGF0YS52b3RlX2F2ZXJhZ2U7XHJcblxyXG4gICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGEucG9zdGVyX3BhdGg7XHJcblxyXG4gICAgICAgIGxldCB1bmVJbWFnZSA9IHRoaW5nLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyYyk7XHJcbiAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGEudGl0bGUgfHwgXCJwYXMgZGUgcGhvdG9cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZUNhcm91c2VsRmlsbSgpe1xyXG5cclxuICAgICAgICBsZXQgY2Fycm91c2VsID0gIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIGNhcnJvdXNlbC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckNhcnJvdXNlbEZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgY2Fycm91c2VsLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArXCJtb3ZpZS9wb3B1bGFyP2FwaV9rZXk9XCIrIHRoaXMuYXBpS2V5ICtcIiZsYW5ndWFnZT1cIisgdGhpcy5sYW5nICtcIiZwYWdlPTFcIik7XHJcbiAgICAgICAgY2Fycm91c2VsLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJldG91ckNhcnJvdXNlbEZpbG0oZXZlbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXRvdXJDYXJyb3VzZWxGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldEMgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhQyA9IEpTT04ucGFyc2UodGFyZ2V0Qy5yZXNwb25zZVRleHQpLnJlc3VsdHNcclxuICAgICAgICB0aGlzLmFmZmljaGVyQ2Fycm91c2VsRmlsbShkYXRhQyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXRDLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9XHJcbiAgICBhZmZpY2hlckNhcnJvdXNlbEZpbG0oZGF0YUMpe1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMudG90YWxGaWxtID0gOTtcclxuICAgICAgICAvL3RoaXMudG90YWxGaWxtID0gOTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxGaWxtOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFDW2ldKTtcclxuICAgICAgICAgICAgbGV0IHVuQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGUtYz5hcnRpY2xlLmZpbG1zd2lwZXJcIikuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhQ1tpXS50aXRsZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS5pbm5lckhUTUwgPSBkYXRhQ1tpXS52b3RlX2F2ZXJhZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTg1XCIgKyBkYXRhQ1tpXS5wb3N0ZXJfcGF0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFDW2ldLnRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YUNbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci13cmFwcGVyXCIpLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgcGFyYW1ldGVyc1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlIG5lZWQgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBOYXZpZ2F0aW9uIGFycm93c1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gQW5kIGlmIHdlIG5lZWQgc2Nyb2xsYmFyXHJcbiAgICAgICAgICAgIHNjcm9sbGJhcjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXNjcm9sbGJhcicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlQWN0ZXVyKG1vdmllSWQpe1xyXG5cclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJBY3RldXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVybCArIFwibW92aWUvXCIgKyBtb3ZpZUlkICsgXCIvY3JlZGl0cz9hcGlfa2V5PVwiICsgdGhpcy5hcGlLZXkrXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmV0b3VyQWN0ZXVyKGV2ZW50KXtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDsgLy9YTUxIdHRwUmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgIGlmICh0YXJnZXQucmVhZHlTdGF0ZSA9PT0gdGFyZ2V0LkRPTkUpIHtcclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkuY2FzdDtcclxuICAgICAgICAgICAgdGhpcy5hZmZpY2hlQWN0ZXVyKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFmZmljaGVBY3RldXIoZGF0YSl7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxBY3RldXI7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS5uYW1lKTtcclxuICAgICAgICAgICAgbGV0IHVuQWN0ZXVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmFjdGV1clwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFjdGV1ci5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJUZXh0ID0gZGF0YVtpXS5uYW1lO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucHJvZmlsZV9wYXRoO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BY3RldXIucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyYykgO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YS50aXRsZSB8fCBcInBhcyBkZSBwaG90b1wiKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5zd2lwZXItd3JhcHBlclwiKS5hcHBlbmRDaGlsZCh1bkFjdGV1cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gSWYgd2UgbmVlZCBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBBbmQgaWYgd2UgbmVlZCBzY3JvbGxiYXJcclxuICAgICAgICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
