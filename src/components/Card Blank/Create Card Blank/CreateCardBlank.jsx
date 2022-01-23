import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_createLoyaltyBlank from '../../../api/createLoyaltyBlank';
import SelectCardImage from '../Select Card Image/SelectCardImage';

import './CreateCardBlank.scss';

const CreateCardBlank = ({
    show,
    toggleShow,
    updateData
}) => {
    const [showImageSelector, setShowImageSelector] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleImageSelector = (val = null) => val != null ? setShowImageSelector(val) : setShowImageSelector(!showImageSelector);

    const createCard = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const desc = e.target.desc.value;

        if(!name.length)
            return toast.error("Введите название карты");

        let result = null;

        if(selectedImage) {
            result = await API_createLoyaltyBlank(name, desc, selectedImage.id);
        } else {
            result = await API_createLoyaltyBlank(name, desc);
        }

        if(result) {
            updateData();
            toggleShow();
            toast.success("Бланк успешно создан");
        }
    }

    return (
        <Modal isOpen={show} toggle={() => toggleShow()}>
            <SelectCardImage toggleShow={toggleImageSelector} show={showImageSelector} setImage={setSelectedImage} />

            <ModalHeader toggle={() => toggleShow()}>
                Создание бланка карты лояльности
            </ModalHeader>

            <Card>
                <Form onSubmit={createCard}>
                    <CardBody>
                        <FormGroup>
                            <Label className="col-form-label pt-0" >Название бланка</Label>
                            <Input name="name" className="form-control" type="text" placeholder="Введите название" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Описание бланка</Label>
                            <Input name="desc" className="form-control" type="text" placeholder="Введите описание" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Изображение бланка</Label>
                            <div onClick={toggleImageSelector} className={`create-card-blank-image-container pointer ${selectedImage ? "" : "b-light"}`}>
                                {selectedImage ? (
                                    <img className="card-image-preview" src={`http://92.255.109.54/api/v1/image/content/${selectedImage.name}/`} />
                                ) : (<p style={{
                                    textAlign: 'center'
                                }}>
                                    Выберите изображение или пропустите этот этап
                                </p>)}
                            </div>
                        </FormGroup>

                        <div className="create-card-blank-footer-block">
                            <Button color='primary'>
                                Создать
                            </Button>

                            <Button color='secondary' onClick={(e) => {
                                e.preventDefault();
                                toggleShow();
                            }}>
                                Отмена
                            </Button>
                        </div>
                    </CardBody>
                </Form>
            </Card>
        </Modal>
    );
}

export default CreateCardBlank;