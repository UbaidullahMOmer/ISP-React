import React, {useState} from "react";
import { useDeleteEmployeesMutation } from "../../redux/services/DZapi";

function Table({ getallemployes, openPopup, setShow, refetch }) {
  const [nameFilter, setNameFilter] = useState(""); 
  const [deleteEmployees] = useDeleteEmployeesMutation();

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployees(employeeId);
      refetch()
    } catch (error) {
    }
  };
  const filteredUsers = getallemployes?.filter((adata) => {
    const data = adata?.attributes;
    return data?.name.toLowerCase().includes(nameFilter.toLowerCase());
  });
  return (
    <div className="table">
      <div className="filter__row">
      <div className="filter__input">
          <input
            type="text"
            placeholder="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
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

        {filteredUsers?.map((adata) => {
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