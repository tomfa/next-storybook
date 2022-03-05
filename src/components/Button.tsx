import styled from "styled-components";

type StyleProps = {
  secondary?: boolean,
  buttonColor?: string,
}
type Props = StyleProps & {
  onClick?: () => void,
  href?: string,
}

const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton {...props} as={props.href && 'a'}/>
  )
}

const StyledButton = styled.button<StyleProps>`
  padding: ${p => p.secondary ? '0.5rem' : '0.5rem 1rem'};
  font-size: 1rem;
  font-family: ${p => p.theme.typography.fontFamily};
  background-color: ${p => p.buttonColor || p.secondary && p.theme.color.button.secondaryBg || p.theme.color.button.primaryBg};
  color: ${p => p.secondary ? p.theme.color.button.secondaryText : p.theme.color.button.primaryText};
  border: none;
  cursor: pointer;
  transition: opacity 200ms;
  
  &:hover {
    opacity: 0.7;
  }
`

export default Button
