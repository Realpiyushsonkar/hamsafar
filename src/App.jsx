import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import FindTraveller from '@/pages/FindTraveller';
import PostTrip from '@/pages/PostTrip';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/travellers" element={<FindTraveller />} />
        <Route path="/upload-trip" element={<PostTrip />} />
        {/* More routes (auth, chat, dashboard...) will be added milestone by milestone. */}
      </Route>
    </Routes>
  );
}
