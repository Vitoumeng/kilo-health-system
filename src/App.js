import './App.css';
import {Outlet} from "react-router";
import {useTheme} from "./app/module/color-theme/core/action";
import {useEffect} from "react";

function App() {

    const {setPreferredTheme, storedTheme} = useTheme();

    useEffect(() => {
        const tempTheme = storedTheme.storedTheme;
        setPreferredTheme(tempTheme);
    }, [])

    return (
        <div className="App">
            <Outlet/>
        </div>
    );
}

export default App;
