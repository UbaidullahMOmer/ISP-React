import React, { useEffect, useState } from "react";
import {
  useAddEmployeesMutation,
  useGetOneEmployeesQuery,
  useUpdateEmployeesMutation,
  useGetAllEmployeesRoleQuery,
  useUpdateEmployeesRoleMutation
} from "../../redux/services/DZapi";

function AddUpdateData({ id, setShow, isViewMode, refetch }) {
  const [
    updateEmployee,
    { isLoading: updateLoading, isError: updateError, error: updateErrorObj },
  ] = useUpdateEmployeesMutation();

  const [
    updateEmployeeRole,
    { isLoading: updateRoleLoading},
  ] = useUpdateEmployeesRoleMutation();

  const [
    addEmployee,
    { isLoading: addLoading, isError: addError, error: addErrorObj },
  ] = useAddEmployeesMutation();

  const { data: getOneEmployeesData } = useGetOneEmployeesQuery(id);

  const { data: rolesData } = useGetAllEmployeesRoleQuery();

  console.log(rolesData);
  const [data, setData] = useState({
    name: "",
    number: "",
    address: "",
    roll: "",
    status: true,
    package: "",
    CustomerId: "",
    password: "",
    cnic: "",
    comment: "",
  });

  useEffect(() => {
    if (id && getOneEmployeesData) {
      const userData = getOneEmployeesData.data.attributes;
      // console.log(getOneEmployeesData);

      setData({
        name: userData?.name || "",
        number: userData?.number || "",
        address: userData?.address || "",
        roll: userData?.roll || "",
        status: userData?.status || true,
        package: userData?.package || "",
        createdAt: userData?.createdAt || "",
        updatedAt: userData?.updatedAt || "",
        CustomerId: userData?.CustomerId || "",
        password: userData?.password || "",
        cnic: userData?.cnic || "",
        comment: userData?.comment || "",
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
      // Set the createdAt and updatedAt properties before sending the data
      const userDataWithTimestamps = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await addEmployee({ data: userDataWithTimestamps });
      refetch();
      closePopup();
    } catch (err) {
      // Handle error
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Set the updatedAt property before sending the data
      const userDataWithTimestamps = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const response = await updateEmployee({ id, data: userDataWithTimestamps });
      refetch();
      closePopup();
    } catch (err) {
      // Handle error
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
              disabled={isViewMode}
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
              disabled={isViewMode}
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
              disabled={isViewMode}
            />
          </div>
        </div>

        <div className="address__section">
          <div className="input">
            <label htmlFor="roll" required="">
              Roll<span>*</span>
            </label>
            <select
              id="roll"
              name="roll"
              value={data?.roll}
              onChange={handleChange}
              disabled={isViewMode}
            >
              {rolesData?.data?.map((role) => (
                <option key={role?.id} value={role?.attributes.rollTitle}>
                  {role?.attributes.rollTitle}
                </option>
              ))}
            </select>
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
              disabled={isViewMode}
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
              disabled={isViewMode}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>
        {/* Additional fields */}
        <div className="address__section">
          <div className="input">
            <label htmlFor="CustomerId">Customer ID</label>
            <input
              type="text"
              id="CustomerId"
              name="CustomerId"
              placeholder="Customer ID"
              value={data?.CustomerId}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data?.password}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </div>
          <div className="input">
            <label htmlFor="cnic">CNIC</label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              placeholder="CNIC"
              value={data?.cnic}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </div>
          <div className="input">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="Comment"
              value={data?.comment}
              onChange={handleChange}
              disabled={isViewMode}
            />
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
