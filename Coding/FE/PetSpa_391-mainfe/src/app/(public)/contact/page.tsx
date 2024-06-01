// pages/contact.js
import Head from 'next/head';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Head>
                <title>Liên hệ với chúng tôi - Dịch vụ chăm sóc thú cưng</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-black text-white py-12 px-8 rounded-lg">
                        <h1 className="text-4xl font-bold mb-6">Dịch vụ chăm sóc thú cưng</h1>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md -mt-6">

                        <form>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="username" className="block mb-1">Tên người dùng</label>
                                    <input type="text" id="username" name="username" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Nhập  tên người dùng" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block mb-1">Số điện thoại</label>
                                    <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Nhập số điện thoại" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Nhập email" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-1">Tin nhắn</label>
                                <textarea id="message" name="message" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Nhập tin nhắn"></textarea>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                                Gửi tin nhắn
                            </button>
                        </form>
                        <div className="mt-8 text-sm text-gray-600">
                            <p>Privacy Policy, Modern Day Statement, Social Impact</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <a href="mailto:query@vfq.in" className="text-gray-600 hover:text-black">query@vfq.in</a>
                                <a href="https://www.vfq.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">www.vfq.com</a>
                                <a href="tel:+011-24542156" className="text-gray-600 hover:text-black">+011-24542156</a>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;