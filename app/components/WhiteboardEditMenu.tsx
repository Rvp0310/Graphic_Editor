import React from 'react'
import AddShape from './AddShape'
import { Canvas } from 'fabric'
import AddText from './AddText';
import Save from './Save';
import Export from './Export';
import Undo from './Undo';
import Redo from './Redo';
import { Slide } from '../lib/type';

const WhiteBoardEditMenu = ({canvas, undo, redo, saveState } : {canvas: Canvas | null; undo: () => void; redo: () => void; saveState: () => void}) => {
  if (!canvas) return null;

  const slides: Slide[] = [];

  return (
    <div className = "whiteboard editMenu">
      {
        canvas && 
        <>
          <AddShape canvas = {canvas}/>
          <AddText canvas = {canvas} saveState = {saveState}/>
          <Save canvas = {canvas} slides={slides} saveCurrentSlide={() => {}}/>
          <Export canvas = {canvas} slides={slides}/>
          <Undo canvas={canvas} undo={undo}/>
          <Redo canvas={canvas} redo={redo}/>
        </>
      }
    </div>
  )
}

export default WhiteBoardEditMenu
