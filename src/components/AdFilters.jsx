import { Select, MenuItem } from '@mui/material';

function AdFilters({ sortFilter, setSortFilter, sortOrder, setSortOrder, adsPerPage, setAdsPerPage }) {
  return (
    <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
      <Select
        value={sortFilter}
        onChange={(e) => setSortFilter(e.target.value)}
        displayEmpty
        style={{ minWidth: '150px' }}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="price">По цене</MenuItem>
        <MenuItem value="views">По просмотрам</MenuItem>
        <MenuItem value="likes">По лайкам</MenuItem>
      </Select>

      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        displayEmpty
        style={{ minWidth: '150px' }}
      >
        <MenuItem value="asc">По возрастанию</MenuItem>
        <MenuItem value="desc">По убыванию</MenuItem>
      </Select>

      <Select
        value={adsPerPage}
        onChange={(e) => setAdsPerPage(e.target.value)}
        displayEmpty
        style={{ minWidth: '200px' }}
      >
        <MenuItem value={5}>5 объявлений на странице</MenuItem>
        <MenuItem value={10}>10 объявлений на странице</MenuItem>
        <MenuItem value={15}>15 объявлений на странице</MenuItem>
        <MenuItem value={20}>20 объявлений на странице</MenuItem>
      </Select>
    </div>
  );
}

export default AdFilters;
