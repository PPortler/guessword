import './App.css';
import Navbar from './components/Navbar';
import Container from './components/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddQuiz from './pages/AddQuiz';
import ViewQuiz from './pages/ViewQuiz';
import EditQuiz from './pages/EditQuiz/[id]';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/view-quiz" element={<ViewQuiz />} />
          <Route path="/update-quiz/:id" element={<EditQuiz />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
