import React, { useState, useEffect } from 'react'
import Chart, { Props } from "react-apexcharts";
import {
    Chart as ChartJS,

    BarElement,
    CategoryScale,
    LinearScale,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useAppDispatch } from '@/lib/redux/store';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { fetchShopPagePagination } from '@/lib/redux/slice/shopSlice';
import { ShopPage } from '@/models/shopModel';
import Cookies from 'js-cookie';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
);

export const Steam = () => {
    const [items, setItems] = useState<ShopPage | null>(null);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { uid } = await getAccessAndRefreshCookie();
                if (uid) {
                    setUserId(uid);
                }

                const response = await dispatch(fetchShopPagePagination());
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

        fetchData();
    }, []); // Only run once on component mount

    console.log(' Booking', items?.monthlyBookings);

    const data = {
        labels: items?.monthlyBookings?.map(x => x.month),
        datasets: [{
            label: 'Bookings',
            data: items?.monthlyBookings?.map(y => y.bookings),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Số lần đặt lịch',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Bar data={data} height={400} options={options} />
            )}
        </div>
    );
};
