import type { NewData } from "@/types";

export const tableDataMock: NewData[] = [
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