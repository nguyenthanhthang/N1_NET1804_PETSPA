'use client';
import { Button, Chip, Input, Spinner, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CreatePet from "@/components/createPet/page";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";
import { FaEye } from "react-icons/fa";
import { MdChangeCircle, MdDelete } from "react-icons/md";
import { useAppDispatch } from "@/lib/redux/store";
import { allPetPaginationData } from "@/models/userModels";
import { fetchAllPetPagination } from "@/lib/redux/slice/userSlice";
import PetDetail from "@/components/petDetails/page";
import DeletePet from "@/components/deletePet/page";
import UpdatePet from "@/components/updatePet/page";

export default function ManagePet() {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const [pets, setPets] = useState<allPetPaginationData[]>([]);
    const [userId, setUserId] = useState<string>('');
    console.log(pets)

    const fetchPets = async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchAllPetPagination()).unwrap();
            setPets(response || []);
        } catch (error) {
            console.error('Error fetching pets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { uid } = await getAccessAndRefreshCookie();
                if (uid) {
                    setUserId(uid);
                }
            } catch (error) {
                console.error('Error fetching UID:', error);
            }

            await fetchPets();
        };

        fetchInitialData();
    }, [dispatch]);

    return (
        <div className="container py-2 pb-10 flex flex-col gap-4">
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
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-black">Thú cưng của tôi</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="flex relative justify-end flex-wrap gap-4 items-center">
                <div className="flex absolute flex-row gap-3.5 flex-wrap">
                    <CreatePet userId={userId} refetchPets={fetchPets} />
                </div>
            </div>

            <div className="w-[800px] mx-auto ">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner />
                    </div>
                ) : (
                    pets.length === 0 ? (
                        <div>Không có thú cưng nào</div>
                    ) : (
                        <Table aria-label="Example static collection table">
                            <TableHeader>
                                <TableColumn>Tên thú cưng</TableColumn>
                                <TableColumn>Loại thú cưng</TableColumn>
                                <TableColumn>Giới tính</TableColumn>
                                <TableColumn>Trạng thái</TableColumn>
                                <TableColumn>Hành động</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {pets.map((pet) => (
                                    <TableRow key={pet.id}>
                                        <TableCell>{pet.petName}</TableCell>
                                        <TableCell>{pet.petType === 'DOG' ? 'Chó' : (pet.petType === 'CAT' ? 'Mèo' : '')}</TableCell>
                                        <TableCell>{pet.petGender === 'Male' ? 'Đực' : (pet.petGender === 'Female' ? 'Cái' : '')}</TableCell>
                                        <TableCell>
                                            {pet.doHaveUpcomingSchedule ? (
                                                <Chip color="success">Đã có lịch đặt</Chip>
                                            ) : (
                                                <Chip color="warning">Chưa có lịch đặt</Chip>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <PetDetail params={pet} />
                                                <UpdatePet params={pet} refetchPets={fetchPets} />
                                                <DeletePet params={pet.id} refetchPets={fetchPets} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                )}
            </div>
        </div>
    );
}
