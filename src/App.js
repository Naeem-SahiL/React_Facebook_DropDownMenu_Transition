import './App.css';
import React, { useEffect, useRef, useState } from 'react'

import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as MessageIcon } from './icons/messenger.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { ReactComponent as BoltIcon } from './icons/bolt.svg'

import { CSSTransition } from 'react-transition-group'

function App() {

  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessageIcon />} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

export default App;



function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}
function getElemPadding(className) {
  const elem = document.querySelector(`.${className}`);
  let padding = window.getComputedStyle(elem, null).getPropertyValue('padding');
  padding = padding.split('px')[0];

  return padding;
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef();



  useEffect(() => {
    let padding = getElemPadding('dropdown')
    // here padding * 2 means top+bottom padding
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + padding * 2)
  }, [])

  function calcHeight(el) {
    let height = Number(el.clientHeight);

    let padding = getElemPadding('dropdown')
    height += Number(padding) * 2;

    setMenuHeight(height);
  }


  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<ArrowIcon />}
            goToMenu="main"
          />

          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>

        </div>
      </CSSTransition>
    </div>
  )
}

