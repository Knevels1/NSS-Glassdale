import { getOfficers, useOfficers } from "./OfficerProvider.js"

const officersFilterContainer = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")



export const OfficerSelect = () => {
    getOfficers()
    .then(() => {
        const officersArray = useOfficers()

        render(officersArray)
         })
}

const render = officers => {
    officersFilterContainer.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${officers.map(
        officersObj => {
          return `<option value="${officersObj.name}">${officersObj.name}</option>` 
        }
      ).join("")
        }
        </select>
    `
}

eventHub.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "officerSelect") {

        const officerSelectedEvent = new CustomEvent("officerSelected", {
            detail: {
                officerName: changeEvent.target.value
            }
        })
    eventHub.dispatchEvent(officerSelectedEvent)
    }
})
