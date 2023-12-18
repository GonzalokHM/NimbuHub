import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BackgroundWrapper = ({ children }) => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 19 || hour < 7);
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${isNight ? '/night.png' : '/day.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    textAlign: 'center', 
    flexDirection: 'column', 
    alignItems: 'center'
  };

  return <div style={backgroundStyle}>{children}</div>;
};

BackgroundWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default BackgroundWrapper;