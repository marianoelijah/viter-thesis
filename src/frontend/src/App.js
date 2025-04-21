import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginRegister from './LoginRegister';
import Home from './Home';
import Chatbot from './Chatbot';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegister/>}></Route>
        <Route path='/register' element={<LoginRegister/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/chatbot' element={<Chatbot/>}></Route>
       


      </Routes>
   </BrowserRouter>
  );
}

export default App;
