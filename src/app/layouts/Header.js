import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
  <div className="container">
        {/* Logo and Branding */}
        <a className="navbar-brand" href="#">
          <img
            src="/airplaneFilled.png"  
            alt="Vector" 
            width="50" 
            className="me-2"
          />
          Tìm Chuyến Bay
        </a>

        {/* Spacer for center-aligned logo */}
        <div className="navbar-nav mx-auto">
          <img
            src="/vector.svg"  
            alt="Airplane"
            width="24" 
            className="me-2"
          />
          <div className="navbar-text">FLBK</div>
        </div>

        {/* Navbar Buttons (Login and Register) */}
        <div className="navbar-nav">
          <button type="button" className="btn btn-outline-secondary me-2">
            Đăng nhập
          </button>
          <button type="button" className="btn btn-dark">
            Đăng ký
          </button>
        </div>
      </div>
      </nav>
  )
}

export default Header