import React from 'react'
import { Canvas, IText } from 'fabric';
import IconButton from '@mui/material/IconButton';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

const FontAlign = ({selectedObject, canvas}: { selectedObject: IText; canvas: Canvas | null; }) => {
  if (!selectedObject || !canvas) return null;

  const alignText = (align: 'left' | 'center' | 'right' | 'justify') =>
    selectedObject && canvas && (selectedObject.set('textAlign', align), canvas.renderAll());

  return (
    <div className="fontAlgn">
            <IconButton size="small" onClick={() => {alignText('left')}}>
              <FormatAlignLeftIcon sx={{color: 'white', fontSize: '18px'}}/>
            </IconButton>

            <IconButton size="small" onClick={() => {alignText('center')}}>
              <FormatAlignCenterIcon sx={{color: 'white', fontSize: '18px'}}/>
            </IconButton>

            <IconButton size="small" onClick={() => {alignText('right')}}>
              <FormatAlignRightIcon sx={{color: 'white', fontSize: '18px'}}/>
            </IconButton>

            <IconButton size="small" onClick={() => {alignText('justify')}}>
              <FormatAlignJustifyIcon sx={{color: 'white', fontSize: '18px'}}/>
            </IconButton>
    </div>
  )
}

export default FontAlign
