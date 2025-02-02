import './App.css';
import Navbar from './components/Navbar';
import Container from './components/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddQuiz from './pages/AddQuiz';
import ViewQuiz from './pages/ViewQuiz';
import EditQuiz from './pages/EditQuiz/[id]';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/add_quiz" element={<AddQuiz />} />
          <Route path="/view_quiz" element={<ViewQuiz />} />
          <Route path="/update_quiz/:id" element={<EditQuiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
