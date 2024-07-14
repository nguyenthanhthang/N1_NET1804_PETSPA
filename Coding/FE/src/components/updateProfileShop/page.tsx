"use client"
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, TimeInput, Textarea, Divider, TimeInputValue } from "@nextui-org/react";
import { ShopInput, shopInfor } from "@/models/shopModel";
import { useAppDispatch } from "@/lib/redux/store";
import { updateShopInfor } from "@/lib/redux/slice/shopSlice";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProfileShop({ params, onUpdate }: { params: shopInfor, onUpdate: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [originalShopData, setOriginalShopData] = useState<ShopInput>(params);
    const [shopData, setShopData] = useState<ShopInput>(params);
    const [userId, setUserId] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
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
            errors.push('Số điện thoại phải là số và có đúng 10 chữ số và bắt đầu bằng số 0');
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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setShopData(originalShopData);
    };

    const handleUpdate = async () => {
        const errors = validateInput();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        try {
            setIsLoading(true);
            if (userId) {
                await dispatch(updateShopInfor({ shopData })).unwrap();
                toast.success("Cập nhật thông tin shop thành công!", {
                    onClose: onOpenChange,
                    autoClose: 1500,
                });
                onUpdate(); // Fetch data again after updating
                setOriginalShopData(shopData); // Update the original data to reflect changes
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating shop:', error);
            toast.error("Đã xảy ra lỗi khi cập nhật thông tin shop. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onPress={handleEditClick} >Chỉnh sửa thông tin</Button>
            <Modal size="2xl" isOpen={isEditing} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-bold text-orange-700 uppercase ">chỉnh sửa thông tin</ModalHeader>
                            <Divider />

                            <ModalBody className="flex justify-center">
                                <div className="my-2 flex justify-center">
                                    <div>
                                        <div className="flex w-full mb-4">
                                            <div className="mr-4">
                                                <Input
                                                    type="text"
                                                    defaultValue={shopData.shopName}
                                                    onChange={(e) => handleInputChange('shopName', e.target.value)}
                                                    label="Tên shop"
                                                    isInvalid={!!validationErrors.find(err => err.includes('Tên shop'))}
                                                    color={validationErrors.find(err => err.includes('Tên shop')) ? "danger" : "default"}
                                                    errorMessage={validationErrors.find(err => err.includes('Tên shop'))}
                                                    className="w-[250px]"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <Input
                                                    type="text"
                                                    defaultValue={shopData.shopTitle}
                                                    label="Tiêu đề"
                                                    isInvalid={!!validationErrors.find(err => err.includes('Tiêu đề'))}
                                                    color={validationErrors.find(err => err.includes('Tiêu đề')) ? "danger" : "default"}
                                                    errorMessage={validationErrors.find(err => err.includes('Tiêu đề'))}
                                                    onChange={(e) => handleInputChange('shopTitle', e.target.value)}
                                                    className="w-[250px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full mb-4">
                                            <div className="mr-4">
                                                <Input
                                                    type="text"
                                                    defaultValue={shopData.shopAddress}
                                                    label="Địa chỉ"
                                                    onChange={(e) => handleInputChange('shopAddress', e.target.value)}
                                                    className="w-[250px]"
                                                    isInvalid={!!validationErrors.find(err => err.includes('Địa chỉ'))}
                                                    color={validationErrors.find(err => err.includes('Địa chỉ')) ? "danger" : "default"}
                                                    errorMessage={validationErrors.find(err => err.includes('Địa chỉ'))}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <Input
                                                    type="text"
                                                    defaultValue={shopData.area}
                                                    label="Khu vực"
                                                    onChange={(e) => handleInputChange('area', e.target.value)}
                                                    className="w-[250px]"
                                                    isInvalid={!!validationErrors.find(err => err.includes('Khu vực'))}
                                                    color={validationErrors.find(err => err.includes('Khu vực')) ? "danger" : "default"}
                                                    errorMessage={validationErrors.find(err => err.includes('Khu vực'))}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full mb-4">
                                            <div className="mr-4">
                                                <Input
                                                    type="email"
                                                    defaultValue={shopData.shopEmail}
                                                    onChange={(e) => handleInputChange('shopEmail', e.target.value)}
                                                    label="Email"
                                                    className="w-[250px]"
                                                    isInvalid={!!validationErrors.find(err => err.includes('Email'))}
                                                    color={validationErrors.find(err => err.includes('Email')) ? "danger" : "default"}
                                                    errorMessage={validationErrors.find(err => err.includes('Email'))}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <Input
                                                    type="number"
                                                    defaultValue={shopData.shopPhone}
                                                    onChange={(e) => handleInputChange('shopPhone', e.target.value)}
                                                    label="Số điện thoại"
                                                    isInvalid={!!validationErrors.find(err => err.includes('Số điện thoại'))}
                                                    color={validationErrors.find(err => err.includes('Số điện thoại')) ? "danger" : "default"}
                                                    errorMessage={validationErrors.find(err => err.includes('Số điện thoại'))}
                                                    className="w-[250px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full mb-4">
                                            <div className="mr-4">
                                                <TimeInput
                                                    label="Giờ mở cửa"
                                                    onChange={handleOpenTimeChange}
                                                    hourCycle={24}
                                                    // defaultValue={shopData?.openTime}
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
                                        <div className="flex w-full ">
                                            <div className="w-full">
                                                <Textarea
                                                    type="text"
                                                    defaultValue={shopData.shopDescription}
                                                    onChange={(e) => handleInputChange('shopDescription', e.target.value)}
                                                    label="Mô tả"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>

                            <Divider />
                            <ModalFooter className="flex justify-around">
                                <Button className="w-1/2" onPress={handleCancelClick}>
                                    Huỷ
                                </Button>
                                <Button className="w-1/2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius="lg" onClick={handleUpdate}>
                                    Xác nhận
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
                <ToastContainer />
            </Modal >
        </>
    );
}
