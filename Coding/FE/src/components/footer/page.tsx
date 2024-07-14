import React from "react";
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div>
                        <span className="text-xl font-mono whitespace-nowrap">GitHub </span>
                    </div>
                    <div>
                        <h2 className="mb-4 text-sm font-semibold uppercase">DỊCH VỤ </h2>
                        <ul className="text-gray-400">
                            <li className="mb-2">
                                <a href="#" className="hover:text-white">
                                    Dịch vụ tắm rửa
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-white">
                                    Dịch vụ làm đẹp
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-white">
                                    Dịch vụ mát xa
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-white">
                                    Dịch vụ mát xa đặc biệt
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-white">
                                    Khách sạn thú cưng
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-white">
                                    See more
                                </a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h2 className="mb-4 text-sm font-semibold uppercase">TRANG CHỦ </h2>
                        <ul className="text-gray-400">
                            <li className="mb-2">
                                <Link href="/" className="hover:text-white">
                                    Khám phá
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/" className="hover:text-white">
                                    Dịch vụ nổi bật
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/" className="hover:text-white">
                                    Blog
                                </Link>
                            </li>
                            <li className="mb-2">
                                <a href="aboutUs" className="hover:text-white">
                                    Về chúng tôi
                                </a>
                            </li>

                        </ul>
                    </div>


                    <div>
                        <h2 className="mb-4 text-sm font-semibold uppercase">LIÊN HỆ</h2>
                        <ul className="text-gray-400">
                            <li className="mb-2">Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000</li>
                            <li className="mb-2">
                                <a href="contact" className="hover:text-white">
                                    Trò chuyện với chúng tôi
                                </a>
                            </li>
                            <li className="mb-2">0706045758</li>
                            <li className="mb-2">duyhoangto@gmail.com</li>
                        </ul>
                    </div>
                </div>


                <hr className="my-4 border-gray-600" />


                <div className="flex flex-col md:flex-row justify-between items-center">
                    <span className="text-sm text-gray-400 mb-4 md:mb-0">
                        &copy;2024, PET SPA - SWP 391.
                    </span>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=100028204926907" className="text-gray-400 hover:text-white">
                            <FaFacebook className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://github.com/Andy-doit/PetSpa_391" className="text-gray-400 hover:text-white">
                            <FaGithub className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://www.instagram.com/duyhoangto.37/" className="text-gray-400 hover:text-white">
                            <FaInstagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white">
                            <FaLinkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    );
}