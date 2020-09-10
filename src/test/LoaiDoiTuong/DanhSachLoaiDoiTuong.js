import React , {useState , useCallback ,useEffect,useRef}  from 'react';
import PropTypes from 'prop-types';
import Edit from "./SuaLoaiDoiTuong"
import Delete from "./XoaLoaiDoiTuong"
import MUIDataTable,{
  CustomFooter,
  resizableColumns,
} from "mui-datatables";
import Insert from "./ThemLoaiDoiTuong"
import HamXuLy from "../HamXuLy/HamXuLy"
import LoadDing from "../Load"
import Load from '../Load';


DanhSachLoaiDoiTuong.propTypes = {
    todos : PropTypes.array,
};

DanhSachLoaiDoiTuong.defaultProps = {
    todos : [],
}

function DanhSachLoaiDoiTuong({data,newdata,dataChart}) {
  const [onChangeChart,SetonChangeChart] = useState(false);
  const [dataSate,SetdataSate] = useState([])
  //#region LoaiDoiTuong
  useEffect(() => {
    SetdataSate(data)
    getLoaiDoiTuongChiTiet()

  }, [data])

  const EditSubmit = (a) =>{
    const copyData = [...dataSate]
    const dataEdit = copyData.findIndex(DT => DT.ma_loai_doi_tuong === a.ma_loai_doi_tuong)
      copyData.splice(dataEdit,1,a)
      SetdataSate(copyData)
  }
  const DeleteSubmit = (a)=>{
    const copyData = [...dataSate]
    const index = copyData.findIndex(DT => DT.ma_loai_doi_tuong === a.ma_loai_doi_tuong)
    copyData.splice(index,1)
    SetdataSate(copyData)
  }
  const InsertSubmit = (a)=>{
    const copyData = [...dataSate]
    copyData.push(a)
    SetdataSate(copyData)
    newdata(copyData)
    console.log(a)
  }
  const columns = [
    {
     name: "ma_loai_doi_tuong",
     label: "Mã loại đối tượng",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "ten_loai_doi_tuong",
     label: "Tên loại đối tượng",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "tien_bao_cong_no",
     label: "Tiền báo công nợ",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "ghi_chu",
     label: "Ghi chú",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "Sửa",
        options: {
          filter: true,
          sort: true,
          empty: true,
          customBodyRenderLite: (dataIndex,rowIndex) => {
            return (
              <Edit todo={dataSate[dataIndex]} OnSubmit={EditSubmit}></Edit>
            );
          }
        }
    },
    {
      name: "Xóa",
        options: {
          filter: true,
          sort: true,
          empty: true,
          customBodyRenderLite: (dataIndex,rowIndex) => {
            return (
              <Delete todo={dataSate[dataIndex]} onSubmit={DeleteSubmit}></Delete>
            );
          }
        }
    },
   ];
   
   const options = {
      filter: true,
      filterType: 'checkbox',
      responsive: 'vertical',
    // customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
    //   return (
    //     <CustomFooter
    //       count={count}
    //       page={page}
    //       rowsPerPage={rowsPerPage}
    //       changeRowsPerPage={changeRowsPerPage}
    //       changePage={changePage}
    //       textLabels={textLabels}
    //     />
    //   );
    // },
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data); 
    },
    print:true,
    viewColumns:true,
     download:true,
     downloadOptions:{
      filename:'loaidoituong.csv',
      filterOptions :{
        useDisplayedRowsOnly:true,
        useDisplayedColumnsOnly:true,
      }
     }
   }


  //#endregion
  
   //#region Xem Chi Tiet
   const [LDTChiTiet,SetLDTChiTiet] = useState([])
   const getLoaiDoiTuongChiTiet = ()=>{
     const Data =[]
     dataChart.map((x)=>{
      Data.push({
        ma_loai_doi_tuong : x.ma_loai_doi_tuong,
        ten_loai_doi_tuong : x.ten_loai_doi_tuong,
        SoLuongDoiTuong : x.SoLuongDoiTuong,
        Tong : HamXuLy.SoSangTien(x.Tong)
      })
     })
     console.log(dataChart)
     SetLDTChiTiet(Data)
   }
   const _OnClickXemChiTiet = (e)=>{
    SetonChangeChart(e)
   }
   const _columns = [
    {
     name: "ma_loai_doi_tuong",
     label: "Mã loại đối tượng",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "ten_loai_doi_tuong",
     label: "Tên loại đối tượng",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "SoLuongDoiTuong",
      label: "Số lượng đối tượng",
      options: {
       filter: true,
       sort: true,
      }
     },
    {
     name: "Tong",
     label: "Tổng",
     options: {
      filter: true,
      sort: true,
     }
    }
  ]

   ////#endregion
   if(!onChangeChart)
   {
    return (
      <div>
        <Insert DSLoaiDoiTuong={dataSate} ClickComponent={InsertSubmit} dataChart={dataChart} OnClickXemChiTiet={_OnClickXemChiTiet}></Insert>
        <div className="mt-3">
         <MUIDataTable
            title={"Loại đối tượng"}
            data={dataSate}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
   }
   else{
    return (
      <div>
        <Insert DSLoaiDoiTuong={dataSate} ClickComponent={InsertSubmit} dataChart={dataChart} OnClickXemChiTiet={_OnClickXemChiTiet}></Insert>
        <div className="mt-3">
         <MUIDataTable
            title={"Chi tiết Loại đối tượng"}
            data={LDTChiTiet}
            columns={_columns}
            options={options}
          />
        </div>
      </div>
    );
   }
   ////#endregion
}

export default DanhSachLoaiDoiTuong
