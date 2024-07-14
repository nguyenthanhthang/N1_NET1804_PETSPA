import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Divider,
    Select,
    SelectItem,
    Input
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { CreateShopTimeSlotInput } from "@/models/shopModel";
import { useAppDispatch } from "@/lib/redux/store";
import { createShopTimeSlot, getShopIdbyTime } from "@/lib/redux/slice/shopSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";
import Cookies from 'js-cookie'; // Import js-cookie

export default function CreateShopTimeSlot({ refetchTimes }: { refetchTimes: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [timeSlotData, setTimeSlot] = useState<CreateShopTimeSlotInput>({
        shopId: '',
        timeSlotId: '',
        description: '',
        totalSlot: '',
    });
    const resetForm = () => {
        setTimeSlot({
            shopId: '',
            timeSlotId: '',
            description: '',
            totalSlot: '',
        });
        setValidationErrors([]);
    };
    const validateInput = () => {
        const errors: string[] = [];

        if (!timeSlotData.timeSlotId) {
            errors.push('Khung giờ không được để trống');
        }
        if (!timeSlotData.totalSlot || parseInt(timeSlotData.totalSlot) <= 0) {
            errors.push('Slot tối đa phải lớn hơn 0');
        }
        if (!timeSlotData.description) {
            errors.push('Mô tả không được để trống');
        }
        if (timeSlotData.description.length > 100) {
            errors.push('Mô tả không quá 100 ký tự');
        }

        return errors;
    };
    const dispatch = useAppDispatch();
    const [checkShopId, setShopId] = useState<string>('');
    useEffect(() => {
        const fetchShopId = async () => {
            const response = await dispatch(getShopIdbyTime()).unwrap();
            setShopId(response || '');
        }
        fetchShopId();
    }, [dispatch]);

    useEffect(() => {
        setTimeSlot(prevData => ({
            ...prevData,
            shopId: checkShopId,
        }));
    }, [checkShopId]);

    const handleInputChange = (fieldName: string, newValue: string) => {
        setTimeSlot(prevData => ({
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

        setIsLoading(true);
        try {
            await dispatch(createShopTimeSlot({ timeSlotData })).unwrap();
            toast.success("Tạo khung giờ thành công!", {
                onClose: () => {
                    onOpenChange();
                    refetchTimes();
                },
                autoClose: 1500,
            });
        } catch (error) {
            console.error('Error creating shop:', error);
            toast.error("Đã xảy ra lỗi khi tạo khung giờ. Vui lòng thử lại sau!");
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
            <Button
                startContent={<FaPlus className='w-5' />}
                onPress={onOpen}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
                Tạo mới khung giờ
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-3xl text-orange-600 font-bold uppercase bg-black">Tạo mới khung giờ</ModalHeader>
                            <Divider />
                            <ModalBody
                                style={{
                                    backgroundImage: `url("https://i.pinimg.com/564x/13/2e/53/132e53913e121bd14ee6a51d6b55300d.jpg")`,
                                }}
                            >
                                <Select
                                    label="Chọn khung giờ"
                                    className="w-full"
                                    value={timeSlotData.timeSlotId}
                                    isInvalid={!!validationErrors.find(err => err.includes('Khung giờ'))}
                                    errorMessage={validationErrors.find(err => err.includes('Khung giờ'))}
                                    onChange={(e) => handleInputChange('timeSlotId', e.target.value)}
                                >
                                    <SelectItem key="1" value="1">09:00 - 10:30</SelectItem>
                                    <SelectItem key="2" value="2">13:00 - 14:00</SelectItem>
                                    <SelectItem key="3" value="3">17:00 - 18:00</SelectItem>

                                </Select>
                                <Input
                                    onChange={(e) => handleInputChange('totalSlot', e.target.value)}
                                    placeholder="Slot tối đa"
                                    type="number"
                                    size="lg"
                                    isInvalid={!!validationErrors.find(err => err.includes('Slot tối đa'))}
                                    errorMessage={validationErrors.find(err => err.includes('Slot tối đa'))}
                                />
                                <Input
                                    placeholder="Mô tả"
                                    size="lg"
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    isInvalid={!!validationErrors.find(err => err.includes('Mô tả'))}
                                    errorMessage={validationErrors.find(err => err.includes('Mô tả'))}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="w-1/2" onPress={handleClose}>
                                    Huỷ
                                </Button>
                                <Button
                                    type="button"
                                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
                                    disabled={isLoading}
                                    onPress={handleCreate}
                                >
                                    {isLoading ? (
                                        <ClipLoader size={20} color="#ffffff" />
                                    ) : (
                                        'Tạo mới'
                                    )}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
                <ToastContainer />
            </Modal>
        </>
    );
}