import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '../view/layouts/AuthLayout';
import Analytics from '../view/pages/Analytics';
import Categories from '../view/pages/Categories';
import Dashboard from '../view/pages/Dashboard';
import Login from '../view/pages/Login';
import Register from '../view/pages/Register';
import AuthGuard from './AuthGuard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/categories' element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
