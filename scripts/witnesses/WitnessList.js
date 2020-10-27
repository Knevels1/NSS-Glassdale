import {useWitnesses, getWitnesses} from "./WitnessProvider.js"

import {Witness} from "./Witness.js"

const eventHub = document.querySelector(".container")
const WitnessContainer = document.querySelector(".criminalsContainer")

eventHub.addEventListener("witnessesClicked", () => {
    
  
    WitnessesList()
  })
  
  const WitnessesList = () => {
  
    getWitnesses()
      .then(() => {
        const witnessesArray = useWitnesses()
        console.log(witnessesArray)
        render(witnessesArray)
      })
  
  }
  
  const render = (witnessArray) => {
    let witnessHTMLRepresentations = ""
    for (const witness of witnessArray) {
  
      witnessHTMLRepresentations += Witness(witness)
  
      witnessesContainer.innerHTML = `
            <h3>Glassdale Witnesses</h3>
            <section class="witnessesList">
              ${witnessHTMLRepresentations}
            </section>
          `
    }
  }