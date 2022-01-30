import React, { useState, useEffect } from 'react';
import { CardBody, CardHeader, Container, Card, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import API_getHelpLeads from '../../api/getHelpLeads';
import Breadcrumbs from '../../layout/breadcrumb';

import './HelpLeads.scss';

const HelpLeads = () => {

    const pageSize = 10;

    const [leads, setLeads] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const getLeads = async () => {
        const result = await API_getHelpLeads(page - 1, pageSize);

        if (result) {
            setTotal(result.total);
            setLeads(result.page);
        }
    }

    const nextPage = () => {
        if (page >= Math.ceil(total / pageSize))
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

    useEffect(() => {
        getLeads();
    }, [page])

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Обращения помощи" />
            <Container fluid={true}>
                {
                    leads.map((lead, idx) => (
                        <Card key={idx} className="help-card">
                            <CardBody>
                                <div className="help-lead-container">
                                    <div className="help-lead-data-row">
                                        <p className="help-lead-data-title">
                                            Телефон отправителя:
                                        </p>

                                        <p className="help-lead-data-value">
                                            {lead.phone}
                                        </p>
                                    </div>

                                    <div className="help-lead-data-row">
                                        <p className="help-lead-data-title">
                                            Почта отправителя:
                                        </p>

                                        <p className="help-lead-data-value">
                                            {lead.email}
                                        </p>
                                    </div>

                                    <div className="help-lead-data-row">
                                        <p className="help-lead-data-title">
                                            Обращение:
                                        </p>

                                        <p className="help-lead-data-value">
                                            {lead.content}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }

                <div className="help-lead-pagination-container">
                    <Pagination className="pagination pagination-primary" aria-label="Page navigation example">
                        <PaginationItem onClick={prevPage}><PaginationLink>Назад</PaginationLink></PaginationItem>
                        {
                            new Array(Math.ceil(total / pageSize)).fill(" ").map((_, idx) => (
                                <PaginationItem onClick={() => selectPage(idx + 1)} active={idx === page - 1} key={idx}><PaginationLink>{idx + 1}</PaginationLink></PaginationItem>
                            ))
                        }
                        <PaginationItem onClick={nextPage}><PaginationLink>Вперед</PaginationLink></PaginationItem>
                    </Pagination>
                </div>
            </Container>
        </>
    );
}

export default HelpLeads;