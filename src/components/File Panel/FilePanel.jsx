import React, { useEffect, useState } from 'react';
import { Folder, Home, PlusSquare } from 'react-feather';
import { Card, CardBody, CardHeader, Col, Container, Form, Modal, Row, Button, ModalHeader, Input } from 'reactstrap';
import errorImg from '../../assets/images/search-not-found.png';
import Breadcrumbs from '../../layout/breadcrumb';
import Dropzone from 'react-dropzone-uploader';
import { toast } from 'react-toastify';
import Preloader from '../preloader/Preloader';
import SweetAlert from 'sweetalert2'

import API_getFiles from '../../api/getFiles';
import API_removeFile from '../../api/removeFile';
import API_uploadFile from '../../api/uploadFile';

import './FilePanel.scss';

const FilePanel = () => {

    const [showFileUpload, setShowFileUpload] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedImageType, setSelectedImageType] = useState(0);
    const [load, setLoad] = useState(true);

    const [cardImages, setCardImages] = useState([]);
    const [categoryIcons, setCategoryIcons] = useState([]);

    const toggleShowFileUpload = () => setShowFileUpload(!showFileUpload);

    const categories = [
        {
            title: "Все",
            icon: Home,
            data: categoryIcons.concat(cardImages)
        },
        {
            title: "Иконки категорий",
            icon: Folder,
            data: categoryIcons
        },
        {
            title: "Бланки карт",
            icon: Folder,
            data: cardImages
        }
    ]

    const uploadFile = async (files) => {
        let tag = null;

        if (selectedImageType == "Иконка категории")
            tag = "CATEGORY_ICON";

        if (selectedImageType == "Бланк карты")
            tag = "CARD_IMAGE";

        if (tag == null)
            return toast.error("Выберите тег");

        const result = await API_uploadFile(files[0].file, tag);

        if (result) {
            setSelectedImageType(0);
            toast.success("Файл успешно загружен");
            setShowFileUpload(false);
            getFiles();
        }
    }

    const getFiles = async () => {
        setLoad(true);

        const categoryData = await API_getFiles("CATEGORY_ICON");
        const cardData = await API_getFiles("CARD_IMAGE");

        setCardImages(cardData);
        setCategoryIcons(categoryData);

        setLoad(false);
    }

    useEffect(() => {
        getFiles();
    }, [])

    const removeImage = async (id) => {
        setLoad(true);

        const result = await SweetAlert.fire({
            title: "Удаление файла",
            text: "Вы действительно хотите удалить выбранный файл?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if (result.value) {
            const resultDelete = await API_removeFile(id);

            if (resultDelete) {
                toast.success("Файл успешно удален");
                getFiles();
            }
        }

        setLoad(false);
    }

    return (
        <>
            <Modal toggle={toggleShowFileUpload} isOpen={showFileUpload}>
                <ModalHeader toggle={toggleShowFileUpload}>
                    Загрузка файла
                </ModalHeader>

                <Card>
                    <CardBody>
                        <Input type="select" value={selectedImageType} onChange={(e) => setSelectedImageType(e.currentTarget.value)} style={{
                            marginBottom: 10
                        }}>
                            <option>Выберите тип изображения</option>
                            <option>Иконка категории</option>
                            <option>Бланк карты</option>
                        </Input>

                        <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={true}
                            onSubmit={uploadFile}
                            submitButtonContent="Загрузить"
                            inputContent="Перетащите файл или нажмите на область"
                            styles={{
                                dropzone: { height: 200 },
                                dropzoneActive: { borderColor: 'green' },
                            }}
                        />
                    </CardBody>
                </Card>
            </Modal>
            <Breadcrumbs parent="Панель управления" title="Файловый менеджер" />
            <Container fluid={true}>
                <Row>
                    <Col xl="3" className="box-col-6 pr-0 file-spacing">
                        <div className="file-sidebar">
                            <Card>
                                <CardBody>
                                    <ul>
                                        {
                                            categories.map((category, idx) => (
                                                <li key={idx}>
                                                    <div onClick={() => setSelectedCategory(idx)} className={`btn ${idx == selectedCategory ? "btn-primary" : "btn-light"}`}><category.icon />{category.title}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xl="9" md="12" className="box-col-12">

                        <div className="file-content">
                            <Card>
                                <CardHeader>
                                    <div className="media">
                                        <div />
                                        <div className="media-body text-right">
                                            <Form className="d-inline-flex">
                                                <Button onClick={toggleShowFileUpload} color='primary'> <PlusSquare />Добавить</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardBody className="file-manager">
                                    <h4 className="mb-3">{categories[selectedCategory].title}</h4>
                                    <ul className="files">
                                        {
                                            !load ? categories[selectedCategory].data.length ? categories[selectedCategory].data.map((item, idx) => (
                                                <li key={idx} className="file-box">
                                                    <div className="file-top" style={{
                                                        backgroundImage: `url('https://wallet-box-app.ru/api/v1/image/content/${item.name}/')`,
                                                        backgroundSize: 'contain',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center'
                                                    }}><i style={{
                                                        cursor: "pointer"
                                                    }} onClick={() => removeImage(item.id)} className="f-14 ellips"><i className="icon"><i className="icon-trash"></i></i></i></div>
                                                    <div className="file-bottom">
                                                        <h6>{item.name}</h6>
                                                    </div>
                                                </li>
                                            )) : (
                                                <img className="img-fluid m-auto" src={errorImg} alt="" />
                                            ) : (
                                                <Preloader />
                                            )
                                        }
                                    </ul>
                                </CardBody>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FilePanel;