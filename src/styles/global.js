const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xl: 1200,
}

export const mq = (size) => {
  return `@media (max-width: ${breakpoints[size]}px)`;
}

export const section_style = {
  margin: 0,
  width: '100%',
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}