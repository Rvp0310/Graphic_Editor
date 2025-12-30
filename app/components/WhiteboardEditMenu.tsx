import React from 'react'
import AddShape from './AddShape'
import { Canvas } from 'fabric'

const EditMenu = ({canvas} : {canvas: Canvas | null}) => {
  if (!canvas) return null;

  return (
    <div className = 'editMenu whiteboard'>
      {canvas && <AddShape canvas = {canvas} />}
    </div>
  )
}

export default EditMenu
