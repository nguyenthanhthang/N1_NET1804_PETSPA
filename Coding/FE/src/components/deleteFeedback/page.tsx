'use client'
import React, { useEffect, useState } from 'react';
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
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { MdDelete } from 'react-icons/md';
import { deleteFeedback } from '@/lib/redux/slice/userSlice';

export default function DeleteFeedback({ params }: { params: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const dispatch = useAppDispatch();
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
    }, []);
    const handleDelete = async () => {
        try {
            if (userId) {
                await dispatch(deleteFeedback({ slug: params })).unwrap();
                toast.success("Xoá thú cưng thành công!", {
                    onClose: () => {
                        onClose();

                    },
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error("Đã xảy ra lỗi khi xoá thú cưng. Vui lòng thử lại sau!");
        }
    };
    return (
        <div>
            <Tooltip content="Xoá đánh giá">
                <Button color="danger" variant="faded" isIconOnly onPress={onOpen}>
                    <MdDelete size={20} />
                </Button>
            </Tooltip>

            <Modal size='md' isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader className='text-3xl text-orange-600'>Bạn có chắc chắn về quyết định của mình?</ModalHeader>
                    <ModalFooter>
                        <Button className='w-full' onClick={onClose}>
                            Không
                        </Button>
                        <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full" onClick={handleDelete}>
                            Có
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
}
