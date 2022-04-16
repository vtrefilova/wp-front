import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container } from 'reactstrap';
import Breadcrumbs from '../../layout/breadcrumb';
import Preloader from '../preloader/Preloader';
import { toast } from 'react-toastify';
import SweetAlert from 'sweetalert2'

import API_removeSubscriptionVariant from '../../api/removeSubscriptionVariant';
import API_getSubscriptionVariants from '../../api/getSubscriptionVariants';
import API_getSubscriptionVariantGroups from '../../api/getSubscriptionVariantGroups';

import './PriceList.scss';
import { CSSTransition } from 'react-transition-group';
import CreateSubscriptionVariant from './Create Subscription Variant/CreateSubscriptionVariant';
import EditSubscriptionVariant from './Edit Subscription Variant/EditSubscriptionVariant';
import CreateSubscriptionGroup from './Create Subscription Group/CreateSubscriptionGroup';

const PriceList = () => {

    const [data, setData] = useState([]);
    const [variantGroups, setVariantGroups] = useState([]);
    const [load, setLoad] = useState(true);

    const [selectedPrice, setSelectedPrice] = useState(null);

    const [showCreateSubscriptionVariant, setShowCreateSubscriptionVariant] = useState(false);
    const [showEditSubscriptionVariant, setShowEditSubscriptionVariant] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    useEffect(() => {
        getPricingData();
    }, []);

    useMemo(() => {
        if (selectedPrice)
            setShowEditSubscriptionVariant(true);
    }, [selectedPrice])

    useMemo(() => {
        if (!showEditSubscriptionVariant)
            setSelectedPrice(null);
    }, [showEditSubscriptionVariant])

    const getPricingData = async () => {
        setLoad(true);

        const pricingData = await API_getSubscriptionVariants();
        setData(pricingData);

        const groups = await API_getSubscriptionVariantGroups();
        setVariantGroups(groups)

        setLoad(false);
    }

    const removeSubscriptionVariant = async (id) => {
        const result = await SweetAlert.fire({
            title: "Удаление варианта подписки",
            text: "Вы действительно хотите удалить выбранный вариант подписки?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if (result.value) {
            setLoad(true);

            const resultDelete = await API_removeSubscriptionVariant(id);

            setLoad(false);

            if (resultDelete) {
                toast.success("Вариант подписки успешно удален.");
                getPricingData();
            }

        }
    }

    const toggleCreateSubscriptionVariantModal = (val = null) => val ? setShowCreateSubscriptionVariant(val) : setShowCreateSubscriptionVariant(!showCreateSubscriptionVariant);
    const toggleEditSubscriptionVariantModal = (val = null) => val ? setShowEditSubscriptionVariant(val) : setShowEditSubscriptionVariant(!showEditSubscriptionVariant);
    const toggleShowCreateGroup = (val = null) => val ? setShowCreateGroup(val) : setShowCreateGroup(!showCreateGroup);

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Ценообразование" />
            <CreateSubscriptionVariant
                updateData={getPricingData}
                show={showCreateSubscriptionVariant}
                toggleShow={toggleCreateSubscriptionVariantModal}
            />
            <EditSubscriptionVariant
                updateData={getPricingData}
                show={showEditSubscriptionVariant}
                toggleShow={toggleEditSubscriptionVariantModal}
                variant={selectedPrice}
            />
            <CreateSubscriptionGroup
                updateData={getPricingData}
                show={showCreateGroup}
                toggleShow={toggleShowCreateGroup}
            />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                        <div className="price-list-card-header-container">
                            <div className="price-list-card-header-title-container">
                                <h6 className="card-title mb-0">Варианты подписки</h6>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }} className="price-list-card-header-action-container">
                                <Button onClick={toggleCreateSubscriptionVariantModal} color="primary">
                                    <i className="icon-plus"></i></Button>

                                <Button style={{
                                    marginLeft: 10
                                }} onClick={toggleShowCreateGroup} color="primary">
                                    <i className="icon-plus"></i> группа</Button>
                            </div>
                        </div>
                    </CardHeader>
                    {load ? (
                        <Preloader />
                    ) : (
                        <CSSTransition
                            in={load}
                            timeout={100}
                            classNames={"fade"}
                        >
                            <CardBody className="row" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, 300px)',
                                justifyContent: 'space-between'
                            }}>
                                {
                                    data.map((item, idx) => (
                                        <Col key={idx} className='m-10'>
                                            <div className="pricingtable">
                                                <div className="pricingtable-header">
                                                    <h3 className="title">{item.name}</h3>
                                                </div>
                                                <div className="price-value"><span className="currency">{"₽"}</span><span className="amount">{item.newPrice ? item.newPrice : item.price}</span><span className="duration"> / {item.expiration} дней</span></div>
                                                <div className="pricingtable-signup"><Button onClick={(e) => removeSubscriptionVariant(item.id)} color="primary">Удалить</Button>
                                                    <Button onClick={() => setSelectedPrice(item)} color="secondary">Изменить</Button></div>
                                            </div>
                                        </Col>
                                    ))
                                }
                                {
                                    variantGroups.map((item, idx) => (
                                        <Col key={idx} className='m-10'>
                                            <div className="pricingtable">
                                                <div className="pricingtable-header">
                                                    <h3 className="title">Группа {item.name}</h3>
                                                </div>

                                                <div>
                                                    Включает: {item.variants.map((variant) => (variant.name + "\n"))}
                                                </div>
                                                <div style={{
                                                    marginTop: 20
                                                }} className="pricingtable-signup">
                                                    <Button onClick={(e) => removeSubscriptionVariant(item.id)} color="primary">Удалить</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </CardBody>
                        </CSSTransition>)}
                </Card>
            </Container>
        </>
    );
};

export default PriceList;