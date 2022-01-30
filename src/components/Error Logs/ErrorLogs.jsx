import React, { useEffect, useState } from 'react';
import { Container, Pagination, PaginationItem, PaginationLink, Card, CardBody } from 'reactstrap';
import API_getErrorLogs from '../../api/getErrorLogs';
import Breadcrumbs from '../../layout/breadcrumb';

import moment from 'moment';

import './ErrorLogs.scss';

const ErrorLogs = () => {

    const pageSize = 10;

    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getLogs = async () => {
        const result = await API_getErrorLogs(page - 1, pageSize);

        if (result) {
            setTotal(result.total);
            setLogs(result.page);
        }

        console.log(result);
    }

    useEffect(() => {
        getLogs();
    }, [page])

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

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Логи ошибок" />
            <Container fluid={true}>
                {logs.map((log, idx) =>
                (<Card key={idx}>
                    <CardBody>
                        <div className="error-log-data-row">
                            <p className="mb-0 error-log-data-title">
                                Источник:
                            </p>

                            <p className="mb-0 error-log-data-value">
                                {log.source.displayName}
                            </p>
                        </div>

                        <div className="error-log-data-row">
                            <p className="mb-0 error-log-data-title">
                                Ошибка:
                            </p>

                            <p className="mb-0 error-log-data-value">
                                {log.name}
                            </p>
                        </div>

                        <div className="error-log-data-row">
                            <p className="mb-0 error-log-data-title">
                                Дата:
                            </p>

                            <p className="mb-0 error-log-data-value">
                                {moment(log.createAt).format("DD.MM.YYYY HH:mm:ss")}
                            </p>
                        </div>

                        <div className="error-log-data-row">
                            <p className="mb-0 error-log-data-title">
                                Трейс:
                            </p>

                            <p className="mb-0 error-log-data-value tract">
                                {log.lastTrace}
                            </p>
                        </div>
                    </CardBody>
                </Card>))}

                <div className="error-log-pagination-container">
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

export default ErrorLogs;