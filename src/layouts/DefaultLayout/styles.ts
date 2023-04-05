import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  @media (max-width: 800px) {
    height: auto;
  }
  @media (max-width: 460px) {
    max-width: 25rem;
  }
  @media (max-width: 320px) {
    max-width: 18rem;
  }

  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
