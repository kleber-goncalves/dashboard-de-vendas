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

// DATAs
import { leadsDataMock } from '@/data'

// HOOKS
import {
    useFormValidation,
    useGet,
    usePost,
    useDelete,
    useMockStorage,
} from '@/hooks'

//TYPES
import type { AxiosRequestConfig } from 'axios'
import type {
    InputProps,
    LeadsData,
    LeadsPostData,
    MessageProps,
} from '@/types'

function Leads() {
    const [mockLeads, setMockLeads] = useMockStorage(
        'leads_data',
        leadsDataMock
    )

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

        const newLeadName = String(formValues[0])
        const newLeadEmail = String(formValues[1])
        const newLeadPhone = String(formValues[2])

        const newLead: LeadsData = {
            id: Date.now(),
            name: newLeadName,
            email: newLeadEmail,
            phone: newLeadPhone,
        }

        try {
            await createLeadsPostData({
                name: newLeadName,
                email: newLeadEmail,
                phone: newLeadPhone,
            })
        } catch (error) {
            console.warn(
                '⚠️ API indisponível. Salvando lead localmente no localStorage.'
            )
        }

        const updatedLeadsList = [newLead, ...mockLeads]
        setMockLeads(updatedLeadsList)

        setCreateMessage({
            type: 'success',
            msg: 'Lead cadastrado com sucesso (Modo Local)',
        })

        clearMessage()
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir seu lead?')) return
        try {
            await leadsDeleteData({ params: { id: id } })
        } catch (error) {
            console.warn(
                '⚠️ API indisponível para exclusão. Removendo lead localmente.'
            )
        }
        const filteredLeads = mockLeads.filter((lead) => lead.id !== id)
        setMockLeads(filteredLeads)
        alert('Lead removida localmente (Modo de Teste)')
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
            getLeads()
        }
    }, [createLeadsData])

    const hasValidLeads =
        !leadsLoading && Array.isArray(leadsData) && leadsData.length > 0

    const leadsToRender: LeadsData[] =
        hasValidLeads && leadsData ? leadsData : mockLeads

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
