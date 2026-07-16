/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type ChangeEvent } from 'react'
// COMPONENTS
import {
    CardComponent,
    FormComponent,
    CustomTable,
    Header,
    StyledH2,
    StyledButton,
    StyledP,
    StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'

// HOOKS
import { useFormValidation, useGet, usePost, useDelete } from '@/hooks'

//TYPES
import type { AxiosRequestConfig } from 'axios'
import type {
    InputProps,
    LeadsData,
    LeadsPostData,
    MessageProps,
} from '@/types'

function Leads() {
    // HOOKs
    const {
        data: createLeadsData,
        loading: createLeadsLoading,
        error: createLeadsError,
        postData: createLeadsPostData,
    } = usePost<LeadsData, LeadsPostData>('leads/create', true)

    const {
        data: leadsData,
        loading: leadsLoading,
        error: leadsError,
        getData: getLeads,
    } = useGet<LeadsData[]>('leads')

    const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
        useDelete<AxiosRequestConfig>('leads/delete')

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
            required: true,
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
        await createLeadsPostData({
            name: String(formValues[0]),
            email: String(formValues[1]),
            phone: String(formValues[2]),
        })
    }

    const handleDelete = async (id: number) => {
        confirm('Tem certeza que deseja excluir seu lead?')
        try {
            await leadsDeleteData({ params: { id: id } })
            alert('Lead excluida com sucesso')
            getLeads()
        } catch (error) {
            alert('Erro ao excluir seu lead')
        }
    }

    const [createMessage, setCreateMessage] = useState<MessageProps>({
        type: 'success',
        msg: '',
    })

    const clearMessage = () => {
        setTimeout(() => {
            setCreateMessage({
                type: 'success',
                msg: '',
            })
        }, 3000)
    }

    useEffect(() => {
        if (createLeadsData?.id) {
            setCreateMessage({
                type: 'success',
                msg: 'Lead atualizado com sucesso',
            })
            getLeads()
            clearMessage()
        } else if (createLeadsError) {
            setCreateMessage({
                type: 'error',
                msg: 'API indisponivel tente novamente mais tarde',
            })
            clearMessage()
        } else {
            clearMessage()
        }
    }, [createLeadsError, createLeadsData])

    const hasValidLeads =
        !leadsLoading && Array.isArray(leadsData) && leadsData.length > 0

    const leadsToRender = hasValidLeads ? leadsData : []

    return (
        <>
            <Header />
            <Container className="mb-2" maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={7}>
                        <CardComponent
                            className={
                                leadsLoading
                                    ? 'skeleton-loading skeleton-loading-mh-2'
                                    : ''
                            }
                        >
                            {leadsLoading ? (
                                <div className="skeleton-loading skeleton-loading-mh-2" />
                            ) : (
                                <>
                                    <StyledH2 className="mb-1" id="leads-title">
                                        Meus Leads
                                    </StyledH2>
                                    {leadsToRender.length > 0 ? (
                                        <CustomTable
                                            headers={[
                                                'Nome',
                                                'Email',
                                                'Telefone',
                                                '',
                                            ]}
                                            rows={leadsToRender.map((lead) => [
                                                <StyledP
                                                    key={`${lead.id}-name`}
                                                    className="ellipsis ellipsis-xs"
                                                >
                                                    {lead.name}
                                                </StyledP>,
                                                <StyledP
                                                    key={`${lead.id}-email`}
                                                >
                                                    {lead.email}
                                                </StyledP>,
                                                <StyledP
                                                    key={`${lead.id}-phone`}
                                                >
                                                    {lead.phone}
                                                </StyledP>,
                                                <StyledButton
                                                    key={`${lead.id}-btn`}
                                                    className="borderless-alert"
                                                    onClick={() =>
                                                        handleDelete(lead.id)
                                                    }
                                                    disabled={
                                                        leadsDeleteLoading
                                                    }
                                                >
                                                    Excluir
                                                </StyledButton>,
                                            ])}
                                        />
                                    ) : (
                                        <StyledSpan>
                                            Sem leads cadastrados
                                        </StyledSpan>
                                    )}
                                </>
                            )}
                        </CardComponent>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <CardComponent>
                            <StyledH2 className="mb-1">
                                Cadastrar leads
                            </StyledH2>
                            <FormComponent
                                inputs={inputs.map((input, index) => ({
                                    ...input,
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
                                        disabled:
                                            !formValid ||
                                            createLeadsLoading ||
                                            leadsDeleteLoading,
                                        type: 'submit',
                                        onClick: handleSubmit,
                                        children: 'Cadastrar lead',
                                    },
                                ]}
                                message={createMessage}
                            />
                        </CardComponent>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Leads
