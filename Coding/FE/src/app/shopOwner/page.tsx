"use client";
import React, { useEffect, useState } from "react";
import { QuantityFeedBack } from "@/components/quantityFeedBack/page";
import { QuantityService } from "@/components/quantityService/page";
import { QuantityBooking } from "@/components/quantityBooking/page";
import { Steam } from "@/components/chartShopowner/page";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import CreateShop from "@/components/createbyShop/page";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchShopInforPagination } from "@/lib/redux/slice/shopSlice";
import { Spinner } from "@nextui-org/react";
import { shopInfor } from "@/models/shopModel";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string>('');
    const [items, setItems] = useState<shopInfor | null>(null);
    const dispatch = useAppDispatch();

    const fetchData = async () => {
        setLoading(true);
        try {
            const { uid } = await getAccessAndRefreshCookie();
            if (uid) {
                setUserId(uid);
            }

            const response = await dispatch(fetchShopInforPagination()).unwrap();
            setItems(response || null);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    return (
        <div className="h-full lg:px-6">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner />
                </div>
            ) : !items ? (
                <div className="flex justify-center items-center h-full">
                    <CreateShop userId={userId} onCreate={fetchData} />
                </div>
            ) : (
                <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
                    <div className="gap-6 flex flex-col w-full">
                        <div className="flex flex-col gap-2">
                            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full">
                                <QuantityFeedBack />
                                <QuantityService />
                                <QuantityBooking />
                            </div>
                        </div>
                        <div className="h-full flex flex-col gap-2">
                            <h3 className="text-xl font-semibold">Thống kê</h3>
                            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
                                <Steam />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
