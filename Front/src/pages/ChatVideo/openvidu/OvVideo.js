import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();// 리액트의 Ref 객체를 생성해 <video> 태그 참조를 가진다.
   
    }    
    //React의 ref는 컴포넌트 내부의 DOM, REACT에 직접 접근하는 수단 제공.
    //클래스 컴포넌트인 경우 createRef를 통해 ref를 생성.
    //미디어 재생을 직접적으로 관리해야하기때문에 직접 접근.
    // .current라는 속성은 ref가 가르키는 DOM 요소 videoRef.current는 <video> 요소 가르킴.

   //새로운 비디오 스트림 반영
    componentDidUpdate(props) { // 컴포넌트가 화면에 그려진 직후, 마운트 완료 후에 호출
        // BB if (props && !!this.videoRef) {
        //     this.props.streamManager.addVideoElement(this.videoRef.current);
        // }
        // if (this.props && this.props.user.streamManager && !!this.videoRef) { //user객체의 streamManager가 존재하는지 확인(streamManager는 Openvidu에서 제공하는 클래스. 이게 없으면 연결 불가능)
        //     // console.log("새 비디오 PROPS: ", this.props)
        //     this.props.user.getStreamManager().addVideoElement(this.videoRef.current) // streamManager를 이용해 사용자의 비디오 스트림을 비디오 요소에 추가
        //     if (this.props.user.type === "local") { // 로컬 사용자라면,
        //       this.props.myVideoRef.current = this.videoRef.current // 부모 사용자의 myVideoRef에 이 요소 할당
        //     }
        //   }
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }


    render() { // 비디오 엘리먼트 렌더링
        return <video autoPlay={true} ref={this.videoRef} />;
        // return (
        //   <video
        //     className="rounded-2xl"
        //     autoPlay={true}
        //     id={"video-" + this.props.user.getStreamManager().stream.streamId}
        //     ref={this.videoRef}
        //     muted={this.props.mutedSound}
        //   />
        // )
      }

}