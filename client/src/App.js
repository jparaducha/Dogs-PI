import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import  Landing from './components/Landing';
import Home from './components/Home';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Landing/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Form' element={<Form/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
