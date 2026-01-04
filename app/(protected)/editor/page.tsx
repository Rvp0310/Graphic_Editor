"use client"

import ShapeFormatPannel from '@/app/components/ShapeFormatPannel';
import TextFormatPannel from '@/app/components/TextFormatPannel';
import WhiteboardEditMenu from '@/app/components/WhiteboardEditMenu'
import { Canvas, Rect, FabricObject } from 'fabric';
import React, {useEffect, useRef, useState} from 'react'

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [canvas, setCanvas] = useState<null|Canvas>(null);

  const isText = (obj: any) =>
      obj?.type === "i-text" ||
      obj?.type === "textbox" ||
      obj?.type === "text";

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
      console.log("isText:", isText(obj));
      setSelectedObject(e.selected?.[0] || null);
    });

    fc.on("selection:updated", (e: any) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    fc.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    fc.on('object:modified', (e: any) => {
      const obj = e.target as FabricObject | undefined;
      if (!obj) return;

      setSelectedObject(obj);
    });

    fc.on('object:scaling', (e: any) => {
      const obj = e.target;
      if (!obj) return;
      setSelectedObject(obj);
    });

    return () => {
      fc.dispose()
    }
  }, []);

  return (
    <>
    {
      selectedObject && (isText(selectedObject) ? <TextFormatPannel/> : <ShapeFormatPannel selectedObject = {selectedObject} canvas = {canvas} />)
    }
    <div id = "whiteboardCanvas" ref={containerRef}>
      <canvas ref={canvasRef} />
      {canvas && <WhiteboardEditMenu canvas = {canvas}/>}
    </div>
    </>
  )
}

export default Whiteboard
