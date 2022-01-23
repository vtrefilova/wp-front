import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import CategoryColorSelector from '../../Category Color Selector/CategoryColorSelector';
import CategoryIconSelector from '../../Category Icon Selector/CategoryIconSelector';
import { toast } from 'react-toastify';
import API_updateBaseCategory from '../../../api/updateBaseCategory';

import './EditBaseCategory.scss';

const EditBaseCategory = ({
    show,
    toggleShow,
    updateData,
    category
}) => {

    const [selectedColor, setSelectedColor] = useState(null);
    const [showColorSelector, setShowColorSelector] = useState(false);

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showIconSelector, setShowIconSelector] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const toggleShowColorSelector = () => setShowColorSelector(!showColorSelector);
    const toggleShowIconSelector = () => setShowIconSelector(!showIconSelector);

    useEffect(() => {
        pullCategoryData(category);
    }, [category])

    const pullCategoryData = (category) => {
        if(category) {
            setSelectedIcon(category.icon);
            setSelectedColor(category.color);
            setName(category.name);
            setDesc(category.description);
        }
    }

    const updateBaseCategory = async (e) => {
        console.log(e);
        e.preventDefault();
        
        if(!category)
            return toggleShow();

        if(!name.length)
            return toast.error("Введите название категории.");

        if(name.length < 4 || name.length > 64)
            return toast.error("Минимальная длина названия категории 4, максимальная 64.");

        if(!selectedColor)
            return toast.error("Выберите цвет категории");

        const result = await API_updateBaseCategory(
            name,
            desc,
            selectedColor.systemName,
            selectedIcon ? selectedIcon.id : null,
            category.id
        );

        if(result != null) {
            toggleShow(false);
            toast.success("Базовая категория изменена.");
            updateData();
        }
    }

    return (
        <>
            <CategoryColorSelector show={showColorSelector} setColor={setSelectedColor} toggleShow={toggleShowColorSelector} />
            <CategoryIconSelector show={showIconSelector} setIcon={setSelectedIcon} toggleShow={toggleShowIconSelector} />
            <Modal size='lg' isOpen={show} toggle={() => toggleShow()}>
                <ModalHeader toggle={() => toggleShow()}>Изменение базовой категории</ModalHeader>

                <Card>
                    <Form onSubmit={(e) => updateBaseCategory(e)} className="theme-form">
                        <CardBody>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Название категории</Label>
                                <Input name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите название" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >Описание категории</Label>
                                <Input name="desc" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите описание" />
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
                                            <img className="selected-icon-preview" src={`http://92.255.109.54/api/v1/image/content/${selectedIcon.name}/`} />}
                                    </div>
                                    <small className="form-text text-muted">{selectedIcon ? "" : "Нет"}</small>
                                </div>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button type='submit' color="primary" className="mr-1">Сохранить</Button>
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

export default EditBaseCategory;