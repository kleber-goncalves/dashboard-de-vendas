import { useState } from "react";

export function useMockStorage<T>(key: string, initialMock: T) {
    const [storedData, setStoredData] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            if (item) {
                return JSON.parse(item);
            }
            localStorage.setItem(key, JSON.stringify(initialMock))
            return initialMock
        } catch (error) {
              console.error(`Erro ao ler chave ${key} do localStorage`, error)
            return initialMock
        }
    });

    const updateStoredData = (newData: T) => {
        try {
            setStoredData(newData)
            localStorage.setItem(key, JSON.stringify(newData))
        } catch (error) {
           console.error(`Erro ao gravar chave ${key} no localStorage`, error)
        }
    };

    return [storedData, updateStoredData] as const
}