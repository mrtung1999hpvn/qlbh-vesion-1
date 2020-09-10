import React, { useState ,useEffect} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect

} from "shards-react";
import HamXuLy from "../../HamXuLy/HamXuLy"
import Pagination from "./Pagination"
const TopReferrals = ({ title, referralData ,dataChart,OnClickXemChiTiet}) => {
  const divStyle ={
    cursor:'pointer'
  }
  
  const [OnShow,SetOnShow] = useState(false)
  const _OnClickXemChiTiet = ()=>{
    if(!OnShow)
    {
      OnClickXemChiTiet(true)
      SetOnShow(true)
    }
    else{
      OnClickXemChiTiet(false)
      SetOnShow(false)
    }
  }
  const ChuyenTab = ()=>{
    if(!OnShow)
    {
      return (
        <span onClick={_OnClickXemChiTiet} style={divStyle}>Xem chi tiết  &rarr;</span>
      )
    }
    else{
      return (
        <span onClick={_OnClickXemChiTiet} style={divStyle}>Trở về  &rarr;</span>
      )
    }
  }
  const [OnPage,SetOnPage] = useState({
    Page : 1,
    ToTalPage : Math.ceil(dataChart.length/6)
  })
  const _OnPage = (e)=>{
    const Page = e.Page
    const ToTalPage = e.ToTalPage
    SetOnPage(
      {
        Page : Page,
        ToTalPage : ToTalPage
      }
    )
    console.log(Page+" "+ToTalPage)
  }
  console.log(OnPage)
  useEffect(() => {
    OnPage.Page = 1
    OnPage.ToTalPage = Math.ceil(dataChart.length/6)
  }, [])
  return (
  <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="p-0">

      <ListGroup small flush className="list-group-small">
        {
          dataChart.map((item,index)=>
          {
            console.log(Math.ceil(dataChart.length/6))
            if(index >= (OnPage.Page-1)*6 && index < ((OnPage.Page-1)*6)+6)
            return (
            <>
              <ListGroupItem key={item.ma_loai_doi_tuong} className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">{item.ten_loai_doi_tuong}</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  {HamXuLy.SoSangTien(item.Tong)}
                </span>
              </ListGroupItem>
            </>
          )
          else{
            return
          }
        })
        }
        <div className="ml-4">
          <Pagination dataChart={dataChart} _OnClick={_OnPage}></Pagination>
        </div>
        
      </ListGroup>
    </CardBody>
    <CardFooter className="border-top">
      <Row>
        {/* Time Span */}
        <Col>
        </Col>

        {/* View Full Report */}
        <Col className="text-right view-report">
          {/* eslint-disable-next-line */}
          {
            ChuyenTab()
          }
        </Col>
      </Row>
    </CardFooter>
  </Card>
);
}
TopReferrals.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

TopReferrals.defaultProps = {
  title: "Top Referrals",
  referralData: [
    {
      title: "GitHub",
      value: "19,291"
    },
    {
      title: "Stack Overflow",
      value: "11,201"
    },
    {
      title: "Hacker News",
      value: "9,291"
    },
    {
      title: "Reddit",
      value: "8,281"
    },
    {
      title: "The Next Web",
      value: "7,128"
    },
    {
      title: "Tech Crunch",
      value: "6,218"
    },
    {
      title: "YouTube",
      value: "1,218"
    },
    {
      title: "Adobe",
      value: "1,171"
    }
  ]
};

export default TopReferrals;
