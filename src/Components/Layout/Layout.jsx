import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RightSideBar } from './RightSideBar/RightSideBar';
import { Navbar } from './Navbar/Navbar';

export const Layout = (props) => {
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    setTimeout(() => {
      //   props.setAuthStorage(JSON.parse(localStorage.getItem('auth')));
      //   checkToken();
    }, 5 * 60 * 1000);
  }, []);
  console.log('layout', user);
  // if (!user) return <Navigate to={'/login'} />;

  return (
    <div className="flex dark:bg-black ">
      <Sidebar />
      <div
        className="md:ml-[275px] grow dark:text-white   md:flex flex-col  
       h-[100vh] md:min-h-[full]  w-full dark:bg-black  md:grow  md:w-[50vw]"
      >
        <Navbar>{props.children[0]}</Navbar>
        {props.children[1]}
      </div>
      <RightSideBar />
    </div>
  );
};
