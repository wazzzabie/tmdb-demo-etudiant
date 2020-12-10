document.addEventListener("DOMContentLoaded", function(){

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
connexion.requeteDernierFilm();
//connexion.requeteCarouselFilm();





});

class MovieDB{

    constructor(){
        console.log("new MovieDB()");
        this.apiKey = "62eff024c4b8a88d46d11bee98418750";
        this.lang = "fr-Ca";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;
    }

    requeteDernierFilm(){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        requete.open('GET', this.baseUrl +"movie/top_rated?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
        requete.send();

    }

    /*requeteCarouselFilm(){

        let carrousel =  new XMLHttpRequest();
        carrousel.addEventListener("loadend", this.retourCarrouselFilm.bind(this));
        carrousel.open('GET', this.baseUrl +"movie/popular?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
        carrousel.send();
    }*/



    retourDernierFilm(event){
        //console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results
        this.afficherDernierFilm(data);

    }

    /*retourCarrouselFilm(event){
        console.log('retourCarrouselFilm');
        let targetC = event.currentTarget;
        let dataC = JSON.parse(targetC.responseText).results
        this.afficherCarrouselFilm(dataC);
        //console.log(targetC.responseText);
    }*/

    afficherDernierFilm(data){
        //console.log('afficherDernierFilm')
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

            /*article.querySelector('a').href="fiche-film.html?id=" + data[i];

            section.appendChild(article);*/


            document.querySelector(".liste-films").appendChild(unArticle);
        }
    }

    /*afficherCarrouselFilm(dataC){


        //this.totalFilm = 9;
        for (let i = 0; i < this.totalFilm; i++) {
            console.log(dataC[i]);
            let unArticle = document.querySelector(".template-c>article.filmswiper").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = dataC[i].title;


            document.querySelector(".carrousel").appendChild(unArticle);
        }
    }*/
}


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcblxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBOYXZpZ2F0aW9uIGFycm93c1xyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFuZCBpZiB3ZSBuZWVkIHNjcm9sbGJhclxyXG4gICAgICAgIHNjcm9sbGJhcjoge1xyXG4gICAgICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuICAgICAgICB9LFxyXG4gICAgfSlcclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgY29uc29sZS5sb2coJ1BhcmZhaXQnKTtcclxuICAgIGxldCBpbnRlcnZhbElkID0gMDsgLy8gTmVlZGVkIHRvIGNhbmNlbCB0aGUgc2Nyb2xsaW5nIHdoZW4gd2UncmUgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZVxyXG4gICAgY29uc3QgJHNjcm9sbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXRvdXInKTsgLy8gUmVmZXJlbmNlIHRvIG91ciBzY3JvbGwgYnV0dG9uXHJcblxyXG4gICAgZnVuY3Rpb24gc2Nyb2xsU3RlcCgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSdyZSBhdCB0aGUgdG9wIGFscmVhZHkuIElmIHNvLCBzdG9wIHNjcm9sbGluZyBieSBjbGVhcmluZyB0aGUgaW50ZXJ2YWxcclxuICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgd2luZG93LnBhZ2VZT2Zmc2V0IC0gNTApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgICAgIC8vIENhbGwgdGhlIGZ1bmN0aW9uIHNjcm9sbFN0ZXAoKSBldmVyeSAxNi42NiBtaWxsaXNlY29uc1xyXG4gICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChzY3JvbGxTdGVwLCAxNi42Nik7XHJcbiAgICB9XHJcblxyXG4vLyBXaGVuIHRoZSBET00gaXMgbG9hZGVkLCB0aGlzIGNsaWNrIGhhbmRsZXIgaXMgYWRkZWQgdG8gb3VyIHNjcm9sbCBidXR0b25cclxuICAgICRzY3JvbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb1RvcCk7XHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5jb25zb2xlLmxvZyhcIsOHYSBmb25jdGlvbm5lISEhXCIpO1xyXG5cclxudmFyIGhhbWJ1cmdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGFtYnVyZ2VyJyk7XHJcbnZhciBtZW51TW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1wcmltYXJ5LW1vYmlsZScpO1xyXG5cclxuZm9yKGxldCBpID0gMCA7IGkgPCBoYW1idXJnZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgIHZhciBoYW1idXJnZXIgPSBoYW1idXJnZXJzW2ldO1xyXG4gICAgaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxvcGVuTWVudSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBvcGVuTWVudShldnQpe1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIGNpYmxlID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG5cclxuICAgIGlmKGNpYmxlLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKXtcclxuICAgICAgICBjaWJsZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgbWVudU1vYmlsZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjaWJsZS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgICAgICBtZW51TW9iaWxlLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxubGV0IGNvbm5leGlvbiA9IG5ldyBNb3ZpZURCKCk7XHJcbmNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuLy9jb25uZXhpb24ucmVxdWV0ZUNhcm91c2VsRmlsbSgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pO1xyXG5cclxuY2xhc3MgTW92aWVEQntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IE1vdmllREIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiNjJlZmYwMjRjNGI4YTg4ZDQ2ZDExYmVlOTg0MTg3NTBcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNhXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy50b3RhbEZpbG0gPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpe1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL3RvcF9yYXRlZD9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKnJlcXVldGVDYXJvdXNlbEZpbG0oKXtcclxuXHJcbiAgICAgICAgbGV0IGNhcnJvdXNlbCA9ICBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICBjYXJyb3VzZWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJDYXJyb3VzZWxGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGNhcnJvdXNlbC5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgK1wibW92aWUvcG9wdWxhcj9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIGNhcnJvdXNlbC5zZW5kKCk7XHJcbiAgICB9Ki9cclxuXHJcblxyXG5cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKnJldG91ckNhcnJvdXNlbEZpbG0oZXZlbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXRvdXJDYXJyb3VzZWxGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldEMgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhQyA9IEpTT04ucGFyc2UodGFyZ2V0Qy5yZXNwb25zZVRleHQpLnJlc3VsdHNcclxuICAgICAgICB0aGlzLmFmZmljaGVyQ2Fycm91c2VsRmlsbShkYXRhQyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXRDLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBhZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2FmZmljaGVyRGVybmllckZpbG0nKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDNcIikuaW5uZXJIVE1MID0gZGF0YVtpXS52b3RlX2F2ZXJhZ2U7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDRcIikuaW5uZXJIVE1MID0gZGF0YVtpXS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwicGFzIGRlIGRlc2NyaXB0aW9uXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTg1XCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNyYyk7XHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgLyphcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5ocmVmPVwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7Ki9cclxuXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RlLWZpbG1zXCIpLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qYWZmaWNoZXJDYXJyb3VzZWxGaWxtKGRhdGFDKXtcclxuXHJcblxyXG4gICAgICAgIC8vdGhpcy50b3RhbEZpbG0gPSA5O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhQ1tpXSk7XHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlLWM+YXJ0aWNsZS5maWxtc3dpcGVyXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YUNbaV0udGl0bGU7XHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJyb3VzZWxcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxufVxyXG5cclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
