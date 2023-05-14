"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { database, storage } from '../appwrite/Config';
import Image from 'next/image';
//import { biryai , burger } from '@/public/foodItems';
import { FoodData } from './dummy_data';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai'

const Glimmer = () => <div>Loading...</div>;

interface Data {
  $id: string;
  bucketId: string;
  name: string;
  signature: string;
}

function Food() {

  const [data, setData] = useState<Data[]>([]);
  const [views, setViews] = useState<any[]>([]);

  const handlePreview = useCallback(async (bucketId: string, id: string) => {
    const view = await storage.getFilePreview(bucketId, id);
    return view;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resImg = await storage.listFiles('64578c85c0db46208b12');
      const { files } = resImg;
      if (files) {
        const modifiedFiles = files.slice(0, 5).map((file: any) => ({
            ...file,
            name: file.name.replace('.jpg', ''), // remove ".jpg" from the name
          }));
        setData(modifiedFiles);
        const previews = await Promise.all(files.map((d) => handlePreview(d.bucketId, d.$id)));
        setViews(previews);
      } else {
        console.log('Failed to get data');
      }
    };

    fetchData();
  }, []);
    const router = useRouter();



  return (
    <>
         <h2 className='text-xl font-bold  text-white '> Food Items </h2>
        <div className="flex flex-1 my-2  h-[200px] w-full ">
            <div className="bg-[#402D49]  w-auto mx-auto gap-4 shadow-[#000000] my-auto shadow-lg rounded-[12px]   ">
                <div className="flex flex-wrap ">
                {
                    data.map((item , index) => (
                    <div onClick={() => router.push(`/food`)} key={item.name} className="   cursor-pointer rounded-[20px] h-auto bg-[#FFFFFF] p-4 m-4 w-[150px] shadow-[#4d4a4a] shadow-xl items-center  flex flex-col text-center  justify-between ">
                        <React.Suspense fallback={<Glimmer />} >
                            {views[index] && <img src={views[index].href} alt=""  className=' object-auto h-[100px] w-[200px] relative'  />}
                        </React.Suspense>
                        <div className="">
                            <h3 className=' text-md font-serif font-bold text-black'> {item.name} </h3>
                            <p className='leading-8 text-sm text-[#FFC83A] '>Rs.0 </p>
                        </div>
                    </div>
                    ))
                }
                <div onClick={() => router.push(`/food`)} className='hover:bg-form cursor-pointer flex text-center justify-items-center gap-2 items-center bg-orange m-auto px-4 py-2 text-white rounded-md '>
                    Read more <span className='h-5 w-5'> <AiOutlineArrowRight /> </span>
                </div>
                </div>
            </div>
        </div>  
    </>
  )
}

export default Food
