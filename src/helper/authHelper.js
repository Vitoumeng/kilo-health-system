const AUTH_KEY = "auth";

const getAuth = () => {
  if (!localStorage.getItem(AUTH_KEY)) return undefined;

  return JSON.parse(localStorage.getItem(AUTH_KEY));
};

export { getAuth };
