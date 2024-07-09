import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './elements/Signup';
import Common from './components/Common';

function App() {
  return (
   <>
   <Routes>

    <Route path='/' element={<Common child={<Signup/>}/>} />
   </Routes>
   </>
  );
}

export default App;
