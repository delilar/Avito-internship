import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

function AdDetail() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    fetchAd();
  }, [id]);

  const fetchAd = async () => {
    const { data } = await axios.get(`http://localhost:3000/advertisements/${id}`);
    setAd(data);
  };

  const handleEdit = async () => {
    await axios.put(`http://localhost:3000/advertisements/${id}`, ad);
    alert('Объявление обновлено!');
  };

  if (!ad) return <div>Загрузка...</div>;


  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{ad.name}</Typography>
        <TextField 
          label="URL картинки" 
          name="imageUrl" 
          fullWidth 
          margin="normal" 
          value={ad.imageUrl} 
          onChange={(e) => setAd({...ad, imageUrl: e.target.value})}
        />
        <TextField
          label="Название"
          fullWidth
          margin="normal" 
          value={ad.name}
          onChange={(e) => setAd({ ...ad, name: e.target.value })}
        />
        <TextField
          label="Описание"
          fullWidth
          margin="normal" 
          value={ad.description}
          onChange={(e) => setAd({ ...ad, description: e.target.value })}
        />
        <TextField
          label="Цена"
          fullWidth
          margin="normal" 
          type="number"
          value={ad.price}
          onChange={(e) => setAd({ ...ad, price: parseInt(e.target.value) })}
        />
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Сохранить изменения
        </Button>
      </CardContent>
    </Card>
  );
}

export default AdDetail;
