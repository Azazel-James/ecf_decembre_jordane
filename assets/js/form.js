const Swal = require('sweetalert2')
let key = "86a13686";
let search = document.querySelector("#search"); //button
let affichage = document.querySelector("#cards"); //section

search.addEventListener("click", function (e) {
    e.preventDefault();

    let s = document.querySelector("#itxt_titre").value; //input txt
    let y = document.querySelector("#inbr_annee").value; //input nbr
    let type = document.querySelector("#type").value; //select

    let url_api = `http://www.omdbapi.com/?apikey=${key}`;

    if (s === "")
        alert("J'ai besoin d'un titre stp")
    else
        url_api += `&s=${s}`;

    if (y !== "") url_api += `&y=${y}`;
    if (type !== "") url_api += `&type=${type}`;

    console.log(url_api);

    fetch(url_api)
        .then(data => data.json())
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error}, Nous ne trouvons pas le film que vous cherchez...`,
                theme: "dark",
                confirmButtonColor: "#7aaae0",
                confirmButtonText: "AAAAAAH",
                color: "#f0f8ff",
                showCloseButton: true,
            })
        })
        .then(data => {
            console.log(data);

            let movies = data.Search;

            function fMovieDisplay(movies) {
                movies.forEach((film, i) => {
                    if (movies[i].Poster === "N/A") movies[i].Poster = "https://placehold.co/300x445/000000/FFF.png";

                    affichage.insertAdjacentHTML("beforeend",
                        `<article border="3 solid rd-5 #7aaae0" bg="slate-600" shadow="md hover:lg #7aaae0" m="b-3" w="300px">
                                    <img src="${movies[i].Poster}" alt="Affiche ${movies[i].Title}"  border="rd-t-5 b-2 solid #7aaae0">
                                    <div>
                                        <h3>${movies[i].Title}</h3>
                                        <p>${movies[i].Year}</p>
                                    </div>
                                 </article>`);
                })
            }
            let totalR = +data.totalResults;
            let nav = Math.ceil(totalR / 10);
            let nav2 = [];
            let page = 1;
            let pagination = document.querySelector("#pagination");

            for (let i = 1; i <= nav; i++) {
                nav2.push(i);
            }

            nav2.forEach((element, i) => {
                pagination.insertAdjacentHTML("beforeend", `<button text="#f0f8ff" font="bold" ring="~" border="rd-2" bg="#7aaae0" size="30px" data-page="${i + 1}">${i + 1}</button>`)
            })


            fMovieDisplay(movies);

let fUrl = url_api;

            let buttons = document.querySelectorAll("footer button");
            buttons.forEach((button) => {

                button.addEventListener("click",  () => {
                    page = button.textContent;
                    console.log(page);
                    document.querySelectorAll("article").forEach((element, i) => {
                        element.style.display = "none";
                    })

                    url_api += `&page=${page}`;

                    console.log(url_api);
                    fetch(url_api)
                        .then(res => res.json())
                        .catch(error => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: `${error}, Nous ne trouvons pas le film que vous cherchez...`,
                                theme: "dark",
                                confirmButtonColor: "#7aaae0",
                                confirmButtonText: "AAAAAAH",
                                color: "#f0f8ff",
                                showCloseButton: true,
                            })
                        })
                        .then(res => {
                            console.log(res);
                            let moreMovies = res.Search;
                            fMovieDisplay(moreMovies);
                            url_api = fUrl;
                        })
                })
            })
        })

});
