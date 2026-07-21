/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, type ChangeEvent, useEffect, useState } from 'react'
import { AppThemeContext } from '@/contexts/appthemeContext'
import Cookies from 'js-cookie'

// COMPONENTS
import {
    CardComponent,
    FormComponent,
    Header,
    StyledH2,
    StyledButton,
} from '@/components'
import { Container, Grid } from '@mui/material'

// HOOKS
import {
    useFormValidation,
    useGet,
    useDelete,
    usePut,
    useMockStorage,
} from '@/hooks'

// DATAs
import { defaultUser } from '@/data'

// SERVICES
import { logout } from '@/services'

//TYPES
import type {
    InputProps,
    ProfileData,
    ProfileEditableData,
    MessageProps,
} from '@/types'

function Profile() {
    const [profileMockData, setProfileMockData] = useMockStorage(
        'user_profile_v2',
        defaultUser
    )

    const themeContext = useContext(AppThemeContext)

    // HOOKs
    const [updateMessage, setUpdateMessage] = useState<MessageProps>({
        type: 'success',
        msg: '',
    })

    const clearMessage = () => {
        setTimeout(() => {
            setUpdateMessage({
                type: 'success',
                msg: '',
            })
        }, 3000)
    }

    // HOOKs da API
    const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
    } = useGet<ProfileData>('profile')

    const {
        data: profileUpdateData,
        putData: profilePutData,
        loading: profileUpdateLoading,
    } = usePut<ProfileEditableData>('profile/Update')

    const { deleteData: profileDeleteData } = useDelete('profile/delete')

    const hasValidProfileApiData =
        !profileLoading &&
        profileData &&
        typeof profileData === 'object' &&
        profileData.name !== undefined &&
        profileData.name !== ''

    const currentProfile = hasValidProfileApiData
        ? profileData
        : profileMockData

    // FORM VALIDATION - Configuração dos Inputs
    const inputs: InputProps[] = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Nome',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            disabled: true,
        },
        {
            name: 'phone',
            type: 'tel',
            placeholder: 'Telefone',
            required: true,
        },
    ]

    const { formValues, handleChange, formValid } = useFormValidation(
        inputs,
        currentProfile
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const updatedName = String(formValues[0])
        const currentEmail = String(formValues[1])
        const updatedPhone = String(formValues[2])

        setProfileMockData({
            name: updatedName,
            email: currentEmail,
            phone: updatedPhone,
        })

        window.dispatchEvent(new Event('profileUpdated'))

        setUpdateMessage({
            type: 'success',
            msg: 'Perfil atualizado com sucesso!',
        })
        clearMessage()

        try {
            await profilePutData({
                name: updatedName,
                phone: updatedPhone,
            })
        } catch (error) {
            console.warn(
                '⚠️ API offline. Perfil mantido no armazenamento local.'
            )

            setUpdateMessage({
                type: 'error',
                msg: 'Perfil salvo no computador, mas a API está indisponível!',
            })
            clearMessage()
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Tem certeza que deseja excluir sua conta?')) return
        try {
            await profileDeleteData()
        } catch (error) {
            console.warn('⚠️ API offline. Removendo conta localmente.')
        }

        alert('Conta excluída com sucesso')

        localStorage.removeItem('user_profile')
        localStorage.removeItem('token')
        Cookies.remove('Authorization')

        window.location.href = '/'
    }

    useEffect(() => {
        if (profileUpdateData !== null && profileUpdateData !== undefined) {
            setUpdateMessage({
                type: 'success',
                msg: 'Perfil atualizado na nuvem com sucesso!',
            })
            clearMessage()
        }

    }, [profileUpdateData])

    return (
        <>
            <Header />
            <Container className="mb-2" maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        {!profileError && (
                            <CardComponent
                                className={
                                    profileLoading
                                        ? 'skeleton-loading skeleton-loading-mh-2'
                                        : ''
                                }
                            >
                                {!profileLoading && profileData && (
                                    <>
                                        <StyledH2 className="mb-1">
                                            Seus dados
                                        </StyledH2>
                                        <FormComponent
                                            key={
                                                currentProfile?.name ||
                                                'loading'
                                            }
                                            inputs={inputs.map(
                                                (input, index) => ({
                                                    ...input,
                                                    type: input.type,
                                                    placeholder:
                                                        input.placeholder,
                                                    value:
                                                        formValues[index] || '',
                                                    onChange: (
                                                        e: ChangeEvent<HTMLInputElement>
                                                    ) =>
                                                        handleChange(
                                                            index,
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        ),
                                                })
                                            )}
                                            buttons={[
                                                {
                                                    className: 'primary',
                                                    disabled:
                                                        !formValid ||
                                                        profileUpdateLoading,
                                                    type: 'submit',
                                                    onClick: handleSubmit,
                                                    children:
                                                        profileUpdateLoading
                                                            ? 'Atualizando...'
                                                            : 'Atualizar meu perfil',
                                                },
                                                {
                                                    className: 'alert',
                                                    type: 'button',
                                                    onClick: handleDelete,
                                                    children:
                                                        'Excluir minha conta',
                                                },
                                            ]}
                                            message={updateMessage}
                                        />
                                    </>
                                )}
                            </CardComponent>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CardComponent>
                            <StyledH2 className="mb-1">
                                Definiçoes de conta
                            </StyledH2>
                            <StyledButton
                                className="primary mb-1"
                                onClick={themeContext?.toggleTheme}
                            >
                                Trocar para tema{' '}
                                {themeContext?.appTheme === 'light'
                                    ? 'escuro'
                                    : 'claro'}
                            </StyledButton>
                            <StyledButton className="alert" onClick={logout}>
                                Logout
                            </StyledButton>
                        </CardComponent>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Profile
