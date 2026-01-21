import { Outlet } from "react-router-dom";
import GuestNav from "../components/Nav";
import Messages from "../components/Messages";

export default function GuestLayout() {
    return(
        <>
            <GuestNav/>

            <div className="container-lg p-1 mx-auto">
                <Messages/>
                <Outlet/>
            </div>
        </>
    );
};