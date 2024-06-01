'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import React from "react";
import { PiDotsSixVerticalDuotone } from "react-icons/pi";
import OrderDetail from "../orderDetail/page";
const orderService = [
    { name: "Dịch vụ tắm rửa", company: "Khoi ", date: "Slot1, 15/05/2024", process: "Đang xử lí" },
    { name: "Dịch vụ tắm rửa", company: "An ", date: "Slot1, 15/05/2024", process: "Thành Công" },
    { name: "Dịch vụ cắt tỉa lông", company: "Long ", date: "Slot1, 15/05/2024", process: "Đã huỷ" },
    { name: "Dịch vụ khách sạn thú cưng", company: "Nam ", date: "Slot1, 15/05/2024", process: "Đang xử lí" },
    { name: "Dịch vụ mát xa ", company: "Justin ", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "MCK", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Nice", date: "Slot1, 15/05/2024", process: "Thành công" },
    { name: "Dịch vụ mát xa ", company: "Haha", date: "Slot1, 15/05/2024", process: "Thành công" },

];

export default function CardOrderShop() {

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
                <TableColumn>Khách hàng</TableColumn>
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
                            <div className="flex justify-around w-[100px]">
                                <div className="flex justify-between">
                                  
                                    <Button className="mx-5" color="warning" size="sm">Hủy</Button>
                                </div>
                                <OrderDetail />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}