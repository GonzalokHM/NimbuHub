import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BackgroundWrapper = ({ children }) => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 19 || hour < 7);
  }, []);

  const backgroundStyle = {
    color: isNight ? 'var(--cd-pureWhite-n-001)' : '--cd-pureBlack-n-000',
    backgroundImage: `url(${isNight ? '/night.webp' : '/day.webp'})`,
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