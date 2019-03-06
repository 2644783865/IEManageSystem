import React from 'react';
import ReactDOM from 'react-dom';
import './LoadingModal.css';

export default class LoadingModal extends React.Component
{
  constructor(props){
    super(props);
  }

  static showModal(){
    $("body").addClass("modal-open");
    $("body").append('<div class="modal-backdrop fade show"></div>');
    $("#resourceLoading").addClass("show");
    $("#resourceLoading").fadeToggle(500);
  }

  static hideModal(){
    $("body").removeClass("modal-open");
    $("div.modal-backdrop").remove();
    $("#resourceLoading").removeClass("show");
    $("#resourceLoading").fadeToggle(500);
  }
  
  render(){
    return (
            <div className="modal fade show" id="resourceLoading">
              <div className="modal-dialog">
                <div className="modal-content background-transparent">
             
                  <div className="modal-body d-flex justify-content-center">
                    <div className="loading-animation">
                      <span className="oi oi-aperture" title="icon name" aria-hidden="true"></span>
                    </div>
                    <span className="loading-animation-text">
                      正在努力加载中。。。
                    </span>
                  </div>
             
                </div>
              </div>
            </div>
    );
  }
}