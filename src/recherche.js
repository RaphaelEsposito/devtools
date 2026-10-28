
const recherche = document.getElementById("recherche");
const compteur = document.getElementById("compteur");
const messageVide = document.getElementById("message-vide");

recherche.addEventListener("input", function () {

    const texte = recherche.value.trim().toLowerCase();

    const outilsFiltres = outils.filter(function (outil) {
        return outil.nom.toLowerCase().includes(texte)
            || outil.categorie.toLowerCase().includes(texte);
    });

    compteur.textContent = `${outilsFiltres.length} outils trouvés`;

    messageVide.hidden = outilsFiltres.length !== 0;

    afficherCartes(outilsFiltres);
});
