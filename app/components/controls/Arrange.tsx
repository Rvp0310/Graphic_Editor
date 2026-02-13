import React from 'react'
import { Canvas, IText, FabricObject} from 'fabric';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import IconButton from '@mui/material/IconButton';
import { Layers, BringToFront, SendToBack } from 'lucide-react';

const Arrange = ({selectedObject, canvas, saveState}: { selectedObject: FabricObject | IText; canvas: Canvas | null; saveState: () => void; }) => {
    if (!selectedObject || !canvas) return null;
    
  return (
    <div className="inputGroup">
        <IconButton onClick = {() => {canvas.sendObjectBackwards(selectedObject); saveState();}}>
          <FlipToBackIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton onClick = {() => {canvas.bringObjectForward(selectedObject); saveState();}}>
          <FlipToFrontIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton onClick = {() => {canvas.sendObjectToBack(selectedObject); saveState();}}>
          <SendToBack size={25} strokeWidth={1.75} color="white"/>
        </IconButton>
        <IconButton onClick = {() => {canvas.bringObjectToFront(selectedObject); saveState();}}>
          <BringToFront size={25} strokeWidth={1.75} color="white"/>
        </IconButton> 
        </div>
  )
}

export default Arrange
