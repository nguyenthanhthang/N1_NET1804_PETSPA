import { useEffect, useState, useCallback } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input, Textarea, Tooltip } from "@nextui-org/react";
import { allServicePaginationData, createServiceInput } from "@/models/shopModel";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { MdChangeCircle } from "react-icons/md";
import { fetchAllServicePagination, updateService } from "@/lib/redux/slice/shopSlice";
import { useAppDispatch } from '@/lib/redux/store';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

export default function ModalUpdateServiceProps({ params, refetchPets }: { params: allServicePaginationData, refetchPets: () => void }) {
    const [userId, setUserId] = useState<string>('');
    const [service, setService] = useState<allServicePaginationData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const fetchUidAndServiceData = useCallback(async () => {
        try {
            const { uid } = await getAccessAndRefreshCookie();
            if (uid) {
                setUserId(uid);
                const response = await dispatch(fetchAllServicePagination());
                setService(response.payload || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUidAndServiceData();
    }, [fetchUidAndServiceData]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [serviceData, setServiceData] = useState<createServiceInput>({
        id: params.id,
        userId: userId,
        serviceName: params.serviceName,
        serviceCategoryId: params.categoryId,
        price: params.price,
        minWeight: params.minWeight,
        maxWeight: params.maxWeight,
        serviceDescription: params.serviceDescription,
        tags: params.tags,
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



    // console.log(serviceData)
    useEffect(() => {
        if (userId) {
            setServiceData(prevData => ({
                ...prevData,
                userId: userId,
            }));
        }
    }, [userId]);

    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setServiceData(prevData => ({
            ...prevData,
            [fieldName]: newValue
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
                await dispatch(updateService({ serviceData })).unwrap();
                toast.success("Cập nhật dịch vụ thành công!", {
                    onClose: () => {
                        onClose();
                        refetchPets();
                    },
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            toast.error("Đã xảy ra lỗi khi cập nhật dịch vụ. Vui lòng thử lại sau!");
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
        <>
            <Tooltip content="Chỉnh sửa dịch vụ">
                <Button variant="bordered" className='rounded-full' isIconOnly onPress={onOpen}>
                    <MdChangeCircle size={20} color="green" />
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={handleClose} size="2xl" backdrop="blur">
                <ModalContent>
                    <>
                        <ModalHeader
                            className='text-3xl flex justify-center font-bold uppercase text-white'
                            style={{
                                backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "cover",
                            }}
                        >Chỉnh sửa dịch vụ
                        </ModalHeader>
                        <ModalBody className="space-y-6">
                            <div className="mt-2 flex">
                                <div >
                                    <div className="flex w-full mb-4">
                                        <div className="mr-4">
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
                                                isInvalid={!!validationErrors.find(err => err.includes('Loại'))}
                                                color={validationErrors.find(err => err.includes('Loại')) ? "danger" : "default"}
                                                errorMessage={validationErrors.find(err => err.includes('Loại'))}
                                                value={serviceData.serviceCategoryId}
                                                label="Category"
                                                className="w-[300px]"
                                                defaultSelectedKeys={[serviceData.serviceCategoryId]}
                                                onChange={(e) => handleInputChange('serviceCategoryId', e.target.value)}
                                            >
                                                <SelectItem key="1" value="1">Dịch vụ tắm rửa</SelectItem>
                                                <SelectItem key="2" value="2">Dịch vụ làm đẹp</SelectItem>
                                                <SelectItem key="3" value="3">Dịch vụ mát xa</SelectItem>
                                                <SelectItem key="4" value="4">Dịch vụ mát xa đặc biệt</SelectItem>
                                                <SelectItem key="5" value="5">Khách sạn thú cưng</SelectItem>
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
                                                isInvalid={!!validationErrors.find(err => err.includes('Cân'))}
                                                color={validationErrors.find(err => err.includes('Cân')) ? "danger" : "default"}
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
                                            isInvalid={!!validationErrors.find(err => err.includes('Mô tả'))}
                                            color={validationErrors.find(err => err.includes('Mô tả')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Mô tả'))}
                                            value={serviceData.serviceDescription}
                                        />
                                    </div>
                                    <div className="flex w-full justify-around">
                                        <Button className="mr-3 w-full" onPress={handleClose}>Huỷ</Button>
                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
                                            disabled={isLoading}
                                            onPress={handleCreate}
                                        >
                                            {isLoading ? <ClipLoader size={20} color="#ffffff" /> : 'Cập nhật'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
