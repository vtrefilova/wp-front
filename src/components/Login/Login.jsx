import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, NavItem, NavLink, Nav, TabContent, TabPane } from 'reactstrap'
import { Redirect, useHistory, withRouter } from 'react-router-dom'
import LogoSVG from '../../assets/images/logo/logo.svg';
import LogoDarkSVG from '../../assets/images/logo/logo.svg';
import API_authUser from '../../api/auth.js';
import { toast, ToastContainer } from 'react-toastify';

const Logins = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false)

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    const authData = await API_authUser(email, password);

    if(authData != null) {
      localStorage.setItem("token", authData.token);
      localStorage.setItem("user", JSON.stringify(authData.user));

      window.location.reload();
    } else {
      toast.error("Неверный логин или пароль");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token != null)
      history.replace("/dashboard/main");
  }, [])

  return (
    <Container fluid={true} className="p-0">
      <ToastContainer />
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid for-light" src={LogoSVG} alt="" />
                  <img className="img-fluid for-dark" src={LogoDarkSVG} alt="" />
                </a>
              </div>
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <h4>Авторизация внутри системы WalletBox</h4>
                  <p>Введите номер телефона и пароль для авторизации</p>
                  <FormGroup>
                    <Label className="col-form-label">Номер телефона</Label>
                    <Input className="form-control" type="phone" required="" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Пароль</Label>
                    <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} defaultValue={password} required="" />
                    <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                  </FormGroup>
                  <Button onClick={(e) => login(e)} color="primary" className="btn-block" disabled={loading ? loading : loading}>{loading ? "Загрузка..." : "Войти"}</Button>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Logins);