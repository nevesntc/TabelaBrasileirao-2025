import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TablesPage from './pages/TablesPage';
import MatchesPage from './pages/MatchesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TablesPage />} />
            <Route path="/jogos" element={<MatchesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;