
'use client'
import React, { useEffect, useState } from "react";
import { fetchAllServicesPagination } from "@/lib/redux/slice/listAllServiceSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { allServicesPaginationData } from "@/models/bookingModels";
import { Card, CardHeader, CardBody, CardFooter, Divider, Spinner, Navbar, NavbarContent, NavbarItem, Button, Input } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { Select, SelectItem } from "@nextui-org/select";
import DetailService from "../serviceDetail/page";

interface Props {
    // Add any props if needed
}

const ListAllService: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const [activeFilter, setActiveFilter] = useState('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [allService, setAllService] = useState<allServicesPaginationData[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showAll, setShowAll] = useState(false);

    const fetchAllServices = async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchAllServicesPagination());
            const services: allServicesPaginationData[] = response.payload || [];
            setAllService(services);

            const uniqueCategories: string[] = Array.from(new Set(services.map((service: any) => service.categoryName)));
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const sortedServices = [...allService]
        .filter((service) => !selectedCategory || service.categoryName === selectedCategory)
        .sort((a, b) => {
            switch (sortOption) {
                case 'category-asc':
                    return a.categoryName.localeCompare(b.categoryName);
                case 'category-desc':
                    return b.categoryName.localeCompare(a.categoryName);
                case 'high':
                    return b.price - a.price;
                case 'low':
                    return a.price - b.price;
                case 'good':
                    return b.nomination - a.nomination;
                case 'bad':
                    return a.nomination - b.nomination;
                default:
                    return 0;
            }
        });

    useEffect(() => {
        fetchAllServices();
    }, [dispatch]);

    return (
        <div className="mb-5">
            <Navbar className="border-1 gap-5 rounded-sm mb-10">
                <NavbarContent className="hidden sm:flex justify-center" justify="center">
                    <NavbarItem className="mr-10">
                        <select
                            className={`w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm bg-gray-100`}
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            style={{ height: '45px' }}
                        >
                            <option value="">Tất cả</option>
                            {categories.map((category, index) => (
                                <option
                                    key={index}
                                    value={category}
                                    className={`bg-white ${activeFilter === category ? 'text-gray-900' : 'text-gray-500'} hover:bg-gray-200`}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </NavbarItem>
                    <NavbarItem className="mr-10">
                        <Select size="sm" label="Giá cả" className="w-52" onChange={(e) => handleSortChange(e.target.value)}>
                            <SelectItem key="">Không sắp xếp</SelectItem>
                            <SelectItem key="high">Từ cao đến thấp</SelectItem>
                            <SelectItem key="low">Từ thấp đến cao</SelectItem>
                        </Select>
                    </NavbarItem>
                    <NavbarItem className="mr-10">
                        <Select size="sm" label="Đánh giá" className="w-52" onChange={(e) => handleSortChange(e.target.value)}>
                            <SelectItem key="">Không sắp xếp</SelectItem>
                            <SelectItem key="good">Đánh giá cao</SelectItem>
                            <SelectItem key="bad">Đánh giá thấp</SelectItem>
                        </Select>
                    </NavbarItem>
                    <NavbarItem className="w-48">
                        <Input size="md" type="search" placeholder="Search"
                            endContent={
                                <Button size="sm" isIconOnly color="default" variant="light">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </Button>
                            } />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Spinner />
                </div>
            ) : (
                allService.length === 0 ? (
                    <div>Không có dịch vụ nào</div>
                ) : (
                    <div className="grid grid-cols-4 gap-4 container">
                        {sortedServices.map((item, index) => (
                            <Card className="max-w-[400px]" key={index}>
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-2xl font-semibold">{item.serviceName}</p>
                                        <p className="text-md text-orange-600">{item.shopName}</p>
                                        <p className="text-md text-default-500">{item.address}</p>
                                        <p className="text-md text-default-500">{item.categoryName}</p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <div className="flex">
                                        {[...Array(5)].map((_, idx) => (
                                            <FaStar
                                                key={idx}
                                                className="star"
                                                color={idx < item.nomination ? 'gold' : 'gray'}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xl font-medium">Giá: {item.price}</p>
                                </CardBody>
                                <Divider />
                                <CardFooter className="w-full">
                                    <DetailService id={item.id} />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default ListAllService;
