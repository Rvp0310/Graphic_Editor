"use client"

import React, {useState} from 'react'

const TextFormatPannel = () => {
  const [fillColor, setFillColor] = useState('#14116b');

  const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFillColor(e.target.value);
    selectedObject.set({fill: e.target.value});
    canvas.renderAll();
  }

  return (
    <div className='TextPannel setting'>
       <div className="PannelSection">
        <h5>Background</h5>
        <div className="algnLabel">
        <label htmlFor="backgroundColorInput" className="form-label">
          Fill
        </label>
        <input
          type="color"
          className="form-control form-control-color input"
          id="backgroundColorInput"
          value={fillColor}
          onChange={handleFillChange}
          title="Choose your color"
        />
        </div> {/* opacity included */}
      </div>
    </div>
  )
}

export default TextFormatPannel
