import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const imgHostKey = import.meta.env.VITE_APP_imgbb_key;
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctors-portal-server-rho-murex.vercel.app/appointmentSpecialty"
      );
      const data = await res.json();
      return data;
    },
  });
  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imageData.data.url,
          };
          // save doctors information to database
          fetch("https://doctors-portal-server-rho-murex.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added successfully`);
              navigate("/dashboard/managedoctors");
            });
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-96 p-7">
      <h2 className="text-4xl">Add A Doctor</h2>

      <form className="card-body" onSubmit={handleSubmit(handleAddDoctor)}>
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
            <small className="text-red-600 pt-2">{errors.name?.message}</small>
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
            <small className="text-red-600 pt-2">{errors.email?.message}</small>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty", {
              required: "Please Select a Specialty",
            })}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Please Select a Specialty
            </option>
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <small className="text-red-600 pt-2">
              {errors.specialty?.message}
            </small>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            className="input input-bordered"
            {...register("image", { required: "Photo is required" })}
          />
          {errors.image && (
            <small className="text-red-600 pt-2">{errors.image?.message}</small>
          )}
        </div>

        <div className="form-control mt-6">
          <input
            type="submit"
            className="btn btn-accent text-white"
            value="Add Doctor"
          />
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
