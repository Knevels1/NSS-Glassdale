const contentTarget = document.querySelector(".buttons__Witnesses")
const eventHub = document.querySelector(".container")

export const renderWitnessButton = () => {
    
    contentTarget.innerHTML = `
    <button id="witness-Button">Witness Statements</button>
    `
}

eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "witness-Button") {
      const witnessButtonClicked = new CustomEvent("witnessesClicked")
  
      eventHub.dispatchEvent(witnessButtonClicked)
  
    }
  })

