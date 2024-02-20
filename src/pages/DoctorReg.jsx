import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hospiatlLogo from "../assets/hospital.jpg";
import bg from "../assets/bg.jpg";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { registerDoctor } from "../utils/api";

const DoctorReg = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [hidden, setHidden] = useState(false);

  const handleHidden = () => {
    setHidden(!hidden);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const getFunction = async () => {
        try {
          const response = await registerDoctor(formData);
          console.log(response)
          if (response.status == 201) {
            navigate("/");
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      };
      getFunction();
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 `}
    >
      <img
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
        style={{ filter: "brightness(97%)" }}
        src={bg}
        alt=""
      />
      <div className="max-w-md w-[60%] space-y-8">
        <div className="flex justify-center">
          <img
            className=" w-[100px] top-2 blend-mode-example mix-blend-multiply"
            src={hospiatlLogo}
            alt=""
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#392e9b]">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-3">
                <PersonIcon />
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Username"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 ml-10">*{errors.username}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <EmailIcon />
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  // type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 ml-10">*{errors.email}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <KeyIcon />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 ml-10">*{errors.password}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <KeyOffIcon />
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div
                  className={`relative flex w-full bg-white items-center rounded-md border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                >
                  <input
                    className="outline-none w-full px-3 py-2 rounded-md appearance-none"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={`${hidden ? "text" : "password"}`}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
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
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 ml-10">
                  *{errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end w-full gap-3">
            <button
              type="submit"
              className="group relative w-[92%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <Link
              to="/"
              className="group relative w-[92%] flex justify-center py-2 px-4
               border border-transparent text-sm font-medium rounded-md text-white
                bg-[#23b3f1] hover:bg-[#0c93cd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorReg;
