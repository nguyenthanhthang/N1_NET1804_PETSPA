import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Card, CardHeader, Avatar, CardBody, CardFooter, Divider, Spinner } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { AllFeedbackOfService, ServiceInfor } from "@/models/shopModel";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchAllFeedback, fetchServiceInfo } from "@/lib/redux/slice/shopSlice";

export default function ModalViewServiceProps({ params }: { params: string }) {
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

    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();

        return `${hours}:${minutes}, ${day}-${month}-${year}`;
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [shop, setShop] = useState<ServiceInfor | null>(null);
    const [allFeedback, setAllFeedback] = useState<AllFeedbackOfService[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleOpen = async () => {
        onOpen();
        setIsLoading(true);
        const response = await dispatch(fetchServiceInfo({ slug: params }));
        if (response.payload) {
            setShop(response.payload);
            const feedbackResponse = await dispatch(fetchAllFeedback({ slug: response.payload.id }));
            if (feedbackResponse.payload) {
                setAllFeedback(feedbackResponse.payload);
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            <Tooltip content="Xem chi tiết">
                <Button variant="bordered" className='rounded-full' isIconOnly onPress={handleOpen}>
                    <FaEye size={20} />
                </Button>
            </Tooltip>
            <Modal scrollBehavior="outside" size='3xl' className='rounded-lg' isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader
                        className='text-3xl flex justify-center font-bold uppercase rounded-lg text-white'
                        style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/b4/38/8d/b4388d3b0601a64cad25d2fe73b2224b.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover",
                        }}
                    >
                        Xem chi tiết dịch vụ
                    </ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-xl font-light">Tên dịch vụ:</div>
                            <div className="text-xl font-medium">{shop?.serviceName || "Không có"}</div>
                            <div className="text-xl font-light">Giá dịch vụ:</div>
                            <div className="text-xl font-medium">{shop?.price || "Không có"}</div>
                            <div className="text-xl font-light">Nomination:</div>
                            <div className="text-xl font-medium">{shop?.nomination || "Không có"}</div>
                            <div className="text-xl font-light">Cân nặng nhỏ nhất:</div>
                            <div className="text-xl font-medium">{shop?.minWeight || "Không có"}</div>
                            <div className="text-xl font-light">Cân nặng lớn nhất:</div>
                            <div className="text-xl font-medium">{shop?.maxWeight || "Không có"}</div>
                            <div className="text-xl font-light">Mô tả dịch vụ:</div>
                            <div className="text-xl font-medium">{shop?.serviceDescription || "Không có"}</div>
                        </div>
                    </ModalBody>
                    <Divider />
                    <ModalBody>
                        <p className='text-3xl flex justify-center font-bold uppercase rounded-lg text-black'> Đánh giá</p>
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
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-xl mt-4">Không có đánh giá nào</p>
                            )
                        )}
                    </ModalBody>
                    <ModalFooter className="flex justify-end space-x-4 mt-8">
                        <Button onClick={onClose} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[200px]">
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
