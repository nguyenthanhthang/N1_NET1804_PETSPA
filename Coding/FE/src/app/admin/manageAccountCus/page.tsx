"use client";
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/store";
import { allCusPaginationData, allTotalPaginationData } from "@/models/adminModel";
import { fetchAllCusPagination, fetchTotalCusPagination } from "@/lib/redux/slice/adminSlice";
import AccountCusDetail from "@/components/AccountCusDetail/page";
import DeleteCus from "@/components/deleteAccountCus/page";
import { QuantityCustomer } from "@/components/quantityCustomer/page";

export default function ManageAccountCus() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState<allCusPaginationData[]>([]);
    const [total, setTotal] = useState<allTotalPaginationData | any>();

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchAllCusPagination());
            setCustomers(response.payload || []);
            const response1 = await dispatch(fetchTotalCusPagination());
            setTotal(response1.payload || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
  
    }, [dispatch]);

    return (
        <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Danh sách tài khoản khách hàng</h3>
            {/* <div className="mb-5 mt-5 flex justify-between items-center">
                <QuantityCustomer />
            </div> */}
            <div className="max-w-[95rem] mx-auto w-full">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner />
                    </div>
                ) : (
                    customers.length === 0 ? (
                        <div>Không có khách hàng nào</div>
                    ) : (
                        <>
                            <div className="p-4 mb-4 bg-gray-100 rounded-md">
                                <span className="font-semibold">Tổng số tài khoản: </span>
                                <span>{total.totalAccount}</span>
                            </div>
                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>Tên Khách hàng</TableColumn>
                                    <TableColumn>Email</TableColumn>
                                    <TableColumn>Số điện thoại</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                    <TableColumn>Hành động</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {customers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.username}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.phone}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs text-white ${customer.status ? 'bg-red-500' : 'bg-green-500'}`}
                                                    style={{ opacity: 0.8 }}
                                                >
                                                    {customer.status ? 'Paused' : 'Active'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <AccountCusDetail params={customer.id} />
                                                    <DeleteCus params={customer.id} refetchCustomers={fetchCustomers} />
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
