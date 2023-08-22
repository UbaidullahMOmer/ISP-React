import React from 'react'
import { useGetOneEmployeesQuery } from '../../redux/services/DZapi';
function Editpopup(props) {
 const { data: getuserdata, refetch } = useGetOneEmployeesQuery(props.id);

console.log(getuserdata)

 const openPopup = (sid) => {
  const popup = document.getElementById("address__popup");
  if (popup) {
    popup.style.visibility = "hidden";
  }
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
        City<span>*</span>
      </label>
      <input type="text" id="cityInput" name="city" placeholder="City" 
      // value={data.city} onChange={handleChange}
       />
    </div>
    <div className="input">
      <label htmlFor="postCodeInput" required="">
        post_code<span>*</span>
      </label>
      <input type="text" id="postCodeInput" name="postCode" placeholder="Post Code" 
      // value={data.postCode}
        // onChange={handleChange} 
        />
    </div>
    <div className="input">
      <label htmlFor="streetInput" required="">
        Street<span>*</span>
      </label>
      <input type="text" id="streetInput" name="street" placeholder="Street" 
      // value={data.street}
        // onChange={handleChange} 
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