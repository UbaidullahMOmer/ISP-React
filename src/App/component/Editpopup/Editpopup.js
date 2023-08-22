import React, { useState } from 'react'
import { useGetOneEmployeesQuery } from '../../redux/services/DZapi';
function Editpopup(props) {
  const { data: getuserdata, refetch } = useGetOneEmployeesQuery(props.id);
  const [data, setData] = useState({
    user_name: "",
    cnic: "",
    partner: "",
    package: "",
    plan_expiry: "",
    phone: "",
    mobile: "",
    first_name: "",
    last_name: "",
    status: "",
    city: "",
    major_are: "",
    minor_area: "",
    sub_area: "",
    address: "",
    comments: "",
  })
  console.log(getuserdata)

  const openPopup = (sid) => {
    const popup = document.getElementById("address__popup");
    if (popup) {
      popup.style.visibility = "hidden";
    }
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };
  return (
    <div className="address__popup" id='address__popup'>

      <h1 className="subheading">
        Add Address
      </h1>

      <div className="address__fields">

        <div className="address__section">
          <div className="input">
            <label htmlFor="cityInput" required="">
              User Name<span>*</span>
            </label>
            <input
              type="text"
              id="cityInput"
              name="user_name"
              placeholder="User Name"
              value={data.user_name} onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="postCodeInput" required="">
              Cnic<span>*</span>
            </label>
            <input
              type="text"
              id="postCodeInput"
              name="cnic"
              placeholder="Cnic"
              value={data.cnic}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="partnerInput" required="">
              Partner<span>*</span>
            </label>
            <input
              type="text"
              id="partnerInput"
              name="partner"
              placeholder="Partner"
              value={data.partner}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="partnerInput" required="">
            Package<span>*</span>
            </label>
            <input
              type="text"
              id="partnerInput"
              name="package"
              placeholder="Package"
              value={data.package}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="address__section">
          <div className="input">
            <label htmlFor="latInput" required="">
              Latitude<span>*</span>
            </label>
            <input type="text" id="latInput" name="lat" placeholder="Latitude"
            // value={data.lat} onChange={handleChange} 
            />
          </div>
          <div className="input">
            <label htmlFor="longInput" required="">
              Longitude<span>*</span>
            </label>
            <input type="text" id="longInput" name="long" placeholder="Longitude"
            // value={data.long}
            // onChange={handleChange} 
            />
          </div>
          <div className="input">
            <label htmlFor="addresstypeInput" className='option__user' required="">
              addresstype<span>*</span>
            </label>
            <select id="addresstypeInput" name="addresstype"
            // value={data.addresstype} onChange={handleChange}
            >
              <option value="work">Work</option>
              <option value="home">Home</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>

      </div>

      <div className="btns">
        <button className="btn"
        // onClick={handleupdateaddress}
        >
          Submit
        </button>
        <button className="btn" onClick={openPopup}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Editpopup