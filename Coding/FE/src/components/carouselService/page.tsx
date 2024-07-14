'use client';
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./carousel.css";
import { fetchAllServicesPagination } from "@/lib/redux/slice/listAllServiceSlice"; // Giả sử đường dẫn
import { useAppDispatch } from "@/lib/redux/store";
import CardService from "../cardService/page";
import { Spinner } from "@nextui-org/react";

export default function CarouselService() {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const dispatch = useAppDispatch();
    // console.log(services)
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await dispatch(fetchAllServicesPagination()).unwrap();
                setServices(response);
            } catch (error) {
                console.error('Failed to fetch services: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            fetchServices();
        }
    }, [dispatch, loading]);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="slider-container">
            {loading ? (
                <div className="flex justify-center py-3">
                    <Spinner />
                </div>
            ) : (
                <Slider {...settings} className="my-5">
                    {services.map((service, index) => (
                        <div className="my-5" key={index}>
                            <CardService service={service} />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}
