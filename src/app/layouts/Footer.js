import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
      <div className="frame">
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <img src="/vector.svg" alt="Vector" width="50" className="me-2" />

            <div className="text-wrapper">FLBK</div>
          </div>
        </div>

        <div className="div-4">
          <div className="div-5">
            <div className="text-wrapper-2">Thông tin cần thiết</div>

            <div className="div-6">
              <p className="p">Thanh toán giao và nhận</p>

              <div className="text-wrapper-3">Điều khoản sử dụng</div>

              <div className="text-wrapper-3">Chính sách bảo mật</div>

              <div className="text-wrapper-3">Giấy tờ tùy thân</div>
            </div>
          </div>

          <div className="div-7">
            <div className="text-wrapper-5">Thông tin đặt chỗ</div>

            <div className="div-8">
              <div className="text-wrapper-4">Hướng dẫn đặt chỗ</div>

              <div className="text-wrapper-3">Quản lý đặt chỗ</div>

              <div className="text-wrapper-3">Kênh thanh toán</div>
            </div>
          </div>

          <div className="div-9">
            <div className="text-wrapper-5">Các dịch vụ</div>

            <div className="div-10">
              <p className="text-wrapper-4">Dịch vụ trên chuyến bay</p>

              <div className="text-wrapper-3">Dịch vụ hành lý</div>

              <div className="text-wrapper-3">Hàng hóa</div>
            </div>
          </div>

          <div className="div-5">
            <div className="text-wrapper-5">Liên hệ</div>

            <div className="div-10">
              <div className="text-wrapper-4">Email: abcd@gmail.com</div>

              <div className="text-wrapper-3">Tel: 0987654321</div>

              <div className="text-wrapper-3">
                Fanpage: ................................
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer