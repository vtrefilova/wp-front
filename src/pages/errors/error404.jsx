import React, { Fragment } from 'react';
import sad from '../../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';
import {Container,Button,Media,Col} from "reactstrap"
import { BACK_TO_HOME_PAGE } from "../../constant";

const Error404 = () => {
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="error-wrapper">
                <Container>
                    <Media body className="img-100" src={sad} alt="" />
                    <div className="error-heading">
                    <h2 className="headline font-danger">{"404"}</h2>
                    </div>
                    <Col md="8 offset-md-2">
                    <p className="sub-content">{"Страница не найдена."}</p>
                    </Col>
                    <Link to={`${process.env.PUBLIC_URL}/dashboard/main/`}><Button color="danger-gradien" size='lg'>Вернутся домой</Button></Link>
                </Container>
                </div>
            </div>
        </Fragment>
    );
};

export default Error404;