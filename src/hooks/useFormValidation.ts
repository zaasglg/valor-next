import { useState } from 'react'

interface ValidationRules {
  required?: boolean
  email?: boolean
  minLength?: number
}

interface FormField {
  value: string
  rules?: ValidationRules
}

interface FormFields {
  [key: string]: FormField
}

export function useFormValidation<T extends FormFields>(initialFields: T) {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (name: keyof T, value: string) => {
    setFields(prev => ({
      ...prev,
      [name]: { ...prev[name], value }
    }))
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: '' }))
    }
  }

  const validateField = (name: keyof T): string => {
    const field = fields[name]
    
    // Check if field exists
    if (!field) {
      return ''
    }
    
    const rules = field.rules || {}

    if (rules.required && !field.value.trim()) {
      return 'Este campo es obligatorio'
    }

    if (rules.email && field.value && !/\S+@\S+\.\S+/.test(field.value)) {
      return 'Email inválido'
    }

    if (rules.minLength && field.value.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`
    }

    return ''
  }

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Object.keys(fields).forEach(name => {
      const error = validateField(name)
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const reset = () => {
    const resetFields = Object.keys(fields).reduce((acc, key) => {
      const field = fields[key as keyof T]
      if (field) {
        (acc as any)[key] = { ...field, value: '' }
      }
      return acc
    }, {} as T)
    
    setFields(resetFields)
    setErrors({})
  }

  return {
    fields,
    errors,
    updateField,
    validateAll,
    reset,
    hasErrors: Object.keys(errors).length > 0
  }
}