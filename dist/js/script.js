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
//connexion.requeteDernierFilm();


 if(document.location.pathname.search('fiche-film.html')> 0){
    let params = new URL(document.location).searchParams;
    console.log(params)
    connexion.requeteInfoFilm(params.get('id'));
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


    retourCarrouselFilm(event){
        console.log('retourCarrouselFilm');
        let targetC = event.currentTarget;
        let dataC = JSON.parse(targetC.responseText).results
        this.afficherCarrouselFilm(dataC);
        //console.log(targetC.responseText);
    }
    requeteCarouselFilm(){

            let carrousel =  new XMLHttpRequest();
            carrousel.addEventListener("loadend", this.retourCarrouselFilm.bind(this));
            carrousel.open('GET', this.baseUrl +"movie/popular?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
            carrousel.send();
        }
    afficherCarrouselFilm(dataC){



        //this.totalFilm = 9;
        for (let i = 0; i < this.totalFilm; i++) {

            console.log(dataC[i]);
            let unArticle = document.querySelector(".template-c>article.filmswiper").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = dataC[i].title;


            document.querySelector(".carrousel").appendChild(unArticle);

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

        document.querySelector('h2').innerHTML = data.title;
        document.querySelector('p').innerHTML = data.overview;
        document.querySelector('h4').innerHTML = data.release_date;
        document.querySelector('.fiche-film h3').innerHTML = data.vote_average;


       /* for (let i = 0; i < this.totalFilm; i++) {
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

            article.querySelector('a').href="fiche-film.html?id=" + data[i].id;

            section.appendChild(article);


            document.querySelector(".liste-films").appendChild(unArticle);
        }*/
    }
}


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcblxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBOYXZpZ2F0aW9uIGFycm93c1xyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFuZCBpZiB3ZSBuZWVkIHNjcm9sbGJhclxyXG4gICAgICAgIHNjcm9sbGJhcjoge1xyXG4gICAgICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuICAgICAgICB9LFxyXG4gICAgfSlcclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgY29uc29sZS5sb2coJ1BhcmZhaXQnKTtcclxuICAgIGxldCBpbnRlcnZhbElkID0gMDsgLy8gTmVlZGVkIHRvIGNhbmNlbCB0aGUgc2Nyb2xsaW5nIHdoZW4gd2UncmUgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZVxyXG4gICAgY29uc3QgJHNjcm9sbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXRvdXInKTsgLy8gUmVmZXJlbmNlIHRvIG91ciBzY3JvbGwgYnV0dG9uXHJcblxyXG4gICAgZnVuY3Rpb24gc2Nyb2xsU3RlcCgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSdyZSBhdCB0aGUgdG9wIGFscmVhZHkuIElmIHNvLCBzdG9wIHNjcm9sbGluZyBieSBjbGVhcmluZyB0aGUgaW50ZXJ2YWxcclxuICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgd2luZG93LnBhZ2VZT2Zmc2V0IC0gNTApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgICAgIC8vIENhbGwgdGhlIGZ1bmN0aW9uIHNjcm9sbFN0ZXAoKSBldmVyeSAxNi42NiBtaWxsaXNlY29uc1xyXG4gICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChzY3JvbGxTdGVwLCAxNi42Nik7XHJcbiAgICB9XHJcblxyXG4vLyBXaGVuIHRoZSBET00gaXMgbG9hZGVkLCB0aGlzIGNsaWNrIGhhbmRsZXIgaXMgYWRkZWQgdG8gb3VyIHNjcm9sbCBidXR0b25cclxuICAgICRzY3JvbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb1RvcCk7XHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5jb25zb2xlLmxvZyhcIsOHYSBmb25jdGlvbm5lISEhXCIpO1xyXG5cclxudmFyIGhhbWJ1cmdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGFtYnVyZ2VyJyk7XHJcbnZhciBtZW51TW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1wcmltYXJ5LW1vYmlsZScpO1xyXG5cclxuZm9yKGxldCBpID0gMCA7IGkgPCBoYW1idXJnZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgIHZhciBoYW1idXJnZXIgPSBoYW1idXJnZXJzW2ldO1xyXG4gICAgaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxvcGVuTWVudSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBvcGVuTWVudShldnQpe1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIGNpYmxlID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG5cclxuICAgIGlmKGNpYmxlLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKXtcclxuICAgICAgICBjaWJsZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgbWVudU1vYmlsZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjaWJsZS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgICAgICBtZW51TW9iaWxlLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxubGV0IGNvbm5leGlvbiA9IG5ldyBNb3ZpZURCKCk7XHJcbi8vY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG5cclxuXHJcbiBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goJ2ZpY2hlLWZpbG0uaHRtbCcpPiAwKXtcclxuICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKS5zZWFyY2hQYXJhbXM7XHJcbiAgICBjb25zb2xlLmxvZyhwYXJhbXMpXHJcbiAgICBjb25uZXhpb24ucmVxdWV0ZUluZm9GaWxtKHBhcmFtcy5nZXQoJ2lkJykpO1xyXG4gfWVsc2V7XHJcbiAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG5cclxuXHJcbiAgICAgY29ubmV4aW9uLnJlcXVldGVDYXJvdXNlbEZpbG0oKTtcclxuIH1cclxuXHJcbiBjb25zb2xlLmxvZyhkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2gpO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuY2xhc3MgTW92aWVEQntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IE1vdmllREIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiNjJlZmYwMjRjNGI4YTg4ZDQ2ZDExYmVlOTg0MTg3NTBcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNhXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy50b3RhbEZpbG0gPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpe1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL3RvcF9yYXRlZD9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpXHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnZvdGVfYXZlcmFnZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoNFwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnJlbGVhc2VfZGF0ZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJwYXMgZGUgZGVzY3JpcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3JjKTtcclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YVtpXS50aXRsZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0b3VyQ2Fycm91c2VsRmlsbShldmVudCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckNhcnJvdXNlbEZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0QyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGFDID0gSlNPTi5wYXJzZSh0YXJnZXRDLnJlc3BvbnNlVGV4dCkucmVzdWx0c1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJDYXJyb3VzZWxGaWxtKGRhdGFDKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldEMucmVzcG9uc2VUZXh0KTtcclxuICAgIH1cclxuICAgIHJlcXVldGVDYXJvdXNlbEZpbG0oKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYXJyb3VzZWwgPSAgbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIGNhcnJvdXNlbC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckNhcnJvdXNlbEZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIGNhcnJvdXNlbC5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgK1wibW92aWUvcG9wdWxhcj9hcGlfa2V5PVwiKyB0aGlzLmFwaUtleSArXCImbGFuZ3VhZ2U9XCIrIHRoaXMubGFuZyArXCImcGFnZT0xXCIpO1xyXG4gICAgICAgICAgICBjYXJyb3VzZWwuc2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIGFmZmljaGVyQ2Fycm91c2VsRmlsbShkYXRhQyl7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy90aGlzLnRvdGFsRmlsbSA9IDk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhQ1tpXSk7XHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlLWM+YXJ0aWNsZS5maWxtc3dpcGVyXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YUNbaV0udGl0bGU7XHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJyb3VzZWxcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gSWYgd2UgbmVlZCBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBBbmQgaWYgd2UgbmVlZCBzY3JvbGxiYXJcclxuICAgICAgICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJZCl7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VySW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgK1wibW92aWUvXCIgKyBtb3ZpZUlkICsgXCI/YXBpX2tleT1cIisgdGhpcy5hcGlLZXkgK1wiJmxhbmd1YWdlPVwiKyB0aGlzLmxhbmcgK1wiJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuXHJcbiAgICB9XHJcbiAgICByZXRvdXJJbmZvRmlsbShldmVudCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInJldG91ckluZm9GaWxtXCIpXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJJbmZvRmlsbShkYXRhKTtcclxuXHJcbiAgICB9XHJcbiAgICBhZmZpY2hlckluZm9GaWxtKGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJykuaW5uZXJIVE1MID0gZGF0YS5vdmVydmlldztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoNCcpLmlubmVySFRNTCA9IGRhdGEucmVsZWFzZV9kYXRlO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWNoZS1maWxtIGgzJykuaW5uZXJIVE1MID0gZGF0YS52b3RlX2F2ZXJhZ2U7XHJcblxyXG5cclxuICAgICAgIC8qIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDNcIikuaW5uZXJIVE1MID0gZGF0YVtpXS52b3RlX2F2ZXJhZ2U7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDRcIikuaW5uZXJIVE1MID0gZGF0YVtpXS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwicGFzIGRlIGRlc2NyaXB0aW9uXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTg1XCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNyYyk7XHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZj1cImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxufVxyXG5cclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
