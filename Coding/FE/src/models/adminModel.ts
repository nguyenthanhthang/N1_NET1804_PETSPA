export interface AccountInput {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string,
    phone: string

}



export interface shopCreateResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}
export interface allCusPaginationData {
    id: string,
    email: string,
    username: string,
    phone: string,
    role: string,
    firstName: string,
    lastName: string,
    profileImageUrl: string,
    coverImageUrl: string,
    birthday: string,
    status: boolean,
    totalAccount: number

}
export interface allTotalPaginationData {
    id: string,
    totalAccount: number

}
export interface AdminPage {
    id: string;
    totalServices: number;
    totalShop: number;
    totalCustomer: number;
    totalBookings: number;
    totalPets: number;
    monthlyBookings: MonthlyBookingDto[];
}

export interface MonthlyBookingDto {
    month: string;
    bookings: number;
}
export interface allShopPaginationData {
    id: string,
    email: string,
    username: string,
    phone: string,
    status: boolean
    totalAccount: number
}
export interface ShopInfor {
    slug: string | undefined | null,
    id: string | undefined | null,
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    email: string | undefined | null,
    username: string | undefined | null,
    phone: string | undefined | null
    status: boolean
}
export interface CusInfor {
    slug: string | undefined | null,
    id: string,
    email: string,
    username: string,
    phone: string,
    role: string,
    firstName: string,
    lastName: string,
    profileImageUrl: string,
    coverImageUrl: string,
    birthday: string,
    status: boolean
}


export interface allAccountShopPaginationResponse {
    success: boolean;
    status: number;
    data: {
        data: allShopPaginationData[];
        totalCount: number;
        pageCount: number;
    };
}