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
import { allPetPaginationData } from '@/models/userModels';
import { MdDelete } from 'react-icons/md';
import { completedBooking, deletePet, fetchAllPetPagination } from '@/lib/redux/slice/userSlice';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { BookingComplete } from '@/models/shopModel';

export default function ConfirmBooking({ params }: { params: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const [userId, setUserId] = useState<string>('');
    const [completeData, setcompleteData] = useState<BookingComplete>({
        bookingId: parseInt(params),
    });
    console.log(completeData)
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

    const handleConfirm = async () => {
        try {
            if (userId) {
                await dispatch(completedBooking({ completeData })).unwrap();
                console.log(completeData)
                toast.success("Xác nhận thành công!", {
                    onClose: onClose,
                    autoClose: 1500,
                });

            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error("Đã xảy ra lỗi khi xác nhận!. Vui lòng thử lại sau!");
        }
    };

    return (
        <div className=' mr-5'>
            <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full gap-5 " onPress={onOpen}>
                Xác nhận hoàn thành
            </Button>

            <Modal size='md' isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader
                        className='text-3xl flex text-center justify-center font-bold uppercase text-black'
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >
                        Bạn có chắc chắn về điều này không
                    </ModalHeader>
                    <ModalFooter>
                        <Button className='w-full' onClick={onClose}>
                            Không
                        </Button>
                        <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full" onClick={handleConfirm}>
                            Có
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
};


