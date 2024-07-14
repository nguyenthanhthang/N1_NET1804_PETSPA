
import { fetchShopInforPagination, fetchShopPagePagination } from "@/lib/redux/slice/shopSlice";
import { useAppDispatch } from "@/lib/redux/store";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import Cookies from 'js-cookie';
import { AdminPage } from "@/models/adminModel";
import { fetchAdminPagePagination } from "@/lib/redux/slice/adminSlice";

export const QuantityShop = () => {
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
        <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-2 w-full h-fit">
            <CardBody className="py-5 overflow-hidden">
                <div className="flex gap-2.5">
                    <MdRateReview color="white" className="w-10 h-10" />
                    <div className="flex flex-col">
                        <span className="text-white text-xl">Tổng số Shop</span>
                        <span className="text-white text-md">{items?.totalShop} số shop</span>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
};
