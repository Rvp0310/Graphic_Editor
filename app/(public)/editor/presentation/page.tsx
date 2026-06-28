"use client";

import ShapeFormatPannel from "@/app/components/ShapeFormatPannel";
import TextFormatPannel from "@/app/components/TextFormatPannel";
import EditMenu from "@/app/components/PresentationEditMenu";
import { Canvas, FabricObject, IText, Textbox } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import SlideControl from "@/app/components/controls/SlideControl";
import SlideScroll from "@/app/components/controls/SlideScroll";
import { Slide } from "../../../lib/type";

const Presentation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRestoringRef = useRef(false);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null,
  );
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isText = (obj: FabricObject | null): obj is IText =>
    obj?.type === "i-text" || obj?.type === "textbox" || obj?.type === "text";

  const saveState = () => {
    if (!canvas || isRestoringRef.current) return;

    const current = JSON.stringify(canvas.toJSON());

    setSlides((prev) => {
      const copy = [...prev];

      const slide = {
        ...copy[currentSlide],
      };

      slide.history = [...slide.history];
      slide.history = slide.history.slice(0, slide.historyIndex + 1);
      slide.history.push(current);
      slide.historyIndex++;

      copy[currentSlide] = slide;

      return copy;
    });
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;

    canvasRef.current.width = clientWidth * 0.6;
    canvasRef.current.height = clientHeight * 0.7;

    const fc = new Canvas(canvasRef.current, {
      width: clientWidth * 0.6,
      height: clientHeight * 0.8,
      selection: true,
      backgroundColor: "#fff",
    });

    fc.renderAll();

    const initial = createTitleSlideData(fc);

    setCanvas(fc);

    const firstSlide: Slide = {
      id: crypto.randomUUID(),
      template: "title",
      canvasData: initial,
      history: [JSON.stringify(initial)],
      historyIndex: 0,
    };

    setSlides([firstSlide]);
    setCurrentSlide(0);

    let textPreEditState: string | null = null;

    fc.on("text:editing:entered", () => {
      if (isRestoringRef.current) return;
      textPreEditState = JSON.stringify(fc.toJSON());
    });

    fc.on("text:editing:exited", () => {
      if (isRestoringRef.current || !textPreEditState) return;

      const current = JSON.stringify(fc.toJSON());

      if (current !== textPreEditState) {
        saveState();
      }

      textPreEditState = null;
    });

    let preActionState: string | null = null;

    fc.on("mouse:down", () => {
      if (isRestoringRef.current) return;
      preActionState = JSON.stringify(fc.toJSON());
    });

    fc.on("mouse:up", () => {
      if (isRestoringRef.current || !preActionState) return;

      const current = JSON.stringify(fc.toJSON());

      if (current !== preActionState) {
        saveState();
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
      if (isRestoringRef.current) return;
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

  const undo = () => {
    if (!canvas) return;

    const slide = slides[currentSlide];

    if (slide.historyIndex <= 0) return;

    isRestoringRef.current = true;

    const newIndex = slide.historyIndex - 1;

    canvas.loadFromJSON(slide.history[newIndex], () => {
      canvas.requestRenderAll();
      canvas.discardActiveObject();
      setSelectedObject(null);

      setSlides((prev) => {
        const copy = [...prev];
        copy[currentSlide] = {
          ...copy[currentSlide],
          historyIndex: newIndex,
        };
        return copy;
      });

      isRestoringRef.current = false;
    });
  };

  const redo = () => {
    if (!canvas) return;

    const slide = slides[currentSlide];

    if (slide.historyIndex >= slide.history.length - 1) return;

    isRestoringRef.current = true;

    const newIndex = slide.historyIndex + 1;

    canvas.loadFromJSON(slide.history[newIndex], () => {
      canvas.requestRenderAll();

      setSlides((prev) => {
        const copy = [...prev];
        copy[currentSlide] = {
          ...copy[currentSlide],
          historyIndex: newIndex,
        };
        return copy;
      });

      isRestoringRef.current = false;
    });
  };

  const createTitleSlideData = (canvas: Canvas) => {
    canvas.clear();

    canvas.add(
      new Textbox("Click to add title", {
        left: 380,
        top: 200,
        width: 300,
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
      }),
    );

    canvas.add(
      new Textbox("Click to add subtitle", {
        left: 370,
        top: 260,
        width: 400,
        fontSize: 18,
        textAlign: "center",
      }),
    );

    canvas.requestRenderAll();

    return canvas.toJSON();
  };

  const createContentSlideData = (canvas: Canvas) => {
    canvas.clear();

    canvas.add(
      new Textbox("Click to add title", {
        left: 380,
        top: 60,
        width: 700,
        fontSize: 30,
        fontWeight: "bold",
      }),
    );

    canvas.add(
      new Textbox("Click to add content", {
        left: 360,
        top: 100,
        width: 600,
        fontSize: 18,
      }),
    );

    canvas.requestRenderAll();

    return canvas.toJSON();
  };

  const saveCurrentSlide = () => {
    if (!canvas || slides.length === 0) return;

    canvas.discardActiveObject();
    canvas.requestRenderAll();

    const updatedSlides = slides.map((s, i) =>
      i === currentSlide ? { ...s, canvasData: canvas.toJSON() } : s,
    );

    setSlides(updatedSlides);
  };

  const loadSlide = (index: number) => {
    if (!canvas) return;

    saveCurrentSlide();

    const updatedSlides = [...slides];
    updatedSlides[currentSlide] = {
      ...updatedSlides[currentSlide],
      canvasData: canvas.toJSON(),
    };

    setSlides(updatedSlides);

    canvas.loadFromJSON(slides[index].canvasData, () => {
      canvas.requestRenderAll();
    });

    setCurrentSlide(index);
  };

  const addSlide = () => {
    if (!canvas) return;

    saveCurrentSlide();

    const canvasData = createContentSlideData(
      new Canvas(document.createElement("canvas")),
    );

    const newSlide: Slide = {
      id: crypto.randomUUID(),
      template: "content",
      canvasData: canvasData,
      history: [JSON.stringify(canvasData)],
      historyIndex: 0,
    };

    const updated = [...slides];

    updated[currentSlide] = {
      ...updated[currentSlide],
      canvasData: canvas.toJSON(),
    };

    updated.splice(currentSlide + 1, 0, newSlide);

    setSlides(updated);

    setCurrentSlide(currentSlide + 1);
    canvas.loadFromJSON(newSlide.canvasData, () => {
      canvas.requestRenderAll();
    });
  };

  const deleteSlide = () => {
    if (!canvas || slides.length <= 1) return;

    const nextIndex =
      currentSlide === slides.length - 1 ? currentSlide - 1 : currentSlide;

    const updatedSlides = slides.filter((_, index) => index !== currentSlide);

    setSlides(updatedSlides);

    canvas.loadFromJSON(updatedSlides[nextIndex].canvasData, () => {
      canvas.requestRenderAll();
    });

    setCurrentSlide(nextIndex);
  };

  const goUp = () => {
    if (currentSlide === 0) return;

    saveCurrentSlide();
    loadSlide(currentSlide - 1);
  };

  const goDown = () => {
    if (currentSlide === slides.length - 1) return;

    saveCurrentSlide();
    loadSlide(currentSlide + 1);
  };

  const moveSlideDown = () => {
    if (currentSlide === slides.length - 1) return;

    setSlides((prev) => {
      const copy = [...prev];

      [copy[currentSlide], copy[currentSlide + 1]] = [
        copy[currentSlide + 1],
        copy[currentSlide],
      ];

      return copy;
    });

    setCurrentSlide((prev) => prev + 1);
  };

  const moveSlideUp = () => {
    if (currentSlide === 0) return;

    setSlides((prev) => {
      const copy = [...prev];

      [copy[currentSlide - 1], copy[currentSlide]] = [
        copy[currentSlide],
        copy[currentSlide - 1],
      ];

      return copy;
    });

    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <>
      {selectedObject &&
        (isText(selectedObject) ? (
          <TextFormatPannel
            selectedObject={selectedObject}
            canvas={canvas}
            saveState={saveState}
          />
        ) : (
          <ShapeFormatPannel
            selectedObject={selectedObject}
            canvas={canvas}
            saveState={saveState}
          />
        ))}
      <div id="presentationCanvas" ref={containerRef}>
        <div>
          <div className="slideWrapper">
            <canvas ref={canvasRef} />
            <SlideScroll
              goDown={goDown}
              goUp={goUp}
              currentSlide={currentSlide}
              totalSlides={slides.length}
            />
          </div>
          <SlideControl
            currentSlide={currentSlide}
            totalSlides={slides.length}
            moveSlideUp={moveSlideUp}
            moveSlideDown={moveSlideDown}
            addSlide={addSlide}
            deleteSlide={deleteSlide}
          />
        </div>
        {canvas && (
          <EditMenu
            canvas={canvas}
            slides={slides}
            saveCurrentSlide={saveCurrentSlide}
            undo={undo}
            redo={redo}
            saveState={saveState}
          />
        )}
      </div>
    </>
  );
};

export default Presentation;
