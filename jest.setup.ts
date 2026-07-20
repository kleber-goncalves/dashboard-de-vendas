/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import 'jest-styled-components'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { TextEncoder, TextDecoder } from 'util'

// Usamos o globalThis para o TypeScript aceitar a injeção sem reclamar de tipos
if (typeof globalThis.TextEncoder === 'undefined') {
    ;(globalThis as any).TextEncoder = TextEncoder
}

if (typeof globalThis.TextDecoder === 'undefined') {
    ;(globalThis as any).TextDecoder = TextDecoder
}