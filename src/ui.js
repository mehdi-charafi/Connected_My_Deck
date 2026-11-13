import { getSavedCardsList, getSavedDeck, addToSavedCardsList, saveSavedCardsList } from "./storage.js";
import {requist} from "./services/api.js"


//cardsList Function
export function cardsRender(list) {

    let cards = getSavedCardsList()
    if(list) cards = list
    const cardsList = document.querySelector("#Ccards");
if (cardsList) {
  cardsList.innerHTML = "";
  
  cards.forEach(c => {
    let color = `text-white`
  if(getSavedCardsList().find(r => r.id == c.id)?.favorite == true)color = `text-yellow-400`
    let cardImage = c.card_images?.[0]?.image_url || c.image || '';
     cardsList.innerHTML += `<article class="card relative flex flex-col gap-3 rounded-2xl p-3 pb-4 border border-gray-800 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-yellow-500/50 hover:shadow-2xl cursor-pointer bg-[#12161c] bg-cover bg-center" data-id="${c.id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/bg.png')">
    
    <div class="relative flex items-center justify-center rounded-xl overflow-hidden">
      
      <div class="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded border border-yellow-500/35 backdrop-blur-sm">
        <span class="card-id text-yellow-400 font-mono text-xs font-bold" card-id="${c.id}">${c.id}</span>
        <span class="fav-icon cursor-pointer ${color} hover:text-yellow-400 text-sm transition-colors select-none" data-id="${c.id}">
          ★
        </span>
      </div>

      <img src="${cardImage}" alt="${c.name}" class="w-full h-auto object-contain rounded-lg">
    </div>

    <button type="button" class="card-btn w-full py-2.5 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-black font-bold rounded-lg shadow-md transition-all cursor-pointer">
      Add to your cards
    </button>

  </article>`;
})};
}

export function renderDeck() {
    const mycardsSection = document.getElementById('mycards');
    let SavedDeck = getSavedDeck()
    if (!mycardsSection) return;
    
    mycardsSection.innerHTML = ""; 
    
    SavedDeck.forEach(cardData => {
        mycardsSection.innerHTML += `
           <div id="card-item" class="w-full min-h-[220px] border border-gray-700 rounded-lg p-2" data-id="${cardData.id}"> 
            <div class="flex items-center justify-between relative z-10">
              <span class="font-mono text-xs font-bold text-yellow-400 bg-black/70 px-2.5 py-1 rounded border border-yellow-500/30">${cardData.id}</span>
              <button type="button" aria-label="Remove card" class="remove-btn w-8 h-8 flex items-center justify-center text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer">✕</button>
            </div>

            <div class="relative flex items-center justify-center rounded-xl overflow-hidden z-10">
              <img src="${cardData.image}" alt="${cardData.name}" class="w-full h-auto object-contain rounded-lg" loading="lazy">
            </div>
          </div>
        `;
    });
}

export function updateTeamCount() {
    const mycardsSection = document.getElementById('mycards');
    let count = document.querySelectorAll(".team-count");
    if (mycardsSection && count) {
      count.forEach((c) => c.textContent = mycardsSection.children.length);
    }

  }

  export function showCardDetails(cardData) {
  const detailSection = document.getElementById('dcard');
  if (!detailSection) return;
  let color = `text-white`
let savedCard = getSavedCardsList().find(c => c.id == cardData.id);
if (savedCard?.favorite === true) color = `text-yellow-400`;
  detailSection.innerHTML = `
    <article id="detail" aria-label="Détail de la créature" class="card relative flex flex-col gap-3 rounded-2xl p-4 border border-gray-800 shadow-2xl bg-[#12161c] bg-cover bg-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/bg.png')">
      
      <div class="flex items-center justify-between relative z-10">
        <div class="inline-flex items-center gap-2 font-mono text-xs font-bold bg-black/70 px-2.5 py-1 rounded border border-yellow-500/30">
  <span class="card-id text-yellow-400" card-id="${cardData.id}">${cardData.id} · Détail</span>
  <span class="fav-icon cursor-pointer ${color} hover:text-yellow-400 text-xl transition-colors select-none" data-id="${cardData.id}">
    ★
  </span>
</div>
       <button type="button" aria-label="Fermer le détail" class="w-8 h-8 flex items-center justify-center text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer">✕</button>
      </div>

      <div class="relative flex items-center justify-center rounded-xl overflow-hidden z-10">
        <img src="${cardData.image}" alt="${cardData.name}" class="w-full h-auto object-contain rounded-lg">
      </div>


    </article>
  `;

  const closeBtn = detailSection.querySelector('button[aria-label="Fermer le détail"]');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      detailSection.innerHTML = "";
    });
  }
}


