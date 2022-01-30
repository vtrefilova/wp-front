import React, { useState, useMemo } from 'react';
import { Card, Cards, CardBody, CardHeader, Row, Col, Container } from 'reactstrap';

import './UserPanelLoyaltyCards.scss';

import API_getUserLoyaltyCards from '../../../api/getUserLoyaltyCards';

const UserPanelLoyaltyCards = ({
    user
}) => {

    const [cards, setCards] = useState([]);

    const getLoyaltyCards = async () => {
        
        const data = await API_getUserLoyaltyCards(user.id);
        console.log(data);
        if(data)
            setCards(data);
    }

    useMemo(() => {
        if(user)
            getLoyaltyCards();
    }, [user])

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Карты лояльности</h6>
                </CardHeader>

                <CardBody>
                    <div className="card-list-max">
                        {
                            cards.map((card, idx) => (
                                <div key={idx} className="b-b-light user-panel-card-container">
                                    <p className="mb-0 user-panel-card-value">
                                        {card.blank.name}
                                    </p>

                                    <p className="mb-0 user-panel-card-value">
                                        {card.data}
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

export default UserPanelLoyaltyCards;