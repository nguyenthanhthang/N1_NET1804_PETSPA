import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import DetailService from "../serviceDetail/page";
import { allServicesPaginationData } from "@/models/bookingModels";


export default function CardService({ service }: { service: allServicesPaginationData }) {

    return (
        <div className="mb-5">
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-2xl font-semibold">{service.serviceName}</p>
                        <p className="text-md text-orange-600 ">{service.shopName}</p>
                        <p className="text-md text-default-500">{service.address}</p>
                    </div>
                </CardHeader>
                <Divider />

                <CardBody>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className="star"
                                color={index + 1 <= service.nomination ? 'gold' : 'gray'}
                            />
                        ))}
                    </div>
                    <p className="text-xl font-medium">Giá: {service.price}</p>
                </CardBody>
                <Divider />
                <CardFooter className="w-full flex justify-center">
                    <div className="w-full">
                        <DetailService id={service.id} />
                    </div>
                </CardFooter>
            </Card>
        </div >
    );
}