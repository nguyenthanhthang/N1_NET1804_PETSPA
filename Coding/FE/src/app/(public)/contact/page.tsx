'use client';
import React from 'react';
import { FaComment, FaHeadset, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ContactUs = () => {
    const [isOpenArray, setIsOpenArray] = useState([false, false, false, false, false, false, false]);
    const [showMore, setShowMore] = useState(false);
    const toggleAnswer = (index: number) => {
        setIsOpenArray((prevState) =>
            prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        );
    };
    return (

        <div className='bg-white p-8 bg-cover bg-center min-h-screen  items-center justify-center' >
            <div className='text-center'>
                <h2 className='text-6xl font-bold mb-8 mx-auto'>Liên hệ với chúng tôi </h2>
                <p className='text-2xl text-gray-600 mb-12 mx-auto max-w-2xl'>hãy cho chúng tôi biết chúng tôi có thể giúp gì được cho bạn</p>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                    <div className='border rounded-lg p-8 py-16'>
                        <div className='flex flex-col space-y-6'>
                            <FaComment className='text-5xl text-gray-400 mb-6 mx-auto' />
                            <div className='text-center'>
                                <h3 className='text-2xl font-semibold'>Trò chuyện để bán hàng</h3>
                                <p className='text-lg text-gray-600'>Nói chuyện với nhóm thân thiện của chúng tôi.</p>
                                <p className='text-lg text-blue-600'>duyhoangto2003@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded-lg p-8 py-16'>
                        <div className='flex flex-col space-y-6'>
                            <FaHeadset className='text-5xl text-gray-400 mb-6 mx-auto' />
                            <div className='text-center'>
                                <h3 className='text-2xl font-semibold'>Trò chuyện để hỗ trợ</h3>
                                <p className='text-lg text-gray-600'>Chúng tôi ở đây để giúp đỡ.</p>
                                <p className='text-lg text-blue-600'>hoangtdse170030@fpt.edu.vn
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded-lg p-8 py-16'>
                        <div className='flex flex-col space-y-6'>
                            <FaPhone className='text-5xl text-gray-400 mb-6 mx-auto' />
                            <div className='text-center'>
                                <h3 className='text-2xl font-semibold'>Gọi chúng tôi</h3>
                                <p className='text-lg text-gray-600'>Thứ 2 đến Thứ 6 từ 8am đến 17pm</p>
                                <p className='text-lg text-blue-600'>0706045758</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-12 max-w-4xl mx-auto'>
                <h2 className='text-4xl font-bold mb-8 text-center'>Câu hỏi thường gặp</h2>
                <div className='border rounded-lg p-6'>
                    <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(0)}>
                        <div className='flex items-center'>
                            <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                            <h3 className='text-lg font-semibold'>Câu hỏi 1 : Làm thế nào tôi có thể đảm bảo rằng các dịch vụ chăm sóc thú cưng trên nền tảng của bạn là an toàn và chất lượng cao?</h3>

                        </div>
                        {isOpenArray[0] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                    </div>
                    {isOpenArray[0] && <p className='mt-4 text-gray-600'>Chúng tôi luôn đặt sự an toàn và chất lượng của dịch vụ lên hàng đầu. Tất cả các cửa hàng đăng dịch vụ trên nền tảng của chúng tôi đều phải tuân thủ các tiêu chuẩn nghiêm ngặt về chăm sóc thú cưng, bao gồm sử dụng các sản phẩm và phương pháp an toàn, có đội ngũ nhân viên được đào tạo chuyên nghiệp, và cung cấp môi trường làm việc sạch sẽ, thân thiện. Chúng tôi cũng khuyến khích khách hàng đọc đánh giá và phản hồi từ người dùng khác trước khi lựa chọn dịch vụ.</p>}
                </div>
                <div className='border rounded-lg p-6 mt-4'>
                    <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(1)}>
                        <div className='flex items-center'>
                            <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                            <h3 className='text-lg font-semibold'>Câu hỏi 2 : Tôi có thể tìm kiếm và đặt lịch dịch vụ chăm sóc thú cưng trực tuyến trên nền tảng của bạn không?</h3>
                        </div>
                        {isOpenArray[1] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                    </div>
                    {isOpenArray[1] && <p className='mt-4 text-gray-600'>Đúng vậy, nền tảng của chúng tôi cung cấp một giao diện thuận tiện để bạn có thể dễ dàng tìm kiếm và đặt lịch dịch vụ chăm sóc thú cưng. Bạn có thể lọc tìm kiếm theo địa điểm, loại dịch vụ, giá cả, và xem đánh giá từ người dùng khác. Sau khi lựa chọn dịch vụ phù hợp, bạn có thể đặt lịch và thanh toán trực tuyến một cách nhanh chóng và tiện lợi.</p>}
                </div>
                <div className='border rounded-lg p-6 mt-4'>
                    <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(2)}>
                        <div className='flex items-center'>
                            <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                            <h3 className='text-lg font-semibold'>Câu hỏi 3 : Tôi có thể nhận được tư vấn và hỗ trợ từ các chuyên gia chăm sóc thú cưng trên nền tảng của bạn không?</h3>
                        </div>
                        {isOpenArray[2] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                    </div>
                    {isOpenArray[2] && <p className='mt-4 text-gray-600'>  Chúng tôi hiểu rằng việc chăm sóc thú cưng đôi khi có thể gặp phải những thách thức và câu hỏi. Vì vậy, chúng tôi cung cấp một kênh tư vấn trực tuyến để khách hàng có thể trao đổi với các chuyên gia chăm sóc thú cưng giàu kinh nghiệm. Bạn có thể đặt câu hỏi, yêu cầu lời khuyên hoặc tư vấn về việc chăm sóc, dinh dưỡng, hành vi, và sức khỏe của thú cưng của mình.</p>}
                </div>
                <div className='border rounded-lg p-6 mt-4'>
                    <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(3)}>
                        <div className='flex items-center'>
                            <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                            <h3 className='text-lg font-semibold'>Câu hỏi 4 : Làm thế nào để đảm bảo rằng dịch vụ chăm sóc thú cưng trên nền tảng của bạn phù hợp với nhu cầu và ngân sách của tôi?</h3>
                        </div>
                        {isOpenArray[3] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                    </div>
                    {isOpenArray[3] && <p className='mt-4 text-gray-600'>Chúng tôi hiểu rằng mỗi chủ nhân thú cưng có nhu cầu và ngân sách khác nhau. Vì vậy, nền tảng của chúng tôi cung cấp một loạt các lựa chọn dịch vụ chăm sóc thú cưng đa dạng, từ dịch vụ cơ bản như tắm gội, cắt tỉa lông cho đến các dịch vụ chuyên sâu hơn như phẫu thuật, chăm sóc y tế. Bạn có thể lọc tìm kiếm theo giá cả, xem đánh giá và lựa chọn dịch vụ phù hợp nhất với nhu cầu và ngân sách của mình.</p>}
                </div>
                {showMore ? (
                    <>
                        <div className='border rounded-lg p-6 mt-4'>
                            <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(4)}>
                                <div className='flex items-center'>
                                    <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                                    <h3 className='text-lg font-semibold'>Câu hỏi 5: Tôi có thể đặt lịch dịch vụ chăm sóc thú cưng trực tiếp trên nền tảng của bạn hay cần đến trực tiếp cửa hàng?</h3>
                                </div>
                                {isOpenArray[4] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                            </div>
                            {isOpenArray[4] && <p className='mt-4 text-gray-600'>Bạn có thể đặt lịch dịch vụ chăm sóc thú cưng một cách thuận tiện trực tiếp trên nền tảng của chúng tôi. Sau khi tìm kiếm và lựa chọn dịch vụ phù hợp, bạn chỉ cần nhấn vào nút Đặt lịch và chọn ngày giờ phù hợp với lịch trình của mình. Toàn bộ quy trình đặt lịch và thanh toán có thể được thực hiện trực tuyến, không cần phải đến trực tiếp cửa hàng.</p>}
                        </div>

                        <div className='border rounded-lg p-6 mt-4'>
                            <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(5)}>
                                <div className='flex items-center'>
                                    <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                                    <h3 className='text-lg font-semibold'>Câu hỏi 6:  Tôi có thể xem đánh giá và nhận xét của khách hàng khác về các dịch vụ chăm sóc thú cưng trên nền tảng của bạn không?
                                    </h3>
                                </div>
                                {isOpenArray[5] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                            </div>
                            {isOpenArray[5] && <p className='mt-4 text-gray-600'>Chắc chắn rồi! Chúng tôi khuyến khích khách hàng đọc đánh giá và nhận xét của những người đã sử dụng dịch vụ trước khi quyết định lựa chọn. Trên trang chi tiết của mỗi dịch vụ, bạn có thể xem điểm đánh giá trung bình cũng như các nhận xét cụ thể từ khách hàng khác. Điều này giúp bạn có cái nhìn rõ ràng hơn về chất lượng dịch vụ và trải nghiệm của những người đã sử dụng trước đó.</p>}
                        </div>

                        <div className='border rounded-lg p-6 mt-4'>
                            <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswer(6)}>
                                <div className='flex items-center'>
                                    <FaQuestionCircle className='text-2xl text-gray-400 mr-4' />
                                    <h3 className='text-lg font-semibold'>Câu hỏi 7: Tôi có thể hủy hoặc thay đổi lịch dịch vụ chăm sóc thú cưng đã đặt trên nền tảng của bạn không?</h3>
                                </div>
                                {isOpenArray[6] ? <FaChevronUp className='text-gray-400' /> : <FaChevronDown className='text-gray-400' />}
                            </div>
                            {isOpenArray[6] && <p className='mt-4 text-gray-600'> Chúng tôi hiểu rằng đôi khi có thể có những thay đổi trong lịch trình của bạn. Vì vậy, chúng tôi cung cấp tính năng để bạn có thể hủy hoặc thay đổi lịch dịch vụ chăm sóc thú cưng đã đặt trước đó. Tuy nhiên, việc hủy hoặc thay đổi lịch cần được thực hiện trước một khoảng thời gian nhất định  để tránh bị tính phí. Bạn có thể dễ dàng quản lý lịch đã đặt trực tiếp trên nền tảng của chúng tôi.</p>}
                        </div>

                    </>

                ) : null}
                <div className='flex justify-center mt-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? 'Ẩn bớt' : 'Xem thêm'}
                    </button>
                </div>
            </div>
        </div >

    );
};

export default ContactUs;