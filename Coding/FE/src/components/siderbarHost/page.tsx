'use client'
import { useState } from "react";
import { Avatar, Link, Button, Divider } from "@nextui-org/react";
import { BiHome, BiUser } from "react-icons/bi";
import { FaUserCircle, FaBars, FaShopify } from "react-icons/fa";
import { IoLogOut, IoToday } from "react-icons/io5";
import { MdRoomService, MdWorkHistory } from "react-icons/md";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function SiderbarHost() {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar visibility

    const handleLogout = async () => {
        await localStorage.clear();
        Cookies.remove('token');
        router.replace('/logIn');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed); // Toggle sidebar visibility
    };

    return (
        <div className={`flex flex-col items-center justify-between h-screen bg-gray-100 transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-84'} relative z-20`}>
            <Button isIconOnly onClick={toggleSidebar} className="absolute bg-transparent z-30  my-2  ">
                <FaBars />
            </Button>
            <div className='flex  flex-col gap-6 mt-20 px-2'>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                    <Link href="/shopOwner"> <BiHome className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/shopOwner" className="text-default-900 text-xl font-medium">Trang chủ</Link>}
                </div>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                    <Link href="/shopOwner/manageService">  <MdRoomService className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/shopOwner/manageService" className="text-default-900 text-xl font-medium">Dịch vụ</Link>}
                </div>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                    <Link href="/shopOwner/bookingOrder">   <IoToday className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/shopOwner/bookingOrder" className="text-default-900 text-xl font-medium">Đơn hàng</Link>}
                </div>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                    <Link href="/shopOwner/timeSlot">  <MdWorkHistory className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/shopOwner/timeSlot" className="text-default-900 text-xl font-medium">Thời gian hoạt động</Link>}
                </div>
                <Divider />
            </div>
        </div>
    );
}
