
import { getSavedDeck, saveSavedDeck, addToSavedDeck, getSavedCardsList, saveSavedCardsList, addToSavedCardsList } from "./storage";
import { cardsList, renderDeck, updateTeamCount, showCardDetails } from "./ui";
renderDeck(); 
updateTeamCount();



// Cards List
cardsRender()




//filter
let filter = document.querySelector("#filter")
let enabledFilter = false
let filterValue = []
filter.addEventListener("change", (event) => {
  let SavedCardsList = getSavedCardsList()
  if(event.target.value == "Tous") {
    cardsList(SavedCardsList)
  } else {
    filterValue = SavedCardsList.filter((c) => c.type == event.target.value)
    cardsList(filterValue)
    enabledFilter = true
  }
})

//search
let search = document.querySelector("#search")
let filterSelect = document.querySelector("#filter");
let sortSelect = document.querySelector("#sort");
search.addEventListener("input", (event) => {
  let SavedCardsList = getSavedCardsList()
  let query = event.target.value.toLowerCase().trim();
let match = SavedCardsList.filter((c) => c.name.toLowerCase().includes(query));
cardsList(match);
if (filterSelect) filterSelect.value = "Tous"; 
if (sortSelect) sortSelect.value = "id";
})

//sort
let sort = document.querySelector("#sort")
sort.addEventListener('change', (event) => {
  let SavedCardsList = getSavedCardsList()
   let value = event.target.value
   let sorted = []
   if(enabledFilter == true) {
    sorted = [...filterValue]
   } else {
    sorted = [...SavedCardsList]
   }
   if(value != "id") {
    sorted.sort((a, b) => {
      let valA = (value === "attack" || value === "defence") ? Number(a.stats[value]) : Number(a[value]);
           let valB = (value === "attack" || value === "defence") ? Number(b.stats[value]) : Number(b[value]);
           
           return valB - valA; 
    })
   
    cardsList(sorted)
   } else if (value == "id") cardsList(sorted)
})

// show card detail

  cards.addEventListener('click', (event) => {
    let SavedCardsList = getSavedCardsList()
    if (event.target.closest('button') && event.target.closest('button').classList.contains('card-btn')) {
      return; 
    }

    const article = event.target.closest('article');
    if (!article) return;

    const cardId = article.querySelector('span').textContent
    const selectedCard = SavedCardsList.find(c => c.id === cardId);

    if (selectedCard) {
      showCardDetails(selectedCard);
    }
});



// Add mew cards to the list

// Validation
const form = document.querySelector(`#creature-form`);

const regexPatterns = {
    id: /^#\d+$/,                  
    name: /^[a-zA-Z\s]{2,30}$/, 
    type: /^(Effect|LIGHT|Fusion|DARK|EARTH|WATER)$/,  
    level: /^([0-9]|1[0-2])$/,  
    attack: /^([0-9]|[1-9][0-9]{1,2}|[1-4][0-9]{3}|5000)$/,              
    defence: /^([0-9]|[1-9][0-9]{1,2}|[1-4][0-9]{3}|5000)$/,
    image:/^https?:\/\/.+\.(png|jpg|jpeg|webp|gif)$/i,         
    description: /^[\s\S]{10,200}$/  
};

const errorMessages = {
    id: "The format must be # followed by 3 digits (e.g., #010...)",
    name: "The name must contain only letters (2-30 characters).",
    level: "Please enter a valid level.",
    attack: "The attack must be a number between 0 and 5000.",
    defence: "The defence must be a number between 0 and 5000.",
    image: "Please enter a valid image link (starting with https:// and ending with a valid image format).",
    description: "The description must contain between 10 and 200 characters."
};

form.addEventListener(`focusout`, (event) => {
  const input = event.target
  const fieldName = input.name

  if (!regexPatterns[fieldName]) return;

  validateField(input, fieldName);
})

function validateField(input, fieldName) {
  const pattern = regexPatterns[fieldName];
  const errorSpan = input.nextElementSibling;
  if (input.value == "") {
    if(errorSpan && errorSpan.classList.contains(`error-message`)) {
      input.classList.remove(`border-red-500`);
      input.classList.remove(`border-green-500`);
      errorSpan.textContent = "";
      }
  }
  else if (pattern.test(input.value.trim())) {
    input.classList.remove(`border-red-500`);
    input.classList.add(`border-green-500`)
    if(errorSpan && errorSpan.classList.contains(`error-message`)) {
      errorSpan.textContent = "";
    }
    return true
  } else {
    input.classList.remove(`border-green-500`);
    input.classList.add(`border-red-500`);
    if(errorSpan && errorSpan.classList.contains(`error-message`)) {
       errorSpan.textContent = errorMessages[fieldName];
       errorSpan.style.color = "red"
    }
    return false
  }
}

form.addEventListener(`submit`, (event) => {
  event.preventDefault();

  let isFormValid = true

  Object.keys(regexPatterns).forEach(fieldName => {
    const input = form.elements[fieldName];
    if(input) {
      const isValid = validateField(input, fieldName);
      if(!isValid) {
        isFormValid = false
      }
    }
  })

  if (!isFormValid) {
    
    console.log("Rectify the errors before submiting.")
    return;
  }


  const formData = new FormData(form);
  
  const newCard = {
    id: formData.get("id"),
    name: formData.get("name"),
    type: formData.get("type"),
    level: formData.get("level"),
    stats: {attack: formData.get("attack"), defence: formData.get("defence")},
    image: formData.get("image"),
    description: formData.get("description")
  };

  SavedCardsList.push(newCard);
  localStorage.setItem(`cardslist`, JSON.stringify(SavedCardsList))

  cardsList(SavedCardsList);

  form.reset();

  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.classList.remove('border-green-500', 'border-red-500');
  });
  
  let Ccounts = document.querySelector("#cards-count")
  Ccounts.textContent = Object.keys(SavedCardsList).length

  console.log("New card added successfully!", newCard);
});


  // Add to my cards

  cards.addEventListener('click', (event) => {
    if (event.target.closest('button') && event.target.closest('button').classList.contains('card-btn')) {
      const button = event.target.closest("button")

      const article = button.closest('article');
      if (!article) return;

      const cardId = article.querySelector('span').textContent
      const selectedCard = SavedCardsList.find(c => c.id == cardId)

      if (selectedCard) {
        addToMyCards(selectedCard)
      }
      

    } 

});


  function addToMyCards(cardData) {
    const mycardsSection = document.getElementById('mycards');
    if (!mycardsSection || mycardsSection.children.length >= 6) return;
    
    const existingCards = mycardsSection.querySelectorAll("#card-item");
    const isAlreadyAdded = Array.from(existingCards).some((d) => d.querySelector("span").textContent.includes(cardData.id));
    if (isAlreadyAdded) return;
    
    SavedDeck.push(cardData)
    
    localStorage.setItem(`mydeck`, JSON.stringify(SavedDeck))

    renderDeck(); 
    updateTeamCount();
  }

  

  

  const mycardsSection = document.getElementById('mycards');
  if (mycardsSection) {
    mycardsSection.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('button[aria-label="Remove card"]');
      if (!removeBtn) return;

      const cardItem = removeBtn.closest('#card-item');
      if (cardItem) {
        const cardId = cardItem.getAttribute('data-id');
        SavedDeck = SavedDeck.filter((c) => c.id != cardId)
        localStorage.setItem(`mydeck`, JSON.stringify(SavedDeck))
        renderDeck(SavedDeck)
        updateTeamCount();
      }
    });
  }


