import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Logo, StyledH2 } from '@/components'
import { Avatar, Box, Container } from '@mui/material'
import { pxToRem } from '@/utils'
import { defaultUser } from '@/data'
import { useEffect, useState } from 'react'

const StyledHeader = styled.header`
    background-color: ${(props) => props.theme.appBackground};
    border-bottom: ${pxToRem(1)} solid
        ${(props) => props.theme.appDefaultStroke};
    margin-bottom: ${pxToRem(37)};
    width: 100%;
`

function Header() {
        const [userData, setUserData] = useState(() => {
            const stored = localStorage.getItem('user_profile_v2')
            return stored ? JSON.parse(stored) : defaultUser
        })

        useEffect(() => {
            const handleProfileChange = () => {
                const stored = localStorage.getItem('user_profile_v2')
                if (stored) {
                    setUserData(JSON.parse(stored))
                }
            }

            window.addEventListener('profileUpdated', handleProfileChange)

            window.addEventListener('storage', handleProfileChange)

            return () => {
                window.removeEventListener(
                    'profileUpdated',
                    handleProfileChange
                )
                window.removeEventListener('storage', handleProfileChange)
            }
        }, [])

    return (
        <StyledHeader>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: pxToRem(64),
                    }}
                >
                    <Link to="/home">
                        <Logo height={30} width={73} />
                    </Link>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            gap: pxToRem(9),
                        }}
                    >
                        <Link to="/perfil">
                            <Avatar
                                alt="DNC Avatar"
                                src="/dnc-avatar.svg"
                                sx={{ width: pxToRem(40), height: pxToRem(40) }}
                            />
                        </Link>
                        <StyledH2>Olá, {userData.name}</StyledH2>
                    </Box>
                </Box>
            </Container>
        </StyledHeader>
    )
}

export default Header
