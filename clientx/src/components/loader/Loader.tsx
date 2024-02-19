import LoadingGif from '../../assets/Assetstest/Disk-0.3s-217px.gif'
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