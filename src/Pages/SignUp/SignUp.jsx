import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpError, setSignUpError] = useState("");
  const { createUser, updateUser } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  if (token) {
    navigate('/')
  }
  
  
  const handleSignUp = (data) => {
    console.log(data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        toast.success("User Created Successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="hero  bg-base-200">
      <div className="card w-96 py-10 flex-shrink-0 my-16 shadow-2xl bg-base-100">
        <h2 className="text-2xl text-center font-semibold">Sign Up</h2>
        <form className="card-body" onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <small className="text-red-600 pt-2">
                {errors.name?.message}
              </small>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "Email Address is required" })}
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
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}/,
                  message:
                    "min 6 characters which contain at least one numeric digit and a special character",
                },
              })}
            />
            {errors.password && (
              <small className="text-red-600 pt-2">
                {errors.password?.message}
              </small>
            )}
            {signUpError && (
              <small className="text-red-600 pt-2">{signUpError}</small>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn btn-accent text-white"
              value="Sign Up"
            />
          </div>
        </form>
        <small className="text-center ">
          Already Have an Account?
          <Link className="text-secondary ms-1 underline" to="/login">
            LogIn
          </Link>
        </small>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-4/5 mx-auto">
          <FcGoogle className="text-xl me-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
