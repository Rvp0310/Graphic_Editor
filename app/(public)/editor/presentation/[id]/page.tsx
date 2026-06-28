"use client";

import ShapeFormatPannel from "@/app/components/ShapeFormatPannel";
import TextFormatPannel from "@/app/components/TextFormatPannel";
import EditMenu from "@/app/components/PresentationEditMenu";
import { Canvas, FabricObject, IText, Textbox } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import SlideControl from "@/app/components/controls/SlideControl";
import SlideScroll from "@/app/components/controls/SlideScroll";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Slide } from "@/app/lib/type";

const Presentation = () => {
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
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isText = (obj: FabricObject | null): obj is IText =>
    obj?.type === "i-text" || obj?.type === "textbox" || obj?.type === "text";

  const saveState = () => {
    if (!canvas || isRestoringRef.current) return;

    const current = JSON.stringify(canvas.toJSON());

    if (historyRef.current[historyIndexRef.current] === current) return;

    historyRef.current = historyRef.current.slice(
      0,
      historyIndexRef.current + 1,
    );
    historyRef.current.push(current);
    historyIndexRef.current++;
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
    
        // historyRef.current = [initial];
        // historyIndexRef.current = 0;
    
        setCanvas(fc);
    
        const firstSlide: Slide = {
          id: crypto.randomUUID(),
          template: "title",
          canvasData: initial,
          history: [JSON.stringify(initial)],
          historyIndex: 0
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
        historyRef.current = historyRef.current.slice(
          0,
          historyIndexRef.current + 1,
        );
        historyRef.current.push(current);
        historyIndexRef.current++;
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
        historyRef.current = historyRef.current.slice(
          0,
          historyIndexRef.current + 1,
        );
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

  useEffect(() => {
      if (!id) return;
  
      const fetchDesign = async () => {
        try{
        const res = await fetch(`/api/design/${id}`);
        const data = await res.json();
        setDesign(data.design);
        } catch(err) {
          toast.error("Failed to load design");
        }
      };
  
      fetchDesign();
    }, [id]);

    useEffect(() => {
      if (!canvas || !design?.content) return;
    
      isRestoringRef.current = true;
      
      const parsed =
    typeof design.content === "string"
      ? JSON.parse(design.content)
      : design.content;

      const firstSlide = parsed?.[0];

      if (!firstSlide?.canvasData) return;
      
      canvas.loadFromJSON(firstSlide.canvasData, () => {
        canvas.requestRenderAll();
    
        canvas.discardActiveObject();
        setSelectedObject(null);

        setSlides(parsed);
        setCurrentSlide(0);
    
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
    canvas.loadFromJSON(historyRef.current[historyIndexRef.current], () => {
      canvas.requestRenderAll();

      canvas.discardActiveObject();
      setSelectedObject(null);

      isRestoringRef.current = false;
    });
  };

  const redo = () => {
    if (!canvas || historyIndexRef.current >= historyRef.current.length - 1)
      return;

    isRestoringRef.current = true;
    historyIndexRef.current++;
    canvas.loadFromJSON(historyRef.current[historyIndexRef.current], () => {
      canvas.requestRenderAll();
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
  i === currentSlide
    ? { ...s, canvasData: canvas.toJSON() }
    : s
);

  setSlides(updatedSlides);
};

  const loadSlide = (index: number) => {
    if (!canvas) return;

    canvas.loadFromJSON(slides[index].canvasData, () => {
      canvas.requestRenderAll();
    });

    setCurrentSlide(index);
  };

  const addSlide = () => {
    if (!canvas) return;

    saveCurrentSlide();

    const canvasData = createContentSlideData(canvas);

    const newSlide: Slide = {
      id: crypto.randomUUID(),
      template: "content",
      canvasData: canvasData,
      history: [JSON.stringify(canvasData)],
      historyIndex: 0
    };

    setSlides((prev) => {
      const copy = [...prev];
      copy.splice(currentSlide + 1, 0, newSlide);
      return copy;
    });

    setCurrentSlide(currentSlide + 1);
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
