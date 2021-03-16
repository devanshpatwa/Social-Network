import React, { useState } from 'react'
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import { IsoOutlined } from '@material-ui/icons';
import * as IoIcons from "react-icons/io"; 
import * as CgIcons from "react-icons/cg"; 
import * as GrGroup from "react-icons/gr";
import * as HiUser from "react-icons/hi";
import * as MdEvent from "react-icons/md";
import { FcHome } from "react-icons/fc";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
export const Sidebar=[
    {
        title: 'Home',
        path: '/homepage',
        // icon: <FcHome/>,
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/PersonalInfo',
        icon: <CgIcons.CgProfile/>,
        cName: 'nav-text'
    },
    {
        title: 'Web Design and Development',
        path: '/groups/Web',
        icon: <AiIcons.AiOutlineUsergroupAdd/>,
        cName: 'nav-text'
    },
    {
        title: 'Business Management',
        path: '/groups/Business',
        icon: <HiUser.HiUserGroup/>,
        cName: 'nav-text'
    },
    {
        title: 'Events',
        path: '/events',
        icon: <MdEvent.MdEventAvailable/>,
        cName: 'nav-text'
    }
  
]