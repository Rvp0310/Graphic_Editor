import React from 'react'

const ShapeFormatPannel = () => {
  return (
    <div className = 'ShapePannel'>
        <div>
            <label htmlFor="exampleColorInput" className="form-label">Color picker</label>
            <input type="color" className="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color"></input>    
        </div>  //opacity included
        <div>
            Border Colour
            Border Radius
        </div>
        <div>
            Width
            Height
        </div>
        <div>
            Rotation Left
            Rotation Right
        </div>
        <div>
            Flip Horizontal
            Flip Vertical
        </div>
        <div>
            Bring Forward
            Send Backward
        </div>  
    </div>
  )
}

export default ShapeFormatPannel
