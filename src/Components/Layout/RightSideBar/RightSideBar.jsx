import React, { useState } from 'react';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyUser } from '../../VerifyUser/VerifyUser';
import { Verify } from '../../../Pages/Verify/Verify';

export const RightSideBar = () => {
  let dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className="rightBar grow md:grow h-[100%]   dark:bg-black border dark:text-white border-[#808080]  md:flex flex-col  p-[1em] hidden mx-auto
    
    "
    >
      <div className="h-[100%]">
        <div className="div">{!user.verify ? <Verify /> : ''}</div>
        <div className="div">{!user.verify ? <Verify /> : ''}</div>
        <div className="div">{!user.verify ? <Verify /> : ''}</div>
        <div className="div">{!user.verify ? <Verify /> : ''}</div>
        <div className="div">{!user.verify ? <Verify /> : ''}</div>
      </div>
    </div>
  );
};
