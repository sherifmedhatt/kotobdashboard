import React, { Component } from 'react'
import {MenuItems} from "./MenuItems"
import './Navbar.css'
import logo from "./kotoblogo.png";
export default class Navbar extends Component {
    state={clicked:false}
    handleClick=()=>{
        this.setState({clicked:!this.state.clicked})
    }
    render() {
        return (
         
            <nav className="NavbarItems">
            <img className="menu-icon" src={logo} width={100} height={70}></img>
            <h3 style={{color:'white'}} className="Navbar-logo">
              </h3>
              <div className="menu-icon" onClick={this.handleClick}>
                  <i className={this.state.clicked? 'fas fa-times':'fas fa-bars'}></i>
              </div>

              <ul className={this.state.clicked ? 'nav-menu active':'nav-menu'}>
                  {MenuItems.map((item,index)=>{
                      return (
                          <li key={index}><a className={item.cName} href={item.url}>
                              {item.title}
                              </a></li>
                      )
                  })}
                  <li><a href='#' onClick={this.props.logAction} className='nav-links'>{this.props.signing}</a></li>
                  
              </ul>
          </nav>
             
        )
    }
}
