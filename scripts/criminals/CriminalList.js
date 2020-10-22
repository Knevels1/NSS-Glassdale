import { getCriminals, useCriminals } from "./CriminalProvider.js"
import { Criminal } from "./Criminals.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"


const eventHub = document.querySelector(".container")


const criminalsContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {

  getCriminals()
    .then(() => {
      const criminalArray = useCriminals()
      render(criminalArray)
    })

}


// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeSelected", event => {
  // console.log("crimeSelected event happened", event.detail.crimeThatWasChosen)

  if (event.detail.crimeThatWasChosen !== 0) {

    //Get the list of criminals
    const criminalsArray = useCriminals()

    // Get the array of convictions
    const convictionsArray = useConvictions()
    // console.log("array of convictions", convictionsArray)

    // Use the find method to get the first object in the convictions array that has the same id as the id of the chosen crime
    const convictionThatWasChosen = convictionsArray.find(convictionObj => {
      // debugger
      return convictionObj.id === event.detail.crimeThatWasChosen
    })
    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
      return criminalObj.conviction === convictionThatWasChosen.name
    })
    render(filteredCriminalsArray)
  }else {
      CriminalList()
  }
})

eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
  const selectedOfficerName = officerSelectedEventObj.detail.officerName
  console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name: ", selectedOfficerName)

  const criminalsArray = useCriminals()
  console.log("criminalsArray", criminalsArray)

  const filteredArrayCriminals = criminalsArray.filter(
    (criminalObj) => {

      if (criminalObj.arrestingOfficer === selectedOfficerName) {
        return true
      }
      return false
    }
  )
  console.log("CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer", filteredArrayCriminals)

  render(filteredArrayCriminals)
  console.log("CriminalList: Filtered list of criminals rendered to DOM")
})


const render = (criminalsArray) => {
  let criminalsHTMLRepresentations = ""
  for (const criminal of criminalsArray) {

    criminalsHTMLRepresentations += Criminal(criminal)

    criminalsContainer.innerHTML = `
          <h3>Glassdale Criminals</h3>
          <section class="criminalsList">
            ${criminalsHTMLRepresentations}
          </section>
        `
  }
}