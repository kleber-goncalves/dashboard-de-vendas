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
import { useFormValidation, useGet, usePost, useDelete, usePut } from '@/hooks'

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
    const themeContext = useContext(AppThemeContext)

    // HOOKs
    const { updateMessage, setUpdateMessage } = useState<MessageProps>({
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
    const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
    } = useGet<ProfileData>('profile')

    const {
        data: profileUpdateData,
        putData: profilePutData,
        loading: profileUpdateLoading,
        error: profileUpdateError,
    } = usePut<ProfileEditableData>('profile/Update')

    const {
        deleteData: profileDeleteData,
    } = useDelete('profile/Update')
    
    useEffect(() => {
        if (profileData) {
            handleChange(0, profileData?.name || '')
            handleChange(1, profileData?.email || '')
            handleChange(2, profileData?.phone || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileData])

    // FORM VALIDATION
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

    const { formValues, handleChange, formValid } = useFormValidation(inputs)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await profilePutData({
            name: String(formValues[0]),
            phone: String(formValues[2]),
        })
    }

    const handleDelete = async () => {
        confirm('Tem certeza que deseja excluir sua conta?')
        try {
            await profileDeleteData()
            alert('Conta excluida com sucesso')
            Cookies.remove('Authorization')
            window.location.href = '/'
        } catch (error) {
            alert('Erro ao excluir conta')
        }
    }

    useEffect(() => {
        if (profileUpdateData !== null) {
            setUpdateMessage({
                type: 'success',
                msg: 'Perfil atualizado com sucesso',
            })
        } else if (profileUpdateError) {
            setUpdateMessage({
                type: 'error',
                msg: 'API indisponivel tente novamente mais tarde',
            })
        }
        clearMessage()
    }, [profileUpdateError, profileUpdateData])

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
