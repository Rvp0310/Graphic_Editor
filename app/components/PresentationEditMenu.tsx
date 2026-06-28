import React from 'react'
import AddShape from './AddShape'
import { Canvas } from 'fabric'
import AddText from './AddText';
import Save from './Save';
import Export from './Export';
// import Undo from './Undo';
// import Redo from './Redo';
import {Slide} from '../lib/type';

const PresentationEditMenu = ({canvas, slides, saveCurrentSlide, undo, redo, saveState} : {canvas: Canvas | null; slides: Slide[]; saveCurrentSlide: () => void; undo: () => void; redo: () => void; saveState: () => void; }) => {
  if (!canvas) return null;
  return (
    <div className = "presentation editMenu">
      {
        canvas && 
        <>
        {/* <div className='sect'>
            <Undo canvas={canvas} undo={undo}/>
            <Redo canvas={canvas} redo={redo}/>
        </div> */}
        <div className='sect'>
          <Save canvas = {canvas} slides={slides} saveCurrentSlide={saveCurrentSlide}/>
            <Export canvas = {canvas} slides={slides}/>
        </div>
          <AddShape canvas = {canvas}/>
          <AddText canvas = {canvas} saveState = {saveState}/>
        </>
      }
    </div>
  )
}

export default PresentationEditMenu
