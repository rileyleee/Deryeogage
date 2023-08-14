import React from 'react';

function LeaveModal(props) {
  return (
    <div className="modal fade" id="leaveModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">확인</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            정말 방을 나가시겠습니까?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">아니오</button>
            <button type="button" className="btn btn-primary" onClick={props.onConfirm}>예</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveModal;
