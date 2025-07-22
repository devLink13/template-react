import styled from 'styled-components';

export const Title = styled.h1`
  background: ${(props) => (props.isRed ? 'Red' : 'Blue')};
  text-align: center;
  margin: 20px;
  padding: 20px;
  small {
    color: ${(props) => (props.isRed ? 'White' : 'Black')};
    font-size: 15px;
  }
`;

export const Paragrafo = styled.p`
  ${(props) => {
    if (props.format) {
      return { ...props.format };
    } else {
      return {
        color: 'black',
        backgroundColor: 'white',
        fontSize: '16px',
        textAlign: 'left',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0, 0.1)',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: 'lightgray',
        },
      };
    }
  }}
`;
