import { Link } from 'react-router-dom'
import img from '/logo.png'

export const PageNotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img src={img} alt="" />
        <p className="text-9xl">404</p>
        <p>Page not found <Link className='text-blue-500 underline' to={'/'}>click here</Link> to redirect</p>
      </div>
    </div>
  )
}