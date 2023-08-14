import React, { useEffect, useState } from "react";
import { useGetAllEmployeesQuery } from "../../redux/services/DZapi";
function Home() {
  const {
    data: getallemployesdata,
    error,
    isLoading,
  } = useGetAllEmployeesQuery();
  const [getallemployes, setGetallemployes] = useState();

  useEffect(() => {
    setGetallemployes(getallemployesdata?.data);
  }, [getallemployesdata]);

  console.log(getallemployes);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const filteredActiveEmployees = getallemployes?.filter(
    (data) => data?.attributes?.status === true
  );
  const filteredUnActiveEmployees = getallemployes?.filter(
    (data) => data?.attributes?.status === false
  );

  const filteredNewClients = filteredActiveEmployees?.filter((data) => {
    const addedDate = new Date(data?.attributes?.addedDate);
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return addedDate >= sevenDaysAgo;
  });
  console.log(filteredUnActiveEmployees);
  return (
    <div className="main__dashboard">
      <div className="search__bar">
        <div className="search">
          <i className="ri-search-line search__icon" />
          <input
            className="search__input"
            type="text"
            placeholder="Search (Ctrl+/)"
            
          />
        </div>
        <div className="profile">
          <img src="img/Avatar.png" alt="Avatar" />
        </div>
      </div>
      <div className="dashboard__cards">
        <h1 className="heading">Dashboard</h1>
        <div className="cards">
          <div className="card">
            <i className="user__icon ri-user-4-line" />
            <span className="heading">Total Clients</span>
            <span className="number">{getallemployes?.length}</span>
          </div>
          <div className="card">
            <i className="user__icon ri-add-circle-line" />
            <span className="heading">Active Clients</span>
            <span className="number">{filteredActiveEmployees?.length}</span>
          </div>
          <div className="card">
            <i className="user__icon ri-close-line" />
            <span className="heading">Un Active Clients</span>
            <span className="number">{filteredUnActiveEmployees?.length}</span>
          </div>
          <div className="card">
            <i className="user__icon ri-add-line" />
            <span className="heading">New Clients</span>
            <span className="number">{filteredNewClients?.length}</span>
          </div>
        </div>
      </div>
      <div className="filter__table">
        <div className="filter">
          <h1 className="heading">Filter</h1>
          <div className="filters">
            <div className="filter__input" >
              <input type="text" disabled placeholder="Select Status" />
              <i className="ri-arrow-down-s-fill arrow__icon" />
            </div>
            <div className="filter__input">
              <input type="text" disabled placeholder="Date" />
              <i className="ri-arrow-down-s-fill arrow__icon" />
            </div>
          </div>
        </div>
        <div className="table">
          <div className="filter__input">
            <input type="text" disabled="" placeholder="Action" />
            <i className="ri-arrow-down-s-fill arrow__icon" />
          </div>
          <div className="rows__data">
            <div className="row heading__row">
              <div className="data check">
                <input type="checkbox" />
              </div>
              <div className="data">
                <span className="data__heading">#ID</span>
              </div>
              <div className="data">
                <span className="data__heading client__name">Client</span>
              </div>
              <div className="data">
                <span className="data__heading">Phone</span>
              </div>
              <div className="data">
                <span className="data__heading">Email</span>
              </div>
              <div className="data">
                <span className="data__heading">Address</span>
              </div>
              <div className="data">
                <span className="data__heading">Roll</span>
              </div>
              <div className="data">
                <span className="data__heading">Active</span>
              </div>
              <div className="data">
                <span className="data__heading">Action</span>
              </div>
            </div>

            {getallemployes?.map((adata) => {
              const data = adata?.attributes
              return (
                <div className="row">
                  <div className="data check">
                    <input type="checkbox" />
                  </div>
                  <div className="data">
                    <span className="data__content user__id">{data?.employeeId}</span>
                  </div>
                  <div className="data">
                    <span className="data__content client__name">
                      {data?.name}
                    </span>
                  </div>
                  <div className="data">
                    <span className="data__content">
                      {data?.phone}
                    </span>
                  </div>
                  <div className="data">
                    <span className="data__content">
                      {data?.employeeEmail}
                    </span>
                  </div>
                  <div className="data">
                    <span className="data__content">
                      {data?.address}
                    </span>
                  </div>
                  <div className="data">
                    <span className="data__content paid">
                      {data?.employeeRole}
                    </span>
                  </div>
                  <div className="data">
                    <span className="data__content paid">
                      {data?.status? "Active" : "UnActive"}
                    </span>
                  </div>
                  <div className="data">
                    <span className="data__content">Action</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
