'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Badge, Card, CardHeader, Divider, CardBody, CardFooter, Input, Avatar } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
const typeService = [
    { label: "Dịch vụ tắm rửa", value: "gromming" },
    { label: "Dịch vụ mát xa", value: "massage" },
    { label: "Dịch vụ mát xa đặc biệt", value: "special" },
    { label: "Dịch vụ làm đẹp", value: "beauty" },
    { label: "Dịch vụ khách sạn thú cưng", value: "hotel" },
];
const SortPrice = [
    { label: "Từ cao đến thấp", value: "high" },
    { label: "Từ thấp đến cao", value: "low" },

];
const SortReview = [
    { label: "Đánh giá cao", value: "good" },
    { label: "Đánh giá thấp", value: "bad" },

];

export default function SortService() {

    return (
        <>
            <Navbar className="  border-1 rounded-sm ">

                <NavbarContent className="hidden sm:flex gap-4 justify-center " justify="center" >
                    <NavbarItem>


                        <Select
                            size="sm"

                            label="Dịch vụ"
                            className="w-52"
                        >
                            {typeService.map((type, index) => (
                                <SelectItem key={index}>{type.label}</SelectItem>
                            ))}
                        </Select>


                    </NavbarItem>
                    <NavbarItem>


                        <Select
                            size="sm"

                            label="Giá cả"
                            className="w-52"
                        >
                            {SortPrice.map((price, index) => (
                                <SelectItem key={index}>{price.label}</SelectItem>
                            ))}
                        </Select>


                    </NavbarItem>
                    <NavbarItem>


                        <Select
                            size="sm"

                            label="Đánh giá"
                            className="w-52"
                        >
                            {SortReview.map((review, index) => (
                                <SelectItem key={index}>{review.label}</SelectItem>
                            ))}
                        </Select>


                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end" >
                    <NavbarItem className="w-48">
                        <Input size="md" type="search" placeholder="Search"
                            endContent={
                                <Button size="sm" isIconOnly color="default" variant="light">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </Button>
                            } />
                    </NavbarItem>


                </NavbarContent>
            </Navbar>

        </>


    );
}
