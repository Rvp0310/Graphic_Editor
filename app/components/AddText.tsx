import React from 'react'
import { Canvas } from 'fabric'

const AddText = ({canvas} : {canvas: Canvas | null}) => {
  return (
    <button className="editOp" >
        <img className="editOpIcon" src="/addText.svg" alt="Add text" />
        <p>Add TextBox</p>
    </button>
  )
}

export default AddText
