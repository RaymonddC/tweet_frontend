import React, { useEffect, useState } from 'react';
// import { Button, ButtonGroup, Center, Square, Circle, Flex, Spacer, Text, Box, Image, Input, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLoginAsync, onRegister, updateUser } from '../../Features/User/UserSlice';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

// const notify = () => toast('Here is your toast.');

const SignupSchema = Yup.object().shape({
  username: Yup.string(),
  confirmPassword: Yup.string()
    .matches(/[A-Z]/, 'Password at least have one uppercase char')
    .matches(/.*[0-9].*/, 'Password at least have 1 number')
    .matches(/.*\W.*/, 'Password at least have 1 special char (@,!,#, etc).')
    .min(8, 'Use 8 characters or more for your password'),
});

export const Account = () => {
  const toBlob = (imageRaw) => {
    if (!imageRaw) {
      setViewImage(null);
      return;
    }
    let file = imageRaw;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setViewImage(reader.result);
    };
  };
  const [viewImage, setViewImage] = useState(null);
  const user = useSelector((state) => state?.user?.user);
  const isSubmit = useSelector((state) => state?.user?.isSubmitting);
  // useSelector((state) => state?.user?.user);
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [isRegis, setIsRegis] = useState(window.location.pathname == '/register');

  const [editable, setEditable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsRegis(window.location.pathname == '/register');
  }, [window.location.pathname]);

  //   console.log(user);
  //   if (!user || Object.keys(user).length !== 0) return <Navigate to={'/'} />;
  const fontColor = {
    style: { color: 'white' },
  };

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
        <div className="grow flex justify-center items-center">
          <div className="formSide  flex-col m-[auto] px-[2em] pb-[2.5em]  max-w-[22em]   ">
            <div className="form  ">
              <div className="profile flex justify-between">
                <p className="text-[1.6em] text-left">Your Profile</p>
                <ModeEditOutlineOutlinedIcon
                  onClick={() => {
                    setEditable(false);
                  }}
                />
              </div>
              <Formik
                initialValues={{ username: user.username, password: '', email: user.email, fullname: user.fullname, bio: user.bio, confirmPassword: '', image: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                  dispatch(updateUser(values));
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
                    <div className={`inputEmail my-[20px] `}>
                      <TextField
                        disabled
                        sx={{
                          '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ffffff',
                          },
                          input: { color: 'white' },
                        }}
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
                    <div className={`inputUsername my-[20px] `}>
                      <TextField
                        disabled={editable}
                        sx={{
                          '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ffffff',
                          },
                          input: { color: 'white' },
                        }}
                        id="outlined-basic"
                        label={`Username`}
                        variant="outlined"
                        name="username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] dark:bg-black rounded-l w-full "
                      />
                      {errors.username && touched.username ? <div className="error">{errors.username}</div> : null}
                    </div>
                    <div className={`inputFullname my-[20px] `}>
                      <TextField
                        disabled={editable}
                        sx={{
                          '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ffffff',
                          },
                          input: { color: 'white' },
                        }}
                        id="outlined-basic"
                        label={`FullName`}
                        variant="outlined"
                        name="fullname"
                        value={values.fullname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] dark:bg-black rounded-l w-full "
                      />
                      {errors.fullname && touched.fullname ? <div className="error">{errors.fullname}</div> : null}
                    </div>
                    <div className="inputBio border-b pb-5">
                      <textarea type="text" disabled={editable} onChange={handleChange} onBlur={handleBlur} className="bg-black w-full  outline-none h-[3em] grow" placeholder="Bio" multiple value={values.bio} name="bio" />
                      {touched.bio && errors.bio && <div>{errors.bio}</div>}
                    </div>
                    <div className="inputPass relative my-[20px]">
                      <div className="icon" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px] z-30" /> : <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />}
                      </div>
                      <TextField
                        disabled={editable}
                        sx={{
                          '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ffffff',
                          },
                          input: { color: 'white' },
                        }}
                        id="outlined-basic"
                        label="Old Password"
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
                    <div className={`inputCPass relative my-[20px] `}>
                      <div className="icon" onClick={() => setShowCPass(!showCPass)}>
                        {showCPass ? <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px] z-30" /> : <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />}
                      </div>
                      <TextField
                        disabled={editable}
                        sx={{
                          '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#ffffff',
                          },
                          input: { color: 'white' },
                        }}
                        disabled
                        id="outlined-basic"
                        label="New Password"
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
                    <div className="inputIcon" aria-hidden="true">
                      <input
                        id="file"
                        name="image"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          values.image = e.target.files[0];
                          toBlob(e.target.files[0]);
                        }}
                        className="pl-[20px] pr-[15px] py-[5px]  rounded-xl max-w-[5em]"
                      />
                      {touched.image && errors.image && <div>{errors.image}</div>}
                    </div>
                    {viewImage ? <p className="img-preview-wrapper flex justify-center">{<img className="max-h-[400px]" src={viewImage} alt="preview" />}</p> : null}
                    {/* <Button variant="contained">Contained</Button> */}
                    <button type="submit" className="bg-[black] dark:bg-[white] text-white dark:text-[black] font-bold rounded-xl py-[10px] w-full my-[20px]" disabled={editable}>
                      Edit Account
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
