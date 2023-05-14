'use client'
import Link from 'next/link'
import React , {useState , useEffect} from 'react';
import { account } from "./appwrite/Config";
import { useRouter } from "next/navigation"
import Image from 'next/image';
import {GiHamburgerMenu} from "react-icons/gi";
import {RxCross2} from "react-icons/rx";
import Profile from './Profile';

function Navbar() {

  const Menus = [
    {name : "Home" , path : "/"},
    {name : "Food" , path : "food"},
    {name : "Products" , path : "product"},
    {name : "About" , path : "about"},
  ]
  const [active, setActive] = useState(0);

  // for hamerburfer icons
  const [isOpen, setIsOpen] = useState(false)
  const [showProfile , setShowProfile]=useState(false);
  
  //    LogIn user Data
  const router = useRouter();
  const [userDetails, setUserDetails] = useState();

  // set condition for dropdown menu
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
        const getData = account.get();
        getData.then(
            function(res : any) {
                setUserDetails(res);
                console.log("res data",res)
            },
            function(error) {
                console.log(error)
            }
        )
  }, [])
  
  const handleLogout = async () => {
    try {
        await account.deleteSession("current");
        router.push(`/`);
    
      } catch (error) {
        console.log(error)
      }
  }


  return (
    <div className=' w-full justify-between m-1 py-3 px-4 bg-[#211A24] flex items-center text-center justify-self-center'>
      <div onClick={() => router.push(`/`)} className="text-xl font-semibold text-white cursor-pointer ">
        Logo
      </div>
      <div className="  text-[#FFFFFF] md:flex hidden justify-items-center my-auto items-center text-center justify-between">
        <ul className='flex flex-grow space-x-12 pr-10 justify-between relative'>
          {Menus.map((menu , i) => (
            <li key={i} >
              <Link href={`${menu.path}`} onClick={() => setActive(i)} >
                <span className={` hover:border-b-2 px-2 pb-1 ${active === i ? " transition duration-150 ease-in-out hover:flex-grow border-b-2 px-2 text-form" : "text-white"}`}>{menu.name}</span>
              </Link>
            </li>
          ))}
          <Profile  />
        </ul>
      </div>
      <div className={`  md:hidden items-end w-[300px] relative flex flex-col`}>
        {!isOpen ? (
          <div className="  " onClick={handleClick} >
            <GiHamburgerMenu className="h-7 w-7 text-white cursor-pointer " />
            
          </div>
        ) : (
          <>
            <RxCross2 className="h-7 w-7 text-white cursor-pointer" onClick={handleClick} />
            <ul className={`dropDown_box pb-12 `}>
          {Menus.map((menu , i) => (
            <li key={i} className='space-y-6 my-2 hover:border-l-white hover:border-l-4 w-full  rounded-r-lg py-2 hover:bg-sky-200  ' >
              <Link href={`${menu.path}`} onClick={() => setActive(i)} >
                <span className={` hover:border-b-2 px-2 pb-1 ${active === i ? " transition duration-150 ease-in-out hover:flex-grow border-b-2 px-2 text-form" : "text-white"}`}>{menu.name}</span>
              </Link>
            </li>
          ))}
          <Profile  />
        </ul>
          </>

        ) }
      </div>
    </div>
  )
}

export default Navbar