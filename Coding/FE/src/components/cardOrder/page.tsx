'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import OrderDetail from "../orderDetail/page";
import { allBookingPaginationData } from "@/models/userModels";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchAllBookingPagination } from "@/lib/redux/slice/userSlice";


export default function CardOrder() {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<allBookingPaginationData[]>([]);
    useEffect(() => {
        const allService = async () => {
            const response = await dispatch(fetchAllBookingPagination());
            setItems(response.payload);

        }
        allService();
    }, [dispatch]);
    // console.log(items)
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'Hoàn thành';
            case 'CANCELLED':
                return 'Đã Huỷ';
            case 'SCHEDULED':
                return 'Đã đặt lịch';
            case 'NEED_CONFIRM':
                return 'Cần xác nhận';
            default:
                return 'Không xác định';
        }
    }
    const getColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
            case 'SCHEDULED':
                return 'warning';
            case 'NEED_CONFIRM':
                return 'secondary';
            default:
                return 'default';
        }
    }

    return (
        <div>
            {items.length === 0 ? (
                <div>Không có lịch đặt hàng nào</div>

            ) : (
                <Table aria-label="Example static collection table ">
                    <TableHeader>
                        <TableColumn>Tên dịch vụ</TableColumn>
                        <TableColumn>Ngày đặt</TableColumn>
                        <TableColumn>Khung giờ</TableColumn>
                        <TableColumn>Tên thú cưng</TableColumn>
                        <TableColumn>Spa</TableColumn>
                        <TableColumn>Trạng thái</TableColumn>
                        <TableColumn > <span className="sr-only">Action</span></TableColumn>
                    </TableHeader>
                    <TableBody>


                        {items.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.serviceName || "Lỗi"}</TableCell>
                                <TableCell>{service.localDate || "Lỗi"}</TableCell>
                                <TableCell>
                                    {service.timeSlotDto && service.timeSlotDto.startLocalDateTime && service.timeSlotDto.endLocalDateTime ?
                                        `${service.timeSlotDto.startLocalDateTime} - ${service.timeSlotDto.endLocalDateTime}` :
                                        "Lỗi"
                                    }
                                </TableCell>
                                <TableCell>{service.petName || "Lỗi"}</TableCell>
                                <TableCell>{service.shopName || "Lỗi"}</TableCell>
                                <TableCell>
                                    <Chip color={getColor(service.status)}>{getStatusLabel(service.status)}</Chip>
                                </TableCell>
                                <TableCell>
                                    <OrderDetail params={service.id} />
                                </TableCell>
                            </TableRow>
                        ))}



                    </TableBody>
                </Table>
            )}
        </div>
    )
}
