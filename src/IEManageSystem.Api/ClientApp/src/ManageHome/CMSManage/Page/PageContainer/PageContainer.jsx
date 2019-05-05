import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

import './PageContainer.css'

import EditableParentCom from './EditableParentCom/EditableParentCom.jsx'

import { newPageAddComponent } from '../../Actions'

class PageContainer extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="page-container col-md-10">
                {
                    this.props.pageComponents.map(item => 
                    <EditableParentCom
                        pageComponent={item}
                    >
                    </EditableParentCom>)
                }
                <div className="col-md-2 padding-0">
                    <a className="add-component-btn" href="javascript:void(0)"
                        onClick={
                            ()=>{
                                if( !this.props.selectedComponent ){
                                    return;
                                }

                                var timetamp = Number(new Date());
                                while(true){
                                    if(!this.props.pageComponents.some(item=> item.sign === timetamp))
                                    {
                                        break;
                                    }

                                    timetamp = Number(new Date());
                                }
                                
                                let pageComponent = { sign:timetamp, name:this.props.selectedComponent };

                                this.props.addComponent(pageComponent);
                            }
                        }
                    >
                        <span class="oi oi-plus" title="icon name" aria-hidden="true"></span>
                    </a>
                </div>
                
            </div>
        );
    }
}

PageContainer.propTypes = {
    selectedComponent: PropTypes.string,
    pageComponents: PropTypes.array,
    addComponent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedComponent: state.page.newPageSelectedComponent,
        pageComponents: state.page.newPageComponents
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent)=>{
            dispatch(newPageAddComponent(pageComponent));
        }
    }
}

const PageContainerContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(PageContainer)

export default PageContainerContain;