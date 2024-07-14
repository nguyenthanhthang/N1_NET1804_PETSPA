export interface createServiceInput {
    userId: string,
    id: string,
    serviceCategoryId: number,
    serviceName: string,
    serviceDescription: string,
    price: number,
    minWeight: number,
    maxWeight: number,
    tags: string

}
export interface allOrderBookingPaginationData {
    id: string,
    status: string,
    customerFullName: string,
    localDate: string,
    timeSlotDto: {
        startLocalDateTime: string,
        endLocalDateTime: string,
    },
    serviceId: string,
    serviceName: string,
    shopId: string,
    shopName: string,
    petId: string,
    petName: string,
}
export interface allOrderBookingPaginationResponse {
    success: boolean;
    status: number;
    data: {
        data: allOrderBookingPaginationData[];
        totalCount: number;
        pageCount: number;
    };
}

export interface serviceCreateResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}

export interface getShopId {
    id: string,
}
export interface ServiceInfor {
    slug: string | undefined | null,
    userId: string | undefined | null,
    id: string,
    serviceName: string | undefined | null,
    serviceDescription: string | undefined | null,
    price: number | undefined | null,
    minWeight: number | undefined | null,
    maxWeight: number | undefined | null,
    nomination: number | undefined | null,
    tags: string | undefined | null
}
export interface shopInfor {
    id: string,
    shopName: string,
    shopAddress: string,
    role: string,
    firstName: string,
    lastName: string,
    shopEmail: string,
    area: string,
    shopDescription: string,
    openTime: string,
    closeTime: string,
    isAvailable: boolean,
    totalServices: number,
    nomination: number,
    shopTitle: string,
    shopPhone: string,
    profileImageUrl: string | undefined | null,
    coverImageUrl: string | undefined | null,
    birthday: string | undefined | null,

}
export interface ShopPage {
    id: string;
    totalServices: number;
    totalNominations: number;
    totalBookings: number;
    monthlyBookings: MonthlyBookingDto[];
}

export interface MonthlyBookingDto {
    month: string;
    bookings: number;
}

export interface ShopInput {
    id: string,
    shopName: string,
    shopAddress: string,
    shopPhone: string,
    area: string,
    shopDescription: string,
    openTime: string,
    closeTime: string,
    isAvailable: boolean,
    shopEmail: string,
    shopTitle: string,

}
export interface AllShopTimeSlotIn4 {
    shopId: string,
    id: string,
    startLocalTime: string,
    endLocalTime: string,
    description: string,
    totalSlot: number,
    availableSlot: number,
    usedSlot: number,
    status: boolean,

}
export interface CreateShopTimeSlotInput {
    shopId: string,
    timeSlotId: string,
    description: string,
    totalSlot: string,


}
export interface getAllTimeSlot {
    id: string,
    startLocalDateTime: string,
    endLocalDateTime: string,
}
export interface getAllTimeSlotResponse {
    success: boolean;
    status: number;
    data: {
        data: getAllTimeSlot[];
        totalCount: number;
        pageCount: number;
    };
}

export interface AllShopTimeSlotIn4Response {
    success: boolean;
    status: number;
    data: {
        data: AllShopTimeSlotIn4[];
        totalCount: number;
        pageCount: number;
    };
}
export interface AllFeedbackOfService {
    id: number,
    userId: string,
    userName: string,
    content: string,
    ratingType: string,
    localDateTime: string,
    edited: boolean,

}
export interface AllFeedbackOfServiceResponse {
    success: boolean;
    status: number;
    data: {
        data: AllFeedbackOfService[];
        totalCount: number;
        pageCount: number;
    };
}
export interface shopCreateResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}

export interface updatePasswordInputResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}
export interface updatePasswordShopInput {
    id: string,
    oldPassword: string | undefined | null,
    newPassword: string | undefined | null,
    confirmPassword: string | undefined | null,

}
export interface passwordShopInfor {
    id: string,
    firstName: string,
    lastName: string,
    oldPassword: string | undefined | null,
    newPassword: string | undefined | null,
    confirmPassword: string | undefined | null,


}
export interface allServicePaginationData {
    id: string,
    serviceName: string,
    categoryId: number,
    serviceDescription: string,
    price: number,
    minWeight: number,
    maxWeight: number,
    nomination: number,
    tags: string,


}
export interface BookingComplete {
    bookingId: number,
}