import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Row, Col, Container } from 'reactstrap';
import Breadcrumbs from '../../layout/breadcrumb';

import './UserPanel.scss';

import API_getUserById from '../../api/getUserById';
import UserPanelBaseInformation from './Base Information/UserPanelBaseInformation';
import UserPanelCategories from './Categories/UserPanelCategories';
import UserPanelSubscription from './Subscription/UserPanelSubscription';
import UserPanelLoyaltyCards from './Loyalty Cards/UserPanelLoyaltyCards';
import UserPanelBills from './Bills/UserPanelBills';
import UserPanelTransactions from './Transactions/UserPanelTransactions';
import UserPanelActivity from './Activity/UserPanelActivity';
import UserPanelSberCards from './Sber Cards/UserPanelSberCards';
import UserPanelSberTransactions from './Sber Transactions/UserPanelSberTransactions';
import UserPanelTinkoffCards from './Tinkoff Cards/UserPanelTinkoffCards';
import UserPanelTinkoffTransactions from './Tinkoff Transactions/UserPanelTinkoffTransactions';
import UserPanelTochkaCards from './Tochka Cards/UserPanelTochkaCards';
import UserPanelTochkaTransactions from './Tochka Transactions/UserPanelTochkaTransactions';

const UserPanel = () => {
    const { id } = useParams();

    const [userData, setUserData] = useState(null);

    const history = useHistory();

    const getUserData = async () => {
        const data = await API_getUserById(id);

        if (data)
            setUserData(data);
        else
            history.replace("/dashboard/users/");
    }

    useEffect(() => {
        if (id) {
            const regEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            if (!regEx.test(id))
                history.replace("/dashboard/users/");
            else {
                getUserData();
            }
        }
    }, [])

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Управление пользователем" />
            <Container fluid={true}>
                <Row>
                    <Col xl={5}>
                        <UserPanelBaseInformation user={userData} />
                    </Col>

                    <Col xl={4}>
                        <UserPanelSubscription user={userData} />
                    </Col>

                    <Col xl={3}>
                        <UserPanelCategories user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <UserPanelLoyaltyCards user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <UserPanelBills user={userData} />
                    </Col>

                    <Col xl={6}>
                        <UserPanelTransactions user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <UserPanelSberCards user={userData} />
                    </Col>

                    <Col xl={6}>
                        <UserPanelSberTransactions user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <UserPanelSberCards user={userData} />
                    </Col>

                    <Col xl={6}>
                        <UserPanelSberTransactions user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <UserPanelTochkaCards user={userData} />
                    </Col>

                    <Col xl={6}>
                        <UserPanelTochkaTransactions user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <UserPanelTinkoffCards user={userData} />
                    </Col>

                    <Col xl={6}>
                        <UserPanelTinkoffTransactions user={userData} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <UserPanelActivity user={userData} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserPanel;