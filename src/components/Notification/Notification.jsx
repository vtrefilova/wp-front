import React, { useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Breadcrumbs from '../../layout/breadcrumb';
import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import Preloader from '../preloader/Preloader';

import './Notification.scss';
import API_findUsers from '../../api/findUsersByPhone';
import API_getUserById from '../../api/getUserById';
import API_sendNotificationForOne from '../../api/sendNotificationForOne';
import API_sendNotificationForAll from '../../api/sendNotificationForAll';

const Notification = () => {
    const [loadFindUsers, setLoadFindUsers] = useState(false);
    const [loadSendForAll, setLoadSendForAll] = useState(false);
    const [loadSendForOne, setLoadSendForOne] = useState(false);
    const [loadSendForSome, setLoadSendForSome] = useState(false);

    const [foundUsers, setFoundUsers] = useState([]);
    const [findInput, setFindInput] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userIds, setUserIds] = useState([]);

    const handleFindInput = (text) => setFindInput(text);

    const findUsersByInput = async () => {
        setLoadFindUsers(true);

        const data = await API_findUsers(findInput);

        if (data != null)
            setFoundUsers(data)

        setLoadFindUsers(false);
    }

    const sendToOne = async (e) => {
        e.preventDefault();

        setLoadSendForOne(true);

        const userPhone = e.target.phone.value;
        const title = e.target.title.value;
        const body = e.target.body.value;

        if (!userPhone.length > 0)
            return toast.error("Введите номер телефона");

        if (!title.length > 0)
            return toast.error("Введите заголовок уведомления");

        if (!body.length > 0)
            return toast.error("Введите тело уведомления");

        const userData = await API_findUsers(userPhone);

        if (userData != null) {
            if (userData.length == 0)
                return toast.error("Пользователь не найден");

            const notificationData = await API_sendNotificationForOne(title, body, userData[0].id);

            if (notificationData)
                toast.success("Уведомление успешно отправлено");
        }

        setLoadSendForOne(false);
    }

    const sendToSome = async (e) => {
        e.preventDefault();

        setLoadSendForSome(true);

        const title = e.target.title.value;
        const body = e.target.body.value;

        if (!title.length > 0)
            return toast.error("Введите заголовок уведомления");

        if (!body.length > 0)
            return toast.error("Введите тело уведомления");

        const notificationData = await API_sendNotificationForAll(title, body, userIds);

        if (notificationData)
            toast.success("Уведомление успешно отправлено");

        setUserIds([])

        setLoadSendForSome(false);
    }

    const sendToAll = async (e) => {
        e.preventDefault();

        setLoadSendForAll(true);

        const title = e.target.title.value;
        const body = e.target.body.value;

        if (!title.length > 0)
            return toast.error("Введите заголовок уведомления");

        if (!body.length > 0)
            return toast.error("Введите тело уведомления");

        const notificationData = await API_sendNotificationForAll(title, body);

        if (notificationData)
            toast.success("Уведомление успешно отправлено");

        setLoadSendForAll(false);
    }

    const importUserId = (phones) => {
        let userId = null;
        const arr = [...userIds];

        foundUsers.forEach((item) => {
            if (item.username === phones[phones.length - 1])
                userId = item.id;
        });

        if(userId != null)
            arr.push(userId);

        setUserIds([...arr]);
    }

    useMemo(() => {
        if (findInput.length >= 5)
            findUsersByInput();
    }, [findInput]);

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Уведомления" />
            <Container fluid={true}>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h6 className="card-title mb-0">Отправка всем пользователям</h6>
                            </CardHeader>
                            { loadSendForAll ? (
                                <Preloader />
                            ) : (<Form onSubmit={sendToAll}>
                                <CardBody>
                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Заголовок</Label>
                                        <Input name="title" className="form-control" type="text" placeholder="Введите заголовок" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Контент</Label>
                                        <Input name="body" className="form-control" type="textarea" placeholder="Введите контент" />
                                    </FormGroup>
                                </CardBody>

                                <CardFooter>
                                    <div className="notification-card-bottom-container">
                                        <Button color="primary">
                                            Отправить
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Form>) }
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h6 className="card-title mb-0">Отправка одному пользователю</h6>
                            </CardHeader>

                            { loadSendForOne ? (
                                <Preloader />
                            ) : (<Form onSubmit={sendToOne}>
                                <CardBody>
                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Номер телефона</Label>
                                        <Input name="phone" className="form-control" type="text" placeholder="Введите номер" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Заголовок</Label>
                                        <Input name="title" className="form-control" type="text" placeholder="Введите заголовок" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Контент</Label>
                                        <Input name="body" className="form-control" type="textarea" placeholder="Введите контент" />
                                    </FormGroup>
                                </CardBody>

                                <CardFooter>
                                    <div className="notification-card-bottom-container">
                                        <Button color="primary">
                                            Отправить
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Form>) }
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <h6 className="card-title mb-0">Отправка нескольким пользователям</h6>
                            </CardHeader>
                            { loadSendForSome ? (
                                <Preloader />
                            ) : (<Form onSubmit={sendToSome}>
                                <CardBody>
                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Заголовок</Label>
                                        <Input name="title" className="form-control" type="text" placeholder="Введите заголовок" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="col-form-label pt-0" >Контент</Label>
                                        <Input name="body" className="form-control" type="textarea" placeholder="Введите контент" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Typeahead
                                            id="multiple-typeahead"
                                            isLoading={loadFindUsers}
                                            clearButton
                                            defaultSelected={[]}
                                            emptyLabel="Вариантов нет"
                                            multiple
                                            options={foundUsers.map((item) => item.username)}
                                            onChange={importUserId}
                                            onInputChange={handleFindInput}
                                            placeholder="Выберите пользователей по номеру телефона"
                                        />
                                    </FormGroup>
                                </CardBody>

                                <CardFooter>
                                    <div className="notification-card-bottom-container">
                                        <Button color="primary">
                                            Отправить
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Form>) }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Notification;