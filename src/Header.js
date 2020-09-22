import React from 'react';
import "./Header.css";
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStateValue } from "./StateProvider";

function Header() {
    const [{ user }, dispatch] = useStateValue();

    return (
        <div id="main__header" className="header">
            <div className="header__left">
                <Avatar 
                    className="header__avatar"
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
                {/* Avatars for the logged in user */}

                <AccessTimeIcon />
                {/* Time Icons */}
            </div>

            <div className="header__search">
                <SearchIcon />
                {/* Search Icons */}

                <input type="text" placeholder="Search Arup Dawn's lists...."/>
                {/* input */}
            </div>
            
            <div className="header__right">
                <HelpOutlineIcon />
                {/* Question Icons */}
            </div>
        </div>
    )
}

export default Header;
