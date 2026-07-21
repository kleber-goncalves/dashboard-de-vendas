# Erro do jest apos criar o arquivo de test

quando criamos o aquivo de test do jest, e adicionamos ex:

```js
describe('BannerImage', () => {
    it('should render correctly', () => {
        const {container} = render(<BannerImage />);
        expect(container).toMatchSnapshot();
    });
});
```

aparecera um erro: 
```
Não é possível encontrar o nome 'describe'. Você precisa instalar as definições de tipo para um executor de teste? Tente `npm i --save-dev @types/jest` ou `npm i --save-dev @types/mocha` e depois adicione 'jest' ou 'mocha' ao campo tipos em seu tsconfig.
```
com isso basta instalar esta depedencia :
```bash
npm i --save-dev @types/jest

```

e no arquivo ``tsconfig.app.json``, adicione: `` "types": ["jest"],``