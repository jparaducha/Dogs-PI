import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import  Landing from './components/Landing';
import Home from './components/Home';
import Form from './components/Form';
import InfoDog from './components/InfoDog';
import Update from './components/Update';

function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Landing/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Form' element={<Form/>}/>
    <Route path='/infoDog/:id' element={<InfoDog />}/>
    <Route path='/update/:id' element={<Update/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
