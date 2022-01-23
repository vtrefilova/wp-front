import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import SweetAlert from 'sweetalert2'
import Breadcrumbs from '../../layout/breadcrumb';
import CreateCardBlank from './Create Card Blank/CreateCardBlank';
import EditCardBlank from './Edit Card Blank/EditCardBlank';
import { toast } from 'react-toastify';

import './CardBlank.scss';
import API_getLoyaltyBlanks from '../../api/getLoyaltyBlanks';
import API_removeLoyaltyBlank from '../../api/removeLoyaltyBlank';

const LoyaltyBlank = () => {

    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);

    const [selectedBlank, setSelectedBlank] = useState(null);

    const [showCreateBlank, setShowCreateBlank] = useState(false);
    const [showEditBlank, setShowEditBlank] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    useMemo(() => {
        if(selectedBlank)
            setShowEditBlank(true);
    }, [selectedBlank])

    useMemo(() => {
        if(!showEditBlank)
            setSelectedBlank(null);
    }, [showEditBlank])

    const getData = async () => {
        setLoad(true);

        const result = await API_getLoyaltyBlanks();

        if (result)
            setData(result);

        setLoad(false);
    }

    const removeBlank = async (id) => {
        const result = await SweetAlert.fire({
            title: "Удаление бланка лояльности",
            text: "Вы действительно хотите удалить выбранный бланк лояльности?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if(result.value) {
            setLoad(true);

            const resultDelete = await API_removeLoyaltyBlank(id);

            setLoad(false);

            if(resultDelete) {
                getData();
                toast.success("Бланк успешно удален");
            }

        }
    }

    const toggleShowCreateCard = (val = null) => val != null ? setShowCreateBlank(val) : setShowCreateBlank(!showCreateBlank);
    const toggleShowEditCard = (val = null) => val != null ? setShowEditBlank(val) : setShowEditBlank(!showEditBlank);

    return (
        <>
            <EditCardBlank show={showEditBlank} toggleShow={toggleShowEditCard} updateData={getData} blank={selectedBlank} />
            <CreateCardBlank show={showCreateBlank} toggleShow={toggleShowCreateCard} updateData={getData} />
            <Breadcrumbs parent="Панель управления" title="Бланки карт лояльностей" />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                        <div className="card-blank-header-container">
                            <h6 className='card-title m-b-0'>
                                Бланки карт лояльностей
                            </h6>

                            <Button onClick={toggleShowCreateCard} color='primary'>
                                <i className="icon-plus"></i>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="card-blank-list">
                            {data.map((item, idx) => (<div key={idx} className="card-blank-container shadow-sm">
                                <div className="card-blank-image-container">
                                    <div className="card-blank-actions-container">
                                        <i onClick={() => setSelectedBlank(item)} className="icon-pencil pointer"></i>
                                        <i onClick={() => removeBlank(item.id)} className="icon-trash pointer"></i>
                                    </div>

                                    {item.image ? <img src={`http://92.255.109.54/api/v1/image/content/${item.image.name}/`} className='card-blank-image' />
                                        :
                                        <p className="card-blank-no-image">
                                            Изображение отсутствует
                                        </p>}
                                </div>

                                <div className="card-blank-info-container">
                                    <div className="card-blank-info-row-block">
                                        <p className="card-blank-info-title m-b-0">
                                            Название
                                        </p>

                                        <p className="card-blank-info-value m-b-0">
                                            {item.name}
                                        </p>
                                    </div>

                                    <div className="card-blank-info-row-block">
                                        <p className="card-blank-info-title m-b-0">
                                            Описание
                                        </p>

                                        <p className="card-blank-info-value m-b-0">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* <div className="card-blank-footer-container">
                                    <Button color='primary'>
                                        Изменить
                                    </Button>

                                    <Button color='secondary'>
                                        Удалить
                                    </Button>
                                </div> */}
                            </div>))}
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default LoyaltyBlank;