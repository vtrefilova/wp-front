import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_createSubscriptionVariant from '../../../api/createSubscriptionVariant';
import API_getRoles from '../../../api/getRoles';

const CreateSubscriptionVariant = ({
    show,
    toggleShow,
    updateData
}) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [expiration, setExpiration] = useState(0);
    const [roles, setRoles] = useState([])
    const [roleName, setRoleName] = useState(null);

    const getRoles = async () => {
        const result = await API_getRoles();

        if (result) {
            setRoles(result)
        }
    }

    useEffect(() => {
        getRoles()
    }, [])

    const clearData = () => {
        setName("");
        setDesc("");
        setNewPrice(0);
        setPrice(0);
        setExpiration(0);
    }

    const createSubscription = async (e) => {
        e.preventDefault();

        if (!name.length)
            return toast.error("Введите название подписки");

        if (!expiration)
            return toast.error("Введите срок действия подписки");

        if (expiration < 0)
            return toast.error("Невалидный срок действия");

        let roleId = null;

        roles.forEach((item) => {
            if(item.name == roleName)
                roleId = item.id
        })

        const result = await API_createSubscriptionVariant(
            name,
            desc,
            price,
            newPrice,
            expiration,
            roleId
        );

        if (result != null) {
            clearData();
            toggleShow();
            updateData();
            toast.success("Вариант подписки успешно создан");
        }
    }

    return (
        <>
            <Modal size='lg' isOpen={show} toggle={() => toggleShow()}>
                <ModalHeader toggle={() => toggleShow()}>Создание варианта подписки</ModalHeader>
                <Card>
                    <Form onSubmit={(e) => createSubscription(e)} className="theme-form">
                        <CardBody>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Название подписки</Label>
                                <Input value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите название" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Описание подписки</Label>
                                <Input value={desc} onChange={(e) => setDesc(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите описание" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Роль после покупки</Label>
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
                                <Label className="col-form-label pt-0" >Стоимость подписки</Label>
                                <Input value={price} onChange={(e) => setPrice(e.currentTarget.value)} className="form-control" type="number" placeholder="Введите стоимость" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Новая стоимость подписки</Label>
                                <Input value={newPrice} onChange={(e) => setNewPrice(e.currentTarget.value)} className="form-control" type="number" placeholder="Введите стоимость" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Время действия (в днях)</Label>
                                <Input value={expiration} onChange={(e) => setExpiration(e.currentTarget.value)} className="form-control" type="number" placeholder="Введите время действия" />
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button type='submit' color="primary" className="mr-1">Создать</Button>
                            <Button onClick={(e) => {
                                e.preventDefault();
                                toggleShow();
                            }} color="secondary">Отмена</Button>
                        </CardFooter>
                    </Form>
                </Card>
            </Modal>
        </>
    );
}

export default CreateSubscriptionVariant;