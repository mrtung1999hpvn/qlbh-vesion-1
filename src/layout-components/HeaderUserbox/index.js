import React, { Fragment ,useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {storage} from '../../firebase'
import {
  Avatar,
  Box,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';

// import avatar5 from '../../assets/images/avatars/avatar5.jpg';
const _3DES = require('nodejs3des')
const date = new Date()
const key = date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
export default function HeaderUserbox() {
  const [url,setUrl] = useState("")
  storage.ref("images").child("Admin.JPG").getDownloadURL().then(url=>{
    setUrl(url)
   })
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
          <Avatar sizes="44" alt="Emma Taylor" src={url} />
        </Box>
        <div className="d-none d-xl-block pl-3">
          <div className="font-weight-bold pt-2 line-height-1">Administrator</div>
          <span className="text-white-50">Quản lý hệ thống</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <Box>
              <Avatar sizes="44" alt="Emma Taylor" src={url} />
            </Box>
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                  Administrator
              </div>
              <span className="text-black-50 text-center">
                  Quản lý hệ thống  
              </span>
            </div>
            <Divider className="w-100 mt-2" />
            <ListItem button onClick={
              async ()=>{
                window.location.href = "/ThongTin"
              }
            }>Thông tin</ListItem>
            <ListItem button>Profile settings</ListItem>

            <ListItem
              button
              onClick={async () => {
                window.localStorage.setItem(_3DES.encrypt(key,'user'),_3DES.encrypt(key,'ABSoft'))
                window.localStorage.setItem(_3DES.encrypt(key,'pass'),_3DES.encrypt(key,'ABSoft'))
              }}>
              <a href="/">Thoát</a>
            </ListItem>

            <Divider className="w-100" />
            <ListItem className="d-block rounded-bottom px-3 pt-3 pb-0 text-center">
              <Tooltip arrow title="Twitter">
                <Button color="default" className="text-twitter">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                  </span>
                </Button>
              </Tooltip>
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}
