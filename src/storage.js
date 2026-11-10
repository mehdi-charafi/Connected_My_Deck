let SavedDeck = JSON.parse(localStorage.getItem('mydeck')) || [];
let SavedCardsList = JSON.parse(localStorage.getItem(`cardslist`)) || [];

export function addToSavedDeck(obj) {
   SavedDeck.push(obj)
}

export function getSavedDeck() {
let data = localStorage.getItem("mydeck")
return data ? JSON.parse(data) : []
}

export function saveSavedDeck(array) {
   localStorage.setItem("mydeck", JSON.stringify(array))
}

export function addToSavedCardsList(obj) {
    SavedCardsList.push(obj)
saveSavedCardsList(SavedCardsList)
}

export function getSavedCardsList() {
    let data = localStorage.getItem("cardslist")
    return data ? JSON.parse(data) : []
}

export function saveSavedCardsList(array) {
    localStorage.setItem("cardslist", JSON.stringify(array))
}