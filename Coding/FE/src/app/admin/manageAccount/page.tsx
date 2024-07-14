'use client';
import { Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AddShop from "@/components/createShop/page";
import { useAppDispatch } from "@/lib/redux/store";
import { allShopPaginationData, allTotalPaginationData } from "@/models/adminModel";
import { fetchAllShopPagination, fetchTotalShopPagination } from "@/lib/redux/slice/adminSlice";
import AccountDetail from "@/components/accountDetail/page";
import DeleteShop from "@/components/deleteAccount/page";
import { QuantityCustomer } from "@/components/quantityCustomer/page";
import { QuantityShop } from "@/components/quantityShop/page";

export default function ManageAccount() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [shop, setShop] = useState<allShopPaginationData[]>([]);
    const [total, setTotal] = useState<allTotalPaginationData | any>();

    useEffect(() => {
        fetchServices();
    }, [dispatch]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchAllShopPagination());
            setShop(response.payload || []);
            const response1 = await dispatch(fetchTotalShopPagination());
            setTotal(response1.payload || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Danh sách tài khoản</h3>
            {/* <div className="mb-5 mt-5 flex justify-between items-center">
                <QuantityShop />
            </div> */}


            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        placeholder="Tìm kiếm shop"
                    />
                </div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <AddShop refetchShops={fetchServices} />
                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner />
                    </div>
                ) : (
                    shop.length === 0 ? (
                        <div>Không có shop nào</div>
                    ) : (
                        <>
                            <div className="p-4 mb-4 bg-gray-100 rounded-md">
                                <span className="font-semibold">Tổng số tài khoản: </span>
                                <span>{total.totalAccount}</span>
                            </div>

                            <Table aria-label="Example static collection table" >
                                <TableHeader>
                                    <TableColumn>Tên Shop</TableColumn>
                                    <TableColumn>Email</TableColumn>
                                    <TableColumn>Số điện thoại</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                    <TableColumn>Hành động</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {shop.map((sp) => (
                                        <TableRow key={sp.id}>
                                            <TableCell>{sp.username}</TableCell>
                                            <TableCell>{sp.email}</TableCell>
                                            <TableCell>{sp.phone}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs text-white ${sp.status ? 'bg-red-500' : 'bg-green-500'}`}
                                                    style={{ opacity: 0.8 }}
                                                >
                                                    {sp.status ? 'Paused' : 'Active'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <AccountDetail params={sp.id} />
                                                    <DeleteShop params={sp.id} refetchShops={fetchServices} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>



                        </>
                    )
                )}
            </div>
        </div>
    );
}
