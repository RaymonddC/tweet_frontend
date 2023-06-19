import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const VerifRoutes = (props) => {
  const { user } = useSelector((state) => state.user);

  //   let auth = { token: false };
  return user.verified ? props.children : <Navigate to="/activation" />;
};

export default VerifRoutes;
