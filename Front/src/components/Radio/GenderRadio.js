import React from 'react';

const GenderRadio = ({ gender, setGender }) => {
  // 성별이 변경될 때 실행되는 함수
  const handleGenderChange = (event) => {
    setGender(event.target.value === '남자');
  };

  return (
    <div>
      <label style={{ marginRight: '20px' }}>
        <input
          type="radio"
          value="남자"
          checked={gender}
          onChange={handleGenderChange}
        />
        남자
      </label>

      <label>
        <input
          type="radio"
          value="여자"
          checked={!gender}
          onChange={handleGenderChange}
        />
        여자
      </label>
    </div>
  );
};

export default GenderRadio;
