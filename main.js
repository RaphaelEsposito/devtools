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
        noResultsMessage.classList.remove('hidden');
    } else {
        const noResultsMessage = document.getElementById('message-vide');
        noResultsMessage.classList.add('hidden');
    }

    outils.forEach((outil) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h2 class="text-xl font-semibold">${outil.nom}</h2>
        <p class="mt-2">${outil.description}</p>
        <p class="mt-2"><strong>Catégorie:</strong> ${outil.categorie}</p>
        <p class="mt-2"><strong>Gratuit:</strong> ${outil.gratuit ? 'Oui' : 'Non'}</p>
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
