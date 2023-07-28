import React, { useState } from 'react';

const Radio = () => {
  // 상태(state)를 사용하여 선택된 성별을 기록
  const [dogchip, setDogchip] = useState('');

  // 성별이 변경될 때 실행되는 함수
  const handleDogchipChange = (event) => {
    setDogchip(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="등록"
          checked={dogchip === '등록'}
          onChange={handleDogchipChange}
        />
        등록
      </label>

      <label>
        <input
          type="radio"
          value="미등록"
          checked={dogchip === '미등록'}
          onChange={handleDogchipChange}
        />
        미등록
      </label>

      <label>
        <input
          type="radio"
          value="알 수 없음"
          checked={dogchip === '알 수 없음'}
          onChange={handleDogchipChange}
        />
        알 수 없음
      </label>
    </div>
  );
};

export default Radio;