export interface allBookingPaginationData {
    id: string,
    slug: string;
    localDate: string | undefined | null,
    status: string,
    serviceName: string | undefined | null,
    shopName: string | undefined | null,
    petName: string | undefined | null,
    timeSlotDto: {
        startLocalDateTime: string | undefined | null,
        endLocalDateTime: string | undefined | null,
    }

}
export interface UserInfor {
    id: string,
    username: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    profileImageUrl: string | undefined | null,
    coverImageUrl: string | undefined | null,
    birthday: string | undefined | null,

}
export interface passwordInfor {
    id: string,
    firstName: string,
    lastName: string,
    oldPassword: string | undefined | null,
    newPassword: string | undefined | null,
    confirmPassword: string | undefined | null,


}
export interface updateProfileInput {
    id: string,
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    email: string | undefined | null,
    phone: number | undefined | null,

}
export interface updatePasswordInput {
    id: string,
    oldPassword: string | undefined | null,
    newPassword: string | undefined | null,
    confirmPassword: string | undefined | null,

}
export interface updateProfileInputResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}

export interface updatePasswordInputResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}
export interface allBookingPaginationResponse {
    success: boolean;
    status: number;
    data: {
        data: allBookingPaginationData[] | undefined | null;
        totalCount: number;
        pageCount: number;
    };
}
export interface BookingDetail {
    id: string,
    bookingNote: string,
    status: string,
    localDate: string,
    startTime: string,
    endTime: string,
    shopId: string,
    shopName: string,
    shopAddress: string,
    userId: string,
    firstName: string,
    lastName: string,
    userName: string,
    serviceId: string,
    serviceName: string,
    typePet: string,
    petName: string,
    petWeight: number,

    done: boolean,
    canceled: boolean,

}
export interface createPetInput {
    id: string,
    userId: string,
    petName: string,
    petType: string,
    petAge: number,
    petGender: string,
    petWeight: number,
    petDescription: string,
    petPhoto: string,
    petNote: string,

}
export interface petCreateResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}
export interface allShopPaginationData {
    id: string,
    slug: string,
    shopName: string,
    shopAddress: string,
    shopPhone: string,
    shopEmail: string,
    area: string,
    shopDescription: string,
    openTime: string,
    closeTime: string,
    isAvailable: boolean,
    shopTitle: string,
    nomination: number,
    totalServices: number,
}
export interface detailShopPaginationData {
    id: string,
    slug: string,
    shopName: string,
    shopAdress: string,
    shopPhone: string,
    shopEmail: string,
    area: string,
    shopDescription: string,
    openTime: string,
    closeTime: string,
    isAvailable: boolean,
    shopTitle: string,
    nomination: number,
    totalServices: number,
}
export interface allServicePaginationData {
    id: string,
    slug: string,
    serviceName: string,
    price: string,
    address: string,
    nomination: number,


}

export interface allPetPaginationData {
    id: string,
    slug: string,
    petName: string,
    petType: string,
    petAge: number,
    petWeight: number,
    petGender: string,
    petDescription: string,
    petNote: string,
    petPhoto: string,
    ownerId: string,
    ownerName: string,
    doHaveUpcomingSchedule: boolean,

}
export interface allPetPaginationResponse {
    success: boolean;
    status: number;
    data: {
        data: allPetPaginationData[];
        totalCount: number;
        pageCount: number;
    };
}
export interface PetInfor {
    slug: string | undefined | null,
    userId: string,
    petName: string | undefined | null,
    petType: string | undefined | null,
    petAge: number | undefined | null,
    petGender: string | undefined | null,
    petWeight: number | undefined | null,
    petDescription: string | undefined | null,
    petPhoto: string | undefined | null,
    petNote: string | undefined | null,

}
export interface CancelBookingInput {
    bookingId: number,
    additionalMessage: string,


}
export interface cancelBookingResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}
export interface createFeedbackInput {
    serviceId: number,
    ratingType: string,
    content: string,

}
export interface createFeedbackResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}
export interface createNomiationInput {
    shopId: number,
    nominationType: string,


}
export interface AllNominationOfShop {
    id: number,
    userName: string,
    userId: number,
    nominationType: string,
}
export interface CheckNomi {
    id: number,
    shopid: number,
    userName: string,
    userId: number,
    nominationType: string,
}
export interface AllFeedbackOfServiceResponse {
    success: boolean;
    status: number;
    data: {
        data: AllNominationOfShop[];
        totalCount: number;
        pageCount: number;
    };
}