import React, { Component } from 'react';
import './VideoRoom.css';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';

// import ToolbarComponent from "./ToolbarComponent"

// import UserModel from "./openVidu/user-model.js"
// const localUser = new UserModel()
//class Room extends Component


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
            // localUser: undefined,
            publisher: undefined,
            subscribers: [],
        };
    
        //bind를 통해 클래스 메서드가 클래스 컴포넌트의 this를 항상 참조하도록 만듬
        this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);// 세션 참가, 방입장
        this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);// 세션 종료, 방퇴장
        this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
        // this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        // this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.joinSession = this.joinSession.bind(this);        
        this.leaveSession = this.leaveSession.bind(this);
        // this.toggleSound = this.toggleSound.bind(this)
        // this.camStatusChanged = this.camStatusChanged.bind(this) // 카메라 상태 변경
        // this.micStatusChanged = this.micStatusChanged.bind(this) // 마이크 상태 변경
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() { // 리액트 생명주기 메서드, 컴포넌트가 화면에서 제거되기 직전에 호출 이벤트리스너제거 등에 사용
        window.removeEventListener('beforeunload', this.onbeforeunload);
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
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
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

    // camStatusChanged() {
    //     localUser.setVideoActive(!localUser.isVideoActive())
    //     localUser.getStreamManager().publishVideo(localUser.isVideoActive())
    //     this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() })
    //     this.setState({ localUser: localUser })
    //   }
    
    //   micStatusChanged() {
    //     localUser.setAudioActive(!localUser.isAudioActive())
    //     localUser.getStreamManager().publishAudio(localUser.isAudioActive())
    //     this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() })
    //     this.setState({ localUser: localUser })
    //   }
    


    render() {
        const mySessionId = this.state.mySessionId;
        const placeholderImage = '/assets/kkomi1.jpg';
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
                            <h1 id="session-title">{mySessionId}</h1>
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                            {/* <input
                                className="btn btn-large btn-success"
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="Switch Camera"
                            /> */}
                        </div>
                        <div className="row"> 
                            <div id="video-container" className="col-md-12">
                            {this.state.subscribers.length > 0 ? (
                                <div key={this.state.subscribers[0].id} className="stream-container col-md-12 col-xs-12" onClick={() => this.handleMainVideoStream(this.state.subscribers[0])}>
                                    <span>{this.state.subscribers[0].id}</span>
                                    <UserVideoComponent streamManager={this.state.subscribers[0]} />
                                </div>
                            ) : (
                            //     <div className="stream-placeholder">
                            //         <img src={placeholderImage} alt="No video available" />
                            //     </div>
                            // )
                            null)}
                            </div>
                            {this.state.mainStreamManager !== undefined ? (
                                <div id="main-video" className="col-md-12">
                                    <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                </div>
                            ) : (
                                // <div className="main-video-placeholder">
                                //     <img src={placeholderImage} alt="No main video" />
                                // </div>
                                null)
                            }
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


 // joinSession() {
    //     // console.log("세션 id:", this.sessionName)
    //     console.log("joinSession 시작 세션 ID:", this.sessionName)
    //     this.OV = new OpenVidu()
    //     this.OV.enableProdMode()
    
    //     this.setState(
    //       {
    //         session: this.OV.initSession(),
    //       },
    //       () => {
    //         this.subscribeToStreamCreated()
    //         this.connectToSession()
    //       }
    //     )
    //   }
    
    //   connectToSession() {
    //     if (this.props.token !== undefined) {
    //       console.log("token received: ", this.props.token)
    //       this.connect(this.props.token)
    //     } else {
    //       this.getToken()
    //         .then((token) => {
    //           console.log("토큰 정보 : ", token)
    //           this.connect(token)
    //         })
    //         .catch((error) => {
    //           if (this.props.error) {
    //             this.props.error({
    //               error: error.error,
    //               messgae: error.message,
    //               code: error.code,
    //               status: error.status,
    //             })
    //           }
    //           console.log(
    //             "There was an error getting the token:",
    //             error.code,
    //             error.message
    //           )
    //           alert("There was an error getting the token:", error.message)
    //         })
    //     }
    //   }

    //   connect(token) {
    //     this.state.session.connect(token, { // openvidu 세션 연결 메서드, 매개변수로 토큰과 연결시 제공할 데이터 객체.
    //         clientData: this.state.myUserName, // 사용자 이름
    //         admin: this.state.isRoomAdmin, // 관리자 권한?
    //       })
    //       .then(() => { // 연결 설공시 웹캠 활성화, openvidu 세션에 비디오 스트림 게시
    //         this.connectWebCam()
    //       })
    //       .catch((error) => {
    //         if (this.props.error) {
    //           this.props.error({
    //             error: error.error,
    //             messgae: error.message,
    //             code: error.code,
    //             status: error.status,
    //           })
    //         }
    //         alert("There was an error connecting to the session:", error.message)
    //         console.log(
    //           "There was an error connecting to the session:",
    //           error.code,
    //           error.message
    //         )
    //       })
    //   }


    //   async connectWebCam() {
    //     //카메라 접근 요청
    
    //     let devices
    //     try {
    //     //   const stream = await navigator.mediaDevices.getUserMedia({
    //     //     audio: true,
    //     //     video: true,
    //     //   })
    //       devices = await this.OV.getDevices() // 오픈비두 라이브러리 메서드, 웹에서 사용 가능한 미디어 장치 목록 반환
    //     } catch (err) {
    //       alert("사용 가능한 웹캠이 없습니다. ")
    //       this.enterError = true
    //       this.props.goBack() // 방 페이지에서 구현. 
    
    //       console.log(this.leaveSession, this.props.goBack)
    //     }
    //     const videoDevices = devices.filter(
    //       (device) => device.kind === "videoinput"
    //     )
    
    //     // 오픈비두 라이브러리, 웹캠에서 오디오 비디오 스트림을 가져오는 publisher 객체 초기화.
    //     let publisher = this.OV.initPublisher(undefined, { 
    //       audioSource: undefined,
    //       videoSource: videoDevices[0].deviceId,
    //       publishAudio: localUser.isAudioActive(),
    //       publishVideo: localUser.isVideoActive(),
    //       resolution: "640x480",
    //       frameRate: 30,
    //       insertMode: "APPEND",
    //       mirror: true,
    //     })
    
    //     if (this.state.session.capabilities.publish) { // 사용자가 스트림 발행할 수 있는지?
    //       publisher.on("accessAllowed", () => { // 사용자 카메라 마이크에 접근 허용이 되었을때 이벤트 리스너 설정
    //         this.state.session.publish(publisher).then(() => { //사용자의 오디오 비디오 스트림을 세션에 발행.
    //           this.updateSubscribers() // 발행시 구독자 목록 업데이트
    //           this.localUserAccessAllowed = true // 사용자 카메라 마이크 접근 허용됨을 체크
    //           if (this.props.joinSession) { // 부모 컴포넌트에서 prop 전달 받으면 아래 메서드 호출
    //             this.props.joinSession()
    //           }
    //         })
    //       })
    //     }
    //     localUser.setNickname(this.props.user ?? localStorage.getItem("nickname"))
    //     localUser.setConnectionId(this.state.session.connection.connectionId)
    //     // localUser.setScreenShareActive(false)
    //     localUser.setStreamManager(publisher)
    //     // console.log(localUser)
    //     // localUser.setIcon(this.props.icon)
    //     this.subscribeToUserChanged() // 사용자의 상태 변경에 관한 이벤트 체크. 상태변경시마다 로직 수행하기 위함
    //     this.subscribeToStreamDestroyed() // 종료시 이벤트. 사용자에게 알림 주려면 있어야함. 없으면 삭제가능.
    //     // this.sendSignalUserChanged({
    //     //   isScreenShareActive: localUser.isScreenShareActive(),
    //     // })
    
    //     this.setState(
    //       { currentVideoDevice: videoDevices[0], localUser: localUser },
    //       () => {
    //         this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
    //           publisher.videos[0].video.parentElement.classList.remove(
    //             "custom-class"
    //           )
    //         })
    //       }
    //     )
    //   }