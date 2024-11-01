import React, {useState} from "react";
import {Outlet} from "react-router";
import {useTheme} from "../module/color-theme/core/action";
import {useEffect} from "react";
import "../../_template/style/css/Layout.css"
import Sidebar from "./Sidebar";
import Header from "./Header";

const RootLayout = () => {

    const {storedTheme, toggleTheme} = useTheme();
    const [show, setShow] = useState(false);

    useEffect(() => {

        console.log(storedTheme.storedTheme);

    }, [storedTheme.storedTheme])

    return (
        <>
            <head>
                <title>Template</title>
            </head>
            <div className="overflow-x-hidden">

                <Sidebar storedTheme={storedTheme} show={show} setShow={setShow} />

                <Header storedTheme={storedTheme} toggleTheme={toggleTheme} show={show} />

                <main className={`main py-5 ${show ? "hide" : "show"} ${storedTheme.storedTheme === "dark" ? "dark" : "light"} `}>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default RootLayout;