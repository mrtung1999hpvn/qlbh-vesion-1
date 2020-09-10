import React , {useState , useCallback ,useEffect,useRef}  from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";

DanhSachLoaiDoiTuong.propTypes = {
    todos : PropTypes.array,
};

DanhSachLoaiDoiTuong.defaultProps = {
    todos : [],
}

function DanhSachLoaiDoiTuong({data,newdata,dataChart}) {
    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "company",
         label: "Company",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "city",
         label: "City",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "state",
         label: "State",
         options: {
          filter: true,
          sort: false,
         }
        },
       ];
       
       const _data = [
        { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
        { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
        { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
        { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
       ];
       
       const options = {
         filterType: 'checkbox',
       };
       return (
        <MUIDataTable
        title={"Employee List"}
        data={_data}
        columns={columns}
        options={options}
      />
       )
   ////#endregion
}

export default DanhSachLoaiDoiTuong
