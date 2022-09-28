import hsalogo from "./imgs/hsalogo.png";
import React from "react";
import { /*Nav,*/ NavLink/*, NavMenu*/ } from "./NavbarElements";
import "./css/navbar.css";
import "./css/NavbarElements.css";




const Navbar = () => {

  return (
    <>
      <nav class="navbar">

        <div class="pagetitle ">
          <NavLink to="/index">
            <img src={hsalogo} alt="hsalogo" height={64} />
            Watch2Gether der Hochschule Anhalt
          </NavLink>
        </div>

        <ul class="nav-links">

          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class="hamburger">&#9776;</label>

          <div class="menu">
            <li>
              <NavLink to="/index" activeStyle>
                Startseite
              </NavLink>
            </li>
            <li>
              <NavLink to="/Room" activeStyle>
                Räume
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" activeStyle>
                Hilfe
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeStyle>
                About
              </NavLink>
            </li>
          </div>

        </ul>
      </nav>
    </>
  );
};

export default Navbar;


//----------alte/derzeitige navbar--------------------------
/*<>
        <Nav>
          <NavMenu>
            <NavLink to="/index" >
              <img src={hsalogo} alt="hsalogo" height={64} />
              <h1 className="h1">Watch2Gether der Hochschule Anhalt</h1>
            </NavLink>
          </NavMenu>
          <NavMenu className="nav-menue">
            <NavLink to="/index" activeStyle>
              Startseite
            </NavLink>
            <NavLink to="/Room" activeStyle>
              Räume
            </NavLink>
            <NavLink to="/help" activeStyle>
              Hilfe
            </NavLink>
            <NavLink to="/about" activeStyle>
              About
            </NavLink>
          </NavMenu>
        </Nav>
      </>*/





//------neue navbar-------

/* <body>
<nav class="navbar">
 
<div class="logo">
<img src="/imgs/hsalogo.png"></img>
<a href="/about">Watch2Gether der Hochschule Anhalt</a>
</div>
 
<ul class="nav-links">

 <input type="checkbox" id="checkbox_toggle" />
 <label for="checkbox_toggle" class="hamburger">&#9776;</label>

 <div class="menu">
   <li><a href="/index">Startseite</a></li>
   <li><a href="/Room">Räume</a></li>
   <li><a href="/Help">Hilfe</a></li>
   <li><a href="/about">About</a></li>
 </div>

</ul>
</nav>
</body> */
