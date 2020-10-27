import {useCriminals} from "./CriminalProvider.js"

const eventHub = document.querySelector(".container")

//create eventListener and add it to the event hub to listen for alibi button being clicked
    eventHub.addEventListener("alibiButtonClicked", (eventObj)=> {
        const arrayOfCriminals = useCriminals()


    //locate the criminal who's Id matched the criminalId
        const criminalLocated = arrayOfCriminals.find((criminalObj)=> {
            return criminalObj.id === parseInt(eventObj.detail.criminalId)
        })
        AlibiList(criminalLocated)
    })

    // function that adds list of alibis to criminal card

    const AlibiList = (criminalObj) => {
        //html for every alibi
        render(criminalObj)
    }

    //render method for adding alibis
    const render = (criminalObj) => {
        const contentTarget = document.querySelector(`#criminal-${criminalObj.id}`)

        contentTarget.innerHTML += `
        <div class="alibi_list">
        ${criminalObj.known_associates.map(alibiObj => {
            return `
                    <p>${alibiObj.name}</p>
                    <p>${alibiObj.alibi}</p>
            `
        }).join("")}
        </div>
        `
    }
