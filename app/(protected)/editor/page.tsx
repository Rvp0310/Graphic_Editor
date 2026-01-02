"use client"

import ShapeFormatPannel from '@/app/components/ShapeFormatPannel';
import WhiteboardEditMenu from '@/app/components/WhiteboardEditMenu'
import { Canvas, Rect } from 'fabric';
import React, {Ref, useEffect, useRef, useState} from 'react'

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<null|Canvas>(null);

  useEffect(() => {
    if(!canvasRef.current || !containerRef.current)
      return;

    const {clientWidth, clientHeight} = containerRef.current;

    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    const fc = new Canvas(canvasRef.current, {
      width: clientWidth,
      heigt: clientHeight,
      selection: true,
      backgroundColor: '#fff'
    });

    setCanvas(fc);

    const bg = new Rect({
      left: 0,
      top: 0,
      width: clientWidth,
      height: clientHeight,
      fill: 'transparent',
      selectable: false,
      evented: true,
    });

    fc.add(bg);
    // fc.sendToBack(bg);


    return () => {
      fc.dispose()
    }
  }, [])

  return (
    <>
    <div id = "whiteboardCanvas" ref={containerRef}>
      <canvas ref={canvasRef} />
      {canvas && <WhiteboardEditMenu canvas = {canvas}/>}
    </div>
    <ShapeFormatPannel/>
    </>
  )
}

export default Whiteboard
