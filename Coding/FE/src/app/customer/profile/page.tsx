"use client"
import { fetchUserInforPagination, patchUpdateProfile } from '@/lib/redux/slice/userSlice';
import { useAppDispatch } from '@/lib/redux/store';
import { UserInfor, updateProfileInput } from '@/models/userModels';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, FormikHelpers, FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';



const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    return message ? <div className="text-red-500 text-sm mt-1">{message}</div> : null;
};

const Profile: React.FC = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Tên Họ là bắt buộc')
            .min(2, 'Tên Họ phải có ít nhất 2 ký tự')
            .max(20, 'Tên Họ không được vượt quá 20 ký tự')
            .matches(/^[a-zA-Z]+$/, 'Tên Họ không được chứa số hoặc kí tự đặc biệt'),
        lastName: Yup.string()
            .required('Tên Họ là bắt buộc')
            .min(2, 'Tên của bạn phải có ít nhất 2 ký tự')
            .max(20, 'Tên của bạn không được vượt quá 20 ký tự')
            .matches(/^[a-zA-Z]+$/, 'Tên của bạn không được chứa số hoặc kí tự đặc biệt'),
        email: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Email là bắt buộc'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
            .matches(/^(0[0-9]{9})$/, 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 số')
            .required('Số điện thoại là bắt buộc')
    });

    const dispatch = useAppDispatch();
    const [userId, setUserId] = useState<string>('');
    const [items, setItems] = useState<UserInfor | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUid = async () => {
            try {
                const { uid } = await getAccessAndRefreshCookie();
                if (uid) {
                    setUserId(uid);
                }
            } catch (error) {
                console.error('Error fetching UID:', error);
            }
        };
        fetchUid();
    }, []);

    useEffect(() => {
        const fetchUserInformation = async () => {
            if (userId) {
                try {
                    const response = await dispatch(fetchUserInforPagination());
                    const userInfo = response.payload;
                    setItems(userInfo);
                } catch (error) {
                    console.error('Error fetching user information:', error);
                }
            }
        };

        fetchUserInformation();
    }, [dispatch, userId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setServerError(null);
    };

    const handleUpdate = async (values: updateProfileInput, { setSubmitting }: FormikHelpers<updateProfileInput>) => {
        try {
            if (userId) {
                const updateData: updateProfileInput = {
                    id: userId,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                };

                await dispatch(patchUpdateProfile({ profileData: updateData })).unwrap();
                toast.success("Cập nhật thông tin thành công!", {
                    autoClose: 1500,
                });
                setIsEditing(false);
                setItems(prevItems => {
                    if (prevItems === null) return null;
                    return {
                        ...prevItems,
                        firstName: updateData.firstName ?? prevItems.firstName,
                        lastName: updateData.lastName ?? prevItems.lastName,
                        email: updateData.email ?? prevItems.email,
                        phone: updateData.phone ?? prevItems.phone,
                    };
                });
            }
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            setServerError("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau!");
        } finally {
            setSubmitting(false);
        }
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
            <div className='container relative'>
                <div className='justify-center flex items-center'>
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
                </div>
                <div className='justify-center flex items-center mt-2'>
                    <h1 className='text-2xl font-bold uppercase mr-2'>{items?.firstName || ''}</h1>
                    <h1 className='text-2xl font-bold uppercase'>{items?.lastName || ''}</h1>
                </div>
                <div className='flex justify-end'>
                    <div className='absolute mt-2'>
                        {!isEditing && (
                            <Button onClick={handleEditClick} startContent={<BiEdit className="h-4 w-4" />}>
                                Chỉnh sửa
                            </Button>
                        )}
                    </div>
                </div>
                <Divider />
                <div className='container mt-4 flex justify-center'>
                    <Card className='w-[550px] p-4'
                        style={{
                            backgroundImage: 'url(https://i.pinimg.com/564x/a6/b0/89/a6b0891684b7e9d0ddc6262191ff340c.jpg)',
                            backgroundSize: 'top',
                        }}>
                        <CardHeader className='w-full flex justify-center text-center'>
                            <div>
                                <p className='text-3xl text-white uppercase font-bold'>Tài Khoản</p>
                                <p className='text-white'>
                                    Thực hiện thay đổi cho tài khoản của bạn tại đây.
                                </p>
                            </div>
                        </CardHeader>
                        <Formik<updateProfileInput>
                            initialValues={{
                                id: userId,
                                firstName: items?.firstName || '',
                                lastName: items?.lastName || '',
                                email: items?.email || '',
                                phone: items?.phone || 0,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleUpdate}
                            enableReinitialize
                        >
                            {({ isSubmitting, errors, touched, setFieldValue }) => (
                                <Form>
                                    <CardBody className="space-y-2">
                                        <div className="space-y-1">
                                            <p className='text-white'>Họ</p>
                                            <Field name="firstName">
                                                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<updateProfileInput> }) => (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            id="firstName"
                                                            disabled={!isEditing}
                                                        />
                                                        <ErrorMessage message={form.touched.firstName && form.errors.firstName ? form.errors.firstName as string : undefined} />
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="space-y-1">
                                            <p className='text-white'>Tên</p>
                                            <Field name="lastName">
                                                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<updateProfileInput> }) => (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            id="lastName"
                                                            disabled={!isEditing}
                                                        />
                                                        <ErrorMessage message={form.touched.lastName && form.errors.lastName ? form.errors.lastName as string : undefined} />
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="space-y-1">
                                            <p className='text-white'>Email</p>
                                            <Field name="email">
                                                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<updateProfileInput> }) => (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            id="email"
                                                            disabled={!isEditing}
                                                        />
                                                        <ErrorMessage message={form.touched.email && form.errors.email ? form.errors.email as string : undefined} />
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="space-y-1">
                                            <p className='text-white'>Số điện thoại</p>
                                            <Field name="phone">
                                                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<updateProfileInput> }) => (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            id="phone"
                                                            disabled={!isEditing}
                                                        />
                                                        <ErrorMessage message={form.touched.phone && form.errors.phone ? form.errors.phone as string : undefined} />
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                    </CardBody>
                                    {isEditing && (
                                        <CardFooter>
                                            <Button
                                                color="success"
                                                type="submit"
                                                disabled={isSubmitting || Object.keys(errors).length > 0}
                                            >
                                                {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                                            </Button>
                                            <Button
                                                className="ml-5"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFieldValue('firstName', items?.firstName || '');
                                                    setFieldValue('lastName', items?.lastName || '');
                                                    setFieldValue('email', items?.email || '');
                                                    setFieldValue('phone', items?.phone?.toString() || '');
                                                }}
                                                disabled={isSubmitting}
                                            >
                                                Huỷ
                                            </Button>
                                        </CardFooter>
                                    )}
                                    {serverError && <div className="text-red-500 mt-4">{serverError}</div>}
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
