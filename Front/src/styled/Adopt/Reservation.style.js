import styled from "styled-components";

export const ReservationContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

export const SelectedDate = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

export const ConfirmButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
