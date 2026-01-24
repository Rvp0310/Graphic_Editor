import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import toast from 'react-hot-toast';
import { Canvas } from "fabric";
import { useAuth } from "../context/AuthContext";

const NameField = ({ canvas, setDisplay }: { canvas: Canvas | null, setDisplay: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const {user} = useAuth();
  if (!user) return null;

  const [name, setName] = useState<string>("Untitled Design");

  const handleSave = async() => {
        if (!canvas) return;

        const thumbnail = canvas.toDataURL({
          format: "png",
          quality: 0.6, // lower = lighter
          multiplier: 0.25, // scales down = thumbnail size
        });

        const canvasJSON = canvas.toJSON();

        try{
            const res = await fetch('/api/design/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    name: name,
                    canvas: canvasJSON,
                    thumbnail: thumbnail
                })
            });

            if(!res.ok){
                throw new Error('Save Failed');
            }

            toast.success("Saved");
            setDisplay(false);
        } catch (err) {
            toast.error("Save Failed");
        }
    }

  return (
    <dialog className="nameFile">
      <TextField
        id="filled-basic"
        label="Design Name"
        value={name}
        variant="filled"
        onChange={(e) => {
            setName(e.target.value);
        }}
      />
      <Button variant="contained" color="success" onClick={handleSave}>
        Save
      </Button>
    </dialog>
  );
};

export default NameField;
