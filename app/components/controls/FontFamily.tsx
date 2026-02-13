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

const FontDropdown = ({selectedObject, canvas, saveState}: { selectedObject: IText; canvas: Canvas | null; saveState: () => void; }) => {
    if (!selectedObject || !canvas) return null;
    const [font, setFont] = useState<string>("Arial");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value;
    setFont(newFont);
      selectedObject.set({ fontFamily: newFont });
      canvas?.requestRenderAll();

      saveState();
    }

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
