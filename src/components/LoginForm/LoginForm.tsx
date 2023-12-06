import classes from './LoginForm.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { UserContext } from '../../App'
import { useLogin } from '../../api'

export const LoginForm = () => {
  const { mutate: login, isLoading } = useLogin()
  const { setUser } = useContext(UserContext)
  const [isError, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    login(
      {
        username: event.currentTarget.username.value || '',
        password: event.currentTarget.password.value || '',
      },
      {
        onSuccess: e => {
          setUser(e)
          localStorage.setItem('user', JSON.stringify(e))
        },
        onError: e => {
          setError(e.message)
        },
      }
    )
  }
  return (
    <div
      className="background"
      style={{
        borderRadius: '1rem',
        padding: 50,
        width: 400,
      }}
    >
      <p>Login</p>

      <p className={classes.error}>{isError} </p>

      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input required name="username" placeholder="Input username here!" />
        </div>

        <div>
          <label>Password</label>
          <input
            required
            name="password"
            type="password"
            placeholder="Don't let anyone see it!"
          />
        </div>
        <div className={classes['button-wrapper']}>
          <button className="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Chotto mate...' : `Let's goooo`}
          </button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  )
}
