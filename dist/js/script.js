document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    connexion.requeteDernierFilm();


})


class MovieDB{

    constructor() {

        console.log("Constructeur");

        this.APIkey = "eda01ad95b124c2be1b5f4308d87648f";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3";

        this.imgPath = "https://image.tmdb.org/t/p/";

        this.totalFilm = 8;

    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this) );

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=eda01ad95b124c2be1b5f4308d87648f&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        requete.send();

    }

    retourRequeteDernierFilm(e){
        console.log("Retour dernier Film");

        let target = e.currentTarget;
        let data;


        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        console.log(data);

        this.afficheDernierFilm(data);
    }


    afficheDernierFilm(data){

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].overview);
        }


    }


}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcblxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xuXG4gICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xuXG5cbn0pXG5cblxuY2xhc3MgTW92aWVEQntcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uc3RydWN0ZXVyXCIpO1xuXG4gICAgICAgIHRoaXMuQVBJa2V5ID0gXCJlZGEwMWFkOTViMTI0YzJiZTFiNWY0MzA4ZDg3NjQ4ZlwiO1xuXG4gICAgICAgIHRoaXMubGFuZyA9IFwiZnItQ0FcIjtcblxuICAgICAgICB0aGlzLmJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzNcIjtcblxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xuXG4gICAgICAgIHRoaXMudG90YWxGaWxtID0gODtcblxuICAgIH1cblxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpe1xuXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91clJlcXVldGVEZXJuaWVyRmlsbS5iaW5kKHRoaXMpICk7XG5cbiAgICAgICAgLy9yZXF1ZXRlLm9wZW4oXCJHRVRcIiwgXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9ZWRhMDFhZDk1YjEyNGMyYmUxYjVmNDMwOGQ4NzY0OGYmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpO1xuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCIvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1cIiArIHRoaXMuQVBJa2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XG5cbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XG5cbiAgICB9XG5cbiAgICByZXRvdXJSZXF1ZXRlRGVybmllckZpbG0oZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGRlcm5pZXIgRmlsbVwiKTtcblxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBsZXQgZGF0YTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcblxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICAgICB0aGlzLmFmZmljaGVEZXJuaWVyRmlsbShkYXRhKTtcbiAgICB9XG5cblxuICAgIGFmZmljaGVEZXJuaWVyRmlsbShkYXRhKXtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS5vdmVydmlldyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbn0iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
