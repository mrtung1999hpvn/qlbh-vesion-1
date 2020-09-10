import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import projectLogo from '../../assets/images/Web-app/Logo.png';

const HeaderLogo = () => {
  return (
    <Fragment>
      <div className={clsx('app-header-logo', {})}>
        <Box
          className="header-logo-wrapper"
          title="Trang chủ">
          <Link to="/" className="header-logo-wrapper-link">
            <IconButton
              color="primary"
              size="medium"
              className="header-logo-wrapper-btn">
              <img
                className="app-header-logo-img"
                alt="Trang chủ"
                src={projectLogo}
              />
            </IconButton>
          </Link>
          <Box className="header-logo-text">Quản lý bán hàng</Box>
        </Box>
      </div>
    </Fragment>
  );
};

export default HeaderLogo;
