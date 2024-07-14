'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { PiDotsSixVerticalDuotone } from "react-icons/pi";
import OrderDetail from "../orderDetail/page";
import { useAppDispatch } from "@/lib/redux/store";
import { allOrderBookingPaginationData } from "@/models/shopModel";
import { fetchAllOrderBookingPagination } from "@/lib/redux/slice/shopSlice";

export default function CardOrderShop() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<allOrderBookingPaginationData[]>([]);
    useEffect(() => {
        const allService = async () => {
            try {
                setLoading(true);
                const response = await dispatch(fetchAllOrderBookingPagination());
                setItems(response.payload);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }

        }
        allService();
    }, [dispatch]);
    const getColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
            case 'SCHEDULED':
                return 'warning';
            default:
                return 'default';
        }
    }

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Spinner />
                </div>
            ) : (
                items.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="text-2xl font-bold ">Chưa có đơn hàng nào</p>
                    </div>

                ) : (
                    <Table aria-label="Example static collection table ">
                        <TableHeader>
                            <TableColumn>Tên dịch vụ</TableColumn>
                            <TableColumn>Ngày đặt</TableColumn>
                            <TableColumn>Khung giờ</TableColumn>
                            <TableColumn>Tên khách hàng</TableColumn>
                            <TableColumn>Loại thú cưng</TableColumn>
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
                                    <TableCell>{service.customerFullName || "Lỗi"}</TableCell>
                                    <TableCell>{service.petName || "Lỗi"}</TableCell>
                                    <TableCell>
                                        <Chip color={getColor(service.status)}>{service.status || "Lỗi"}</Chip>
                                    </TableCell>
                                    <TableCell>
                                        <OrderDetail params={service.id} />
                                    </TableCell>
                                </TableRow>
                            ))}



                        </TableBody>
                    </Table>
                )
            )}
        </div>

    )
}