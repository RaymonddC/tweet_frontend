import logo from './logo.svg';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, createBrowserRouter, useNavigate } from 'react-router-dom';
import { Login } from './Pages/Login/Login';
import { Layout } from './Components/Layout/Layout';
import { Timeline } from './Pages/Timeline/Timeline';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keepLoginAsync } from './Features/User/UserSlice';
import { Verify } from './Pages/Verify/Verify';
import { Profile } from './Pages/Profile/Profile';
import { DetailTweet } from './Pages/DetailTweet/DetailTweet';
import { Account } from './Pages/Account/Account';
import VerifRoutes from './utils/VerifRoute';
import AccountRoute from './utils/AccountRoute';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    dispatch(keepLoginAsync());
  }, []);

  return (
    <div className="App dark ">
      <Toaster />
      {/* <Navbar /> */}
      <div className="content ">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                {/* <Verify />//forNav */}
                <></>
                <Timeline />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route
            path="/activation"
            element={
              <Layout>
                <div></div>
                <Verify />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <VerifRoutes>
                <Layout>
                  <></>
                  <Profile />
                </Layout>
              </VerifRoutes>
            }
            exact
          />
          <Route
            path="/details/:id"
            element={
              <VerifRoutes>
                <Layout>
                  <></>
                  <DetailTweet />
                </Layout>
              </VerifRoutes>
            }
          />
          <Route
            path="/account"
            element={
              <VerifRoutes>
                <Layout>
                  <></>
                  <Account />
                </Layout>
              </VerifRoutes>
            }
          />
          {/* <Route path="/register" element={<Login />} /> */}
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
