const Auth_Key = "auth";

export const getAuth = () => {
    if(!localStorage.getItem(Auth_Key)) return undefined;

    return JSON.parse(localStorage.getItem(Auth_Key));
}