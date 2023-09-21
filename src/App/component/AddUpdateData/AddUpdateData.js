import React, { useEffect, useState } from "react";
import {
  useAddEmployeesMutation,
  useGetOneEmployeesQuery,
  useUpdateEmployeesMutation,
} from "../../redux/services/DZapi";

function AddUpdateData({ id, setShow, isViewMode, refetch }) {
  const [
    updateEmployee,
    { isLoading: updateLoading, isError: updateError, error: updateErrorObj },
  ] = useUpdateEmployeesMutation();
  const [
    addEmployee,
    { isLoading: addLoading, isError: addError, error: addErrorObj },
  ] = useAddEmployeesMutation();
  const { data: getOneEmployeesData } = useGetOneEmployeesQuery(id);
  // Fetch user data based on the provided id

  const [data, setData] = useState({
    name: "",
    number: "",
    address: "",
    roll: "",
    status: true,
    package: "",
  });

  useEffect(() => {
    if (id && getOneEmployeesData) {
      const userData = getOneEmployeesData.data.attributes;
      console.log(getOneEmployeesData);

      setData({
        name: userData?.name,
        number: userData?.number,
        address: userData?.address,
        roll: userData?.roll,
        status: userData?.status,
        package: userData?.package,
      });
    }
  }, [id, getOneEmployeesData]);

  const closePopup = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      const response = await addEmployee({ data });
      refetch()
      // Handle successful user creation here (e.g., show a success message)
      console.log("User added Data:", data);
      console.log("User added successfully:", response);
      closePopup();
    } catch (err) {
      // Handle error (e.g., show an error message)
      console.error("Error adding user:", err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await updateEmployee({ id, data });
      refetch()
      // Handle successful user update here
      console.log("User updated successfully:", response);
      closePopup();
    } catch (err) {
      // Handle error (e.g., show an error message)
      console.error("Error updating user:", err);
    }
  };

  const handleAddOrUpdateUser = () => {
    if (id) {
      handleUpdateUser();
    } else {
      handleAddUser();
    }
  };
  return (
    <div className="address__popup" id="address__popup">
      <h1 className="subheading">
        {isViewMode ? "View Address" : id ? "Update Address" : "Add Address"}
      </h1>

      <div className="address__fields">
        <div className="address__section">
          <div className="input">
            <label htmlFor="name" required="">
              Name<span>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={data?.name}
              onChange={handleChange}
              disabled={isViewMode} // Disable the input field in view mode
            />
          </div>
          <div className="input">
            <label htmlFor="number" required="">
              Number<span>*</span>
            </label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Number"
              value={data?.number}
              onChange={handleChange}
              disabled={isViewMode} // Disable the input field in view mode
            />
          </div>
          <div className="input">
            <label htmlFor="address" required="">
              Address<span>*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={data?.address}
              onChange={handleChange}
              disabled={isViewMode} // Disable the input field in view mode
            />
          </div>


        </div>

        <div className="address__section">
        <div className="input">
            <label htmlFor="roll" required="">
              Roll<span>*</span>
            </label>
            <input
              type="text"
              id="roll"
              name="roll"
              placeholder="Roll"
              value={data?.roll}
              onChange={handleChange}
              disabled={isViewMode} // Disable the input field in view mode
            />
          </div>
        <div className="input">
            <label htmlFor="package" required="">
              Package<span>*</span>
            </label>
            <input
              type="text"
              id="package"
              name="package"
              placeholder="Package"
              value={data?.package}
              onChange={handleChange}
              disabled={isViewMode} // Disable the input field in view mode
            />
          </div>
          <div className="input">
            <label htmlFor="status" required="">
              Status<span>*</span>
            </label>
            <select
              id="status"
              name="status"
              value={data?.status}
              onChange={handleChange}
              disabled={isViewMode} // Disable the input field in view mode
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="btns">
        <button className="btn" onClick={handleAddOrUpdateUser}>
          {updateLoading || addLoading ? "Adding/Updating..." : "Submit"}
        </button>
        <button className="btn" onClick={closePopup}>
          Cancel
        </button>
      </div>

      {(addError || updateError) && (
        <div className="error-message">
          Error: {addError ? addErrorObj.message : updateErrorObj.message}
        </div>
      )}
    </div>
  );
}

export default AddUpdateData;
