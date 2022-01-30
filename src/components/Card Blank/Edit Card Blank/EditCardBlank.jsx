import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_createLoyaltyBlank from '../../../api/createLoyaltyBlank';
import API_updateLoyaltyBlank from '../../../api/updateLoyaltyBlank';
import SelectCardImage from '../Select Card Image/SelectCardImage';

import './EditCardBlank.scss';

const EditCardBlank = ({
    show,
    toggleShow,
    updateData,
    blank
}) => {
    const [showImageSelector, setShowImageSelector] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const toggleImageSelector = (val = null) => val != null ? setShowImageSelector(val) : setShowImageSelector(!showImageSelector);

    const pullData = () => {
        if(blank) {
            setName(blank.name);
            setDesc(blank.description);
            setSelectedImage(blank.image);
        }
    }

    useMemo(() => {
        if(blank)
            pullData();
    }, [blank])

    const updateCard = async (e) => {
        e.preventDefault();

        if(!name.length)
            return toast.error("Введите название карты");

        let result = null;

        if(selectedImage) {
            result = await API_updateLoyaltyBlank(name, desc, selectedImage.id, blank.id);
        } else {
            result = await API_updateLoyaltyBlank(name, desc, false, blank.id);
        }

        if(result) {
            updateData();
            toggleShow();
            toast.success("Бланк успешно изменен");
        }
    }

    return (
        <Modal isOpen={show} toggle={() => toggleShow()}>
            <SelectCardImage toggleShow={toggleImageSelector} show={showImageSelector} setImage={setSelectedImage} />

            <ModalHeader toggle={() => toggleShow()}>
                Изменение бланка карты лояльности
            </ModalHeader>

            <Card>
                <Form onSubmit={updateCard}>
                    <CardBody>
                        <FormGroup>
                            <Label className="col-form-label pt-0" >Название бланка</Label>
                            <Input value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите название" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Описание бланка</Label>
                            <Input value={desc} onChange={(e) => setDesc(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите описание" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Изображение бланка</Label>
                            <div onClick={toggleImageSelector} className={`edit-card-blank-image-container pointer ${selectedImage ? "" : "b-light"}`}>
                                {selectedImage ? (
                                    <img className="card-image-preview" src={`http://46.30.41.45/api/v1/image/content/${selectedImage.name}/`} />
                                ) : (<p style={{
                                    textAlign: 'center'
                                }}>
                                    Выберите изображение или пропустите этот этап
                                </p>)}
                            </div>
                        </FormGroup>

                        <div className="edit-card-blank-footer-block">
                            <Button color='primary'>
                                Изменить
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

export default EditCardBlank;