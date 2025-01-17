import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import {Blogs} from '../Blogs/Blogs'; 
/* import Category from '../admin/category' */
/* import {Blogs} from '../Blogs/Blogs'; */
import Categories from '../categories/Index';
import Login from '../Login/Login';
import Topbar from "./Topbar";
import Posts from '../admin/posts';
import Workshops from '../workshops/Index';
import Profile from '../profile/profile'
import Mentors from '../admin/Mentor';
import WorkshopUser from '../workshopUser/WorkshopUser';
import Edit from '../workshops/Edit';
import { Singleblog } from '../Blogs/Singleblog';
import { Addblog } from '../Blogs/Addblog';
import CustomProfile from '../profile/CustomProfile';
const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/mentors" component={Mentors} />
      <Route exact path="/about" component={Login} />
      <Route exact path="/posts" component={Blogs} />
      <Route exact path="/posts_requests" component={Posts} />
      <Route exact path="/workshops" component={Workshops} />
      <Route path="/workshops/edit/:id" component={Edit} />
      <Route path="/workshopUser/workshopUser/:id" component={WorkshopUser}/>
      <Route exact path="/blogs/addblog" component={Addblog} />
      <Route exact path="/Home-1" component={Profile} />
      <Route exact path="/blogs/addblog" component={Addblog} />
      <Route path="/blogs/:id" component={Singleblog} />
      <Route exact path="/Page-1" component={"Category"} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/profile/:id" component={CustomProfile} />
     
    </Switch>
  </Container>
);

export default Content;