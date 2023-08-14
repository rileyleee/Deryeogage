import React, { Component } from 'react';
import './VideoRoom.css';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import MyVideoComponent from './MyVideoComponent';

import UserModel from './models/user-model';
// import UserModel from "./openVidu/user-model.js"
// const localUser = new UserModel()
//class Room extends Component


var localUser = new UserModel();
class VideoRoom extends Component {

    constructor(props) { // 클래스 인스턴스가 생성되면서 실행, props를 통해 부모 컴포넌트 전달받은 데이터 처리
        super(props);
        this.OPENVIDU_SERVER_URL = 'https://i9b307.p.ssafy.io:8443';
        //https://i9b307.p.ssafy.io:8443/#/
        // this.OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':8443';
        this.OPENVIDU_SERVER_SECRET = 'MY_SECRET';

        let roomId = this.props.roomId
        let nickname = this.props.nickname

        this.state = { // 클래스 상태 초기화
            mySessionId: roomId,
            myUserName: nickname,
            // myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
            token: undefined,
            session: undefined,
            localUser: undefined,
            publisher: undefined,
            subscribers: [],
        };
    
        //bind를 통해 클래스 메서드가 클래스 컴포넌트의 this를 항상 참조하도록 만듬
        this.joinSession = this.joinSession.bind(this);        
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);// 세션 참가, 방입장
        this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);// 세션 종료, 방퇴장
        this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
        // this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        // this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.toggleSound = this.toggleSound.bind(this)
        this.camStatusChanged = this.camStatusChanged.bind(this) // 카메라 상태 변경
        this.micStatusChanged = this.micStatusChanged.bind(this) // 마이크 상태 변경
        this.deleteSubscriber = this.deleteSubscriber.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }

    async componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() { // 리액트 생명주기 메서드, 컴포넌트가 화면에서 제거되기 직전에 호출 이벤트리스너제거 등에 사용
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handlerJoinSessionEvent() {
        console.log('Join session');
    }

    handlerLeaveSessionEvent() {
        console.log('Leave session');
        this.setState({
            session: undefined,
        });
    }

    handlerErrorEvent() {
        console.log('Leave session');
    }

    // handleChangeSessionId(e) {
    //     this.setState({
    //         mySessionId: e.target.value,
    //     });
    // }

    // handleChangeUserName(e) {
    //     this.setState({
    //         myUserName: e.target.value,
    //     });
    // }
    
    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    // toggleSound() {
    //     this.setState({ mutedSound: !this.state.mutedSound })
    // }

    // 세션을 초기화하고 스트림이 생성될때 세션에 접속
    // joinSession(event) {
    //     if (this.state.mySessionId && this.state.myUserName) {
    //         this.getToken().then((token) => {
    //             this.setState({
    //                 token: token,
    //                 session: true,
    //             });
    //         });
    //         event.preventDefault();
    //     }
    // }
    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound })
    }

    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive())
        localUser.getStreamManager().publishVideo(localUser.isVideoActive())
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() })
        this.setState({ localUser: localUser })
    }
    
    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive())
        localUser.getStreamManager().publishAudio(localUser.isAudioActive())
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() })
        this.setState({ localUser: localUser })
    }

    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }
   
    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                console.log("Created Session:",mySession);

                let participantCount = mySession.streamManagers.length

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // Get a token from the OpenVidu deployment
                this.getToken().then((token) => {
                    // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    console.log("connectCount:",participantCount)

                    if(participantCount<2){
                    mySession.connect(token, { clientData: this.state.myUserName })
                        .then(async () => {

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = await this.OV.initPublisherAsync(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: localUser.isAudioActive(),
                                publishVideo: localUser.isVideoActive(),
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);

                            // Obtain the current video device in use
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                            // Set the main video in the page to display our webcam and store our Publisher
                            localUser.setStreamManager(publisher);
                            
                            this.setState({
                                currentVideoDevice: currentVideoDevice,
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                    } else{
                        console.log("잘못된 접근입니다 (The room is full!");
                    }
                });
            },
        );
    }

    goBack = () => {
        this.props.setShowVideoRoom(false);
    }

    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        // let roomId = this.props.roomId
        // let nickname = this.props.nickname
        this.props.setShowVideoRoom(false); // 세션 종료시 바로 상세페이지로 이동하기 위한 변수
        const mySession = this.state.session;

        // if (mySession) {
            mySession.disconnect();
        // }

        console.log("Session : ", mySession.sessionId);

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: " ",
            myUserName: " ",
            // mySessionId: 'SessionA',
            // myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });


        // axios.delete(
        //     `${this.OPENVIDU_SERVER_URL}/openvidu/api/sessions/${mySession.sessionId}"`,
        //     {
        //       headers: {
        //         Authorization:
        //           "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   )
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice[0],
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }


    


    render() {
        const mySessionId = this.state.mySessionId;
        const placeholderImage = '/assets/nobody.jpg';
        const localUser = this.state.localUser;
        // const myUserName = this.state.myUserName;

        
        // const { roomID, nickname } = this.props; // roomID와 nickname 값을 props로부터 가져옵니다.


        // const Toolbar = (
        //     <ToolbarComponent
        //       camStatusChanged={this.camStatusChanged}
        //       micStatusChanged={this.micStatusChanged}
        //       switchCamera={this.switchCamera}
        //       leaveSession={this.leaveSession}
        //     />
        //   )
        
        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                        {/* <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                        </div> */}
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h3> 화상채팅에 참여하시겠습니까? </h3>
                            <form className="form-group" onSubmit={this.joinSession}>
                                {/* <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p> */}
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="참여하기" />
                                    <button className="btn btn-lg btn-secondary" onClick={this.goBack}>뒤로가기</button>

                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            <div id="header-bar">
                            <h1 id="session-title">{mySessionId}</h1>
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="방나가기"
                            />
                            </div>
                        </div>
                        <div id ="video-room-section"> 
                            {/* <div id="video-container" className="col-md-12"> */}
                            <div id="other-video-section">
                                {this.state.subscribers.length > 0 ? (
                                    // <div id="stream-container col-md-12 col-xs-12" onClick={() => this.handleMainVideoStream(this.state.subscribers[0])}>
                                     <div id="stream-container"> 
                                        <span>{this.state.subscribers[0].id}</span>
                                        <UserVideoComponent streamManager={this.state.subscribers[0]} />
                                    </div>
                                ) : (
                                    <div className="stream-placeholder">
                                        <img src={placeholderImage} alt="No video available" />
                                    </div>
                                )}
                            </div>
                            <div id="my-video-section">
                                {this.state.mainStreamManager !== undefined ? (
                                    // <div id="main-video" className="col-md-12">
                                    <MyVideoComponent     
                                        streamManager={this.state.mainStreamManager}
                                        sessionId={mySessionId}
                                        localUser={localUser}
                                        camStatusChanged={this.camStatusChanged}
                                        micStatusChanged={this.micStatusChanged}
                                        leaveSession={this.leaveSession}/>
                                    
                                ) : (
                                    <img src={placeholderImage} alt="No main video" />
                                )
                            }
                            </div>
                        </div>
                    </div>
                ) : null}
                   
            </div>
        );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */


    getToken() {
        return this.createSession(this.state.mySessionId)
            .then((sessionId) => this.createToken(sessionId))
            .catch((Err) => console.error(Err));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error.response && error.response.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' + this.OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                    this.OPENVIDU_SERVER_URL +
                                    '"\n\nClick OK to navigate and accept it. ' +
                                    'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                    this.OPENVIDU_SERVER_URL +
                                    '"',
                            )
                        ) {
                            window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({});
            axios
                .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default VideoRoom;

