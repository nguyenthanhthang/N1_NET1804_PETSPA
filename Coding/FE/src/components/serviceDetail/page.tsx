import React, { useEffect, useState } from "react";
import {
    Modal, ModalContent, Button, useDisclosure, Link, Spinner,
    Card, CardHeader, Avatar, CardBody, Divider, CardFooter
} from "@nextui-org/react";
import { ServiceDetail } from "@/models/bookingModels";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchServiceDetail } from "@/lib/redux/slice/listAllServiceSlice";
import PriceTable from "../priceTable/page";
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { AllFeedbackOfService } from "@/models/shopModel";
import { fetchAllFeedback } from "@/lib/redux/slice/shopSlice";
import DeleteFeedback from "../deleteFeedback/page";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";

export default function DetailService({ id }: { id: string }) {
    const getRatingTypeLabel = (ratingType: string) => {
        switch (ratingType) {
            case 'TOTALLY_BAD':
                return 'Rất tệ';
            case 'PARTIALLY_BAD':
                return 'Không được ổn';
            case 'NORMAL':
                return 'Rất là ưng hoàng phúc';
            case 'QUITE_GOOD':
                return 'Rất tuyệt vời';
            case 'REALLY_GOOD':
                return 'Cực kỳ tuyệt vời';
            default:
                return 'Không xác định';
        }
    };

    const [IdUser, setUid] = useState<string>('');
    useEffect(() => {
        const fetchUid = async () => {
            try {
                const { uid } = await getAccessAndRefreshCookie();
                console.log('userId:', uid);
                if (uid) {
                    setUid(uid);
                }
            } catch (error) {
                console.error('Error fetching UID:', error);
            }
        };
        fetchUid();
    }, []);

    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();

        return `${hours}:${minutes}, ${day}-${month}-${year}`;
    };

    const [allFeedback, setAllFeedback] = useState<AllFeedbackOfService[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [service, setService] = useState<ServiceDetail | any>();
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = async () => {
        onOpen();
        const response = await dispatch(fetchServiceDetail({ slug: id }));
        console.log(response);
        if (response.payload) {
            setService(response.payload);
            const feedbackResponse = await dispatch(fetchAllFeedback({ slug: response.payload.id }));
            if (feedbackResponse.payload) {
                setAllFeedback(feedbackResponse.payload);
            }
        }
    };
    console.log(allFeedback)
    return (
        <div>
            <Button
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
                onClick={handleOpen}
            >
                <FaEye size={20} className="ml-2" /> Xem chi tiết
            </Button>

            <Modal
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior="outside"
            >
                <ModalContent>
                    <div className="rounded-lg">
                        <div
                            className="rounded-lg p-6"
                            style={{
                                backgroundImage: `url("https://i.pinimg.com/564x/11/e5/bd/11e5bd4736dbf8f404eb90bf306a0562.jpg")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <p className="font-medium text-4xl text-orange-600">{service?.serviceName}</p>
                                    <p className="text-2xl text-white">{service?.shopName}</p>
                                    <p className="text-xl font-light text-white"> Địa chỉ: {service?.shopAddress}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg p-6">
                            <div className="flex justify-end">
                                <Link href={localStorage.getItem('token') ? `/customer/bookingPage/${service?.id}` : '/logIn'}>
                                    <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[350px]">
                                        <FaShoppingCart size={20} className="ml-2" />
                                        Đặt lịch
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-2xl font-medium">Giới thiệu</p>
                            <p className="text-xl">{service?.serviceDescription}</p>
                            <p className="text-2xl mt-2 font-medium">Bảng giá</p>
                            <div className="mt-3">
                                <PriceTable />
                            </div>
                            <p className="text-2xl mt-2 font-medium">Đánh giá</p>
                            {isLoading ? (
                                <div className="flex justify-center mt-4">
                                    <Spinner size="lg" />
                                </div>
                            ) : (
                                allFeedback.length > 0 ? (
                                    <div className="flex justify-center">
                                        <div className="w-full">
                                            {allFeedback.map((item, index) => (
                                                <Card key={index} className="w-full mt-4">
                                                    <CardHeader className="justify-between">
                                                        <div className="flex gap-5">
                                                            <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                                <h4 className="text-large font-bold leading-none text-default-600 uppercase">{item.userName}</h4>
                                                                <p className="font-semibold text-orange-600">{getRatingTypeLabel(item.ratingType)}</p>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardBody className="px-3 pb-3 text-small">
                                                        <p>{item.content}</p>
                                                    </CardBody>
                                                    <Divider />
                                                    <CardFooter className="gap-3">
                                                        <div className="flex gap-1 items-center">
                                                            <p>{formatDateTime(item.localDateTime)}</p>
                                                        </div>
                                                    </CardFooter>
                                                    <Divider />
                                                    {IdUser === item.userId && ( // Check if IdUser matches the feedback author's ID
                                                        <>

                                                            <CardFooter className="gap-3">
                                                                <DeleteFeedback params={item.id.toString()} />
                                                            </CardFooter>
                                                        </>
                                                    )}
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-xl mt-4">Không có đánh giá nào</p>
                                )
                            )}
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}
