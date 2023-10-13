import './App.css';
import Home from './component/Home'
import About from './component/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar';
import Alert from './component/Alert'
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>    
        <Router>

          <Navbar />
          <Alert></Alert>
          <div className="container">

            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
            
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
