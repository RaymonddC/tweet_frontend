import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AccountRoute = (props) => {
  const { user } = useSelector((state) => state.user);

  //   let auth = { token: false };
  return user && Object.keys(user).length !== 0 ? props.children : <Navigate to="/login" />;
};

export default AccountRoute;
