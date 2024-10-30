import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Form submission for login
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      const result = await login(email, password);
      const user = result.user;
      const userInfor = {
        name: data.name,
        email: data.email,
      };
      
      // Posting user data to backend
      const response = await axiosPublic.post("/users", userInfor);
      console.log("Login successful, backend response:", response);

      alert("Signin successful!");
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Please provide valid email & password!");
    }
  };

  // Google Sign-In
  const handleRegister = async () => {
    try {
      const result = await signUpWithGmail();
      const user = result.user;
      const userInfor = {
        name: result?.user?.displayName,
        email: result?.user?.email,
      };

      const response = await axiosPublic.post("/users", userInfor);
      console.log("Google Signin successful, backend response:", response);

      alert("Google Signin successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Signin error:", error);
      alert(`Google Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Login!</h3>

          {/* email input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* password input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage && (
            <p className="text-red text-xs italic">
              {errorMessage}
            </p>
          )}

          {/* submit button */}
          <div className="form-control mt-4">
            <input type="submit" className="btn bg-green text-white" value="Login" />
          </div>

          {/* close button */}
          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</div>
          </Link>

          <p className="text-center my-2">
            Don’t have an account?
            <Link to="/signup" className="underline text-red ml-1">Signup Now</Link>
          </p>
        </form>

        {/* Social Sign-In */}
        <div className="text-center space-x-3">
          <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
