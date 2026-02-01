import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import toast from 'react-hot-toast';

const RenameField = ({id, Name, setDisplay, handleClose, fetchDesigns}: {id: string; Name: string; setDisplay: React.Dispatch<React.SetStateAction<boolean>>; handleClose: () => void; fetchDesigns: () => void}) => {
    const [name, setName] = useState<string>(Name);

    const handleRename = async () => {
        try{
            if (!name.trim()) {
                toast.error("Name cannot be empty");
                return;
            }

            const res = await fetch('/api/design/save', {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({designId: id, name})
            });

            if (!res.ok){
                toast.error("Error Renaming The Design");
            }

            toast.success("Design Renamed");

            fetchDesigns();
            handleClose();
            setDisplay(false);
        } catch {
            toast.error("Error Renaming The Design");
        }
    }
  return (
    <dialog className="renameFile">
          <TextField
            id="filled-basic"
            label="Design Name"
            value={name}
            variant="filled"
            onChange={(e) => {
                setName(e.target.value);
            }}
            autoFocus
          />
          <Button variant="contained" color="success" onClick={handleRename}>
            Save
          </Button>
        </dialog>
  )
}

export default RenameField
