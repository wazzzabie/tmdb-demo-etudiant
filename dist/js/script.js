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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvKnZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHJcblxyXG4gICAgICAgIC8vIElmIHdlIG5lZWQgcGFnaW5hdGlvblxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQW5kIGlmIHdlIG5lZWQgc2Nyb2xsYmFyXHJcbiAgICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1zY3JvbGxiYXInLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KSovXHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGNvbnNvbGUubG9nKCdQYXJmYWl0Jyk7XHJcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IDA7IC8vIE5lZWRlZCB0byBjYW5jZWwgdGhlIHNjcm9sbGluZyB3aGVuIHdlJ3JlIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2VcclxuICAgIGNvbnN0ICRzY3JvbGxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV0b3VyJyk7IC8vIFJlZmVyZW5jZSB0byBvdXIgc2Nyb2xsIGJ1dHRvblxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFN0ZXAoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgYXQgdGhlIHRvcCBhbHJlYWR5LiBJZiBzbywgc3RvcCBzY3JvbGxpbmcgYnkgY2xlYXJpbmcgdGhlIGludGVydmFsXHJcbiAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5wYWdlWU9mZnNldCAtIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcclxuICAgICAgICAvLyBDYWxsIHRoZSBmdW5jdGlvbiBzY3JvbGxTdGVwKCkgZXZlcnkgMTYuNjYgbWlsbGlzZWNvbnNcclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoc2Nyb2xsU3RlcCwgMTYuNjYpO1xyXG4gICAgfVxyXG5cclxuLy8gV2hlbiB0aGUgRE9NIGlzIGxvYWRlZCwgdGhpcyBjbGljayBoYW5kbGVyIGlzIGFkZGVkIHRvIG91ciBzY3JvbGwgYnV0dG9uXHJcbiAgICAkc2Nyb2xsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9Ub3ApO1xyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuY29uc29sZS5sb2coXCLDh2EgZm9uY3Rpb25uZSEhIVwiKTtcclxuXHJcbnZhciBoYW1idXJnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhhbWJ1cmdlcicpO1xyXG52YXIgbWVudU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtcHJpbWFyeS1tb2JpbGUnKTtcclxuXHJcbmZvcihsZXQgaSA9IDAgOyBpIDwgaGFtYnVyZ2Vycy5sZW5ndGg7IGkrKyl7XHJcbiAgICB2YXIgaGFtYnVyZ2VyID0gaGFtYnVyZ2Vyc1tpXTtcclxuICAgIGhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsb3Blbk1lbnUpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb3Blbk1lbnUoZXZ0KXtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBjaWJsZSA9IGV2dC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuXHJcbiAgICBpZihjaWJsZS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSl7XHJcbiAgICAgICAgY2libGUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG1lbnVNb2JpbGUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY2libGUuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbiAgICAgICAgbWVudU1vYmlsZS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG4vL2Nvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcblxyXG4gaWYoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKCdmaWNoZS1maWxtLmh0bWwnKT4gMCl7XHJcbiAgICBsZXQgcGFyYW1zID0gbmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikuc2VhcmNoUGFyYW1zO1xyXG4gICAgY29uc29sZS5sb2cocGFyYW1zKVxyXG4gICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KCdpZCcpKTtcclxuICAgIGNvbm5leGlvbi5yZXF1ZXRlQWN0ZXVyKHBhcmFtcy5nZXQoJ2lkJykpO1xyXG4gfWVsc2V7XHJcbiAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG5cclxuXHJcbiAgICAgY29ubmV4aW9uLnJlcXVldGVDYXJvdXNlbEZpbG0oKTtcclxuIH1cclxuXHJcbiBjb25zb2xlLmxvZyhkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2gpO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuY2xhc3MgTW92aWVEQntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IE1vdmllREIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiNjJlZmYwMjRjNGI4YTg4ZDQ2ZDExYmVlOTg0MTg3NTBcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNhXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy50b3RhbEZpbG0gPSA4O1xyXG4gICAgICAgIHRoaXMudG90YWxBY3RldXIgPSA2O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpe1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL3RvcF9yYXRlZD9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpXHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnZvdGVfYXZlcmFnZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoNFwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnJlbGVhc2VfZGF0ZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJwYXMgZGUgZGVzY3JpcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3JjKTtcclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YVtpXS50aXRsZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlQ2Fyb3VzZWxGaWxtKCl7XHJcblxyXG4gICAgICAgIGxldCBjYXJyb3VzZWwgPSAgbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgY2Fycm91c2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyQ2Fycm91c2VsRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjYXJyb3VzZWwub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL3BvcHVsYXI/YXBpX2tleT1cIisgdGhpcy5hcGlLZXkgK1wiJmxhbmd1YWdlPVwiKyB0aGlzLmxhbmcgK1wiJnBhZ2U9MVwiKTtcclxuICAgICAgICBjYXJyb3VzZWwuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmV0b3VyQ2Fycm91c2VsRmlsbShldmVudCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckNhcnJvdXNlbEZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0QyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGFDID0gSlNPTi5wYXJzZSh0YXJnZXRDLnJlc3BvbnNlVGV4dCkucmVzdWx0c1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJDYXJyb3VzZWxGaWxtKGRhdGFDKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldEMucmVzcG9uc2VUZXh0KTtcclxuICAgIH1cclxuICAgIGFmZmljaGVyQ2Fycm91c2VsRmlsbShkYXRhQyl7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy90aGlzLnRvdGFsRmlsbSA9IDk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhQ1tpXSk7XHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlLWM+YXJ0aWNsZS5maWxtc3dpcGVyXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YUNbaV0udGl0bGU7XHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItd3JhcHBlclwiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG15U3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gTmF2aWdhdGlvbiBhcnJvd3NcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIEFuZCBpZiB3ZSBuZWVkIHNjcm9sbGJhclxyXG4gICAgICAgICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1zY3JvbGxiYXInLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJJbmZvRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArXCJtb3ZpZS9cIiArIG1vdmllSWQgKyBcIj9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuICAgIHJldG91ckluZm9GaWxtKGV2ZW50KXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicmV0b3VySW5mb0ZpbG1cIilcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckluZm9GaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuICAgIGFmZmljaGVySW5mb0ZpbG0oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICB0aGlzLnJlcXVldGVBY3RldXIoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDInKS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lckhUTUwgPSBkYXRhLm92ZXJ2aWV3O1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2g0JykuaW5uZXJIVE1MID0gZGF0YS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpY2hlLWZpbG0gaDMnKS5pbm5lckhUTUwgPSBkYXRhLnZvdGVfYXZlcmFnZTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVBY3RldXIobW92aWVJZCl7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCB0aGlzLnJldG91ckFjdGV1ci5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVXJsICsgXCJtb3ZpZS9cIiArIG1vdmllSWQgKyBcIi9jcmVkaXRzP2FwaV9rZXk9XCIgKyB0aGlzLmFwaUtleSk7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZXRvdXJBY3RldXIoZXZlbnQpe1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0OyAvL1hNTEh0dHBSZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGE7XHJcbiAgICAgICAgaWYgKHRhcmdldC5yZWFkeVN0YXRlID09PSB0YXJnZXQuRE9ORSkge1xyXG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5jYXN0O1xyXG4gICAgICAgICAgICB0aGlzLmFmZmljaGVBY3RldXIoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWZmaWNoZUFjdGV1cihkYXRhKXtcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEFjdGV1cjsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgdW5BY3RldXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlPmFydGljbGUuYWN0ZXVyXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQWN0ZXVyLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKS5pbm5lclRleHQgPSBkYXRhW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIC8vbGV0IHVuZUltYWdlID0gdW5BY3RldXIucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAgICAgLy91bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5pbWdQYXRoICsgXCJ3XCIgKyB0aGlzLmxhcmdldXJUZXRlQWZmaWNoZVsxXSArIGRhdGFbaV0ucHJvZmlsZV9wYXRoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2LnN3aXBlci13cmFwcGVyXCIpLmFwcGVuZENoaWxkKHVuQWN0ZXVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG15U3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gTmF2aWdhdGlvbiBhcnJvd3NcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIEFuZCBpZiB3ZSBuZWVkIHNjcm9sbGJhclxyXG4gICAgICAgICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1zY3JvbGxiYXInLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
