import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";
import RenameField from "./RenameField";

const SavedDesignOptions = ({
  id,
  name,
  fetchDesigns,
}: {
  id: string;
  name: string;
  fetchDesigns: () => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [display, setDisplay] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDisplay(false);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/design/save", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designId: id }),
      });

      if (!res.ok) return toast.error("Error while deleting the design");

      fetchDesigns();
      handleClose();
    } catch {
      toast.error("Error while deleting the design");
    }
  };

  const handleDuplicate = async () => {
    try {
      const res = await fetch("/api/design/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designId: id }),
      });

      if (!res.ok) {
        return toast.error("Error while duplicating the design");
      }

      fetchDesigns();
      handleClose();
      return toast.success("Duplication Done");
    } catch {
      return toast.error("Error while duplicating the design");
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
        <MenuItem onClick={() => setDisplay(true)}>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        {display && (
          <RenameField
            id={id}
            Name={name}
            setDisplay={setDisplay}
            handleClose={handleClose}
            fetchDesigns={fetchDesigns}
          />
        )}
      </Menu>
    </>
  );
};

export default SavedDesignOptions;
