"use client";
import React, { useEffect, useState } from "react";
import { HiFilter, HiOutlineShoppingCart } from "react-icons/hi";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { database } from "@/components/appwrite/Config";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";
import AddToCartBtn from "@/components/AddToCartBtn";

interface DataType {
    total : number,
    documents
 : {
        Product_name:string,
        $id : string,
        $databaseId : string,
        $collectionId:string,
        Price: number,
        Size : any[],
        Address : string,
        addtoCart : any
    }[]
}
type DataType2 = {
  documents: any[];
};
export default function Food () {

  //const { userId, setUserId  ,data, setData } = useGlobalContext();

  const router = useRouter();
  const [fullData, setFullData] = useState<DataType>();
  const [searchResults, setSearchResults] = useState<DataType2>({ documents: [] });
  const [searchText, setSearchText] = useState('');

  // this useEfect is for fulldata and filterData
  useEffect(() => {
    async function fetchData() {
      try {
        const foodData: any = await database.listDocuments(
          "product",
          "645960110d70c7d1f789",
          [Query.limit(100)]
        );
        const data: DataType2 = { documents: foodData.documents };
        setSearchResults(data)
        setFullData(foodData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const filteredResults = searchResults.documents.filter((result) => {
    // You can customize the search condition here based on your use case
    return result.Product_name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
   
      <div className=" m-auto max-w-none">
          <section className="bg-indigo-dark h-50 p-8">
              <div className="container mx-auto py-8">
                <input className="w-full h-16  rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" type="text" value={searchText} onChange={handleSearchChange} placeholder="Search..." />
                
              </div>
            </section>
          <div className="container_card mx-auto justify-center content-center bg-[#312437]">
  <div className="flex fex-1 text-white justify-between">
    <p className="flex gap-1 font-semibold text-2xl text-center items-center">
      Filter <HiFilter />0
    </p>
    <button className="bg-[#E5B945] text-[#FFFFFF] text-center px-6 rounded-full py-1" onClick={() => router.push(`/product/form`)}>
      Donate now
    </button>
  </div>
  {/* card data */}
  <ul className="container px-0 md:px-6 pt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
    {filteredResults &&
      filteredResults.map((doc) => (
        <div className="item" key={doc.$id}>
          <img src="https://picsum.photos/400/300" alt="" />
          <div>
            <h2 className="text-xl text-white font-bold">{doc.Product_name}</h2>
            <div className="flex justify-between text-center mt-4 mb-3">
              <p className="text-white">Rs. {!doc.Price ? 0 : doc.Price} </p>
              <div className="flex text-center text-md items-center text-rating">
                <span>
                  <AiFillStar />
                </span>
                <span className="text-white">4.8</span>
                <span className="text-dataOrange">
                  <AiFillHeart />
                </span>
              </div>
            </div>
            <div className="text-xl flex justify-between">
              <button
                onClick={() => router.push(`/product/${doc.$id}`)}
                className="hover:cursor-pointer rounded-md px-6 py-1 text-center bg-dataOrange text-white"
              >
                More info
              </button>
              <AddToCartBtn product={doc}/>
              {/* <button
                className="hover:cursor-pointer text-xl bg-orange"
              >
                <HiOutlineShoppingCart className="h-8 w-8 text-xl text-white relative" />
                <span className="absolute pl-[0.6rem] mt-[-47px] text-white">
                  +
                </span>
              </button> */}
            </div>
          </div>
        </div>
      ))}
  </ul>
  {/* <Test checkoutData={data} /> */}
</div>
 
      </div>
   
  )
}


