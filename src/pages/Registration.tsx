/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { type ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import { Box, Container, Grid } from '@mui/material'
import {
    BannerImage,
    FormComponent,
    Logo,
    StyledH1,
    StyledP,
    StyledUl,
} from '@/components'
import { pxToRem } from '@/utils'

// Hooks
import { useFormValidation, usePost } from '@/hooks'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@/redux'
import { setMessage, setProfileData } from '@/redux/slices/createProfile'

// TYPEs
import type { CreateProfileData, InputProps } from '@/types'

function Registration() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email } = useSelector((state: RootState) => state.createProfile)

    // HOOKs
        const {
            data,
            loading,
            error,
        } = usePost<string, CreateProfileData>('profile/create')

    // FORM STEP 1
    const step1Inputs: InputProps[] = [
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
        },
        {
            name: 'phone',
            type: 'tel',
            placeholder: 'Telefone',
            required: true,
        },
    ]
    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault()
         const emailValue = String(step1FormValues[1] || '')

         if (emailValue) {
             dispatch(
                 setProfileData({
                     email: emailValue,
                 })
             )
         }
    }

    const {
        formValues: step1FormValues,
        formValid: step1FormValid,
        handleChange: step1FormHandleChange,
    } = useFormValidation(step1Inputs)

    // FORM STEP 2
    const step2Inputs: InputProps[] = [
        {
            type: 'password',
            placeholder: 'Senha',
        },
    ]

    const handleStep2 = async (e: React.FormEvent) => {
        e.preventDefault()


        const newUserProfile = {
            name: String(step1FormValues[0]),
            email: email,
            phone: String(step1FormValues[2]),
            avatar: '/dnc-avatar.svg',
        }

       
        localStorage.setItem('user_profile_v2', JSON.stringify(newUserProfile))
        localStorage.setItem('token', 'fake-jwt-token-from-register-bypass')

        console.log(
            '[Dev Mode Kleber] Utilizador registado e autenticado localmente:',
            newUserProfile
        )

        dispatch(setProfileData({ email: '' }))

        alert('Cadastro realizado com sucesso!')
        navigate('/home')
    }

    const {
        formValues: step2FormValues,
        formValid: step2FormValid,
        handleChange: step2FormHandleChange,
    } = useFormValidation(step2Inputs)


    useEffect(() => {
        if (data !== null) {
            dispatch(
                setMessage('Usuario criado com sucesso!')

            )
            navigate('/')
        } else if (error) {
            alert(`Erro ao criar usuario (${error})'`)
        }
    }, [data, error, navigate])

    return (
        <>
            <Box>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            height: '100vh',
                        }}
                    >
                        <Container maxWidth="sm">
                            <Box sx={{ marginBottom: pxToRem(24) }}>
                                <Logo height={41} width={100} />
                            </Box>
                            <Box sx={{ marginBottom: pxToRem(24) }}>
                                <StyledH1>
                                    {email
                                        ? 'Defina sua senha'
                                        : 'Faça seu cadastro'}
                                </StyledH1>
                                <StyledP>
                                    {email
                                        ? 'Sua senha deve ter:'
                                        : '  Primeiro, diga-nos quem você é.'}
                                </StyledP>
                                {email && (
                                    <StyledUl>
                                        <li>Entre 8 e 16 caracteres;</li>
                                        <li>Pelo menos uma letra maiúscula;</li>
                                        <li>
                                            Pelo menos um caractere especial.
                                        </li>
                                        <li>Pelo menos um número</li>
                                    </StyledUl>
                                )}
                            </Box>
                            <FormComponent
                                inputs={(email ? step2Inputs : step1Inputs).map(
                                    (input, index) => ({
                                        ...input,
                                        value: email
                                            ? step2FormValues[index] || ''
                                            : step1FormValues[index] || '',
                                        onChange: (
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            email
                                                ? step2FormHandleChange(
                                                      index,
                                                      e.target.value
                                                  )
                                                : step1FormHandleChange(
                                                      index,
                                                      e.target.value
                                                  ),
                                    })
                                )}
                                buttons={[
                                    {
                                        className: 'primary',
                                        disabled: email
                                            ? !step2FormValid || loading
                                            : !step1FormValid,
                                        onClick: email
                                            ? handleStep2
                                            : handleStep1,
                                        type: 'submit',
                                        children: email ? 'Enviar' : 'Proximo',
                                    },
                                ]}
                            />
                        </Container>
                    </Grid>
                    <Grid
                        item
                        sm={6}
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        <BannerImage />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Registration
