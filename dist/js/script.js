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

    connexion.requeteInfoFilm(14)
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
        console.log("retourInfoFilm")
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText)
        console.log(data);

        this.afficherInfoFilm(data);

    }
    afficherInfoFilm(data){

        document.querySelector('h1').innerHTML = data.title;

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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvKnZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuXHJcblxyXG4gICAgICAgIC8vIElmIHdlIG5lZWQgcGFnaW5hdGlvblxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQW5kIGlmIHdlIG5lZWQgc2Nyb2xsYmFyXHJcbiAgICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1zY3JvbGxiYXInLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KSovXHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIGNvbnNvbGUubG9nKCdQYXJmYWl0Jyk7XHJcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IDA7IC8vIE5lZWRlZCB0byBjYW5jZWwgdGhlIHNjcm9sbGluZyB3aGVuIHdlJ3JlIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2VcclxuICAgIGNvbnN0ICRzY3JvbGxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV0b3VyJyk7IC8vIFJlZmVyZW5jZSB0byBvdXIgc2Nyb2xsIGJ1dHRvblxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFN0ZXAoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgYXQgdGhlIHRvcCBhbHJlYWR5LiBJZiBzbywgc3RvcCBzY3JvbGxpbmcgYnkgY2xlYXJpbmcgdGhlIGludGVydmFsXHJcbiAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5wYWdlWU9mZnNldCAtIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcclxuICAgICAgICAvLyBDYWxsIHRoZSBmdW5jdGlvbiBzY3JvbGxTdGVwKCkgZXZlcnkgMTYuNjYgbWlsbGlzZWNvbnNcclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoc2Nyb2xsU3RlcCwgMTYuNjYpO1xyXG4gICAgfVxyXG5cclxuLy8gV2hlbiB0aGUgRE9NIGlzIGxvYWRlZCwgdGhpcyBjbGljayBoYW5kbGVyIGlzIGFkZGVkIHRvIG91ciBzY3JvbGwgYnV0dG9uXHJcbiAgICAkc2Nyb2xsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9Ub3ApO1xyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuY29uc29sZS5sb2coXCLDh2EgZm9uY3Rpb25uZSEhIVwiKTtcclxuXHJcbnZhciBoYW1idXJnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhhbWJ1cmdlcicpO1xyXG52YXIgbWVudU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtcHJpbWFyeS1tb2JpbGUnKTtcclxuXHJcbmZvcihsZXQgaSA9IDAgOyBpIDwgaGFtYnVyZ2Vycy5sZW5ndGg7IGkrKyl7XHJcbiAgICB2YXIgaGFtYnVyZ2VyID0gaGFtYnVyZ2Vyc1tpXTtcclxuICAgIGhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsb3Blbk1lbnUpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb3Blbk1lbnUoZXZ0KXtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBjaWJsZSA9IGV2dC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuXHJcbiAgICBpZihjaWJsZS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSl7XHJcbiAgICAgICAgY2libGUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG1lbnVNb2JpbGUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY2libGUuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbiAgICAgICAgbWVudU1vYmlsZS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG4vL2Nvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcblxyXG4gaWYoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKCdmaWNoZS1maWxtLmh0bWwnKT4gMCl7XHJcblxyXG4gICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbSgxNClcclxuIH1lbHNle1xyXG4gICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcblxyXG4gICAgIGNvbm5leGlvbi5yZXF1ZXRlQ2Fyb3VzZWxGaWxtKCk7XHJcbiB9XHJcblxyXG4gY29uc29sZS5sb2coZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKTtcclxuXHJcblxyXG59KTtcclxuXHJcbmNsYXNzIE1vdmllREJ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBNb3ZpZURCKClcIik7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIjYyZWZmMDI0YzRiOGE4OGQ0NmQxMWJlZTk4NDE4NzUwXCI7XHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DYVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9cIjtcclxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xyXG4gICAgICAgIHRoaXMudG90YWxGaWxtID0gODtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArXCJtb3ZpZS90b3BfcmF0ZWQ/YXBpX2tleT1cIisgdGhpcy5hcGlLZXkgK1wiJmxhbmd1YWdlPVwiKyB0aGlzLmxhbmcgK1wiJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuXHJcbiAgICB9XHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncmV0b3VyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0c1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKTtcclxuXHJcbiAgICB9XHJcbiAgICBhZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2FmZmljaGVyRGVybmllckZpbG0nKVxyXG5cclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDNcIikuaW5uZXJIVE1MID0gZGF0YVtpXS52b3RlX2F2ZXJhZ2U7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDRcIikuaW5uZXJIVE1MID0gZGF0YVtpXS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwicGFzIGRlIGRlc2NyaXB0aW9uXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTg1XCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNyYyk7XHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5ocmVmID0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldG91ckNhcnJvdXNlbEZpbG0oZXZlbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXRvdXJDYXJyb3VzZWxGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldEMgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhQyA9IEpTT04ucGFyc2UodGFyZ2V0Qy5yZXNwb25zZVRleHQpLnJlc3VsdHNcclxuICAgICAgICB0aGlzLmFmZmljaGVyQ2Fycm91c2VsRmlsbShkYXRhQyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXRDLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXRlQ2Fyb3VzZWxGaWxtKCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2Fycm91c2VsID0gIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBjYXJyb3VzZWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJDYXJyb3VzZWxGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBjYXJyb3VzZWwub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL3BvcHVsYXI/YXBpX2tleT1cIisgdGhpcy5hcGlLZXkgK1wiJmxhbmd1YWdlPVwiKyB0aGlzLmxhbmcgK1wiJnBhZ2U9MVwiKTtcclxuICAgICAgICAgICAgY2Fycm91c2VsLnNlbmQoKTtcclxuICAgICAgICB9XHJcbiAgICBhZmZpY2hlckNhcnJvdXNlbEZpbG0oZGF0YUMpe1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vdGhpcy50b3RhbEZpbG0gPSA5O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YUNbaV0pO1xyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZS1jPmFydGljbGUuZmlsbXN3aXBlclwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFDW2ldLnRpdGxlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2Fycm91c2VsXCIpLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgcGFyYW1ldGVyc1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlIG5lZWQgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBOYXZpZ2F0aW9uIGFycm93c1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gQW5kIGlmIHdlIG5lZWQgc2Nyb2xsYmFyXHJcbiAgICAgICAgICAgIHNjcm9sbGJhcjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXNjcm9sbGJhcicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZUluZm9GaWxtKG1vdmllSWQpe1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckluZm9GaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICtcIm1vdmllL1wiICsgbW92aWVJZCArIFwiP2FwaV9rZXk9XCIrIHRoaXMuYXBpS2V5ICtcIiZsYW5ndWFnZT1cIisgdGhpcy5sYW5nICtcIiZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcblxyXG4gICAgfVxyXG4gICAgcmV0b3VySW5mb0ZpbG0oZXZlbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmV0b3VySW5mb0ZpbG1cIilcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckluZm9GaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuICAgIGFmZmljaGVySW5mb0ZpbG0oZGF0YSl7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJykuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuXHJcbiAgICAgICAvKiBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxGaWxtOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHVuQXJ0aWNsZSA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlPmFydGljbGUuZmlsbVwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgzXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udm90ZV9hdmVyYWdlO1xyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImg0XCIpLmlubmVySFRNTCA9IGRhdGFbaV0ucmVsZWFzZV9kYXRlO1xyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcInAuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcInBhcyBkZSBkZXNjcmlwdGlvblwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzcmMpO1xyXG4gICAgICAgICAgICBsZXQgdW5lSW1hZ2UgPSB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyYyk7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBkYXRhW2ldLnRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWY9XCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChhcnRpY2xlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RlLWZpbG1zXCIpLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcbiAgICAgICAgfSovXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
