import React, { useState, useContext } from '../../node_modules/react'
import { Menu } from '../../node_modules/semantic-ui-react'
import { Link } from "../../node_modules/react-router-dom";

import { authContext } from '../context/authContext';

function MenuBar () {
  const context = useContext(authContext);

  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = context.user ? (
        <Menu pointing secondary size="massive" color="teal" >
          <Menu.Item
            name={context.user.username}
            active
            as={Link}
            to='/'
          />
         
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={context.logout}
            />

          </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="massive" color="teal" >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
         
          <Menu.Menu position='right'>
                 <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
            to='/register'
            />
          </Menu.Menu>
        </Menu>
    )

    return menuBar
}

export default MenuBar;