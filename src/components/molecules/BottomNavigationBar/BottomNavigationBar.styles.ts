import styled from 'basic-styled';

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid;
  border-right: 1px solid;
  border-left: 1px solid;
  border-color: ${({
    theme: {
      palette: { border }
    }
  }) => border.light};
  border-top-left-radius: ${({ theme: { radius } }) => radius['300']};
  border-top-right-radius: ${({ theme: { radius } }) => radius['300']};
  margin-left: -1px;
  margin-right: -1px;
  overflow: hidden;

  & > button {
    flex-grow: 1;

    &:active,
    &:focus,
    &:hover {
      background-color: transparent;
    }
  }
`;
