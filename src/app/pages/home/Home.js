import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div>
        <div className="main-content">
        <div className="hero-image">
          <h1>BAY XA, CHỌN DỄ </h1>
          <h1>CHỈ TRONG MỘT CÚ CLICK!</h1>
          <p>Đặt vé ngay</p>
        </div>

        <div className="booking-section">
          <h2>Đặt vé</h2>
          <div className="booking-form">
            <div className="form-group">
              <label>Điểm đi</label>
              <input type="text" placeholder="Hà Nội" />
            </div>
            <div className="form-group">
              <label>Điểm đến</label>
              <input type="text" placeholder="Hồ Chí Minh" />
            </div>
            <div className="form-group">
              <label>Loại vé</label>
              <input type="text" placeholder="1 Passenger, Economy" />
            </div>
          </div>
          <button type="button" className="btn btn-primary">Tìm vé</button>
        </div>

        <div className="second-image">
        <div className="flight-section">
          <h2>Chuyến bay</h2>
          <p>Tìm kiếm các chuyến bay đến những địa điểm nổi tiếng</p>
          <button type="button" className="btn btn-secondary">Tìm kiếm chuyến bay</button>
        </div>

        </div>
      </div>
      </div>
  )
}

export default Home