import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'

// props.close    fun
class EditFrame extends React.Component 
{
    constructor(props) {
        super(props);

        this.tabs = [{index:0, text:"基本设置"}];
        this.nameField = "text";
        this.selectIndex = 0;

        this.newPageComponent = {...{}, ...this.props.pageComponent};

        this.submit = this.submit.bind(this);
    }

    submit(){
        this.props.close();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
            >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4 className="modal-title">编辑数据</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>&times;</button>
                            </div>

                            <div className="modal-body jumbotron">
                                <Tab 
                                    tabs={this.tabs} 
                                    nameField={this.nameField} 
                                    selectIndex={this.selectIndex} 
                                    selectOnclick={()=>{}}
                                >
                                    <div>
                                        <label>请输入数据1：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={""} type="text" className="form-control" placeholder="数据1" 
                                                onChange={
                                                    (event)=>{
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">数据1</span>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" onClick={this.submit}>提交</button>
                                <button type="button" className="btn btn-secondary" onClick={this.props.close}>关闭</button>
                            </div>

                        </div>
                    </div>
            </Modal>
        );
    }
}

EditFrame.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}

export default EditFrame