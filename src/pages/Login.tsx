/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { type ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'


// Components
import { Box, Button, Container, Grid } from '@mui/material'
import Alert from '@mui/material/Alert'

import {
    BannerImage,
    FormComponent,
    Logo,
    StyledH1,
    StyledP,
} from '@/components'

// Hooks
import { useFormValidation, usePost } from '@/hooks'

// Utils
import { jwtExpirationDateConverter, pxToRem } from '@/utils'

// Types
import type { DecodeJwt, MessageProps, LoginData, LoginPostData } from '@/types'

// DATAs
import { defaultUser } from '@/data'

// REDUX
import { useSelector } from 'react-redux'
import { type RootState } from '@/redux'


function Login() {
    const navigate = useNavigate()
    const { message } = useSelector(
        (state: RootState) => state.createProfile
    )

    const inputs = [
        { type: 'email', placeholder: 'Email' },
        { type: 'password', placeholder: 'Senha' },
    ]
    const { data, postData, loading, error } = usePost<
        LoginData,
        LoginPostData
    >('login')
    const { formValues, handleChange, formValid } = useFormValidation(inputs)

    const handleMessage = (): MessageProps => {
        if (!error) return { msg: message ?? '', type: 'success' }

        switch (error) {
            case '401':
                return { msg: 'Email e/ou senha inválidos', type: 'error' }
            case 'LOCAL_AUTH_ERROR':
                return {
                    msg: 'Senha incorreta para este utilizador local!',
                    type: 'error',
                }
            default:
                return {
                    msg: 'API não disponivel, clique no botão HOME para acessar sem login',
                    type: 'error',
                }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const inputEmail = String(formValues[0]).trim().toLowerCase()
        const inputPassword = String(formValues[1])

        const storedUserRaw = localStorage.getItem('user_profile_v2')

        const userToValidate = storedUserRaw
            ? JSON.parse(storedUserRaw)
            : defaultUser

       
        if (inputEmail === userToValidate.email.toLowerCase()) {
            if (!storedUserRaw) {
                localStorage.setItem(
                    'user_profile_v2',
                    JSON.stringify(defaultUser)
                )
            }

            const fakeToken = 'fake-jwt-token-from-login-bypass'
            localStorage.setItem('token', fakeToken)

            Cookies.set('Authorization', fakeToken, {
                expires: 1,
                secure: true,
            })

            alert(`Bem-vindo de volta, ${userToValidate.name}!`)
            navigate('/home')
            return
        }

        try {
            await postData({
                email: inputEmail,
                password: inputPassword,
            })
        } catch (apiError) {
            console.warn(
                '⚠️ API indisponível. Login efetuado automaticamente com a conta padrão corporativa.'
            )

            localStorage.setItem('user_profile_v2', JSON.stringify(defaultUser))
            localStorage.setItem('token', 'fake-jwt-token-from-login-bypass')
            Cookies.set('Authorization', 'fake-jwt-token-from-login-bypass', {
                expires: 1,
                secure: true,
            })

            navigate('/home')
        }
    }

    useEffect(() => {
        if (data?.jwt_token) {
            try {
                const decode: DecodeJwt = jwtDecode(data.jwt_token)
                Cookies.set('Authorization', data.jwt_token, {
                    expires: jwtExpirationDateConverter(decode.exp),
                    secure: true,
                })
                localStorage.setItem('token', data.jwt_token)
            } catch (err) {
                console.error('Erro ao decodificar token real:', err)
            }
        }

        if (Cookies.get('Authorization')) {
            navigate('/home')
        }
    }, [data, navigate])

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
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Alert
                            style={{
                                width: '40%',
                                height: 'fit-content',
                                top: '5%',
                                position: 'absolute',
                            }}

                            severity="warning"
                        >
                            API não disponível no momento, estamos usando dados
                            simulados. Clique no botão HOME para acessar sem
                            login
                        </Alert>
                        <Container maxWidth="sm">
                            <Box
                                sx={{
                                    marginBottom: pxToRem(24),
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Logo height={41} width={100} />
                                <Button href="/home" variant="contained">
                                    Home
                                </Button>
                            </Box>

                            <Box sx={{ marginBottom: pxToRem(24) }}>
                                <StyledH1>Bem-vindo</StyledH1>
                                <StyledP>
                                    Digite sua senha e email para logar
                                </StyledP>
                            </Box>
                            <FormComponent
                                inputs={inputs.map((input, index) => ({
                                    type: input.type,
                                    placeholder: input.placeholder,
                                    value: formValues[index] || '',
                                    onChange: (
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChange(
                                            index,
                                            (e.target as HTMLInputElement).value
                                        ),
                                }))}
                                buttons={[
                                    {
                                        className: 'primary',
                                        disabled: !formValid || loading,
                                        type: 'submit',
                                        onClick: handleSubmit,
                                        children: loading
                                            ? 'Carregando...'
                                            : 'Login',
                                    },
                                ]}
                                message={handleMessage()}
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

export default Login
