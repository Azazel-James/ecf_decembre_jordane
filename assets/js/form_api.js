let key = "86a13686";
let affichage = document.querySelector("#cards"); //section
let search = document.querySelector("#search"); //button

search.addEventListener("click", function (e) {
    e.preventDefault();

    let s = document.querySelector("#itxt_titre").value; //input txt
    let y = document.querySelector("#inbr_annee").value; //input nbr
    let type = document.querySelector("#type").value; //select

    let url_api = `http://www.omdbapi.com/?apikey=${key}`;

    if (s == "")
        alert("J'ai besoin d'un titre stp")
    else
        url_api += `&s=${s}`;

    if (y !== "") url_api += `&y=${y}`;
    if (type !== "") url_api += `&type=${type}`;

    console.log(url_api);

    fetch(url_api)
        .then(res => res.json())
        .then(res => {
            console.log(res)

            //Afficher la p 1 de résultat
            let ks = res.Search;
            ks.forEach((k, i) => {
            affichage.insertAdjacentHTML("beforeend", ` <article border="3 solid rd-5 #7aaae0" bg="slate-600" shadow="md #7aaae0">
                        <img src="${ks[i].Poster}" alt="Affiche ${ks[i].Title}"  border="rd-t-5 b-2 solid #7aaae0">
                    <div flex="~">
                    <h3>${ks[i].Title}</h3>
                    <p>${ks[i].Year}</p>
                    </div>
            </article>`)
            });

//récupérer %resultat + créer pages supplémentaires
            let tRes = parseInt(res.totalResults);
            let page = Math.floor(tRes / 10) + 1;
            console.log(page);

            if (tRes > 10) {
                url_api += `&page=${page}`;
                fetch(url_api)
                    .then(data => data.json())
                    .then(data => {
                        console.log(data)
                        //footer perd .hidden, création de a*page i++
                    //créer page -1 de section, les numérotés et envoyer les résultats sur la bonne page ?
                        /*let main = document.querySelector("#main");
                        let cards = document.querySelector("#cards");

                        let sections = document.createElement("section").repeat(page - 1);*/

                        let ffs = data.Search;
                        ffs.forEach((f, i) => {
                            //get a new section -->
                            main.insertAdjacentHTML("beforeend", `<article border="3 solid rd-5 #7aaae0" bg="slate-600" shadow="md #7aaae0">
                        <img src="${ffs[i].Poster}" alt="Affiche ${ffs[i].Title}"  border="rd-t-5 b-2 solid #7aaae0">
                    <div>
                    <h3>${ffs[i].Title}</h3>
                    <p>${ffs[i].Year}</p>
                    </div>
            </article>`)
                        });
                    })
            }

        })
})
