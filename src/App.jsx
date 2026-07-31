import {Routes,Route}from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail';
import NavBar from './components/NavBar';
import Cart from './pages/Cart';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';

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
       <Route
      path='/profile'
      element={
      <ProtectedRoute>
      <Profile />
      </ProtectedRoute>
      }
      />
      <Route path="/profile/edit"
      element={ 
      <ProtectedRoute>
      <EditProfile />
      </ProtectedRoute>} />
    </Routes>
  </>
         
  );
}

export default App
