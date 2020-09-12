import React, { Fragment } from 'react';
import { Grid , TextField  } from '@material-ui/core';
import { ExampleWrapperSimple } from '../../../layout-components';
import { PageTitle } from '../../../layout-components';
import DanhSach from '../../../components/Web-Admin/DanhMuc/LoaiDoiTuong/DanhSachLoaiDoiTuong'
function DashboardDefault() {
  const getData = async ()=>{
    
  }
  
  return (
    <Fragment>
      <PageTitle
        titleHeading="Danh Mục / Loại đối tượng"
        // titleDescription="This is a dashboard page example built using this template."
      />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <ExampleWrapperSimple sectionHeading="Nhập">
            <div className="row">
              <div className="col">
              <TextField
                fullWidth
                className="m-2"
                id="filled-multiline-flexible"
                label="Tên loại đối tượng"
                multiline
                rowsMax="4"
                variant="outlined"
              />
              {/* <span className="ml-2">ababab</span> */}
              </div>
              <div className="col">
              <TextField
                fullWidth
                className="m-2"
                id="filled-multiline-flexible"
                label="Tên loại đối tượng"
                multiline
                rowsMax="4"
                variant="outlined"
              />
              {/* <span>ababab</span> */}
                </div>
            </div>

          </ExampleWrapperSimple>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ExampleWrapperSimple sectionHeading="Split">

          </ExampleWrapperSimple>
        </Grid>
        <Grid item xs={12} lg={12}>
          {/* <ExampleWrapperSimple sectionHeading="Danh sách"> */}
                <DanhSach></DanhSach>
          {/* </ExampleWrapperSimple> */}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default DashboardDefault