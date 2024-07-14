import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider, Select, SelectItem } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNomiationInput } from "@/models/userModels";
import { useAppDispatch } from "@/lib/redux/store";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { createNomination } from "@/lib/redux/slice/userSlice";

export default function CreateNomiation({ shopData, refreshData }: { shopData: string, refreshData: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [nominationData, setNominationData] = useState<createNomiationInput>({
        shopId: parseInt(shopData),
        nominationType: '',
    });

    const resetForm = () => {
        setNominationData({
            shopId: parseInt(shopData),
            nominationType: '',
        });
        setValidationErrors([]);
    };

    const validateInput = () => {
        const errors = [];
        if (!nominationData.nominationType) {
            errors.push('Vui lòng chọn loại đánh giá');
        }

        return errors;
    };

    const dispatch = useAppDispatch();

    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setNominationData(prevData => ({
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
                await dispatch(createNomination({ nominationData })).unwrap();
                toast.success("Đánh giá shop thành công!", {
                    onClose: () => onClose(),
                    autoClose: 1500,
                });
                refreshData();
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi đánh giá shop. Vui lòng thử lại sau!");
        } finally {
            resetForm();
        }
    };

    return (
        <>
            <Button radius="lg" className="bg-gradient-to-tr w-full from-pink-500 to-yellow-500 text-white shadow-lg" onPress={onOpen}>Đánh giá shop</Button>
            <Modal isOpen={isOpen} onOpenChange={onClose}>
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-3xl text-orange-600 font-bold uppercase bg-black">Đánh giá Shop</ModalHeader>
                            <Divider />
                            <ModalBody
                                style={{
                                    backgroundImage: `url("https://i.pinimg.com/564x/13/2e/53/132e53913e121bd14ee6a51d6b55300d.jpg")`,
                                }}
                            >
                                <Select
                                    label="Đánh giá"
                                    className="w-[400px]"
                                    isInvalid={validationErrors.includes('Vui lòng chọn loại đánh giá')}
                                    errorMessage={validationErrors.includes('Vui lòng chọn loại đánh giá') ? 'Vui lòng chọn loại đánh giá' : undefined}
                                    value={nominationData.nominationType}
                                    onChange={(e) => handleInputChange('nominationType', e.target.value)}
                                >
                                    <SelectItem key="0" value="0">TỆ</SelectItem>
                                    <SelectItem key="1" value="1">TẠM ỔN</SelectItem>
                                    <SelectItem key="2" value="2">ỔN</SelectItem>
                                    <SelectItem key="3" value="3">TUYỆT VỜI</SelectItem>
                                </Select>
                                {validationErrors.length > 0 && (
                                    <div className="text-red-500 mt-2">
                                        {validationErrors.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button className="w-1/2" onPress={handleClose}>
                                    Huỷ
                                </Button>
                                <Button onClick={handleCreate}
                                    className="bg-gradient-to-tr w-1/2 from-pink-500 to-yellow-500 text-white shadow-lg " color="primary">
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
