import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea, TimeInputValue, useDisclosure } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/lib/redux/store';
import { createShopInfor } from '@/lib/redux/slice/shopSlice';
import { ShopInput } from '@/models/shopModel';
import { FaPlus } from 'react-icons/fa';
import { TimeInput } from "@nextui-org/react";

export default function CreateShop({ userId, onCreate }: { userId: string, onCreate: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [shopData, setShopData] = useState<ShopInput>({
        id: '',
        shopName: '',
        shopAddress: '',
        shopPhone: '',
        area: '',
        shopDescription: '',
        openTime: '',
        closeTime: '',
        isAvailable: true,
        shopEmail: '',
        shopTitle: '',
    });
    const resetForm = () => {
        setShopData({
            id: '',
            shopName: '',
            shopAddress: '',
            shopPhone: '',
            area: '',
            shopDescription: '',
            openTime: '',
            closeTime: '',
            isAvailable: true,
            shopEmail: '',
            shopTitle: '',
        });
        setValidationErrors([]);
    };
    const validateInput = () => {
        const errors = [];

        if (!shopData.shopName) {
            errors.push('Tên shop không được để trống');
        }
        if (shopData.shopName.length > 30 || shopData.shopName.length < 2) {
            errors.push('Tên shop không quá 30 ký tự và phải lớn hơn 2 ký tự');
        }
        if (!shopData.shopTitle) {
            errors.push('Tiêu đề không được để trống');
        }
        if (shopData.shopTitle.length > 100 || shopData.shopTitle.length < 10) {
            errors.push('Tiêu đề không quá 100 ký tự và lớn hơn 10 kí tự');
        }
        if (!shopData.shopAddress) {
            errors.push('Địa chỉ không được để trống');
        }
        if (shopData.shopAddress.length > 100 || shopData.shopAddress.length < 5) {
            errors.push('Địa chỉ không quá 100 ký tự và lớn hơn 5 kí tự');
        }
        if (!shopData.area) {
            errors.push('Khu vực không được để trống');
        }
        if (shopData.area.length < 5 || shopData.area.length > 50) {
            errors.push('Khu vực không quá 50 ký tự và lớn hơn 5 kí tự');
        }
        if (!shopData.shopEmail || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(shopData.shopEmail)) {
            errors.push('Email không hợp lệ');
        }
        if (!shopData.shopPhone ||  !/^0\d{9}$/.test(shopData.shopPhone)) {
            errors.push('Số điện thoại phải là số và có đúng 10 chữ số và phải bắt đầu bằng số 0');
        }
        if (!shopData.openTime) {
            errors.push('Giờ mở cửa không được để trống');
        } else {
            const [openHour, openMinute] = shopData.openTime.split(':').map(Number);
            if (openHour < 0 || openHour > 23 || openMinute < 0 || openMinute > 59) {
                errors.push('Giờ mở cửa không hợp lệ');
            }
        }

        if (!shopData.closeTime) {
            errors.push('Giờ đóng cửa không được để trống');
        } else {
            const [closeHour, closeMinute] = shopData.closeTime.split(':').map(Number);
            if (closeHour < 0 || closeHour > 23 || closeMinute < 0 || closeMinute > 59) {
                errors.push('Giờ đóng cửa không hợp lệ');
            }
        }

        if (shopData.openTime && shopData.closeTime) {
            const [openHour, openMinute] = shopData.openTime.split(':').map(Number);
            const [closeHour, closeMinute] = shopData.closeTime.split(':').map(Number);

            if (openHour > closeHour || (openHour === closeHour && openMinute >= closeMinute)) {
                errors.push('Giờ mở cửa phải bé hơn giờ đóng cửa');
            }
        }

        return errors;
    };

    useEffect(() => {
        if (userId) {
            setShopData(prevData => ({
                ...prevData,
                userId: userId,
            }));
        }
    }, [userId]);

    const dispatch = useAppDispatch();

    const handleInputChange = (fieldName: string, newValue: string) => {
        setShopData(prevData => ({
            ...prevData,
            [fieldName]: newValue
        }));
    };

    const handleOpenTimeChange = (time: TimeInputValue) => {
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
        setShopData(prevData => ({
            ...prevData,
            openTime: formattedTime,
        }));
    };

    const handleCloseTimeChange = (time: TimeInputValue) => {
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
        setShopData(prevData => ({
            ...prevData,
            closeTime: formattedTime,
        }));
    };

    const handleCreate = async () => {
        const errors = validateInput();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            setIsLoading(true);
            if (userId) {
                await dispatch(createShopInfor({ shopData })).unwrap();
                toast.success("Tạo shop thành công!", {
                    onClose: () => {
                        onClose();
                        onCreate();
                    },
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Error creating shop:', error);
            toast.error("Đã xảy ra lỗi khi tạo shop. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
            resetForm();
        }
    };
    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <div>
            <Button
                startContent={<FaPlus className='w-5' />}
                onPress={onOpen}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
                Đăng ký thông tin Shop
            </Button>

            <Modal size='xl' isOpen={isOpen} onClose={handleClose} placement="top-center">
                <ModalContent>
                    <ModalHeader
                        className='text-3xl flex justify-center font-bold uppercase text-white'
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >Đăng ký thông tin Shop
                    </ModalHeader>
                    <ModalBody
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/32/9e/2f/329e2f6a54fdb1f53f4126991fcc6143.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="mt-2 flex">
                            <div>
                                <div className="flex w-full mb-4">
                                    <div className="mr-4">
                                        <Input
                                            type="text"
                                            onChange={(e) => handleInputChange('shopName', e.target.value)}
                                            label="Tên shop"
                                            className="w-[250px]"
                                            value={shopData.shopName}
                                            isInvalid={!!validationErrors.find(err => err.includes('Tên'))}
                                            color={validationErrors.find(err => err.includes('Tên')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Tên'))}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <Input
                                            type="text"
                                            onChange={(e) => handleInputChange('area', e.target.value)}
                                            label="Khu vực"
                                            className="w-[250px]"
                                            value={shopData.area}
                                            isInvalid={!!validationErrors.find(err => err.includes('Khu'))}
                                            color={validationErrors.find(err => err.includes('Khu')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Khu vực'))}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mb-4">
                                    <div className="mr-4">
                                        <Input
                                            type="email"
                                            onChange={(e) => handleInputChange('shopEmail', e.target.value)}
                                            label="Email"
                                            className="w-[250px]"
                                            value={shopData.shopEmail}
                                            isInvalid={!!validationErrors.find(err => err.includes('Email'))}
                                            color={validationErrors.find(err => err.includes('Email')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Email'))}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <Input
                                            type="text"
                                            onChange={(e) => handleInputChange('shopPhone', e.target.value)}
                                            label="Số điện thoại"
                                            className="w-[250px]"
                                            value={shopData.shopPhone}
                                            isInvalid={!!validationErrors.find(err => err.includes('Số'))}
                                            color={validationErrors.find(err => err.includes('Số')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Số'))}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mb-4">
                                    <div className="mr-4">
                                        <TimeInput
                                            label="Giờ mở cửa"
                                            onChange={handleOpenTimeChange}
                                            hourCycle={24}
                                            className="w-[250px]"
                                            isInvalid={!!validationErrors.find(err => err.includes('Giờ mở cửa'))}
                                            color={validationErrors.find(err => err.includes('Giờ mở cửa')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Giờ mở cửa'))}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <TimeInput
                                            label="Giờ đóng cửa"
                                            onChange={handleCloseTimeChange}
                                            hourCycle={24}
                                            className="w-[250px]"
                                            isInvalid={!!validationErrors.find(err => err.includes('Giờ đóng cửa'))}
                                            color={validationErrors.find(err => err.includes('Giờ đóng cửa')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Giờ đóng cửa'))}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Input
                                        type="text"
                                        onChange={(e) => handleInputChange('shopTitle', e.target.value)}
                                        label="Tiêu đề"
                                        className="w-full"
                                        value={shopData.shopTitle}
                                        isInvalid={!!validationErrors.find(err => err.includes('Tiêu đề'))}
                                        color={validationErrors.find(err => err.includes('Tiêu đề')) ? "danger" : "default"}
                                        errorMessage={validationErrors.find(err => err.includes('Tiêu đề'))}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        type="text"
                                        onChange={(e) => handleInputChange('shopAddress', e.target.value)}
                                        label="Địa chỉ"
                                        value={shopData.shopAddress}
                                        isInvalid={!!validationErrors.find(err => err.includes('Địa chỉ'))}
                                        color={validationErrors.find(err => err.includes('Địa chỉ')) ? "danger" : "default"}
                                        errorMessage={validationErrors.find(err => err.includes('Địa chỉ'))}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Textarea
                                        type="text"
                                        onChange={(e) => handleInputChange('shopDescription', e.target.value)}
                                        label="Mô tả"
                                        className="w-full"
                                        value={shopData.shopDescription}
                                    // isInvalid={!!validationErrors.find(err => err.includes('Mô tả'))}
                                    // color={validationErrors.find(err => err.includes('Mô tả')) ? "danger" : "default"}
                                    // errorMessage={validationErrors.find(err => err.includes('Mô tả'))}
                                    />
                                </div>
                                <div className='flex justify-around'>
                                    <Button className=' w-[200px]' onPress={handleClose}>Đóng</Button>
                                    <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[200px]" onPress={handleCreate} disabled={isLoading}>
                                        {isLoading ? <Spinner color="default" /> : "Tạo mới"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
}


