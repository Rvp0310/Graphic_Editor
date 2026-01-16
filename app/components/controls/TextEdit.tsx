import React, { useState, useEffect } from 'react'
import { Canvas, IText } from 'fabric';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';

const TextEdit = ({selectedObject, canvas}: { selectedObject: IText; canvas: Canvas | null; }) => {
  if (!selectedObject || !canvas) return null;

  const [lineHeight, setLineHeight] = useState<number>(1);

  useEffect(() => {
    setLineHeight(selectedObject.lineHeight || 1);
  }, [selectedObject])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newheight = +e.target.value;
    selectedObject.set({ lineHeight: newheight });
        setLineHeight(newheight);
        selectedObject.setCoords();
        canvas.requestRenderAll();
  }

  return (
    <div className='TextEd'>
            <FormatLineSpacingIcon sx={{color: 'white', fontSize: '20px'}}/>
            <input
                className='input'
                type='number'
                max={5}
                min={1}
                step={0.5}
                value={lineHeight}
                onChange={handleChange}
            />
          </div>
  )
}

export default TextEdit
