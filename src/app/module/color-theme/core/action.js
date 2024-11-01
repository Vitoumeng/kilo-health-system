import {useDispatch, useSelector} from "react-redux";
import {setStoreTheme} from "./slice";

const useTheme = () => {

    const storedTheme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const getStoredTheme = () => storedTheme.storedTheme;

    const setStoredTheme = (value) => {
        dispatch(setStoreTheme(value))
    };

    const getPreferredTheme = () => {
        const theme = getStoredTheme();
        if (theme) {
            return theme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const setPreferredTheme = value => {
        setStoredTheme(value);
        document.documentElement.setAttribute('data-bs-theme', value)
    }

    const toggleTheme = () => {
        const currentTheme = getPreferredTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setPreferredTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return {
        storedTheme,
        getStoredTheme,
        getPreferredTheme,
        setPreferredTheme,
        setStoredTheme,
        toggleTheme,
    }
}

export {useTheme}