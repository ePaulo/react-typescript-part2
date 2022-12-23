import { useParams } from 'react-router-dom'
import '../containers.styles.scss'
import './product-details.styles.scss'

const ProductDetailsPage = () => {
  console.log('ProductDetailsPage') // LOG
  const { id } = useParams()
  return (
    <div className='container product-details'>
      <h1 className='page__title'>Product Details {id}</h1>
    </div>
  )
}

export default ProductDetailsPage
