import React, { Component } from "react";
// import "./ToolbarComponent.css";
import styled from 'styled-components';
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';


// const logo = require('../../assets/images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }


  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <div>
        <U.MediaWrapper>
          <U.MicWrapper
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={this.micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <MicON/>
            ) : (
              <MicOFF/>
            )}
          </U.MicWrapper>
        

          <U.CamWrapper 
            color="inherit"
            className="navButton"
            id="navCamButton"
            onClick={this.camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff/>
            )}
          </U.CamWrapper>
        </U.MediaWrapper>
      </div>
    );
  }
}

const U = {
  MediaWrapper: styled.div`
    position: absolute;
    bottom: 3%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 0px;
    align-items: center;
  `,
  MicWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 5px 5px;
    transition: all 0.3s ease-in-out;
    background-color: #d5d5d5;
    &:hover {
      transform: scale(1.15);
      background-color: #d5d5d5;
    }
    &:active {
      background-color: #d5d5d5;
    }
  `,
  CamWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    border-radius: 50%;
    padding: 5px 5px;
    transition: all 0.3s ease-in-out;
    background-color: #d5d5d5;
    &:hover {
      transform: scale(1.15);
      background-color: #d5d5d5;
    }
    &:active {
      background-color: #d5d5d5;
    }
  `,
};




const MicON = styled(FaMicrophone)`
  color: #04ae55;
  width: 20px;
  height: 20px;
`;
const MicOFF = styled(FaMicrophoneSlash)`
  color: #8f8e8e;
  width: 22px;
  height: 22px;
`;

const Videocam = styled(MdVideocam)`
  color: #04ae55;
  width: 23px;
  height: 23px;
`;
const VideocamOff = styled(MdVideocamOff)`
  color: #8f8e8e;
  width: 23px;
  height: 23px;
  /* width: 22px;
  height: 22px; */
`;