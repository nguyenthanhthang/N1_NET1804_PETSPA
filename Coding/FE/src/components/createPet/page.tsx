'use client'
import React, { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Image,
    Input,
    Select,
    SelectItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Textarea,
} from '@nextui-org/react';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/lib/redux/store';
import { allPetPaginationData, createPetInput } from '@/models/userModels';
import { createPet, fetchAllPetPagination } from '@/lib/redux/slice/userSlice';
import { FaPlus } from 'react-icons/fa';
import { FcPlus } from 'react-icons/fc';

export default function CreatePet({ userId, refetchPets }: { userId: string, refetchPets: () => void }) {
    const [image, setImage] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    useEffect(() => {
        if (userId) {
            setPetData(prevData => ({
                ...prevData,
                userId: userId,
            }));
        }
    }, [userId]);

    const [petData, setPetData] = useState<createPetInput>({
        id: '',
        userId: userId,
        petName: '',
        petType: '',
        petAge: 0,
        petGender: '',
        petWeight: 0,
        petDescription: '',
        petPhoto: '',
        petNote: '',
    });

    const resetForm = () => {
        setPetData({
            id: '',
            userId: userId,
            petName: '',
            petType: '',
            petAge: 0,
            petGender: '',
            petWeight: 0,
            petDescription: '',
            petPhoto: '',
            petNote: '',
        });
        setValidationErrors([]);
    };

    const validateInput = () => {
        const errors = [];

        if (!petData.petName) {
            errors.push('Tên thú cưng không được để trống');
        }
        if (petData.petName.length > 30 || petData.petName.length < 2) {
            errors.push('Tên thú cưng không quá 30 ký tự và lớn hơn 2');
        }
        if (!petData.petType) {
            errors.push('Loại thú cưng không được để trống ');
        }
        if (isNaN(petData.petAge)) {
            errors.push('Tuổi thú cưng phải là số và không được để trống ');
        }
        if (petData.petAge <= 0 || petData.petAge > 100) {
            errors.push('Tuổi thú cưng  không được quá 100 và lớn hơn 0');
        }
        if (!petData.petGender) {
            errors.push('Giới tính thú cưng không được để trống ');
        }
        if (isNaN(petData.petWeight)) {
            errors.push('Cân nặng thú cưng phải là số và không được trống');
        }
        if (petData.petWeight <= 0 || petData.petWeight > 200) {
            errors.push('Cân nặng thú cưng không được quá 200  và lớn hơn 0');
        }
        return errors;
    };

    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setPetData(prevData => ({
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
                await dispatch(createPet({ petData })).unwrap();
                toast.success("Tạo thú cưng thành công!", {
                    onClose: () => {
                        onClose();
                        refetchPets();
                    },
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Error creating pet:', error);
            toast.error("Đã xảy ra lỗi khi tạo thú cưng. Vui lòng thử lại sau!");
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
                onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ">
                Tạo mới thú cưng
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
                    >Tạo mới thú cưng</ModalHeader>
                    <ModalBody
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/32/9e/2f/329e2f6a54fdb1f53f4126991fcc6143.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >

                        <div className="mt-2 flex">
                            <div className="">
                                <div className="flex w-full mb-4">
                                    <div className="mr-4">
                                        <Input
                                            type="text"
                                            value={petData.petName}
                                            onChange={(e) => handleInputChange('petName', e.target.value)}
                                            label="Tên thú cưng"
                                            isInvalid={!!validationErrors.find(err => err.includes('Tên thú cưng'))}
                                            color={validationErrors.find(err => err.includes('Tên thú cưng')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Tên thú cưng'))}
                                            className="w-[250px]"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <Select
                                            label="Loại thú cưng"
                                            value={petData.petType}
                                            onChange={(e) => handleInputChange('petType', e.target.value)}
                                            className="w-[250px]"
                                            isInvalid={!!validationErrors.find(err => err.includes('Loại thú cưng'))}
                                            color={validationErrors.find(err => err.includes('Loại thú cưng')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Loại thú cưng'))}
                                        >
                                            <SelectItem key="DOG" value="DOG">Chó</SelectItem>
                                            <SelectItem key="CAT" value="CAT">Mèo</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex w-full mb-4">
                                    <div className="mr-4">
                                        <Input
                                            type="number"
                                            value={petData.petAge.toString()}
                                            onChange={(e) => handleInputChange('petAge', parseInt(e.target.value))}
                                            label="Tuổi thú cưng"
                                            isInvalid={!!validationErrors.find(err => err.includes('Tuổi'))}
                                            color={validationErrors.find(err => err.includes('Tuổi')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Tuổi'))}
                                            className="w-[250px]"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <Select
                                            label="Giới tính"
                                            value={petData.petGender}
                                            onChange={(e) => handleInputChange('petGender', e.target.value)}
                                            className="w-[250px]"
                                            isInvalid={!!validationErrors.find(err => err.includes('Giới tính'))}
                                            color={validationErrors.find(err => err.includes('Giới tính')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Giới tính'))}
                                        >
                                            <SelectItem key="Male" value="Male">Đực</SelectItem>
                                            <SelectItem key="Female" value="Female">Cái</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-full mr-4">
                                        <Input
                                            type="number"
                                            value={petData.petWeight.toString()}
                                            onChange={(e) => handleInputChange('petWeight', parseInt(e.target.value))}
                                            label="Cân nặng"
                                            isInvalid={!!validationErrors.find(err => err.includes('Cân nặng'))}
                                            color={validationErrors.find(err => err.includes('Cân nặng')) ? "danger" : "default"}
                                            errorMessage={validationErrors.find(err => err.includes('Cân nặng'))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-full ml-4">
                                        <Input
                                            type="text"
                                            value={petData.petDescription}
                                            onChange={(e) => handleInputChange('petDescription', e.target.value)}
                                            label="Mô tả"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-full">
                                        <Textarea
                                            value={petData.petNote}
                                            onChange={(e) => handleInputChange('petNote', e.target.value)}
                                            label="Ghi chú"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex w-full justify-end">
                            <Button
                                className="mr-3 w-full"
                                onPress={handleClose}
                            >
                                Huỷ
                            </Button>
                            <Button
                                type="submit"
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
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
};
