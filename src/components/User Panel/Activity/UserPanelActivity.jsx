import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container, Pagination, PaginationItem, PaginationLink, Input, Form, Label, FormGroup, Button } from 'reactstrap';
import API_getUserTransactions from '../../../api/getUserTransactions';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import './UserPanelActivity.scss';
import API_getUserActivity from '../../../api/getUserActivity';
import { toast } from 'react-toastify';

const UserPanelActivity = ({
    user
}) => {

    const [activity, setActivity] = useState([]);
    const [sortedActivity, setSortedActivity] = useState([]);
    const [startDate, setStartDate] = useState(moment().subtract(10, "days"));
    const [endDate, setEndDate] = useState(moment());
    const [updateData, setUpdateData] = useState(false);

    const getActivity = async () => {
        const data = await API_getUserActivity(user.id, startDate.toISOString(), endDate.toISOString());

        if (data)
            setActivity(data);
    }

    useMemo(() => {
        if (user)
            getActivity();
    }, [user, startDate, endDate])

    useMemo(() => {
        if (activity != null && activity.length > 0) {
            const arr = [];

            activity.forEach((item) => {
                let flag = false;

                arr.forEach((item2) => {
                    if (item2.screen == item.screenName) {
                        item2.data[endDate.diff(item.endTime, "days")] === undefined ? item2.data[endDate.diff(item.endTime, "days")] = [item] : item2.data[endDate.diff(item.endTime, "days")].push(item);
                        flag = true;
                    }
                });

                if (!flag) {
                    {
                        const arrs = new Array(endDate.diff(startDate, "days"));

                        arrs[endDate.diff(item.endTime, "days")] = [item];

                        arr.push({
                            screen: item.screenName,
                            data: arrs
                        });
                    }

                }
            })

            arr.forEach((item) => {
                for (let i = 0; i < endDate.diff(startDate, "days"); i++)
                    if (item.data[i] == undefined)
                        item.data[i] = [];
            })

            setSortedActivity([...arr]);
        }
    }, [activity])

    const loadNewData = (e) => {
        try {
            e.preventDefault();

            if(e.target.startDate.value.length == 0)
                throw new Error();

            if(e.target.endDate.value.length == 0)
                throw new Error();

            const startDate = moment(e.target.startDate.value);
            const endDate = moment(e.target.endDate.value);

            if(endDate.diff(startDate, "days") <= 0)
                throw new Error();

            setStartDate(startDate);
            setEndDate(endDate);
        } catch(e) {
            toast.error("Ошибка при парсинге даты. Разница между датами должна быть не меньше одного дня.");
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Активность на экранах в минутах по дням</h6>
                </CardHeader>

                <CardBody>
                    <Form onSubmit={loadNewData}>
                        <FormGroup>
                            <Label className="col-form-label pt-0" >Начальная дата</Label>
                            <Input required={true} name="startDate" className="form-control" type="datetime-local" />
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-form-label pt-0" >Конечная дата</Label>
                            <Input required={true} name="endDate" className="form-control" type="datetime-local" />
                        </FormGroup>

                        <Button color='primary'>
                            Применить    
                        </Button>
                    </Form>

                    <Line
                        data={{
                            labels: [...new Array(endDate.diff(startDate, "days")).fill(" ").map((_, idx) => moment().subtract(idx, "days").format("DD.MM.YYYY"))],
                            datasets: sortedActivity.map((item, idx) => {
                                return {
                                    id: idx + 1,
                                    label: item.screen,
                                    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
                                    data: item.data.map((data) => {
                                        let minutes = 0;

                                        data.forEach((activity) => minutes += moment(activity.endTime).diff(moment(activity.startTime), "minutes"));

                                        return minutes;
                                    })
                                }
                            })
                        }}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default UserPanelActivity;