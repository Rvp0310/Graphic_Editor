 import DeleteIcon from '@mui/icons-material/Delete';
 import React from 'react'
 import IconButton from "@mui/material/IconButton";
import { Canvas, FabricObject } from "fabric";
 
 const Delete = ({selectedObject, canvas, saveState}: { selectedObject: FabricObject; canvas: Canvas | null; saveState: () => void }) => {
    if (!canvas) return null;
    
    const del = () => {
        if (!selectedObject) return;

        canvas.remove(selectedObject);
        canvas.renderAll();
        saveState();
    }

   return (
     <IconButton size="small" onClick={del}>
      <DeleteIcon sx={{ color: "white", fontSize: "18px" }} />
    </IconButton>
   )
 }
 
 export default Delete
 