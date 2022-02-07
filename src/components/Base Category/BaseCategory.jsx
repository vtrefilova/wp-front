import React, { Fragment, useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumbs from '../../layout/breadcrumb';
import { Container, Modal, Form, FormGroup, CardFooter, Label, Input, ModalHeader, ModalBody, Row, Col, Card, CardBody, CardHeader, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import { toast } from 'react-toastify';

import './BaseCategory.scss';
import Preloader from '../preloader/Preloader';

import API_getBaseCategories from '../../api/getBaseCategories';
import API_removeBaseCategory from '../../api/removeBaseCategory';
import CreateBaseCategory from './Create Base Category/CreateBaseCategory';
import EditBaseCategory from './Edit Base Category/EditBaseCategory';

const pageSize = 10;

const BaseCategory = () => {

    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);
    const [activePage, setActivePage] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showCreateBaseCategory, setShowCreateBaseCategory] = useState(false);
    const [showEditBaseCategory, setShowEditBaseCategory] = useState(false);

    useEffect(() => {
        getBaseCategoryData();
    }, []);

    useMemo(() => {
        if(selectedCategory)
            setShowEditBaseCategory(true);
    }, [selectedCategory])

    useMemo(() => {
        if(!showEditBaseCategory)
            setSelectedCategory(null);
    }, [showEditBaseCategory])

    const getBaseCategoryData = async () => {
        setLoad(true);

        const categoryData = await API_getBaseCategories();

        if (categoryData != null) {
            if (categoryData.length < 10) {
                setData([
                    categoryData
                ]);
            } else {
                const sorted = [];

                for (let i = 0; i < Math.ceil(categoryData.length / pageSize); i++)
                    sorted.push([]);

                for (let i = 0; i < sorted.length; i++)
                    for (let j = i * pageSize; j < (i * pageSize) + pageSize; j++) {

                        if (categoryData[j] != null && categoryData[j] != undefined)
                            sorted[i].push(categoryData[j])
                    }

                setData([...sorted]);
            }
        }

        setLoad(false);
    }

    const nextPage = () => {
        if (activePage < data.length - 1)
            setActivePage(activePage + 1);
    }

    const prevPage = () => {
        if (activePage != 0)
            setActivePage(activePage - 1);
    }

    const changePage = (idx) => {
        setActivePage(idx);
    }

    const removeBaseCategory = async (id) => {
        const result = await SweetAlert.fire({
            title: "Удаление базовой категории",
            text: "Вы действительно хотите удалить выбранную базовую категорию?",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            showCancelButton: true,
            icon: "question"
        });

        if(result.value) {
            setLoad(true);

            const resultDelete = await API_removeBaseCategory(id);

            setLoad(false);

            if(resultDelete) {
                getBaseCategoryData();
                toast.success("Категория успешно удален");
            }

        }
    }

    const toggleCreateBaseCategoryModal = (val = null) => val == null ? setShowCreateBaseCategory(!showCreateBaseCategory) : setShowCreateBaseCategory(val);
    const toggleEditBaseCategoryModal = (val = null) => val == null ? setShowEditBaseCategory(!showEditBaseCategory) : setShowEditBaseCategory(val);
    

    return (
        <Fragment>
            <CreateBaseCategory updateData={getBaseCategoryData} show={showCreateBaseCategory} toggleShow={toggleCreateBaseCategoryModal} />
            <EditBaseCategory updateData={getBaseCategoryData} category={selectedCategory} show={showEditBaseCategory} toggleShow={toggleEditBaseCategoryModal} />

            <Breadcrumbs parent="Панель управления" title="Базовые категории" />
            <Container fluid={true}>
                <Card className="mb-0">
                    <CardHeader className="d-flex">
                        <div className="base-category-card-header-container">
                            <div className="base-category-card-header-title-container">
                                <h6 className="card-title mb-0">Список базовых категорий</h6>

                            </div>

                            <div className="base-category-card-header-action-container">
                                <Button onClick={toggleCreateBaseCategoryModal} color="primary">
                                    <i className="icon-plus"></i></Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {load ? (
                            <Preloader />
                        ) : (<>
                            <div className="todo">
                                <div className="todo-list-wrapper">
                                    <div className="todo-list-container">
                                        <div className="todo-list-body">
                                            <ul id="todo-list">
                                                {data && data[activePage] && data[activePage].map((category, idx) => (<li key={idx} className={"task"} >
                                                    <div className="task-container">
                                                        <div className="task-data-container">
                                                            <h4 className="task-label">{category.name}</h4>
                                                        </div>
                                                        <span className="task-action-btn">
                                                            <span onClick={() => setSelectedCategory(category)} className="action-box large complete-btn" title="Изменить базовую категорию">
                                                                <i className="icon"><i className="icon-pencil"></i></i>
                                                            </span>
                                                            <span onClick={() => removeBaseCategory(category.id)} className="action-box large delete-btn" title="Удалить базовую категорию">
                                                                <i className="icon"><i className="icon-trash"></i></i></span>
                                                        </span>
                                                    </div>
                                                </li>))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pagination-container">
                                <Pagination className="pagination pagination-primary" aria-label="Page navigation example">
                                    <PaginationItem onClick={prevPage}><PaginationLink href="#javascript">Назад</PaginationLink></PaginationItem>
                                    {
                                        data.map((_, idx) => (
                                            <PaginationItem onClick={() => changePage(idx)} active={activePage === idx} key={idx}><PaginationLink>{idx + 1}</PaginationLink></PaginationItem>
                                        ))
                                    }
                                    <PaginationItem onClick={nextPage}><PaginationLink href="#javascript">Вперед</PaginationLink></PaginationItem>
                                </Pagination>
                            </div>
                        </>)
                        }
                    </CardBody>
                </Card>
            </Container>
        </Fragment >
    )
}

export default BaseCategory;