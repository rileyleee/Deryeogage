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
        return <video id ="video" autoPlay={true} ref={this.videoRef} />;
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