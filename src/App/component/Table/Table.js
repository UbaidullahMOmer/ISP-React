import React from 'react'

function Table() {
  return (
<div className="filter__table">
  <div className="filter">
    <h1 className="heading">Filter</h1>
    <div className="filters">
      <div className="filter__input">
        <input type="text" disabled="" placeholder="Select Status" />
        <i className="ri-arrow-down-s-fill arrow__icon" />
      </div>
      <div className="filter__input">
        <input type="text" disabled="" placeholder="Date" />
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
          <span className="data__heading">Total</span>
        </div>
        <div className="data">
          <span className="data__heading">Issued Date</span>
        </div>
        <div className="data">
          <span className="data__heading">Balance</span>
        </div>
        <div className="data">
          <span className="data__heading">Action</span>
        </div>
      </div>
      <div className="row">
        <div className="data check">
          <input type="checkbox" />
        </div>
        <div className="data">
          <span className="data__content user__id">#4910</span>
        </div>
        <div className="data">
          <span className="data__content client__name">Jordan Hubd</span>
        </div>
        <div className="data">
          <span className="data__content">$3428</span>
        </div>
        <div className="data">
          <span className="data__content">22 Oct 2019</span>
        </div>
        <div className="data">
          <span className="data__content paid">Paid</span>
        </div>
        <div className="data">
          <span className="data__content">Action</span>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Table