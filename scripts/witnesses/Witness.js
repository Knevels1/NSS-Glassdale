export const Witness = (witnessObj) => {
    return `
    <div class="witness">
        <p><b>${witnessObj.name}</b></p>
        <p>${witnessObj.statements}</p>
    </div>
    `
}