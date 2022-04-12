import { Navigate, Route, Routes } from 'react-router';
import { lazyWithSuspense } from 'src/utils';

const LoginPage = lazyWithSuspense(() => import('./pages/Login.page'));

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Navigate to="/login" replace />} />
  </Routes>
);
