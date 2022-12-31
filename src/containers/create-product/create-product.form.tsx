import './create-product.styles.scss'
import { Fragment } from 'react'
import { Control, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const ProductSchema = z.object({
  pId: z.string().uuid({ message: 'Invalid ID' }),

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

  colors: z.array(
    z.object({
      cId: z.string().uuid({ message: 'Invalid ID' }),

      color: z.string().regex(/^[A-Za-z0-9 -_:]+$/, {
        message: 'Invalid characters in the color',
      }),

      price: z
        .number({ invalid_type_error: 'Enter dollar value, numbers only' })
        .gte(0, { message: 'Enter a positive value (0 if FREE)' })
        .lte(10000, { message: 'Price must be less than or equal to $10,000' })
        .refine(value => (value * 100) % 1 === 0, {
          message: 'Price must be a multiple of 0.01',
        }),

      imageURL: z.string().regex(/\.(gif|jpe?g|tiff?|png|bmp)$/i, {
        message: 'Enter image file name (gif/jpg/png/bmp) or URL',
      }),

      quantity: z
        .number({ invalid_type_error: 'Enter a whole number' })
        .int({ message: 'Quantity must be a whole number' })
        .gte(0, { message: 'Quantity must be a positive number' })
        .lte(10000, { message: 'Current max-quantity is 10,000 units' }),
    })
  ),
})

type FormDataType = z.infer<typeof ProductSchema>

const CreateProductForm = () => {
  const {
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(ProductSchema),
    shouldUseNativeValidation: false,
    defaultValues: {
      pId: 'b12fcc08-b480-46da-9373-10a91a045627',
      name: 'Product One',
      description: 'Description for Product One',
      colors: [
        {
          cId: 'f7d83629-2b86-4250-b22e-db879ec2c2c7',
          color: 'Yellow',
          price: 11.99,
          imageURL: 'srcassets\\1__dBwadhWa-lI-unsplash.jpg',
          quantity: 101,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'colors',
    keyName: 'cId',
  })

  const onSubmit = (data: FormDataType) => {
    console.log('Attempt to submit Create Product Form data')
    console.log(errors)
    console.log(data)
    reset()
  }

  return (
    <form className='create-product__form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>
        Name:
        <span>{errors.name?.message}</span>
      </label>
      <input id='name' {...register('name')} />

      <label htmlFor='description'>
        Description:
        <span>{errors.description?.message}</span>
      </label>
      <textarea id='description' {...register('description')} />

      {fields.map((colorField, index) => (
        <Fragment key={colorField.cId}>
          <label htmlFor={`colors[${index}].color`}>
            Color:
            <span>{errors.colors?.[index]?.color?.message}</span>
          </label>
          <input
            id={`colors[${index}].color`}
            {...register(`colors.${index}.color` as const)}
          />

          <label htmlFor={`colors[${index}].price`}>
            Price:
            <span>{errors.colors?.[index]?.price?.message}</span>
          </label>
          <input
            id={`colors[${index}].price`}
            {...register(`colors.${index}.price` as const, {
              valueAsNumber: true,
            })}
          />

          <label htmlFor={`colors[${index}].imageURL`}>
            Image URL:
            <span>{errors.colors?.[index]?.imageURL?.message}</span>
          </label>
          <input
            id={`colors[${index}].imageURL`}
            {...register(`colors.${index}.imageURL` as const)}
          />

          <label htmlFor={`colors[${index}].quantity`}>
            Quantity:
            <span>{errors.colors?.[index]?.quantity?.message}</span>
          </label>
          <input
            id={`colors[${index}].quantity`}
            {...register(`colors.${index}.quantity` as const, {
              valueAsNumber: true,
            })}
          />

          <button type='button' onClick={() => remove(index)}>
            Remove
          </button>
        </Fragment>
      ))}
      <button
        type='button'
        onClick={() =>
          append({
            cId: crypto.randomUUID(),
            color: '',
            price: 0,
            imageURL: '',
            quantity: 0,
          })
        }
      >
        Add Color
      </button>

      <button
        type='submit'
        onClick={() => setValue('pId', crypto.randomUUID())}
      >
        Submit
      </button>

      <button type='reset'>Reset</button>
    </form>
  )
}

export default CreateProductForm
