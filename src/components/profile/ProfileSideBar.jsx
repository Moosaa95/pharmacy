import React, { useContext } from 'react'
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineReceiptRefund, HiOutlineShoppingCart } from 'react-icons/hi'
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import {MdOutlineTrackChanges} from "react-icons/md"
import {TbAddressBook} from "react-icons/tb"
import { toast } from "react-toastify";
import { RiLockPasswordLine } from "react-icons/ri";

import AuthContext from '../../context/AuthContext'

const ProfileSideBar = ({active, setActive}) => {
    const navigate = useNavigate()

    const {logoutUser} = useContext(AuthContext)

    const handleItemClick = (index) => {
        setActive(index);
    };
    const logoutHandler = () => {
        navigate("/login")
        logoutUser()
        toast.success("logout succeess")

    }
  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
        >
            <RxPerson size={20} color={active === 1? "green" : ""} />
            <span className={`pl-3 ${active === 1 ? "text-[green]" : ""} 800px:block hidden `}>
                Profile
            </span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
        >
            <HiOutlineShoppingCart size={20} color={active === 2? "green" : ""} />
            <span className={`pl-3 ${active === 2 ? "text-[green]" : ""} 800px:block hidden`}>
                Orders
            </span>
        </div>
        <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <RiLockPasswordLine size={20} color={active === 3 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || logoutHandler()}
        >
            <AiOutlineLogout size={20} color={active === 4? "green" : ""} />
            <span className={`pl-3 ${active === 4 ? "text-[green]" : ""} 800px:block hidden`}>
                Logout 
            </span>
        </div>

    </div>
  )
}

export default ProfileSideBar