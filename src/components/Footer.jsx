const Footer = () => {
    return (
      <footer style={footerStyle}>
        developed by <a href="https://ghmportfolio.netlify.app/home" style={linkStyle} target="_blank" rel="noopener noreferrer">ghmdevs</a>
      </footer>
    );
  };

  const linkStyle = {
    color: 'var(--LinK-hover)',
    textDecoration: 'none',
    fontWeight: 'bold', 
  };
  
  // Estilos para el footer
  const footerStyle = {
    textAlign: 'center',
    position: 'absolute',
    bottom: '0',
    fontSize: '0.8em',
  };

  export default Footer