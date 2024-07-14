'use client'
import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Tooltip,
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaEye } from 'react-icons/fa';

import { useAppDispatch } from '@/lib/redux/store';
import { CusInfor } from '@/models/adminModel';
import { fetchShopInfor } from '@/lib/redux/slice/adminSlice';

export default function AccountCusDetail({ params }: { params: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [customer, setCustomer] = useState<CusInfor | null>(null);
    const dispatch = useAppDispatch();

    const fetchCustomerDetails = async () => {
        try {
            const response = await dispatch(fetchShopInfor({ slug: params }));
            if (response.payload) {
                setCustomer(response.payload);
            }
        } catch (error) {
            console.error('Error fetching customer details:', error);
            toast.error('Failed to fetch customer details.');
        }
    };

    const handleOpen = () => {
        fetchCustomerDetails();
        onOpen();
    };

    return (
        <div>
            <Tooltip content="Xem chi tiết">
                <Button color="warning" variant="faded" isIconOnly onPress={handleOpen}>
                    <FaEye size={20} />
                </Button>
            </Tooltip>

            <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    <ModalHeader className='text-3xl text-orange-600'>Chi Tiết Tài khoản khách hàng</ModalHeader>
                    <ModalBody>
                        <div className="flex justify-between">
                            <div className="flex">
                                <div>
                                    <p className="text-xl font-light">Tên</p>
                                    <p className="text-xl font-light">Họ</p>
                                    <p className="text-xl font-light">Email</p>
                                    <p className="text-xl font-light">Tên người dùng</p>
                                    <p className="text-xl font-light">Số điện thoại</p>

                                    <p className="text-xl font-light">Status</p>
                                </div>
                                <div className="ml-20">
                                    {customer ? (
                                        <>
                                            <p className="text-xl font-medium">{customer.firstName || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{customer.lastName || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{customer.email || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{customer.username || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{customer.phone || "Không có gì"}</p>

                                            <p className="text-xl font-medium">{customer.status ? "Paused" : "Active"}</p>
                                        </>
                                    ) : (
                                        <p className="text-xl font-medium">Không có gì</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onOpenChange}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
};
