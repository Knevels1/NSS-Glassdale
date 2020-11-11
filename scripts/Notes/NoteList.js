import { NoteHTML } from './Note.js';
import {getNotes, useNotes, deleteNote} from './NoteDataProvider.js';
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
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("deleteNote--")) {
      const [prefix, id] = clickEvent.target.id.split("--")

      /*
          Invoke the function that performs the delete operation.

          Once the operation is complete you should THEN invoke
          useNotes() and render the note list again.
      */
     deleteNote(id).then(
         () => {
             const updatedNotes = useNotes()
             const criminals = useCriminals()
             render(updatedNotes, criminals)
         }
     )
  }
})


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