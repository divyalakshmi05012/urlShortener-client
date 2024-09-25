
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import useLogout from '../hooks/useLogout';
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Topbar() {

  let logout = useLogout();
  let navigate = useNavigate();

  let links = [
    {
        label:'Home',
        path: '/home',
        role: ["Admin", "User"]
    },
    {
        label:'Dashboard',
        path:'/dashboard',
        role:['Admin']
    },
    {
        label:'MyURLs',
        path:'/myurls',
        role:['User']
    }
  ]

  let {pathname} = useLocation()
  let role = sessionStorage.getItem('role')
  return <>
        <Navbar expand="md" className='nav' data-bs-theme="light">
            <Navbar.Brand href="/home" className='ml-10'>Linkly</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" variant="underline">
                    {
                        links.map((link,i) => {
                                return link.role.includes(role)?
                                <Nav.Link key={i}
                                onClick={()=> navigate(link.path)}
                                className = {link.path === pathname ? 'active':''}>
                                    {link.label}
                                </Nav.Link>
                                :
                                <React.Fragment key={i}></React.Fragment>
                        })
                    }
                </Nav>
            </Navbar.Collapse>
           
            <Nav>
                <Button variant="danger" onClick={()=> logout()}>Logout</Button>
            </Nav>
        </Navbar>
  
  </>
}

export default Topbar
