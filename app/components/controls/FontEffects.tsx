import React from "react";
import { Canvas, IText } from "fabric";
import TextColor from "./TextColor";
import TextHighLight from "./TextHighLight";

const FontEffects = ({
  selectedObject,
  canvas,
  saveState,
}: {
  selectedObject: IText;
  canvas: Canvas | null;
  saveState: () => void;
}) => {
  if (!selectedObject || !canvas) return null;

  const toggle = (prop: keyof IText, val: any) => {
    if (!canvas || !selectedObject) return;

    const current = selectedObject.get(prop);

    const hasSelection =
      selectedObject.isEditing &&
      selectedObject.selectionStart != null &&
      selectedObject.selectionEnd != null &&
      selectedObject.selectionStart != selectedObject.selectionEnd;

    if (hasSelection) {
      selectedObject.setSelectionStyles({[prop]: current === val ? "" : val});
    } else {
      selectedObject.set(prop, current === val ? "" : val);
    }

    canvas.requestRenderAll();
    saveState();
  };

  return (
    <div className="inputGroup">
      <div className="algnLabel">
        <TextColor
          canvas={canvas}
          selectedObject={selectedObject}
          saveState={saveState}
        />
      </div>

      <div className="algnLabel">
        <TextHighLight
          canvas={canvas}
          selectedObject={selectedObject}
          saveState={saveState}
        />
      </div>

      <div className="algnLabel">
        <button
          className="effect underline"
          onClick={() => toggle("underline", true)}
        >
          U
        </button>
      </div>

      <div className="algnLabel">
        <button
          className="effect strikethrough"
          onClick={() => toggle("linethrough", true)}
        >
          S
        </button>
      </div>

      <div className="algnLabel">
        <button
          className="effect italic"
          onClick={() => toggle("fontStyle", "italic")}
        >
          I
        </button>
      </div>

      <div className="algnLabel">
        <button
          className="effect bold"
          onClick={() => toggle("fontWeight", "bold")}
        >
          B
        </button>
      </div>
    </div>
  );
};

export default FontEffects;
