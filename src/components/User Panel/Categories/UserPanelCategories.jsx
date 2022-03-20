import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Container } from 'reactstrap';
import API_getUserCategories from '../../../api/getUserCategories';

import './UserPanelCategories.scss';

const UserPanelCategories = ({
    user
}) => {

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const data = await API_getUserCategories(user.id);

        if (data)
            setCategories(data);
    }

    useEffect(() => {
        if (user)
            getCategories();
    }, [user])

    return (
        <>
            <Card>
                <CardHeader>
                    <h6 className="card-title mb-0">Категории</h6>
                </CardHeader>

                <CardBody>
                    <div className='card-list-max'>
                        {
                            categories.map((category, idx) => (
                                <div key={idx} className="b-b-light user-panel-category-container">
                                    <p className='user-panel-category-item mb-0'>
                                        {category.name}
                                    </p>

                                    <div className="user-panel-category-color" style={{
                                        backgroundColor: category.color?.hex
                                    }} />

                                    {category.icon ? (<div className="user-panel-category-icon-container">
                                        <img className="user-panel-category-icon-preview" src={`https://wallet-box-app.ru/api/v1/image/content/${category.icon.name}/`} />
                                    </div>) : (<p className="text-muted">Иконка отсутствует</p>)}

                                    {/* <div className="user-panel-category-actions">
                                        <span className="action-box large complete-btn pointer" title="Изменить категорию">
                                            <i className="icon"><i className="icon-pencil"></i></i>
                                        </span>
                                        <span className="action-box large delete-btn pointer" title="Удалить категорию">
                                            <i className="icon"><i className="icon-trash"></i></i></span>
                                    </div> */}
                                </div>
                            ))
                        }
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default UserPanelCategories;