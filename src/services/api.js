import { cardsList } from "../main";
import { addToSavedCardsList, getSavedCardsList, saveSavedCardsList } from "../storage";
// Roll A Card 

export function loadMore() {
    console.log("load more work")
let List = getSavedCardsList()
let callBtn = document.querySelector("#rollbtn");

callBtn.addEventListener("click", async () => {
    try {
   
         let response = await fetch(`cards.json`)
         let data = await response.json()
        
         let allCards = data.data;
        
         allCards.forEach(c => {
            if(!List.includes(c)) {
                let newCard = {
            id: "#" + c.id,
            name: c.name,
            type: c.type,
            level: c.level || "---",
            stats: { 
                attack: c.atk !== undefined ? c.atk : "---", 
                defence: c.def !== undefined ? c.def : "---" 
            },
            image: c.card_images[0].image_url,
            description: c.desc || "No Description"
        }
        addToSavedCardsList(newCard)
            }
         });

        


        saveSavedCardsList(List)
                
        cardsList(List);

        console.log("The cards Loaded!");
        
    } catch (error) {
        console.error("The load failed ", error.message);
        alert("Error: " + error.message);
    }
});

}

// rest your data

export function deleteAll () {
let resetBtn = document.querySelector("#resetbtn") 

resetBtn.addEventListener("click", () => {
  localStorage.clear()
  location.reload()
})
}