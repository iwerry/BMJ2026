# SEO & Discoverability Checklist

**Objetivo:** preparar o site `bmj2026.vercel.app` para ser indexado pelo Google, buscadores de IA (por exemplo `notebooklm`) e garantir boa visibilidade sem depender de créditos externos.

---

## 1. Meta Tags Básicas (para cada página)
- **Título (`<title>`)** : inclua o nome do evento e a página específica, ex.:
  ```html
  <title>Concurso Cosplay – Brasil Mostra Japão 2026</title>
  ```
- **Descrição (`<meta name="description">`)** : resumo de até 160 caracteres que contenha palavras‑chave como *Cosplay, Concurso, BMJ 2026, Brasília*.
- **Viewport** – já presente, verifique.
- **Charset UTF‑8** – já presente.
- **Open Graph** (para compartilhamento social):
  ```html
  <meta property="og:title" content="Concurso Cosplay – BMJ 2026" />
  <meta property="og:description" content="Participe do concurso de Cosplay do Brasil Mostra Japão 2026. Inscrições abertas em breve!" />
  <meta property="og:image" content="https://bmj2026.vercel.app/assets/og-cosplay.jpg" />
  <meta property="og:url" content="https://bmj2026.vercel.app/cosplay" />
  <meta property="og:type" content="website" />
  ```
- **Twitter Cards** (similar ao Open Graph).
- **`<meta name="robots" content="index, follow"/>`** – garante que os crawlers possam indexar a página.

---

## 2. Structured Data (JSON‑LD) – Schema.org
Adicione um bloco `<script type="application/ld+json">` em cada página importante.
### Exemplo – Evento Cosplay
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Concurso Cosplay – Brasil Mostra Japão 2026",
  "description": "Final de Cosplay com votação aberta ao público. Modalidades: Kids, Start, Up, Ghibli.",
  "startDate": "2026-06-26",
  "endDate": "2026-06-27",
  "image": "https://bmj2026.vercel.app/assets/cosplay-banner.jpg",
  "location": {
    "@type": "Place",
    "name": "Museu Nacional da República",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Setor Cultural Sul, Lote 2",
      "addressLocality": "Brasília",
      "addressRegion": "DF",
      "postalCode": "70000-000",
      "addressCountry": "BR"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": "https://bmj2026.vercel.app/inscricao-cosplay",
    "price": "0",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/PreOrder"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Brasil Mostra Japão 2026",
    "url": "https://bmj2026.vercel.app"
  }
}
```
Insira esse script dentro do componente que renderiza a página (ex.: `Cosplay.tsx`).

---

## 3. Sitemap XML
1. Crie o arquivo `public/sitemap.xml` contendo URLs de todas as páginas:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url><loc>https://bmj2026.vercel.app/</loc></url>
     <url><loc>https://bmj2026.vercel.app/cosplay</loc></url>
     <url><loc>https://bmj2026.vercel.app/agenda</loc></url>
     <!-- adicione as demais páginas -->
   </urlset>
   ```
2. Caso o projeto use Next.js, considere o pacote `next-sitemap` (não necessário se for um site estático).

---

## 4. Robots.txt
Crie `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://bmj2026.vercel.app/sitemap.xml
```
Isso garante que os crawlers encontrem o sitemap.

---

## 5. Verificação no Google Search Console (GSC)
1. Acesse <https://search.google.com/search-console> com a conta do projeto.
2. **Adicionar propriedade** → escolha *"URL prefix"* e cole `https://bmj2026.vercel.app`.
3. **Método de verificação** – escolha *HTML meta tag*.
   - Copie a tag `<meta name="google-site-verification" content="..." />` gerada.
   - Coloque a tag dentro do `<head>` do `src/components/Header.tsx` (ou de um componente global que seja carregado em todas as páginas).
4. Após publicar o site, volte ao GSC e clique em *"VERIFICAR"*.
5. No GSC, envie o sitemap (`https://bmj2026.vercel.app/sitemap.xml`).

---

## 6. Indexação por IA / NotebookLM
- **Publicação de dados estruturados** (JSON‑LD já coberto) facilita que LLMs encontrem informações.
- **Arquivo `README.md`** no repositório já contém detalhes; mantenha‑o atualizado e inclua palavras‑chave relevantes.
- **Open Graph/Twitter Cards** ajudam LLMs que leem metadados sociais.
- **Schema.org `WebSite`** pode ser adicionado ao `index.html`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://bmj2026.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bmj2026.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  ```

---

## 7. Checklist Pós‑Deploy
- ✅ Meta tags presentes em todas as páginas.
- ✅ Structured data (JSON‑LD) para cada evento/atividade.
- ✅ `sitemap.xml` e `robots.txt` na pasta `public/`.
- ✅ Verificação concluída no Google Search Console.
- ✅ Submissão do sitemap no GSC.
- ✅ Teste de **Rich Results** via ferramenta *Rich Results Test* (https://search.google.com/test/rich-results).
- ✅ Verificar **Core Web Vitals** (PageSpeed Insights) – manter LCP < 2.5 s, FID < 100 ms, CLS < 0.1.
- ✅ Compartilhar o link nas redes sociais para acelerar a descoberta.

---

## 8. Próximos Passos (para quem for executar)
1. Crie/edite os arquivos `public/robots.txt` e `public/sitemap.xml` conforme os exemplos acima.
2. Insira as meta tags e o script JSON‑LD nos componentes relevantes (ex.: `Cosplay.tsx`).
3. Adicione a meta tag de verificação do GSC ao `Header.tsx`.
4. Commit e push das alterações.
5. Deploy automático no Vercel (verifique que o preview está funcionando).
6. No Google Search Console, confirme a propriedade e envie o sitemap.
7. Rode *Rich Results Test* e *PageSpeed Insights* para validar.

**Observação:** Todos esses passos são gratuitos – não requerem crédito de API nem serviços pagos.

---

*Este documento pode ser salvo como **SEO_INSTRUCTIONS.md** na raiz do projeto e seguido sequencialmente.*
