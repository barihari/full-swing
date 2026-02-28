import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Session from './pages/Session';
import Log from './pages/Log';
import Dashboard from './pages/Dashboard';
import References from './pages/References';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/session/:dateISO" element={<Session />} />
        <Route path="/log/:dateISO" element={<Log />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/references" element={<References />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
