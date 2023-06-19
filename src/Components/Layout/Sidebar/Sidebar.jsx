import React, { useState } from 'react';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../../Features/User/UserSlice';

export const Sidebar = () => {
  let dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="fixed w-[275px] dark:bg-black border dark:text-white border-[#808080] min-h-[100vh] md:flex flex-col justify-between  hidden ">
      <div className="flex flex-col gap-[0.5em] items-start dark:text-white">
        <Link to={'/'}>
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold hover:bg-[#8899a6] hover:bg-opacity-20">
            <DynamicFeedIcon />
          </div>
        </Link>
        <Link to={'/'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20">
            <HomeOutlinedIcon />
            <p>Home</p>
          </div>
        </Link>
        <Link to={'/profile'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20">
            <PersonOutlineOutlinedIcon />
            <p>Profile</p>
          </div>
        </Link>
        <Link to={'/profile'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20">
            <SearchRoundedIcon />
            <p>Explore</p>
          </div>
        </Link>
        <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20">
          <MoreHorizRoundedIcon className="border border-white rounded-full" />
          <p>More</p>
        </div>
        <div className="cardSidebar rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold  w-full ">
          <Link to={'/'}>
            <button className="dark:bg-[#1DA1F2] hover:dark:bg-[#1da0f2da] dark:text-[white] border-black bg-[white] text-[black] font-bold rounded-3xl py-[10px] w-full my-[10px]">Tweet</button>
          </Link>
        </div>
      </div>
      <Link to={'/login'}>
        <div className="profile min-w-[100%] p-[13px] flex  rounded-[50px]  text-[15px]  w-full  hover:bg-[#8899a6] hover:bg-opacity-20">
          <div className="avatar w-[40px] h-[40px] bg-[#FFCA40] rounded-full m-[12px]">{/* <img src={`http://localhost:5000/product_image/IMG1685974633294.png`} alt="" /> */}</div>
          {/* <div className={`detail ${openMenu ? '' : 'invisible'}`}> */}
          <div className={`detail align-middle grow text-left my-auto ${openMenu ? '' : ''}`}>
            {/* {console.log(user)} */}
            <p className="username">{user?.username || 'Please Login'}</p>
            <p className="email">{user?.username ? `${user?.username}@gmail.com` : ''}</p>
          </div>
          <div className="iconMore m-auto">
            <MoreHorizRoundedIcon />
          </div>
          {user ? (
            <div
              className="logout"
              onClick={() => {
                dispatch(logoutAsync());
                // <Navigate to={'/login'} />;
              }}
            >
              {/* <Link to={'/login'}> */}
              Lgout
              {/* <LogoutRoundedIcon /> */}
              {/* </Link> */}
            </div>
          ) : (
            ''
          )}
        </div>
      </Link>
    </div>
  );
};
