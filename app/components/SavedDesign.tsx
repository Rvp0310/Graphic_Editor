import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { DesignType } from './DesignSpace';
import SavedDesignOptions from './SavedDesignOptions';

export default function SavedDesign({_id, name, type, thumbnail, updatedAt, fetchDesigns, onClick}: DesignType) {
  return (
    <Card sx={{ minWidth: "70%" }}>
      <CardActionArea sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <CardMedia
          sx={{ maxWidth: "20%" }}
          component="img"
          height="20%"
          image={thumbnail || "/save_placeholder.jpg" }
          alt="green iguana"
        />
        <CardContent onClick={onClick}>
          <Typography gutterBottom variant="h5" component="div">
            {name || "placeholder"}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {type || "placeholder"}
          </Typography>
          { updatedAt &&
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Last Edited: {updatedAt}
          </Typography>}
        </CardContent>
        <SavedDesignOptions id = {_id} name = {name} fetchDesigns={fetchDesigns}/>
      </CardActionArea>
    </Card>
  );
}
