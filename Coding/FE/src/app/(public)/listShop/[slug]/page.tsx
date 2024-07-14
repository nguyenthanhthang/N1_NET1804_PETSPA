'use client'
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchAllServiceInfoByShopId, fetchShopInfo, getNominationUser, fetchAllNominationByShopId } from "@/lib/redux/slice/userSlice";
import { shopInfor } from "@/models/shopModel";
import { allServicesPaginationData } from "@/models/bookingModels";
import DetailService from "@/components/serviceDetail/page";
import CreateNomiation from "@/components/createNomiation/page";
import { AllNominationOfShop, CheckNomi } from "@/models/userModels";
import DeleteNomination from "@/components/deleteNomination/page";
import getAccessAndRefreshCookie from "@/utilities/authUtils/getCookieForValidation";

export default function ProfileShopOwner({ params }: { params: { slug: string } }) {
    const [IdUser, setUid] = useState<number | null>(null);
    const [shopIn4, setShopIn4] = useState<shopInfor | any>();
    const [items, setItems] = useState<allServicesPaginationData[]>([]);
    const [allNomination, setAllNomination] = useState<AllNominationOfShop[]>([]);
    const [checkNomi, setcheckNomi] = useState<CheckNomi | any>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUid = async () => {
            try {
                const { uid } = await getAccessAndRefreshCookie();
                console.log('userId:', uid);
                if (uid) {
                    setUid(parseInt(uid));
                }
            } catch (error) {
                console.error('Error fetching UID:', error);
            }
        };
        fetchUid();
    }, []);

    const getNominationLabel = (nominationType: string) => {
        switch (nominationType) {
            case 'BAD':
                return 'TỆ';
            case 'NORMAL':
                return 'TẠM ỔN';
            case 'QUITE_GOOD':
                return 'ỔN';
            case 'REALLY_GOOD':
                return 'TUYỆT VỜI';
            default:
                return 'Không xác định';
        }
    };

    const fetchShopData = async () => {
        setLoading(true);
        try {
            const shopResponse = await dispatch(fetchShopInfo(params));
            if (shopResponse.payload) {
                setShopIn4(shopResponse.payload);
            }
            const serviceResponse = await dispatch(fetchAllServiceInfoByShopId(params));
            if (serviceResponse.payload) {
                setItems(serviceResponse.payload);
            }
            const nominationResponse = await dispatch(fetchAllNominationByShopId(params));
            if (nominationResponse.payload) {
                setAllNomination(nominationResponse.payload);
            }
            if (IdUser !== null) {
                const checkNomiResponse = await dispatch(getNominationUser(params));
                if (checkNomiResponse.payload) {
                    setcheckNomi(checkNomiResponse.payload);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShopData();
    }, [dispatch, params, IdUser]);

    return (
        <>
            <div className="container mt-5">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner />
                    </div>
                ) : (
                    <div className="flex justify-between">
                        <Card className="w-[500px]">
                            <CardHeader className="flex gap-2 ">
                                <Avatar
                                    className="w-20 h-20 text-large mr-5"
                                    radius="full"
                                    src="https://i.pinimg.com/564x/09/05/5b/09055b06494c0fb44e4c68f20123f88a.jpg"
                                />
                                <div className="flex flex-col">
                                    <p className="text-4xl font-extrabold text-orange-600 ">{shopIn4?.shopName}</p>
                                    <p className="text-xl text-default-500">{shopIn4?.shopTitle}</p>
                                    <p className="text-xl text-default-500">{shopIn4?.shopAddress}</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex items-center justify-around">
                                    <div className="flex items-center">
                                        <p className="text-xl font-light mr-1">Mở cửa:</p>
                                        <p className="text-xl font-normal ">{shopIn4?.openTime}</p>
                                    </div>
                                    <div className="flex items-center ">
                                        <p className="text-xl font-light mr-1">Đóng cửa:</p>
                                        <p className="text-xl font-normal ">{shopIn4?.closeTime}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="w-[300px] ">
                            <CardHeader>
                            </CardHeader>
                            <Divider />
                            <CardBody className="flex justify-center items-center">
                                <div className="">
                                    <div className="flex justify-start items-center">
                                        <p className="text-xl font-light mr-1">Dịch vụ: </p>
                                        <p className="text-xl font-normal">{shopIn4?.totalServices} dịch vụ</p>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <p className="text-xl font-light mr-1">Đánh giá: </p>
                                        <p className="text-xl font-normal">{shopIn4?.nomination} đánh giá</p>
                                    </div>
                                </div>
                            </CardBody>
                            <Divider />

                            <CardFooter className="flex justify-center text-center">
                                {checkNomi ? (
                                    <p className="text-xl text-orange-600 font-medium">Bạn đã đánh giá shop này</p>
                                ) : (
                                    <CreateNomiation shopData={shopIn4?.id} refreshData={fetchShopData} />
                                )}
                            </CardFooter>

                        </Card>
                    </div>
                )}

                <div className="relative">
                    <div className="flex w-full flex-col mt-5 ">
                        <Tabs color="success" aria-label="Options" className="flex justify-center ">
                            <Tab key="infor" title="Giới thiệu" className="px-12 py-5 text-xl ">
                                <Card>
                                    <CardBody className="p-10">
                                        <div>
                                            <p className="text-3xl font-medium text-orange-600">Giới thiệu</p>
                                            <p className="text-2xl font-normal ">{shopIn4?.shopDescription}</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="service" title="Dịch vụ" className="px-12 py-5 text-xl " >
                                <div className="mb-5">
                                    <div className="grid grid-cols-3 gap-4 ">
                                        {loading ? (
                                            <div className="flex justify-center items-center h-40">
                                                <Spinner />
                                            </div>
                                        ) : items.length === 0 ? (
                                            <div>Không có dịch vụ nào</div>
                                        ) : (
                                            items.map((item) => (
                                                <Card className="max-w-[400px]" key={item.id}>
                                                    <CardHeader className="flex gap-3">
                                                        <div className="flex flex-col">
                                                            <p className="text-2xl font-semibold">{item.serviceName}</p>
                                                            <p className="text-md text-orange-600">{item.shopName}</p>
                                                            <p className="text-md text-default-500">{item.address}</p>
                                                        </div>
                                                    </CardHeader>
                                                    <Divider />
                                                    <CardBody>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, index) => {
                                                                const ratingValue = index + 1;
                                                                return (
                                                                    <FaStar
                                                                        key={index}
                                                                        className="star"
                                                                        color={ratingValue <= item.nomination ? 'gold' : 'gray'}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                        <p className="text-xl font-medium">Giá: {item.price}</p>
                                                    </CardBody>
                                                    <Divider />
                                                    <CardFooter className="w-full">
                                                        <DetailService id={item.id} />
                                                    </CardFooter>
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </Tab>
                            <Tab key="feedback" title="Đánh giá" className="px-12 py-5 text-xl ">
                                <div className="mb-5">
                                    <div className="grid grid-cols-3 gap-4 ">
                                        {loading ? (
                                            <div className="flex justify-center items-center h-40">
                                                <Spinner />
                                            </div>
                                        ) : allNomination.length === 0 ? (
                                            <div>Không có đánh giá nào</div>
                                        ) : (
                                            allNomination.map((item) => (
                                                <Card key={item.id} className="w-full mt-4">
                                                    <CardHeader className="justify-between">
                                                        <div className="flex gap-5">
                                                            <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                                <h4 className="text-large font-bold leading-none text-default-600 uppercase">{item.userName}</h4>
                                                                <p className="font-semibold text-orange-600">{getNominationLabel(item.nominationType)}</p>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <Divider />
                                                    {IdUser === item.userId && (
                                                        <>
                                                            <CardBody>
                                                                <DeleteNomination params={item.id.toString()} refreshData={fetchShopData} />
                                                            </CardBody>
                                                        </>
                                                    )}
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
