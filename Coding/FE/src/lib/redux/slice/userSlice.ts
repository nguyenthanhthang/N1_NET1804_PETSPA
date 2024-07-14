
import { BookingComplete } from '@/models/shopModel';
import { AllNominationOfShop, CancelBookingInput, allBookingPaginationResponse, allPetPaginationResponse, cancelBookingResponseSuccess, createFeedbackInput, createFeedbackResponseSuccess, createNomiationInput, createPetInput, petCreateResponseSuccess, updatePasswordInput, updatePasswordInputResponseSuccess, updateProfileInput, updateProfileInputResponseSuccess } from '@/models/userModels';
import agent from '@/utilities/agent';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';


export interface UserState {
    allBookingPagination: allBookingPaginationResponse | null | undefined;
    allBookingFetchingStatus: string;
    allBookingFetchingError: boolean;
    allBookingFetchingLoading: boolean;
    allNominationOfShopPagination: AllNominationOfShop | null | undefined;
    allNominationOfShopFetchingStatus: string;
    allNominationOfShopFetchingError: boolean;
    allNominationOfShopFetchingLoading: boolean;
    allPetPagination: allPetPaginationResponse | null | undefined;
    allPetFetchingStatus: string;
    allPetFetchingError: boolean;
    allPetFetchingLoading: boolean;
    returnedData: any;
    returnedDataStatus: string;
    returnedDataError: boolean;
    returnedDataLoading: boolean;


}

const initialState: UserState = {

    allBookingPagination: null,
    allBookingFetchingStatus: 'idle',
    allBookingFetchingError: false,
    allBookingFetchingLoading: false,
    allPetPagination: null,
    allPetFetchingStatus: 'idle',
    allPetFetchingError: false,
    allPetFetchingLoading: false,
    allNominationOfShopPagination: null,
    allNominationOfShopFetchingStatus: 'idle',
    allNominationOfShopFetchingError: false,
    allNominationOfShopFetchingLoading: false,
    returnedData: null,
    returnedDataStatus: 'idle',
    returnedDataError: false,
    returnedDataLoading: false,
};

