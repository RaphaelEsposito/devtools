import { outilsBase } from './outils.js';

const rechercheInput = document.getElementById('recherche');

function showCards(outils) {

    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = '';

    const outilsText = document.getElementById('compteur');
    const outilsCount = outils.length;
    outilsText.textContent = `${outilsCount} trouvé(s)`;

    if (outils.length === 0) {
        const noResultsMessage = document.getElementById('message-vide');
        noResultsMessage.hidden = false;
    } else {
        const noResultsMessage = document.getElementById('message-vide');
        noResultsMessage.hidden = true;
    }

    outils.forEach((outil) => {
        let badgeText = "";
        let badgeClass = "";
        const card = document.createElement('div');
        card.classList.add('card');
        
        if (outil.gratuit) {
            badgeText = "Gratuit";
            badgeClass = "badge-gratuit"; 
        } else {
            badgeText = "Payant";
            badgeClass = "badge-payant"; 
        }

        card.innerHTML = `
        <h2 class="text-xl font-semibold">${outil.nom}</h2>
        <p class="">${outil.description}</p>
        <p class=""><strong>Catégorie:</strong> ${outil.categorie}</p>
        <span class="badge ${badgeClass}">${badgeText}</span>
    `;
        cardContainer.appendChild(card);

    });    
}

function filterOutils() {
    
    const termeRecherche = rechercheInput.value.toLowerCase().trim();


    if (termeRecherche === '') {
        showCards(outilsBase);
    } else {
        const filteredOutils = outilsBase.filter((outil) => {
            return (
                outil.nom.toLowerCase().includes(termeRecherche) ||
                outil.categorie.toLowerCase().includes(termeRecherche)
            );
        });
        showCards(filteredOutils);
    }
}

rechercheInput.addEventListener('input', filterOutils);
showCards(outilsBase);
