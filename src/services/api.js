import { addToSavedCardsList, getSavedCardsList, saveSavedCardsList } from "../storage.js";
import { hideLoading, showErrorState } from "../ui.js";
// Roll A Card 



 export async function requist(source) {
 const CACHE_NAME = 'yugi-cards-cache-v1';

    try {
  
    const cache = await caches.open(CACHE_NAME);
    
    let cachedResponse = await cache.match(source);
    if (cachedResponse) {
      console.log("Loaded cards from Cache API");
      let data = await cachedResponse.json();
      return data.data || data; 
    }
        console.log("Fetching cards from API...");
         let response = await fetch(source)

         if (!response.ok) {
            throw new Error(`Error ${response.status}: Not able to fetch data.`);
        }
        cache.put(source, response.clone());

         let data = await response.json()
        
         let allCards = data.data 
         return allCards
        
        } catch (error) {
        console.error("The load failed ", error.message);
        hideLoading()
        showErrorState(error.message)
        return []
    }

    }
 

