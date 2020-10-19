export const Criminal = (criminalObj) => {
    return `
    <div class="criminal">
        <h5><b>${criminalObj.name}</b></h5>
        <p><b>Age: ${criminalObj.age}</b></p>
        <p><b>Crime: ${criminalObj.conviction}</b></p>
        <p><b>term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</b></p>
        <p><b>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</b></p>
    </div>
    `
}