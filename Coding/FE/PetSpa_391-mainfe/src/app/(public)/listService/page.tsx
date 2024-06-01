import CardService from "@/components/cardService/page";
import SortService from "@/components/sortService/page";


export default function BookingSpa() {
    return (
        <>
            <SortService />
            <div className="flex justify-center ">
                <div className="p-9 h-screen">
                    <CardService />
                </div>
            </div>
        </>
    )
}