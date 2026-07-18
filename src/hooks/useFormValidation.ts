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
                const password = String(formValues[index])
                const hasCorrectLength =
                    password.length >= 8 && password.length <= 16
                const hasUppercase = /[A-Z]/.test(password)
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
                const hasNumber = /\d/.test(password)
                return (
                    hasCorrectLength &&
                    hasUppercase &&
                    hasSpecialChar &&
                    hasNumber
                )
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
