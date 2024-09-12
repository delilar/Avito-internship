import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdsList from './pages/AdsList';
import AdDetail from './pages/AdDetail';
import Orders from './pages/Orders';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/ads" element={<AdsList />} />
        <Route path="/ads/:id" element={<AdDetail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
