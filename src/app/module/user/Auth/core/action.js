import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setAuth, setLogin, setProfile } from "./reducer";
import { reqLogin } from "./request";
import Swal from "sweetalert2";
import useRole from "../../Role/core/action";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { fetchSelfPermissions } = useRole();

  const handleChangeLogin = (e) =>
    dispatch(setLogin({ name: e.target.name, value: e.target.value }));

  const onLogin = async () => {
    try {
      const res = await reqLogin(auth.login);
      const response = res.data.data;

      //   console.log(response);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("accessToken", response.token);
      dispatch(setAuth(response.token));
      dispatch(setProfile(response.user));
      console.log(response?.user?.roleId);
      fetchSelfPermissions({ roleId: response.user.roleId });
      navigate("/");
    } catch (err) {
      console.log("Error");
    }
  };

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      background: "#222525",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      confirmButtonText: "OK",
      cancelButtonColor: "gray",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setAuth(undefined));
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    });
  };

  return { ...auth, handleChangeLogin, onLogin, onLogout };
};

export { useLogin };
