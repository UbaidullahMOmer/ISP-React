import React, { useEffect, useState } from "react";
import { useGetAllEmployeesQuery } from "../../redux/services/DZapi";
import AddUpdateData from "../../component/AddUpdateData/AddUpdateData";
import Table from "../../component/Table/Table";
function Home() {
  const [userid, setUserid] = useState();
  const [show, setShow] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const {
    data: getallemployesdata,
    refetch,
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

  const openPopup = (id, isView) => {
    setUserid(id);
    setShow(true);
    setIsViewMode(isView); // Set the view mode
  };
  return (
    <>
      {show ? <AddUpdateData id={userid} setShow={setShow} isViewMode={isViewMode} refetch={refetch} /> : null}
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
              <span className="number">
                {filteredUnActiveEmployees?.length}
              </span>
            </div>
            <div className="card">
              <i className="user__icon ri-add-line" />
              <span className="heading">New Clients</span>
              <span className="number">{filteredNewClients?.length}</span>
            </div>
          </div>
        </div>
        <div className="filter__table">
          <Table  getallemployes={getallemployes} openPopup={openPopup} refetch={refetch} />
        </div>
      </div>
    </>
  );
}

export default Home;
