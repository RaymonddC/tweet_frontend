import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
// import { BiShow } from 'react-icons/bi';
// import { BsArrowRight, BsCheck2, BsFacebook } from 'react-icons/bs';
// import { FcGoogle } from 'react-icons/fc';
// import { useSelector, useDispatch } from 'react-redux';
// import { activationAsync, onLoginAsync, onRegister } from '../../Features/User/UserSlice';
// import GenerateRandomCode from 'react-random-code-generator';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { activationAsync, keepLoginAsync, sendVerifLink } from '../../Features/User/UserSlice';
// import { AdidasButton } from '../../Components/AdidasButton/AdidasButton';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

export const Verify = () => {
  let dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isSubmit = useSelector((state) => state?.user?.isSubmitting);

  const _code = useRef();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // if (user?.active == true) return <Navigate to={'/'} />;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      dispatch(keepLoginAsync());
      dispatch(activationAsync(token));
    }
  }, []);

  // if (!user) return <Navigate to={'/login'} />;
  if (user?.activationCode == 0) {
    toast.success('User Already active');
    return <Navigate to={'/'} />;
  }

  return (
    // <div className="dark:bg-[black] h-[100vh] text-white flex pt-[20vh] justify-center">
    <div className="h-fit p-[20px] bg-[#16181C] rounded-3xl min-w-[20vw] text-left text-white m-5">
      {user.verified}
      <p className="font-bold">{isSubmit ? 'Activating your account' : user.verified ? 'Verification success' : 'Activate Your Account'}</p>
      <p className="">{isSubmit ? 'Verification in progress...' : user.verified ? 'You can now acces more features' : 'Activate to unlock more features'}</p>
      <button
        className={`dark:bg-[#1DA1F2] dark:text-[white] border-black bg-[white] text-[black] font-bold rounded-3xl py-[10px] px-[30px] my-[10px]  flex gap-3`}
        disabled={isSubmit ? true : user.verified ? true : false}
        onClick={() => {
          dispatch(sendVerifLink({ user }));
        }}
      >
        {isSubmit ? (
          'Please wait...'
        ) : user.verified ? (
          <>
            <DoneAllOutlinedIcon />
            Already Verified
          </>
        ) : (
          'Get Verified Link'
        )}
      </button>
    </div>
    // </div>
  );
};
