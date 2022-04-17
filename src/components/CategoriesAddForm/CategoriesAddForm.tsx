import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import { useAppDispatch } from '../../hooks/store'
import Form from '../Form/Form'
import Input from '../UI/Input/Input'

const CategoriesAddForm: FC = () => {
  const [isFormTouched, setFormTouched] = useState(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [limit, setLimit] = useState<string>('')
  const [categoryNameError, setCategoryNameError] = useState<IInputError>({ error: true })
  const [limitError, setLimitError] = useState<IInputError>({ error: true })

  const dispatch = useAppDispatch()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormTouched(true)

    const isValid = !categoryNameError.error && !limitError.error

    if (isValid) {
      console.log({
        categoryName,
        limit,
      })

      // dispatch(createCategory({ name: categoryName, limit }))

    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name

    const validation = simpleInputValidate({
      val: e.target.value,
      required: true,
      type: e.target.type,
    })

    switch (name) {
      case 'category-name':
        setCategoryName(e.target.value)
        setCategoryNameError({
          error: validation.error,
          text: validation.text,
        })

        break
      case 'limit':
        setLimit(e.target.value)
        setLimitError({
          error: validation.error,
        })
        break
    }
  }

  return (
    <Form title="Создать" btnTitle="Создать" onSubmit={onSubmit}>
      <Input
        name="category-name"
        type="text"
        label="Название"
        hasError={isFormTouched && categoryNameError.error}
        errorMessage={categoryNameError.text}
        onCustomChange={onInputChange}
      />

      <Input
        name="limit"
        type="number"
        label="Лимит"
        hasError={isFormTouched && limitError.error}
        errorMessage={limitError.text}
        onCustomChange={onInputChange}
      />
    </Form>
  )
}

export default CategoriesAddForm
