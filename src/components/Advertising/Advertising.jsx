import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import SweetAlert from 'sweetalert2'
import Breadcrumbs from '../../layout/breadcrumb';
import { toast } from 'react-toastify';

import './Advertising.scss';
import API_getLoyaltyBlanks from '../../api/getLoyaltyBlanks';
import API_removeLoyaltyBlank from '../../api/removeLoyaltyBlank';
import API_getAds from '../../api/getAds';
import CreateAdvertising from './Create Advertising/CreateAdvertising';
import API_removeAd from '../../api/removeAd';
import EditAdvertising from './Edit Advertising/EditAdvertising';

const Advertising = () => {

    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);

    const [selectedAd, setSelectedAd] = useState(null);

    const [showCreateAd, setShowCreateAd] = useState(false);
    const [showEditAd, setShowEditAd] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    useMemo(() => {
        if (selectedAd)
            setShowEditAd(true);
    }, [selectedAd])

    useMemo(() => {
        if (!showEditAd)
            setSelectedAd(null);
    }, [showEditAd])

    const getData = async () => {
        setLoad(true);

        const result = await API_getAds();

        if (result)
            setData(result);

        setLoad(false);
    }

    const removeAd = async (id) => {
        const result = await SweetAlert.fire({
            title: "Удаление объявления",
            text: "Вы действительно хотите удалить выбранное объявление?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if (result.value) {
            setLoad(true);

            const resultDelete = await API_removeAd(id);

            setLoad(false);

            if (resultDelete) {
                getData();
                toast.success("Объявление успешно удалено");
            }

        }
    }

    const toggleShowCreateAd = (val = null) => val != null ? setShowCreateAd(val) : setShowCreateAd(!showCreateAd);
    const toggleShowEditAd = (val = null) => val != null ? setShowEditAd(val) : setShowEditAd(!showEditAd);

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Реклама" />
            <EditAdvertising show={showEditAd} toggleShow={toggleShowEditAd} updateData={getData} ad={selectedAd} />
            <CreateAdvertising show={showCreateAd} toggleShow={toggleShowCreateAd} updateData={getData} />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                        <div className="card-blank-header-container">
                            <h6 className='card-title m-b-0'>
                                Реклама
                            </h6>

                            <Button onClick={toggleShowCreateAd} color='primary'>
                                <i className="icon-plus"></i>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="ad-card-list">
                            {data.map((item, idx) => (<div key={idx} className="ad-card-container shadow-sm">
                                {/* <div className="ad-card-actions-container">
                                    <i onClick={() => setSelectedAd(item)} className="icon-pencil pointer"></i>
                                    <i onClick={() => removeAd(item.id)} className="icon-trash pointer"></i>
                                </div> */}
                                <div className="ad-card-info-container">
                                    <div className="ad-card-info-row-block">
                                        <p className="ad-card-info-title m-b-0">
                                            Заголовок
                                        </p>

                                        <p className="ad-card-info-value m-b-0">
                                            {item.title}
                                        </p>
                                    </div>

                                    <div className="ad-card-info-row-block">
                                        <p className="ad-card-info-title m-b-0">
                                            Подзаголовок
                                        </p>

                                        <p className="ad-card-info-value m-b-0">
                                            {item.subTitle}
                                        </p>
                                    </div>

                                    <div className="ad-card-info-row-block">
                                        <p className="ad-card-info-title m-b-0">
                                            Контент
                                        </p>

                                        <p className="ad-card-info-value m-b-0">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>

                                <div className='ad-card-bottom-container'>
                                    <Button onClick={() => setSelectedAd(item)} color='primary'>
                                        Изменить
                                    </Button>

                                    <Button onClick={() => removeAd(item.id)} color='secondary'>
                                        Удалить
                                    </Button>
                                </div>
                            </div>))}
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default Advertising;