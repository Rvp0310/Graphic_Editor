"use client"

import ShapeFormatPannel from '@/app/components/ShapeFormatPannel';
import TextFormatPannel from '@/app/components/TextFormatPannel';
import WhiteboardEditMenu from '@/app/components/WhiteboardEditMenu'
import { Canvas, Rect } from 'fabric';
import React, {useEffect, useRef, useState} from 'react'

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [canvas, setCanvas] = useState<null|Canvas>(null);

  useEffect(() => {
    if(!canvasRef.current || !containerRef.current)
      return;

    const {clientWidth, clientHeight} = containerRef.current;

    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    const fc = new Canvas(canvasRef.current, {
      width: clientWidth,
      height: clientHeight,
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
      evented: false,
    });

    fc.add(bg);
    fc.sendObjectToBack(bg);
    
    fc.on("selection:created", (e: any) => {
      const obj = e.selected?.[0];
      console.log("TYPE:", obj?.type);
      console.log(isText);
      setSelectedObject(e.selected?.[0] || null);
    });

    fc.on("selection:updated", (e: any) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    fc.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    return () => {
      fc.dispose()
    }
  }, []);

  const isText =
  selectedObject?.type === "i-text" ||
  selectedObject?.type === "textbox" ||
  selectedObject?.type === "text";


  return (
    <>
    <div id = "whiteboardCanvas" ref={containerRef}>
      <canvas ref={canvasRef} />
      {canvas && <WhiteboardEditMenu canvas = {canvas}/>}
    </div>
    {
      selectedObject && (isText ? <TextFormatPannel/> : <ShapeFormatPannel/>)
    }
    </>
  )
}

export default Whiteboard
