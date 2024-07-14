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
import { ShopInfor } from '@/models/adminModel';
import { fetchShopInfor } from '@/lib/redux/slice/adminSlice';

export default function AccountDetail({ params }: { params: string }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [shop, setShop] = useState<ShopInfor | null>(null);
    const dispatch = useAppDispatch();

    const fetchShopDetails = async () => {
        try {
            const response = await dispatch(fetchShopInfor({ slug: params }));
            if (response.payload) {
                setShop(response.payload);
            }
        } catch (error) {
            console.error('Error fetching shop information:', error);
            toast.error("Đã xảy ra lỗi khi tải thông tin tài khoản. Vui lòng thử lại sau!");
        }
    };

    const handleOpen = () => {
        fetchShopDetails();
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
                    <ModalHeader
                        className='text-3xl flex justify-center font-bold uppercase text-white'
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >Thông tin Shop
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex justify-center">
                            <div className="flex justify-center">
                                <div>
                                    <p className="text-xl font-light">Tên</p>
                                    <p className="text-xl font-light">Họ</p>
                                    <p className="text-xl font-light">Email</p>
                                    <p className="text-xl font-light">Tên người dùng</p>
                                    <p className="text-xl font-light">Số điện thoại</p>
                                    <p className="text-xl font-light">Status</p>
                                </div>
                                <div className="ml-20">
                                    {shop ? (

                                        <div>
                                            <p className="text-xl font-medium">{shop.firstName || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{shop.lastName || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{shop.email || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{shop.username || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{shop.phone || "Không có gì"}</p>
                                            <p className="text-xl font-medium">{shop.status ? "Paused" : "Active"}</p>
                                        </div>

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
}
