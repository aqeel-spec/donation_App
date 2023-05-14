"use client";
import Header from "./Header";
import Food from "./data/Food";
import Products from "./data/Products";

import { useRouter } from "next/navigation";
import Resturants from "./Resturants";

function Home() {
  const router = useRouter();

  return (
    <div
      className={` flex flex-col flex-1 justify-between space-y-16  m-auto  p-4 relative  hover:z-0 `}
    >
      <Header />
      <Food />
      <Products />
      <Resturants />
    </div>
  );
}

export default Home;
