import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { DesignType } from './DesignSpace';

export default function SavedDesign({_id, name, thumbnail, updatedAt, onClick}: DesignType) {
  return (
    <Card sx={{ minWidth: "70%" }}>
      <CardActionArea sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} onClick={onClick}>
        <CardMedia
          sx={{ maxWidth: "20%" }}
          component="img"
          height="20%"
          image={thumbnail || "/save_placeholder.jpg" }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name || "placeholder"}
          </Typography>
          { updatedAt &&
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Last Edited: {updatedAt}
          </Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
