import { NoteHTML } from './Note.js';
import {getNotes, useNotes} from './NoteDataProvider.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js'


const notesContainer = document.querySelector(".notesContainer");
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", () => NoteList())


export const NoteList = () => {
    getNotes()
    .then(getCriminals)
    .then(() => {
    const allNotes = useNotes()
    const allCriminals = useCriminals()
    render(allNotes, allCriminals)

    })
}


const render = (notesArray, criminalsArray) => {
    let notesHTMLRepresentations = ""
    for (const note of notesArray) {
      const foundCriminal = criminalsArray.find(criminal => criminal.id === note.criminalId)
      notesHTMLRepresentations += NoteHTML(note, foundCriminal)
    }
    notesContainer.innerHTML = `
    <section class="noteList">
      ${notesHTMLRepresentations}
    </section>
     `
  }