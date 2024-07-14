import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider, Textarea, Select, SelectItem } from "@nextui-org/react";
import { BookingDetail, createFeedbackInput } from "@/models/userModels";
import { useAppDispatch } from "@/lib/redux/store";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { createFeedback } from "@/lib/redux/slice/userSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateFeedback({ shopData }: { shopData: BookingDetail }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [feedbackData, setFedbackData] = useState<createFeedbackInput>({
        serviceId: parseInt(shopData.serviceId),
        ratingType: '',
        content: '',

    });
    const resetForm = () => {
        setFedbackData({
            serviceId: parseInt(shopData.serviceId),
            ratingType: '',
            content: '',
        });
        setValidationErrors([]);
    };

    const validateInput = () => {
        const errors: string[] = [];

        if (!feedbackData.ratingType) {
            errors.push("Vui lòng chọn đánh giá");
        }
        if (!feedbackData.content) {
            errors.push("Vui lòng nhập nội dung đánh giá");
        }

        return errors;
    };
    const dispatch = useAppDispatch();
    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setFedbackData(prevData => ({
            ...prevData,
            [fieldName]: newValue
        }));
    };
    const [userId, setUserId] = useState<string>('');
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
    }, [userId]);
    const handleCreate = async () => {
        const errors = validateInput();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            if (userId) {
                await dispatch(createFeedback({ feedbackData })).unwrap();
                toast.success("Đánh giá dịch vụ thành công!", {
                    onClose: onOpenChange,
                    autoClose: 1500,
                });
                resetForm();
            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error("Đã xảy ra lỗi khi tạo . Vui lòng thử lại sau!");
        }
    };
    console.log(feedbackData);
    return (
        <>
            <Button radius="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onPress={onOpen}>Đánh giá dịch vụ</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-3xl text-orange-600 font-bold uppercase bg-black">Đánh giá dịch vụ</ModalHeader>
                            <Divider />
                            <ModalBody
                                style={{
                                    backgroundImage: `url("https://i.pinimg.com/564x/13/2e/53/132e53913e121bd14ee6a51d6b55300d.jpg")`,
                                }}
                            >
                                <Select label="Đánh giá" className="w-[250px]"
                                    isInvalid={!!validationErrors.find(err => err.includes('Vui lòng chọn đánh giá'))}
                                    color={validationErrors.find(err => err.includes('Vui lòng chọn đánh giá')) ? "danger" : "default"}
                                    errorMessage={validationErrors.find(err => err.includes('Vui lòng chọn đánh giá'))}
                                    value={feedbackData.ratingType}
                                    onChange={(e) => handleInputChange('ratingType', e.target.value)}
                                >
                                    <SelectItem key="TOTALLY_BAD" value="TOTALLY_BAD">Rất tệ</SelectItem>
                                    <SelectItem key="PARTIALLY_BAD" value="PARTIALLY_BAD">Không được ổn</SelectItem>
                                    <SelectItem key="NORMAL" value="NORMAL">Nó ổn</SelectItem>
                                    <SelectItem key="QUITE_GOOD" value="QUITE_GOOD">Rất tuyệt vời</SelectItem>
                                    <SelectItem key="REALLY_GOOD" value="REALLY_GOOD">Cực kỳ tuyệt vời</SelectItem>
                                </Select>
                                <Textarea
                                    placeholder="Nhập đánh giá của bạn"
                                    value={feedbackData.content}
                                    isInvalid={!!validationErrors.find(err => err.includes('Vui lòng nhập nội dung đánh giá'))}
                                    color={validationErrors.find(err => err.includes('Vui lòng nhập nội dung đánh giá')) ? "danger" : "default"}
                                    errorMessage={validationErrors.find(err => err.includes('Vui lòng nhập nội dung đánh giá'))}
                                    onChange={(e) => handleInputChange('content', e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="w-1/2" onPress={onClose}>
                                    Huỷ
                                </Button>
                                <Button className="bg-gradient-to-tr w-1/2 from-pink-500 to-yellow-500 text-white shadow-lg " color="primary" onClick={handleCreate}>
                                    Gửi
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
