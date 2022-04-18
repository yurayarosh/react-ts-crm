import { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from 'react'
import { UID } from '../../assets/scripts/helpers'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { updateCategory } from '../../store/actions/categories'
import { ICategories, ICategory } from '../../store/actions/types/categories'
import Form from '../Form/Form'
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'

interface ICategoriesFormProps {
  categories: ICategories
}

const CategoriesEditForm: FC<ICategoriesFormProps> = ({ categories }) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.setUserReducer)

  const [isFormTouched, setFormTouched] = useState(false)

  const [categoryNameError, setCategoryNameError] = useState<IInputError>({ error: true })
  const [limitError, setLimitError] = useState<IInputError>({ error: true })
  const [categoryError, setCategoryError] = useState<IInputError>({ error: true })

  const categoriesList: ICategory[] = useMemo(() => {
    return Object.values(categories)
  }, [categories])

  const [activeCategory, setActiveCategory] = useState<{ [key: string]: ICategory }>({
    [Object.keys(categories)[0]]: categoriesList[0],
  })
  const [categoryName, setCategoryName] = useState<string>(categoriesList[0].name)
  const [limit, setLimit] = useState<string | number>(categoriesList[0].limit)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormTouched(true)
    const isValid = !categoryNameError.error && !limitError.error

    if (isValid && user?.localId) {
      dispatch(
        updateCategory(user.localId, {
          [Object.keys(activeCategory)[0]]: {
            limit,
            id: UID(),
            name: categoryName,
          },
        })
      )
    }
  }

  useEffect(() => {
    const validation = simpleInputValidate({
      val: categoryName,
      required: true,
    })

    setCategoryNameError({
      error: validation.error,
      text: validation.text,
    })
    setLimitError({
      error: validation.error,
      text: validation.text,
    })
    setCategoryError({
      error: validation.error,
      text: validation.text,
    })
  }, [])

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
    const category = categoriesList.find(cat => cat.id === e.target.value)
    const name =
      category && Object.keys(categories).find((key, i) => i === categoriesList.indexOf(category))

    if (category && name) {
      setActiveCategory({
        [name]: category,
      })

      setCategoryName(category.name)
      setLimit(category.limit)
    }
  }

  return (
    <>
      {!categoriesList?.length ? (
        <p>Пока нет ни одной категории</p>
      ) : (
        <Form title="Редактировать" btnTitle="Обновить" onSubmit={onSubmit}>
          <Select
            name="category"
            label="Выберите категорию"
            hasError={isFormTouched && categoryError.error}
            errorMessage={categoryError.text}
            onCustomChange={onSelectChange}
            options={categoriesList}
          />

          <Input
            name="category-name"
            type="text"
            label="Название"
            value={categoryName}
            hasError={isFormTouched && categoryNameError.error}
            errorMessage={categoryNameError.text}
            onCustomChange={onInputChange}
          />

          <Input
            name="limit"
            type="number"
            label="Лимит"
            value={limit}
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
