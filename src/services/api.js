import { addToSavedCardsList, getSavedCardsList, saveSavedCardsList } from "../storage.js";
// Roll A Card 



 export async function requist(source) {
    try {
   
         let response = await fetch(source)

         if (!response.ok) {
            throw new Error(`Error ${response.status}: Not able to fetch data.`);
        }

         let data = await response.json()
        
         let allCards = data.data 
         return allCards
        
        } catch (error) {
        console.error("The load failed ", error.message);
        return []
    }

    }
 

