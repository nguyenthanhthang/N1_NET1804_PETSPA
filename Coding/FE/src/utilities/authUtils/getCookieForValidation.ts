'use server'

import { cookies } from 'next/headers';

const getAccessAndRefreshCookie = async () => {
    const cookieStore = cookies();

    const uid = cookieStore.get("userId")?.value;
    return { uid };
};

export default getAccessAndRefreshCookie;