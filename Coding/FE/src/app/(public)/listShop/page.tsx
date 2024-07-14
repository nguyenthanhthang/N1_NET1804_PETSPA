'use client';
import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { useAppDispatch } from "@/lib/redux/store";
import { allShopPaginationData } from "@/models/userModels";
import { fetchAllShopPagination } from "@/lib/redux/slice/userSlice";
import Link from "next/link";

export default function ListAllShop() {
    const dispatch = useAppDispatch();
    const [shops, setShops] = useState<allShopPaginationData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchShops = async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchAllShopPagination());
            setShops(response.payload || []);
        } catch (error) {
            console.error('Error fetching shops:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShops();
    }, [dispatch]);

    return (
        <div className="container py-4 pb-12 flex flex-col gap-6">
            <div>
                <div className="py-2">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Trang chủ
                                </a>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-black">Danh sách tất  cả các shop</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="w-[1200px] mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner />
                    </div>
                ) : shops.length === 0 ? (
                    <div>Không có shop nào</div>
                ) : (
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Tên shop</TableColumn>
                            <TableColumn>Địa chỉ</TableColumn>
                            <TableColumn>Số  điện thoại</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Tổng số dịch vụ</TableColumn>
                            <TableColumn>Đánh giá</TableColumn>
                            <TableColumn>Hành động</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {shops.map((shop) => (
                                <TableRow key={shop.id}>
                                    <TableCell>{shop.shopName}</TableCell>
                                    <TableCell>{shop.shopAddress}</TableCell>
                                    <TableCell>{shop.shopPhone}</TableCell>
                                    <TableCell>{shop.shopEmail}</TableCell>
                                    <TableCell>{shop.totalServices}</TableCell>
                                    <TableCell>{shop.nomination}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Link href={`/listShop/${shop.id}`}>
                                                <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                                                    <FaEye size={20} className="ml-2" />
                                                    Xem chi tiết
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
