import './footer.css'
import { Link } from 'react-router-dom';
import Chatbot from '../chatbot/Chatbot';
import { useEffect, useState } from 'react';
import { categories } from '../../models/constants';
import { constantPath } from '../../models/constants';

export const Footer = () => {
  const [cat, setCat]= useState<string[]>();
  const [path, setPath] = useState<string>();
  useEffect(() => {
    setCat(categories);
    setPath(constantPath);
  }, [])
  return (
    <footer>
      <Chatbot />
      <ul className='footer__categories'>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`${constantPath}${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      <div className="footer__copyright">
        <small>All rights Reserved &copy; Copyright, Hotthorn</small>
      </div>
    </footer>
  )
}


