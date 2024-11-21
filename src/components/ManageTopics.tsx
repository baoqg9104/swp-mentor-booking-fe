import axios from 'axios';
import { toast } from "react-toastify";
import { Dialog, Transition ,DialogPanel,TransitionChild,DialogTitle} from '@headlessui/react'
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//const tStyleHeader = 'px-6 py-3 text-start font-medium text-gray-500 uppercase';
//const tStyleBody = 'px-6 py-3 text-start whitespace-nowrap font-medium text-gray-800';
//const buttonStyle ='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
import { useEffect, useState, useContext,Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { AuthContext } from "./AuthContext";
//import { IStaticMethods } from "preline/preline";


interface Mentors {
  mentorId: string,
  mentorName: string,
  password: string,
  email: string,
  phone: string,
  gender: string,
  dateOfBirth: string,
  pointsReceived: string,
  numOfSlot:string,
  registrationDate: string,
  meetUrl: string,
  applyStatus: true,
  mentorSkills: null,
  mentorSlots: null
}


export default function ManageTopics(){
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();

  }, [location.pathname]);
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  //const { authData,setAuthData} = authContext;

  return(
    <>      
      Topics go here
    </>  
  );
}


