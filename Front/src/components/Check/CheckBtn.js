import styled from 'styled-components';
import { PiPawPrintFill } from "react-icons/pi";

function CheckBtn({ question, onChange, value }) {
  const options = ['아주조금', '조금', '보통', '많이', '아주많이'];

  return (
    <QuestionContainer>
      <QuestionText>{question}</QuestionText>
      <OptionsContainer>
        {options.map((option, index) => (
          <Label key={index}>
            <HiddenRadioButton
              type="radio"
              name={question}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(question, e.target.value)}
            />
            <StyledRadioButton isChecked={value === option}>
              <PiPawPrintFill />
            </StyledRadioButton>
            <OptionText>{option}</OptionText>
          </Label>
        ))}
      </OptionsContainer>
    </QuestionContainer>
  );
}

export default CheckBtn;

const QuestionContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid rgba(255, 145, 77, 1);
  border-radius: 30px;
  background-color: white;
`;

const QuestionText = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const StyledRadioButton = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid #aaa;
  background-color: ${(props) => (props.isChecked ? 'rgba(255, 145, 77, 1)' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    display: ${(props) => (props.isChecked ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    fill: white;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 1em;
  cursor: pointer;
  white-space: nowrap; /* Prevent text wrapping */
`;

const OptionText = styled.span`
  margin-left: 5px;
  white-space: nowrap; /* Prevent text wrapping */
`;
