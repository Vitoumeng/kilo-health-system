import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setAuth} from "./authSlice";
import {reqLogin} from "./request";
import Swal from 'sweetalert2';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const logout =() => {
        dispatch(setAuth(undefined));
        navigate('/login');
    }

    const login = async (payload) => {
        try {
            const res = await reqLogin(payload);
            dispatch(setAuth(res.data.data));
            console.log(res.data.data);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
                confirmButtonText: 'OK',
                timer: 1000,
                timerProgressBar: true,
            }).then(() => {
                navigate('/');
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response ? error.response.data.message : error.message,
            });
        }
    };

    return { auth, login, logout }
}