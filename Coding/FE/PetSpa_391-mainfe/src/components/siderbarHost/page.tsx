import { Avatar, Link } from "@nextui-org/react";
import { BiHome, BiUser } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut, IoToday } from "react-icons/io5";
import { MdHistory, MdRoomService, MdWorkHistory } from "react-icons/md";

export default function SiderbarHost() {
    return (
        <div className="h-screen z-[20] sticky top-0 border">
            <div className="flex flex-col items-center justify-between h-full ">
                <div className='flex flex-col gap-6 mt-10 px-2  '>
                    <div className="flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                        <BiHome className="w-6 h-6" />
                        <Link href="/" className="text-default-900 text-xl font-medium">Trang chủ</Link>
                    </div>
                    <div className="flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                        <MdRoomService className="w-6 h-6" />
                        <Link href="/" className="text-default-900 text-xl font-medium">Dịch vụ</Link>
                    </div>
                    <div className="flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                        <IoToday className="w-6 h-6" />
                        <Link href="/shopOwner/bookingOrder" className="text-default-900 text-xl font-medium">Lịch đặt hàng hôm nay</Link>
                    </div>
                    <div className="flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                        <MdWorkHistory className="w-6 h-6" />
                        <Link href="/" className="text-default-900 text-xl font-medium">Lịch sử đặt hàng</Link>
                    </div>
                    <div className="flex gap-2  w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                        <FaUserCircle className="w-6 h-6" />
                        <Link href="/" className="text-default-900 text-xl font-medium">Trang cá nhân</Link>
                    </div>
                    <div className="flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]">
                        <IoLogOut className="w-6 h-6" />
                        <Link href="/" className="text-default-900 text-xl font-medium">Đăng xuất</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
