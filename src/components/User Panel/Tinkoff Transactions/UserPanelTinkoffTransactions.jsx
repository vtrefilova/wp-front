import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import API_getUserTransactions from '../../../api/getUserTransactions';
import moment from 'moment';

import './UserPanelTinkoffTransactions.scss';
import API_getUserSberTransactions from '../../../api/getUserSberTransactions';
import API_getUserTinkoffTransactions from '../../../api/getUserTinkoffTransactions';

const UserPanelTinkoffTransactions = ({
    user
}) => {

    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [pageForDisplay, setPageForDisplay] = useState([])

    const [total, setTotal] = useState(0);

    const getTransactions = async () => {
        const data = await API_getUserTinkoffTransactions(user.id, page - 1, 10);

        if (data) {
            setTransactions(data.page);
            setTotal(data.total);
        }
    }

    useMemo(() => {
        if (user)
            getTransactions();
    }, [user, page])

    const nextPage = () => {
        if (page >= Math.ceil(total / 10))
            return;

        setPage(page + 1);
    }

    const prevPage = () => {
        if (page <= 1)
            return;

        setPage(page - 1);
    }
    
    const selectPage = (page) => {
        setPage(page);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Транзакции Тинькофф</h6>
                </CardHeader>

                <CardBody>
                    <div className='card-list-max'>
                        <div className="user-panel-transactions-paging-container">
                            <p className="text-muted mb-0">
                                Всего: {total}
                            </p>

                            <Pagination className="pagination pagination-primary" aria-label="Page navigation example">
                                <PaginationItem onClick={prevPage}><PaginationLink>Назад</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink>{page}</PaginationLink></PaginationItem>
                                <PaginationItem onClick={nextPage}><PaginationLink>Вперед</PaginationLink></PaginationItem>
                            </Pagination>
                        </div>

                        <div className="user-panel-transactions-list">
                            {
                                transactions.map((item, idx) => (
                                    <div key={idx} className="b-b-light user-panel-transaction-container">
                                        {/* <p className="mb-0 user-panel-transaction-row-value">
                                            {item.card ? item.card.cardNumber : "Карта отсутствует"}
                                        </p> */}

                                        <p className="mb-0 user-panel-transaction-row-value">
                                            {item.amount.amount} {item.amount.cents} {item.currency}
                                        </p>

                                        <p className="mb-0 user-panel-transaction-row-value">
                                            {item.date ? moment(item.date).format("DD.MM.YYYY HH:mm:ss") : "Дата отсутствует"}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default UserPanelTinkoffTransactions;