import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Breadcrumbs from '../../layout/breadcrumb';
import SweetAlert from 'sweetalert2'

import API_getRoleById from '../../api/getRoleById';

import './RoleEditor.scss';
import API_getPermissionVariants from '../../api/getPermissionVariants';
import Preloader from '../preloader/Preloader';
import { toast } from 'react-toastify';
import API_updateUserRole from '../../api/updateRole';
import API_getRolePermissions from '../../api/getRolePermissions';
import API_addPermissionToRole from '../../api/addPermissionToRole';
import API_removePermissionFromRole from '../../api/removePermissionFromRole';
import API_removeRole from '../../api/removeRole';

const RoleEditor = () => {

    const { id } = useParams();
    const history = useHistory();

    const [loadMainCard, setLoadMainCard] = useState(true);
    const [loadPermissionCard, setLoadPermissionCard] = useState(true);

    const [permissionVariants, setPermissionVariants] = useState([]);
    const [inRolePermissions, setInRolePermissions] = useState([]);
    const [permissionsForAdd, setPermissionsForAdd] = useState([]);
    const [permissionsForDelete, setPermissionsForDelete] = useState([]);

    const [roleName, setRoleName] = useState("Нет");
    const [isAdmin, setIsAdmin] = useState(false);
    const [roleForBlocked, setRoleForBlocked] = useState(false);
    const [roleAfterBuy, setRoleAfterBuy] = useState(false);
    const [autoApply, setAutoApply] = useState(false);
    const [roleAfterBuyExpiration, setRoleAfterBuyExpiration] = useState(false);

    useEffect(() => {
        if (id) {
            const regEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            if (!regEx.test(id))
                history.replace("/dashboard/role-panel/");
            else {
                getRoleData();
                getPermissionData();
            }
        }
    }, [])

    const getPermissionData = async () => {
        setLoadPermissionCard(true);

        const permissionVars = await API_getPermissionVariants();

        if (permissionVars)
            setPermissionVariants(permissionVars);

        const rolePermissions = await API_getRolePermissions(id);
        if (rolePermissions) {
            setInRolePermissions(rolePermissions);
        }

        setLoadPermissionCard(false);
    }

    const getRoleData = async () => {
        setLoadMainCard(true);

        const roleData = await API_getRoleById(id);

        if (roleData) {
            setRoleName(roleData.name);
            setIsAdmin(roleData.admin);
            setRoleAfterBuy(roleData.roleAfterBuy)
            setAutoApply(roleData.autoApply);
            setRoleAfterBuyExpiration(roleData.roleAfterBuyExpiration);
            setLoadMainCard(false);
        }
        else
            history.replace("/dashboard/role-panel/");
    }

    const saveRole = async (e) => {
        e.preventDefault();

        if (!roleName.length)
            return toast.error("Введите название роли.");

        setLoadMainCard(true);

        const result = await API_updateUserRole(
            roleName,
            autoApply,
            isAdmin,
            roleAfterBuy,
            roleAfterBuyExpiration,
            roleForBlocked,
            id
        );

        if (result) {
            setRoleName(result.name);
            setIsAdmin(result.admin);
            setRoleAfterBuy(result.roleAfterBuy)
            setAutoApply(result.autoApply);
            setRoleAfterBuyExpiration(result.roleAfterBuyExpiration);
            toast.success("Роль успешно изменена");
        }

        setLoadMainCard(false);
    }

    const savePermissions = async () => {
        setLoadPermissionCard(true);

        for await (const perm of permissionsForAdd) {
            await API_addPermissionToRole(id, perm);
        }

        for await (const perm of permissionsForDelete) {
            let permId = null;

            inRolePermissions.forEach((item) => {
                if (item.permission == perm)
                    permId = item.id;
            })

            if (permId)
                await API_removePermissionFromRole(permId);
        }

        setLoadPermissionCard(false);

        setPermissionsForAdd([]);
        setPermissionsForDelete([]);

        getPermissionData();
    }

    const permissionInRole = (name) => {
        let flag = false;

        inRolePermissions.forEach((item) => {
            if (item.permission == name)
                flag = true;
        })

        return flag;
    }

    const removeRole = async () => {
        const result = await SweetAlert.fire({
            title: "Удаление роли",
            text: "Вы действительно хотите удалить данную роль?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if (result.value) {
            const resultDelete = await API_removeRole(id);

            if (resultDelete) {
                toast.success("Роль успешно удалена.");
                history.replace("/dashboard/role-panel/");
            }
        }
    }


    return (
        <>
            <Breadcrumbs parent="Панель управления" title="Менеджер ролей" />
            <Container fluid={true}>
                <Row >
                    <Col xl="4">
                        <Card>
                            <CardHeader>
                                <h6 className="card-title mb-0">
                                    Основная информация
                                </h6>
                            </CardHeader>
                            {loadMainCard ? (
                                <Preloader />
                            ) :
                                (<Form onSubmit={saveRole} className="theme-form">
                                    <CardBody>
                                        <FormGroup className="row">
                                            <Label className="col-sm-5 col-form-label" htmlFor="inputEmail3">Название роли</Label>
                                            <Col sm="7">
                                                <Input value={roleName} onChange={(e) => setRoleName(e.currentTarget.value)} className="form-control" type="text" placeholder="Название" />
                                            </Col>
                                        </FormGroup>
                                        <div className="checkbox checkbox-primary">
                                            <Input value={isAdmin} onChange={() => setIsAdmin(!isAdmin)} checked={isAdmin} id="inline-form-1" type="checkbox" />
                                            <Label className="mb-0" htmlFor="inline-form-1">Роль администратора</Label>
                                        </div>
                                        <div className="checkbox checkbox-primary">
                                            <Input value={autoApply} onChange={() => setAutoApply(!autoApply)} checked={autoApply} id="inline-form-2" type="checkbox" />
                                            <Label className="mb-0" htmlFor="inline-form-2">Автоприменение при регистрации</Label>
                                        </div>
                                        <div className="checkbox checkbox-primary">
                                            <Input value={roleAfterBuy} onChange={() => setRoleAfterBuy(!roleAfterBuy)} checked={roleAfterBuy} id="inline-form-3" type="checkbox" />
                                            <Label className="mb-0" htmlFor="inline-form-3">Роль после покупки подписки</Label>
                                        </div>
                                        <div className="checkbox checkbox-primary">
                                            <Input value={roleAfterBuyExpiration} onChange={() => setRoleAfterBuyExpiration(!roleAfterBuyExpiration)} checked={roleAfterBuyExpiration} id="inline-form-4" type="checkbox" />
                                            <Label className="mb-0" htmlFor="inline-form-4">Роль после истечения подписки</Label>
                                        </div>
                                        <div className="checkbox checkbox-primary">
                                            <Input value={roleForBlocked} onChange={() => setRoleForBlocked(!roleForBlocked)} checked={roleForBlocked} id="inline-form-4" type="checkbox" />
                                            <Label className="mb-0" htmlFor="inline-form-4">Роль после блокировки</Label>
                                        </div>
                                    </CardBody>

                                    <CardFooter>
                                        <div className="role-editor-main-card-footer-container">
                                            <Button onClick={(e) => {
                                                e.preventDefault();
                                                removeRole();
                                            }} color='secondary'>
                                                Удалить
                                            </Button>

                                            <Button color='primary'>
                                                Применить
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Form>)}
                        </Card>
                    </Col>

                    <Col xl="8">
                        <Card>
                            <CardHeader>
                                <div className="role-edit-header-container">
                                    <h6 className="card-title mb-0">
                                        Управление доступами
                                    </h6>
                                    <div className="role-edit-guide-container">
                                        <div className="role-edit-guide">
                                            <div className="role-edit-guide-preview delete" />

                                            <p className='mb-0'>
                                                - Роль под удаление
                                            </p>
                                        </div>

                                        <div className="role-edit-guide">
                                            <div className="role-edit-guide-preview add" />

                                            <p className='mb-0'>
                                                - Роль к добавлению
                                            </p>
                                        </div>

                                        <div className="role-edit-guide">
                                            <p className='mb-0'>
                                                Полупрозрачная - уже прикреплена к роли
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </CardHeader>

                            {loadPermissionCard ? (
                                <Preloader />
                            ) : (
                                <>
                                    <CardBody className="pb-0">
                                        <div className="todo">
                                            <div className="todo-list-wrapper">
                                                <div className="todo-list-container">
                                                    <div className="todo-list-body">
                                                        {
                                                            permissionVariants.map((variant, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    onClick={() => {
                                                                        if (permissionInRole(variant.systemValue)) {
                                                                            if (permissionsForDelete.includes(variant.systemValue)) {
                                                                                const copy = [...permissionsForDelete];

                                                                                let idx = null;

                                                                                copy.forEach((val, _idx) => {
                                                                                    if (val == variant.systemValue)
                                                                                        idx = _idx;
                                                                                });

                                                                                copy.splice(idx, 1);

                                                                                setPermissionsForDelete([...copy]);
                                                                            } else {
                                                                                const copy = [...permissionsForDelete];

                                                                                copy.push(variant.systemValue);

                                                                                setPermissionsForDelete([...copy]);
                                                                            }
                                                                        } else {
                                                                            if (permissionsForAdd.includes(variant.systemValue)) {
                                                                                const copy = [...permissionsForAdd];

                                                                                let idx = null;

                                                                                copy.forEach((val, _idx) => {
                                                                                    if (val == variant.systemValue)
                                                                                        idx = _idx;
                                                                                });

                                                                                copy.splice(idx, 1);

                                                                                setPermissionsForAdd([...copy]);
                                                                            } else {
                                                                                const copy = [...permissionsForAdd];

                                                                                copy.push(variant.systemValue);

                                                                                setPermissionsForAdd([...copy]);
                                                                            }
                                                                        }
                                                                    }}
                                                                    className={`permission-variant-container pointer
                                                                ${permissionInRole(variant.systemValue) ? "checked" : ""}
                                                                ${permissionsForAdd.includes(variant.systemValue) ? "for-add" : ""}
                                                                ${permissionsForDelete.includes(variant.systemValue) ? "for-delete" : ""}`}
                                                                >
                                                                    <div className="permission-variant-data-container">
                                                                        <h6>
                                                                            {variant.name}
                                                                        </h6>

                                                                        <p className="m-t-10">
                                                                            {variant.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>

                                    <CardFooter>
                                        <div className="role-editor-main-card-footer-container">
                                            <Button onClick={() => savePermissions()} color='primary'>
                                                Применить
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </>)}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RoleEditor;