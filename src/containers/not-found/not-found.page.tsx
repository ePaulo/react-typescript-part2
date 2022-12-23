import { useEffect } from 'react'
import '../containers.styles.scss'
import './not-found.styles.scss'

import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  console.log('NotFoundPage') // LOG

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])

  return (
    <div className='container not-found'>
      <h1 className='page__title'>Not Found</h1>
      <p>Redirecting to Home</p>
    </div>
  )
}

export default NotFoundPage
