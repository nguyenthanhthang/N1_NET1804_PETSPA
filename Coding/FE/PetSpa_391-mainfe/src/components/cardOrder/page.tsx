'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import React from "react";
import OrderDetail from "../orderDetail/page";
import { PiDotsSixVerticalDuotone } from "react-icons/pi";
const orderService = [
    { name: "Dịch vụ tắm rửa", company: "Khoi Spa", date: "Slot1, 15/05/2024", process: "Đã huỷ" },
    { name: "Dịch vụ tắm rửa", company: "An Spa", date: "Slot1, 15/05/2024", process: "Thành Công" },
    { name: "Dịch vụ cắt tỉa lông", company: "Long Spa", date: "Slot1, 15/05/2024", process: "Đã huỷ" },
    { name: "Dịch vụ khách sạn thú cưng", company: "Nam Spa", date: "Slot1, 15/05/2024", process: "Đã huỷ" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Justin Spa", date: "Slot1, 15/05/2024", process: "Thành công" },
];

export default function CardOrder() {

    const getColor = (process: any) => {
        switch (process) {

            case "Thành Công":
            case "Thành công":
                return "success";
            case "Đã huỷ":
                return "warning";
            default:
                return "default";
        }
    }

    return (
        <Table aria-label="Example static collection table ">
            <TableHeader>
                <TableColumn>Tên dịch vụ</TableColumn>
                <TableColumn>Ngày đặt</TableColumn>
                <TableColumn>Spa</TableColumn>
                <TableColumn>Tình trạng</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {orderService.map((service, index) => (
                    <TableRow key={index}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.date}</TableCell>
                        <TableCell>{service.company}</TableCell>
                        <TableCell>
                            <Chip color={getColor(service.process)}>{service.process}</Chip>
                        </TableCell>
                        <TableCell>
                            <OrderDetail />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}
