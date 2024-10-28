import { useDispatch, useSelector } from "react-redux";
import { reqLogin } from "./request";
import { setAuth } from "./reducer";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setAuth(undefined));
    window.location.reload();
  };

  const login = async (payload) => {
    return await reqLogin(payload)
      .then((res) => {
        setLoading(true);
        Swal.fire("Welcome");
        navigate("/");
        dispatch(setAuth(res.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
  };

  return { auth, login, logout, loading };
};

export { useAuth };
