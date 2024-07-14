'use client'
import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Tooltip,
} from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';
import { useAppDispatch } from '@/lib/redux/store';
import { PetInfor, allPetPaginationData } from '@/models/userModels';
import { fetchPetInfor } from '@/lib/redux/slice/userSlice';

export default function PetDetail({ params }: { params: allPetPaginationData }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleOpen = async () => {
        onOpen();
    };
    return (
        <div>
            <Tooltip content="Xem chi tiết">
                <Button className='rounded-full' variant="bordered" isIconOnly onPress={handleOpen}>
                    <FaEye size={20} color="warning" />
                </Button>
            </Tooltip>

            <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    <ModalHeader
                        className='text-3xl flex justify-center font-bold uppercase text-white'
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",


                        }}
                    >Chi Tiết thú cưng</ModalHeader>
                    <ModalBody
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/32/9e/2f/329e2f6a54fdb1f53f4126991fcc6143.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",


                        }}
                    >
                        <div className="flex justify-center">
                            <div className="flex">
                                <div>
                                    <p className="text-xl font-light">Loại thú cưng</p>
                                    <p className="text-xl font-light">Tên thú cưng</p>
                                    <p className="text-xl font-light">Tuổi</p>
                                    <p className="text-xl font-light">Cân nặng</p>
                                    <p className="text-xl font-light">Giới tính </p>
                                    <p className="text-xl font-light">Mô tả</p>
                                    <p className="text-xl font-light">Ghi chú</p>
                                </div>
                                <div className="ml-20">
                                    {params ? (
                                        <>
                                            <p className="text-xl font-bold">{params.petType === 'DOG' ? 'Chó' : (params.petType === 'CAT' ? 'Mèo' : 'Không có gì')}</p>
                                            <p className="text-xl font-bold">{params.petName || "Không có gì"}</p>
                                            <p className="text-xl font-bold">{params.petAge || "Không có gì"}</p>
                                            <p className="text-xl font-bold">{params.petWeight || "Không có gì"}</p>
                                            <p className="text-xl font-bold">{params.petGender === 'Male' ? 'Đực' : (params.petGender === 'Female' ? 'Cái' : 'Không có gì')}</p>
                                            <p className="text-xl font-bold">{params.petDescription || "Không có gì"}</p>
                                            <p className="text-xl font-bold">{params.petNote || "Không có gì"}</p>
                                        </>
                                    ) : (
                                        <p className="text-xl font-medium">Không có gì</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};


