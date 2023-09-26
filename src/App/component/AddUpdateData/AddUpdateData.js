import React, { useEffect, useState } from "react";
import {
  useAddEmployeesMutation,
  useGetOneEmployeesQuery,
  useUpdateEmployeesMutation,
  useGetAllEmployeesRoleQuery,
  useGetAllPackagesQuery,
} from "../../redux/services/DZapi";

function AddUpdateData({ id, setShow, isViewMode, refetch }) {
  const { data: allPackages } = useGetAllPackagesQuery();
  const packageNames =
    allPackages?.data.map((pkg) => pkg?.attributes.name) || [];

  const [
    updateEmployee,
    { isLoading: updateLoading, isError: updateError, error: updateErrorObj },
  ] = useUpdateEmployeesMutation();

  const [
    addEmployee,
    { isLoading: addLoading, isError: addError, error: addErrorObj },
  ] = useAddEmployeesMutation();

  const { data: getOneEmployeesData } = useGetOneEmployeesQuery(id);
  const { data: rolesData } = useGetAllEmployeesRoleQuery();

  const initialData = {
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
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (id && getOneEmployeesData) {
      const userData = getOneEmployeesData.data.attributes;
      setData({
        ...initialData,
        ...userData,
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
      const userDataWithTimestamps = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await addEmployee({ data: userDataWithTimestamps });
      console.log(response);
      refetch();
      closePopup();
    } catch (err) {
      // Handle error
    }
  };

  const handleUpdateUser = async () => {
    try {
      const userDataWithTimestamps = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const response = await updateEmployee({
        id,
        data: userDataWithTimestamps,
      });
      console.log(response);
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
              value={data.name}
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
              value={data.number}
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
              value={data.address}
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
              value={data.roll}
              onChange={handleChange}
              disabled={isViewMode}
            >
              {rolesData?.data?.map((role) => (
                <option key={role.id} value={role.attributes.rollTitle}>
                  {role.attributes.rollTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <label htmlFor="package" required="">
              Package<span>*</span>
            </label>
            <select
              id="package"
              name="package"
              value={data.package}
              onChange={handleChange}
              disabled={isViewMode}
            >
              {packageNames.map((packageName) => (
                <option key={packageName} value={packageName}>
                  {packageName}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <label htmlFor="status" required="">
              Status<span>*</span>
            </label>
            <select
              id="status"
              name="status"
              value={data.status ? "Active" : "Inactive"} // Set the initial value based on data.status
              onChange={handleChange}
              disabled={isViewMode}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              value={data.CustomerId}
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
              value={data.password}
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
              value={data.cnic}
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
              value={data.comment}
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
