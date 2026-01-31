"use client"

import React, {useState} from 'react'
import { Canvas } from 'fabric';
import toast from 'react-hot-toast';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataArrayOutlined } from '@mui/icons-material';

const types = ["jpeg", "png"] as const;

const Export = ({ canvas }: { canvas: Canvas | null }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeTool, setActiveTool] = useState<
      "select" | "png" | "jpg"
    >("select");
    const open = Boolean(anchorEl);

    const verify = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        return res.ok;
      } catch {
        return false;
      }
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("clicked");
      const target = e.currentTarget as HTMLElement;
      
      const isVerified = await verify();

      console.log(isVerified);
      if(!isVerified){
        toast.error("Login to export");
      } else {
        console.log("Opening menu");
        setAnchorEl(target);
      }
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <>
      <button className="editOp" onClick={handleClick}>
        <img className="editOpIcon" src="/export.svg" alt="Export" />
        <p>Export</p>
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          borderRadius: 2,
          minWidth: 140,
        }}
      >
        {types.map((type) => (
          <MenuItem
            key={type}
            onClick={() => {
              if (!canvas) return;

              const dataURL = canvas.toDataURL({
                format: type,
                quality: 1,
                multiplier: 2
              });
              
              const link = document.createElement("a");
              link.href = dataURL;
              link.download = `canvas-export.${type}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              toast.success(`Exported as ${type.toUpperCase()}`);

              handleClose();
            }}
          >
            {type}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Export
