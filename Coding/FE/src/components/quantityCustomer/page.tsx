
import { fetchShopInforPagination, fetchShopPagePagination } from "@/lib/redux/slice/shopSlice";
import { useAppDispatch } from "@/lib/redux/store";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import Cookies from 'js-cookie';
import { AdminPage } from "@/models/adminModel";
import { BiCalendarEdit } from "react-icons/bi";
import { fetchAdminPagePagination } from "@/lib/redux/slice/adminSlice";

export const QuantityCustomer = () => {
    const [items, setItems] = useState<AdminPage | null>(null);
    const dispatch = useAppDispatch();
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        try {
            const { uid } = await getAccessAndRefreshCookie();
            if (uid) {
                setUserId(uid);
            }

            const response = await dispatch(fetchAdminPagePagination());
            if (response.payload) {
                setItems(response.payload);
                Cookies.set('shopId', response.payload.id);
            }
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
        <Card className="xl:max-w-sm bg-orange-500 rounded-xl shadow-md px-2 w-full h-fit">
            <CardBody className="py-5 overflow-hidden">
                <div className="flex gap-2.5">
                    <BiCalendarEdit color="white" className="w-10 h-10" />
                    <div className="flex flex-col">
                        <span className="text-white text-xl">Tổng số khách hàng</span>
                        <span className="text-white text-md">{items?.totalCustomer} số khách</span>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
};
