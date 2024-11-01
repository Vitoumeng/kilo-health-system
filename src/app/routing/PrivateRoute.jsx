import {Navigate, Route, Routes} from "react-router";
import RootLayout from "../layout/RootLayout";
import { LoginForm } from "../module/auth/component/Login";
import {useAuth} from "../module/auth/core/action";

const PrivateRoute = () => {
    const {auth} = useAuth()
    return (
        <Routes>
            {
                auth ? (
                    <Route path="/" element={<RootLayout/>}>
                        <Route index element={<h1>Dashboard</h1>}/>
                        <Route path="blog" element={<h1>Blog</h1>}/>
                        <Route path="event" element={<h1>Event</h1>}/>
                        <Route path="category" element={<h1>Category</h1>}/>
                        <Route path="tag" element={<h1>Tag</h1>}/>
                        <Route path="user-management" element={<h1>User Management</h1>}/>
                        <Route path="role" element={<h1>Role</h1>}/>
                    </Route>
                ) : (
                    <>
                        <Route path='/login' element={<LoginForm/>}/>
                        <Route path='*' element={<Navigate to={'/login'} />}/>
                    </>
                )
            }
        </Routes>
    );
}

export {PrivateRoute};