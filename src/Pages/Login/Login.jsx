import React, { useEffect, useState } from 'react';
// import { Button, ButtonGroup, Center, Square, Circle, Flex, Spacer, Text, Box, Image, Input, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLoginAsync, onRegister } from '../../Features/User/UserSlice';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

// const notify = () => toast('Here is your toast.');

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const SignupSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Required'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Password at least have one uppercase char')
    .matches(/.*[0-9].*/, 'Password at least have 1 number')
    .matches(/.*\W.*/, 'Password at least have 1 special char (@,!,#, etc).')
    .min(8, 'Use 8 characters or more for your password')
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export const Login = () => {
  const user = useSelector((state) => state?.user?.user);
  const isSubmit = useSelector((state) => state?.user?.isSubmitting);
  // useSelector((state) => state?.user?.user);
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [isRegis, setIsRegis] = useState(window.location.pathname == '/register');
  const dispatch = useDispatch();

  useEffect(() => {
    setIsRegis(window.location.pathname == '/register');
  }, [window.location.pathname]);

  console.log(user);
  if (!user || Object.keys(user).length !== 0) return <Navigate to={'/'} />;

  return (
    <div className="">
      <div className="h-[100vh]  flex flex-col bg-white dark:bg-black dark:text-white">
        <div className="navLogin flex pl-[16px] py-[10px] items-center bg-white text-black dark:bg-black dark:text-white">
          <div className="closeIcon flex-1 flex items-center h-full relative">
            <div className="p-[0.3em]  rounded-full hover:bg-[#8899a6] text-white hover:bg-opacity-20 absolute left-0 box-border">
              <CloseRoundedIcon fontSize="medium" />
            </div>
          </div>
          <div className="logoIcon flex items-center h-[100%]">
            <DynamicFeedIcon fontSize="large" />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="grow flex justify-center">
          <div className="formSide  flex-col m-[auto] px-[2em] pb-[2.5em]  max-w-[22em]   ">
            <div className="form  ">
              <p className="text-[1.6em] text-left">Sign in to Twinsta</p>
              <Formik
                initialValues={{ usernameOrEmail: '', password: '', email: '', confirmPassword: '' }}
                validationSchema={isRegis ? SignupSchema : LoginSchema}
                onSubmit={(values, { resetForm }) => {
                  dispatch(isRegis ? onRegister(values) : onLoginAsync(values));
                  if (!isRegis) resetForm();
                  else {
                    return <Navigate to={'/login'} />;
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,

                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit} className="min-w-[290px]">
                    {/* <p className="font-semibold">E-mail</p> */}
                    <div className={`inputEmail my-[20px] ${isRegis ? '' : 'hidden'}`}>
                      <TextField
                        sx={{ input: { color: 'white' } }}
                        id="outlined-basic"
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] dark:bg-black rounded-l w-full "
                      />
                      {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                    </div>
                    <div className={`inputUsernameOrEmail my-[20px] `}>
                      <TextField
                        sx={{ input: { color: 'white' } }}
                        id="outlined-basic"
                        label={`Username ${isRegis ? '' : 'or Email'} `}
                        variant="outlined"
                        name="usernameOrEmail"
                        value={values.usernameOrEmail}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] dark:bg-black rounded-l w-full "
                      />
                      {errors.usernameOrEmail && touched.usernameOrEmail ? <div className="error">{errors.usernameOrEmail}</div> : null}
                    </div>
                    <div className="inputPass relative my-[20px]">
                      <div className="icon" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px] z-30" /> : <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />}
                      </div>
                      <TextField
                        sx={{ input: { color: 'white' } }}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] dark:bg-black rounded-l w-full"
                      />
                      {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                    </div>
                    <div className={`inputCPass relative my-[20px] ${isRegis ? '' : 'hidden'}`}>
                      <div className="icon" onClick={() => setShowCPass(!showCPass)}>
                        {showCPass ? <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px] z-30" /> : <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />}
                      </div>
                      <TextField
                        sx={{ input: { color: 'white' } }}
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
                        name="confirmPassword"
                        type={showCPass ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] dark:bg-black rounded-l w-full"
                      />
                      {errors.confirmPassword && touched.confirmPassword ? <div className="error">{errors.confirmPassword}</div> : null}
                    </div>
                    {/* <Button variant="contained">Contained</Button> */}
                    <button type="submit" className="bg-[black] dark:bg-[white] text-white dark:text-[black] font-bold rounded-xl py-[10px] w-full my-[20px]" disabled={isSubmit}>
                      {isRegis ? 'Register' : 'Login'}
                    </button>
                  </form>
                )}
              </Formik>

              {isRegis ? (
                ''
              ) : (
                <Link to={'/'}>
                  <button className="dark:bg-[black] dark:text-[white] border-black dark:border-white border bg-[white] text-[black] font-bold rounded-xl py-[10px] w-full my-[10px]">Forgot Password?</button>
                </Link>
              )}

              <Link to={'/'}>
                <span className="text-[#808080] text-left">{isRegis ? 'Already have account?' : "Don't have an account?"} </span>
                <Link to={isRegis ? '/login' : '/register'} className="text-blue-500">
                  {isRegis ? 'Login' : 'Sign Up'}
                </Link>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
