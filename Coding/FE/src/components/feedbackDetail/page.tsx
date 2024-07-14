import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { FaStar } from 'react-icons/fa';

export default function FeedbackDetail() {
    const feedback = [
        {
            name: "Khoi Ngo",
            comment: "Dịch vụ thật là tuyệt vời, cho cua của tôi đã biết đi bằng 2 chân",
            star: 4,
        },
        {
            name: "Khoi Le",
            comment: "Dịch vụ thật tuyệt vời, mèo của tôi đã có thể nói tiếng người",
            star: 4,
        },
        {
            name: "Khoi Nguyen",
            comment: "Thật tuyệt, con mèo nhà tôi có thể chơi ROK cùng tôi",
            star: 5,
        },
        {
            name: "Khoi Lam",
            comment: "Dịch vụ thật tuyệt vời, mèo của tôi đã có thể nói tiếng người",
            star: 4,
        },
    ];

    return (
        <>
            <div className="mt-2 flex justify-evenly">
                <div className="grid grid-cols-2 gap-2">
                    {feedback.map((item, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{item.name}</h4>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400">
                                <p>{item.comment}</p>
                            </CardBody>
                            <CardFooter className="gap-3">
                                <div className="flex gap-1 items-center">

                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} color={i < item.star ? "#FFD700" : "#E5E7EB"} strokeWidth={1.5} className="w-6 h-6" />
                                    ))}

                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}