import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import Form from '../Form/Form'
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'

const CategoriesEditForm: FC = () => {
  const [isFormTouched, setFormTouched] = useState(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [limit, setLimit] = useState<string>('')
  const [categoryNameError, setCategoryNameError] = useState<IInputError>({ error: true })
  const [limitError, setLimitError] = useState<IInputError>({ error: true })
  const [categoryError, setCategoryError] = useState<IInputError>({ error: true })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormTouched(true)
    const isValid = !categoryNameError.error && !limitError.error

    console.log('submit')
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

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e)
  }

  const categories = []

  return (
    <>
      {!categories.length ? (
        <p>Пока нет ни одной категории</p>
      ) : (
        <Form title="Редактировать" btnTitle="Обновить" onSubmit={onSubmit}>
          <Select
            name="category"
            label="Выберите категорию"
            hasError={isFormTouched && categoryError.error}
            errorMessage={categoryError.text}
            onCustomChange={onSelectChange}
            options={[
              { title: 'option-1', id: 1 },
              { title: 'option-2', id: 2 },
            ]}
          />

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
      )}
    </>
  )
}

export default CategoriesEditForm
