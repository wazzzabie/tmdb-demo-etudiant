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
        requete.open('GET', this.baseUrl +"movie/now_playing?api_key="+ this.apiKey +"&language="+ this.lang +"&page=1");
        requete.send();

    }
    retourDernierFilm(event){
        console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data){
        console.log('afficherDernierFilm')
        for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);


            let unArticle =  document.querySelector(".template>article.film").cloneNode(true);


            unArticle.querySelector("h2").innerHTML = data[i].title;
            unArticle.querySelector("p.description").innerHTML = data[i].overview || "pas de description";

            let src = this.imgPath + "w185" + data[i].poster_path;
            console.log(src);
            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            document.querySelector(".liste-films").appendChild(unArticle);


        }
    }

}


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcblxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBOYXZpZ2F0aW9uIGFycm93c1xyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFuZCBpZiB3ZSBuZWVkIHNjcm9sbGJhclxyXG4gICAgICAgIHNjcm9sbGJhcjoge1xyXG4gICAgICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuICAgICAgICB9LFxyXG4gICAgfSlcclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgY29uc29sZS5sb2coJ1BhcmZhaXQnKTtcclxuICAgIGxldCBpbnRlcnZhbElkID0gMDsgLy8gTmVlZGVkIHRvIGNhbmNlbCB0aGUgc2Nyb2xsaW5nIHdoZW4gd2UncmUgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZVxyXG4gICAgY29uc3QgJHNjcm9sbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXRvdXInKTsgLy8gUmVmZXJlbmNlIHRvIG91ciBzY3JvbGwgYnV0dG9uXHJcblxyXG4gICAgZnVuY3Rpb24gc2Nyb2xsU3RlcCgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSdyZSBhdCB0aGUgdG9wIGFscmVhZHkuIElmIHNvLCBzdG9wIHNjcm9sbGluZyBieSBjbGVhcmluZyB0aGUgaW50ZXJ2YWxcclxuICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgd2luZG93LnBhZ2VZT2Zmc2V0IC0gNTApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgICAgIC8vIENhbGwgdGhlIGZ1bmN0aW9uIHNjcm9sbFN0ZXAoKSBldmVyeSAxNi42NiBtaWxsaXNlY29uc1xyXG4gICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChzY3JvbGxTdGVwLCAxNi42Nik7XHJcbiAgICB9XHJcblxyXG4vLyBXaGVuIHRoZSBET00gaXMgbG9hZGVkLCB0aGlzIGNsaWNrIGhhbmRsZXIgaXMgYWRkZWQgdG8gb3VyIHNjcm9sbCBidXR0b25cclxuICAgICRzY3JvbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb1RvcCk7XHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5jb25zb2xlLmxvZyhcIsOHYSBmb25jdGlvbm5lISEhXCIpO1xyXG5cclxudmFyIGhhbWJ1cmdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGFtYnVyZ2VyJyk7XHJcbnZhciBtZW51TW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1wcmltYXJ5LW1vYmlsZScpO1xyXG5cclxuZm9yKGxldCBpID0gMCA7IGkgPCBoYW1idXJnZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgIHZhciBoYW1idXJnZXIgPSBoYW1idXJnZXJzW2ldO1xyXG4gICAgaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxvcGVuTWVudSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBvcGVuTWVudShldnQpe1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIGNpYmxlID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG5cclxuICAgIGlmKGNpYmxlLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKXtcclxuICAgICAgICBjaWJsZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgbWVudU1vYmlsZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjaWJsZS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgICAgICBtZW51TW9iaWxlLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxubGV0IGNvbm5leGlvbiA9IG5ldyBNb3ZpZURCKCk7XHJcbmNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxufSk7XHJcblxyXG5jbGFzcyBNb3ZpZURCe1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZXcgTW92aWVEQigpXCIpO1xyXG4gICAgICAgIHRoaXMuYXBpS2V5ID0gXCI2MmVmZjAyNGM0YjhhODhkNDZkMTFiZWU5ODQxODc1MFwiO1xyXG4gICAgICAgIHRoaXMubGFuZyA9IFwiZnItQ2FcIjtcclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvXCI7XHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIjtcclxuICAgICAgICB0aGlzLnRvdGFsRmlsbSA9IDg7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZURlcm5pZXJGaWxtKCl7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyRGVybmllckZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgK1wibW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1cIisgdGhpcy5hcGlLZXkgK1wiJmxhbmd1YWdlPVwiKyB0aGlzLmxhbmcgK1wiJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuXHJcbiAgICB9XHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckRlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHNcclxuICAgICAgICB0aGlzLmFmZmljaGVyRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJwYXMgZGUgZGVzY3JpcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNyYyk7XHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
