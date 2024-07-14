'use client'
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Badge, Card, CardHeader, Divider, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@nextui-org/react";
import { NotificationsDropdown } from "../notify/page";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
export default function GuestHeader() {
    const router = useRouter()
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0 w-5 h-5";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = async () => {
        await localStorage.clear();
        Cookies.remove('token');
        router.replace('/logIn');
    };
    return (

        <Navbar className="bg-transparent  top-0 z-50 ">
            <NavbarContent className="hidden sm:flex gap-4 " justify="start">
                <NavbarItem>
                    <Link className="font-medium hover:text-orange-600" color="foreground" href="/">
                        Trang chủ
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="font-medium hover:text-orange-600" color="foreground" href="/aboutUs">
                        Về chúng tôi
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link className="font-medium hover:text-orange-600" color="foreground" href="/contact">
                        Liên hệ
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link className="font-medium hover:text-orange-600" color="foreground" href="/listService">
                        Dịch vụ


                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="font-medium hover:text-orange-600" color="foreground" href="/listShop">
                        Shop


                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarBrand className="sm:flex justify-center text-center">
                <div>
                    <Link href="/" className="font-bold text-3xl text-inherit">Pet Place</Link>
                    <p className=" font-light text-gray-400">Best Pet Care Service</p>
                </div>
            </NavbarBrand>
            <NavbarContent justify="end" >
                {isLoggedIn ? (
                    <>
                        <NotificationsDropdown />
                        <NavbarItem>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="md" />
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                    <DropdownItem
                                        startContent={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>

                                        }
                                    >
                                        <Link href="/customer/profile" color="foreground">Trang cá nhân</Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.57 15.228a7 7 0 0 1 0 3.787m-1.324-2.83a9 9 0 1 0-10.485 0m10.485 0a9 9 0 1 1-10.485 0M12 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        }
                                    >
                                        <Link href="/customer/changePasswordCus" color="foreground">Thay đổi mật khẩu</Link>
                                    </DropdownItem>

                                    <DropdownItem
                                        startContent={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>

                                        }
                                    >
                                        <Link href="/customer/orderHistory" color="foreground">Lịch sử đặt hàng</Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${iconClasses}`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>


                                        }
                                    >
                                        <Link href="/customer/managePet" color="foreground">Danh sách thú cưng</Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={handleLogout}
                                        startContent={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                            </svg>

                                        }
                                    >
                                        <p className="font-normal" color="foreground">Đăng xuất</p>
                                    </DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>

                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link className="font-medium hover:text-orange-600" href="/logIn" color="foreground">Đăng nhập</Link>
                        </NavbarItem>
                        <NavbarItem>

                            <Link className="font-medium hover:text-orange-600" href="/signUp" color="foreground">Đăng ký</Link>


                        </NavbarItem>
                    </>

                )}



            </NavbarContent>
        </Navbar>


    );
}