import React from 'react';
import { Switch , Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


import Navigation from "./components/Navigation";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/cart/Cart";
import NotFound from "./components/NotFound";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Auth from "./components/admin/Auth";
import Admin from "./components/components2/Admin";
import Purchase from "./components/cart/Purchase";
import CreateUser from "./components/admin/CreateUser";


function App() {
  return (
      <React.Fragment>
          <Navigation />
          <Switch>
              {/* need to add landing page, about page and services page*/}
              <Route exact path="/" component={HomePage} />
              <Route path="/Products" component={ProductList} />
              <Route path="/About" component={About}/>
              <Route path="/details" component={Details} />
              <Route path="/cart" component={Cart} />
              <Route path="/admin" component={Auth}/>
              <Route path="/Work/administrator" component={Admin}/>
              <Route path="/purchase" component={Purchase}/>
              <Route path="/Dlv" component={CreateUser}/>
              <Route  component={NotFound} />
          </Switch>
          <Footer />
          <Modal />
      </React.Fragment>
  )
}

export default App;
