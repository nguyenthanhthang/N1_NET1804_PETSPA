'use client'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CreateShopTimeSlot from "@/components/createShopTimeSlot/page";
import { AllShopTimeSlotIn4 } from "@/models/shopModel";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchAllShopTimeSlotPagination, fetchShopInforPagination } from "@/lib/redux/slice/shopSlice";
import DeleteTimeSlot from "@/components/deleteTimeSlot/page";

export default function TimeSlot() {

    const [timeSlot, setTimeSlot] = useState<AllShopTimeSlotIn4[]>([]);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    console.log(timeSlot)
    useEffect(() => {
        fetchTimeSlots();
    }, [dispatch]);
    const fetchTimeSlots = async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchAllShopTimeSlotPagination());
            if (response.payload && Array.isArray(response.payload)) {
                setTimeSlot(response.payload);
            } else {
                console.error('Invalid payload format:', response.payload);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative">
            <p className="text-black text-3xl font-semibold mb-2">
                Thời gian hoạt động
            </p>
            <div className='flex justify-end my-2'>
                <CreateShopTimeSlot refetchTimes={fetchTimeSlots} />
            </div>
            <div>
                {loading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : timeSlot.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="text-2xl font-bold ">Shop chưa tạo khung giờ</p>
                    </div>
                ) : (
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Khung giờ</TableColumn>
                            <TableColumn>Thời gian</TableColumn>
                            <TableColumn>Tổng số Slot</TableColumn>
                            <TableColumn>Trạng thái</TableColumn>
                            <TableColumn>Hành động</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {timeSlot.map((slot) => (
                                <TableRow key={slot.id}>
                                    <TableCell>{slot.description}</TableCell>
                                    <TableCell>{slot.startLocalTime} - {slot.endLocalTime}</TableCell>
                                    <TableCell>{slot.totalSlot}</TableCell>
                                    <TableCell>{slot.status ? 'Hoạt động' : 'Không hoạt động'}</TableCell>
                                    <TableCell>
                                        <DeleteTimeSlot params={slot.id.toString()} refetchPets={fetchTimeSlots} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
