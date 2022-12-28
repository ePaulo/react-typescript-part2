import './create-product.styles.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const DataSchema = z.object({
  id: z.string().uuid({ message: 'Invalid ID' }),

  name: z
    .string()
    .min(8, { message: 'Enter a product name with >7 characters' })
    .max(64, { message: 'Name must be less than 65 characters' })
    .regex(/^[A-Za-z0-9 -_:]+$/, {
      message: 'Invalid characters in the name',
    }),

  description: z
    .string()
    .min(25, { message: 'Enter a description with >24 characters' })
    .max(250, { message: 'Description must be less than 250 characters' })
    .regex(/^[A-Za-z0-9 -_:]+$/, {
      message: 'Invalid characters in the description',
    }),

  price: z
    .number({ invalid_type_error: 'Enter dollar value, numbers only' })
    .gte(0, { message: 'Enter a positive value (0 if FREE)' })
    .lte(10000, { message: 'Price must be less than or equal to $10,000' })
    .refine(value => (value * 100) % 1 === 0, {
      message: 'Price must be a multiple of 0.01',
    })
    .default(0),

  imageURL: z.string().regex(/\.(gif|jpe?g|tiff?|png|bmp)$/i, {
    message: 'Enter image file name (gif/jpg/png/bmp) or URL',
  }),

  quantity: z
    .number({ invalid_type_error: 'Enter a whole number' })
    .int({ message: 'Quantity must be a whole number' })
    .gte(0, { message: 'Quantity must be a positive number' })
    .lte(10000, { message: 'Current max-quantity is 10,000 units' })
    .default(0),
})

type FormData = z.infer<typeof DataSchema>

const CreateProductForm = () => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(DataSchema),
    shouldUseNativeValidation: false,
  })

  const onSubmit = (data: FormData) => {
    // console.log(errors)
    console.log(data)
    reset()
  }

  return (
    <form className='create-product__form' onSubmit={handleSubmit(onSubmit)}>
      {/* <label htmlFor='id'>
        ID:
        {errors.id && <span>{errors.id.message}</span>}
      </label>
      <input id='id' {...register('id')} /> */}
      <label htmlFor='name'>
        Name:
        {errors.name && <span>{errors.name.message}</span>}
      </label>
      <input id='name' {...register('name')} />
      <label htmlFor='description'>
        Description:
        {errors.description && <span>{errors.description.message}</span>}
      </label>
      <textarea id='description' {...register('description')} />
      <label htmlFor='price'>
        Price:
        {errors.price && <span>{errors.price.message}</span>}
      </label>
      <input id='price' {...register('price', { valueAsNumber: true })} />
      <label htmlFor='imageURL'>
        Image URL:
        {errors.imageURL && <span>{errors.imageURL.message}</span>}
      </label>
      <input id='imageURL' {...register('imageURL')} />
      <label htmlFor='quantity'>
        Quantity:
        {errors.quantity && <span>{errors.quantity.message}</span>}
      </label>
      <input id='quantity' {...register('quantity', { valueAsNumber: true })} />

      <button type='submit' onClick={() => setValue('id', crypto.randomUUID())}>
        Submit
      </button>
    </form>
  )
}

export default CreateProductForm
