import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_editSubscriptionVariant from '../../../api/updateSubscriptionVariant';

const EditSubscriptionVariant = ({
    show,
    toggleShow,
    updateData,
    variant
}) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [expiration, setExpiration] = useState(0);

    const pullData = () => {
        if(variant) {
            setName(variant.name);
            setDesc(variant.description);
            setPrice(variant.price);
            setNewPrice(variant.newPrice);
            setExpiration(variant.expiration);
        }
    }

    useEffect(() => {
        if(variant)
            pullData();
    }, [variant])

    const clearData = () => {
        setName("");
        setDesc("");
        setNewPrice(0);
        setPrice(0);
        setExpiration(0);
    }

    const editSubscription = async (e) => {
        e.preventDefault();

        if(!variant)
            return toggleShow(false);

        if(!name.length)
            return toast.error("Введите название подписки");

        if(!expiration)
            return toast.error("Введите срок действия подписки");

        if(expiration < 0)
            return toast.error("Невалидный срок действия");

        const result = await API_editSubscriptionVariant(
            name,
            desc,
            price,
            newPrice,
            expiration,
            variant.id
        );

        if(result != null) {
            clearData();
            toggleShow();
            updateData();
            toast.success("Вариант подписки успешно изменен");
        }
    }

    return (
        <>
            <Modal size='lg' isOpen={show} toggle={() => toggleShow()}>
                <ModalHeader toggle={() => toggleShow()}>Изменение варианта подписки</ModalHeader>

                <Card>
                    <Form onSubmit={(e) => editSubscription(e)} className="theme-form">
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
                            <Button type='submit' color="primary" className="mr-1">Изменить</Button>
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

export default EditSubscriptionVariant;