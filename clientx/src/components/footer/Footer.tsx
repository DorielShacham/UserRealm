import './footer.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <ul className='footer__categories'>
        <li><Link to='/posts/categories/Portfolio'>Portfolio</Link></li>
        <li><Link to='/posts/categories/Blog'>Blog</Link></li>
        <li><Link to='/posts/categories/E-commerce'>E-commerce</Link></li>
        <li><Link to='/posts/categories/Social'>Social</Link></li>
        <li><Link to='/posts/categories/Gaming'>Gaming</Link></li>
        <li><Link to='/posts/categories/Educational'>Educational</Link></li>
        <li><Link to='/posts/categories/Weather'>Weather</Link></li>
        <li><Link to='/posts/categories/Real Estate'>Real Estate</Link></li>
        <li><Link to='/posts/categories/Job Board'>Job Board</Link></li>
        <li><Link to='/posts/categories/AI'>AI</Link></li>
        <li><Link to='/posts/categories/Streaming'>Streaming</Link></li>
        <li><Link to='/posts/categories/Pet'>Pet</Link></li>
        <li><Link to='/posts/categories/Space'>Space</Link></li>
        <li><Link to='/posts/categories/News'>News</Link></li>
        <li><Link to='/posts/categories/Weather'>Weather</Link></li>
        <li><Link to='/posts/categories/Health'>Health</Link></li>
        <li><Link to='/posts/categories/Entertainment'>Entertainment</Link></li>
        <li><Link to='/posts/categories/Travel'>Travel</Link></li>
        <li><Link to='/posts/categories/Food'>Food</Link></li>
        <li><Link to='/posts/categories/Music'>Music</Link></li>
        <li><Link to='/posts/categories/Fashion'>Fashion</Link></li>
        <li><Link to='/posts/categories/Sports'>Sports</Link></li>
        <li><Link to='/posts/categories/Crypto'>Crypto</Link></li>
        <li><Link to='/posts/categories/Mobile App'>Mobile App</Link></li>
        <li><Link to='/posts/categories/Photography'>Photography</Link></li>
        <li><Link to='/posts/categories/Dashboard'>Dashboard</Link></li>
        <li><Link to='/posts/categories/Government'>Government</Link></li>
        <li><Link to='/posts/categories/Educational'>Educational</Link></li>
        <li><Link to='/posts/categories/Uncategorized'>Uncategorized</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All rights Reserved &copy; Copyright, World of Workcraft</small>
      </div>
    </footer>
  )
}


