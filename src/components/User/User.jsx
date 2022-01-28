import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import Breadcrumbs from '../../layout/breadcrumb';

import './User.scss';

import API_getUsersByPage from '../../api/getUsersByPage';
import { useHistory } from 'react-router-dom';

const User = () => {

    const history = useHistory();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loadTable, setLoadTable] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const loadUsers = async () => {
        setLoadTable(true);

        const data = await API_getUsersByPage(page - 1, pageSize);

        if(data) {
            setTableData(data.page);
            setTotalRows(data.total);
        }

        setLoadTable(false);
    }

    useMemo(() => {
        loadUsers();
    }, [page, pageSize])

    console.log(tableData);

    const columns = [
        {
            name: 'Номер телефона',
            selector: 'username', 
            sortable: true,
            center:true,
        },
        {
            name: 'Электронная почта',
            selector: (row) => {
                return row.email.address ? row.email.address : "Отсутствует"
            }, 
            sortable: true,
            center:true,
        },
        {
            name: 'Тип пользователя',
            selector: (row) => {
                return row.type === "APPLE" ? "Apple" : row.type === "SYSTEM" ? "Системный" : "Google";
            }, 
            sortable: true,
            center:true,
        },
        {
            name: 'Роль',
            selector: (row) => {
                return row.role ? row.role.name : "Нет";
            }, 
            sortable: true,
            center:true,
        },
    ]

    const selectRow = (row) => {
        history.replace("/dashboard/user/" + row.id);
    }

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Пользователи" />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                        <h6 className="card-title mb-0">Таблица пользователей</h6>
                    </CardHeader>

                    <CardBody>
                        <DataTable
                            data={tableData}
                            columns={columns}
                            striped={true}
                            progressPending={loadTable}
                            center={true}
                            pagination={true}
                            paginationTotalRows={totalRows}
                            onChangePage={setPage}
                            onChangeRowsPerPage={setPageSize}
                            paginationServer
                            paginationComponentOptions={{
                                noRowsPerPage: true
                            }}
                            onRowClicked={selectRow}
                            // selectableRows
                            // contextActions={contextActions}
                            // onSelectedRowsChange={handleRowSelected}
                            // clearSelectedRows={toggleCleared}
                            />
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default User;