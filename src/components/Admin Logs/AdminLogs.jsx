import React, { useEffect, useState } from 'react';
import { Container, Pagination, PaginationItem, PaginationLink, Card, CardBody } from 'reactstrap';
import API_getErrorLogs from '../../api/getErrorLogs';
import Breadcrumbs from '../../layout/breadcrumb';

import moment from 'moment';

import './AdminLogs.scss';
import API_getAdminLogs from '../../api/getAdminLogs';

const AdminLogs = () => {

    const pageSize = 10;

    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getLogs = async () => {
        const result = await API_getAdminLogs(page - 1, pageSize);

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
            <Breadcrumbs parent="Панель управления" title="Админ логи" />
            <Container fluid={true}>
                {logs.map((log, idx) =>
                (<Card key={idx}>
                    <CardBody>
                        <div className="admin-log-data-row">
                            <p className="mb-0 admin-log-data-title">
                                Администратор:
                            </p>

                            <p className="mb-0 admin-log-data-value">
                                {log.admin ? log.admin.username : "Отсутствует"}
                            </p>
                        </div>

                        <div className="admin-log-data-row">
                            <p className="mb-0 admin-log-data-title">
                                Действие:
                            </p>

                            <p className="mb-0 admin-log-data-value">
                                {log.action}
                            </p>
                        </div>

                        <div className="admin-log-data-row">
                            <p className="mb-0 admin-log-data-title">
                                Описание:
                            </p>

                            <p className="mb-0 admin-log-data-value">
                                {log.description}
                            </p>
                        </div>

                        <div className="admin-log-data-row">
                            <p className="mb-0 admin-log-data-title">
                                Дата:
                            </p>

                            <p className="mb-0 admin-log-data-value">
                                {moment(log.date).format("DD.MM.YYYY HH:mm:ss")}
                            </p>
                        </div>
                    </CardBody>
                </Card>))}

                <div className="admin-log-pagination-container">
                    <Pagination className="pagination pagination-primary" aria-label="Page navigation example">
                        <PaginationItem onClick={prevPage}><PaginationLink>Назад</PaginationLink></PaginationItem>
                        {
                            new Array(10).fill(" ").map((_, idx) => page + idx < (Math.ceil(total / pageSize) + 1) && (
                                <PaginationItem onClick={() => selectPage(page + idx)} active={page + idx === page} key={idx}><PaginationLink>{page + idx}</PaginationLink></PaginationItem>
                            ))
                        }
                        <PaginationItem onClick={nextPage}><PaginationLink>Вперед</PaginationLink></PaginationItem>
                    </Pagination>
                </div>

            </Container>
        </>
    );
}

export default AdminLogs;