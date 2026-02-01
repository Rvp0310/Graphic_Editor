import React from 'react'
import { Canvas } from "fabric";

const Undo = ({ canvas, undo }: { canvas: Canvas | null, undo: () => void }) => {
  return (
    <button className="editOp" onClick={undo}>
        <img className="editOpIcon" src="/undo.svg" alt="Undo" />
        <p>Undo</p>
    </button>
  )
}

export default Undo
