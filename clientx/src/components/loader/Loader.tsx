import LoadingGif from '../../assets/Assetstest/Infinity-1s-200px.gif'
import './loader.css';

const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader__image">
            <img src={LoadingGif} alt="Loading animation" />
        </div>
    </div>
  )
}

export default Loader