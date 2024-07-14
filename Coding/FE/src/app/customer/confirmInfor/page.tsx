'use client'
import { createBooking, fetchServiceDetail } from "@/lib/redux/slice/listAllServiceSlice";
import { useAppDispatch } from "@/lib/redux/store";
import confetti from 'canvas-confetti';
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Confirm() {
    const [bookingData, setbookingData] = useState({
        customerId: 0,
        additionalMessage: '',
        serviceId: 0,
        localDate: '',
        timeSlotDto: {
            startLocalDateTime: '',
            endLocalDateTime: ''
        },
        petName: '',
        petAge: 0,
        typePet: '',
        petWeight: 0,
        petId: '',
        petGender: '',
    });
    console.log(bookingData)
    const [serviceData, setServiceData] = useState({
        shopName: '',
        serviceName: '',
        shopAddress: '',
    });

    const dispatch = useAppDispatch();
    const [userId, setUid] = useState<string>('');
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
    }, [userId]);

    useEffect(() => {
        const service = sessionStorage.getItem('service');
        if (service) {
            setServiceData(JSON.parse(service));
        }
    }, []);
    useEffect(() => {
        const dataFromStorage = sessionStorage.getItem('bookingValues');

        if (dataFromStorage) {
            console.log(JSON.parse(dataFromStorage))
            setbookingData(JSON.parse(dataFromStorage));
        }
    }, []);
    const router = useRouter()
    const handleBooking = async () => {
        try {

            if (userId) {
                await dispatch(createBooking({ bookingData })).unwrap();
                sessionStorage.clear();
                toast.success("Đặt lịch thành công! Bạn sẽ được chuyển về trang chủ trong giây lát...", {
                    onClose: () => {
                        setTimeout(() => {
                            router.push('/customer/orderHistory');
                        }, 1000);
                    },
                    autoClose: 1000,
                });
            }
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error("Đã xảy ra lỗi khi đặt lịch. Vui lòng thử lại sau!");
        }
    };


    return (
        <div
            style={{
                backgroundImage: 'url("https://i.pinimg.com/564x/42/5c/a8/425ca85160d963b912a45cd4bb5cecf2.jpg")',


            }}
        >
            <div className="container h-screen flex justify-center items-center "
                style={{

                }}>
                <Card className="w-[800px]">
                    <div className="rounded-lg">
                        <div className="rounded-lg p-6"
                            style={{
                                backgroundImage: 'url("https://i.pinimg.com/564x/11/e5/bd/11e5bd4736dbf8f404eb90bf306a0562.jpg")',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "cover",

                            }}
                        >

                            <div className="flex items-center ">
                                <div className="">
                                    <p className=" font-medium text-4xl text-orange-600">{serviceData.serviceName}</p>
                                    <p className="text-2xl text-white">{serviceData.shopName}</p>
                                    <p className="text-xl font-light text-white">{serviceData.shopAddress}</p>
                                </div>
                            </div>


                        </div>
                        <div>
                            <div className="p-4">
                                <p className="text-2xl font-semibold">Thông tin đặt lịch</p>
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div>
                                            <p className="text-xl font-light">Loại thú cưng</p>
                                            <p className="text-xl font-light">Tên thú cưng</p>
                                            <p className="text-xl font-light">Cân nặng</p>
                                            <p className="text-xl font-light">Khung giờ</p>
                                            <p className="text-xl font-light">Ngày đặt </p>
                                            <p className="text-xl font-light">Ghi chú</p>
                                        </div>
                                        <div className="ml-20">
                                            <p className="text-xl font-medium">{bookingData.typePet === 'DOG' ? 'Chó' : (bookingData.typePet === 'CAT' ? 'Mèo' : '')}</p>
                                            <p className="text-xl font-medium">{bookingData.petName}</p>
                                            <p className="text-xl font-medium">{bookingData.petWeight}</p>
                                            <p className="text-xl font-medium">{bookingData.timeSlotDto.startLocalDateTime} - {bookingData.timeSlotDto.endLocalDateTime}</p>
                                            <p className="text-xl font-medium">{bookingData.localDate}</p>
                                            <p className="text-xl font-medium">{bookingData.additionalMessage}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <CardFooter className="w-full flex justify-center mt-3">
                        <Button
                            onClick={handleBooking}
                            radius="full"
                            className=" w-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        >
                            Xác nhận
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <ToastContainer />
        </div>
    )
}