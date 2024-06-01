'use client'
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { Tabs, Tab } from "@nextui-org/react";
import CardService from "@/components/cardService/page";
import FeedbackDetail from "@/components/feedbackDetail/page";

export default function ProfileShopOwner() {
    return (
        <>
            <div className="container mt-5">
                <div className="flex justify-around">
                    <Card className="max-w-[600px]">
                        <CardHeader className="flex gap-3 p-5 x">
                            <Image
                                alt="nextui logo"
                                height={80}
                                radius="full"
                                src="https://th.bing.com/th/id/OIP.2-iZBJy9PVnzZI7_aVMJ7QHaH_?rs=1&pid=ImgDetMain"
                                width={80}
                            />
                            <div className="flex flex-col">
                                <p className="text-3xl font-extrabold text-orange-600 ">Andy Spa</p>
                                <p className="text-2xl text-default-500">Khu 2 Hoàng Cương, Thanh Ba, Phú Thọ</p>
                            </div>
                        </CardHeader>
                    </Card>
                    <div className="flex flex-row w-[500px] items-center justify-between">
                        <div className="flex justify-start items-center">
                            <MdHomeRepairService className="w-8 h-8 mr-5" />
                            <p className="text-2xl font-semibold mr-3">Dịch vụ: </p>
                            <p className="text-xl font-medium text-orange-600">25</p>
                        </div>

                        <div className="flex justify-start items-center">
                            <FaStar className="w-8 h-8 mr-5" />
                            <p className="text-2xl font-semibold mr-3">Đánh giá: </p>
                            <p className="text-xl font-medium text-orange-600">4.8</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div className="flex w-full flex-col mt-5 ">
                        <Tabs aria-label="Options" className="flex justify-center ">
                            <Tab key="intro" title="Giới thiệu" className="px-12 py-5 text-xl ">
                                <Card>
                                    <CardBody className="p-10">
                                        <p className="text-3xl font-medium text-orange-600">Giới thiệu</p>
                                        <p className="text-2xl font-normal ">Andy Spa là điểm đến lý tưởng cho việc chăm sóc và làm đẹp cho thú cưng của bạn. Chúng tôi cung cấp một loạt các dịch vụ chăm sóc chất lượng, bao gồm:</p>
                                        <p className="text-2xl ">1. Dịch vụ tắm rửa: Thú cưng của bạn sẽ được tận hưởng một buổi tắm rửa thư giãn với các sản phẩm chăm sóc da dịu nhẹ và không gây kích ứng.</p>
                                        <p className="text-2xl ">2. Dịch vụ mát xa: Để giúp thú cưng giảm căng thẳng và cải thiện tinh thần, chúng tôi cung cấp dịch vụ mát xa chuyên nghiệp dành cho thú cưng của bạn.</p>
                                        <p className="text-2xl ">3. Dịch vụ làm đẹp: Đội ngũ chuyên gia làm đẹp của chúng tôi sẽ giúp thú cưng của bạn trở nên lộng lẫy hơn bao giờ hết, với các dịch vụ như cắt tỉa lông, làm móng, và làm đẹp tổng thể.</p>
                                        <p className="text-2xl ">4. Dịch vụ mát xa đặc biệt: Để mang lại trải nghiệm thư giãn tối đa cho thú cưng của bạn, chúng tôi còn cung cấp các dịch vụ mát xa đặc biệt, được thiết kế đặc biệt để giúp cải thiện sức khỏe và tinh thần của thú cưng.</p>
                                        <p className="text-2xl ">5. Khách sạn thú cưng: Nếu bạn cần một nơi an toàn và thoải mái để thú cưng của bạn ở lại trong thời gian bạn đi xa, chúng tôi cũng cung cấp dịch vụ khách sạn thú cưng đầy tiện nghi và an toàn.</p>
                                        <p className="text-2xl ">Tại Andy Spa, chúng tôi cam kết mang lại trải nghiệm chăm sóc tốt nhất cho thú cưng của bạn, với sự quan tâm và chuyên môn từ đội ngũ nhân viên giàu kinh nghiệm của chúng tôi.</p>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="service" title="Dịch vụ" className="px-12 py-5 text-xl">
                                <div className="w-full">
                                    <CardService />
                                </div>
                            </Tab>
                            <Tab key="Feedback" title="Đánh giá" className="px-12 py-5 text-xl">

                                <div className="w-full ">
                                    <FeedbackDetail />
                                </div>

                            </Tab>
                        </Tabs>
                    </div>
                </div>


            </div>
        </>
    )
}