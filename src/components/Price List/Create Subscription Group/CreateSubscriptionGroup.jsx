import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_createSubscriptionVariant from '../../../api/createSubscriptionVariant';
import API_createSubscriptionVariantGroup from '../../../api/createSubscriptionVariantGroup';
import API_getRoles from '../../../api/getRoles';
import API_getSubscriptionVariants from '../../../api/getSubscriptionVariants';

const CreateSubscriptionGroup = ({
    show,
    toggleShow,
    updateData
}) => {
    const [groupList, setGroupList] = useState([]);
    const [subList, setSubList] = useState([]);
    const [name, setName] = useState("")

    const getSubs = async () => {
        const pricingData = await API_getSubscriptionVariants();
        setSubList(pricingData);
    }

    useEffect(() => {
        getSubs()
    }, [])

    const createGroup = async () => {
        if(name.length == 0)
            return toast.error("Введите имя")

        if(groupList.length == 0)
            return toast.error("Выберите группы")

        const result = await API_createSubscriptionVariantGroup(name, groupList.map((item) => item.id))

        if(result) {
            updateData()
            toggleShow()
            return toast.success("Группа создана")
        }
    }

    const addSubToGroup = (subName) => {
        if (subName == "Нет")
            return

        let findItem = subContainList(subName);

        if (findItem)
            return

        subList.forEach((item) => {
            if (item.name == subName)
                findItem = item
        })

        if (!findItem)
            return

        const arr = [...groupList];

        arr.push(findItem)

        setGroupList([...arr])
    }

    const subContainList = (subName) => {
        let result = false;

        groupList.forEach((item) => {
            if (item.name == subName)
                result = item
        })

        return result
    }

    return (
        <>
            <Modal size='lg' isOpen={show} toggle={() => toggleShow()}>
                <ModalHeader toggle={() => toggleShow()}>Создание варианта подписки</ModalHeader>
                <Card>
                    <Form className="theme-form">
                        <CardBody>
                            <div>
                                Одна подписка не может быть сразу в нескольких группах!
                            </div>
                            <div>
                                Подписки, которые будут в группе: {groupList.map((item) => item.name + " ")}
                            </div>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Список подписок</Label>
                                <Input type="select" onChange={(e) => addSubToGroup(e.currentTarget.value)} name="select" className="form-control digits">
                                    {
                                        subList.map((sub, idx) => !subContainList(sub.name) && (
                                            <option key={idx}>
                                                {sub.name}
                                            </option>
                                        ))
                                    }
                                    <option>
                                        Нет
                                    </option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Название группы</Label>
                                <Input value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите название" />
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button type='submit' color="primary" onClick={(e) => {
                                e.preventDefault();
                                createGroup()
                            }} className="mr-1">Создать</Button>
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

export default CreateSubscriptionGroup;