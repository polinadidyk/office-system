import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from './lib/auth';
import Login from './pages/Login';
import AdminPin from './pages/AdminPin';
import Home from './pages/Home';
import RequestForm from './pages/RequestForm';
import MyTickets from './pages/MyTickets';
import Success from './pages/Success';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

function UserRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  return isAdmin() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/pin" element={<AdminPin />} />
          <Route
            path="/"
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          />
          <Route
            path="/form/:type"
            element={
              <UserRoute>
                <RequestForm />
              </UserRoute>
            }
          />
          <Route
            path="/my-tickets"
            element={
              <UserRoute>
                <MyTickets />
              </UserRoute>
            }
          />
          <Route
            path="/success/:ticketId"
            element={
              <UserRoute>
                <Success />
              </UserRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
