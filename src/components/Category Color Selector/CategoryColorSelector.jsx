import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import API_getCategoryColors from '../../api/getCategoryColors';
import Preloader from '../preloader/Preloader';

import './CategoryColorSelector.scss';

const CategoryColorSelector = ({
    setColor,
    show,
    toggleShow
}) => {
    const [colorList, setColorList] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        getColorData();
    }, [])

    const getColorData = async () => {
        setLoad(true);

        const data = await API_getCategoryColors();

        setColorList(data);

        setLoad(false);
    }

    return (
        <Modal toggle={() => toggleShow()} isOpen={show}>
            <ModalHeader toggle={() => toggleShow()}>
                Выберите цвет
            </ModalHeader>
            
            <ModalBody>
                { load ? (
                    <Preloader />
                    ) : (<div className="category-color-selector-colors-list">
                    {
                        colorList.map((col, idx) => (
                            <div onClick={() => {
                                setColor(col);
                                toggleShow();
                            }} key={idx} className="category-color-block-container">
                                <div className="category-color-preview" style={{
                                    backgroundColor: col.hex
                                }} />
                                <small className="form-text text-muted">{col.name}</small>
                            </div>
                        ))
                    }
                </div>) }
            </ModalBody>
        </Modal>
    );
}

export default CategoryColorSelector;