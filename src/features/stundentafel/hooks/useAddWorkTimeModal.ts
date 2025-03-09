import {useState} from "react";

export const useAddWorkTimeModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [newWorkTimeDate, setNewWorkTimeDate] = useState<string>("");
    const [newWorkTimeHours, setNewWorkTimeHours] = useState<number>(0);
    const [newWorkTimeNote, setNewWorkTimeNote] = useState<string>("");

    //TODO: add api call to add work time

    return { open, setOpen, setNewWorkTimeDate, setNewWorkTimeHours, setNewWorkTimeNote };
};
