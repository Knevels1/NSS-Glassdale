
export const NoteHTML = (noteObject) => {
    return `
    
    <div class="note">
        <h5>Interviewer: ${noteObject.author}</h5>
        <p>Suspect: ${noteObject.suspect}</p>
        <p>Date of Interview: ${noteObject.dateOfInterview}</p>
        <p>Time Note Entered: ${new Date(noteObject.timestamp).toLocaleDateString('en-US')}</p>
        <p>Note: ${noteObject.note}</p>
    </div>
    `
    }