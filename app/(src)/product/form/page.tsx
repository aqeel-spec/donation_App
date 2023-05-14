"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { BiDonateHeart, BiTime } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { BsTelephoneOutbound } from "react-icons/bs";
import { setTimeout } from "timers/promises";
import { useRouter } from "next/navigation";
import { location } from "@/components/appwrite/Config";
import { MdDelete } from "react-icons/md";
import { database } from "@/components/appwrite/Config";
import { ID } from "appwrite";
import { CountryData } from "@/types/type";

enum GenderEnum {
  yes = "yes",
  male = "no",
}
interface DonationData {
  Product_name: string;
  imgArray: any[];
  Item_location: {
    countryData: any;
    logitude: number;
    latitude: number;
    //countryData: CountryData;
  };
  time: any;
  donation: boolean;
  price: number;
  ph: number;
  address : string;
  donate: GenderEnum;
  size : string;
}

function Donation() {
  const router = useRouter();
  const [foodAdd, setFoodAdd] = useState(false);
  // reactForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DonationData>({
    defaultValues: {
      donation: true,
    },
  });
  

  //  ######################                   ############################
  // ###############  ######## Location Data ####### ######################
  // #########################               ##############################

  // get latitude from geo location
  const geoLogAndLat = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("Item_location.latitude", position.coords.latitude);
        setValue("Item_location.logitude", position.coords.longitude);
        console.log("position map", position);
      },
      (error) => {
        console.log("there were some issues");
      }
    );
  };
  // get user location
  const getUserLocation = () => {
    const promise = location.get();
    promise.then(
      function (response) {
        setValue("Item_location.countryData", response);
        console.log("Item_location.countryData: response data from locale api", response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const handlePressLocation = () => {
    geoLogAndLat();
    getUserLocation();
  };

  //  ######################                   ############################
  // ###############  ######## Image Uploader array ####### ######################
  // #########################               ##############################
  const [files, setFile] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    const selectedFiles: any = e.target.files;
    const newFiles: File[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const fileType = selectedFiles[i].type;
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        newFiles.push(selectedFiles[i]);
      } else {
        setMessage("only images accepted");
      }
    }

    setFile([...files, ...newFiles]);
    setValue("imgArray", [...files, ...newFiles]);
  };
  //  const imgUrl = URL.createObjectURL(files[0]);
  const removeImage = (name: string) => {
    setFile(files.filter((file) => file.name !== name));
  };

  const onSubmit = async (data: DonationData) => {
    try {
      // create document and send on database
      const countryEnd  = data.Item_location.countryData;
      const countryData = database.createDocument("product","countrydata",`${ID.unique()}`,{
          continent: countryEnd.continent,
            country: countryEnd.country,
            ip: countryEnd.ip,
      });
      countryData.then(
        function (response) {
          console.log("country data added successful",response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
      const promise = database.createDocument(
        "product",
        "645960110d70c7d1f789",
        `${ID.unique()}`,
        {
          Product_name: data.Product_name,
          // countryData: {
          //   userContinent: countryEnd.continent,
          //   userCountry: countryEnd.country,
          //   userIp: countryEnd.ip,
          // },
          price: data.price,
          ph: data.ph,
          Address : data.address,
          size : data.size
        }
      );
      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
      setFoodAdd(!foodAdd);
      reset();
      (() => router.push(`/product`) )();
      console.log(data);
    } catch (error) {
      console.error((error as { message: string }).message);
    }
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-auto  max-w-xl m-auto py-10 mt-10 px-10 border"
      >
        <div className=" flex flex-col justify-between ">
          {/* User name  section 1 */}
          <div className="">
            <div className="flex flex-col text-form">
              <label htmlFor="productname" className=" label_input  ">
                Product Name
              </label>
              <div className="relative flex items-center ">
                <AiOutlineUser className="icon_style" />
                <input
                  className=" input_section"
                  type="text"
                  placeholder="@productname"
                  {...register("Product_name", {
                    required: "Name is required",
                  })}
                />
              </div>
              {/** name section validation */}
              {errors.Product_name && (
                <p className="error_msg">
                  {" "}
                  {errors.Product_name.message as string}{" "}
                </p>
              )}
            </div>
            {/** describe size */}
            <div className="flex flex-col text-form">
              <label htmlFor="productname" className=" label_input  ">
                Enter size
              </label>
              <div className="relative flex items-center ">
                <AiOutlineUser className="icon_style" />
                <input
                  className=" input_section"
                  type="text"
                  placeholder="Enter size or any other"
                  {...register("size", {
                    required: "Field is required",
                  })}
                />
              </div>
              {/** name section validation */}
              {errors.size && (
                <p className="error_msg">
                  {" "}
                  {errors.size.message as string}{" "}
                </p>
              )}
            </div>
            {/* useHook selection form fropdown  */}
            <div className="text-form">
              <label className="label_input">Want to</label>
              <BiDonateHeart className="icon_style mt-1 " />
              <select {...register("donate")} className="input_section  ">
                <option value={"yes"}>Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {/** price section here */}
            <div className="flex flex-col text-form">
              <label htmlFor="foodname" className=" label_input  ">
                Item price
              </label>
              <div className="relative flex items-center ">
                <p className="icon_style">Rs.</p>
                <input
                  className=" input_section"
                  type="number"
                  placeholder={"enter price"}
                  {...register("price")}
                />
              </div>
              {/** name section validation */}
              {errors.price && (
                <p className="error_msg"> {errors.price.message as string} </p>
              )}
            </div>
            {/** location config */}
            <div className="text-form">
              <label className="label_input">Your location</label>
              <GoLocation className="icon_style mt-1 " />
              <button
                className="input_section"
                onClick={() => handlePressLocation()}
              >
                Share your current location
              </button>
              
              {errors.Item_location && (
                <div className="mb-3 text-normal text-red-500 ">
                  {errors.Item_location.message as string}
                </div>
              )}
            </div>


          {/** section 2  */}
          <div className="space-y-4">
            {/** ############################################################################## */}
            {/**###                          picture section to upload image                  #####*/}
            {/** #################################################################################### */}

            <div className="relative h-auto flex justify-center items-center  px-2">
              <div className="p-3 md:w-1/2 w-[360px] rounded-md">
                {message && (
                  <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
                    {message}
                  </span>
                )}

                <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
                  <input
                    type="file"
                    className="h-full w-full opacity-0 z-10 absolute"
                    multiple
                    name="files[]"
                    onChange={handleFile}
                  />

                  <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                    <div className="flex flex-col">
                      <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                      <span className="text-[12px]">{`Drag and Drop a file`}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {files.map((file, key) => (
                    <div
                      key={key}
                      className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-12 w-12 ">
                          <img
                            className="w-full h-full rounded"
                            src={URL.createObjectURL(file)}
                          />
                        </div>
                        <span className="truncate w-44">{file.name}</span>
                      </div>
                      <div
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                      >
                        <MdDelete className="mdi mdi-trash-can text-white text-[14px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* user ph. numeber  */}
            <div className="flex flex-col text-form">
              <label htmlFor="foodname" className=" label_input  ">
                Ph no.
              </label>
              <div className="relative flex items-center ">
                <BsTelephoneOutbound className="icon_style" />
                <input
                  className=" input_section"
                  type="number"
                  placeholder="Enter your current ph. number"
                  {...register("ph", {
                    required: "Number is required",
                  })}
                />
              </div>
              {/** name section validation */}
              {errors.ph && (
                <p className="error_msg"> {errors.ph.message as string} </p>
              )}
            </div>
            {/** textarea for address box */}
            <div className="relative mb-3 border-[1px] text-white " data-te-input-wrapper-init>
                <textarea
                    className="bg-gradient-to-r from-[#514756] via-[#473B4C] to-[#382C3E] w-ful text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="address"
                    rows={3}
                    placeholder="Your message" 
                    {...register("address", {
                      required: "Address is required",
                    })}
                    >

                  </textarea>
                <label
                    htmlFor="exampleFormControlTextarea1"
                    className=" text-xl text-white pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Enter your address</label>
                    {/** name section validation */}
              {errors.address && (
                <p className="error_msg"> {errors.address.message as string} </p>
              )}
             </div>
            {/** Submit btn here */}
            <div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito  focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        </div>
      </form>
    </>
  );
}

export default Donation;