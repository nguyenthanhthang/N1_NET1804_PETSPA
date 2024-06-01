'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleRegister = async () => {
        // Perform registration logic here
    };

    return (
        <section className="h-screen">
            <Button
                onClick={() => router.push('/')}
                className="absolute top-4 left-4 z-10"
            >
                Trở về trang chính
            </Button>
            <div className="flex h-full flex-wrap items-center justify-between lg:justify-between">
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-6/12">
                    <form>
                        <Card className="mx-auto w-3/5">
                            <CardHeader className="space-y-1">
                                <div>
                                    <p className="text-4xl font-bold">Đăng kí tài khoản</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Input value={email} onChange={(event) => setEmail(event.target.value)} type={"email"} label="Email" />
                                    </div>
                                    <div style={{ ["display" as any]: "flex" }} className="space-y-2 relative">
                                        <Input
                                            type={isShowPassword ? "text" : "password"}
                                            value={password}
                                            label="Mật khẩu"
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setIsShowPassword(!isShowPassword)}
                                        >
                                            {isShowPassword ? <VscEyeClosed /> : <VscEye />}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <Input type={"text"} value={username} label="Tên người dùng" onChange={(event) => setUsername(event.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Input type={"tel"} value={phoneNumber} label="Số điện thoại" onChange={(event) => setPhoneNumber(event.target.value)} />
                                    </div>
                                    <div className="mt-4">
                                        <Button radius="full" className="bg-gradient-to-tr w-full from-pink-500 to-yellow-500 text-white shadow-lg" type="submit">
                                            Đăng kí tài khoản mới
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className='header'>
                                    <span> Bạn đã có sãn một tài khoản?</span>
                                    <Link href="/logIn" className="hover:text-orange-600">Đăng Nhập </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
                <div className="grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <img
                        src="https://i.pinimg.com/564x/54/71/6a/54716a3848c6fbfb5770d4831803532b.jpg"
                        className="w-full h-screen"
                        alt="Sample image"
                    />
                </div>
            </div>
        </section>
    );
}
