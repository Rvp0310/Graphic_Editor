"use client"

import React, {useState} from 'react'
import { Canvas, IText} from 'fabric';
import FontDropdown from './controls/FontFamily';
import FontSize from './controls/FontSize';
import FontAlign from './controls/FontAlign';
import TextEdit from './controls/TextEdit';
import FontEffects from './controls/FontEffects';
import Arrange from './controls/Arrange';

const TextFormatPannel = ({selectedObject, canvas}: { selectedObject: IText; canvas: Canvas | null; }) => {
  if (!selectedObject || !canvas) return null;

  return (
    <div className='TextPannel setting'>
      <div className="PannelSection">
        <h5>Typography</h5>
        <div className="inputGroup">
        <div className="algnLabel">
          <FontDropdown canvas={canvas} selectedObject={selectedObject}/>
        </div>
        <div className="algnLabel">
          <FontSize canvas={canvas} selectedObject={selectedObject} />
        </div>
        </div>
      </div>
       <div className="PannelSection">
        <h5>Color and Effect</h5>
        <FontEffects selectedObject={selectedObject} canvas={canvas}/>
        <div className="PannelSection">
        <h5>Layout</h5>
        <div className="inputGroup">
          <FontAlign canvas={canvas} selectedObject={selectedObject}/>
          <TextEdit canvas={canvas} selectedObject={selectedObject}/>
        </div>
        </div>
        <div className="PannelSection">
        <h5>Position</h5>
        <Arrange canvas={canvas} selectedObject={selectedObject} /> 
      </div>
      </div>
    </div>
  )
}

export default TextFormatPannel;
