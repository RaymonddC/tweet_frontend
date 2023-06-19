import React, { useState } from 'react';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../../Features/User/UserSlice';
import { Popover, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export const Sidebar = () => {
  let dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);

  // const [anchorEl, setAnchorEl] = useState(false);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  return (
    <div className="fixed sm:w-[80px] lg:w-[275px] dark:bg-black border dark:text-white border-[#808080] sm:min-h-[100vh] sm:flex sm:flex-col justify-between bottom-0 w-[100vw]">
      <div className="flex sm:flex-col gap-[0.5em] items-center lg:items-start dark:text-white flex-row">
        <Link to={'/'}>
          <div className="cardSidebar sm:flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold hover:bg-[#8899a6] hover:bg-opacity-202 hidden ">
            <DynamicFeedIcon />
          </div>
        </Link>
        <Link to={'/'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <HomeOutlinedIcon />
            <p className="hidden lg:block">Home</p>
          </div>
        </Link>
        <Link to={'/profile'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <PersonOutlineOutlinedIcon />
            <p className="hidden lg:block">Profile</p>
          </div>
        </Link>
        <Link to={'/profile'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <SearchRoundedIcon />
            <p className="hidden lg:block">Explore</p>
          </div>
        </Link>
        <Link to={'/account'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <SettingsOutlinedIcon />
            <p className="hidden lg:block">Settings</p>
          </div>
        </Link>
        <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
          <MoreHorizRoundedIcon className="border border-white rounded-full" />
          <p className="hidden lg:block">More</p>
        </div>
        <div className="cardSidebar rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold  w-full ">
          <Link to={'/'}>
            <button className="dark:bg-[#1DA1F2] hover:dark:bg-[#1da0f2da] dark:text-[white] border-black bg-[white] text-[black] font-bold rounded-3xl py-[10px] w-full my-[10px]">
              <p className="lg:hidden">
                <CreateOutlinedIcon />
              </p>
              <p className="hidden lg:block">Tweet</p>
            </button>
          </Link>
        </div>
      </div>
      <Link to={!user || Object.keys(user).length == 0 ? '/login' : ''}>
        <div className="profile min-w-[100%] p-[13px]   rounded-[50px]  text-[15px]  w-full  hover:bg-[#8899a6] hover:bg-opacity-20 lg:flex-row flex-col gap-2 lg:gap-0 items-center lg:items-start hidden sm:flex">
          <div className="avatar w-[40px] h-[40px] rounded-full m-[12px]">
            <img src={`${process.env.REACT_APP_API_URL}/UserProfile/default.png`} alt="" />
          </div>
          {/* <div className={`detail ${openMenu ? '' : 'invisible'}`}> */}
          <div className={`detail align-middle grow text-left  my-auto hidden lg:block`}>
            {/* {console.log(user)} */}
            <p className="username">{user?.username || 'Please Login'}</p>
            <p className="email">{user?.username ? `${user?.username}@gmail.com` : ''}</p>
          </div>

          {/* <MoreHorizRoundedIcon /> */}

          {user && Object.keys(user).length !== 0 ? (
            <div
              className="iconMore m-auto"
              onClick={() => {
                dispatch(logoutAsync());
                // <Navigate to={'/login'} />;
              }}
            >
              {/* <Link to={'/login'}> */}

              <LogoutRoundedIcon />
              {/* </Link> */}
            </div>
          ) : (
            ''
          )}
        </div>
        {/* <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover> */}
      </Link>
    </div>
  );
};
