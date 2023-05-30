import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [logInError, setLogInError] = useState("");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLogInError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        setLogInError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => setLogInError(error.message));
  };
  return (
    <div className="hero  bg-base-200">
      <div className="card w-96 py-10 flex-shrink-0 my-16 shadow-2xl bg-base-100">
        <h2 className="text-2xl text-center font-semibold">Login</h2>
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", {
                required: "Email Address is required",
              })}
            />
            {errors.email && (
              <small className="text-red-600 pt-2">
                {errors.email?.message}
              </small>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
            />
            {errors.password && (
              <small className="text-red-600 pt-2">
                {errors.password?.message}
              </small>
            )}
            {logInError && (
              <small className="text-red-600 pt-2">{logInError}</small>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn btn-accent text-white"
              value="Login"
            />
          </div>
        </form>
        <small className="text-center">
          New to Doctors Portal?{" "}
          <Link className="text-secondary ms-1 underline" to="/signup">
            Create New Account
          </Link>
        </small>
        <div className="divider">OR</div>
        <button
          className="btn btn-outline w-4/5 mx-auto"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-xl me-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
