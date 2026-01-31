import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { Canvas, FabricObject } from "fabric";

const Duplicate = ({
  selectedObject,
  canvas,
}: {
  selectedObject: FabricObject | null;
  canvas: Canvas | null;
}) => {
  if (!canvas) return null;

  const copy = async () => {
    if (!selectedObject) return;

    const cloned = await selectedObject.clone();

    cloned.set({
      left: selectedObject.left! + 20,
      top: selectedObject.top! + 20,
    });

    canvas.add(cloned);
    canvas.setActiveObject(cloned);
    canvas.renderAll();
  };

  return (
    <IconButton size="small" onClick={copy}>
      <ContentCopyIcon sx={{ color: "white", fontSize: "18px" }} />
    </IconButton>
  );
};

export default Duplicate;
