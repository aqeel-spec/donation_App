'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { storage } from './appwrite/Config';

interface Data {
    $id: string;
    bucketId: string;
    name: string;
    signature: string;
  }
  const Glimmer = () => <div>Loading...</div>;
function Products() {
    const router = useRouter();
    
    const [data, setData] = useState<Data[]>([]);
  const [views, setViews] = useState<any[]>([]);

  const handlePreview = useCallback(async (bucketId: string, id: string) => {
    const view = await storage.getFilePreview(bucketId, id);
    return view;
  }, []);
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    const fetchData = async () => {
      const resImg = await storage.listFiles('645fb0eac098b131b505');
      const { files } = resImg;
      if (files) {
        const randomFiles = shuffleArray(files).slice(0, 5);
        const modifiedFiles = randomFiles.map((file: any) => ({
          ...file,
          name: file.name.replace(/\.(jpe?g|png)$/, '') // remove ".jpg", ".jpeg", or ".png" from the name

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
     


  return (
    <>
         <h2 className='text-xl font-bold  text-white '> Resturants </h2>
        <div className="flex flex-1 my-2  h-[200px] w-auto ">
            <div className="bg-[#402D49]  w-auto mx-auto gap-4 shadow-[#000000] my-auto shadow-lg rounded-[12px]   ">
                <div className="flex flex-wrap">
                {  data && (

                    data.map((item , index) => (
                     <div onClick={() => router.push(`/resturants`)} key={item.name} className=" relative p-4 m-2 md:m-5  cursor-pointer rounded-[20px] h-[250px]   w-[170px] shadow-[#4d4a4a] shadow-xl items-center  flex flex-col ">
                         <React.Suspense fallback={<Glimmer />} >
                            {views[index] && <img src={views[index].href} alt="" className='bg-auto w-auto h-[300px] relative object-center mx-auto   rouded-xl  ' />}
                        </React.Suspense>
                        <p className='text-lg font-bold  text-white'> {item.name} </p>
                    </div>
                    ))
                 )
                }
                <div onClick={() => router.push(`/resturants`)} className='hover:bg-form cursor-pointer flex text-center justify-items-center gap-2 items-center bg-orange m-auto px-4 py-2 text-white rounded-md '>
                    Read more <span className='h-5 w-5'> <AiOutlineArrowRight /> </span>
                </div>
                </div>
                {/* <img src={data.href} alt={"test img"} className='h-20 w-20' />  */}
            </div>
        </div>  
    </>
  )
}

export default Products

//  <Image src={item.url}  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  priority alt={item.name} fill   className='bg-auto relative object-center mx-auto  h-auto w-auto rouded-xl  ' />