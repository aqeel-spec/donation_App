"use client"
import React, { useState } from "react";
import { AiFillEyeInvisible , AiFillEye } from 'react-icons/ai';


import {
  NameIcon,
  KeyIcon,
  EmailIcon,
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "./Icons/figmaDefault";
import { useForm } from 'react-hook-form';
import { SignUpData } from "@/types/auth";
import Profile from "./Profile";


function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors } ,
    reset,
    watch
  } = useForm<SignUpData>();
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [succesesMs,setSuccessMsg] = useState("");
  
  // handle password eye to show password
  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye)
  }
  // handle Confirm  password eye to show password
  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye)
  }


  //       useform data
  const onSubmit = async (data : SignUpData) => {
    try {
      
      const res =  await fetch("/api/auth",{
        method : "POST",
        body : JSON.stringify(data)
      });
      if(!res.ok) {
        throw new Error("Failed to login");
      }
      // signUp page data 
      console.log(data);
      setSuccessMsg("User registration is successful.");
      reset();

    }catch(error) {
      console.error((error as { message: string }).message)
    }

    
  }
  // check password event for password validation
  const password = watch("password");
  return (
    <>
      <div className=" grid  grid-cols-1   h-screen text-gray-900 ">
        
        <div className=" w-full border-[1px] shadow-xl p-8 m-auto rounded-lg sm:w-96 bg-opacity-80 bg-clip-padding">
          <div className="space-y-2">
            <div>
              <h1 className="text-4xl l font-serif  font-semibold   text-[#EFEFEF] text-center  ">
                Create Account
              </h1>
            </div>
            <div className="text-form">
              <div className="space-x-1 text-sm text-center md:text-base font-nunito">
                <span>Already have an account?</span>
                <a className="font-semibold text-blue-600" href="/signin">
                  Sign In
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <form
              className="text-base font-nunito"
              action="http://localhost:8080/"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              {succesesMs && <p className=" text-xl text-green-400 font-semibold pb-4 "> {succesesMs} </p> }
              <div className="space-y-4">
                {/* User name  */}
                <div className="flex flex-col text-form">
                  <label htmlFor="yourname" className="mb-1">
                    Enter your name
                  </label>
                  <div className="relative flex items-center ">
                    <NameIcon />
                    <input
                      className=" input_section"
                      type="text"
                      placeholder="@yourname"
                      {...register("name",{
                        required : "Name is required"
                      })}
                    />
                  </div>
                  {/** name section validation */}
                  {
                    errors.name && (
                      <p className="error_msg"> {errors.name.message as string} </p>
                    )
                  }
                </div>
                {/* User Email  */}
                <div className="flex flex-col text-form ">
                  <label htmlFor="Email" className="mb-1">
                    Enter your email
                  </label>
                  <div className="relative flex items-center">
                    <EmailIcon />
                    <input
                      className="input_section"
                      type="email"
                      
                      placeholder="Email"
                      {...register("email",{
                        required : "Email is required",
                        pattern : {
                          value : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message : "Email is not valid"
                        }
                      })}
                    />
                  </div>
                  {/** validation for email address */}
                  {
                    
                    errors.email  && <p className="error_msg"> {errors.email.message as string  } </p>
                  }
                </div>
                {/**  Password section here */}
                <div className="flex flex-col text-form">
                  <label htmlFor="password" className="mb-1">
                    Enter password
                  </label>
                  <div className="relative flex items-center">
                    <KeyIcon />
                    <input
                      className="input_section"
                      type={ (passwordEye === false) ? "password" : "text" }
                      id='password'
                      placeholder="Password"
                      {...register("password",{
                        required : true,
                        validate : {
                          checkLength : (value) => value.length >= 6,
                          matchPattern: (value) =>
                          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                        },
                      })}
                    />
                    <div className="absolute text-2xl top-2 right-5">
                      { (passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordClick} /> : <AiFillEye onClick={handlePasswordClick} />  }
                    </div>
                  </div>
                  {/** form password validation error show */}
                  {errors.password?.type === "required" && (<p className="error_msg">Password is required.</p>)}
                  {errors.password?.type === "checkLength" && (
                      <p className="error_msg">
                        Password should be at-least 6 characters.
                      </p>
                  )}
                  {errors.password?.type === "matchPattern" && (
                      <p className="error_msg">
                        Password should contain at least one uppercase letter, lowercase
                  letter, digit, and special symbol.
                      </p>
                  )}
                </div>
                 {/** Confirm Password section here */}
                <div className="flex flex-col text-form">
                  <label htmlFor="password" className="mb-1">
                    Confirm password
                  </label>
                  <div className="relative flex items-center">
                    <KeyIcon />
                    <input
                      className="input_section"
                      type={ (confirmPasswordEye === false) ? "password" : "text" }
                      id='confirmPassword'
                      onPaste={(e) => {
                        e.preventDefault();
                        return false
                      }}
                      placeholder="Confirm password"
                      {...register("confirmPassword",{
                        required : "Confirm password is required",
                        validate : (value) => value === password || "Password do not match"
                      })}
                      
                    />
                    <div className="absolute text-2xl top-2 right-5">
                      { (confirmPasswordEye === false) ? <AiFillEyeInvisible onClick={handleConfirmPasswordClick} /> : <AiFillEye onClick={handleConfirmPasswordClick} />  }
                    </div>
                  </div>
                  {/** confirm password error msg for validate password */}
                  {
                      errors.confirmPassword && <p className="error_msg"> { errors.confirmPassword.message as string } </p>
                    }
                 
                </div>
                <div className="">
                  <div className="flex justify-items-center  items-start space-x-2 md:items-center text-form">
                    <input
                      className="w-4 h-4   border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      id="serviceTerms"
                      {...register("conditionAgree",{
                        required : "Field is required"
                      })}
                    />
                     <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium form-text dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                  </div>
                  { errors.conditionAgree && <p className="error_msg"> {errors.conditionAgree.message as any} </p> }
                </div>
                <div>
                  <button type="submit"  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito  focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg" >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/** auth2 athentication */}
      </div>
    </>
  );
}

export default SignUp;

{
  /* <div classNameNameName="">
  <div classNameNameName="sm:text-center text-left">
    <h1 classNameNameName="text-[#EFEFEF] text-[89.88px] font-serif font-semibold leading-[135px] ">
      Get Started Free
    </h1>
    <p classNameNameName="text-[#B8B8B8] text-[31.93px] font-serif font-medium leading-[48px] ">
      Free Forever. No Credit Card Needed
    </p>
  </div>
  <div classNameNameName="flex flex-col space-y-[20px]">
    <label htmlFor="yourname">Your Name</label>
    <input
      id="name"
      type="text"
      placeholder="@yourname"
      classNameNameName=" mt-1 block w-full "
    />
  </div>
</div> */
}