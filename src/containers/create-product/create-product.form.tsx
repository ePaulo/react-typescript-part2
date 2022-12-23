import './create-product.styles.scss'
import { useForm } from 'react-hook-form'

type FormData = {
  id: string
  name: string
  description: string
  price: number
  imageURL: string
  quantity: number
}

// console.log(crypto.randomUUID())

const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => console.log(data)

  console.log(errors)

  return (
    <form className='create-product__form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>
        Name:
        {errors.name && (
          <span className='create-product__form__error'>
            {errors.name.message}
          </span>
        )}
      </label>
      <input
        id='name'
        type='text'
        {...register('name', {
          required: 'This field is required',
          minLength: {
            value: 5,
            message: 'Name must be at least 5 characters',
          },
          maxLength: {
            value: 50,
            message: 'Name must be less than 50 characters',
          },
          pattern: {
            value: /^[A-Za-z0-9 -_:]+$/,
            message: 'Invalid characters in the name',
          },
        })}
      />

      <label htmlFor='description'>
        Description:
        {errors.description && (
          <span className='create-product__form__error'>
            {errors.description.message}
          </span>
        )}
      </label>
      <textarea
        id='description'
        {...register('description', {
          required: 'This field is required',
          minLength: {
            value: 25,
            message: 'Description must be at least 25 characters',
          },
          maxLength: {
            value: 250,
            message: 'Description must be less than 250 characters',
          },
          pattern: {
            value: /^[A-Za-z0-9 -_:]+$/,
            message: 'Invalid characters in the description',
          },
        })}
      />

      <label htmlFor='price'>
        Price:
        {errors.price && (
          <span className='create-product__form__error'>
            {errors.price.message}
          </span>
        )}
      </label>
      <input
        id='price'
        type='number'
        defaultValue='0'
        step='0.01'
        {...register('price', {
          required: 'This field is required',
          valueAsNumber: true,
          min: { value: 0.99, message: 'Price must be at least $0.99' },
          max: { value: 999.99, message: 'Price must be less than $999.99' },
          pattern: {
            value: /^\$?[\d,]+(\.\d{2})?$/,
            message: 'Invalid price format',
          },
        })}
      />

      <label htmlFor='imageURL'>
        Image URL:
        {errors.imageURL && (
          <span className='create-product__form__error'>
            {errors.imageURL.message}
          </span>
        )}
      </label>
      <input
        id='imageURL'
        type='text'
        {...register('imageURL', {
          required: 'This field is required',
          pattern: {
            value: /\.(gif|jpe?g|tiff?|png|bmp)$/i,
            message: 'Invalid image format',
          },
        })}
      />

      <label htmlFor='quantity'>
        Quantity:
        {errors.quantity && (
          <span className='create-product__form__error'>
            {errors.quantity.message}
          </span>
        )}
      </label>
      <input
        id='quantity'
        type='number'
        defaultValue='0'
        {...register('quantity', {
          required: true,
          valueAsNumber: true,
          min: { value: 0, message: 'Quantity must be at least 0' },
          max: { value: 999, message: 'Quantity must be less than 999' },
          pattern: {
            value: /^\d+$/,
            message: 'Invalid quantity format',
          },
        })}
      />
      <input type='submit' />
    </form>
  )
}

export default CreateProductForm
