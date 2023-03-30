"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlinePlus } from "react-icons/ai";

export const Navbar = () => {

  const router = useRouter();

  return (
    <header className="flex items-center bg-gray-800 px-28 py-3 justify-between">

        <Link href="/">
            <h1 className="font-black text-3xl text-white">Task App</h1>
        </Link>

        <div className="flex-grow text-right">
            <button
              onClick={() => router.push("/new")}
              className="bg-green-500 hover:bg-green-400 px-5 py-2 text-gray font-bold rounded-sm inline-flex items-center"  
            >
              <AiOutlinePlus className="mr-2" />
              Add Task
            </button>
        </div>

    </header>
  )
}

