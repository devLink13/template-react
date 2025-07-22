import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
`;

export const SubTitle = styled.h2`
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

export const TextBox = styled.p`
  font-size: 12px;
  text-align: center;
`;

export const Button = styled.button`
  background: darkslateblue;
  margin: 20px auto 0; /* margin-top: 20px, left/right: auto */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  small {
    color: white;
    padding-left: 10px;
    text-align: center;
  }
`;
