import React, { Fragment, useState, useEffect,useRef} from "react";
import { 
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import HOST from "./Modal/HOST";
import DanhSachLoaiDoiTuong from './Modal/LoaiDoiTuong/DanhSachLoaiDoiTuong'
import Insert from './Modal/LoaiDoiTuong/ThemLoaiDoiTuong'
import LoadDing from './Modal/Load'
import HamXuLy from './Modal/HamXuLy/HamXuLy'

function LoaiDoiTuong() {
  const typingTimeoutRef = useRef(null)
  const [Loader,ShowLoader,HideLoader] = LoadDing()
  //#region Hien datatable

  // Tim MaLDT tiep theo trong base
  const [DSLoaiDoiTuong, SetDSLoaiDoiTuong] = useState([]);
  const newData = (a) =>{
    SetDSLoaiDoiTuong(a)
  }
  const Data = []
  const getLoaiDoiTuong = async () => {
    try {
      ShowLoader()
      const response = await fetch(HOST.LoaiDoiTuong); // Get
      const jsonData = await response.json();
      if(typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current) 
      }
      typingTimeoutRef.current = setTimeout(()=>
        {
          jsonData.map(x=>Data.push(
            {
              ma_loai_doi_tuong : x.ma_loai_doi_tuong,
              ten_loai_doi_tuong : x.ten_loai_doi_tuong,
              tien_bao_cong_no : HamXuLy.SoSangTien(x.tien_bao_cong_no),
              ghi_chu : x.ghi_chu,
            }
          ))
          SetDSLoaiDoiTuong(Data);
          HideLoader();
        },1000)

      
    } catch (error) {
      
    }
  };
  
  useEffect(() => {
    getLoaiDoiTuong();
  }, []);


  const [DSLDTChart,SetLDTChart] =  useState([]);
  const getTopreferrals = async()=>{
    try {
      const Data_ = []
      const response = await fetch(HOST.LoaiDoiTuong_Topreferrals); // Get
      const jsonData = await response.json();
      jsonData.map(x=>{
        Data_.push({
          ma_loai_doi_tuong : x.ma_loai_doi_tuong,
          ten_loai_doi_tuong : x.ten_loai_doi_tuong,
          SoLuongDoiTuong : x.SoLuongDoiTuong,
          Tong:x.Tong,
        }
        )
      })
      SetLDTChart(Data_)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getTopreferrals()
  },[])




  //#endregion
  return (
    <Fragment>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-2">
          <Col>
            <PageTitle
              sm="5"
              title="Danh mục / Loại đối tượng"
              subtitle="QLBH"
              className="text-sm-left"
            />
          </Col>
          <Col>
            <div className="btn-group m-5">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Điều hướng
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="danhmuc-loaidoituong">
                  Loại đối tượng
                </a>
                <a className="dropdown-item" href="danhmuc-doituong">
                  Đối tượng
                </a>
                <a className="dropdown-item" href="danhmuc-donvitinh">
                  Đơn vị tính
                </a>
                <a className="dropdown-item" href="danhmuc-loaihang">
                  Loại hàng
                </a>
                <a className="dropdown-item" href="danhmuc-mathang">
                  Mặt hàng
                </a>
                <a className="dropdown-item" href="danhmuc-nganhhang">
                  Ngành hàng
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Input form LoaiDoiTuong */}

        <h3 className="text-center">Thông tin</h3>
        {/* Button Thêm */}

        <div className="mt-3">
            <DanhSachLoaiDoiTuong data={DSLoaiDoiTuong} newdata={newData} dataChart={DSLDTChart}></DanhSachLoaiDoiTuong>
        </div>
      </Container>
      {Loader}
    </Fragment>
  );
}

export default LoaiDoiTuong;
