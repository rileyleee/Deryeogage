  import React, { useState } from 'react';

  const Radio = () => {
    // 상태(state)를 사용하여 선택된 성별을 기록
    const [gender, setGender] = useState('');

    // 성별이 변경될 때 실행되는 함수
    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };

    return (
      <div>
        <label style={{ marginRight: '20px' }}>
          <input
            type="radio"
            value="남자"
            checked={gender === '남자'}
            onChange={handleGenderChange}
          />
          남자
        </label>

        <label>
          <input
            type="radio"
            value="여자"
            checked={gender === '여자'}
            onChange={handleGenderChange}
          />
          여자
        </label>
      </div>
    );
  };

  export default Radio;
