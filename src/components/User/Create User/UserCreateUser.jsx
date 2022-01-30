import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, FormGroup, Input, Button, Label } from 'reactstrap';
import API_createUser from '../../../api/createUser';
import API_getRoles from '../../../api/getRoles';
import API_getWalletTypes from '../../../api/getWalletTypes';

import './UserCreateUser.scss';

const UserCreateUser = ({
    updateData,
    showModal,
    toggleModal
}) => {

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("SYSTEM");
    const [password, setPassword] = useState("");
    const [roleName, setRoleName] = useState("");
    const [walletType, setWalletType] = useState("");

    const [roles, setRoles] = useState([]);
    const [walletTypes, setWalletTypes] = useState([]);

    const getWalletTypes = async () => {
        const types = await API_getWalletTypes();

        if (types) {
            if(types.length > 0)
                setWalletType(types[0].walletSystemName);
            
            setWalletTypes(types);
        }
    }

    const getRoles = async () => {
        const data = await API_getRoles();
 
        if (data) {
            if(data.length > 0)
                setRoleName(data[0].name);

            setRoles(data);
        }
    }

    useEffect(() => {
        getWalletTypes();
        getRoles();
    }, [])

    const createUser = async () => {
        if(phone.length == 0)
            return toast.error("Введите номер телефона");


        if(password.length == 0)
            return toast.error("Введите пароль");

        const result = await API_createUser(
            phone,
            email,
            type,
            password,
            walletType,
            roleName
        );

        if(result) {
            toggleModal(false);
            updateData();
            toast.success("Пользователь успешно создан")
        }
    }

        return (
            <Modal size={'lg'} isOpen={showModal} toggle={() => toggleModal()}>
                <ModalHeader toggle={() => toggleModal()}>
                    Создание пользователя
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label className="col-form-label pt-0" >Номер телефона</Label>
                        <Input name="body" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите номер телефона" />
                    </FormGroup>

                    <FormGroup>
                        <Label className="col-form-label pt-0" >Электронный адрес</Label>
                        <Input name="body" value={email} onChange={(e) => setEmail(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите адрес" />
                    </FormGroup>

                    <FormGroup>
                        <Label className="col-form-label pt-0" >Пароль</Label>
                        <Input name="body" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите пароль" />
                    </FormGroup>

                    <FormGroup>
                        <Label className="col-form-label pt-0" >Тип валюты</Label>
                        <Input type="select" onChange={(e) => setWalletType(e.currentTarget.value)} name="select" className="form-control digits">
                            {
                                walletTypes.map((type, idx) => (
                                    <option key={idx}>
                                        {type.walletSystemName}
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
                                        {role.name}
                                    </option>
                                ))
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label className="mb-0" htmlFor="notifications">Тип пользователя</Label>
                        <Input type="select" onChange={(e) => setType(e.currentTarget.value)} name="select" className="form-control digits">
                            <option>
                                SYSTEM
                            </option>
                            <option>
                                APPLE
                            </option>
                            <option>
                                GOOGLE
                            </option>
                        </Input>
                    </FormGroup>

                    <div className="user-create-user-button-container">
                        <Button onClick={createUser} color="primary">
                            Создать
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }

    export default UserCreateUser;