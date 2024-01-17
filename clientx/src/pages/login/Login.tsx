import './login.css'
import { useState , useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contex/userContext';


export const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e: { target: { name: any; value: any; }; }) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value }
    })
  }
  const loginUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
  
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      navigate('/');
    } catch (err:any) {
      setError(err.response.data.message);
    }
  }
  

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error &&<p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus/>
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} autoComplete={"off"} />
          <button type='submit' className='btn primary'>Sign in</button>
        </form>
        <small>Dont have an account? <Link to="/register">Register</Link></small>
      </div>
    </section>
  )
}
