'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Avatar, Link, Chip } from "@nextui-org/react";
import PriceTable from "../priceTable/page";
import CustomerFeedback from "../customerFeedback/page";

export default function     OrderDetail() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <div className="flex flex-col gap-2">
            <Button radius="sm" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" size="sm" onPress={onOpen}>
                Xem chi tiết
            </Button>

            <Modal
                size="5xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="outside"
            >
                <ModalContent >
                    {(onClose) => (
                        <div className="rounded-lg">
                            <div className="rounded-lg p-6"
                                style={{
                                    backgroundImage: `url("https://i.pinimg.com/564x/11/e5/bd/11e5bd4736dbf8f404eb90bf306a0562.jpg")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: "cover",

                                }}
                            >
                                <div className="flex items-center ">
                                    <div className="ml-4">
                                        <p className=" font-medium text-4xl text-orange-600">Dịch vụ tắm rửa</p>
                                        <p className="text-xl text-white"> Slot1, 25/04/2025</p>
                                        <p className="text-2xl text-white"> Khoi Spa</p>
                                        <p className="text-xl font-light text-white"> Địa chỉ: Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM.</p>
                                        <Chip className="my-2" color="success">Thành công</Chip>

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
                                            <div className="ml-6">
                                                <p className="text-xl font-medium">Chó</p>
                                                <p className="text-xl font-medium">Justin</p>
                                                <p className="text-xl font-medium">45Kg</p>
                                                <p className="text-xl font-medium">Slot 1 , 9:00 - 10:30</p>
                                                <p className="text-xl font-medium">25/04/2025</p>
                                                <p className="text-xl font-medium">Có tiền sử bị bệnh tim</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-end">
                                            <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Huỷ dịch vụ </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
