"use client";

import ShapeFormatPannel from "@/app/components/ShapeFormatPannel";
import { useParams } from "next/navigation";
import TextFormatPannel from "@/app/components/TextFormatPannel";
import WhiteboardEditMenu from "@/app/components/WhiteboardEditMenu";
import { Canvas, FabricObject, IText } from "fabric";
import React, { useEffect, useRef, useState } from "react";

const Whiteboard = () => {
  const { id } = useParams();

  const [design, setDesign] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const isRestoringRef = useRef(false);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null,
  );
  const [canvas, setCanvas] = useState<null | Canvas>(null);

  const isText = (obj: FabricObject | null): obj is IText =>
    obj?.type === "i-text" || obj?.type === "textbox" || obj?.type === "text";

  const saveState = () => {
    if (!canvas || isRestoringRef.current) return;

    const current = JSON.stringify(canvas.toJSON());
  
    if (historyRef.current[historyIndexRef.current] === current) return;

    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
  
    historyRef.current.push(current);
    historyIndexRef.current++;
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;

    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    const fc = new Canvas(canvasRef.current, {
      width: clientWidth,
      height: clientHeight,
      selection: true,
      backgroundColor: "#fff",
    });

    setCanvas(fc);

    let preActionState: string | null = null;

    fc.on("mouse:down", () => {
      if (isRestoringRef.current) return;
      preActionState = JSON.stringify(fc.toJSON());
    });

    fc.on("mouse:up", () => {
      if (isRestoringRef.current || !preActionState) return;

      const current = JSON.stringify(fc.toJSON());

      if (current !== preActionState) {
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
        historyRef.current.push(current);
        historyIndexRef.current++;
      }

      preActionState = null;
    });

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

    fc.on("object:modified", (e: any) => {
      if(isRestoringRef.current) return;

      const obj = e.target as FabricObject | undefined;
      if (!obj) return;

      setSelectedObject(obj);
    });

    fc.on("object:scaling", (e: any) => {
      const obj = e.target;
      if (!obj) return;
      setSelectedObject(obj);
    });

    return () => {
      fc.dispose();
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchDesign = async () => {
      const res = await fetch(`/api/design/${id}`);
      const data = await res.json();
      return data.design;
    };

    fetchDesign().then(setDesign);
  }, [id]);

  useEffect(() => {
  if (!canvas || !design?.canvas) return;

  isRestoringRef.current = true;
  
  console.log("DESIGN CANVAS:", design.canvas);

  canvas.loadFromJSON(design.canvas, () => {
    canvas.requestRenderAll();

    canvas.discardActiveObject();
    setSelectedObject(null);

    const initial = JSON.stringify(canvas.toJSON());
    historyRef.current = [initial];
    historyIndexRef.current = 0;

    isRestoringRef.current = false;
  });
}, [canvas, design]);

  const undo = () => {
    if (!canvas || historyIndexRef.current <= 0) return;

    isRestoringRef.current = true;
    historyIndexRef.current--;
    canvas.loadFromJSON(
      historyRef.current[historyIndexRef.current],
      () => {
        canvas.requestRenderAll();
        isRestoringRef.current = false;
      }
    );
  }

  const redo = () => {
    if (!canvas || historyIndexRef.current >= historyRef.current.length - 1) return;

    isRestoringRef.current = true;
    historyIndexRef.current++;
    canvas.loadFromJSON(
      historyRef.current[historyIndexRef.current],
      () => {
        canvas.requestRenderAll();
        isRestoringRef.current = false;
      }
    );
  }

  return (
    <>
      {selectedObject &&
        (isText(selectedObject) ? (
          <TextFormatPannel selectedObject={selectedObject} canvas={canvas} saveState={saveState}/>
        ) : (
          <ShapeFormatPannel selectedObject={selectedObject} canvas={canvas} saveState={saveState}/>
        ))}
      <div id="whiteboardCanvas" ref={containerRef}>
        <canvas ref={canvasRef} />
        {canvas && <WhiteboardEditMenu canvas={canvas} undo={undo} redo={redo} saveState={saveState}/>}
      </div>
    </>
  );
};

export default Whiteboard;
