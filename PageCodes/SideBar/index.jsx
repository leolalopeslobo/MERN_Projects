import React, { useState } from 'react'
import classNames from 'classnames';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faSignOutAlt,faHome, faCog  } from '@fortawesome/free-solid-svg-icons'

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {

    //to keep track of which page is displayed


    const [activeLink, setActiveLink] = useState(null);

    const linkStyle = {
        textDecoration: 'none',
        padding: '10px',
        color: 'white', // Default color
        backgroundColor: 'transparent', // Default background color
        // Add any other styles you need
      };
    
      const activeLinkStyle = {
        // color: 'white', // Color for the active link
        backgroundColor: '#6b7280', // Background color for the active link
        // Add any other styles you need for the active link
      };
    
      const handleLinkClick = (link) => {
        setActiveLink(link);
      };

    return (
        
        <div className='bg-neutral-900 w-80 p-3 flex flex-col text-white'>
            <div className='flex items-center gap-2 px-1 py-3'><span className='text-neutral-100 text-lg'>BreachSeal Technologies</span></div>
            <div className='flex-1 flex flex-col px-1 py-8'>
            <NavLink to="/dashboard" className={linkClasses} style={activeLink === '/dashboard' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
        onClick={() => handleLinkClick('/dashboard')}><FontAwesomeIcon icon={faHome} /><span className="text-xl">Home</span></NavLink>
            <NavLink to="/subscriptions" className={linkClasses} style={activeLink === '/subscriptions' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
        onClick={() => handleLinkClick('/subscriptions')}><FontAwesomeIcon icon={faCog} /><span className="text-xl">Sevices</span></NavLink>
            </div>
            <div className="flex items-center  gap-2"><FontAwesomeIcon icon={faQuestionCircle}/><span>Help & Support</span></div>
            <div className="flex items-center gap-2 text-red-500">
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span>Logout</span>
    </div>
        </div>
    )
};

export default Sidebar;
