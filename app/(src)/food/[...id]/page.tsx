'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { database } from "@/components/appwrite/Config";

interface Doc {
  Item_name : string,
  Price : number,
  addedPrice : any[],
  countryData : any[],
  donate : string,
  duration : number,
  ph : number,
  price : number
}

export default function GiveName({
    params,
    searchParams,
  }: {
    params: { id: string };
    searchParams: { id: string };
  }) {
    const [data,setData] = useState<Doc>()
    useEffect(() => {
      async function getDoc () {
        const res :any = await database.getDocument(
        "645742f1acfa7ac60606",
        "allfood",
         params.id
        )
        setData(res)
      }
      getDoc()
    }, []);
    console.log(data)
    
    
    return (
      //   <main>
      //       {/* <head>
      //           <title> {data ? data.name : "Product Details"} </title>
      //       </head> */}
      //       <div className=" max-w-6xl m-10 min-h-screen  ">
      //   <h1 className="text-4xl text-white font-bold">
      //     Food item_name {data && data.Item_name } {" "}
      //   </h1>
      //   <div className="pt-10 mx-auto justify-between max-w-4xl w-auto flex  ">
      //     <img
      //       className="rounded-md h-[400px] w-[400px]"
      //       src="https://media.istockphoto.com/id/1371318211/photo/groceries-shopping-flat-lay-of-fruits-vegetables-greens-bread-and-oil-in-eco-friendly-bags.jpg?s=1024x1024&w=is&k=20&c=VgAy4XkcbsK_aM9WInQaF49NVVxRb_5_P96eGY69IQ4="
      //       alt=""
      //     />

      //     <div className=" ml-[-70px] font-serif text-white space-y-8  ">
      //       <p>Available : {data?.donate} </p>
      //       <p>Expire in : {data?.duration} </p>
      //       <p>Price : Rs.{data ? data.Price : 0 } </p>
      //       <p>Mobile number : {data?.ph} </p>
      //       <p>City : Faisalabad</p>
      //       <p> Donar Rating  </p>
      //       <p> Location address </p>
      //     </div>
      //   </div>
      //   <div className=" max-w-5xl m-6 pt-6 text-white">
      //     <h1 className="   text-xl font-medium">Map location</h1>
      //     <button className="py-2 px-8 items-center mt-6 justify-evenly rounded-[4px] bg-orange flex  gap-[2px] ">
      //       <FiMapPin className="h-5 w-5" />
      //       <div className="">View on map</div>
      //     </button>
      //     <div className=" pl-[100px]  max-w-5xl mx-auto  flex flex-row-reverse ">
      //       <Image
      //         className="mx-auto"
      //         src={`/map.png`}
      //         height={500}
      //         width={650}
      //         alt="map location"
      //       />
      //     </div>
      //   </div>
      // </div>
      //   </main>
      <main>
  {/* <head>
      <title> {data ? data.name : "Product Details"} </title>
  </head> */}
  <div className="max-w-6xl m-10 min-h-screen">
    <h1 className="text-4xl text-white font-bold mb-10">
      Food Item: {data && data.Item_name}
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center items-center">
        <img
          className="rounded-md h-[400px] w-[400px]"
          src="https://media.istockphoto.com/id/1371318211/photo/groceries-shopping-flat-lay-of-fruits-vegetables-greens-bread-and-oil-in-eco-friendly-bags.jpg?s=1024x1024&w=is&k=20&c=VgAy4XkcbsK_aM9WInQaF49NVVxRb_5_P96eGY69IQ4="
          alt=""
        />
      </div>
      <div className="font-serif text-white space-y-8">
        <p>
          <span className="font-bold">Available:</span> {data?.donate}
        </p>
        <p>
          <span className="font-bold">Expire in:</span> {data?.duration}
        </p>
        <p>
          <span className="font-bold">Price:</span> Rs. {data?.Price ? data.Price : data?.price }
        </p>
        <p>
          <span className="font-bold">Mobile number:</span> {data?.ph}
        </p>
        <p>
          <span className="font-bold">City:</span> Faisalabad
        </p>
        <p>
          <span className="font-bold">Donar Rating:</span> ⭐⭐⭐⭐⭐
        </p>
        <p>
          <span className="font-bold">Location address:</span> 123 Main Street,
          Faisalabad
        </p>
      </div>
    </div>
    <div className="max-w-5xl m-6 pt-6 text-white">
      <h1 className="text-xl font-medium mb-6">Map Location</h1>
      <button className="py-2 px-8 items-center justify-evenly rounded-4 bg-orange flex gap-2">
        <FiMapPin className="h-5 w-5" />
        <div>View on Map</div>
      </button>
      <div className="flex justify-center mt-10">
        <Image
          className="mx-auto"
          src={`/map.png`}
          height={500}
          width={650}
          alt="map location"
        />
      </div>
    </div>
  </div>
</main>

    )
  }