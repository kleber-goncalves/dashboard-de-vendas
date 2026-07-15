/* eslint-disable @typescript-eslint/no-explicit-any */
// COMPONENTS
import {
    AvatarsList,
    CardComponent,
    CustomChart,
    StyledH2,
    StyledH3,
    CustomTable,
    Header,
    StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'

// HOOKS
import { useGet } from '@/hooks'

// UTILS
import { currencyConverter } from '@/utils'

// TYPES
import type {
    CustomChartProps,
    HighlightsData,
    StarsData,
    NewData,
} from '@/types'

// DATAs MOCKs
import {
    highlightsMock,
    salesMonthMock,
    salesYearMock,
    tableDataMock,
    listDataMock,
} from '@/data'

function Home() {
    // 1. CHAMADAS DOS HOOKS (API)
    // // Highlights de vendas do mês e leads contactados do mês
    const {
        data: highlightsData,
        loading: highlightsLoading,
        error: highlightsError,
    } = useGet<HighlightsData[]>('sales/highlights')

    // // Grafico de vendas do mês
    const {
        data: salesMonthData,
        loading: salesMonthLoading,
        error: salesMonthError,
    } = useGet<CustomChartProps>('sales/month')

    // // Lista de leads
    const {
        data: salesStarsData,
        loading: salesStarsLoading,
        error: salesStarsError,
    } = useGet<StarsData[]>('sales/stars')

    // // Tabela de novidades
    const {
        data: newsData,
        loading: newsLoading,
        error: newsError,
    } = useGet<NewData[]>('news')

    // // Grafico de vendas do ano
    const {
        data: salesYearData,
        loading: salesYearLoading,
        error: salesYearError,
    } = useGet<CustomChartProps>('sales/year')

    // 2.LOGICA DE VALIDAÇÃO (Auditoria dos dados da API)
    // // Highlights de vendas do mês e leads contactados do mês
    const hasValidApiData =
        !highlightsLoading &&
        Array.isArray(highlightsData) &&
        highlightsData.length >= 3 &&
        !Number.isNaN(Number(highlightsData[0]?.value)) &&
        !Number.isNaN(Number(highlightsData[1]?.value))

    // // Grafico de vendas do mês
    const hasValidChartData =
        !salesMonthLoading &&
        salesMonthData &&
        Array.isArray(salesMonthData.labels) &&
        Array.isArray(salesMonthData.data)

    // // Lista de leads
    const hasValidListData =
        !salesStarsLoading &&
        Array.isArray(salesStarsData) &&
        salesStarsData.length > 0 &&
        salesStarsData[0].value !== undefined

    // // Tabela de novidades
    const hasValidTableData =
        !newsLoading &&
        Array.isArray(newsData) &&
        newsData.length > 0 &&
        newsData[0].date !== undefined

    // // Grafico de vendas do ano
    const hasValidYearChartData =
        !salesYearLoading &&
        salesYearData &&
        Array.isArray(salesYearData.labels) &&
        Array.isArray(salesYearData.data)

    // 3. SELEÇÃO DE DADOS (Escolha entre API ou MOCK importado)
    // // Highlights de vendas do mês e leads contactados do mês
    const dataToRender =
        (highlightsError || !hasValidApiData) && !highlightsLoading
            ? highlightsMock
            : highlightsData

    // // Grafico de vendas do mês
    const chartDataToRender =
        (salesMonthError || !hasValidChartData) && !salesMonthLoading
            ? salesMonthMock
            : salesMonthData

    // // Lista de leads
    const listDataToRender =
        (salesStarsError || !hasValidListData) && !salesStarsLoading
            ? listDataMock
            : salesStarsData

    // // Tabela de novidades
    const tableDataToRender =
        (newsError || !hasValidTableData) && !newsLoading
            ? tableDataMock
            : newsData

    // // Grafico de vendas do ano
    const salesYearDataToRender =
        (salesYearError || !hasValidYearChartData) && !salesYearLoading
            ? salesYearMock
            : salesYearData

    return (
        <>
            <Header />
            <Container className="mb-2" maxWidth="lg">
                <Grid container spacing={4}>
                    <>
                        {/* Cartão 1: Total de vendas do mês */}
                        <Grid item xs={12} md={4}>
                            <CardComponent
                                className={
                                    highlightsLoading
                                        ? 'skeleton-loading skeleton-loading-mh-1'
                                        : ''
                                }
                            >
                                {highlightsLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    dataToRender?.[0] && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Total de vendas do mês
                                            </StyledH2>
                                            <StyledH3
                                                size={40}
                                                lineheight={40}
                                                className="mb-1"
                                            >
                                                {/* Garantimos a conversão forçada para Number para evitar falhas estruturais */}
                                                {currencyConverter(
                                                    Number(
                                                        dataToRender[0].value
                                                    ) || 0
                                                )}
                                            </StyledH3>
                                            <StyledSpan className="mb-1">
                                                {dataToRender[0].subtitle}
                                            </StyledSpan>
                                        </>
                                    )
                                )}
                            </CardComponent>
                        </Grid>

                        {/* Cartão 2: Meta do mês */}
                        <Grid item xs={12} md={4}>
                            <CardComponent
                                className={
                                    highlightsLoading
                                        ? 'skeleton-loading skeleton-loading-mh-1'
                                        : ''
                                }
                            >
                                {highlightsLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    dataToRender?.[1] && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Meta do mês
                                            </StyledH2>
                                            <StyledH3
                                                size={40}
                                                lineheight={40}
                                                className="mb-1"
                                            >
                                                {currencyConverter(
                                                    Number(
                                                        dataToRender[1].value
                                                    ) || 0
                                                )}
                                            </StyledH3>
                                            <StyledSpan className="mb-1">
                                                {dataToRender[1].subtitle}
                                            </StyledSpan>
                                        </>
                                    )
                                )}
                            </CardComponent>
                        </Grid>

                        {/* Cartão 3: Leads contactados */}
                        <Grid item xs={12} md={4}>
                            <CardComponent
                                className={
                                    highlightsLoading
                                        ? 'skeleton-loading skeleton-loading-mh-1'
                                        : ''
                                }
                            >
                                {highlightsLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    dataToRender?.[2] && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Leads contactados
                                            </StyledH2>
                                            <StyledH3
                                                size={40}
                                                lineheight={40}
                                                className="mb-1"
                                            >
                                                {/* Mantido apenas o valor numérico puro ou fallback 0 */}
                                                {Number(
                                                    dataToRender[2].value
                                                ) || 0}
                                            </StyledH3>
                                            <StyledSpan className="mb-1">
                                                {dataToRender[2].subtitle}
                                            </StyledSpan>
                                        </>
                                    )
                                )}
                            </CardComponent>
                        </Grid>
                    </>

                    {/* Cartão 4: Garafico / Valor de vendas do mês */}
                    <Grid item xs={12} md={7}>
                        {!salesMonthError && (
                            <CardComponent
                                className={
                                    salesMonthLoading
                                        ? 'skeleton-loading skeleton-loading-mh-2'
                                        : ''
                                }
                            >
                                {salesMonthLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    chartDataToRender && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Valor de vendas do mês
                                            </StyledH2>
                                            <CustomChart
                                                labels={chartDataToRender.labels.map(
                                                    (label) => label
                                                )}
                                                data={chartDataToRender.data.map(
                                                    (data) => data
                                                )}
                                                type={chartDataToRender.type}
                                            />
                                        </>
                                    )
                                )}
                            </CardComponent>
                        )}
                    </Grid>

                    {/* Cartão 5: Maiores vendedores do mês */}
                    <Grid item xs={12} md={5}>
                        {!salesStarsError && (
                            <CardComponent
                                className={
                                    salesStarsLoading
                                        ? 'skeleton-loading skeleton-loading-mh-2'
                                        : ''
                                }
                            >
                                {salesStarsLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    listDataToRender && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Maiores vendedores do mês
                                            </StyledH2>
                                            <AvatarsList
                                                listData={listDataToRender.map(
                                                    (star) => ({
                                                        name: star.name,
                                                        avatar: '/dnc-avatar.svg',
                                                        subtitle:
                                                            currencyConverter(
                                                                Number(
                                                                    star.value ||
                                                                        0
                                                                )
                                                            ),
                                                    })
                                                )}
                                            />
                                        </>
                                    )
                                )}
                            </CardComponent>
                        )}
                    </Grid>

                    {/* Cartão 6: Notícias relevantes */}
                    <Grid item xs={12} md={5}>
                        {!newsError && (
                            <CardComponent
                                className={
                                    newsLoading
                                        ? 'skeleton-loading skeleton-loading-mh-2'
                                        : ''
                                }
                            >
                                {newsLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    tableDataToRender && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Noticias relevantes
                                            </StyledH2>
                                            <CustomTable
                                                headers={['Título', 'Horario']}
                                                rows={tableDataToRender.map(
                                                    (news) => [
                                                        <a
                                                            key={`${news.title}-link`}
                                                            className="ellipsis ellipsis-sm  professional-tooltip"
                                                            href={news.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"

                                                        >
                                                            {news.title}
                                                        </a>,
                                                        <a
                                                            key={`${news.title}-date`}
                                                            href={news.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {news.date}
                                                        </a>,
                                                    ]
                                                )}
                                            />
                                        </>
                                    )
                                )}
                            </CardComponent>
                        )}
                    </Grid>

                    {/* Cartão 7: Valor de vendas por mês */}
                    <Grid item xs={12} md={7}>
                        {!salesYearError && (
                            <CardComponent
                                className={
                                    salesYearLoading
                                        ? 'skeleton-loading skeleton-loading-mh-2'
                                        : ''
                                }
                            >
                                {salesYearLoading ? (
                                    <div className="skeleton-placeholder" />
                                ) : (
                                    salesYearDataToRender && (
                                        <>
                                            <StyledH2 className="mb-1">
                                                Valor de vendas por mês
                                            </StyledH2>
                                            <CustomChart
                                                labels={salesYearDataToRender.labels.map(
                                                    (label) => label
                                                )}
                                                data={salesYearDataToRender.data.map(
                                                    (data) => data
                                                )}
                                                type={
                                                    salesYearDataToRender.type
                                                }
                                            />
                                        </>
                                    )
                                )}
                            </CardComponent>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home
