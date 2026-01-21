import { Outlet } from "react-router-dom";
import Messages from "../components/Messages";
import ArtistsNav from "../components/ArtistsNav";

export default function ArtistsLayout() {
    return(
        <>
            <Messages/>
            <div className="grid grid-cols-12 gap-3">
                <div className="lg:col-span-2 md:col-span-3 sm:col-span-4">
                    <ArtistsNav/>
                </div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};