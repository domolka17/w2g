import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #5860a8;
  height: 85px;
  display: flex;
  justify-content: space-between;
  z-index: 12;
  font-size:1.3rem;
`;

export const NavLink = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  justify-content: space-evenly;
  }
`;

export const NavMenu = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  z-index: 12;
  gap: 4rem;
  margin-right: 3rem;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;


//-------------------------------------------------------------------------------------------------------------------
/*.pagetitle{
  font-size: 1.875rem;
  font-weight: bold;
}
a {
  text-decoration: none;
  color: #ffffff;
 }
 li {
  list-style: none;
 }
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #5860a8;
  color: #ffffff;
 }
 .nav-links a {
  color: #ffffff;
 }

 .logo {
  font-size: 1.3rem;

 }
 .logo:hover{
  background-color: #d0d4ff;
  border-radius: 5px;
  transition: 300ms;
 }
 
 .menu {
  display: flex;
  gap: 1em;
  font-size: 1.3rem;
 }
 .menu li:hover {
  background-color: #d0d4ff;
  border-radius: 5px;
  transition: 300ms;
 }
 .menu li {
  padding: 5px 14px;
 }


input[type=checkbox]{
  display: none;
 } 

 .hamburger {
  display: none;
  font-size: 24px;
  user-select: none;
 }

 @media (max-width: 940px) {
 .menu { 
  display:none;
  position: absolute;
  background-color:#5860a8;
  right: 0;
  left: 0;
  text-align: center;
  padding: 16px 0;
 }
 .menu li:hover {
  display: inline-block;
  background-color:#d0d4ff;
  transition: 0.3s ease;
 }
 .menu li + li {
  margin-top: 12px;
 }
 input[type=checkbox]:checked ~ .menu{
  display: block;
 }
 .hamburger {
  display: block;
 }
 .dropdown {
  left: 50%;
  top: 30px;
  transform: translateX(35%);
 }
 .dropdown li:hover {
  background-color: #d0d4ff;
 }
}*/



