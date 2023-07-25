// 선호도조사 강아지 발바닥 다섯개로 점수주는 컴포넌트

import { PiPawPrintFill } from "react-icons/pi";

function SurveyPaw() {
  // 별점 기본값 설정
  const ARRAY = [0, 1, 2, 3, 4];
  return (
    <div>
      {ARRAY.map((el, index) => (
        <PiPawPrintFill key={index} size="14"></PiPawPrintFill>
      ))}
    </div>
  );
}

export default SurveyPaw;
