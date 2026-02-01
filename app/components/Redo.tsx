import React from 'react'
import { Canvas } from "fabric";

const Redo = ({ canvas, redo }: { canvas: Canvas | null; redo: () => void }) => {
  return (
    <button className="editOp" onClick={redo}>
        <img className="editOpIcon" src="/redo.svg" alt="Redo" />
        <p>Redo</p>
    </button>
  )
}

export default Redo
