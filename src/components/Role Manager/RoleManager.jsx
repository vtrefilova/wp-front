import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input } from 'reactstrap';
import Preloader from '../preloader/Preloader';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../layout/breadcrumb';
import { PlusSquare } from 'react-feather';
import { useHistory } from 'react-router-dom';

import API_getRoles from '../../api/getRoles';

import './RoleManager.scss';
import API_createRole from '../../api/createRole';

const RoleManager = () => {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    const history = useHistory();

    useEffect(() => {
        getRolesData();
    }, [])

    const getRolesData = async () => {
        setLoad(true);

        const rolesData = await API_getRoles();

        if(rolesData)
            setData(rolesData);

        setLoad(false);
    }

    const createRole = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;

        if(!name.length)
            return toast.error("Введите название роли");

        for(let i = 0; i < data.length; i++)
            if(data[i].name === name)
                return toast.error("Роль с данным именем уже существует");

        setLoad(true);

        const result = await API_createRole(name);

        setLoad(false);

        if(result) {
            toast.success("Роль успешно создана");
            getRolesData();
        }
    }

    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Менеджер ролей" />
            <Container fluid={true}>
                <Card className="mb-0">
                    <CardHeader className="d-flex">
                        <div className="role-manager-header-container">
                            <h6 className="card-title mb-0">
                                Список ролей
                            </h6>

                            <Form className="role-manager-create-role-block" onSubmit={(e) => createRole(e)}>
                                <FormGroup>
                                    <Input name="name" className="form-control" type="text" placeholder="Название роли" />
                                </FormGroup>
                                <Button color='primary'><i className="icon-plus"></i> Добавить новую роль</Button>
                            </Form>
                        </div>

                    </CardHeader>

                    {load ? (<Preloader />) : (<CardBody>

                        <div className="todo">
                            <div className="todo-list-wrapper">
                                <div className="todo-list-container">
                                    <div className="todo-list-body">
                                        <ul id="todo-list">
                                            {data.map((role, idx) => (<li key={idx} onClick={() => history.replace(`/dashboard/role-editor/${role.id}`)} className={"task pointer"} >
                                                <div className="task-container no-anim">
                                                    <div className="task-data-container">
                                                        <h4 className="task-label">{role.name} {role.autoApply && (
                                                            <span className={`badge badge-success`}>Автоприменение</span>
                                                        )}
                                                        {role.admin && (
                                                            <span className={`badge badge-primary`}>Админ роль</span>
                                                        )}
                                                        {role.roleAfterBuy && (
                                                            <span className={`badge badge-secondary`}>Роль после покупки подписки</span>
                                                        )}
                                                        {role.roleAfterBuyExpiration && (
                                                            <span className={`badge badge-info`}>Роль после истечения подписки</span>
                                                        )}
                                                        </h4>
                                                    </div>
                                                    {/* <span className="task-action-btn">
                                                            <span onClick={() => setSelectedCategory(category)} className="action-box large complete-btn" title="Изменить базовую категорию">
                                                                <i className="icon"><i className="icon-pencil"></i></i>
                                                            </span>
                                                            <span onClick={() => removeBaseCategory(category.id)} className="action-box large delete-btn" title="Удалить базовую категорию">
                                                                <i className="icon"><i className="icon-trash"></i></i></span>
                                                        </span> */}
                                                </div>
                                            </li>))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>)}
                </Card>
            </Container>
        </>
    );
}

export default RoleManager;