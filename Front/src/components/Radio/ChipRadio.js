import React from 'react';

const ChipRadio = ({ chip, setChip }) => {
  // 칩 등록 여부가 바뀔때마다 실행되는 함수
  const handleDogchipChange = (event) => {
    setChip(event.target.value === '등록');
  };

  return (
    <div>
      <label style={{ marginRight: '20px' }}>
        <input
          type="radio"
          value="등록"
          checked={chip}
          onChange={handleDogchipChange}
        />
        {" "}등록
      </label>

      <label>
        <input
          type="radio"
          value="미등록"
          checked={!chip}
          onChange={handleDogchipChange}
        />
        {" "}미등록(알 수 없음)
      </label>
    </div>
  );
};

export default ChipRadio;
