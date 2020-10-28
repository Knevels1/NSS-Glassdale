
import {ConvictionSelect} from "./convictions/ConvictionSelect.js"
import {CriminalList} from "./criminals/CriminalList.js"
 import {OfficerList} from "./officers/OfficerList.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"
import { NoteForm } from "./Notes/NoteForm.js"
import { NoteList } from "./Notes/NoteList.js"
import  "./criminals/AlibiList.js"
import { renderWitnessButton } from "./witnesses/WitnessButton.js"
import "./witnesses/WitnessList.js"
 

CriminalList()
OfficerList()
ConvictionSelect()
OfficerSelect()
NoteForm()
NoteList()
renderWitnessButton()

