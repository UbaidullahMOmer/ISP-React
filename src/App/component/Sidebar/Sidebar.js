import React from 'react'

function Sidebar() {
  return (
<div className="side__bar">
  <div className="logo">
    <img src="img/logo.png" alt='logo' />
  </div>
  <div className="sidebar__links">
    <a className="side__link active" href="@">
      <i className="link__icon ri-home-smile-line" />

    </a>
    <a className="side__link" href="@">
      <i className="ri-file-list-3-line link__icon" />

    </a>
    <a className="side__link" href="@">
      <i className="ri-user-line link__icon" />

    </a>
    <a className="side__link" href="@">
      <i className="ri-lock-2-line link__icon" />

    </a>
    <a className="side__link" href="@">
      <i className="ri-pages-line link__icon" />

    </a>
  </div>
  {/* <div className="menu__arrow">
    <i className="ri-arrow-left-s-line" />
  </div> */}
</div>

  )
}

export default Sidebar