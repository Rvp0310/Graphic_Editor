"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import toast from 'react-hot-toast';
import { Canvas } from "fabric";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Slide } from "../lib/type";


const NameField = ({ canvas, slides, setDisplay }: { canvas: Canvas | null, slides: Slide[], setDisplay: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const pathname = usePathname();
  const {user} = useAuth();
  const router = useRouter();

  if (!user) return null;

  const [name, setName] = useState<string>("Untitled Design");

  const handleSave = async() => {
      const type =
      pathname.includes("presentation")
        ? "presentation"
        : "whiteboard";

        if (!canvas) return;

        const tempCanvas = new Canvas();
        if (type === "presentation"){
          await tempCanvas.loadFromJSON(slides[0].canvasData);
        }

        const thumbnail = 
        type === "presentation"
          ? tempCanvas.toDataURL({
          format: "png",
          quality: 0.6, // lower = lighter
          multiplier: 0.05, // scales down = thumbnail size
        })
        :
          canvas.toDataURL({
          format: "png",
          quality: 0.6, // lower = lighter
          multiplier: 0.25, // scales down = thumbnail size
        });

        const content =
        type === "presentation"
          ? slides
          : canvas.toJSON();

        try{
            const res = await fetch('/api/design/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    name: name,
                    type: type,
                    content: content,
                    thumbnail: thumbnail
                })
            });

            if(!res.ok){
                throw new Error('Save Failed');
            }
            const data = await res.json();

            toast.success("Saved");
            
            setDisplay(false);

            const designId = data.design._id;
            if (data?.design?._id) {
              router.push(`/editor/${type}/${data.design._id}`);
            } else {
              toast.error("Something went sideways while redirecting");
            }
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
