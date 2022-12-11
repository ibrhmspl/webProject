import Auth from "./components/Auth";
import Authh from "./components/Authh";
import Admin from "./components/Admin";
import Main from "./components/Main";
import Sepet from "./components/Sepet";
import StoreApplication from './components/StoreApplication';
import StoreManagement from './components/StoreManagement';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/Authh"  element={<Authh/>} />
        <Route path="/Main"  element={<Main/>} />
        <Route path="/Admin"  element={<Admin/>} />
        <Route path="/StoreApplication"  element={<StoreApplication/>} />
        <Route path="/StoreManagement"  element={<StoreManagement/>} />
        <Route path="/Sepet"  element={<Sepet/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
