import React, { Fragment, useState, useEffect } from 'react';
import { Grid, TextField ,Button } from '@material-ui/core';

import { ExampleWrapperSimple } from '../../../layout-components';
import { PageTitle } from '../../../layout-components';
import host from '../../../hosting/host';
import AnhUser from './AnhUser.js'

const _3DES = require('nodejs3des');
const date = new Date();
const key =
  date.getDay() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
function ThongTin() {
  //Trang thái OnCheckUpdate true là trạng thái khởi tạo 
  //khi cập nhập thì OnCheckUpdate false
  const [DuLieu, SetDuLieu] = useState([]);
  const [MatKhau,SetMatKhau] = useState(
      {
        matkhaucu : "",
        matkhaumoi :"",
        nhapmatkhaumoi :"",
      }
  )
  const tk = _3DES.decrypt(
    key,
    _3DES.decrypt(key, window.localStorage.getItem(_3DES.encrypt(key, 'user')))
  );
  const mk = _3DES.decrypt(
    tk,
    _3DES
      .decrypt(
        key,
        _3DES.decrypt(
          key,
          window.localStorage
            .getItem(_3DES.encrypt(key, 'pass'))
            .substring(1)
            .substring(
              0,
              window.localStorage.getItem(_3DES.encrypt(key, 'pass')).length - 2
            )
        )
      )
      .substring(4)
  );
  const GetData = async () => {
    try {
      const response = await fetch(host.nguoidung + `/` + tk + `/` + mk);
      const JsonData = await response.json();
      SetDuLieu(JsonData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetData();
  });

  const [OnCheckUpdate,SetOnCheckUpdate] = useState(true)
  const ChangePass = async()=>{
    if(MatKhau.matkhaucu.length !==0 && MatKhau.matkhaucu !== mk)
    {
      alert('Nhập mật khẩu cũ không đúng !')
      MatKhau.matkhaucu = MatKhau.matkhaumoi = MatKhau.nhapmatkhaumoi = ""
      return false
    }
    else if (MatKhau.matkhaumoi.length !== 0 && MatKhau.nhapmatkhaumoi.length  !==0
      && MatKhau.matkhaumoi !== MatKhau.nhapmatkhaumoi)
      {
        alert('Nhập mật khẩu mới không giống nhau !')
        MatKhau.matkhaucu = MatKhau.matkhaumoi = MatKhau.nhapmatkhaumoi = ""
        return false
      }
      else if(MatKhau.matkhaumoi.length !== 0 && MatKhau.nhapmatkhaumoi.length === 0)
      {
        alert('Người dùng chưa nhập lại mật khẩu mới !')
        MatKhau.matkhaucu = MatKhau.matkhaumoi = MatKhau.nhapmatkhaumoi = ""
        return false
      }
      else if(MatKhau.matkhaucu.length !== 0 &&
        (MatKhau.matkhaumoi.length === 0 || MatKhau.nhapmatkhaumoi.length === 0))
        {
          alert('Người dùng chưa mật khẩu mới !')
          MatKhau.matkhaucu = MatKhau.matkhaumoi = MatKhau.nhapmatkhaumoi = ""
          return false
        }
      else{
        if(MatKhau.matkhaucu.length !==0 && 
          MatKhau.matkhaumoi.length !==0 &&
          MatKhau.nhapmatkhaumoi.length !==0 
          )
          {
            const mat_khau = _3DES.encrypt(_3DES.decrypt(
              key,
              _3DES.decrypt(key, window.localStorage.getItem(_3DES.encrypt(key, 'user')))
            )
              ,MatKhau.matkhaumoi)

            const body = {mat_khau}
            alert('Đổi thành công !')
            const response = await fetch(host.nguoidung,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(body)
            })
            MatKhau.matkhaucu = MatKhau.matkhaumoi = MatKhau.nhapmatkhaumoi = ""
            window.localStorage.setItem(_3DES.encrypt(key,'user'),_3DES.encrypt(key,'ABSoft'))
            window.localStorage.setItem(_3DES.encrypt(key,'pass'),_3DES.encrypt(key,'ABSoft'))
            window.location.href = "/"
            return true
          }
      }
      return true
  }
  return (
    <Fragment> 
      <PageTitle
        titleHeading="Thông tin"
        // titleDescription="This is a dashboard page example built using this template."
      />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <ExampleWrapperSimple sectionHeading="Nhập">
            <div className="row">
              <div className="col">
                <TextField
                  fullWidth
                  className="m-2"
                  id="filled-multiline-flexible"
                  label="Tài khoản"
                  multiline
                  rowsMax="4"
                  variant="outlined"
                  value={tk}
                  disabled={true}
                  
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  className="m-2"
                  id="filled-multiline-flexible"
                  label={!OnCheckUpdate ? 'Mật khẩu cũ' : 'Mật khẩu'}
                  rowsMax="4"
                  variant="outlined"
                  type="password"
                  value={!OnCheckUpdate ? MatKhau.matkhaucu : mk}
                  disabled={OnCheckUpdate}
                  onChange={e=>MatKhau.matkhaucu=e.target.value}
                  onKeyDown={
                    e=>{
                      if(e.keyCode===13)
                      {
                        if(ChangePass())
                        {

                          SetOnCheckUpdate(!OnCheckUpdate)
                        } 
                      }
                    }
                  }
                  style={{color:"black"}}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  fullWidth
                  className="m-2"
                  id="filled-multiline-flexible"
                  label="Quyền"
                  multiline
                  rowsMax="4"
                  variant="outlined"
                  value={DuLieu.map(x => x.quyen)}
                  disabled={true}
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  className="m-2"
                  id="filled-multiline-flexible"
                  label="Mật khẩu mới"
                  rowsMax="4"
                  variant="outlined"
                  type="password"
                  value={!OnCheckUpdate ? MatKhau.matkhaumoi : mk}
                  disabled={OnCheckUpdate}
                  onKeyDown={
                    e=>{
                      if(e.keyCode===13)
                      {
                        if(ChangePass())
                        {

                          SetOnCheckUpdate(!OnCheckUpdate)
                        } 
                      }
                    }
                  }
                  onChange={e=>MatKhau.matkhaumoi=e.target.value}

                />
              </div>
            </div>
            <div className="row">
            <div className="col">

              </div>
              <div className="col">
                <TextField
                  fullWidth
                  className="m-2"
                  id="filled-multiline-flexible"
                  label="Nhập lại mật khẩu mới"
                  rowsMax="4"
                  variant="outlined"
                  type="password"
                  value={!OnCheckUpdate ? MatKhau.nhapmatkhaumoi : mk}
                  disabled={OnCheckUpdate}
                  onKeyDown={
                    e=>{
                      if(e.keyCode===13)
                      {
                        if(ChangePass())
                        {

                          SetOnCheckUpdate(!OnCheckUpdate)
                        } 
                      }
                    }
                  }
                  onChange={e=>MatKhau.nhapmatkhaumoi=e.target.value}
                />
              </div>
            </div>
            {/*  */}
            <AnhUser _OnCheckUpdateImage={OnCheckUpdate}></AnhUser>
            <div className="row">
              <div className="col">
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <div className="text-right">
                      <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          onClick={async ()=>
                            {
                              if(ChangePass())
                              {
                                SetOnCheckUpdate(!OnCheckUpdate)
                              }
                                
                            }
                          }>
                          {
                          OnCheckUpdate ? 'Cập nhập' : 'Lưu' }
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </Fragment>
  );
}





export default ThongTin;
