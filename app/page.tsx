import Image from 'next/image'
import Home from '@/components/Home'
export default function page() {
  return (
    <div className={` flex flex-col justify-between space-y-16  m-auto  p-4 relative  hover:z-0 `}>
       <Home />
    </div>
  )
}
