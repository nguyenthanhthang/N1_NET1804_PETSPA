"use client"
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Tab, Tabs } from '@nextui-org/react'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
export default function Profile() {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleEditClick = () => {
        setIsDisabled(false);
    };

    const handleSaveClick = () => {
        setIsDisabled(true);
    };
    return (

        <div className='h-screen'>

            <div
                style={{
                    backgroundImage: 'url(https://i.pinimg.com/originals/5b/15/2a/5b152a7d4faa4b8ffb158eaa95fde428.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '21px'
                }}>
            </div>
            <div className='container'>
                <div className='justify-center flex items-center'>
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
                </div>
                <div className='flex justify-end '>
                    <div className='fixed'>
                        <Button>
                            <BiEdit className="mr-2 h-4 w-4" onClick={handleEditClick} />Chỉnh sửa
                        </Button>
                    </div>
                </div>
                <div className='justify-center flex items-center mt-2'>
                    <h1 className='text-2xl font-bold uppercase'>Thien An</h1>
                </div>
                <div className='justify-center flex items-center'>
                    <h1 className='text-1xl font-light '>A funny man</h1>
                </div>

                <Divider />
                <div className='container mt-4'>
                    <Tabs className="flex justify-center">
                        <Tab className='flex justify-center' key="account" title="Tài khoản">
                            <Card className='w-[550px] p-4'>
                                <CardHeader className='w-full flex justify-center text-center'>
                                    <div>
                                        <p className='text-2xl font-bold'>Tài Khoản</p>
                                        <p>
                                            Thực hiện thay đổi cho tài khoản của bạn tại đây.
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-2">
                                    <div className="space-y-1">
                                        <p >Email</p>
                                        <Input id="email" disabled={isDisabled} defaultValue="andy@gmail.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <p >Số điện thoại</p>
                                        <Input id="phone" disabled={isDisabled} defaultValue="078956489" />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Button >Lưu</Button>
                                </CardFooter>
                            </Card>
                        </Tab>
                        <Tab className='flex justify-center' key="password" title="Mật khẩu">
                            <Card className='w-[550px] p-4'>
                                <CardHeader className='w-full flex justify-center text-center'>
                                    <div>
                                        <p className='text-2xl font-bold'>Tài Khoản</p>
                                        <p>
                                            Thay đổi mật khẩu của bạn ở đây.
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-2">
                                    <div className="space-y-1">
                                        <p >Mật khẩu hiện tại</p>
                                        <Input id="currentPassword" disabled={isDisabled} type='password' />
                                    </div>
                                    <div className="space-y-1">
                                        <p >Mật khẩu mới</p>
                                        <Input id="newPassword" disabled={isDisabled} type='password' />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={handleSaveClick} >Lưu</Button>
                                </CardFooter>
                            </Card>
                        </Tab>

                    </Tabs>
                </div>


            </div>
        </div>
    )
}