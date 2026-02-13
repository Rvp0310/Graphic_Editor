import React, {useState} from 'react'
import { Canvas, IText} from 'fabric';

const TextColor = ({selectedObject, canvas, saveState}: { selectedObject: IText; canvas: Canvas | null; saveState: () => void; }) => {
    if (!selectedObject || !canvas) return null;
    const [textColor, setTextColor] = useState('#14116b');

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextColor(e.target.value);
        selectedObject.set({fill: e.target.value});
        canvas.renderAll();
    }

  return (
    <div className="fontColorInput">
      <label htmlFor="textColorInput" className="form-label">
          A
      </label>
      <input
          type="color"
          className="form-control form-control-color input"
          id="textColorInput"
          value={textColor}
          onInput={handleColorChange}
          onBlur={saveState}
          title="Choose your color"
        />
    </div>
  )
}

export default TextColor
