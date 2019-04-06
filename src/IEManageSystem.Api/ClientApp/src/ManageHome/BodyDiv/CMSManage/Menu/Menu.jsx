import React from "react";

import "./Menu.css";

export default class Menu extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menus: [],
        };
    }

    getMenus(){
        let postData = {

        };

        IETool.ieAjax({
            url: "/api/MenuManage/GetMenus",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
                    this.setState({menus:data.value.menus});
		        }
		    }.bind(this)
        });
    }

    addMenu(){
        
    }

    deleteMenu(){

    }

    updateMenu(){

    }

    createRootMenu(menu)
    {
        let childsMenus = menu.menus || [];

        return (
            <div>
                <label>
                    <div className="swanky_wrapper__title">
                        <span>{ menu.displayName }</span>
                        <div className='lil_arrow'></div>
                    </div>
                    <div className='swanky_wrapper__content'>
                        <ul>
                            { childsMenus.map(item => (<li>item.displayName</li>) ) }
                            <li className="bg-success">
                                <a className="text-white w-100" href="javescript:void(0);">+Add</a>
                            </li>
                        </ul>
                    </div>
                </label>
            </div>
        );
    }

    render(){
        return (
            <div className="col-md-12">
                <div className='swanky_wrapper'>
                    { this.state.menus.map(item => this.createRootMenu(item)) }
                    <div>
                        <label className="bg-success">
                            <div className="swanky_wrapper__title">
                                <a className="text-white w-100" href="javescript:void(0);">+Add</a>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}