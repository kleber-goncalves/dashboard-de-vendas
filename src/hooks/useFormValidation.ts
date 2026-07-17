/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import type { InputProps } from '@/types'
interface ProfileValidationData {
    name?: string
    email?: string
    phone?: string
}

export const useFormValidation = (
    inputs: InputProps[],
    currentProfileData?: ProfileValidationData
) => {
    const [formValues, setFormValues] = useState<string[]>(() => {
        return [
            currentProfileData?.name || '',
            currentProfileData?.email || '',
            currentProfileData?.phone || '',
        ]
    })
    const [formValid, setFormValid] = useState<boolean>(false)

    useEffect(() => {
        if (currentProfileData) {
            setFormValues([
                currentProfileData.name || '',
                currentProfileData.email || '',
                currentProfileData.phone || '',
            ])
        }
    }, [currentProfileData])

    useEffect(() => {
        const allFieldsValid = inputs.every((input, index) => {
            if (input.required && !formValues[index]) {
                return false
            }
            if (input.type === 'email') {
                return /\S+@\S+\.\S+/.test(String(formValues[index]))
            }
            if (input.type === 'password') {
                return String(formValues[index]).length > 7
            }
            return true
        })

        setFormValid(allFieldsValid)
    }, [formValues])

    const handleChange = (index: number, value: string) => {
        setFormValues((prevValues) => {
            const newValues = [...prevValues]
            newValues[index] = value
            return newValues
        })
    }

    return { formValues, handleChange, formValid }
}
