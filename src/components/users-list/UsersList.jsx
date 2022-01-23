import React, { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Card, Container, CardBody, CardHeader } from 'reactstrap';
import Breadcrumbs from '../../layout/breadcrumb';

const UsersList = () => {

    return (
        <Fragment>
            <Breadcrumbs parent="Панель управления" title="Управление пользователями" />
            <Container fluid={true}>
                {/* <Card className="mb-0">
                    <CardHeader className="d-flex">
                        <h6 className="mb-0">Список базовых категорий</h6>
                    </CardHeader>
                    <CardBody>
                        
                    </CardBody>
                </Card> */}
            </Container>
        </Fragment>
    )
}

export default UsersList;