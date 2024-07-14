import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import { CancelBookingInput } from "@/models/userModels";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchOrderBooking, postCancelBooking } from "@/lib/redux/slice/userSlice";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CancelBooking({ params }: { params: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [cancelData, setCancelData] = useState<CancelBookingInput>({
        bookingId: parseInt(params),
        additionalMessage: "",

    });
    const resetForm = () => {
        setCancelData({
            bookingId: parseInt(params),
            additionalMessage: "",
        });
        setValidationErrors([]);
    };

    const validateInput = () => {
        const errors: string[] = [];

   
        if (!cancelData.additionalMessage || cancelData.additionalMessage.length > 255) {
            errors.push('Tin nhắn lý do không được để trống và không quá 255 ký tự');
        }

        return errors;
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
    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setCancelData(prevData => ({
            ...prevData,
            [fieldName]: newValue
        }));
    };

    const fetchBookingDetail = async () => {
        try {
            const response = await dispatch(fetchOrderBooking({ slug: params }));
            if (response.payload) {

                setCancelData(response.payload);
            }
        } catch (error) {
            console.error('Error fetching booking detail:', error);
        }
    };
    const dispatch = useAppDispatch();
    const handleCancel = async () => {
        const errors = validateInput();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        try {
            if (userId) {
                await dispatch(postCancelBooking({ cancelData })).unwrap();
                toast.success("Huỷ đặt lịch thành công!", {
                    onClose: onOpenChange,

                    autoClose: 1500,
                });
                resetForm(),
                    fetchBookingDetail();
            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error("Đã xảy ra lỗi khi huỷ đặt lịch!. Vui lòng thử lại sau!");
        }
    };
    return (
        <>
            <Button className="bg-gradient-to-tr from-pink-500 to-red-500 text-white shadow-lg w-full gap-5" onPress={onOpen}>
               Hủy dịch vụ
            </Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="lg"
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex bg-black text-center flex-col gap-1 text-3xl text-orange-500">Bạn có chắc là muốn huỷ hay không?</ModalHeader>
                    <ModalBody>
                        <Textarea
                            className="w-full mt-2"
                            value={cancelData.additionalMessage}
                            isInvalid={!!validationErrors.find(err => err.includes('lý do'))}
                            color={validationErrors.find(err => err.includes('lý do')) ? "danger" : "default"}
                            errorMessage={validationErrors.find(err => err.includes('lý do'))}
                            placeholder="Vui lòng cho chúng tôi biết lí do bạn huỷ"
                            onChange={(e) => handleInputChange('additionalMessage', e.target.value)}
                        >

                        </Textarea>
                    </ModalBody>
                    <ModalFooter className="w-full flex">
                        <Button className="w-1/2" radius="lg" onPress={onOpenChange}>
                            Huỷ
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-tr w-1/2 from-pink-500 to-yellow-500 text-white shadow-lg" color="primary" onClick={handleCancel}>
                            Xác nhận
                        </Button>
                    </ModalFooter>
                </ModalContent>
                <ToastContainer />
            </Modal>

        </>
    );
}