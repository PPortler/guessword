import './App.css';
import Navbar from './components/Navbar';
import Container from './components/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddQuiz from './pages/AddQuiz';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/add_quiz" element={<AddQuiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
