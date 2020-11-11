const eventHub = document.querySelector(".container")

export const Criminal = (criminalObject, facilities) => {
    return `
    <div class="criminal">
        <h4>${criminalObject.name}</h4>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div>
                <h4>Facility</h4>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <button id="associates--${criminalObject.id}">Show Associates</button>
        </div>
    </div>
    `
}

eventHub.addEventListener("click", (eventObj)=> {
    //split the id of the alibi button!
    const [nameOfId, criminalId] = eventObj.target.id.split("--")

    // check to see if the button was click IS in fact the alibi button
    if(eventObj.target.id.startsWith("associates--")){
        //custom event
        const alibiEvent = new CustomEvent("alibiButtonClicked", {
            detail: {
                criminalId: criminalId
            }
        })
        //dispatch the event to the EventHub for other modules to listen for
        eventHub.dispatchEvent(alibiEvent)
    }
})