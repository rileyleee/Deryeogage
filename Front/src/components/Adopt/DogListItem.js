import React from "react";

function DogListItem({ dog }) {
  return (
    <div>
      <h2>{dog.name}</h2>
      <p>나이: {dog.age}세</p>
      <p>지역: {dog.regionCode}</p>
      {/* 다른 강아지 정보들도 여기에 추가할 수 있습니다 */}
    </div>
  );
}

export default DogListItem;