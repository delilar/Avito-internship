import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function OrderCard({ order, showItems, toggleShowItems, handleCompleteOrder }) {
  return (
    <Card style={{ padding: '15px' }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: '10px' }}>
          Заказ №{order.id}
        </Typography>
        <Typography>Сумма заказа: {order.total} ₽</Typography>
        <Typography>Дата создания: {new Date(order.createdAt).toLocaleDateString()}</Typography>
        <Typography>Статус: {order.status === 0 ? 'Ожидает' : 'Завершен'}</Typography>
        <Typography style={{ marginBottom: '10px' }}>
          Количество товаров: {order.items.length}
        </Typography>

        {order.status === 0 && (
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleCompleteOrder(order.id)}
            style={{ marginTop: '10px', marginRight: '10px' }}
          >
            Завершить заказ
          </Button>
        )}

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => toggleShowItems(order.id)}
          style={{ marginTop: '10px' }}
        >
          {showItems ? 'Скрыть товары' : 'Показать товары'}
        </Button>

        {showItems && (
          <div style={{ marginTop: '15px' }}>
            {order.items.map((item) => (
              <Typography key={item.id} style={{ marginBottom: '5px' }}>
                <Link to={`/ads/${item.id}`}>
                  {item.name} - {item.price} ₽
                </Link>
              </Typography>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderCard;
