import s from './login.module.scss';
import { Link } from 'react-router-dom'


export function Login() {
    
    return (
      <div className={s.wrap}> 
        <div className={s.header}>
            Log in !
        </div>
        <form>
            <label>
            Username:
            <input type="text" name="name" />
            </label>
            <label>
            Password:
            <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        <Link to="/" className={s.link}> go back </Link>
      </div>

    );
  }