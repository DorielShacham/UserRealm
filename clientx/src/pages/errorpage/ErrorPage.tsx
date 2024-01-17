import './errorpage.css'
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <Link to='/' className='btn primary'>Back to the Homepage</Link>
        <h2>Page Not Found</h2>
      </div>
    </section>
  )
}
