import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';
import 'commoncss';
import 'iemedia';
import 'cookie';
import 'ielib';
import 'ToolLibrary/IETool.js';

import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.jsx';
import SideNav from "./SideNav/SideNav.jsx";
import BodyDiv from './BodyDiv/BodyDiv.jsx';
import NavTag from './NavTag/NavTag.jsx';

require('./ManageHome.css');

export default class ManageHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="manage-home d-flex flex-column h-100">
                <Nav />
                <div className="d-flex flex-grow-1 overflow-hidden-y w-100">
                    <div className="d-flex w-100">
                        <div className="col-md-2 h-100 padding-0">
                            <SideNav />
                        </div>
                        <div className="col-md-10 h-100 padding-0 d-flex flex-column">
                            <div className="flex-shrink-0">
                                <NavTag />
                            </div>
                            <div className="bodydiv-parent d-flex flex-grow-1 w-100">
                                <Route path="/ManageHome/:menuId?/:menuItemId?" component={BodyDiv} />
                            </div>
                            <div className="flex-shrink-0 nav-bottom">
                                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                                    <small className="text-white">
                                        Copyright © 2019 by IceEmblem. All rights reserved.
                                    </small>
                                    <span className="text-white ml-auto">
                                        由冰纹工作室开发开发
                                    </span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}