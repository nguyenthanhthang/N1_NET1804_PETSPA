import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, useDisclosure, Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { allServicePaginationData, createServiceInput } from "@/models/shopModel";
import { useAppDispatch } from "@/lib/redux/store";
import { createService, fetchAllServicePagination } from "@/lib/redux/slice/shopSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";



export default function ModalCreateService({ userId, refetchPets }: { userId: string, refetchPets: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [service, setService] = useState<allServicePaginationData[]>([]);
    useEffect(() => {
        if (userId) {
            setServiceData(prevData => ({
                ...prevData,
                userId: userId,
            }));
        }
    }, [userId]);

    useEffect(() => {
        fetchPets();
    }, [dispatch]);
    const fetchPets = async () => {
        const response = await dispatch(fetchAllServicePagination());
        setService(response.payload || []);
    };
    const [serviceData, setServiceData] = useState<createServiceInput>({
        userId: userId,
        id: '',
        serviceCategoryId: 0,
        serviceName: '',
        serviceDescription: '',
        price: 0,
        minWeight: 0,
        maxWeight: 0,
        tags: 'tags1',

    });

    const resetForm = () => {
        setServiceData({
            userId: userId,
            id: '',
            serviceCategoryId: 0,
            serviceName: '',
            serviceDescription: '',
            price: 0,
            minWeight: 0,
            maxWeight: 0,
            tags: 'tags1',
        });
        setValidationErrors([]);
    };

    const validateInput = () => {
        const errors = [];

        if (!serviceData.serviceName) {
            errors.push('Tên dịch vụ không được để trống');
        }
        if (serviceData.serviceName.length < 2 || serviceData.serviceName.length > 50) {
            errors.push('Tên dịch vụ phải lớn hơn 2 ký tự, không quá 50 ký tự ');
        }
        if (!serviceData.serviceCategoryId || serviceData.serviceCategoryId <= 0) {
            errors.push('Loại category phải chọn');
        }
        if (isNaN(serviceData.price) || serviceData.price <= 0) {
            errors.push('Giá phải là số và phải lớn hơn 0');
        }
        if (isNaN(serviceData.minWeight) || !serviceData.minWeight) {
            errors.push('Cân nặng nhỏ nhất không được để trống và phải là số');
        }
        if (!serviceData.maxWeight || isNaN(serviceData.maxWeight)) {
            errors.push('Cân nặng lớn nhất không được để trống và phải là số');
        }
        if (serviceData.minWeight <= 0 || serviceData.minWeight >= 200) {
            errors.push('Cân nặng nhỏ nhất phải lớn hơn 0 và phải bé hơn 200');
        }

        if (serviceData.maxWeight <= serviceData.minWeight || serviceData.maxWeight > 200) {
            errors.push('Cân nặng lớn nhất lớn hơn cân nặng nhỏ nhất và nhỏ hơn hoặc bằng 200');
        }
        return errors;
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
                await dispatch(createService({ serviceData })).unwrap();
                toast.success("Tạo dịch thành công!", {
                    onClose: () => {
                        onClose();
                        refetchPets();
                    },
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error("Đã xảy ra lỗi khi tạo dịch vụ. Vui lòng thử lại sau!");
        }
        finally {
            setIsLoading(false);
            resetForm();
        }
    };

    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setServiceData(prevData => ({
            ...prevData,
            [fieldName]: newValue
        }));
    };
    const handleClose = () => {
        resetForm();
        onClose();
    };
    return (
        <>
            <Button
                startContent={<FaPlus className='w-5 x' />}
                onPress={onOpen}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
                Tạo mới dịch vụ
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose} size="2xl" backdrop="blur">
                <ModalContent>
                    <ModalHeader
                        className='text-3xl flex justify-center font-bold uppercase text-white'
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >Tạo mới dịch vụ
                    </ModalHeader>
                    <ModalBody className="space-y-6">
                        <div className="mt-2 flex">
                            <div>
                                <div className="flex w-full mb-4">
                                    <div className="mr-4 ">

                                        <Input
                                            className="w-[300px]"
                                            onChange={(e) => handleInputChange('serviceName', e.target.value)}
                                            isInvalid={!!validationErrors.find(err => err.includes('Tên dịch vụ'))}
                                            color={validationErrors.find(err => err.includes('Tên dịch vụ')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Tên dịch vụ'))}
                                            label="Tên dịch vụ"
                                            value={serviceData.serviceName}
                                        />

                                    </div>
                                    <div className="ml-4">
                                        <Select
                                            label="Category"
                                            isInvalid={!!validationErrors.find(err => err.includes('Loại'))}
                                            color={validationErrors.find(err => err.includes('Loại')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Loại'))}
                                            value={serviceData.serviceCategoryId}
                                            className="w-[300px]"
                                            onChange={(e) => handleInputChange('serviceCategoryId', e.target.value)}
                                        >
                                            <SelectItem key="1" value="1">
                                                Dịch vụ tắm rửa
                                            </SelectItem>
                                            <SelectItem key="2" value="2">
                                                Dịch vụ làm đẹp
                                            </SelectItem>
                                            <SelectItem key="3" value="3">
                                                Dịch vụ mát xa
                                            </SelectItem>
                                            <SelectItem key="4" value="4">
                                                Dịch vụ mát xa đặc biệt
                                            </SelectItem>
                                            <SelectItem key="5" value="5">
                                                Khách sạn thú cưng
                                            </SelectItem>

                                        </Select>

                                    </div>
                                </div>

                                <div className="flex w-full mb-4">

                                    <div >
                                        <Input
                                            isInvalid={!!validationErrors.find(err => err.includes('Giá'))}
                                            color={validationErrors.find(err => err.includes('Giá')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Giá'))}
                                            value={serviceData.price.toString()}
                                            className="w-[300px]"
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                            label="Giá dịch vụ"
                                            type="number"
                                        />

                                    </div>
                                </div>
                                <div className="flex w-full mb-4">
                                    <div className="mr-4">
                                        <Input
                                            className="w-[300px]"
                                            isInvalid={!!validationErrors.find(err => err.includes('Cân nặng nhỏ nhất'))}
                                            color={validationErrors.find(err => err.includes('Cân nặng nhỏ nhất')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Cân nặng nhỏ nhất'))}
                                            value={serviceData.minWeight.toString()}
                                            onChange={(e) => handleInputChange('minWeight', e.target.value)}
                                            label="Cân nặng nhỏ nhất"
                                        />

                                    </div>
                                    <div className="ml-4">
                                        <Input
                                            className="w-[300px]"
                                            onChange={(e) => handleInputChange('maxWeight', e.target.value)}
                                            label="Cân nặng lớn nhất"
                                            isInvalid={!!validationErrors.find(err => err.includes('Cân nặng lớn nhất'))}
                                            color={validationErrors.find(err => err.includes('Cân nặng lớn nhất')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Cân nặng lớn nhất'))}
                                            value={serviceData.maxWeight.toString()}
                                        />

                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Textarea
                                        onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                                        placeholder="Mô tả dịch vụ"
                                        className="w-full"

                                    />
                                </div>
                                <div className="flex justify-around">
                                    <Button
                                        onClick={handleClose}
                                        className="w-[200px]"
                                    >
                                        Đóng
                                    </Button>
                                    <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[200px]" onPress={handleCreate} disabled={isLoading}>
                                        {isLoading ? <Spinner color="default" /> : "Tạo mới"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
                <ToastContainer />
            </Modal>
        </>
    );
}