export async function loadMore() {
    let source = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
    let allCards = await requist(source);
    if(getSavedCardsList.length == 0)allCards = allCards.splice(20)
    let limit = 20;
    let addedCount = 0; 

    let savedList = getSavedCardsList();

    for (let c of allCards) {
        if (addedCount >= limit) break;

        let formattedId = "#" + c.id;

        let existsInSaved = savedList.some(r => r.id === formattedId);

        if (!existsInSaved) {
            let newCard = {
                id: formattedId,
                name: c.name,
                type: c.type,
                level: c.level || 0,
                stats: { 
                    attack: c.atk !== undefined ? c.atk : 0, 
                    defence: c.def !== undefined ? c.def : 0 
                },
                image: c.card_images?.[0]?.image_url || "",
                description: c.desc || "No Description"
            };

            addToSavedCardsList(newCard);
            savedList.push(newCard); 
            addedCount++; 
        }
    }

    console.log(`Successfully added ${addedCount} new cards.`);
    location.reload();
}


// Loading

export function showLoading() {
    let loading = document.getElementById("loading-spinner")
    let empty = document.getElementById("empty-state")
    let error = document.getElementById("error-state")
    loading.classList.remove("hidden");
    empty.classList.add("hidden");
    error.classList.add("hidden");
    const cardsList = document.querySelector("#Ccards");
    if (cardsList) cardsList.innerHTML = ""; 
    
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

export function hideLoading() {
    document.getElementById("loading-spinner")?.classList.add("hidden");
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

export function showEmptyState(message = "Nothing is found.") {
    hideLoading();
    let empty = document.getElementById("empty-state")
    let error = document.getElementById("error-state")
    empty.classList.remove("hidden");
    error.classList.add("hidden");
    
    const msgElement = document.getElementById("empty-message");
    if (msgElement) msgElement.textContent = message;
    
    const cardsList = document.querySelector("#Ccards");
    if (cardsList) cardsList.innerHTML = "";
}

export function showErrorState(errorMessage) {
    hideLoading();
    let error = document.getElementById("error-state")
    let empty = document.getElementById("empty-state")
    error.classList.remove("hidden");
    empty.classList.add("hidden");
    
    const msgElement = document.getElementById("error-message");
    if (msgElement) msgElement.textContent = errorMessage || "Erreur de connexion.";
    
    const cardsList = document.querySelector("#Ccards");
    if (cardsList) cardsList.innerHTML = "";

}


// Add To Favorite
export function addToFavorite(favCardId, favIcon) {
  console.log(`id is ${favCardId}`)
   let SavedCardsList = getSavedCardsList()
   SavedCardsList.forEach((c) => {
    if(c.id == favCardId) {
      if(c.favorite == true) {
        c.favorite = false
        console.log(c.favorite)
        favIcon.classList.remove("text-yellow-400")
        favIcon.classList.add("text-white")
      }
      else {
         c.favorite = true
         console.log(c.favorite)
         favIcon.classList.add("text-yellow-400")
         favIcon.classList.remove("text-white")
        }
    }
    })
   saveSavedCardsList(SavedCardsList)
   }
