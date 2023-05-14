'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { account } from "./appwrite/Config";
import { AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/navigation';
import { IoMdCart } from 'react-icons/io';
import { Glimmer } from './Loader';
import CartBtn from './CartBtn';

interface UserDetail {
  name : string,
  email : string,
  id : string,
  status : boolean,
  emailVerification : boolean,
  createdAt : string
}

function Profile() {

  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetail>();
  const [openProfile, setOpenProfile] = useState(false)

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
    <>
     {!userDetails ? (
            <div className="text-[#FFFFFF] ">
            <button className='log_btn' onClick={() => router.push(`signin`)}>Sign in</button>
          </div>
            // <p> Hi ,{userDetails.email} </p>
          ) : (
            
            <>
             <Suspense fallback={<Glimmer />}>
              <div className="text-[#FFFFFF] ">
                <button className='log_btn' onClick={handleLogout}>Logout</button>
              </div>
              <div onClick={() => setOpenProfile((pre) => !pre) } className='  cursor-pointer '>  
                  <div className="flex text-white md:my-0 my-[10px] text-center items-center justify-items-center justify-center gap-1 ">
                    <AiOutlineUser className='h-7 w-7' />
                    <p className='flex md:hidden'>Profile</p>
                  </div>
              </div>
              <div onClick={() => router.push(`cart`) } className='  cursor-pointer '>  
                  <div className="flex md:mt-0 mt-[20px] text-center items-center justify-items-center justify-center gap-1 ">
                    <CartBtn />
                    {/* <IoMdCart className='h-7 w-7 relative  text-dataOrange ' />
                    <span className="text-start justify-start absolute  pl-[0.6rem] text-xl mt-[-42px] text-white ">
                      +
                    </span> */}
                  </div>
              </div>
            

            {/** profile dropdown setting  & data is here  */}
            {openProfile && (
            <div className=' right-0 md:-right-2 z-10  justify-end w-[300px] absolute flex flex-col text-white '>
              <div className="md:left-0 transition delay-150 ease-in-out duration-300 -left-[18.5rem] md:top-12 top-0 shadow-lg shadow-cyan-500/50 border-[0.5px] divide-y-2  w-full p-4 rounded-lg absolute  bg-backround">
                <div className="px-3 py-2 text-sm ">
                  <div className="font-medium "> Hi ,<span className=' first-letter:uppercase '>{userDetails.name}</span> </div>
                  <div className="truncate">{userDetails.email}</div>
                </div>
                <ul className="py-2 text-sm " aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                  <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <div className="text-[#FFFFFF] ">
                    <button className='log_btn' onClick={handleLogout}>Logout</button>
                  </div>
              </ul>
              </div>
            </div>
            )}
            </Suspense>
            </>
          )}
     </>
  )
}

export default Profile