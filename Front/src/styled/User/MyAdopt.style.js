import styled from "styled-components";

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Card = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h3`
  margin: 10px 0;
  color: #333;
`;

export const Introduction = styled.p`
  margin: 10px 0;
  color: #666;
`;
