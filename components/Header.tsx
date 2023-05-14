"use client";
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled, RxDot } from "react-icons/rx";
import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Image 1",
  },
  {
    src: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Image 2",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Image 3",
  },
];

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="relative min-h-[200px] max-w-[1300px]">
      <div className="px-6 m-auto text-center items-center justify-items-center">
        <div className="relative h-[200px] rounded-xl overflow-hidden">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="mt-2 flex justify-center items-center">
          {images.map((_, index) => (
            <div key={index} className="mx-1">
              {index === currentIndex ? (
                <RxDotFilled
                  className="cursor-pointer h-4 w-4 text-[#978484]"
                  onClick={() => setCurrentIndex(index)}
                />
              ) : (
                <RxDot
                  className="cursor-pointer h-4 w-4 text-[#978484]"
                  onClick={() => setCurrentIndex(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;

// import { useState, useEffect } from "react";
// import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
// import { RxDotFilled, RxDot } from "react-icons/rx";
// import Image from "next/image";

// const images = [
//   {
//     src: "https://images.unsplash.com/photo-1612809972626-2152e475dcd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//     alt: "Image 1",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//     alt: "Image 2",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//     alt: "Image 3",
//   },
// ];

// function Header() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((currentIndex + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [currentIndex]);

//   return (
//     <div className="relative min-h-[200px] max-w-[1300px]">
//       <div className="px-6 m-auto text-center items-center justify-items-center">
//         <img
//           src={images[currentIndex].src}
//           alt={images[currentIndex].alt}
//           width={1300}
//           height={200}
//           className="z-[-1] w-full h-[200px] relative object-cover rounded-xl"
//         />
//         <div className="mt-[380px] justify-items-center mx-auto text-center items-center justify-center">
//           {images.map((_, index) => (
//             <div key={index}>
//               {index === currentIndex ? (
//                 <RxDotFilled
//                   className="cursor-pointer h-20 w-20 mx-2 text-[#978484] text-center mt-[-60px] absolute"
//                   onClick={() => setCurrentIndex(index)}
//                 />
//               ) : (
//                 <RxDot
//                   className="cursor-pointer h-20 w-20 mx-2 text-[#978484] text-center mt-[-60px] absolute"
//                   onClick={() => setCurrentIndex(index)}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
