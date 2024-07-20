import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './elements/Signup';
import Common from './components/Common';
import Dashboard from './components/user/Dashboard';
import SendOTP from './elements/SendOTP';
import MobNo from './elements/MobNo';
import Register from './elements/Register';
import Register2 from './elements/Register2';
import Register3 from './elements/Register3';


function App() {
  return (
   <>
   <Routes>

    <Route path='/' element={<Common child={<Signup/>}/>} />
    <Route path='/register' element={<Common child={<Register/>}/>} />
    <Route path='/reg2' element={<Register2/>} />
    <Route path='/reg3' element={<Register3/>} />
    <Route path='/dashboard' element={<Common child={<Dashboard/>}/>} />
    <Route path='/generate-otp' element={<MobNo/>}/>
    <Route path='/verify-otp' element={<SendOTP/>}/>

   </Routes>
   </>
  );
}

export default App;
