import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container } from 'reactstrap';
import API_getUserBills from '../../../api/getUserBills';
import API_getUserTinkoffCards from '../../../api/getUserTinkoffCards';

import './UserPanelTinkoffCards.scss';

const UserPanelTinkoffCards = ({
    user
}) => {

    const [cards, setCards] = useState([]);

    const getCards = async () => {
        const data = await API_getUserTinkoffCards(user.id);

        if (data)
            setCards(data);
    }

    useEffect(() => {
        if (user)
            getCards();
    }, [user])

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Карты Тинькофф</h6>
                </CardHeader>

                <CardBody>
                    <div className="card-list-max">
                        {
                            cards.map((card, key) => (
                                <div key={key} className="b-b-light user-panel-bill-container">
                                    <p className="mb-0 user-panel-bill-title">
                                        Тинькофф {card.cardNumber}
                                    </p>

                                    <p className="mb-0 user-panel-bill-balance">
                                        {card.balance.amount}.{card.balance.cents}
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

export default UserPanelTinkoffCards;