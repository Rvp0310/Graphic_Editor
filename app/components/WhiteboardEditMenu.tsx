import React from 'react'
import AddShape from './AddShape'
import { Canvas } from 'fabric'
import AddText from './AddText';
import Save from './Save';
import Export from './Export';
import Undo from './Undo';
import Redo from './Redo';

const EditMenu = ({canvas, undo, redo} : {canvas: Canvas | null; undo: () => void; redo: () => void}) => {
  if (!canvas) return null;

  return (
    <div className = 'editMenu whiteboard'>
      {
        canvas && 
        <>
          <AddShape canvas = {canvas} />
          <AddText canvas = {canvas} />
          <Save canvas = {canvas} />
          <Export canvas = {canvas} />
          <Undo canvas={canvas} undo={undo}/>
          <Redo canvas={canvas} redo={redo}/>
        </>
      }
    </div>
  )
}

export default EditMenu
