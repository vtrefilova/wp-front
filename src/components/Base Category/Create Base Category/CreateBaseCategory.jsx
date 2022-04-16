import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import CategoryColorSelector from '../../Category Color Selector/CategoryColorSelector';
import CategoryIconSelector from '../../Category Icon Selector/CategoryIconSelector';
import { toast } from 'react-toastify';
import API_createBaseCategory from '../../../api/createBaseCategory';

import './CreateBaseCategory.scss';

const CreateBaseCategory = ({
    show,
    toggleShow,
    updateData
}) => {

    const [selectedColor, setSelectedColor] = useState(null);
    const [showColorSelector, setShowColorSelector] = useState(false);

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showIconSelector, setShowIconSelector] = useState(false);

    const toggleShowColorSelector = () => setShowColorSelector(!showColorSelector);
    const toggleShowIconSelector = () => setShowIconSelector(!showIconSelector);

    const clearCreateBaseCategoryData = () => {
        setSelectedColor(null);
        setSelectedIcon(null);
    }

    const createBaseCategory = async (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const desc = e.target.desc.value;

        if(!name.length)
            return toast.error("Введите название категории.");

        if(name.length < 2 || name.length > 64)
            return toast.error("Минимальная длина названия категории 2, максимальная 64.");

        if(!selectedColor)
            return toast.error("Выберите цвет категории");

        const result = await API_createBaseCategory(
            name,
            desc,
            selectedColor.systemName,
            selectedIcon ? selectedIcon.id : null
        );

        if(result != null) {
            clearCreateBaseCategoryData();
            toggleShow(false);
            toast.success("Базовая категория создана.");
            updateData();
        }
    }

    return (
        <>
            <CategoryColorSelector show={showColorSelector} setColor={setSelectedColor} toggleShow={toggleShowColorSelector} />
            <CategoryIconSelector show={showIconSelector} setIcon={setSelectedIcon} toggleShow={toggleShowIconSelector} />
            <Modal size='lg' isOpen={show} toggle={() => toggleShow()}>
                <ModalHeader toggle={() => toggleShow()}>Создание базовой категории</ModalHeader>

                <Card>
                    <Form onSubmit={(e) => createBaseCategory(e)} className="theme-form">
                        <CardBody>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Название категории</Label>
                                <Input name="name" className="form-control" type="text" placeholder="Введите название" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Описание категории</Label>
                                <Input name="desc" className="form-control" type="text" placeholder="Введите описание" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Цвет категории</Label>
                                <div onClick={toggleShowColorSelector} className="selected-color-container">
                                    <div className={`selected-color-round ${!selectedColor && "no-color"}`} style={{
                                        backgroundColor: selectedColor ? selectedColor.hex : 'transparent'
                                    }} />
                                    <small className="form-text text-muted">{selectedColor ? selectedColor.name : "Нет"}</small>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Иконка категории</Label>
                                <div onClick={toggleShowIconSelector} className="selected-icon-container">
                                    <div className={`selected-icon-block`}>
                                        {selectedIcon &&
                                            <img className="selected-icon-preview" src={`https://wallet-box-app.ru/api/api/v1/image/content/${selectedIcon.name}/`} />}
                                    </div>
                                    <small className="form-text text-muted">{selectedIcon ? "" : "Нет"}</small>
                                </div>
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

export default CreateBaseCategory;