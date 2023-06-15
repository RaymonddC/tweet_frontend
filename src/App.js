import logo from './logo.svg';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, createBrowserRouter, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Toaster />
      {/* <Navbar /> */}
      <div className="content">
        <Routes>
          <Route path="/" element={<h>a</h>} />
          {/* <Route path="/" element={<Timeline />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activation" element={<Activation />} />
          <Route path="/unauthorize" element={<Unauthorized />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgetPass" element={<ForgetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
