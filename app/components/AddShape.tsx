"use client";

import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Canvas, Rect, Circle, Triangle, Line } from "fabric";

const shapes = ["Rectangle", "Triangle", "Circle", "Line"] as const;

const AddShape = ({
  canvas
}: {
  canvas: Canvas | null;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTool, setActiveTool] = useState<
    "select" | "Rectangle" | "Triangle" | "Circle" | "Line"
  >("select");
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawShape = (
    selected: "Rectangle" | "Triangle" | "Circle" | "Line",
  ) => {
    if (!canvas) return;

    setActiveTool(selected);
    canvas.defaultCursor = "crosshair";
    canvas.selection = false;

    let isDrawing = false;
    let shape: any;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (opt: any) => {
      isDrawing = true;
      const pointer = canvas.getScenePoint(opt.e);
      startX = pointer.x;
      startY = pointer.y;

      switch (selected) {
        case "Rectangle":
          shape = new Rect({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill: "#14116b",
            selectable: false,
          });
          break;
        case "Circle":
          shape = new Circle({
            left: startX,
            top: startY,
            radius: 0,
            fill: "#14116b",
            selectable: false,
          });
          break;
        case "Triangle":
          shape = new Triangle({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill: "#14116b",
            selectable: false,
          });
          break;
        case "Line":
          shape = new Line([startX, startY, startX, startY], {
            stroke: "#14116b",
            strokeWidth: 2,
            selectable: false,
            evented: false,
            strokeUniform: true,
            originX: "center",
            originY: "center",
          });
          break;
      }

      if (shape) canvas.add(shape);
    };

    const onMouseMove = (opt: any) => {
      if (!isDrawing || !shape) return;

      const pointer = canvas.getScenePoint(opt.e);

      if (shape instanceof Line) {
        shape.set({
          x1: startX,
          y1: startY,
          x2: pointer.x,
          y2: pointer.y,
        });
      } else if (shape instanceof Circle) {
        const radius =
          Math.max(Math.abs(pointer.x - startX), Math.abs(pointer.y - startY)) /
          2;

        shape.set({
          radius,
          left: startX - radius,
          top: startY - radius,
        });
      } else {
        shape.set({
          width: Math.abs(pointer.x - startX),
          height: Math.abs(pointer.y - startY),
          left: Math.min(pointer.x, startX),
          top: Math.min(pointer.y, startY),
        });
      }

      shape.setCoords();
      canvas.renderAll();
    };

    const onMouseUp = () => {
      isDrawing = false;
      shape.set({
        selectable: true,
        evented: true,
        hasControls: true,
        hasBorders: true,
        objectCaching: false,
        strokeUniform: true,
      });

      canvas.off("mouse:down", onMouseDown);
      canvas.off("mouse:move", onMouseMove);
      canvas.off("mouse:up", onMouseUp);

      canvas.defaultCursor = "default";
      canvas.selection = true;
      setActiveTool("select");
    };

    canvas.on("mouse:down", onMouseDown);
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", onMouseUp);
  };

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
                vertical: "top",
                horizontal: "right",
              }
        }
        transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }
        }
      >
        {shapes.map((shape) => (
          <MenuItem
            key={shape}
            onClick={() => {
              drawShape(shape);
              handleClose();
            }}
          >
            {shape}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AddShape;
