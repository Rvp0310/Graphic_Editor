import React from 'react'
import AddShape from './AddShape'
import { Canvas } from 'fabric'
import AddText from './AddText';
import Save from './Save';
import Export from './Export';

const EditMenu = ({canvas} : {canvas: Canvas | null}) => {
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
        </>
      }
    </div>
  )
}

export default EditMenu
