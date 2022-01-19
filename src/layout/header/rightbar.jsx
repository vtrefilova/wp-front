import React, { Fragment, useState, useEffect } from 'react';
import man from '../../assets/images/dashboard/profile.jpg'
import { useHistory } from 'react-router-dom'


const Rightbar = (props) => {    
  
  const [name, setName] = useState("Нет");

  const history = useHistory();
  
  // auth0 profile
  useEffect(() => {
    const user = localStorage.getItem("user");

    if(user != null)
      setName(JSON.parse(user).username);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    history.replace("/login");
  }

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          {/* <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li className="onhover-dropdown">
            <div className="notification-box" onClick={() => setNotificationDropDown(!notificationDropDown)}><Bell /><span className="badge badge-pill badge-secondary">2</span></div>
            <ul className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active" : ""}`}>
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{Notification}</h6>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-primary"> </i>{DeliveryProcessing} <span className="pull-right">{"10 min."}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-success"></i>{OrderComplete}<span className="pull-right">{"1 hr"}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-info"></i>{TicketsGenerated}<span className="pull-right">{"3 hr"}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-danger"></i>{DeliveryComplete}<span className="pull-right">{"6 hr"}</span></p>
              </li>
              <li><button className="btn btn-primary" >{CheckAllNotification}</button>
              </li>
            </ul>
          </li>
          <Bookmark/>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div>
          </li>
          <li className="cart-nav onhover-dropdown">
            <div className="cart-box" onClick={() => setCartDropDown(!cartDropdown)}><ShoppingCart/><span className="badge badge-pill badge-primary">{"2"}</span></div>
            <ul className={`cart-dropdown onhover-show-div ${cartDropdown ? "active" : ""}`}>
              <li>
                <h6 className="mb-0 f-20">{ShopingBag}</h6><ShoppingCart/>
              </li>
              <li className="mt-0">
                <div className="media" onClick={RedirectToCart}><img className="img-fluid rounded-circle mr-3 img-60" src={require("../../assets//images/ecommerce/01.jpg")} alt=""/>
                  <div className="media-body"><span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                    <p>{"Yellow(#fcb102)"}</p>
                    <div className="qty-box">
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                              <button className="btn quantity-left-minus" type="button" data-type="minus" data-field=""><Minus/></button>
                          </InputGroupAddon>
                            <input className="form-control input-number" type="text" name="quantity" defaultValue="1"/>
                          <InputGroupAddon addonType="prepend">
                              <button className="btn quantity-right-plus" type="button" data-type="plus" data-field=""><Plus/></button>
                          </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <h6 className="text-right text-muted">{"$299.00"}</h6>
                  </div>
                  <div className="close-circle"><a href="#javascript"><X/></a></div>
                </div>
              </li>
              <li className="mt-0">
                <div className="media" onClick={RedirectToCart}><img className="img-fluid rounded-circle mr-3 img-60" src={require("../../assets//images/ecommerce/03.jpg")} alt=""/>
                  <div className="media-body"><span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                    <p>{"Yellow(#fcb102)"}</p>
                    <div className="qty-box">
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <button className="btn quantity-left-minus" type="button" data-type="minus" data-field=""><Minus/></button>
                          </InputGroupAddon>
                          <input className="form-control input-number" type="text" name="quantity" defaultValue="1"/>
                          <InputGroupAddon addonType="prepend">
                            <button className="btn quantity-right-plus" type="button" data-type="plus" data-field=""><Plus/></button>
                          </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <h6 className="text-right text-muted">{"$299.00"}</h6>
                  </div>
                  <div className="close-circle"><a href="#javascript"><X/></a></div>
                </div>
              </li>
              <li>
                <div className="total">
                  <h6 className="mb-2 mt-0 text-muted">{OrderTotal} : <span className="f-right f-20">{"$598.00"}</span></h6>
                </div>
              </li>
              <li>
                <Link to={`${process.env.PUBLIC_URL}/app/ecommerce/product`}><Button color="primary" className="btn btn-block view-cart">{GoToShopingBag}</Button></Link>
                <Link to={`${process.env.PUBLIC_URL}/app/ecommerce/checkout`}><Button color="secondary" className="btn-block view-cart mt-2">{CheckOut}</Button></Link>
              </li>
            </ul>
          </li>
          <li className="onhover-dropdown" onClick={() => setChatDropDown(!chatDropDown)}><MessageSquare />
            <ul className={`chat-dropdown onhover-show-div ${chatDropDown ? "active" : ""}`}>
              <li>
                <MessageSquare />
                <h6 className="f-18 mb-0">{MessageBox}</h6>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media"><img className="img-fluid rounded-circle mr-3" src={require("../../assets/images/user/1.jpg")} alt="" />
                  <div className="status-circle online"></div>
                  <div className="media-body"><span>{EricaHughes}</span>
                    <p>{"Lorem Ipsum is simply dummy..."}</p>
                  </div>
                  <p className="f-12 font-success">{"58 mins ago"}</p>
                </div>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media"><img className="img-fluid rounded-circle mr-3" src={require("../../assets/images/user/2.jpg")} alt="" />
                  <div className="status-circle online"></div>
                  <div className="media-body"><span>{KoriThomas}</span>
                    <p>{"Lorem Ipsum is simply dummy..."}</p>
                  </div>
                  <p className="f-12 font-success">{"1 hr ago"}</p>
                </div>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media"><img className="img-fluid rounded-circle mr-3" src={require("../../assets/images/user/4.jpg")} alt="" />
                  <div className="status-circle offline"></div>
                  <div className="media-body"><span>{AinChavez}</span>
                    <p>{"Lorem Ipsum is simply dummy..."}</p>
                  </div>
                  <p className="f-12 font-danger">{"32 mins ago"}</p>
                </div>
              </li>
              <li className="text-center"> <button className="btn btn-primary">{ViewAll}     </button></li>
            </ul>
          </li>
          <li className="maximize"><a className="text-dark" href="#javascript" onClick={goFull}><Minimize /></a></li> */}
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={man} alt="" />
              <div className="media-body"><span>{name}</span>
                <p className="mb-0 font-roboto">Меню<i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              {/* <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/users/userProfile`)}><User /><span>{Account} </span></li>
              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/email-app`)}><Mail /><span>{Inbox}</span></li>
              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/todo-app/todo`)}><FileText /><span>{Taskboard}</span></li> */}
              <li onClick={logOut}><span>Выйти</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
export default Rightbar;