export const fetchAllBookingPagination = createAsyncThunk(
    'customer/fetchAllBookingPagination',
    async () => {
        try {
            const response = await agent.User.getallBooking();
            console.log(response)
            return response;

        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const fetchUserInforPagination = createAsyncThunk(
    'customer/UserInfor',
    async () => {
        try {
            const response = await agent.User.getProfileInfor();
            console.log(response)
            return response;

        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const patchUpdateProfile = createAsyncThunk(
    'customer/patchUpdateProfile',
    async ({ profileData }: { profileData: updateProfileInput }) => {
        try {
            const response = (await agent.User.updateProfile(
                profileData,
            )) as updateProfileInputResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const patchPasswordProfile = createAsyncThunk(
    'customer/patchUpdatePassword',
    async ({ profileData }: { profileData: updatePasswordInput }) => {
        try {
            const response = (await agent.User.updatePassword(
                profileData,
            )) as updatePasswordInputResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const fetchOrderBooking = createAsyncThunk(
    'id/fetchOrderBooking',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.getorderBooking(slug);

            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const getNominationUser = createAsyncThunk(
    'id/getNominationUser',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.getNominationOfUser(slug);

            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const postCancelBooking = createAsyncThunk(
    'customer/cancelBooking',
    async ({ cancelData }: { cancelData: CancelBookingInput }) => {
        try {
            const response = (await agent.User.deleteBooking(
                cancelData,
            )) as cancelBookingResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const createPet = createAsyncThunk(
    'customer/createPet',
    async ({ petData }: { petData: createPetInput }) => {
        try {
            const response = (await agent.User.createPet(
                petData,
            )) as petCreateResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);

export const updatePet = createAsyncThunk(
    'customer/updatePet',
    async ({ petData }: { petData: createPetInput }) => {
        try {
            const response = (await agent.User.updatePet(
                petData,
            )) as petCreateResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const fetchAllPetPagination = createAsyncThunk(
    'customer/fetchAllPetPagination',
    async () => {
        try {
            const response = await agent.User.getAllPet();
            return response;

        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const fetchAllShopPagination = createAsyncThunk(
    'customer/fetchAllPetPagination',
    async () => {
        try {
            const response = await agent.User.getAllShop();
            return response;

        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const fetchAllServiceInfoByShopId = createAsyncThunk(
    'test/fetchAllServiceInfoByShopId',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.getAllServiceByShopId(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const fetchShopInfo = createAsyncThunk(
    'shopOwner/fetchServiceInfo',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.getShopInfor(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);

export const fetchPetInfor = createAsyncThunk(
    'customer/fetchPetInfor',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.getPetInfor(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const deletePet = createAsyncThunk(
    'customer/fetchDeletePet',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.deletePet(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const deleteFeedback = createAsyncThunk(
    'customer/deleteFeedback',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.deleteFeedback(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);



export const createFeedback = createAsyncThunk(
    'customer/createFeedback',
    async ({ feedbackData }: { feedbackData: createFeedbackInput }) => {
        try {
            const response = (await agent.User.createFeedback(
                feedbackData,
            )) as createFeedbackResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const completedBooking = createAsyncThunk(
    'customer/completedBooking',
    async ({ completeData }: { completeData: BookingComplete }) => {
        try {
            const response = (await agent.User.completeBooking(
                completeData,
            )) as createFeedbackResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const createNomination = createAsyncThunk(
    'customer/createNomination',
    async ({ nominationData }: { nominationData: createNomiationInput }) => {
        try {
            const response = (await agent.User.createNomination(
                nominationData,
            )) as createFeedbackResponseSuccess;
            return response.message;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);
export const deleteNomination = createAsyncThunk(
    'customer/deleteNomination',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.deleteNomination(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);

export const fetchAllNominationByShopId = createAsyncThunk(
    'test/fetchAllNominationByShopId',
    async ({ slug }: { slug: string }) => {
        try {
            const response = await agent.User.getAllNomination(slug);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    message: error.response?.data.error.message,
                    status: error.response?.status,
                };
            }
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchAllBookingPagination.pending, (state) => {
            state.allBookingFetchingLoading = true;
            state.allBookingFetchingStatus = 'loading';
        });
        builder.addCase(fetchAllBookingPagination.fulfilled, (state, action) => {
            state.allBookingPagination = action.payload;
            state.allBookingFetchingLoading = false;
        });
        builder
            .addCase(fetchAllBookingPagination.rejected, (state) => {
                state.allBookingFetchingStatus = 'failed';
                state.allBookingFetchingError = true;
                state.allBookingFetchingLoading = false;
            });
        builder.addCase(fetchAllPetPagination.pending, (state) => {
            state.allPetFetchingLoading = true;
            state.allPetFetchingStatus = 'loading';
        });
        builder.addCase(fetchAllPetPagination.fulfilled, (state, action) => {
            state.allPetPagination = action.payload;
            state.allPetFetchingLoading = false;
        });
        builder
            .addCase(fetchAllPetPagination.rejected, (state) => {
                state.allPetFetchingStatus = 'failed';
                state.allPetFetchingError = true;
                state.allPetFetchingLoading = false;
            });
        builder.addCase(fetchAllNominationByShopId.pending, (state) => {
            state.allNominationOfShopFetchingLoading = true;
            state.allNominationOfShopFetchingStatus = 'loading';
        });
        builder.addCase(fetchAllNominationByShopId.fulfilled, (state, action) => {
            state.allNominationOfShopPagination = action.payload;
            state.allNominationOfShopFetchingLoading = false;
        });
        builder
            .addCase(fetchAllNominationByShopId.rejected, (state) => {
                state.allNominationOfShopFetchingStatus = 'failed';
                state.allNominationOfShopFetchingError = true;
                state.allNominationOfShopFetchingLoading = false;
            }); fetchAllNominationByShopId


    },
});


export const userReducer = userSlice.actions;

export default userSlice.reducer;