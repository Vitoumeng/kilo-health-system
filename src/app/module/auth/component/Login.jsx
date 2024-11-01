import imgLogo from "../../../../logo.svg"
import {useState} from "react";
import {useAuth} from "../core/action";

export const LoginForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const {username, password} = user;

    const { login } = useAuth()

    const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username && password){
            login(user);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center'
             style={{minHeight: "100vh", background: "#f0f0f0"}}>
            <div className="d-flex px-3 py-5 flex-column align-items-center justify-content-center"
                 style={{background: "#f8f8f8", borderRadius: "4px"}}>
                <div>
                    <img src={imgLogo} alt="Login Logo"/>
                </div>
                <h5 className="mt-3">Sign In</h5>
                <form className="form-control d-flex flex-column border-0 bg-transparent" onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex flex-column align-items-start" style={{width: "320px"}}>
                        <label className="form-label" htmlFor="username">Username</label>
                        <input onChange={handleChange} className="form-control" type="text" value={username} name="username" id="username" required/>
                    </div>

                    <div className="mb-3 d-flex flex-column align-items-start" style={{width: "320px"}}>
                        <label className="form-label" htmlFor="password">Password</label>
                        <input onChange={handleChange} className="form-control" type="password" value={password} name="password" id="password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            </div>
        </div>
    );
}