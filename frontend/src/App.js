import './App.css';
import Post from './components/Post';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/posts' element={<Home />} />
                        <Route path='/posts/:postHashHex' element={<Post />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
