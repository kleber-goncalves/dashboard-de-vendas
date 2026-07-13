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

function Home() {
    const {
        data: highlightsData,
        loading: highlightsLoading,
        error: highlightsError,
    } = useGet<HighlightsData[]>('sales/highlights')

    const {
        data: salesMonthData,
        loading: salesMonthLoading,
        error: salesMonthError,
    } = useGet<CustomChartProps>('sales/month')

    const {
        data: salesStarsData,
        loading: salesStarsLoading,
        error: salesStarsError,
    } = useGet<StarsData[]>('sales/stars')

    const {
        data: newsData,
        loading: newsLoading,
        error: newsError,
    } = useGet<NewData[]>('news')

    const {
        data: salesYearData,
        loading: salesYearLoading,
        error: salesYearError,
    } = useGet<CustomChartProps>('sales/year')

    // Highlights de vendas do mês e leads contactados do mês
    const highlightsMock = [
        { value: 15000, subtitle: 'Refletindo dados simulados' }, // Total de vendas
        { value: 20000, subtitle: 'Meta padrão do mês' }, // Meta do mês
        { value: 85, subtitle: 'Total acumulado' }, // Leads contactados
    ]

    const hasValidApiData =
        !highlightsLoading &&
        Array.isArray(highlightsData) &&
        highlightsData.length >= 3 &&
        !Number.isNaN(Number(highlightsData[0]?.value)) &&
        !Number.isNaN(Number(highlightsData[1]?.value))

    const dataToRender =
        (highlightsError || !hasValidApiData) && !highlightsLoading
            ? highlightsMock
            : highlightsData

    // Grafico de vendas do mês
    const salesMonthMock = {
        labels: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
        ],
        data: [
            3500,
            2400,
            2450,
            5500,
            7800,
            8700,
            7600,
            2600,
            1700,
            5400, // Dias 01 a 10 (Subida e queda inicial)
            450,
            6900,
            2900,
            9600,
            1200,
            3200,
            3250,
            9000,
            7300,
            3300, // Dias 11 a 20 (A grande queda no 11 e o topo no 14)
            2600,
            7100,
            7800,
            4200,
            6700,
            4200,
            6100,
            4100,
        ],
        type: 'line' as const,
    }

    const hasValidChartData =
        !salesMonthLoading &&
        salesMonthData &&
        Array.isArray(salesMonthData.labels) &&
        Array.isArray(salesMonthData.data)

    const chartDataToRender =
        (salesMonthError || !hasValidChartData) && !salesMonthLoading
            ? salesMonthMock
            : salesMonthData

    const mockListData = [
        { name: 'Aline Silva (Simulado)', value: 8434.54 },
        { name: 'Bruno Costa (Simulado)', value: 6334.14 },
        { name: 'Camila Ribeiro (Simulado)', value: 4264.74 },
    ]

    const hasValidListData =
        !salesStarsLoading &&
        Array.isArray(salesStarsData) &&
        salesStarsData.length > 0 &&
        salesStarsData[0].value !== undefined

    const listDataToRender =
        (salesStarsError || !hasValidListData) && !salesStarsLoading
            ? mockListData
            : salesStarsData

    const mockTableData: NewData[] = [
        {
            title: 'As versões mais recentes do Node.js trouxeram grandes evoluções de desempenho e usabilidade. Destacam-se o suporte nativo à execução de arquivos TypeScript, a inclusão experimental do SQLite nativo, a ativação da Temporal API para facilitar o trabalho com datas, e atualizações do motor V8, que dobraram a velocidade do JSON.stringify',
            link: 'https://blog.logrocket.com/node-js-24-new/',
            date: '14:32',
        },
        {
            title: 'As maiores novidades do ecossistema envolvem o consolidado React 19 e o React Compiler. O ecossistema também traz melhorias no React Native e a evolução contínua das ferramentas de Server Components.',
            link: 'https://www.youtube.com/watch?v=wMFcpgP7yWw&t=24s',
            date: '11:15',
        },
        {
            title: 'O ecossistema Next.js está evoluindo com foco brutal em performance, IA e produtividade. As novidades recentes incluem a adoção estável do Turbopack (que torna os builds de desenvolvimento e produção muito mais rápidos) e a estabilização do React Compiler, que aplica memoização automática, eliminando a necessidade de usar useMemo ou useCallback manualmente',
            link: 'https://nextjs.org/blog',
            date: 'Ontem',
        },
        {
            title: 'O Tailwind CSS introduziu na versão 4.0 uma arquitetura reescrita em Rust (até 5x mais rápida), abandono do arquivo tailwind.config.js em prol de configuração nativa via CSS, e componentes interativos nativos (popovers, diálogos sem JS), com suporte à paleta de cores OKLCH P3.',
            link: 'https://tailwindcss.com/blog/tailwindcss-v4',
            date: 'Ontem',
        },
    ]

const hasValidTableData =
    !newsLoading &&
    Array.isArray(newsData) &&
    newsData.length > 0 &&
    newsData[0].date !== undefined

const tableDataToRender =
    (newsError || !hasValidTableData) && !newsLoading ? mockTableData : newsData


    const salesYearMock: CustomChartProps = {
        labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
        ],
        data: [
            120500.0, 135800.5, 98400.2, 145200.8, 160100.0, 115900.3, 138400.6,
            152300.4, 141900.0, 168400.95, 185000.1, 220400.5,
        ],
        type: 'bar',
    }

    const hasValidYearChartData =
        !salesYearLoading &&
        salesYearData &&
        Array.isArray(salesYearData.labels) &&
        Array.isArray(salesYearData.data)

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
                                                            className="ellipsis ellipsis-sm"
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
