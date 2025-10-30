import { createContext } from 'react'
import type { AppThemeContextProps } from '@/types'

// ESTE ARQUIVO SO IMPORTA O CONTEXT
export const AppThemeContext = createContext<AppThemeContextProps | undefined>(
    undefined
)
