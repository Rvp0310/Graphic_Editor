import React from "react";
import { Canvas, IText } from "fabric";
import TextColor from "./TextColor";
import TextHighLight from "./TextHighLight";

const FontEffects = ({
  selectedObject,
  canvas,
}: {
  selectedObject: IText;
  canvas: Canvas | null;
}) => {
  if (!selectedObject || !canvas) return null;

  const toggle = (prop: keyof IText, val: any) => (
    selectedObject.set(prop, selectedObject.get(prop) === val ? "" : val),
    canvas.renderAll()
  );

  return (
    <div className="inputGroup">
      <div className="algnLabel">
        <TextColor canvas={canvas} selectedObject={selectedObject} />
      </div>

      <div className="algnLabel">
        <TextHighLight canvas={canvas} selectedObject={selectedObject} />
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
