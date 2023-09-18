import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const ModalMenu = () => {
  const { isConnected} = useAccount();
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleExploreDropdown = () => setShowExploreDropdown(!showExploreDropdown);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  const removeModalBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop.fade.show');
    if (backdrop) {
      backdrop.classList.remove('show');
    }
  };

  return (
    <div id="menu" className="modal fade p-0">
      <div className="modal-dialog dialog-animated">
        <div className="modal-content h-100">
          <div className="modal-header" data-dismiss="modal">
            Menu <i className="far fa-times-circle icon-close" />
          </div>
          <div className="menu modal-body">
            <div className="row w-100">
              <div className="items p-0 col-12 text-center">
                <ul className="navbar-nav items mx-auto">
                  <li className="nav-item dropdown">
                    <Link aria-current="page" className="nav-link active" to="/" onClick={removeModalBackdrop}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" href="#" onClick={toggleExploreDropdown}>
                      Explore
                    <svg
                    className="svg-inline--fa fa-angle-down fa-w-10 ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-fa-i2svg=""
                    >
                    <path
                        fill="currentColor"
                        d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                    />
                    </svg>
                    </Link>
                    <ul className={`dropdown-menu ${showExploreDropdown ? 'show' : ''}`}>
                      <li className="nav-item">
                        <Link className="nav-link" to="/explore-watches" onClick={removeModalBackdrop}>Watches</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/explore-jewelrys" onClick={removeModalBackdrop}>Jewelrys</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/explore-materials" onClick={removeModalBackdrop}>Materials</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                {isConnected && (
                <ul className="navbar-nav items mx-auto">
                  <li className="nav-item dropdown">
                    <Link className="nav-link" href="#" onClick={toggleUserDropdown}>
                    Dashboard
                    <svg
                    className="svg-inline--fa fa-angle-down fa-w-10 ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-fa-i2svg=""
                    >
                    <path
                        fill="currentColor"
                        d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                    />
                    </svg>
                    </Link>
                    <ul className={`dropdown-menu ${showUserDropdown ? 'show' : ''}`}>
                      <li className="nav-item">
                        <Link className="nav-link" to="/account" onClick={removeModalBackdrop}>My Account</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/wallet-connect" onClick={removeModalBackdrop}>Disconnect</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMenu;
