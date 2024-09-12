import { useState } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';

function NewAdModal({ isOpen, onClose, onCreate }) {
  const [newAd, setNewAd] = useState({
    name: '',
    imageUrl: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setNewAd({ ...newAd, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newAd.name && newAd.price) {
      // Setting default values if fields are not provided
      const adToCreate = {
        ...newAd,
        imageUrl: newAd.imageUrl || 'https://cdn.vectorstock.com/i/1000v/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg',
        description: newAd.description || 'Описание отсутствует',
      };

      onCreate(adToCreate);
      onClose();
      setNewAd({ name: '', imageUrl: '', description: '', price: '' });
    } else {
      alert('Заполните все обязательные поля: Название и Цена');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          width: 400 
        }}
      >
        <TextField 
          label="Название" 
          name="name" 
          fullWidth 
          margin="normal" 
          value={newAd.name} 
          onChange={handleChange} 
        />
        <TextField 
          label="URL картинки" 
          name="imageUrl" 
          fullWidth 
          margin="normal" 
          value={newAd.imageUrl} 
          onChange={handleChange} 
        />
        <TextField 
          label="Описание" 
          name="description" 
          fullWidth 
          margin="normal" 
          value={newAd.description} 
          onChange={handleChange} 
        />
        <TextField 
          label="Цена" 
          name="price" 
          type="number" 
          fullWidth 
          margin="normal" 
          value={newAd.price} 
          onChange={handleChange} 
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          fullWidth
        >
          Создать объявление
        </Button>
      </Box>
    </Modal>
  );
}

export default NewAdModal;
