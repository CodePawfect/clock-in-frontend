import {useState} from "react";

export const useAddWorkTimeModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [newWorkTimeDate, setNewWorkTimeDate] = useState<string>("");
    const [newWorkTimeHours, setNewWorkTimeHours] = useState<number>(0);
    const [newWorkTimeNote, setNewWorkTimeNote] = useState<string>("");

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const addWorkTimeUrl = `${baseUrl}/api/worktimes`;

    const createWorkTime = async (): Promise<void> => {
        await fetch(addWorkTimeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                date: newWorkTimeDate,
                hoursWorked: newWorkTimeHours,
                note: newWorkTimeNote
            })
        });

        setNewWorkTimeNote("")
        setNewWorkTimeDate("")
        setNewWorkTimeHours(0)
        setOpen(false)
    }

    return {open, setOpen, setNewWorkTimeDate, setNewWorkTimeHours, setNewWorkTimeNote, createWorkTime};
};
