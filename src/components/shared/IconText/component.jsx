import React from 'react';
import PropTypes from 'prop-types';

const IconText = ({ icon, text, href }) => (
  <a style={{ color: 'rgba(0, 0, 0, 0.45)' }} href={href} target="blank">
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </a>
);

IconText.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.shape(Object).isRequired,
  text: PropTypes.string.isRequired,
};

IconText.defaultProps = {
  href: undefined,
};

export default IconText;
