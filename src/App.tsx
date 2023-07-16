import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages';
import UserForId from './pages/users/individual';
import AddUser from './pages/users/add';
import AddServicios from './pages/users/add';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/user/:id' element={<UserForId />} />
        <Route path='/user/Add' element={<AddUser />} />
        <Route path='/servicios/Add' element={<AddServicios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
