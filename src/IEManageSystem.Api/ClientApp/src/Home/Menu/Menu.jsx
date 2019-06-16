import React from "react";

import './Menu.css';

export default class Nav extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menus: []
        };

        this.getMenus = this.getMenus.bind(this);
        this.getMenus();
    }

    getMenus(){
        let postData = {

        };

        IETool.ieAjax({
            url: "/api/Menu/GetMenus",
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

    createRootMenu(menu)
    {
        let childsMenus = menu.menus || [];

        return (
        <div>
            <label for='Dashboard'>
                <div className="swanky_wrapper__title">
                    <span>{menu.displayName}</span>
                    <div className='lil_arrow'></div>
                </div>
                <div className='swanky_wrapper__content'>
                    <ul>
                        {childsMenus.map( item => (<li>{item.displayName}</li>) )}
                    </ul>
                </div>
            </label>
        </div>);
    }

    render(){
        return (
            <div className='swanky_wrapper'>
                {this.state.menus.map(item => this.createRootMenu(item))}
            </div>
        );
    }
}