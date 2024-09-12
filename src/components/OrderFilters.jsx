import { Select, MenuItem } from '@mui/material';

function OrderFilters({ filterStatus, setFilterStatus, sortOrder, setSortOrder }) {
  return (
    <div style={{ display: 'flex', marginBottom: '20px', gap: '20px' }}>
      <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        displayEmpty
        style={{ minWidth: '200px' }}
      >
        <MenuItem value="">Все заказы</MenuItem>
        <MenuItem value={0}>Ожидает</MenuItem>
        <MenuItem value={4}>Завершен</MenuItem>
      </Select>

      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        displayEmpty
        style={{ minWidth: '250px' }}
      >
        <MenuItem value="asc">Сортировка по возрастанию суммы</MenuItem>
        <MenuItem value="desc">Сортировка по убыванию суммы</MenuItem>
      </Select>
    </div>
  );
}

export default OrderFilters;
