import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export default function Confirm() {
    return (
        <div
            style={{
                backgroundImage: 'url(https://i.pinimg.com/736x/91/27/3e/91273ed3de2f0c4f869655e05668a9d2.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}
        >
            <div className="container h-screen flex justify-center items-center "
                style={{

                }}>
                <Card className="p-10" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}>
                    <div className="text-center ">
                        <p className="text-5xl font-semibold text-orange-600">Kiểm tra thông tin</p>
                    </div>
                    <div className="flex justify-center mt-3  w-full">

                        <div className="grid grid-cols-2 gap-5  mx-auto">
                            <p className="text-2xl font-semibold ">Tên dịch vụ</p>
                            <p className="text-2xl font-thin pl-40">Dịch vụ tắm rửa</p>

                            <p className="text-2xl font-semibold ">Công ty</p>
                            <p className="text-2xl font-thin pl-40">Khôi Spa</p>

                            {/* Hàng thứ 7 */}
                            <p className="text-2xl font-semibold pr-5">Loại thú cưng</p>
                            <p className="text-2xl font-thin pl-40">Chó</p>

                            {/* Hàng thứ 8 */}
                            <p className="text-2xl font-semibold pr-5">Ngày</p>
                            <p className="text-2xl font-thin pl-40">25/05/2024</p>
                            <p className="text-2xl font-semibold pr-5">Khung giờ</p>
                            <p className="text-2xl font-thin pl-40">09:00 - 10:00</p>
                            <p className="text-2xl font-semibold pr-5">Tên thú cưng</p>
                            <p className="text-2xl font-thin pl-40">Justin</p>
                            <p className="text-2xl font-semibold pr-5">Cân nặng</p>
                            <p className="text-2xl font-thin pl-40">45kg</p>
                            <p className="text-2xl font-semibold pr-5">Ghi chú</p>
                            <p className="text-2xl font-thin pl-40">Có tiền sử bệnh tim</p>
                        </div>

                    </div>
                    <CardFooter className="w-full flex justify-center mt-3">
                        <Button className="w-1/2" color="success">Xác nhận</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}