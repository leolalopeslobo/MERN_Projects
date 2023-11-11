import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from "./component/signup";
import Login from './component/login';
import Main from './component/main';
import EmailVerify from './component/emailVerify';
import Home from './component/subscriptions';
import Dashboard from './component/dashboard';
import Layout from './component/layout';

function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>      
      {/* {user && <Route path="/" exact element={<Main />} >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="subscriptions" exact element={<Home />} />
      </Route>
      } */}

<Route path="/" exact element={<Main />} >
<Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="subscriptions" exact element={<Home />} />
      </Route>
      


      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/subscriptions" exact element={<Home />} />
      <Route path="/" exact element={<Navigate replace to="/login"/>} />
      <Route path="/user/:id/verify/:token" element={<EmailVerify/>}/>


      <Route path='/layout' exact element={<Layout />} />
    </Routes>
  );
}

export default App;
