import axios from 'axios';
import axiosInstance from './axiosInstance';
import { toast } from "react-toastify";
import { Dialog, Transition ,DialogPanel,TransitionChild,DialogTitle} from '@headlessui/react'
import {
  faDoorClosed,
  faPlus,
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


interface Class {
  swpClassId: string,
  name: string,
  semesterId: string,
  status: boolean
}


export default function ManageClass(){
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
    getClass();
  }, [location.pathname]);
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  //const { authData,setAuthData} = authContext;
  const [data, setData] = useState<Class[]>([]);
  const [openAdd, setAdd] = useState<boolean>(false);
  const [openDel, setDel] = useState<boolean>(false);
  const [specClass, setSpecClass]= useState<string>('');
  const [name, setName] = useState<string>("");
  const [semId, setSemId] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  function closeDelModal() {
    setDel(false)
  }

  function openDelModal(n :string) {
    setDel(true)
    setSpecClass(n)
  }

  function closeAddModal() {
    setAdd(false)
  }

  function openAddModal() {
    setAdd(true)
  }

  const getClass = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7007/api/SwpClass/all`,
        {
          /*headers: {
            Authorization: `Bearer ${authData?.token}`,
          },*/
        }
      );

      setData(response.data);
      filteredClasses;
      console.log(data);
    } catch (error) {
      console.log("Can not get class list", error);
      toast.error("Can not get class list");
    }
  }

  const deleteClass = async (id:string) => {
    try {
      const response = await axiosInstance.delete(
        `https://localhost:7007/api/SwpClass/delete/${id}`
        
      ).then(response => {
        console.log(response.data);
        getClass();
      })
    }catch(err){

    }
  }

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        semesterId: 1,
        status: true
      };
      const response = await axiosInstance.post(
        "https://localhost:7007/api/SwpClass/create",
        data
      );
      
      toast.success("Create new class successful!");
      getClass();
      //setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
        //console.log(data);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const filteredClasses = data.filter(fClasses =>{
    return fClasses.status != false;
  });
   

  return(
    <>      
      <div className="px-2 grid grid-cols-1 gap-4 py-2">     
                    <div>
                      <button onClick={()=> {openAddModal();}} className="flex justify-center items-center px-2 py-2 border-4 rounded-lg align-items-center ">
                        <FontAwesomeIcon icon={faPlus} size= '2x' />  
                      </button>
                    
                    </div>                        
                    {filteredClasses.map((classes ) => (
                      <div key={classes.swpClassId} className="grid grid-cols-5 py-2 border-4 rounded-lg ">
                        <div className="col-span-1 ">
                          <div className="flex justify-center items-center gap-x-2 py-3 px-4">
                            <FontAwesomeIcon icon={faDoorClosed} size= '8x' />
                          </div>
                        </div>
                        <div className="col-span-3 border-l px-4">
                          Name: {classes.name}<br></br>
                          
                          {classes.status ? (
                            <div>Status: Available</div>
                          ):(
                            <div>Status: Unavailable</div>
                          )
                            
                          }<br></br>
                        </div>
                         {/* Buttons  */}
                        <div className="col-span-1">
                          <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                            <a href='#'>

                              {/* Edit button code 
                              <button onClick={()=> {
                                  //openEditModal(students);
                                  
                                }} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                View
                              </button>
                              Edit button code */}

                                {/*Delete button code */}
                                <button onClick={()=> {
                                  openDelModal(classes.swpClassId);
                                }} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                  Delete
                                </button>
                                {/*Delete button code */}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}                   
                </div>
                
               {/*  Modals Code */}
               {/*Del Modal*/}
          <Transition appear show={openDel} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={closeDelModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirm Deleting {specClass}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete selected mentor
                      </p>
                    </div>

                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                      <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={()=> 
                          {
                            deleteClass(specClass)
                            closeDelModal()             
                          }}
                      >
                        Confirm Delete
                      </button>
                    </div>
    
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
          </Transition>
          {/*Delete Modal*/}

          {/*Edit Modal*/}
        <Transition appear show={openAdd} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={closeAddModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Create a new Class
                    </DialogTitle>
                    <form className="flex flex-col gap-3" onSubmit={handleSave}>
                      <div className="p-4 overflow-y-auto flex flex-col justify-center items-center">                     
                        <div className="w-full mt-6">
                          <div className="relative">
                            <input
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                              focus:pt-6
                              focus:pb-2
                              [&:not(:placeholder-shown)]:pt-6
                              [&:not(:placeholder-shown)]:pb-2
                              autofill:pt-6
                              autofill:pb-2"
                              placeholder="Class name"
                              required
                            />
                            <label
                              className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                              peer-focus:scale-90
                              peer-focus:translate-x-0.5
                              peer-focus:-translate-y-1.5
                              peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                              peer-[:not(:placeholder-shown)]:scale-90
                              peer-[:not(:placeholder-shown)]:translate-x-0.5
                              peer-[:not(:placeholder-shown)]:-translate-y-1.5
                              peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
                              >
                              Class name
                            </label>
                          </div>

                          <div className="w-full mt-6">
                          <div className="relative">
                            <input
                              type="number"
                              
                              onChange={(e) => setSemId(e.target.valueAsNumber)}
                              className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                              focus:pt-6
                              focus:pb-2
                              [&:not(:placeholder-shown)]:pt-6
                              [&:not(:placeholder-shown)]:pb-2
                              autofill:pt-6
                              autofill:pb-2"
                              placeholder="semesterId"
                              required
                            />
                            <label
                              className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                              peer-focus:scale-90
                              peer-focus:translate-x-0.5
                              peer-focus:-translate-y-1.5
                              peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                              peer-[:not(:placeholder-shown)]:scale-90
                              peer-[:not(:placeholder-shown)]:translate-x-0.5
                              peer-[:not(:placeholder-shown)]:-translate-y-1.5
                              peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
                              >
                              Semester ID
                            </label>
                          </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                        <button
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          onClick={()=> 
                            {
                              closeAddModal()             
                            }}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          onClick={()=> {closeAddModal();}}
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Save changes
                        </button>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
        {/*Edit Modal*/}
    </>  
  );
}


