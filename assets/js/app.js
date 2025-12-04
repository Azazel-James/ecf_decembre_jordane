var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        title: "It: Chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];
// TODO
//récupérer le tableau pour faire l'affichage de [films]
let table = document.querySelector("#table")

function movie() {
    table.innerHTML = `<tr><th>Titre</th><th>Année</th><th>Réalisateur</th></tr>`;
    films.forEach(film => {
        table.insertAdjacentHTML("beforeend", `<tr><td>${film.title}</td><td>${film.years}</td><td>${film.authors}</td><td><button class="supprimer rounded-2 bg-red-700 ring text-white p-1">Supprimer</button></td></tr>`)
    })
}

movie();

let aj = document.querySelector("#btn_ajouter")
//au click, ajouter form dans la section, récupérer la value des inputs et compléter le tableau
aj.addEventListener("click", function () {
    let secAj = document.querySelector("#section_ajouter");
    secAj.innerHTML = `<form id="form_ajouter" flex="~ wrap col sm:row" font="bold">
                <input type="text" name="titre_aj" id="titre_aj" placeholder="Titre" h="30px">
                <input type="number" name="annee_aj" id="annee_aj" placeholder="Année de sortie" h="30px">
                <input type="text" name="real_aj" id="real_aj" placeholder="Réalisateur" h="30px">
                <button type="submit" id="save" font="bold" text="#f0f8ff" ring="~" border="rd-5" bg="#7aaae0" m="t-3 l-3 sm:t-0">Ajouter</button></form>`;

    document.querySelector("#save").addEventListener("click", function (event) {
        event.preventDefault();

        let ok = true; //bouton on/off pour décider de l'affichage du contenu utilisateur
        let erreur = document.querySelector("#erreur")
        let txterreur = ""; //conserver et MàJ les erreurs pour affichage message final

        //VERIFICATION input Titre
        let titre = document.querySelector("#titre_aj").value; //
        //capitalize de Titre
        let t2 = "";
        titre.split(" ").forEach(mot => {
            mot = mot[0].toUpperCase() + mot.slice(1) + " ";
            t2 += mot;
        })
        titre = t2;

        if (titre.length < 2) {
            ok = false;
            txterreur += `<li>Titre trop court, 2 caractères minimum.</li>`
        }

        //VERIFICATION input Année
        let currentYear = new Date().getFullYear();
        let annee = document.querySelector("#annee_aj").value;
        let REannee = new RegExp("^\\d{4}$"); //commence et termine par un chiffre. doit en avoir 4
        if (!REannee.test(annee)) {
            ok = false;
            txterreur += `<li>L'année doit être composée de 4 chiffres. `
        }
        if (parseInt(annee) < 1900 || parseInt(annee) > currentYear) {
            ok = false;
            txterreur += `<li>L'année doit être compris entre 1900 et aujourd'hui.</li>`
        }

        //VERIFICATION input Réalisateur
        let real = document.querySelector("#real_aj").value;
        //capitalize de Réal
        let r2 = "";
        real = real.split(" ");
        real.forEach(word => {
            word = word[0].toUpperCase() + word.slice(1);
            r2 += word + " ";
        });
        real = r2

        let REreal = new RegExp(/[\w+(\s?)(\w+?)]{5,}/)
        if (!REreal.test(real)) { //prend en compte les espaces (changer pour 6?)
            ok = false;
            txterreur += `<li>Le nom du réalisateur doit être composé de 5 caractères minimum.</li>`
        }

        //AFFICHAGE dans la section erreur en fonction de ok

        if (ok) {
            films.push({title: titre, years: parseInt(annee), authors: real})
            let lastFilm = films[films.length - 1];
            table.insertAdjacentHTML("beforeend", `<tr><td>${lastFilm.title}</td><td>${lastFilm.years}</td><td>${lastFilm.authors}</td><td><button class="supprimer rounded-2 bg-red-700 ring text-white p-1">Supprimer</button></td></tr>`)

            erreur.innerHTML = `<p>Film ajouté avec succès.</p>`
            setTimeout(() => {
                erreur.setAttribute("style", "display: none");
            }, 3000);

        } else {
            erreur.innerHTML = `<p>Attention! Erreur(s) dans le formulaire : <ul>${txterreur}</ul></p>`
            setTimeout(() => {
                erreur.setAttribute("style", "display: none");
            }, 5000);
        }
    })
})

//FILTRE
let filtre = document.querySelector("#filtre");

filtre.addEventListener("change", function (event) {

    if (event.target.value === "titre") {
        films = films.sort((a, b) => a.title.localeCompare(b.title));
        movie();
    }

    if (event.target.value === "annee") {
        films = films.sort((a, b) => {
            return b.years - a.years
        });
        movie();
    }
});

//Bouton supprimer : a essayer --> mettre l'event sur le tableau pour ne pas perdre les boutons après le filtre (voir si ça récupère les add utilisateur, fingers crossed)
// (lower case yay!)
table.addEventListener("click", function (e) {
    if (confirm("Voulez-vous supprimer ce film de la liste ?") === true) {
        table.deleteRow(e.target.parentElement.parentElement.rowIndex);
    }
})
