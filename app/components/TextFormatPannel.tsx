"use client"

import React, {useState} from 'react'
import { Canvas, FabricObject} from 'fabric';
import { Layers, BringToFront, SendToBack } from 'lucide-react';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import IconButton from '@mui/material/IconButton';

const TextFormatPannel = ({selectedObject, canvas}: { selectedObject: FabricObject; canvas: Canvas | null; }) => {
  if (!selectedObject || !canvas) return null;
  
  const [highlight, setHighlight] = useState('#fff');
  const [size, setSize] = useState(1);
  const [face, setFace] = useState('Times New Roman');
  const [textColor, setTextColor] = useState('#14116b');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
    selectedObject.set({textColor: e.target.value});
    canvas.renderAll();
  }

  return (
    <div className='TextPannel setting'>
       <div className="PannelSection">
        <h5>Background</h5>
        <div className="fontColorInput">
        <label htmlFor="textColorInput" className="form-label">
          A
        </label>
        <input
          type="color"
          className="form-control form-control-color input"
          id="textColorInput"
          value={textColor}
          onChange={handleColorChange}
          title="Choose your color"
        />
        </div> {/* opacity included */}
        <div className="PannelSection">
        <h5>Position</h5>
        <div className="inputGroup">
        <IconButton onClick = {() => canvas.sendObjectBackwards(selectedObject)}>
          <FlipToBackIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton onClick = {() => canvas.bringObjectForward(selectedObject)}>
          <FlipToFrontIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton onClick = {() => canvas.sendObjectToBack(selectedObject)}>
          <SendToBack size={25} strokeWidth={1.75} color="white"/>
        </IconButton>
        <IconButton onClick = {() => canvas.bringObjectToFront(selectedObject)}>
          <BringToFront size={25} strokeWidth={1.75} color="white"/>
        </IconButton> 
        </div>
      </div>
      </div>
    </div>
  )
}

export default TextFormatPannel
