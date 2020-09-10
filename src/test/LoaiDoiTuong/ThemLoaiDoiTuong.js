import React, { useState, useRef ,useEffect} from "react";
import HOST from "../HOST";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroupItem,
  Alert,
  Form,
  FormGroup,
  FormFeedback,
  FormInput,
  FormSelect,
  FormTextarea
} from "shards-react";
import TopReferral from "../LoaiDoiTuong/Chart/TopReferrals"
import LoadDing from "../Load.js";
import HamXuLy from "../HamXuLy/HamXuLy";
import BieuDo from "./Chart/BieuDo"

function ThemLoaiDoiTuong({ DSLoaiDoiTuong, ClickComponent ,dataChart,OnClickXemChiTiet}) {
  //#region BienThemLoaiDoiTuong
  const [ma_loai_doi_tuong, Set_MaLDT] = useState([]);
  const [ten_loai_doi_tuong, SetTenDT] = useState([]);
  const [tien_bao_cong_no, SetTienCanhBaoNo] = useState([]);
  const [ghi_chu, SetGhiChu] = useState([]);
  const typingTimeoutRef = useRef(null);
  const [Loader, ShowLoader, HideLoader] = LoadDing();
  const [test,Settest]= useState({
    title: "Users Overview",
    chartData: {
      labels: ["",""],
      datasets: [
        {
          label: "Dương",
          fill: "start",
          data: [
              1,
              2
          ],
          backgroundColor: "rgba(0,123,255,0.1)",
          borderColor: "rgba(0,123,255,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(0,123,255)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 2
        },
      //   {
      //     label: "Âm",
      //     fill: "start",
      //     data: [
      //       380,
      //       430,
      //       120,
      //     ],
      //     backgroundColor: "rgba(255,65,105,0.1)",
      //     borderColor: "rgba(255,65,105,1)",
      //     pointBackgroundColor: "#ffffff",
      //     pointHoverBackgroundColor: "rgba(255,65,105,1)",
      //     borderDash: [3, 3],
      //     borderWidth: 1,
      //     pointRadius: 0,
      //     pointHoverRadius: 2,
      //     pointBorderColor: "rgba(255,65,105,1)"
      //   }
      ]
    }
  })
  const [onChangeChart,SetonChangeChart] = useState(false);
  const _OnClickXemChiTiet = (e) =>{
    ShowLoader();
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
    OnClickXemChiTiet(e)
    SetonChangeChart(e)
    HideLoader()
    },1000)
  }
  //#endregion
  //#region BienChart

  ////#endregion
  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (
        tien_bao_cong_no.length < 0 &&
        /^[0-9]*$/.test(tien_bao_cong_no) === false
      ) {
        alert("Bạn đang sai dữ liệu Tiền Báo Công Nợ");
      } else if (HamXuLy.checkHovaTen(ten_loai_doi_tuong) !== "Xác nhận") {
        alert("Bạn đang sai dữ liệu Tên đối tượng");
      } else {
        const body = {
          ma_loai_doi_tuong,
          ten_loai_doi_tuong,
          tien_bao_cong_no,
          ghi_chu
        };
        ClickComponent(body);
        ShowLoader();
        const response = await fetch(HOST.LoaiDoiTuong, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        console.log(response);
        alert("Thêm thành công");
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          HideLoader();
          Set_MaLDT("");
          SetTenDT("");
          SetTienCanhBaoNo("");
          SetGhiChu("");
        }, 1000);
      }
    } catch (error) {}
  };
  if(!onChangeChart)
  {
    return (
      <>
        <Row>
          <Col lg="8" className="mb-4">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Nhập liệu</h6>
              </CardHeader>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <div className="col">
                      <span>Mã loại đối tượng</span>
                      <FormInput
                        value={
                          HamXuLy.MaLDT(DSLoaiDoiTuong)
                        }
                        placeholder="First name"
                        required
                        valid={() => {
                          if (true) return true;
                        }}
                        onChange={() => {}}
                      />
                      <FormFeedback valid>Xác nhận</FormFeedback>
                    </div>
                  </Col>
                  <Col>
                    <div className="col">
                      <span>Tên loại đối tượng</span>
                      <FormInput
                        placeholder="Nhập họ và tên"
                        required
                        valid={
                          HamXuLy.checkHovaTen(ten_loai_doi_tuong) === "Xác nhận"
                            ? true
                            : false
                        }
                        onChange={e => {
                          SetTenDT(e.target.value);
                          Set_MaLDT(HamXuLy.MaLDT(DSLoaiDoiTuong));
                        }}
                        invalid={
                          HamXuLy.checkHovaTen(ten_loai_doi_tuong) === "Xác nhận"
                            ? false
                            : true
                        }
                      />
                      <FormFeedback
                        valid={
                          HamXuLy.checkHovaTen(ten_loai_doi_tuong) === "Xác nhận"
                            ? true
                            : false
                        }
                        invalid={
                          HamXuLy.checkHovaTen(ten_loai_doi_tuong) === "Xác nhận"
                            ? false
                            : true
                        }
                      >
                        {HamXuLy.checkHovaTen(ten_loai_doi_tuong)}
                      </FormFeedback>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="col">
                      <span>Số tiền cảnh báo nợ</span>
  
                      <FormInput
                        value={tien_bao_cong_no}
                        placeholder="Việt nam đồng"
                        required="true"
                        onChange={e => SetTienCanhBaoNo(e.target.value)}
                        valid={
                          tien_bao_cong_no.length > 0 &&
                          /^[0-9]*$/.test(tien_bao_cong_no) === true
                            ? true
                            : false
                        }
                        invalid={
                          tien_bao_cong_no.length > 0 &&
                          /^[0-9]*$/.test(tien_bao_cong_no) === true
                            ? false
                            : true
                        }
                      />
                      <FormFeedback
                        valid={
                          tien_bao_cong_no.length > 0 &&
                          /^[0-9]*$/.test(tien_bao_cong_no) === true
                            ? true
                            : false
                        }
                        invalid={
                          tien_bao_cong_no.length > 0 &&
                          /^[0-9]*$/.test(tien_bao_cong_no) === true
                            ? false
                            : true
                        }
                      >
                        {HamXuLy.CheckTien(tien_bao_cong_no)}
                        <br></br>
                        Số tiền : {HamXuLy.SoSangTien(tien_bao_cong_no)}
                        <br></br>
                        Chữ : {HamXuLy.DocTienSangChu(tien_bao_cong_no)}
                      </FormFeedback>
                    </div>
                  </Col>
                  <Col>
                    <div className="col">
                      <span>Ghi chú</span>
                      <FormTextarea
                        value={ghi_chu}
                        placeholder="Chú thích"
                        required="true"
                        valid
                        onChange={e => SetGhiChu(e.target.value)}
                      />
                      <FormFeedback valid>Xác nhận</FormFeedback>
                      <FormFeedback valid>(Có thể để trống)</FormFeedback>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onSubmit}
                      >
                        Thêm
                      </button>
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
            </Card>
          </Col>
          <Col lg="4" className="mb-4">
             <TopReferral title="Doanh thu loại đối tượng" dataChart={dataChart}
             OnClickXemChiTiet={_OnClickXemChiTiet}></TopReferral>
          </Col>
        </Row>
        {/* Input form LoaiDoiTuong */}
  
        {/* Button Thêm */}
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        {Loader}
      </>
    
    );
  }
  else{
    return (
      <>
       <Row>
         
          <Col lg="8" className="mb-4">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Chi tiết loại đối tượng</h6>
              </CardHeader>
              <ListGroupItem className="p-3">
                  <BieuDo dataChart={dataChart}></BieuDo>
              </ListGroupItem>
            </Card>
          </Col>
          <Col lg="4" className="mb-4">
             <TopReferral title="Doanh thu loại đối tượng" dataChart={dataChart}
             OnClickXemChiTiet={_OnClickXemChiTiet}></TopReferral>
          </Col>
        </Row>
        {/* Input form LoaiDoiTuong */}
  
        {/* Button Thêm */}
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        {Loader}
      </>
    )
  }
}

export default ThemLoaiDoiTuong;
