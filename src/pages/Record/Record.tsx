import { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from 'react'
import { showToast, UID } from '../../assets/scripts/helpers'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import Radio from '../../components/UI/Radio/Radio'
import Select from '../../components/UI/Select/Select'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { createRecord } from '../../store/actions/records'
import { updateUser } from '../../store/actions/setUser'
import { ICategory } from '../../store/actions/types/categories'
import { ExpencesTypes, IRecord } from '../../store/actions/types/records'
import { IUser } from '../../store/actions/types/setUser'

const Record: FC = () => {
  const dispatch = useAppDispatch()

  const { categories } = useAppSelector(state => state.categoriesReducer)
  const { user, userInfoName } = useAppSelector(state => state.setUserReducer)

  const [isFormTouched, setFormTouched] = useState(false)

  const [amountError, setAmountError] = useState<IInputError>({ error: true })
  const [descriptionError, setDescriptionError] = useState<IInputError>({ error: true })
  const [expenseType, setExpenseType] = useState<string>(ExpencesTypes.INCOME)

  const categoriesList: ICategory[] | null = useMemo(() => {
    return categories ? Object.values(categories) : null
  }, [categories])

  const [categoryName, setCategoryName] = useState<string>(
    (categoriesList && categoriesList[0].name) || ''
  )
  const [categoryValue, setCategoryValue] = useState<string>(
    (categoriesList && categoriesList[0].id) || ''
  )
  const [amount, setAmount] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    const validation = simpleInputValidate({
      val: categoryName || '',
      required: true,
    })

    setAmountError({
      error: validation.error,
      text: validation.text,
    })
    setDescriptionError({
      error: validation.error,
      text: validation.text,
    })
  }, [])

  useEffect(() => {
    if (categories) {
      const [categoryId] = Object.keys(categories)
      setCategoryName(categoryId)
    }
  }, [categories])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name

    const validation = simpleInputValidate({
      val: e.target.value,
      required: true,
      type: e.target.type,
    })

    switch (name) {
      case 'amount':
        setAmount(e.target.value)
        setAmountError({
          error: validation.error,
          text: validation.text,
        })

        break
      case 'description':
        setDescription(e.target.value)
        setDescriptionError({
          error: validation.error,
        })
        break
    }
  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = categoriesList && categoriesList.find(cat => cat.id === e.target.value)
    const categoryId =
      category &&
      categories &&
      Object.keys(categories).find((key, i) => i === categoriesList.indexOf(category))

    if (category && categoryId) setCategoryName(categoryId)

    setCategoryValue(e.target.value)
  }

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseType(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormTouched(true)
    const isValid = !amountError.error && !descriptionError.error

    if (isValid && categoryName) {
      const record: IRecord = {
        id: UID(),
        date: new Date(),
        expenseType,
        amount,
        description,
        categoryId: categoryName,
      }

      if (user?.localId && user.bill && userInfoName) {
        const INDEX = record.expenseType === ExpencesTypes.INCOME ? 1 : -1
        const bill: number = +user.bill + +record.amount * INDEX

        const newUserInfo: { [key: string]: IUser } = {
          [userInfoName]: {
            ...user,
            bill,
          },
        }

        dispatch(createRecord(user.localId, record))
        dispatch(updateUser(user.localId, newUserInfo))
      }

      if (categories) {
        setCategoryName(Object.keys(categories)[0])
        setCategoryValue(Object.values(categories)[0].id)
      }
      setAmount('')
      setDescription('')
      setExpenseType(ExpencesTypes.INCOME)

      showToast('?????????? ???????????? ?????????????????? ??????????????!')
    }
  }

  return (
    <LayoutDafault>
      {!categoriesList?.length ? (
        <p>???????? ?????? ???? ?????????? ??????????????????</p>
      ) : (
        <Form
          title="?????????? ????????????"
          titleClass="page-title"
          btnTitle="??????????????"
          formClass="form"
          onSubmit={onSubmit}
        >
          <Select
            name="category"
            label="???????????????? ??????????????????"
            value={categoryValue}
            onCustomChange={onSelectChange}
            options={categoriesList}
          />

          <p>
            <Radio
              name="type"
              value={ExpencesTypes.INCOME}
              checked={expenseType === ExpencesTypes.INCOME}
              onCustomChange={onRadioChange}
            >
              ??????????
            </Radio>
          </p>

          <p>
            <Radio
              name="type"
              value={ExpencesTypes.OUTCOME}
              checked={expenseType === ExpencesTypes.OUTCOME}
              onCustomChange={onRadioChange}
            >
              ????????????
            </Radio>
          </p>

          <Input
            name="amount"
            type="number"
            label="??????????"
            value={amount}
            hasError={isFormTouched && amountError.error}
            errorMessage={amountError.text}
            onCustomChange={onInputChange}
          />

          <Input
            name="description"
            type="text"
            label="????????????????"
            value={description}
            hasError={isFormTouched && descriptionError.error}
            errorMessage={descriptionError.text}
            onCustomChange={onInputChange}
          />
        </Form>
      )}
    </LayoutDafault>
  )
}

export default Record
