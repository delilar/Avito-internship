import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/ads">
          Объявления
        </Button>
        <Button color="inherit" component={Link} to="/orders">
          Заказы
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
