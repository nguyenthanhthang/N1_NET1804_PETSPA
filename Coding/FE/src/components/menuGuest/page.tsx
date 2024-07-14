import { Button, Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";
import bannerImg from "../../../public/assets/img/banner.svg";
import Image from 'next/image'

export default function MenuGuest() {
    return (
        <>
            <div className="flex container py-10">
                <div className="flex-1 flex  items-center">
                    <div>
                        <p className=" font-bold text-6xl text-orange-600">Pet Place</p>
                        <div className="w-3/4 py-3">
                            <p className="font-medium  text-2xl ">Cuộc sống quá khó khăn ư. Hãy để chúng tôi khiến nó trở nên dễ hơn</p>
                        </div>
                        <div>
                            <Link color="foreground" href="listService">
                                <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[200px]">
                                    Khám phá
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 border-1 rounded-b-full" style={{ backgroundColor: "#f9d783" }}>
                    <div className="flex items-center">
                        <Image
                            alt="Picture of the author"
                            width={500}
                            height={500}
                            src={bannerImg}
                        />
                    </div>
                </div>
                <div className="flex-1 flex justify-end items-center ">
                    <ul>
                        <li><Link href="#" className="font-medium py-5 text-xl hover:text-orange-600" color="foreground">Dịch vụ tắm rửa</Link></li>
                        <li><Link href="#" className=" font-medium py-5 text-xl hover:text-orange-600" color="foreground">Dịch vụ làm đẹp</Link></li>
                        <li><Link href="#" className="font-medium py-5 text-xl hover:text-orange-600" color="foreground">Dịch vụ mát xa </Link></li>
                        <li><Link href="#" className="font-medium py-5 text-xl hover:text-orange-600" color="foreground">Dịch vụ mát xa đặc biệt</Link></li>
                        <li><Link href="#" className=" font-medium py-5 text-xl hover:text-orange-600" color="foreground">Khách sạn thú cưng</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}