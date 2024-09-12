import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid2, Pagination, Button, Typography, TextField } from '@mui/material';
import AdCard from '../components/AdCard';
import AdFilters from '../components/AdFilters';
import NewAdModal from '../components/NewAdModal';

function AdsList() {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]); 
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState(''); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  const blankImage = 'https://cdn.vectorstock.com/i/1000v/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg';

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    applySorting();
  }, [ads, sortFilter, sortOrder, page, adsPerPage, search]);

  const fetchAds = async () => {
    const { data } = await axios.get('http://localhost:3000/advertisements');
    setAds(data);
    applySorting(); 
  };

  const applySorting = () => {
    let filteredAds = ads.filter(ad => 
      ad.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortFilter) {
      filteredAds.sort((a, b) => 
        sortOrder === 'asc' ? a[sortFilter] - b[sortFilter] : b[sortFilter] - a[sortFilter]
      );
    }

    const startIndex = (page - 1) * adsPerPage;
    const paginatedAds = filteredAds.slice(startIndex, startIndex + adsPerPage); 

    setFilteredAds(paginatedAds);
    setTotalPages(Math.ceil(filteredAds.length / adsPerPage)); 
  };

  const handleCreateAd = async (newAd) => {
    await axios.post('http://localhost:3000/advertisements', newAd);
    fetchAds();  
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextField 
        label="Поиск объявлений" 
        variant="outlined" 
        fullWidth 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ marginBottom: '20px' }}
      />
      <AdFilters 
        sortFilter={sortFilter} 
        setSortFilter={setSortFilter} 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
        adsPerPage={adsPerPage} 
        setAdsPerPage={setAdsPerPage} 
      />
      {filteredAds.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Объявлений не найдено
        </Typography>
      ) : (
        <Grid2 container spacing={2}>
          {filteredAds.map((ad) => (
            <AdCard ad={ad} blankImage={blankImage} key={ad.id} />
          ))}
        </Grid2>
      )}
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={(e, value) => setPage(value)} 
        color="primary" 
        style={{ marginTop: '20px' }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setModalOpen(true)} 
        style={{ marginTop: '20px' }}
      >
        Добавить объявление
      </Button>
      <NewAdModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onCreate={handleCreateAd} 
      />
    </div>
  );
}

export default AdsList;
