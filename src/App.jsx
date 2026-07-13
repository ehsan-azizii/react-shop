import {Routes,Route}from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail';
import NavBar from './components/NavBar';
import Cart from './pages/Cart';
import LogIn from './pages/LogIn';
import CartSnackbar from './components/CartSnackbar';
function App() {
  return (
  <>
    <NavBar />
    <Routes>
        
      <Route
      path='/'
      element={<ProductList />}
      />
      <Route
      path='/products/:id'
      element={<ProductDetail />}
      />
       <Route
      path='/cart'
      element={<Cart />}
      />
       <Route
      path='/login'
      element={<LogIn />}
      />
    </Routes>
    <CartSnackbar/>
  </>
         
  );
}

export default App
