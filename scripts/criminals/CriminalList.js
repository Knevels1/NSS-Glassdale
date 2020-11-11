import { getCriminals, useCriminals } from "./CriminalProvider.js"
import {getFacilities, useFacilities} from "../facility/FacilityProvider.js"
import {getCriminalFacilities, useCriminalFacilities} from "../facility/CriminalFacilityProvider.js"
import { Criminal } from "./Criminals.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { OfficerList } from "../officers/OfficerList.js"


const eventHub = document.querySelector(".container")


const criminalsContainer = document.querySelector(".criminalsContainer")
let facilities = []
let crimFac = []
let criminals = []


export const CriminalList = () => {
  // Kick off the fetching of both collections of data
  getFacilities()
      .then(getCriminalFacilities)
      .then(
          () => {
              // Pull in the data now that it has been fetched
              facilities = useFacilities()
              crimFac = useCriminalFacilities()
              criminals = useCriminals()

              // Pass all three collections of data to render()
              render(criminals, facilities, crimFac)
          }
      )
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
    //get the facilites
    const facilities = useFacilities()
    //get the crimFac
    const criminalFacility = useCriminalFacilities()




    // Use the find method to get the first object in the convictions array that has the same id as the id of the chosen crime
    const convictionThatWasChosen = convictionsArray.find(convictionObj => {
      // debugger
      return convictionObj.id === event.detail.crimeThatWasChosen
    })
    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
      return criminalObj.conviction === convictionThatWasChosen.name
    })
    render(filteredCriminalsArray, facilities, criminalFacility)
  }else {
      CriminalList()
  }
})

eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
  const selectedOfficerName = officerSelectedEventObj.detail.officerName
  //console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name: ", selectedOfficerName)

  const criminalsArray = useCriminals()
  //console.log("criminalsArray", criminalsArray)

    //get the facilites
    const facilities = useFacilities()
    //get the crimFac
    const criminalFacility = useCriminalFacilities()

  const filteredArrayCriminals = criminalsArray.filter(
    (criminalObj) => {

      if (criminalObj.arrestingOfficer !== 0) {
        return criminalObj.arrestingOfficer === selectedOfficerName
      }
    })
  //console.log("CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer", filteredArrayCriminals)

  render(filteredArrayCriminals, facilities, criminalFacility)
  
  //console.log("CriminalList: Filtered list of criminals rendered to DOM")
})


const render = (criminalsToRender, allFacilities, allRelationships) => {
  // Step 1 - Iterate all criminals
  criminalsContainer.innerHTML = criminalsToRender.map(
      (criminalObject) => {
          // Step 2 - Filter all relationships to get only ones for this criminal
          const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

          // Step 3 - Convert the relationships to facilities with map()
          const facilities = facilityRelationshipsForThisCriminal.map(cf => {
              const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
              return matchingFacilityObject
          })

          // Must pass the matching facilities to the Criminal component
          return Criminal(criminalObject, facilities)
      }
  ).join("")
}