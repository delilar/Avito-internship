import { Card, CardContent, Typography } from '@mui/material';
import { Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';

function AdCard({ ad, blankImage }) {
  return (
    <Grid2 item xs={12} sm={6} md={4}>
      <Link to={`/ads/${ad.id}`} style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent>
            <img 
              src={ad.imageUrl.trim() ? ad.imageUrl : blankImage} 
              alt={ad.name} 
              style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
            />
            <Typography variant="h5">{ad.name}</Typography>
            <Typography>Цена: {ad.price} ₽</Typography>
            <Typography>Просмотры: {ad.views ? ad.views : '0'}</Typography>
            <Typography>Лайки: {ad.likes ? ad.likes : '0'}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid2>
  );
}

export default AdCard;
