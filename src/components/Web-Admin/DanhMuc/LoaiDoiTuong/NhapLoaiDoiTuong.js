import React from 'react'
import {  TextField  } from '@material-ui/core';
function NhapLoaiDoiTuong() {
    return (
        <div>
            <div className="row">
              <div className="col">
              <TextField
                fullWidth
                className="m-2"
                id="filled-multiline-flexible"
                label="Multiline"
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
        </div>
    )
}

export default NhapLoaiDoiTuong
