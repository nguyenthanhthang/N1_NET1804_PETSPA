'use client';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginInput } from '@/models/authentication';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyInput, MyInputPassword } from '@/components/ui/loginInput';
import { useAppDispatch } from '@/lib/redux/store';
import { loginFailure, loginStart } from '@/lib/redux/slice/authSlice';
import baseApi from '@/utilities/baseApi';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { ROLE } from '@/utilities/roleUtils/role';
import { AxiosError } from 'axios';
import { LoginError } from '@/utilities/authUtils/loginValidation';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import loginImg from '../../../../public/assets/img/login.svg';
import Image from 'next/image';

interface roleJwt extends JwtPayload {
    role: string;
    userId: string;
}

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const initialValues = {
        username: '',
        password: '',
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
    });



    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogin = async (value: LoginInput) => {


        setIsLoading(true);
        dispatch(loginStart());
        try {
            const { data } = await baseApi.post(`api/v1/auth/signin`, {
                username: value.username,
                password: value.password,
            });

            toast.success("Đăng nhập thành công! Bạn sẽ chuyển đến trang chủ trong giây lát...", {
                onClose: () => {
                    setTimeout(() => {
                        router.replace('/logIn');
                    }, 2000);
                },
                autoClose: 1000,
            });

            const decodeToken = jwtDecode(data.token) as roleJwt;
            const expirationTime = Math.floor(Date.now() / 1000) + (20 * 60);
            localStorage.setItem('exp', expirationTime.toString());
            Cookies.set('token', data.token, { expires: 1 });
            Cookies.set('role', decodeToken?.role, { expires: 1 });
            Cookies.set('userId', decodeToken?.userId, { expires: 1 });

            switch (decodeToken?.role) {
                case ROLE.role1:
                    router.replace(`/`);
                    break;
                case ROLE.role2:
                    router.replace(`/shopOwner`);
                    break;
                case ROLE.role3:
                    router.replace(`/admin`);
                    break;
                default:
                    break;
            }
            localStorage.setItem("token", data.token);
        } catch (error) {
            toast.error("Đăng nhập không thành công! Bạn hãy kiểm tra lại tài khoản và mật khẩu của bạn.");
            if (error instanceof AxiosError) {
                const errorResponse = error?.response?.data?.error?.message;
                if (errorResponse in LoginError) {
                    const translatedError = LoginError[errorResponse as keyof typeof LoginError];
                    dispatch(loginFailure(translatedError));
                } else {
                    dispatch(loginFailure(errorResponse));
                }
            } else {
                dispatch(loginFailure("Đã có lỗi xảy ra"));
            }
        } finally {
            setIsLoading(false);

        }
    };

    return (
        <section className='h-screen relative'>
            <Button
                startContent={<FaArrowAltCircleLeft />}
                onClick={() => router.push('/')}
                className='bg-gradient-to-tr absolute m-5 from-pink-500 to-yellow-500 text-white shadow-lg'
            >
                Trở về trang chủ
            </Button>
            <div className='flex h-full flex-wrap items-center justify-between lg:justify-between'>
                <div className='mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-6/12'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        <Form>
                            <Card className='mx-auto w-3/5'>
                                <CardHeader className='space-y-1'>
                                    <p className='text-4xl font-bold  uppercase'>Đăng nhập</p>
                                </CardHeader>
                                <CardBody>
                                    <div className='space-y-4'>
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
                                        <div className='forgot-password text-right'>
                                            <Link href='/forgotPass' className='text-blue-500 hover:text-orange-600'>Quên Mật Khẩu?</Link>
                                        </div>
                                        <Button disabled={isLoading} type='submit' className='bg-gradient-to-tr w-full from-pink-500 to-yellow-500 text-white shadow-lg'>
                                            {isLoading ? <Spinner color="default" /> : 'Đăng nhập'}
                                        </Button>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    Bạn chưa có tài khoản phải không?
                                    <Link href='/signUp'>
                                        <span className='text-default-500 hover:text-orange-600'> Đăng ký ở đây </span>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Formik>
                </div>
                <div className='grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
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
