import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

import './PageContainer.css'

import ComponentFactory from '../Components/ComponentFactory'

import Container from '../Components/Container/Container.jsx'
import Text from '../Components/Text/Text.jsx'

class PageContainer extends React.Component
{
    constructor(props){
        super(props);

        this.componentNames = [];
    }

    render(){
        let componentFactory = new ComponentFactory();

        let components = this.componentNames.map(item => {
            return componentFactory.getComponentForName(item);
        });

        return (
            <div className="page-container col-md-10">
                {
                    components.map(item => <item.component />)
                }
                <a className="col-md-1 add-component-btn" href="javascript:void(0)"
                    onClick={
                        ()=>{
                            if( !this.props.selectedComponent ){
                                return;
                            }

                            this.componentNames.push(this.props.selectedComponent);
                            this.setState({});
                        }
                    }
                >
                    <span class="oi oi-plus" title="icon name" aria-hidden="true"></span>
                </a>
            </div>
        );
    }
}

PageContainer.propTypes = {
    selectedComponent: PropTypes.object
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedComponent: state.page.selectedComponent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
}

const PageContainerContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(PageContainer)

export default PageContainerContain;