import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";
import EmailIcon from "@mui/icons-material/Email";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../utils/api";
import GoogleIcon from "@mui/icons-material/Google";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  const handleHidden = () => {
    setHidden(!hidden);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    // Submit form if no errors
    if (Object.keys(errors).length === 0) {
      // Submit form data to server or perform further actions
      const getFunction = async () => {
        try {
          const response = await login(formData);
          console.log(response);
          if (response.status == 200) {
            const accessToken = response?.data.token;
            const role = response.data.role;
            localStorage.setItem("accessTokenBookstore", accessToken);
            localStorage.setItem("role", role);
           if(role=="admin"){
            navigate("admin/home");
           }
           else if(role=="doctor"){
            navigate("doctor/home");
           }
           else{
            navigate("/home");
           }
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      };
      getFunction();
    }
  };

  const handleGoogleLogin = () => {
    window.open(`http://localhost:3000/api/v1/users/auth/google`, "self");

    // const getFunction = async () => {
    //   try {
    //     const response = await googleLogin();
    //     console.log(response);
    //     if (response.status == 200) {
    //       const accessToken = response?.data?.data;
    //       localStorage.setItem("accessTokenBookstore", accessToken);

    //       const userData = await getUser(accessToken);

    //       localStorage.setItem("name", userData.data.data.firstName);
    //       navigate("/home");
    //     }
    //   } catch (error) {
    //     console.error("Error during login:", error);
    //   }
    // };
    // getFunction();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <img
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
        style={{ filter: "brightness(97%)" }}
        src={bg}
        alt=""
      />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-5">
            <div className="flex gap-4 items-center w-full">
              <EmailIcon />
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="w-full">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none w-full rounded-md relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">*{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <KeyOffIcon />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div
                  className={`relative flex w-full bg-white items-center rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                >
                  <input
                    className="outline-none w-full px-3 py-2 rounded-md appearance-none"
                    id="password"
                    name="password"
                    type={`${hidden ? "text" : "password"}`}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <div onClick={handleHidden}>
                    {hidden ? (
                      <div className="w-[30px]">
                        <VisibilityIcon />
                      </div>
                    ) : (
                      <div className="w-[30px]">
                        <VisibilityOffIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="ml-10">
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    *{errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-end">
            <button
              type="submit"
              className="group relative w-[92%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <Link
              to="/regpage"
              className="group relative w-[92%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#23b3f1] hover:bg-[#0c93cd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </Link>
            <button
              onClick={handleGoogleLogin}
              className="group relative w-[92%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e21b1b] hover:bg-[#b50303] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="text-gray-50">
                <GoogleIcon />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
