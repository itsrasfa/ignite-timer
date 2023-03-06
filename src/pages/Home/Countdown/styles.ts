import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 640px) {
    font-size: 7rem;
    align-items: center;
    line-height: 7rem;
    gap: 0.6rem;

    span {
      padding: 0.8rem;
    }
  }

  @media (max-width: 460px) {
    font-size: 5rem;
    align-items: center;
    line-height: 5rem;

    span {
      padding: 0.6rem;
    }
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media (max-width: 640px) {
    width: 3rem;
  }
`
