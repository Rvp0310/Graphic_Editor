"use client";

import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Canvas, Rect } from 'fabric';

const shapes = ['Rectangle', 'Triangle', 'Circle', 'Line'];

const AddShape = ({canvas} : {canvas: Canvas | null}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTool, setActiveTool] = useState<'select' | 'Rectangle' | 'Triangle' | 'Circle' | 'Line'>('select');
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const drawShape = (selected : 'Rectangle' | 'Triangle' | 'Circle' | 'Line') => {
    if (!canvas) return;

    setActiveTool(selected);
    canvas.defaultCursor = 'crosshair';
    canvas.selection = false;

    let isDrawing = false;
    let shape: any;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (opt: any) => {
        isDrawing = true
        const pointer = canvas.getScenePoint(opt.e);
        startX = pointer.x;
        startY = pointer.y;
    }
    if(selected == 'Rectangle') {
        shape = new Rect({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill: '#14116b',
            selectable: false
        })
    }

    canvas.add(shape);

    const onMouseMove = (opt: any) => {
        if(!isDrawing || !shape) return;

        const pointer = canvas.getScenePoint(opt.e);

        shape.set({
            width: Math.abs(pointer.x - startX),
            height: Math.abs(pointer.y - startY),
            left: Math.min(pointer.x, startX),
            top: Math.min(pointer.y, startY)
        });

        shape.setCoords();
        canvas.renderAll();
    }

    const onMouseUp = () => {
        isDrawing = false;
        shape.set({selectable: true});

        canvas.off('mouse:down', onMouseDown);
        canvas.off('mouse:move', onMouseMove);
        canvas.off('mouse:up', onMouseUp);

        canvas.defaultCursor = 'default';
        canvas.selection = true;
        setActiveTool('select');
    }
  }

  return (
    <>
      <button className="editOp" onClick={handleClick}>
        <img className="editOpIcon" src="/addShape.svg" alt="Add Shape" />
        <p>Add Shape</p>
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx = {{
            borderRadius: 2,
            minWidth: 140,
        }}
      >
        {shapes.map(shape => (
          <MenuItem
            key={shape}
            onClick={() => {
                drawShape(shape);
              handleClose()
            }}
          >
            {shape}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AddShape
