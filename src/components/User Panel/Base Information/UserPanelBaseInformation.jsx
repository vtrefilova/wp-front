import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container, CardFooter, Button, Label, FormGroup, Form, Input } from 'reactstrap';
import API_getWalletTypes from '../../../api/getWalletTypes';
import API_getRoles from '../../../api/getRoles';
import SweetAlert from 'sweetalert2'

import './UserPanelBaseInformation.scss';
import API_removeUser from '../../../api/removeUser';
import API_updateUser from '../../../api/updateUser';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_getUserById from '../../../api/getUserById';
import API_resetPin from '../../../api/resetPin';
import { useMemo } from 'react';

const UserPanelBaseInformation = ({
    user
}) => {

    const history = useHistory();

    const [userData, setUserData] = useState(null);
    const [id, setId] = useState(null);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [walletType, setWalletType] = useState("");
    const [roleName, setRoleName] = useState("");
    const [plannedIncome, setPlannedIncome] = useState(0);
    const [notificationsEnable, setNotificationsEnable] = useState(false);
    const [faceId, setFaceId] = useState(false);
    const [touchId, setTouchId] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [pin, setPin] = useState("");

    const [walletTypes, setWalletTypes] = useState([]);
    const [roles, setRoles] = useState([]);

    const getUser = async () => {
        const result = await API_getUserById(user.id);
        console.log(result);
        if(result)
            setUserData(result);
    }

    const pullData = () => {
        setId(userData.id);
        setPhone(userData.username);
        setEmail(userData.email.address);
        setWalletType(userData.walletType);
        setRoleName(userData.role?.name);
        setPlannedIncome(userData.plannedIncome);
        setNotificationsEnable(userData.notificationsEnable);
        setFaceId(userData.faceId);
        setTouchId(userData.touchId);
        setPin(userData.pinCode);
    }

    const getWalletTypes = async () => {
        const types = await API_getWalletTypes();

        if (types)
            setWalletTypes(types);
    }

    const getRoles = async () => {
        const data = await API_getRoles();

        if (data)
            setRoles(data);
    }

    const removeUser = async () => {
        const result = await SweetAlert.fire({
            title: "Удаление пользователя",
            text: "Вы действительно хотите удалить данного пользователя?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if (result.value) {
            const resultDelete = await API_removeUser(id);

            if (resultDelete) {
                toast.success("Пользователь успешно удален.");
                history.replace("/dashboard/users/");
            }
        }
    }

    useMemo(() => {
        if (user)
            getUser();
    }, [user])

    useMemo(() => {
        if(userData)
            pullData();
    }, [userData])

    useEffect(() => {
        getWalletTypes();
        getRoles();
    }, [])

    const updateUser = async () => {
        if(phone.length === 0)
            return toast.error("Введите номер телефона");

        const result = await API_updateUser(
            id,
            phone,
            email,
            plannedIncome,
            walletType,
            newPassword.length ? newPassword : null,
            roleName
        );

        if(result) {
            getUser();
            return toast.success("Пользователь изменен");
        }
    }

    const resetPin = async () => {
        const result = await API_resetPin(id);

        if(result) {
            getUser();
            return toast.success("PIN успешно сброшен");
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Основная информация</h6>
                </CardHeader>

                <Form>
                    <CardBody>
                        <div className='card-list-max'>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Номер телефона</Label>
                                <Input name="body" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите номер телефона" />
                            </FormGroup>

                            <FormGroup>
                                <Label className="col-form-label pt-0" >Электронный адрес</Label>
                                <Input name="body" value={email} onChange={(e) => setEmail(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите адрес" />
                            </FormGroup>

                            <FormGroup>
                                <Label className="col-form-label pt-0" >Запланированный доход</Label>
                                <Input name="body" value={plannedIncome} onChange={(e) => setPlannedIncome(e.currentTarget.value)} className="form-control" type="number" placeholder="Введите доход" />
                            </FormGroup>

                            <FormGroup>
                                <Label className="col-form-label pt-0" >Новый пароль</Label>
                                <Input name="body" value={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите пароль" />
                            </FormGroup>

                            <FormGroup>
                                <Label className="col-form-label pt-0" >PIN</Label>
                                <Input name="body" value={pin} disabled={true} className="form-control" type="text"/>
                            </FormGroup>

                            <FormGroup>
                                <Label className="col-form-label pt-0" >Тип валюты</Label>
                                <Input type="select" onChange={(e) => setWalletType(e.currentTarget.value)} name="select" className="form-control digits">
                                    {
                                        walletTypes.map((type, idx) => (
                                            <option key={idx}>
                                                {type.walletSystemName}{type.walletSystemName === walletType ? " - Активно" : ""} 
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label className="col-form-label pt-0" >Роль</Label>
                                <Input type="select" onChange={(e) => setRoleName(e.currentTarget.value)} name="select" className="form-control digits">
                                    {
                                        roles.map((role, idx) => (
                                            <option key={idx}>
                                                {role.name}{role.name === roleName ? " - Активно" : ""}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label className="mb-0" htmlFor="notifications">Получение уведомлений</Label>
                                <Input className='form-control' value={notificationsEnable ? "Да" : "Нет"} disabled={true} id="notifications" type="text" />
                            </FormGroup>

                            <FormGroup>
                                <Label className="mb-0" htmlFor="face">Авторизация по FaceID</Label>
                                <Input className='form-control' value={faceId ? "Да" : "Нет"} disabled={true} id="face" type="text" />
                            </FormGroup>

                            <FormGroup>
                                <Label className="mb-0" htmlFor="touch">Авторизация по TouchID</Label>
                                <Input className='form-control' value={touchId ? "Да" : "Нет"} disabled={true} id="touch" type="text" />
                            </FormGroup>
                        </div>
                    </CardBody>

                    <CardFooter>
                        <div className="user-panel-base-information-card-footer">
                            <Button onClick={(e) => {
                                e.preventDefault();
                                removeUser();
                            }} color="secondary">
                                Удалить
                            </Button>

                            <Button onClick={(e) => {
                                e.preventDefault();
                                resetPin();
                            }} color="secondary">
                                Сбросить PIN
                            </Button>

                            <Button onClick={(e) => {
                                e.preventDefault();
                                updateUser();
                            }} color="primary">
                                Сохранить
                            </Button>
                        </div>
                    </CardFooter>
                </Form>
            </Card>
        </>
    );
}

export default UserPanelBaseInformation;