'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { database } from "@/components/appwrite/Config";

interface Doc {
  Product_name : string,
  Price : number,
  addtoCart : any[],
  addedPrice : any[],
  Address : string,
  ph : number,
  size : string,
  price : string
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
        "product",
        "645960110d70c7d1f789",
         params.id
        )
        setData(res)
      }
      getDoc()
    }, []);
    
    
    return (
  <div className="max-w-6xl m-10 min-h-screen">
    <h1 className="text-4xl text-white font-bold mb-10">
      Food Item: {data && data.Product_name}
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
          <span className="font-bold">Size:</span> <span className="uppercase " >{data?.size}</span>
        </p>
        <p>
          <span className="font-bold">Price:</span> Rs. { data?.price }
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
          <span className="font-bold">Location address:</span> {data?.Address}
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


    )
  }