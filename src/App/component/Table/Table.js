import React from "react";
import { useDeleteEmployeesMutation } from "../../redux/services/DZapi";

function Table({ getallemployes, openPopup, setShow, refetch }) {
  const [deleteEmployees] = useDeleteEmployeesMutation();

  const handleDeleteEmployee = async (employeeId) => {
    try {
      // Call the deleteEmployees function with the employeeId to delete
      await deleteEmployees(employeeId);
      refetch()
      // After successful deletion, you can refresh the list of employees
      // You may use your API fetch function or Redux action to do this
      // Example: await yourRefreshFunction();

      // Optionally, you can show a success message or perform other actions
    } catch (error) {
      // Handle any errors that occur during deletion, e.g., show an error message
    }
  };

  return (
    <div className="table">
      <div className="filter__row">
        <div className="filter__input">
          <input type="text" disabled placeholder="Action" />
          <i className="ri-arrow-down-s-fill arrow__icon" />
        </div>
        <button className="btn" onClick={() => openPopup()}>
          <i className="ri-add-circle-line"></i>
          Add New Client
        </button>
      </div>
      <div className="rows__data">
        <div className="row heading__row">
          <div className="data check">
            <input type="checkbox" />
          </div>
          <div className="data check">
            <span className="data__heading">#ID</span>
          </div>
          <div className="data">
            <span className="data__heading client__name">Name</span>
          </div>
          <div className="data">
            <span className="data__heading">Phone</span>
          </div>
          <div className="data address__data">
            <span className="data__heading">Address</span>
          </div>
          <div className="data">
            <span className="data__heading">Role</span>
          </div>
          <div className="data">
            <span className="data__heading">Status</span>
          </div>
          <div className="data">
            <span className="data__heading">Action</span>
          </div>
        </div>

        {getallemployes?.map((adata) => {
          const data = adata?.attributes;
          return (
            <div className="row" key={adata?.id}>
              <div className="data check">
                <input type="checkbox" />
              </div>
              <div className="data check">
                <span className="data__content user__id">{adata?.id}</span>
              </div>
              <div className="data ">
                <span className="data__content client__name">{data?.name}</span>
              </div>
              <div className="data">
                <span className="data__content">{data?.number}</span>
              </div>
              <div className="data address__data">
                <span className="data__content" title={data?.address}>
                  {data?.address}
                </span>
              </div>
              <div className="data">
                <span className="data__content paid">{data?.roll}</span>
              </div>
              <div className="data">
                <span
                  className="data__content paid"
                  style={{
                    backgroundColor: data?.status ? "#72E1281F" : "red",
                  }}
                >
                  {data?.status ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="data">
                <span className="data__content action">
                  <i
                    className="ri-eye-line"
                    onClick={() => openPopup(adata?.id, true)}
                  ></i>
                  <i
                    className="ri-edit-2-line"
                    onClick={() => openPopup(adata?.id)}
                  ></i>
                  <i
                    className="ri-delete-bin-2-line"
                    onClick={() => handleDeleteEmployee(adata?.id)}
                  ></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;