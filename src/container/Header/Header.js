
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deauthenticateUser, checkUserAuth } from '../../redux/actions/AuthActions';
import { searchPost } from '../../redux/actions/postsActions';

import logo from '../../resources/logo.png';
import Modal from '../../components/Modal/Modal';
import Login from '../Login/Login';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import classes from './Header.module.css';

const Header = ({ user, closeModal, isAuthenticated, deauthenticateUser,searchPost }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const menuRef = useRef(null);

  const logout = useCallback(() => {
    deauthenticateUser();
  }, [deauthenticateUser]);

  const showMenu = useCallback(() => {
    setOpenDropdown(!openDropdown)
  },[openDropdown])

  const closeMenu = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenDropdown(false)
    }
  },[])

  const search = useCallback(() => {
    searchPost(searchValue, 0, 20)
  },[searchPost, searchValue])

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [closeMenu, menuRef]);

  return (
    <header className={classes.header} >
      <div className={classes.wrapper}>
        <div className={classes.logo} onClick={() => history.push('/')}>
          <div>
            <img src={logo} alt='logo' />
          </div>
        </div>
        <div className={classes.search}>
          <i className="fa fa-search"  onClick={search}/>
          <input
            type='text'
            name='search'
            placeholder='Search'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <div className={classes.headerProfile} >
          {isAuthenticated && user ?
            <>
              <div className={classes.btnProfile}>
                <button type='button' className={classes.makePost} onClick={() => history.push('/create-post')}>Make a post</button>
              </div>
              <div className={classes.btnProfile}>
                <button type='button' className={classes.logout} onClick={logout}>Logout</button>
              </div>
              <div className={classes.btnProfile}>
                <i className='fa fa-bell fa-lg' />
              </div>
              <div
                className={classes.headerAvatar}
                onClick={showMenu}
                ref={menuRef}
                style={{backgroundImage: `url(${user.default_picture})`}}>
                  {openDropdown ?
                    <DropdownMenu  logout={logout}/>
                  : null}
              </div>
            </>
            :
            <div>
              <button type='button' className={classes.login} onClick={() => setOpenLoginModal(true)}>Login</button>
            </div>}
        </div>
      </div>
      {openLoginModal ?
        <Modal
          setOpenModal={setOpenLoginModal}
          openModal={openLoginModal}>
          <Login
            setOpenLoginModal={setOpenLoginModal}
            closeModal={closeModal}
          />
        </Modal>
        : null}
    </header>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.user.user,
  isAuthenticated: state.isAuth.isAuthenticated,
});

const mapDispatchToProps = {
  deauthenticateUser,
  checkUserAuth,
  searchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
