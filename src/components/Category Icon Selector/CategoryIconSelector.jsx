import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import API_getCategoryIcons from '../../api/getCategoryIcons';
import Preloader from '../preloader/Preloader';

import './CategoryIconSelector.scss';

const CategoryIconSelector = ({
    show,
    toggleShow,
    setIcon
}) => {

    const [iconList, setIconList] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        getIconData();
    }, [])

    const getIconData = async () => {
        setLoad(true);

        const data = await API_getCategoryIcons();

        setIconList(data);

        setLoad(false);
    }

    return (
        <Modal toggle={() => toggleShow()} isOpen={show}>
            <ModalHeader toggle={() => toggleShow()}>
                Выберите иконку
            </ModalHeader>
            
            <ModalBody>
                { load ? (
                    <Preloader />
                    ) : (<div className="category-icon-selector-icons-list">
                    {
                        iconList && iconList.map((ico, idx) => (
                            <div onClick={() => {
                                setIcon(ico);
                                toggleShow();
                            }} key={idx} className="category-icon-block-container">
                                <img className="category-icon-preview" src={`https://wallet-box-app.ru/api/v1/image/content/${ico.name}/`} />
                            </div>
                        ))
                    }
                </div>) }
            </ModalBody>
        </Modal>
    );
}

export default CategoryIconSelector;