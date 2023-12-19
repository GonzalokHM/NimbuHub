import './loader.css'
const Loader = () => {
    return(
    <div className="loader">
            <div className="sun">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`sunray ray${i}`}></div>
        ))}
      </div>
    <div className="cloud"></div>
    {[...Array(5)].map((_, i) => (
        <div key={i} className={`raindrop drop${i}`}></div>
      ))}
  </div>
    )
  };
  
  export default Loader;