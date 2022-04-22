import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container, CardFooter, Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import { toast } from 'react-toastify';

import './UserPanelSubscription.scss';

import API_getUserSubscription from '../../../api/getUserSubscription';
import API_resetSubscription from '../../../api/resetSubscription';
import API_extendSubscription from '../../../api/extendSubscription';

const UserPanelSubscription = ({
    user
}) => {

    const [subscription, setSubscription] = useState(null);

    const [extendDays, setExtendDays] = useState(0);
    const [showExtendModal, setShowExtendModal] = useState(false);

    const toggleShowExtendModal = () => setShowExtendModal(!showExtendModal);

    const getSubscription = async () => {
        const data = await API_getUserSubscription(user.id);

        if (data)
            setSubscription(data);
    }

    useMemo(() => {
        if (user)
            getSubscription();
    }, [user])

    const resetSubscription = async () => {
        if (!subscription)
            return;

        const result = await API_resetSubscription(user.id);

        if (result) {
            getSubscription();
            return toast.success("Подписка успешно аннулирована");
        }
    }

    const extendSubscription = async () => {
        if(extendDays <= 0)
            return toast.error("Введите количество дней");

        const result = await API_extendSubscription(user.id, extendDays);

        if(result) {
            setExtendDays(0);
            getSubscription();
            setShowExtendModal(false);
            return toast.success("Подписка успешно продлена");
        }
    }

    return (
        <>
            <Modal toggle={toggleShowExtendModal} isOpen={showExtendModal}>
                <ModalHeader toggle={toggleShowExtendModal}>
                    Продление подписки
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <Label className="col-form-label pt-0" >Количество дней</Label>
                        <Input name="body" value={extendDays} onChange={(e) => setExtendDays(e.currentTarget.value)} className="form-control" type="number" placeholder="Введите кол-во дней" />
                    </FormGroup>

                    <div className="user-panel-subscription-extend-modal-footer">
                        <Button onClick={extendSubscription} color="primary">
                            Продлить
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Подписка</h6>
                </CardHeader>

                <CardBody>
                    <div className="user-panel-subscription-row-container">
                        <p className="user-panel-subscription-row-title mb-0">
                            Начало действия:
                        </p>
                        <p className="user-panel-subscription-row-value mb-0">
                            {subscription && subscription.startDate ? moment(subscription.startDate).format("DD.MM.YYYY HH:mm:ss") : "Отсутствует"}
                        </p>
                    </div>

                    <div className="user-panel-subscription-row-container">
                        <p className="user-panel-subscription-row-title mb-0">
                            Конец действия:
                        </p>
                        <p className="user-panel-subscription-row-value mb-0">
                            {subscription && subscription.endDate ? moment(subscription.endDate).format("DD.MM.YYYY HH:mm:ss") : "Отсутствует"}
                        </p>
                    </div>

                    <div className="user-panel-subscription-row-container">
                        <p className="user-panel-subscription-row-title mb-0">
                            Статус:
                        </p>
                        <p className={`user-panel-subscription-row-value mb-0 ${subscription && subscription.active ? "active" : "no-active"}`}>
                            {subscription && subscription.active ? "Активно" : "Неактивно"}
                        </p>
                    </div>
                </CardBody>

                <CardFooter>
                    <div className="user-panel-subscription-card-footer">
                        <Button onClick={resetSubscription} color="secondary">
                            Аннулировать
                        </Button>

                        <Button onClick={() => setShowExtendModal(true)} color="primary">
                            Продлить
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}

export default UserPanelSubscription;