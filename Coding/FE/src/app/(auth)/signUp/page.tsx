'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { SignupInput } from "@/models/authentication";
import { useAuth } from "@/hooks/useAuth";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyInput, MyInputEmail, MyInputFirstName, MyInputLastName, MyInputPassword } from "@/components/ui/loginInput";
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import loginImg from '../../../../public/assets/img/login.svg';
import Image from 'next/image';
import { FaArrowAltCircleLeft } from "react-icons/fa";
export default function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [isShowPassword, setIsShowPassword] = useState(false);
    const initialValues = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };



    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Tên người dùng là bắt buộc')
            .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
            .max(20, 'Tên người dùng không được vượt quá 20 ký tự'),
        password: Yup.string()
            .required('Mật khẩu là bắt buộc')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .max(20, 'Mật khẩu không được vượt quá 20 ký tự'),
        firstName: Yup.string()
            .required('Họ là bắt buộc')
            .min(2, 'Tên Họ phải có ít nhất 2 ký tự')
            .max(20, 'Tên Họ không được vượt quá 20 ký tự')
            .matches(/^[a-zA-Z]+$/, 'Tên Họ không được chứa số hoặc kí tự đặc biệt'),
        lastName: Yup.string()
            .required('Tên là bắt buộc')
            .min(3, 'Tên của bạn phải có ít nhất 3 ký tự')
            .max(20, 'Tên của bạn không được vượt quá 20 ký tự')
            .matches(/^[a-zA-Z]+$/, 'Tên của bạn không được chứa số hoặc kí tự đặc biệt'),
        email: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Email là bắt buộc'),
    });


    const { handleSignup } = useAuth();

    const handleSubmit = async (values: SignupInput) => {

        try {
            await handleSignup(values);
            setIsLoading(true); // Start loading
            toast.success("Đăng ký thành công! Bạn sẽ chuyển đến trang đăng nhập trong giây lát...", {
                onClose: () => {
                    setTimeout(() => {
                        router.replace('/logIn');
                    }, 2000);
                },
                autoClose: 1000,
            });
        } catch (error) {
            toast.error("Đăng ký không thành công. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);

        }
    };

    return (
        <section className="h-screen">
            <Button
                startContent={<FaArrowAltCircleLeft />}
                onClick={() => router.push('/')}
                className='bg-gradient-to-tr absolute m-5 from-pink-500 to-yellow-500 text-white shadow-lg'
            >
                Trở về trang chủ
            </Button>
            <div className="flex h-full flex-wrap items-center justify-between lg:justify-between">
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-6/12">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Card className='mx-auto w-3/5'>
                                    <CardHeader className='space-y-1'>
                                        <div className="flex justify-center text-center">
                                            <p className='text-4xl font-bold uppercase'>Đăng Ký</p>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className='space-y-4'>
                                            <div className='space-y-2'>
                                                <Field
                                                    name='firstName'

                                                    component={MyInputFirstName}
                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <Field
                                                    name='lastName'
                                                    component={MyInputLastName}

                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <Field
                                                    name='email'
                                                    component={MyInputEmail}

                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <Field
                                                    name='username'
                                                    component={MyInput}
                                                    type={isShowPassword ? 'text' : 'password'}

                                                />
                                            </div>
                                            <div className='space-y-4'>
                                                <div className='relative flex flex-col space-y-2'>
                                                    <Field
                                                        name='password'
                                                        fullWidth
                                                        component={MyInputPassword}
                                                        placeholder='Password'

                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                type='submit'

                                                className='bg-gradient-to-tr w-full from-pink-500 to-yellow-500 text-white shadow-lg'
                                                disabled={isSubmitting}
                                            >
                                                Đăng ký
                                                {isLoading && <ClipLoader size={20} color="#ffffff" />}
                                            </Button>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        Bạn đã có tài khoản?
                                        <Link href='/logIn'>
                                            <span className='text-blue-500 hover:text-orange-600'> Đăng nhập ở đây </span>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <Image
                        src={loginImg}
                        alt='login'
                        className='w-full h-screen object-cover'

                    />
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}