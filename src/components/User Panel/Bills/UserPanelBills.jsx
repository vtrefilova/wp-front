import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container } from 'reactstrap';
import API_getUserBills from '../../../api/getUserBills';

import './UserPanelBills.scss';

const UserPanelBills = ({
    user
}) => {

    const [bills, setBills] = useState([]);

    const getBills = async () => {
        const data = await API_getUserBills(user.id);

        if (data)
            setBills(data);
    }

    useEffect(() => {
        if (user)
            getBills();
    }, [user])

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Счета</h6>
                </CardHeader>

                <CardBody>
                    <div className="card-list-max">
                        {
                            bills.map((bill, key) => (
                                <div key={key} className="b-b-light user-panel-bill-container">
                                    <p className="mb-0 user-panel-bill-title">
                                        {bill.name}
                                    </p>

                                    <p className="mb-0 user-panel-bill-balance">
                                        {bill.balance.amount}.{bill.balance.cents} {bill.user.walletType}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default UserPanelBills;