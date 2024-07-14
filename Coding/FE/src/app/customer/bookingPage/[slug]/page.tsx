'use client'
import 'intro.js/introjs.css';
import { Card, Image, Button, Checkbox, DatePicker, Input, Textarea, Link, Select, SelectItem, cn, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { ServiceDetail, createBookingInput, getTimeSlot } from "@/models/bookingModels";
import { useAppDispatch } from '@/lib/redux/store';
import { createBooking, fetchServiceDetail, fetchTimeSlot } from '@/lib/redux/slice/listAllServiceSlice';
import getAccessAndRefreshCookie from '@/utilities/authUtils/getCookieForValidation';
import { useRouter } from 'next/navigation';
import { allPetPaginationData } from '@/models/userModels';
import { fetchAllPetPagination } from '@/lib/redux/slice/userSlice';



export default function BookingPage(
    { params }: { params: { slug: string } }
) {
    const [userId, setUid] = useState<string>('');
    useEffect(() => {
        const fetchUid = async () => {
            try {
                const { uid } = await getAccessAndRefreshCookie();
                console.log('userId:', uid);
                if (uid) {
                    setUid(uid);

                }
            } catch (error) {
                console.error('Error fetching UID:', error);
            }
        };
        fetchUid();
    }, [userId]);
    const [showNote, setShowNote] = useState(false);
    const [service, setService] = useState<ServiceDetail | any>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const serviceDetail = async () => {
            const response = await dispatch(fetchServiceDetail(params));
            if (response.payload) {
                setService(response.payload)

                setBookingData(prevData => ({
                    ...prevData,
                    customerId: parseInt(userId),
                }));
            }
        }
        serviceDetail();
    }, [dispatch, userId]);
    // console.log(service)
    const [pets, setPets] = useState<allPetPaginationData[]>([]);
    useEffect(() => {
        const allPet = async () => {
            const response = await dispatch(fetchAllPetPagination());
            setPets(response.payload || []);
        }
        allPet();
    }, [dispatch]);
    console.log(pets)
    const [bookingData, setBookingData] = useState<createBookingInput>({
        customerId: parseInt(userId),
        additionalMessage: '',
        serviceId: parseInt(params.slug),
        localDate: '',
        timeSlotDto: {
            startLocalDateTime: '',
            endLocalDateTime: ''
        },
        petName: '',
        petAge: 0,
        typePet: 'DOG',
        petWeight: 0,
        petId: '',
        petGender: '',
    });

    const router = useRouter();

    const handleCreateBooking = async () => {
        await sessionStorage.setItem('bookingValues', JSON.stringify(bookingData));
        sessionStorage.setItem('service', JSON.stringify(service));
        router.replace('/customer/confirmInfor')

    };
    console.log(bookingData);
    const handleInputChange = (fieldName: string, newValue: string | number) => {
        setBookingData(prevData => ({
            ...prevData,
            [fieldName]: newValue
        }));
    };
    const handleDateChange = async (newDate: CalendarDate) => {
        const dateOnly = `${newDate.year}-${("0" + newDate.month).slice(-2)}-${("0" + newDate.day).slice(-2)}`;
        console.log(dateOnly)
        const response = await dispatch(fetchTimeSlot({ params: params.slug, localDate: dateOnly }));
        if (response.payload) {
            setTimeSlot(response.payload);
            console.log(response.payload)
        }
        setBookingData(prevData => ({
            ...prevData,
            localDate: dateOnly
        }));
        setShowNote(true);
    };
    const [isSelected, setIsSelected] = useState('');

    const handleCheckboxChange = (selected: any) => {
        setIsSelected(selected);
    };
    const [selectedPetId, setSelectedPetId] = useState(null);

    const handlePetCheckChange = (petId: any) => {
        const selectedPet = pets.find(pet => pet.id === petId);
        if (selectedPet) {
            setBookingData(prevData => ({
                ...prevData,
                petId: selectedPet.id,
                petName: selectedPet.petName,
                petType: selectedPet.petType,
                petAge: selectedPet.petAge,
                petWeight: selectedPet.petWeight,
                petGender: selectedPet.petGender,
            }));
        }
        setSelectedPetId(petId);
    };
    const [timeSlot, setTimeSlot] = useState<getTimeSlot[] | any>([]);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
    // console.log(timeSlot)
    const handleSlotClick = (index: number) => {
        setSelectedSlotIndex(index);
        const selectedSlot = timeSlot[index];
        console.log('Selected slot:', selectedSlot);
        if (selectedSlot) {
            console.log('Updating booking data with selected slot:', selectedSlot);
            setBookingData(prevData => ({
                ...prevData,
                timeSlotDto: {
                    startLocalDateTime: selectedSlot.timeSlotDto.startLocalDateTime,
                    endLocalDateTime: selectedSlot.timeSlotDto.endLocalDateTime
                }
            }));
        } else {
            console.log('Selected slot is undefined or null.');
        }
    };



    return (

        <div className="container w-full mb-4 mt-3">
            {service && (
                <div>
                    <div className="py-2">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Trang chủ
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-black">Dịch vụ</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-black">{service.serviceName}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

            )}



            <div className="justify-around">
                {service && (
                    <div className="w-full  ">
                        <div className='flex text-center items-center justify-center  rounded-md '>
                            <div>
                                <div>
                                    <h1 className='text-4xl uppercase text-orange-600 font-semibold'>{service.serviceName}</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                )}


                <div className="w-full px-4 "
                    style={{
                        backgroundImage: 'url("https://i.pinimg.com/564x/a6/af/f1/a6aff11f5a7a2a8120302403328af68d.jpg")',
                        backgroundRepeat: 'no-repeat',

                    }}
                >
                    <div className='mb-4 pt-5 flex justify-center'>
                        <Checkbox
                            classNames={{
                                base: cn(
                                    "inline-flex w-[300px] max-w-md bg-content2",
                                    "hover:bg-content3 items-center justify-start",
                                    "cursor-pointer rounded-xl gap-2 p-4 border-2 border-transparent mr-10",
                                    "data-[selected='petsOwned']:border-primary",
                                ),
                                label: "w-full",
                            }}
                            isSelected={isSelected === 'petsOwned'}
                            onValueChange={() => handleCheckboxChange('petsOwned')}

                        >
                            <div className="w-full flex justify-between gap-2">
                                <p>Thú cưng bạn đã có</p>
                            </div>
                        </Checkbox>
                        <Checkbox

                            classNames={{
                                base: cn(
                                    "inline-flex w-[300px] max-w-md bg-content2",
                                    "hover:bg-content3 items-center justify-start",
                                    "cursor-pointer rounded-xl gap-2 p-4 border-2 border-transparent",
                                    "data-[selected='createPet']:border-primary",
                                ),
                                label: "w-full",
                            }}
                            isSelected={isSelected === 'createPet'}
                            onValueChange={() => handleCheckboxChange('createPet')}
                        >
                            <div className="w-full flex justify-between gap-2">
                                <p>Tạo thú cưng mới</p>
                            </div>
                        </Checkbox>
                    </div>
                    {/* Pet */}
                    {isSelected === 'createPet' && (
                        <div>
                            <div className='mb-2 '>
                                <div className=" flex  justify-center">
                                    <div className='mr-10'>
                                        <p className="text-1xl font-medium mb-2">Tên thú cưng</p>
                                        <div className="w-full">
                                            <Input
                                                className="w-[300px]"
                                                onChange={(e) => handleInputChange('petName', e.target.value)}
                                                type="Petname"
                                                label="Tên thú cưng"
                                            />


                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-1xl font-medium mb-2">Cân nặng</p>
                                        <div className="w-full">
                                            <Input
                                                className="w-[300px]"
                                                onChange={(e) => handleInputChange('petWeight', parseFloat(e.target.value))}
                                                type="Petweight"
                                                label="Cân nặng"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='mb-2'>
                                <div className=" flex  justify-center">
                                    <div className='mr-10'>
                                        <p className="text-1xl font-medium mb-2">Tuổi thú cưng</p>
                                        <div className="w-full">
                                            <Input
                                                className="w-[300px]"
                                                onChange={(e) => handleInputChange('petAge', parseInt(e.target.value))}
                                                type="Petage"
                                                label="Tuổi"
                                            />


                                        </div>
                                    </div>
                                    <div>
                                        <div >
                                            <p className="text-1xl font-medium mb-2">Giới tính</p>
                                            <div className="w-full">
                                                <Select
                                                    label="Giới tính"
                                                    className="w-[300px]"
                                                    onChange={(e) => handleInputChange('petGender', e.target.value)}
                                                >
                                                    <SelectItem key="Male" value="Male"
                                                    >
                                                        Đực
                                                    </SelectItem>
                                                    <SelectItem key="Female" value="Female"
                                                    >
                                                        Cái
                                                    </SelectItem>
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='mb-2'>
                                <div className=" flex  justify-center">
                                    <div className='mr-10'>
                                        <p className="text-1xl font-medium mb-2">Mô tả</p>
                                        <div className="w-full">
                                            <Input
                                                onChange={(e) => handleInputChange('petDescription', e.target.value)}
                                                type="petDescription"
                                                label="Mô tả"
                                                className="w-[300px]"
                                            />


                                        </div>
                                    </div>
                                    <div>
                                        <div className="ml-2">
                                            <p className="text-1xl font-medium mb-2">Loại thú cưng</p>
                                            <div className="w-full">
                                                <Select label="Loại thú cưng" className="w-[300px]"
                                                    onChange={(e) => handleInputChange('petType', e.target.value)}
                                                >
                                                    <SelectItem key="DOG">Chó</SelectItem>
                                                    <SelectItem key="CAT">Mèo</SelectItem>
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='mb-2'>
                                <div className=" flex  justify-center">
                                    <div className='w-1/2'>
                                        <p className="text-1xl font-medium mb-2">Ghi chú</p>
                                        <div className="w-full">

                                            <Textarea
                                                onChange={(e) => handleInputChange('additionalMessage', e.target.value)}
                                                label="Ghi chú"
                                                placeholder="Ghi chú về thú cưng của bạn"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    {isSelected === 'petsOwned' && (
                        <div className='flex justify-center'>
                            {pets && pets.length > 0 ? (
                                <div className='mb-2'>
                                    {pets.map((petinfor) => (
                                        <div key={petinfor.id} className='mb-1'>
                                            <Checkbox
                                                isSelected={selectedPetId === petinfor.id}
                                                onValueChange={() => handlePetCheckChange(petinfor.id)}
                                                classNames={{
                                                    base: `inline-flex w-[400px] max-w-md mt-3 bg-content3 hover:bg-content3 items-center justify-start cursor-pointer rounded-xl gap-2 p-4 border-2 border-transparent mr-10 ${petinfor.petType === 'CAT' ? 'bg-cat-image' : petinfor.petType === 'DOG' ? 'bg-dog-image' : ''}`,
                                                    label: "w-full",
                                                }}
                                            >
                                                <div className="w-full flex justify-between bg-white bg-opacity-85 p-1 rounded-lg">
                                                    <div className='flex '>
                                                        <p className='mr-2 '>Tên thú cưng: </p>
                                                        <p className='font-bold '>{petinfor.petName}</p>
                                                    </div>
                                                    <div className='flex '>
                                                        <p className='mr-2'>Loại thú cưng: </p>
                                                        <p className='font-bold'> {petinfor.petType === 'DOG' ? 'Chó' : (petinfor.petType === 'CAT' ? 'Mèo' : '')}</p>
                                                    </div>
                                                </div>
                                            </Checkbox>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>Không có thú cưng nào</div>
                            )}
                        </div>
                    )}

                    {/* Pet */}
                    <div className='mb-2'>
                        <div className=" flex  justify-center">
                            <div className='w-1/2'>
                                <p className="text-1xl font-medium mb-2">Ghi chú cho shop</p>
                                <div className="w-full">

                                    <Textarea
                                        onChange={(e) => handleInputChange('additionalMessage', e.target.value)}
                                        label="Ghi chú"
                                        placeholder="Những điều bạn muốn nhắn gửi đến shop"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className=" flex justify-center  ">
                            <div className="w-1/2 ">
                                <p className="text-1xl font-medium mb-2">Chọn ngày</p>
                                <DatePicker
                                    label="Chọn ngày"
                                    className="w-full"
                                    onChange={handleDateChange}
                                    minValue={today(getLocalTimeZone())}
                                    defaultValue={today(getLocalTimeZone())}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className=" flex justify-center  ">
                            <div className='w-1/2'>
                                <p className="text-1xl font-medium mb-2">Khung giờ</p>
                                <div className="w-full flex justify-around" >
                                    {timeSlot.map((slot: getTimeSlot, index: number) => (

                                        <Button
                                            key={index}
                                            onClick={() => handleSlotClick(index)}
                                            color={slot.availableSlots === 0 ? 'warning' : (selectedSlotIndex === index ? 'success' : 'default')}
                                            disabled={slot.availableSlots === 0}
                                        >
                                            {`${slot.timeSlotDto.startLocalDateTime} - ${slot.timeSlotDto.endLocalDateTime}`}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                        </div>
                        {showNote && (
                            <div className="flex justify-center mt-5">
                                <Card className="w-[350px] px-5 py-2">
                                    <div className='text-center'>
                                        <div className="flex">
                                            <p className="font-bold mr-2 text-default-600">Màu xám:</p>
                                            <p>là những khung giờ trống</p>
                                        </div>
                                        <div className="flex">
                                            <p className="font-bold mr-2 text-orange-600">Màu Cam:</p>
                                            <p>là những khung giờ hết chỗ</p>
                                        </div>
                                        <div className="flex">
                                            <p className="font-bold mr-2 text-green-600">Màu xanh:</p>
                                            <p>khi bạn chọn 1 khung giờ</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>

                    <div className='mt-11 flex justify-center'>
                        <Button
                            onClick={handleCreateBooking}
                            type="submit"
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-1/2"
                        >
                            Đặt lịch
                        </Button>
                    </div>
                </div>

            </div>
        </div >
    )
}