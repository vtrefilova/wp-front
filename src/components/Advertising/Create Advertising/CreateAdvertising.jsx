import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_createAd from '../../../api/createAd';
import API_adUploadfile from '../../../api/adUploadFile';
import API_createLoyaltyBlank from '../../../api/createLoyaltyBlank';

import './CreateAdvertising.scss';

const CreateAdvertising = ({
    show,
    toggleShow,
    updateData
}) => {
    const [showImageSelector, setShowImageSelector] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleImageSelector = (val = null) => val != null ? setShowImageSelector(val) : setShowImageSelector(!showImageSelector);

    const createAd = async (e) => {
        try {
            e.preventDefault();

            const title = e.target.title.value;
            const subtitle = e.target.subtitle.value;
            const content = e.target.content.value;

            if (!title.length)
                return toast.error("Введите заголовок");

            let result = null;

            const files = e.target.files;

            const createResult = await API_createAd(title, subtitle, content);

            if(createResult != null) {
                for await(let f of files.files) {
                    await API_adUploadfile(f, createResult.id);
                }
                
                updateData();
                toggleShow();
                return toast.success("Объявление успешно создано");
            }
            
            return toast.error("Ошибка при создании объявления")
        } catch (e) {
            return toast.error("Ошибка при создании объявления")
        }
    }

    return (
        <Modal isOpen={show} toggle={() => toggleShow()}>
            <ModalHeader toggle={() => toggleShow()}>
                Создание объявления
            </ModalHeader>

            <Card>
                <Form onSubmit={createAd}>
                    <CardBody>
                        <FormGroup>
                            <Label className="col-form-label pt-0" >Заголовок</Label>
                            <Input name="title" className="form-control" type="text" placeholder="Введите заголовок" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Подзаголовок</Label>
                            <Input name="subtitle" className="form-control" type="text" placeholder="Введите подзаголовок" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Содержимое</Label>
                            <Input name="content" className="form-control" type="text" placeholder="Введите контент" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Файлы</Label>
                            <Input multiple={true} type="file" name="files" />
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

export default CreateAdvertising;