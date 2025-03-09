import {useState, FormEvent} from "react";

//TODO: extract hooks in dedicated files and use the modal in stundentafel
export const AddWorkTimeModal = ({ open }: { open: boolean }) => {
    const [isOpen, setIsOpen] = useState(open);
    const [date, setDate] = useState("");
    const [hours, setHours] = useState(0);
    const [note, setNote] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(isOpen, date, hours, note);
        setIsOpen(false);
    };

    return (
        <>
            <h1>Arbeitszeit hinzufügen</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Datum">Start Time:</label>
                    <input type="date"
                           id="datum"
                           name="Datum"
                           onChange={(e) => setDate(e.target.value)}
                           required/>
                </div>
                <div>
                    <label htmlFor="Stunden">End Time:</label>
                    <input type="number"
                           id="stunden"
                           name="stunden"
                           onChange={(e) => setHours(parseInt(e.target.value))}
                           required/>
                </div>
                <div>
                    <label htmlFor="Notiz">End Time:</label>
                    <input type="text"
                           id="note"
                           name="Notiz"
                           onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}