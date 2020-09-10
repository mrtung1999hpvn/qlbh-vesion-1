import React, { Fragment, useState,useRef } from 'react';
import img from '../assets/images/Web-app/Logo.png';
import host from '../hosting/host';
import LoadDing from '../assets/css/Load/Load'
const _3DES = require('nodejs3des')
const date = new Date()
const key = date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
function Login() {
  const typingTimeoutRef = useRef(null)
  const [User, setUser] = useLocalStorage(_3DES.encrypt(key,'user'),'Mặc định');
  const [Pass, setPass] = useLocalStorage(_3DES.encrypt(key,'pass'),'Mặc định');
  const [Loader,ShowLoader,HideLoader] = LoadDing()
  const [TaiKhoan, SetTaiKhoan] = useState([]);
  const [MatKhau, SetMatKhau] = useState([]);
  const OnLoginForm = async () => {
    try {
      if(typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current) 
      }
      ShowLoader()
      typingTimeoutRef.current = setTimeout(async ()=>
      {
      if (TaiKhoan.length === 0 || MatKhau.length === 0) {
        alert('Bạn chưa nhập tài khoản mật khẩu !');
        console.log('false');
        HideLoader()
      } 
      if(!/^[A-Za-z0-9]*$/.test(TaiKhoan) && !/^[A-Za-z0-9]*$/.test(MatKhau))
      {
        alert('Bạn nhập sai dữ liệu tài khoản & mật khẩu !');
        console.log(User+" "+Pass)
        HideLoader()
      } else {
        const response = await fetch(
          host.nguoidung + `/${TaiKhoan}/${MatKhau}`
        );
        const JsonData = await response.json();

          if (JsonData.length === 0) {
            alert('Đăng nhập thất bại !');
            console.log('false');
            setPass("ABCXYZ")
            window.location.href = "/"
          } else {

            setUser(_3DES.encrypt(key,_3DES.encrypt(key,JsonData[0].ten_dang_nhap)))
            setPass(_3DES.encrypt(key,_3DES.encrypt(key,"true"+JsonData[0].mat_khau)))
            alert('Đăng nhập thành công !')
            window.location.href = "/"
            console.log('true')
          }
          HideLoader()
      }
      
    },1000)
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Fragment>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={img} alt="IMG" />
            </div>
            <div className="login100-form validate-form">
              <div className="login100-form-title">
                <h3>Đăng nhập người dùng</h3>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz">
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Tài khoản"
                  onChange={e => SetTaiKhoan(e.target.value)}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      OnLoginForm();
                    }
                  }}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-user" aria-hidden="true" />
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required">
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Mật khẩu"
                  onChange={e => SetMatKhau(e.target.value)}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      OnLoginForm();
                    }
                  }}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={OnLoginForm}>
                Đăng nhập
                </button> 
              </div>
              {/* <div className="text-center p-t-12">
          <span className="txt1">
            Forgot
          </span>
          <a className="txt2" href="#">
            Username / Password?
          </a>
        </div>
        <div className="text-center p-t-136">
          <a className="txt2" href="#">
            Create your Account
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
          </a>
        </div> */}
            </div>
          </div>
        </div>
      </div>
      {Loader}
    </Fragment>
  );
}
// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
export default Login;
