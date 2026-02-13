import React, {useRef} from 'react'
import { Canvas } from 'fabric'
import { IText } from "fabric";

const AddText = ({canvas, saveState} : {canvas: Canvas | null; saveState: () => void}) => {
  const isAddingText = useRef(false);

  const addText = () => {
  if (!canvas || isAddingText.current) return;

  isAddingText.current = true;
  canvas.defaultCursor = "text";

  const onMouseDown = (opt: any) => {
    const pointer = canvas.getScenePoint(opt.e);

    const text = new IText("Type here", {
        left: pointer.x,
        top: pointer.y,
        fontSize: 24,
        fill: "#14116b",
        editable: true,
        hoverCursor: "move",
        moveCursor: "move"
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();

      text.on("editing:exited", () => {
        text.editable = false;        
        text.hoverCursor = "move";
        canvas.defaultCursor = "default";
      });

      // re-enable editing on double click
      text.on("mousedblclick", () => {
        text.editable = true;
        text.enterEditing();
        text.selectAll();
      });

      text.enterEditing();
      text.selectAll();

      canvas.off("mouse:down", onMouseDown);
      canvas.defaultCursor = "default";

      isAddingText.current = false;
    };

    canvas.on("mouse:down", onMouseDown);
  };


  return (
    <button className="editOp" onClick={addText}>
        <img className="editOpIcon" src="/addText.svg" alt="Add text" />
        <p>Add TextBox</p>
    </button>
  )
}

export default AddText
