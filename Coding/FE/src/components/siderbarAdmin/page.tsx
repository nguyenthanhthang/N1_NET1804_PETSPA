'use client'

import { useState } from "react";
import { Button, Divider, Link } from "@nextui-org/react";
import { BiHome } from "react-icons/bi";
import { FaBars, FaUserCog, FaUsers } from "react-icons/fa"; // Example icons
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { MdWorkHistory } from "react-icons/md";

export default function SiderbarAdmin() {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleLogout = async () => {
        await localStorage.clear();
        Cookies.remove('token');
        router.replace('/logIn');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`flex flex-col items-center justify-between h-screen bg-gray-100 transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-84'} relative z-20`}>
            <Button isIconOnly onClick={toggleSidebar} className="absolute bg-transparent z-30  my-2  ">
                <FaBars />
            </Button>
            <div className='flex flex-col gap-6 mt-10 px-2'>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                    <Link href="/admin"><BiHome className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/admin" className="text-default-900 text-xl font-medium">Trang chủ</Link>}
                </div>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">

                    <Link href="/admin/manageAccount">     <MdWorkHistory className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/admin/manageAccount" className="text-default-900 text-xl font-medium">Tài khoản Shop</Link>}
                </div>
                <Divider />
                <div className="flex gap-2 w-full min-h-[10px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">

                    <Link href="/admin/manageAccountCus">      <FaUsers className="w-6 h-6" color="black" /></Link>
                    {!isCollapsed && <Link href="/admin/manageAccountCus" className="text-default-900 text-xl font-medium">Tài khoản khách hàng</Link>}
                </div>
                <Divider />
            </div>
        </div>
    );
}
