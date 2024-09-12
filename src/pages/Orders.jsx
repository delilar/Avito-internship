import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid2 } from '@mui/material';
import OrderCard from '../components/OrderCard';
import OrderFilters from '../components/OrderFilters';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showItems, setShowItems] = useState({});

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, sortOrder]);

  const fetchOrders = async () => {
    let url = 'http://localhost:3000/orders';

    if (filterStatus !== '') {
      url += `?status=${filterStatus}`;
    }

    try {
      const { data } = await axios.get(url);
      const sortedOrders = data.sort((a, b) => 
        sortOrder === 'asc' ? a.total - b.total : b.total - a.total
      );
      
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    }
  };

  const toggleShowItems = (orderId) => {
    setShowItems((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status: 4 });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: 4 } : order
        )
      );
      alert(`Заказ ${orderId} успешно завершён!`);
    } catch (error) {
      console.error('Ошибка завершения заказа:', error);
      alert('Ошибка завершения заказа.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <OrderFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Grid2 container spacing={3}>
        {orders.map((order) => (
          <Grid2 item xs={12} sm={6} key={order.id}>
            <OrderCard
              order={order}
              showItems={showItems[order.id]}
              toggleShowItems={toggleShowItems}
              handleCompleteOrder={handleCompleteOrder}
            />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default Orders;
