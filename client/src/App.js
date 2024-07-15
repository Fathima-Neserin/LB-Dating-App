import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './elements/Signup';
import Common from './components/Common';
import Dashboard from './components/user/Dashboard';
import SendOTP from './elements/SendOTP';
import MobNo from './elements/MobNo';

function App() {
  return (
   <>
   <Routes>

    <Route path='/' element={<Common child={<Signup/>}/>} />
    <Route path='/dashboard' element={<Common child={<Dashboard/>}/>} />
    <Route path='/generate-otp' element={<MobNo/>}/>
    <Route path='/verify-otp' element={<SendOTP/>}/>

   </Routes>
   </>
  );
}

export default App;
