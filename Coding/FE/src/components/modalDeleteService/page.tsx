'use client';

import { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { ServiceInfor, allServicePaginationData } from '@/models/shopModel';
import { useAppDispatch } from '@/lib/redux/store';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { deleteService, fetchAllServicePagination } from '@/lib/redux/slice/shopSlice';
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalDeleteService({ params, refetchPets }: { params: string, refetchPets: () => void }) {

    const [userId, setUserId] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(params)
    const dispatch = useAppDispatch();
    const [service, setService] = useState<allServicePaginationData[]>([]);

    const fetchPets = async () => {
        const response = await dispatch(fetchAllServicePagination());
        setService(response.payload || []);
    };
    useEffect(() => {
        fetchPets();
    }, [dispatch]);
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
    const handleDetete = async () => {
        try {
            if (userId) {
                await dispatch(deleteService({ slug: params })).unwrap();
                toast.success("Xoá dịch vụ của shop thành công!", {
                    onClose: () => {
                        onClose();
                        refetchPets();
                    },
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error("Đã xảy ra lỗi khi xoá dịch vụ. Vui lòng thử lại sau!");
        }
    };
    return (

        <div>
            <Tooltip content="Xoá dịch vụ">
                <Button color="danger" variant="faded" isIconOnly onPress={onOpen}>
                    <MdDelete size={20} />
                </Button>
            </Tooltip>

            <Modal size='md' isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader
                        className='text-3xl flex justify-center text-center font-bold bg-gray-300  text-orange-600'
                    >Bạn có chắc về quyết định của mình hay không?

                    </ModalHeader>
                    <ModalFooter>

                        <Button className='w-full' onClick={onClose}>
                            Đóng
                        </Button>
                        <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full" onClick={handleDetete} >
                            Xoá
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
};

