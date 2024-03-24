import './register.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const [error, setError] = useState('');
  const navigate = useNavigate()

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;
      console.info(newUser)
      if(!newUser){
        setError('Could not Register, please try again.')
      }
      navigate('/login')
    } catch (err:any) {
      setError(err.response.data.message);
    }
  }
  

  const changeInputHandler = (e: { target: { name: any; value: any; }; }) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} autoFocus/>
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoComplete={'off'} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} autoComplete={'off'} />
          <input type="password" placeholder='Confirm Your Password' name='password2' value={userData.password2} onChange={changeInputHandler} autoComplete={'off'}/>
          <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>All ready have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}
