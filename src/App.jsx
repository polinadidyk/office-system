import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RequestForm from './pages/RequestForm';
import MyTickets from './pages/MyTickets';
import Success from './pages/Success';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:type" element={<RequestForm />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/success/:ticketId" element={<Success />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
