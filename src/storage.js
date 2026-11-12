
export function addToSavedDeck(obj) {
   let SavedDeck = getSavedDeck()
   SavedDeck.push(obj)
   saveSavedDeck(SavedDeck)
}

export function getSavedDeck() {
let data = localStorage.getItem("mydeck")
return data ? JSON.parse(data) : []
}

export function saveSavedDeck(array) {
   localStorage.setItem("mydeck", JSON.stringify(array))
}

// Cards List
export function addToSavedCardsList(obj) {
    let SavedCardsList = getSavedCardsList()
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