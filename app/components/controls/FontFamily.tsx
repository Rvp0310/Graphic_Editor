import React, { useState, useEffect } from "react";
import { Canvas, IText } from "fabric";

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Tahoma",
  "Impact",
  "Comic Sans MS",
];

const FontDropdown = ({
  selectedObject,
  canvas,
  saveState,
}: {
  selectedObject: IText;
  canvas: Canvas | null;
  saveState: () => void;
}) => {
  if (!selectedObject || !canvas) return null;
  const [font, setFont] = useState<string>("Arial");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value;

    const hasSelection =
      selectedObject.isEditing &&
      selectedObject.selectionStart != null &&
      selectedObject.selectionEnd != null &&
      selectedObject.selectionStart != selectedObject.selectionEnd;

    if (hasSelection) {
      selectedObject.setSelectionStyles({ fontFamily: newFont });
    } else {
      selectedObject.set({ fontFamily: newFont });
    }
    setFont(newFont);

    canvas?.requestRenderAll();

    saveState();
  };

  return (
    <div className="algnLabel">
      <select
        id="fontSelect"
        className="input select"
        value={font}
        onChange={handleChange}
      >
        {fonts.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontDropdown;
