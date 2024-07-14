'use client';

import Image from 'next/image';
import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';
import bannerImg from "../../../public/assets/img/banner.svg";
import bannerImg1 from "../../../public/assets/img/123.jpg";
import bannerImg2 from "../../../public/assets/img/2.1.png";
import bannerImg3 from "../../../public/assets/img/1.1.png";
import bannerImg4 from "../../../public/assets/img/d2ca5c4241d1a00586193a8f93b8c8da.jpg";
import bannerImg5 from "../../../public/assets/img/4.png";
import bannerImg6 from "../../../public/assets/img/12.png";

import { useState } from 'react';
import Avt1 from "../../../public/assets/img/avt1.png";
import Avt2 from "../../../public/assets/img/avt2.png";
import Avt3 from "../../../public/assets/img/avt3.png";
import Avt4 from "../../../public/assets/img/avt4.jpg";
import Avt5 from "../../../public/assets/img/avt5.png";
import Avt7 from "../../../public/assets/img/avt6.png";
const Blog = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const [blogPosts] = useState([
        {
            title: 'Bí Quyết Chăm Sóc Mèo Đúng Cách',
            image: bannerImg3,
            avatar: Avt1,
            category: 'Chăm sóc',
            author: 'Tô Duy Hoàng',
            date: '30 Tháng 1, 2024',
            readTime: '10 phút',
        },
        {
            title: 'Lợi Ích Của Việc Cho Chó Đi Spa',
            image: bannerImg2,
            avatar: Avt2,
            category: 'Spa',
            author: 'Lê Nguyên Thiên An',
            date: '29 Tháng 1, 2024',
            readTime: '5 phút',

        },
        {
            title: 'Những Mẹo Chăm Sóc Thú Cưng Bạn Nên Biết',
            image: bannerImg1,
            avatar: Avt3,
            category: 'Chăm sóc',
            author: 'Lại Bá Anh',
            date: '25 Tháng 1, 2024',
            readTime: '8 phút',

        },
        {
            title: 'Cách Tắm Cho Thú Cưng Tại Nhà',
            image: bannerImg4,
            avatar: Avt4,
            category: 'Mẹo & Kinh nghiệm',
            author: 'Dương Thành Thoại',
            date: '26 Tháng 1, 2024',
            readTime: '15 phút',


        },
        {
            title: 'Thực Đơn Dinh Dưỡng Cho Chó',
            image: bannerImg5,
            avatar: Avt5,
            category: 'Chăm sóc',
            author: 'Ngô Anh Kiệt',
            date: '24 Tháng 1, 2024',
            readTime: '10 phút',


        },
        {
            title: 'Làm Sao Để Thú Cưng Ngủ Ngon Hơn?',
            image: bannerImg6,
            avatar: Avt7,
            category: 'Mẹo & Kinh nghiệm',
            author: 'Ngô Dật Khôi',
            date: '23 Tháng 1, 2024',
            readTime: '6 phút',


        },
    ]);

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        if (filter === 'all') {
            setShowAll(!showAll);
        } else {
            setShowAll(false);
        }
    };

    const filteredBlogPosts = activeFilter === 'all' ? blogPosts : blogPosts.filter(post => post.category === activeFilter);
    const blogPostsToShow = showAll ? filteredBlogPosts : filteredBlogPosts.slice(0, 3);

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold uppercase mb-8 text-center">Blog</h1>
                <p className="text-xl text-center mb-8">Chia sẻ những mẹo chăm sóc thú cưng, hướng dẫn spa, và câu chuyện truyền cảm hứng từ các chuyên gia.</p>
                <div className="flex justify-center mb-8">
                    <Button
                        className={`mx-2 ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        {showAll ? 'Ẩn bớt' : 'Tất cả'}
                    </Button>

                    <Button
                        className={`mx - 2 ${activeFilter === 'Chăm sóc' ? 'bg-green-500 text-white' : 'bg-white text-green-500 hover:bg-green-500 hover:text-white'}`}
                        onClick={() => handleFilterChange('Chăm sóc')}
                    >
                        Chăm sóc
                    </Button>
                    <Button
                        className={`mx-2 ${activeFilter === 'Spa' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                        onClick={() => handleFilterChange('Spa')}
                    >
                        Spa
                    </Button>
                    <Button
                        className={`mx-2 ${activeFilter === 'Mẹo & Kinh nghiệm' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 hover:bg-purple-500 hover:text-white'}`}
                        onClick={() => handleFilterChange('Mẹo & Kinh nghiệm')}
                    >
                        Mẹo & Kinh nghiệm
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {blogPostsToShow.map((post, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden h-full transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="relative h-64">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                />
                                <div className={`absolute top-0 left-0 px-4 py-2 rounded-br-lg ${post.category === 'Chăm sóc' ? 'bg-green-500' : post.category === 'Spa' ? 'bg-blue-500' : 'bg-purple-500'} text-white`}>
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
                                    <div className="flex items-center mb-4">
                                        <Image
                                            src={post.avatar}
                                            alt={post.author}
                                            width={50}
                                            height={60}
                                            className="rounded-full"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">{post.author}</span>
                                        <span className="ml-4 text-sm text-gray-600">{post.date} • {post.readTime}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                {!showAll && filteredBlogPosts.length > 3 && activeFilter !== 'all' && (
                    <div className="flex justify-center mt-8">
                        <Button onClick={() => setShowAll(true)}>Hiển thị tất cả</Button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Blog;
