"use client";

import ShapeFormatPannel from "@/app/components/ShapeFormatPannel";
import { useParams } from "next/navigation";
import TextFormatPannel from "@/app/components/TextFormatPannel";
import WhiteboardEditMenu from "@/app/components/WhiteboardEditMenu";
import { Canvas, Rect, FabricObject, IText } from "fabric";
import React, { useEffect, useRef, useState } from "react";

const Whiteboard = () => {
  const { id } = useParams();

  const [design, setDesign] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null,
  );
  const [canvas, setCanvas] = useState<null | Canvas>(null);

  const isText = (obj: FabricObject | null): obj is IText =>
    obj?.type === "i-text" || obj?.type === "textbox" || obj?.type === "text";

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
  
  console.log("DESIGN CANVAS:", design.canvas);

  canvas.loadFromJSON(design.canvas, () => {
    canvas.requestRenderAll();
  });
}, [canvas, design]);


  return (
    <>
      {selectedObject &&
        (isText(selectedObject) ? (
          <TextFormatPannel selectedObject={selectedObject} canvas={canvas} />
        ) : (
          <ShapeFormatPannel selectedObject={selectedObject} canvas={canvas} />
        ))}
      <div id="whiteboardCanvas" ref={containerRef}>
        <canvas ref={canvasRef} />
        {canvas && <WhiteboardEditMenu canvas={canvas} />}
      </div>
    </>
  );
};

export default Whiteboard;
