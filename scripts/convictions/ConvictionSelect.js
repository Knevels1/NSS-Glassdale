/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { getConvictions, useConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")
//console.log(eventHub)

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions()
    .then(() => {
        const convictions = useConvictions()
        render(convictions)
    })
}

const render = convictionsCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(
                    convictionsObj => {
                       return `<option value="${convictionsObj.id}">${convictionsObj.name}</option>` 
                    }
                ).join("")
            }
        </select>
    `
}
    // On the event hub, listen for a "change" event.
    eventHub.addEventListener("change", (changeEvent) => {
        // console.log(changeEvent.target.value)
    
        // Only do this if the `crimeSelect` element was changed
        if (changeEvent.target.id === "crimeSelect") {
    
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeSelected", {
            detail: {
            crimeThatWasChosen: parseInt(changeEvent.target.value)
            }
        })
        
        eventHub.dispatchEvent(customEvent)
        }
  })