import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import DatePicker from "react-datepicker";
import ApexCharts from 'react-apexcharts'
import ChartistChart from 'react-chartist';
import Chart from 'react-apexcharts'
import Knob from "knob";
import moment from 'moment';
import API_findUsers from '../../api/findUsers';

const Default = (props) => {

  const [usersByDay, setUsersByDay] = useState(null);
  const [usersBySevenDays, setUsersBySevenDays] = useState([]);

  const getUsersByDay = async () => {
    const result = await API_findUsers(
      null,
      null,
      null,
      moment().utc().set("hours", 0).set("minutes", 0).set("seconds", 0).toISOString(),
      moment().utc().set("hours", 23).set("minutes", 59).set("seconds", 59).toISOString()
    );

    if(result) {
      setUsersByDay(result.length);
    }
  }

  const getUsersByWeek = async () => {
    const parsed = [];

    for(let i = 6; i >= 0; i--) {
      const result = await API_findUsers(
        null,
        null,
        null,
        moment().utc().set("hours", 0).set("minutes", 0).set("seconds", 0).subtract(i, "days").toISOString(),
        moment().utc().set("hours", 23).set("minutes", 59).set("seconds", 59).subtract(i, "days").toISOString(),
      );

      if(result)
        parsed.push(result);
    }

    if(parsed.length == 7) {
      setUsersBySevenDays([
        parsed[0].length,
        parsed[1].length,
        parsed[2].length,
        parsed[3].length,
        parsed[4].length,
        parsed[5].length,
        parsed[6].length
      ])
    }

  }

  useEffect(() => {
    getUsersByDay();
    getUsersByWeek();
  }, [])

  return (
    <Fragment>
      <Breadcrumb parent="Панель управления" title="Главная" />
      <Container fluid={true}>
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <h6 className="card-title mb-0">
                  Зарегистрированных за сегодня
                </h6>
              </CardHeader>

              <CardBody>
                <ApexCharts type='radialBar' options={{
                  chart: {
                    type: 'radialBar'
                  },
                  labels: [(usersByDay == null ? "Неизвестно" : usersByDay)],
                  plotOptions: {
                    radialBar: {
                      hollow: {
                        size: "80%"
                      },
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: 10,
                          show: true,
                          // color: "#111",
                          fontSize: "32px"
                        },
                        value: {
                          show: false
                        }
                      },
                    }
                  }
                }} series={[100]} height={350}/>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6}>
            <Card>
              <CardHeader>
                <h6 className="card-title mb-0">
                  Зарегистрированных за неделю
                </h6>
              </CardHeader>

              <CardBody>
              <ApexCharts options={{
                xaxis: {
                  categories: [
                    moment().subtract(6, "days").format("DD.MM.YYYY"),
                    moment().subtract(5, "days").format("DD.MM.YYYY"),
                    moment().subtract(4, "days").format("DD.MM.YYYY"),
                    moment().subtract(3, "days").format("DD.MM.YYYY"),
                    moment().subtract(2, "days").format("DD.MM.YYYY"),
                    moment().subtract(1, "days").format("DD.MM.YYYY"),
                    moment().format("DD.MM.YYYY"),
                  ]
                }
              }} series={[
                {name: "Зарегистрировано",
                data: usersBySevenDays}
              ]} type='radar' height={350} />
                {/* <ApexCharts id="marketchart" options={Marketvalue.options} series={Marketvalue.series} type='radar' height={300} /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <h6 className="card-title mb-0">
                  Активность на экранах
                </h6>
              </CardHeader>

              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <h6 className="card-title mb-0">
                  Статистика по рекламе
                </h6>
              </CardHeader>

              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Default;