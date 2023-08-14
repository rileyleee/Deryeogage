import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import ToolbarComponent from './toolbar/ToolbarComponent';

import './UserVideo.css';

export default class MyVideoComponent extends Component {


    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="my-streamcomponent">
                        <div><p>{this.getNicknameTag()}</p></div>
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div id ="toolbar">
                        <ToolbarComponent
                            sessionId={this.props.sessionId}
                            user={this.props.localUser}
                            camStatusChanged={this.props.camStatusChanged}
                            micStatusChanged={this.props.micStatusChanged}
                            leaveSession={this.props.leaveSession}
                        />
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}