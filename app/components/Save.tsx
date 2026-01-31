import React, {useState} from 'react'
import { Canvas } from 'fabric';
import NameField from './NameField';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

const Save = ({ canvas }: { canvas: Canvas | null }) => {
    const [display, setDisplay] = useState<boolean>(false);
    const {id} = useParams();

    const handleSaveClick = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });

      if (!res.ok) {
        toast.error("Please log in to save your work.")
        return;
      }

      if (!canvas) return;

      if(id) {
        try {
          const thumbnail = canvas.toDataURL({
            format: "png",
            quality: 0.6,
            multiplier: 0.25,
          });

          const canvasJSON = canvas.toJSON();
          const res = await fetch(`/api/design/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              canvas: canvasJSON,
              thumbnail
            })
          });

          if (!res.ok) throw new Error;

          toast.success("Updated Successfully");

          return;
        } catch {
          toast.error("Unsuccesful Update");
          return;
        }
      }

      setDisplay(true);
    }
  return (
    <>
      <button className="editOp" onClick={handleSaveClick}>
        <img className="editOpIcon" src="/save.svg" alt="Save" />
        <p>{id? "Update": "Save"}</p>
      </button>
        {display && <NameField canvas={canvas} setDisplay={setDisplay} />}
    </>
  )
}

export default Save
