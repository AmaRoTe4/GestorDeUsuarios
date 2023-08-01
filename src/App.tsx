import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages';
import UserForId from './pages/users/individual';
import AddUser from './pages/users/add';
import AddServicios from './pages/users/add';
import { Estado } from './validaciones/login';
import Login from './pages/login/index';
import Doc from './pages/doc';

function App() {
  const estado = Estado();
  
  const render = (element:JSX.Element) => {
    return estado ? element : <Login />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={render(<Main />)} />
        <Route path='/user/:id' element={render(<UserForId />)} />
        <Route path='/user/Add' element={render(<AddUser />)} />
        <Route path='/servicios/Add' element={render(<AddServicios />)} />
        <Route path='/doc' element={render(<Doc />)} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
