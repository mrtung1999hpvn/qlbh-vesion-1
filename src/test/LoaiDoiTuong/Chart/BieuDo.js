import React,{useState} from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "./RangeDatePicker";
import Chart from "./chart";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);
    const _dataTong = []
    const _dataTitle = []
    this.props.dataChart.map((x,index)=>{
      _dataTitle[index] = x.ten_loai_doi_tuong;
      _dataTong[index] = x.Tong;
    })

    console.log(_dataTitle)
    console.log(_dataTong)
    this.state ={
        _dataTitle,
        _dataTong
    }
    this.state = {
        title: "Users Overview",
        chartData: {
            labels: _dataTitle,
            datasets: [
              {
                label: "Dương",
                fill: "start",
                data: _dataTong,
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
    }

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 7 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  if(tick <0)
                  {
                    return ((tick >-1000000 && tick <= -1000) ? (`${(tick/1000)} Nghìn`) :
                    (tick <= -1000000 && tick > -1000000000) ?  (`${(tick/1000000)} Triệu`) :
                    (tick <= -1000000000) ? (`${(tick/1000000000)} Tỷ`) : tick)
                  }
                  else{
                    return ((tick >=1000000 && tick <= 1000000000) ? (`${(tick/1000000)} Triệu`) :
                    (tick >= 1000000000) ? (`${(tick/1000000000)} Tỷ`) :
                    (tick >= 1000 && tick < 1000000) ? (`${(tick/1000)} Nghìn`) : tick)
                  }

                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.props.chartOptions
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.state.chartData,
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }

  render() {
    const { title } = this.props;
    return (
        <>
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
            </Col>
          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
            
          />
          </>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

UsersOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: ["a","b","c"],
    datasets: [
      {
        label: "Dương",
        fill: "start",
        data: [
            500,
            100,
            1000
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 2
      },
      {
        label: "Âm",
        fill: "start",
        data: [
          380,
          430,
          120,
        ],
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)"
      }
    ]
  }
  }

export default UsersOverview;
