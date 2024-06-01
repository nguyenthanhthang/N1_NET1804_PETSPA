
import MenuGuest from "@/components/menuGuest/page";
import TableSerivce from "@/components/tableService/page";

export default function Home() {
    return (
        <div>
            <div className="flex justify-center" style={{
                backgroundColor: "#fbfafa"
            }}>
                <div>
                    <MenuGuest />
                </div>
            </div>

            <div className="text-center py-3">
                <p className="text-5xl font-medium">Dịch vụ</p>
            </div>
            <div >
                <TableSerivce />
            </div>

        </div>
    );
}
