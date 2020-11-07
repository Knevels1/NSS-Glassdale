import { saveNote } from "./NoteDataProvider.js"
import {getCriminals, useCriminals} from "../criminals/CriminalProvider.js"


const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

const render = (arrayOfCriminals) => {
    contentTarget.innerHTML = `
        <input id="note--dateOfInterview" type="date"/>
        <input id="note--author" type="text" placeholder="Your Name Here"/>
        <select id="noteForm--criminal" class="criminalSelect">
        <option value="0">Please select a criminal</option>
        ${
            arrayOfCriminals.map(criminal => {
                return `<option value="${ criminal.id }">${ criminal.name }</option>`
            }).join("")
        }
        </select>
        <textarea id="note--note" placeholder="Your Note Here"></textarea>
        <button id="saveNote">Save Note</button>
    `
}

eventHub.addEventListener("click", clickEvent => {
    console.log(clickEvent)
    if(clickEvent.target.id === "saveNote") {
        const dateOfInterview = document.querySelector("#note--dateOfInterview").value
        const author = document.querySelector("#note--author").value
        const suspect = document.querySelector("#note--suspect").value
        const note = document.querySelector("#note--note").value
        const timestamp = Date.now()

        const newNote = {
            dateOfInterview,
            timestamp,
            author,
            suspect,
            note
        }
        saveNote(newNote)
    }
})


export const NoteForm = () => {
    getCriminals()
    .then(() => {
        const listOfCriminals = useCriminals()
        render(listOfCriminals)
    })
}