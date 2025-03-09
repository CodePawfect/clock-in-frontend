import {FormEvent} from "react";

interface AddWorkTimeModalProps {
    setOpen: (open: boolean) => void;
    setNewWorkTimeDate: (date: string) => void;
    setNewWorkTimeHours: (hours: number) => void;
    setNewWorkTimeNote: (note: string) => void;
}

export const AddWorkTimeModal = ({
                                     setOpen,
                                     setNewWorkTimeDate,
                                     setNewWorkTimeHours,
                                     setNewWorkTimeNote
                                 }: AddWorkTimeModalProps) => {

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setOpen(false);
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
                           onChange={(e) => setNewWorkTimeDate(e.target.value)}
                           required/>
                </div>
                <div>
                    <label htmlFor="Stunden">End Time:</label>
                    <input type="number"
                           id="stunden"
                           name="stunden"
                           onChange={(e) => setNewWorkTimeHours(Number(e.target.value))}
                           required/>
                </div>
                <div>
                    <label htmlFor="Notiz">End Time:</label>
                    <input type="text"
                           id="note"
                           name="Notiz"
                           onChange={(e) => setNewWorkTimeNote(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}