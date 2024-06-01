import { Avatar, Dropdown, Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import { IoSearchCircleOutline } from "react-icons/io5";
interface Props {
    children: React.ReactNode;
}
export default function NavbarShop({ children }: Props) {

    return (
        <>
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Navbar
                    isBordered
                    className="w-full"
                    classNames={{
                        wrapper: "w-full max-w-full",
                    }}
                >
                    <NavbarContent className="w-full max-md:hidden">
                        <Input
                            startContent={<IoSearchCircleOutline />}
                            isClearable
                            className="w-1/2"
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            placeholder="Search..."
                        />
                    </NavbarContent>
                    <NavbarContent
                        justify="end"
                        className="w-fit data-[justify=end]:flex-grow-0"
                    >
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="md" />
                    </NavbarContent>

                </Navbar>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </>
    )
}