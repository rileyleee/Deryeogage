import React, { useState } from 'react';

const Radio = () => {
  // 상태(state)를 사용하여 선택된 칩 등록 여부를 기록
  const [dogchip, setDogchip] = useState('');

  // 칩 등록 여부가 바뀔때마다 실행되는 함수
  const handleDogchipChange = (event) => {
    setDogchip(event.target.value);
  };

  return (
    <div>
      <label style={{ marginRight: '20px' }}>
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
        미등록(알 수 없음)
      </label>

    </div>
  );
};

export default Radio;
