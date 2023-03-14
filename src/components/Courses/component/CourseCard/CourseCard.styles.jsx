import styled from 'styled-components';
export const TitleContainer = styled.div`
  & h2 {
    font-size: 36px;
    /* line-height: 1em; */
    padding-bottom: 20px;
  }

  & p {
    text-align: justify;
  }
`;

export const InfoText = styled.p`
  font-size: 20px;
  & span {
    font-weight: bold;
  }
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: start;
  gap: 10px;

  & button {
    justify-self: center;
  }
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: 60% auto;
  padding: 25px;
  border: 1px solid #00ff00;
  gap: 40px;
`;