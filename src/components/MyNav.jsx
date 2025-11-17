import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Skeleton,
} from "@heroui/react";

import { RiMessage2Fill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";

import { Link } from "react-router-dom";

import Navlogo from "../../src/assets/logo.png";

import { Search } from "lucide-react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { userContext } from "../context/UserContext";

export default function MyNav() {
  const { token, setToken, userData, isLoading } = useContext(authContext);
  // const { userData } = useContext(userContext);

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }
  return (
    <Navbar isBordered maxWidth="full" className="px-16">
      <NavbarContent justify="start">
        <Link to={"/home"}>
          <NavbarBrand className="mr-4">
            <img src={Navlogo} width={40} alt="logo" />
            <span className="font-bold ms-5">NEXIFY</span>
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarBrand>
        <Input
          classNames={{
            base: "max-w-full  h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          radius="full"
          startContent={<Search />}
          type="search"
        />
      </NavbarBrand>
      <NavbarContent as="div" className="items-center" justify="end">
        <NavbarBrand>
          <NavbarItem className="bg-gray-200 size-10 flex justify-center items-center rounded-full m-5">
            <Badge color="danger" content="5">
              <RiMessage2Fill className="text-4xl" />
            </Badge>
          </NavbarItem>
          <NavbarItem className="bg-gray-200 size-10 flex justify-center items-center rounded-full">
            <Badge color="danger" content="5">
              <IoIosNotifications className="text-4xl" />
            </Badge>
          </NavbarItem>
        </NavbarBrand>

        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            {isLoading ? (
              <Skeleton className="shrink-0 flex rounded-full size" />
            ) : (
              <Avatar
                isBordered
                as="button"
                name={userData.name}
                size="sm"
                src={
                  userData.photo ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
              />
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userData.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => logoutUser()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
