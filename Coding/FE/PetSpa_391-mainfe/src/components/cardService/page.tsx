


import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import ServiceDetail from "../orderDetail/page";
import { Button } from "@nextui-org/react";
const serviceItem = [
    {
        name: "Dịch vụ tắm rửa",
        company: "Khoi Spa",
        price: "150.000",

    },
    {
        name: "Dịch vụ tắm rửa",
        company: "An Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ mát xa",
        company: "Hoang Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ mát xa",
        company: "Minh Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ làm đẹp",
        company: "Truc Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ làm đẹp",
        company: "Truc Spa",
        price: "150.000",


    },
    {
        name: "Khách sạn thú cưng",
        company: "Truc Spa",
        price: "150.000",


    },
    {

        name: "Khách sạn thú cưng",
        company: "Truc Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ tắm rửa",
        company: "Truc Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ tắm rửa",
        company: "Truc Spa",
        price: "150.000",


    },
    {
        name: "Dịch vụ mát xa",
        company: "Hung Spa",
        price: "150.000",


    }

]
export default function CardService() {
    return (
        <div className="mb-5">
            <div className="grid grid-cols-4 gap-4 container">

                {serviceItem.map((item, index) => (
                    <Card key={index} className="max-w-[400px]">
                        <CardHeader className="flex gap-3">

                            <div className="flex flex-col">
                                <p className="text-lg">{item.name}</p>
                                <p className="text-md text-orange-600 ">{item.company}</p>
                                <p className="text-md text-default-500">Khu 2 Hoàng Cương, Thanh Ba, Phú Thọ</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>Giá: {item.price}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                                <Link color="foreground" href="bookingPage"> Đặt lịch ngay </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    )
}