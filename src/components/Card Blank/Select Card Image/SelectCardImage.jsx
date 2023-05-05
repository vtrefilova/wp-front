import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import API_getCardImages from '../../../api/getCardImages';
import Preloader from '../../preloader/Preloader';

import './SelectCardImage.scss';

const SelectCardImage = ({
    show,
    toggleShow,
    setImage
}) => {

    const [imageList, setImageList] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        getImageData();
    }, [])

    const getImageData = async () => {
        setLoad(true);

        const data = await API_getCardImages();

        setImageList(data);

        setLoad(false);
    }

    return (
        <Modal toggle={() => toggleShow()} isOpen={show}>
            <ModalHeader toggle={() => toggleShow()}>
                Выберите изображение
            </ModalHeader>
            
            <ModalBody>
                { load ? (
                    <Preloader />
                    ) : (<div className="card-image-selector-images-list">
                    {
                        imageList.map((ico, idx) => (
                            <div onClick={() => {
                                setImage(ico);
                                toggleShow();
                            }} key={idx} className="card-image-block-container">
                                <img className="card-image-preview" src={`https://api.wallet-box.ru/api/v1/image/content/${ico.name}/`} />
                            </div>
                        ))
                    }
                </div>) }
            </ModalBody>
        </Modal>
    );
}

export default SelectCardImage;