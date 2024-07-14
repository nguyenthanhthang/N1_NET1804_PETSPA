export interface createBookingInput {
    customerId: number,
    additionalMessage: string,
    serviceId: number,
    localDate: string,
    timeSlotDto: {
        startLocalDateTime: string,
        endLocalDateTime: string
    },
    petName: string,
    petAge: number,
    typePet: string,
    petWeight: number,
    petId: string,
    petGender: string,
}
export interface getTimeSlot {
    totalSlots: number,
    usedSlots: number,
    availableSlots: number,
    timeSlotDto: {
        startLocalDateTime: string,
        endLocalDateTime: string
    }
}


export interface allServicesPaginationData {
    id: string,
    slug: string,
    serviceName: string;
    price: number;
    address: string,
    nomination: number,
    shopName: string,
    categoryId: number,
    categoryName: string,
    shopOwner: {
        id: number,
        shopId: number;

    };
}
export interface allServicesPaginationResponse {
    success: boolean;
    status: number;
    data: {
        data: allServicesPaginationData[];
        totalCount: number;
        pageCount: number;
    };
}
export interface ServiceDetail {
    id: string;
    shopId: string;
    title: string;
    slug: string;
    serviceName: string,
    serviceDescription: string,
    minWeight: number,
    maxWeight: number,
    shopName: string,

}
export interface bookingCreateResponseSuccess {
    status: number;
    message: string;
    success: boolean;
}