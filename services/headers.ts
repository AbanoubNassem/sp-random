import Cookies from "js-cookie";

const getAuthorizationHeader = () => {
  const currentUser = Cookies.get("currentUser");

  return {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${
      currentUser ? JSON.parse(currentUser)?.accessToken : ""
    }`,
  };
};

export default getAuthorizationHeader;
