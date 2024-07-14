'use client'
import React, { useEffect, useState } from 'react';
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
import { useAppDispatch } from '@/lib/redux/store';
import { allShopPaginationData } from '@/models/adminModel';
import { deleteShop } from '@/lib/redux/slice/adminSlice';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { fetchAllServicePagination } from '@/lib/redux/slice/shopSlice';
import { MdDelete } from 'react-icons/md';

export default function DeleteShop({ params, refetchShops }: { params: string, refetchShops: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const [shopId, setShopId] = useState<string>(params);

    const handleDelete = async () => {
        try {
            await dispatch(deleteShop({ slug: shopId })).unwrap();
            toast.success("Xoá tài khoản shop thành công!", {
                onClose: () => {
                    onClose();
                    refetchShops();
                },
                autoClose: 1500,
            });
        } catch (error) {
            console.error('Error deleting shop:', error);
            toast.error("Đã xảy ra lỗi khi xoá tài khoản. Vui lòng thử lại sau!");
        }
    };

    return (
        <div>
            <Tooltip content="Xoá Tài khoản">
                <Button color="danger" variant="faded" isIconOnly onPress={onOpen}>
                    <MdDelete size={20} />
                </Button>
            </Tooltip>

            <Modal size='md' isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader className='text-3xl text-orange-600'>Bạn có chắc chắn về quyết định của mình?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={handleDelete}>
                            Xoá
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
}
