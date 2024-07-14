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
    const [isEditing, setIsEditing] = useState(false);
    const handleCancelClick = () => {
        setIsEditing(false);
        router.replace('/logIn');
        // resetForm();
    };
    const [isShowPassword, setIsShowPassword] = useState(false);
    const initialValues = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    const handleUpdate = async  (values: SignupInput) => {
        // const errors = validateInput();
        // if (errors.length > 0) {
        //     setValidationErrors(errors);
        //     return;
        // }
        try {
            await handleSignup(values);
            setIsLoading(true); // Start loading
            toast.success("Đăng ký thành công! Bạn sẽ chuyển đến trang đăng nhập trong giây lát...", {
                onClose: () => {
                    setTimeout(() => {
                        router.replace('/password');
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

    const validationSchema = Yup.object().shape({
      
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
                                            <p className='text-4xl font-bold uppercase'>Quên mật khẩu</p>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className='space-y-4'>
                                          
                                            <div className='space-y-2'>
                                                <Field
                                                    name='email'
                                                    component={MyInputEmail}

                                                />
                                            </div>
                                     
                                            <Button className=" ml-1 mr-5" onClick={handleCancelClick}> <Link href='/logIn'>Huỷ</Link></Button>
                                            <Button color="success"  disabled={isSubmitting}>Gửi    {isLoading && <ClipLoader size={20} color="#ffffff" />}</Button>
                                            {/* <Button
                                                type='submit'

                                                className='bg-gradient-to-tr w-full from-pink-500 to-yellow-500 text-white shadow-lg'
                                                disabled={isSubmitting}
                                            >
                                             Gửi
                                                {isLoading && <ClipLoader size={20} color="#ffffff" />}
                                            </Button> */}
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