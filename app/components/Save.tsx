import React, {useState} from 'react'
import { Canvas } from 'fabric';
import NameField from './NameField';
import toast from 'react-hot-toast';
import { useParams, usePathname } from 'next/navigation';
import { Slide } from '../lib/type';

const Save = ({ canvas, slides, saveCurrentSlide}: { canvas: Canvas | null; slides: Slide[]; saveCurrentSlide: () => void; }) => {
    const pathname = usePathname();
    const [display, setDisplay] = useState<boolean>(false);
    const {id} = useParams();

    const handleSaveClick = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });

      if (!res.ok) {
        toast.error("Please log in to save your work.")
        return;
      }

      if (!canvas) return;

      canvas?.discardActiveObject();
      canvas?.requestRenderAll();

      if(id) {
        try {
          const type =
      pathname.includes("presentation")
        ? "presentation"
        : "whiteboard";

        const updatedSlides =
  type === "presentation"
    ? slides.map((s, i) =>
        i === slides.length - 1
          ? { ...s, canvasData: canvas.toJSON() }
          : s
      )
    : [];

        let thumbnail = "";

if (type === "presentation") {
  const tempCanvas = new Canvas();

  await tempCanvas.loadFromJSON(updatedSlides[0].canvasData);

  thumbnail = tempCanvas.toDataURL({
    format: "png",
    quality: 0.6,
    multiplier: 0.25,
  });
} else {
  thumbnail = canvas.toDataURL({
    format: "png",
    quality: 0.6,
    multiplier: 0.05,
  });
}

        const content =
        type === "presentation"
          ? updatedSlides
          : canvas.toJSON();
          const res = await fetch(`/api/design/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              content: content,
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
      saveCurrentSlide();
      setDisplay(true);
    }
  return (
    <>
      <button className="editOp" onClick={handleSaveClick}>
        <img className="editOpIcon" src="/save.svg" alt="Save" />
        <p>{id? "Update": "Save"}</p>
      </button>
        {display && <NameField canvas={canvas} setDisplay={setDisplay} slides={slides}/>}
    </>
  )
}

export default Save
