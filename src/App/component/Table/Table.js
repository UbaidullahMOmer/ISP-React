import React, { useState } from "react";
import { useDeleteEmployeesMutation } from "../../redux/services/DZapi";

function Table({ getallemployes, openPopup, setShow, refetch }) {
  const [showUserDrop, setShowUserDrop] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [deleteEmployees] = useDeleteEmployeesMutation();

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployees(employeeId);
      refetch();
    } catch (error) {}
  };
  const filteredUsers = getallemployes?.filter((adata) => {
    const data = adata?.attributes;
    return data?.name.toLowerCase().includes(nameFilter.toLowerCase());
  });


  const toggleUserDrop = () => {
    setShowUserDrop(!showUserDrop);
  };

  return (
    <>
      <div className="category__filter">
        <div className="categories user__icon">
          <div
            className="category active__categary " /*onClick={() => handleCategoryClick("All")}*/
          >
            <i class="ri-close-line"></i>
            <span onClick={toggleUserDrop}>User</span>
            <i class="ri-arrow-down-s-line"></i>
            {
            showUserDrop &&
            <div className="user__drop">
                  <span to="/user" className="span">
                    <i class="fa-solid fa-user"></i>
                    Admin
                  </span>
                  <span to="/setting" className="span">
                    <i class="fa-solid fa-gear"></i>
                    User
                  </span>
                  <span to="/" className="span" >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    Recovery Boy
                  </span>
            </div>
            }

          </div>
          <div
            className="category " /*onClick={() => handleCategoryClick("All")}*/
          >
            <span>Active User</span>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div
            className="category " /*onClick={() => handleCategoryClick("All")}*/
          >
            <span>Packages filters</span>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div
            className="category " /*onClick={() => handleCategoryClick("All")}*/
          >
            <span>select option for search</span>
            <i class="ri-arrow-down-s-line"></i>
          </div>
        </div>
        <div className="filter__input">
          <input
            type="text"
            placeholder="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="table">
        <div className="filter__row">
          <div className="filter__input">
            <span>All Data</span>
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
              <span className="data__heading client__name">Customer Id</span>
            </div>
            <div className="data">
              <span className="data__heading client__name">Password</span>
            </div>
            <div className="data">
              <span className="data__heading">Phone</span>
            </div>
            <div className="data">
              <span className="data__heading">CNIC</span>
            </div>
            <div className="data">
              <span className="data__heading">Package</span>
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
              <span className="data__heading">Comment</span>
            </div>
            <div className="data">
              <span className="data__heading">Action</span>
            </div>
          </div>

          {filteredUsers?.map((adata, index) => {
            const data = adata?.attributes;
            return (
              <div className="row" key={index}>
                <div className="data check">
                  <input type="checkbox" />
                </div>
                <div className="data check">
                  <span className="data__content user__id">{index + 1}</span>
                </div>
                <div className="data ">
                  <span className="data__content client__name">
                    {data?.name}
                  </span>
                </div>
                <div className="data ">
                  <span className="data__content client__name">
                    {data?.CustomerId}
                  </span>
                </div>
                <div className="data ">
                  <span className="data__content client__name">
                    {data?.password}
                  </span>
                </div>
                <div className="data">
                  <span className="data__content">{data?.number}</span>
                </div>
                <div className="data">
                  <span className="data__content">{data?.cnic}</span>
                </div>
                <div className="data">
                  <span className="data__content">{data?.package}</span>
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
                  <span className="data__content paid">{data?.comment}</span>
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
    </>
  );
}
export default Table;
