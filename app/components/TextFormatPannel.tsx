"use client"

import React, {useState} from 'react'
import { Canvas, IText} from 'fabric';
import { Layers, BringToFront, SendToBack } from 'lucide-react';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import IconButton from '@mui/material/IconButton';
import TextColor from './controls/TextColor';
import FontDropdown from './controls/FontFamily';
import FontSize from './controls/FontSize';

const TextFormatPannel = ({selectedObject, canvas}: { selectedObject: IText; canvas: Canvas | null; }) => {
  if (!selectedObject || !canvas) return null;
  const [highlight, setHighlight] = useState('#fff');
  const [size, setSize] = useState(1);
  const [face, setFace] = useState('Times New Roman');


  return (
    <div className='TextPannel setting'>
      <div className="PannelSection">
        <h5>Font</h5>
        <div className="algnLabel">
          <FontDropdown canvas={canvas} selectedObject={selectedObject}/>
        </div>
        <div className="algnLabel">
          <FontSize canvas={canvas} selectedObject={selectedObject} />
        </div>
      </div>
       <div className="PannelSection">
        <h5>Color and Effect</h5>
        <div className="inputGroup">
        <TextColor canvas={canvas} selectedObject={selectedObject}/>
        <div className="algnLabel">
          <button className='effect underline'>U</button>
        </div>
        <div className="algnLabel">
          <button className='effect strikethrough'>S</button>
        </div>
        </div>
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
