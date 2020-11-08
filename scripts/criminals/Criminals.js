const eventHub = document.querySelector(".container")

export const Criminal = (criminalObj) => {
    return `
    <div id="criminal-${criminalObj.id}" class="criminal">
        <h5><b>${criminalObj.name}</b></h5>
        <p><b>Age: ${criminalObj.age}</b></p>
        <p><b>Crime: ${criminalObj.conviction}</b></p>
        <p><b>term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</b></p>
        <p><b>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</b></p>
        <button id="associates--${criminalObj.id}">Associate Alibis</button>
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