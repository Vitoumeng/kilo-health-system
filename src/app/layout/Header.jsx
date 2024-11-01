import React from "react";
import { LuSunMedium, LuMoon } from "react-icons/lu";
import {useAuth} from "../module/auth/core/action";

const Header = ({ storedTheme, toggleTheme, show }) => {
    const {logout} = useAuth()

    return (
        <header className='header d-flex justify-content-end align-items-center gap-3 p-1 pe-5' style={{
            position: "fixed",
            top: 0,
            width: "100%",
            left: 0,
            background: storedTheme.storedTheme === "dark" ? "#212520" : "#f3f3f3",
            height: "70px",
            transition: "margin-left .4s ease-in-out",
        }}>
            <div id='theme-toggler'
                    className='d-flex fs-4 justify-content-center align-items-center'
                    style={{width: "35px", height: "35px",
                        cursor: "pointer"
                    }}
                    onClick={toggleTheme}>
                {
                    storedTheme.storedTheme === "dark" ? <LuSunMedium /> : <LuMoon />
                }
            </div>
            <div onClick={() => logout()} className="bg-primary" style={{ width: "35px", height: "35px", borderRadius: "4px", background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,52,164,1) 38%)"}}></div>
        </header>
    );
};

export default Header;
