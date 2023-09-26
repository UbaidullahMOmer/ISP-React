import React, { useState, useEffect, useRef } from "react";
import {
  useDeleteEmployeesMutation,
  useGetAllPackagesQuery,
  useGetAllEmployeesRoleQuery,
} from "../../redux/services/DZapi";

function Table({ getallemployes, openPopup, setShow, refetch }) {
  const { data: allPackages } = useGetAllPackagesQuery();
  const { data: rolesData } = useGetAllEmployeesRoleQuery();
  const [showRoleDrop, setShowRoleDrop] = useState(false);
  const [showPackageDrop, setShowPackageDrop] = useState(false);
  const [showAttributeDrop, setShowAttributeDrop] = useState(false);
  const [showStatusDrop, setShowStatusDrop] = useState(false);
  const roleDropRef = useRef(null);
  const packageDropRef = useRef(null);
  const attributeDropRef = useRef(null);
  const statusDropRef = useRef(null);
  const [nameFilter, setNameFilter] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");
  const [selectedPackageFilter, setSelectedPackageFilter] = useState("All");
  const [selectedAttributeFilter, setSelectedAttributeFilter] = useState("name");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [deleteEmployees] = useDeleteEmployeesMutation();

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployees(employeeId);
      refetch();
    } catch (error) {}
  };



  
  const filteredUsers = getallemployes?.filter((adata) => {
    const data = adata?.attributes;

  const attributeToFilter = selectedAttributeFilter === "name"
  ? data?.name
  : selectedAttributeFilter === "address"
  ? data?.address
  : selectedAttributeFilter === "phone"
  ? data?.phone
  : selectedAttributeFilter === "CustomerId"
  ? data?.CustomerId
  : selectedAttributeFilter === "cnic"
  ? data?.cnic
  : null;

    return (
      ( (attributeToFilter &&
    attributeToFilter.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (selectedRoleFilter === "All" || data?.roll === selectedRoleFilter) &&
        (selectedPackageFilter === "All" || data?.package === selectedPackageFilter) &&
        ((selectedAttributeFilter === "All" && nameFilter === "") || (
          selectedAttributeFilter !== "All" && 
          (selectedAttributeFilter === "phone" ? 
            data?.[selectedAttributeFilter]?.includes(nameFilter) : 
            data?.[selectedAttributeFilter]?.toLowerCase().includes(nameFilter.toLowerCase())
          )
        )) &&
        (selectedStatusFilter === "All" || data?.status === selectedStatusFilter))
    );
  });
  


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleDropRef.current && !roleDropRef.current.contains(event.target)) {
        setShowRoleDrop(false);
      }
      if (packageDropRef.current && !packageDropRef.current.contains(event.target)) {
        setShowPackageDrop(false);
      }
      if (attributeDropRef.current && !attributeDropRef.current.contains(event.target)) {
        setShowAttributeDrop(false);
      }
      if (statusDropRef.current && !statusDropRef.current.contains(event.target)) {
        setShowStatusDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleRoleDrop = () => {
    setShowRoleDrop(!showRoleDrop);
  };

  const togglePackageDrop = () => {
    setShowPackageDrop(!showPackageDrop);
  };

  const toggleAttributeDrop = () => {
    setShowAttributeDrop(!showAttributeDrop);
  };

  const toggleStatusDrop = () => {
    setShowStatusDrop(!showStatusDrop);
  };

  const handleRoleSelect = (role) => {
    setSelectedRoleFilter(role);
    setShowRoleDrop(false);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackageFilter(pkg);
    setShowPackageDrop(false);
  };

  const handleAttributeSelect = (attribute) => {
    setSelectedAttributeFilter(attribute);
    setShowAttributeDrop(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatusFilter(status);
    setShowStatusDrop(false);
  };

  return (
    <>
      <div className="category__filter">
        <div className="categories">
          <div
            className={`user__icon category ${
              selectedRoleFilter !== "All" ? "active__categary" : ""
            }`}
          >
            {selectedRoleFilter !== "All" ? (
              <i
                className="ri-close-line"
                onClick={() => handleRoleSelect("All")}
              ></i>
            ) : null}
            <div>
              <span onClick={toggleRoleDrop}>
                {selectedRoleFilter !== "All" ? selectedRoleFilter : "Role"}
              </span>
              <i className="ri-arrow-down-s-line"></i>
            </div>
            {showRoleDrop && (
              <div className="user__drop" ref={roleDropRef}>
                {rolesData?.data?.map((role) => (
                  <span
                    key={role.id}
                    className="span"
                    onClick={() => handleRoleSelect(role.attributes.rollTitle)}
                  >
                    {role.attributes.rollTitle}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className={`user__icon category ${selectedPackageFilter !== "All" ? "active__categary" : ""}`}>
            {selectedPackageFilter !== "All" ? (
              <i
                className="ri-close-line"
                onClick={() => setSelectedPackageFilter("All")}
              ></i>
            ) : null}
            <span onClick={togglePackageDrop}>
              Package {selectedPackageFilter !== "All" && `(${selectedPackageFilter})`}
            </span>
            <i className="ri-arrow-down-s-line"></i>
            {showPackageDrop && (
              <div className="user__drop" ref={packageDropRef}>
                {allPackages?.data?.map((pkg) => (
                  <span
                    key={pkg.id}
                    className="span"
                    onClick={() => handlePackageSelect(pkg.attributes.name)}
                  >
                    {pkg.attributes.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            className={`user__icon category ${selectedStatusFilter !== "All" ? "active__categary" : ""}`}
          >
            {selectedStatusFilter !== "All" ? (
              <i
                className="ri-close-line"
                onClick={() => handleStatusSelect("All")}
              ></i>
            ) : null}
            <div>
              <span onClick={toggleStatusDrop}>
                {selectedStatusFilter !== "All" ? selectedStatusFilter : "Status"}
              </span>
              <i className="ri-arrow-down-s-line"></i>
            </div>
            {showStatusDrop && (
              <div className="user__drop" ref={statusDropRef}>
                <span
                  className="span"
                  onClick={() => handleStatusSelect("Active")}
                >
                  Active
                </span>
                <span
                  className="span"
                  onClick={() => handleStatusSelect("Inactive")}
                >
                  Inactive
                </span>
              </div>
            )}
          </div>
          <div
            className={`user__icon category ${selectedAttributeFilter !== "name" ? "active__categary" : ""}`}
          >
            {selectedAttributeFilter !== "name" ? (
              <i
                className="ri-close-line"
                onClick={() => handleAttributeSelect("name")}
              ></i>
            ) : null}
            <div>
              <span onClick={toggleAttributeDrop}>
                {selectedAttributeFilter !== "name" ? selectedAttributeFilter : "Select Option For search"}
              </span>
              <i className="ri-arrow-down-s-line"></i>
            </div>
            {showAttributeDrop && (
              <div className="user__drop" ref={attributeDropRef}>
                <span
                  className="span"
                  onClick={() => handleAttributeSelect("name")}
                >
                  name
                </span>
                <span
                  className="span"
                  onClick={() => handleAttributeSelect("address")}
                >
                  address
                </span>
                <span
                  className="span"
                  onClick={() => handleAttributeSelect("phone")}
                >
                  phone
                </span>
                <span
                  className="span"
                  onClick={() => handleAttributeSelect("CustomerId")}
                >
                  Customer ID
                </span>
                <span
                  className="span"
                  onClick={() => handleAttributeSelect("cnic")}
                >
                  Cnic
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="filter__input">
          <input
            type="text"
            placeholder={`Filter by ${selectedAttributeFilter}`}
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
