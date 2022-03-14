import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, Form, FormGroup, Input, Label, Modal, ModalHeader } from 'reactstrap';
import API_updateAd from '../../../api/updateAd';
import API_adRemoveFile from '../../../api/adRemoveFile';
import API_adUploadfile from '../../../api/adUploadFile';

import './EditAdvertising.scss';

const EditAdvertising = ({
    show,
    toggleShow,
    updateData,
    ad
}) => {
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    const pullData = () => {
        if (ad) {
            setTitle(ad.title);
            setSubTitle(ad.subTitle);
            setContent(ad.content);
            setFiles(ad.files);
        }
    }

    useMemo(() => {
        if (ad)
            pullData();
    }, [ad])

    const updateAd = async (e) => {
        e.preventDefault();

        if (!title.length)
            return toast.error("Введите заголовок");

        const result = await API_updateAd(ad.id, title, subTitle, content);

        for await(let f of e.target.files.files) {
            await API_adUploadfile(f, result.id);
        }

        if(result) {
            updateData();
            toggleShow();
            toast.success("Объявление успешно изменено");
        }
    }

    const removePhotoAd = async (adId, id) => {
        const result = await API_adRemoveFile(adId, id);

        if(result) {
            updateData();
            toggleShow();
            toast.success("Файл успешно удален");
        }
    }

    return (
        <Modal isOpen={show} toggle={() => toggleShow()}>
            <ModalHeader toggle={() => toggleShow()}>
                Изменение объявления
            </ModalHeader>

            <Card>
                <Form onSubmit={updateAd}>
                    <CardBody>
                        <FormGroup>
                            <Label className="col-form-label pt-0" >Заголовок</Label>
                            <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите заголовок" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Подзаголовок</Label>
                            <Input value={subTitle} onChange={(e) => setSubTitle(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите подзаголовок" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Контент</Label>
                            <Input value={content} onChange={(e) => setContent(e.currentTarget.value)} className="form-control" type="text" placeholder="Введите содержимое" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Файлы</Label>
                            <Input multiple={true} type="file" name="files" />
                        </FormGroup>

                        <FormGroup>
                            <Label className="col-form-label pt-0" >Прикрепленные файлы</Label>
                            {ad != null && ad.files != null && ad.files.length > 0 && ad.files.map((item) => <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <p className="added-file">
                                    {item.path}
                                </p>
                                <i onClick={() => removePhotoAd(ad.id, item.id)} className="icon-trash pointer"></i>
                            </div>)}
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

export default EditAdvertising;