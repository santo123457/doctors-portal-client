import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { toast } from "react-hot-toast";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://doctors-portal-server-rho-murex.vercel.app/doctors",
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const handleDeleteDoctor = (doctor) => {
    fetch(
      `https://doctors-portal-server-rho-murex.vercel.app/doctors/${doctor._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} deleted successfully`);
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-3xl">Manage Doctors : {doctors?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors &&
              doctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={doctor.image} />
                      </div>
                    </div>
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <label
                      htmlFor="confirmation-modal"
                      className="btn btn-xs btn-error"
                      onClick={() => setDeletingDoctor(doctor)}
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`if you delete ${deletingDoctor.name}.It can't be Undone.`}
          modalData={deletingDoctor}
          successAction={handleDeleteDoctor}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
