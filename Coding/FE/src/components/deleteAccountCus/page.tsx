'use client'
import React from 'react';
import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Tooltip,
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/lib/redux/store';
import { MdDelete } from 'react-icons/md';
import { deleteCus } from '@/lib/redux/slice/adminSlice';

export default function DeleteCus({ params, refetchCustomers }: { params: string, refetchCustomers: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deleteCus({ slug: params })).unwrap();
            toast.success("Xoá tài khoản khách hàng thành công!", {
                onClose: () => {
                    onClose();
                    refetchCustomers();
                },
                autoClose: 1500,
            });
        } catch (error) {
            console.error('Error deleting customer:', error);
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
};
