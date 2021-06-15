import React from "react";
import { Route, Switch } from "react-router";
import Login from "containers";
import Home from "containers/User/Home/Home";
import RoomDetail from "containers/User/RoomDetail/RoomDetail";
import Order from "containers/User/Order/Order";
import OrderDetail from "containers/User/OrderDetail/OrderDetail";
import OrderForm from "containers/User/OrderForm/OrderForm";
import HomeAdmin from "containers/Admin/HomeAdmin/HomeAdmin";
import OrderDetailAdmin from "containers/Admin/OrderDetailAdmin/OrderDetailAdmin";


function RouterConfig() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/beranda" component={Home} />
      <Route exact path="/detail-ruangan/:id" component={RoomDetail} />
      <Route exact path="/pengajuan" component={Order} />
      <Route exact path="/detail-pengajuan/:id" component={OrderDetail} />
      <Route exact path="/form-pengajuan/:id" component={OrderForm} />

      <Route exact path="/admin/beranda" component={HomeAdmin} />
      <Route exact path="/admin/detail-pengajuan" component={OrderDetailAdmin} />
    </Switch>
  );
}

export default RouterConfig;
