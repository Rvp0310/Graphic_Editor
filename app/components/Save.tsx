import React from 'react'
import { Canvas } from 'fabric';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';

const Save = ({ canvas }: { canvas: Canvas | null }) => {
    const handleSave = async() => {
        if (!canvas) return;
        const canvasJSON = canvas.toJSON();

        try{
            const res = await fetch('/api/design/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Untitled Design',
                    canvas: canvasJSON
                })
            });

            if(!res.ok){
                throw new Error('Save Failed');
            }

            toast.success("Saved");
        } catch (err) {
            toast.error("Save Failed");
        }
    }
  return (
    <>
      <button className="editOp" onClick={handleSave}>
        <img className="editOpIcon" src="/save.svg" alt="Save" />
        <p>Save</p>
      </button>
    </>
  )
}

export default Save
