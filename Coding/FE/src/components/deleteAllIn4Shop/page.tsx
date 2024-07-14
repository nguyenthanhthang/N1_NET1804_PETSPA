'use client'
import React, { useEffect, useState } from 'react';
import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/lib/redux/store';
import { deleteAllIn4Shop } from '@/lib/redux/slice/shopSlice';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';

export default function DeleteAllIn4Shop({ params }: { params: string }) {
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
    console.log(params)
    const handleDelete = async () => {
        try {
            if (userId) {
                await dispatch(deleteAllIn4Shop({ slug: params })).unwrap();
                onClose();

            }
        } catch (error) {
            console.error('Error deleting shop information:', error);
            onClose();
        }
    };
    return (
        <div>
            <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onPress={onOpen}>
                Xoá thông tin Shop
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
                        Bạn có chắc về điều này hay không?
                    </ModalHeader>
                    <ModalFooter>
                        <Button className='w-full' onClick={onClose}>
                            Không
                        </Button>
                        <Button onClick={handleDelete} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full">
                            Có
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
}
