import React from 'react';

const ModalMenu = () => {
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
                                <a aria-current="page" className="nav-link active" href="/">
                                    Home
                                </a>
                                </li>
                                <li className="nav-item dropdown">
                                <a className="nav-link" href="#">
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
                                    {/* <i class="fas fa-angle-down ml-1"></i> Font Awesome fontawesome.com */}
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item">
                                    <a className="nav-link" href="/explore-watches">
                                        Watches
                                    </a>
                                    </li>
                                    <li className="nav-item">
                                    <a className="nav-link" href="/explore-jewelrys">
                                        Jewelrys
                                    </a>
                                    </li>
                                    <li className="nav-item">
                                    <a className="nav-link" href="/explore-materials">
                                        Materials
                                    </a>
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            <ul className="navbar-nav items icons">
                                <li className="nav-item dropdown">
                                <a className="nav-link" href="#">
                                    <svg
                                    className="svg-inline--fa fa-user fa-w-14"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fa"
                                    data-icon="user"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    data-fa-i2svg=""
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                    />
                                    </svg>
                                    {/* <i class="fa fa-user"></i> Font Awesome fontawesome.com */}
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
                                    {/* <i class="fas fa-angle-down ml-1"></i> Font Awesome fontawesome.com */}
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item">
                                    <a className="nav-link" href="/account">
                                        My Account
                                    </a>
                                    </li>
                                    <li className="nav-item">
                                    <a className="nav-link" href="/wallet-connect">
                                        Disconnect
                                    </a>
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default ModalMenu;