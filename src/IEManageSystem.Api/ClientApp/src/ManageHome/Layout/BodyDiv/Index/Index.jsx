import React from 'react';
import Calendar from 'Calendar/Calendar.jsx';

import Curved from './Curved.jsx'
import Columnrange from './Columnrange.jsx'
import Sunburst from './Sunburst.jsx'
import Bubble from './Bubble.jsx'

import './style.css';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-area">
                <div className="row">
                    <div className="col-md-4">
                        <Curved />
                    </div>
                    <div className="col-md-4">
                        <Columnrange />
                    </div>
                    {/* <div className="col-md-6">
                        <Sunburst />
                    </div> */}
                    <div className="col-md-4">
                        <Bubble />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-lg-7 mb-4">
                        <div className="card bg-secondary text-white">
                            <div className="card-body table-responsive p-0">
                                <table className="table  m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="1" className="border-top-0">#</th>
                                            <th scope="col" className="border-top-0">Full Name</th>
                                            <th scope="col" className="border-top-0">Address</th>
                                            <th scope="col" className="border-top-0">Avg. Session</th>
                                            <th scope="col" className="border-top-0 text-right">Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className=" align-middle text-center"> <span className="user-initials bg-success-light25 text-success">MD</span> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">Mark Doessy</small>
                                                <div>
                                                    <a href="#" className="weight-400">mark.doessy@gmail.com</a>
                                                </div> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">New York</small>
                                                <div className="weight-400">
                                                    591 Valley Drive, Philadelphia
                    </div> </td>
                                            <td className="align-middle"><span className="material-icons align-middle md-18 text-danger">expand_more</span> 32 Sec</td>
                                            <td className="align-middle text-right">@mdo</td>
                                        </tr>
                                        <tr>
                                            <td className=" align-middle text-center"> <span className="user-initials bg-danger-light25 text-danger">AK</span> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">Akshay Kumar</small>
                                                <div>
                                                    <a href="#" className="weight-400">akshay.azaste@gmail.com</a>
                                                </div> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">Philadelphia</small>
                                                <div className="weight-400">
                                                    3318 Lilac Lane
                    </div> </td>
                                            <td className="align-middle"><span className="material-icons align-middle md-18 text-success">expand_less</span> 12 Sec</td>
                                            <td className="align-middle text-right">@mdo</td>
                                        </tr>
                                        <tr>
                                            <td className=" align-middle text-center"> <span className="user-initials bg-warning-light25 text-warning">GT</span> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">Giselle K Trivett</small>
                                                <div>
                                                    <a href="#" className="weight-400">willy_dicki@yahoo.com</a>
                                                </div> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">Indianapolis</small>
                                                <div className="weight-400">
                                                    2961 Clay Street,
                    </div> </td>
                                            <td className="align-middle"><span className="material-icons align-middle md-18 text-success">expand_less</span> 5.4 Mins</td>
                                            <td className="align-middle text-right">@mdo</td>
                                        </tr>
                                        <tr>
                                            <td className=" align-middle text-center"> <span className="user-initials bg-primary-light25 text-primary">DG</span> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">David Gonsalves</small>
                                                <div>
                                                    <a href="#" className="weight-400">wilburn.magg@yahoo.com</a>
                                                </div> </td>
                                            <td className="align-middle"> <small className="text-muted weight-300">London</small>
                                                <div className="weight-400">
                                                    9009 Lorem Drive, Elphia
                    </div> </td>
                                            <td className="align-middle"><span className="material-icons align-middle md-18 text-success">expand_less</span> 1.3 Mins</td>
                                            <td className="align-middle text-right">@mdo</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                        <Sunburst />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-header bg-white">
                                Tasks in progress
               </div>
                            <div className="card-body">
                                <p className="">Team Task Completed <small className="text-muted">75% completed</small></p>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "75%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="row mt-4 mb-2">
                                    <div className="col">
                                        <p className="">Loading Data <small className="text-muted">44%</small></p>
                                        <div className="progress">
                                            <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style={{ width: "45%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="">Upload Process <small className="text-muted">55%</small></p>
                                        <div className="progress">
                                            <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" style={{ width: "55%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-lg-0 mb-4">
                            <div className="card-header bg-white">
                                Recent Activites
               </div>
                            <div className="card-body">
                                <ul className="list-unstyled recent-activites">
                                    <li> <span className="activity-icon border-primary"></span>
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <h6 className="weight-400 mb-0">New task <a href="#" className="text-dark">#709875</a> has been created </h6>
                                                <small className="text-muted">by Akshay kumar on 23 sep 2018</small>
                                            </div>
                                            <div className="dropdown">
                                                <a href="#" className="text-muted" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="material-icons">more_vert</span> </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div> </li>
                                    <li> <span className="activity-icon border-secondry"></span>
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <h6 className="weight-400 mb-0">malesuada fames ac ante ipsum primis</h6>
                                                <small className="text-muted">by Akshay kumar on 23 sep 2018</small>
                                            </div>
                                            <div className="dropdown">
                                                <a href="#" className="text-muted" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="material-icons">more_vert</span> </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div> </li>
                                    <li> <span className="activity-icon border-info"></span>
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <h6 className="weight-400 mb-0">Phasellus vitae leo at sapien leo.</h6>
                                                <small className="text-muted">by Akshay kumar on 23 sep 2018</small>
                                            </div>
                                            <div className="dropdown">
                                                <a href="#" className="text-muted" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="material-icons">more_vert</span> </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div> </li>
                                    <li> <span className="activity-icon border-warning"></span>
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <h6 className="weight-400 mb-0">Vivamus rhoncus ullamcorper justo</h6>
                                                <small className="text-muted">by Akshay kumar on 23 sep 2018</small>
                                            </div>
                                            <div className="dropdown">
                                                <a href="#" className="text-muted" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="material-icons">more_vert</span> </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div> </li>
                                    <li> <span className="activity-icon border-secondry"></span>
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <h6 className="weight-400 mb-0">New task <a href="#" className="text-dark">#709875</a> has been created </h6>
                                                <small className="text-muted">by Akshay kumar on 23 sep 2018</small>
                                            </div>
                                            <div className="dropdown">
                                                <a href="#" className="text-muted" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="material-icons">more_vert</span> </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <Calendar />
                    </div>
                </div>
            </div>
        );
    }
}