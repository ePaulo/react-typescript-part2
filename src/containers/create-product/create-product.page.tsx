import '../containers.styles.scss'
import CreateProductForm from './create-product.form'
import './create-product.styles.scss'

const CreateProductPage = () => {
  console.log('CreateProductPage') // LOG
  return (
    <div className='container create-product'>
      <h1 className='page__title'>Create Product</h1>
      <CreateProductForm />
    </div>
  )
}

export default CreateProductPage
