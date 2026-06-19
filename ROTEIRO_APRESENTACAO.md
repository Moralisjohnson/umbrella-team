# Roteiro de Apresentacao - Hand 2 Hand

**Apresentador:** Guilherme Arcanjo
**Equipe do projeto:** Guilherme Arcanjo, Leandro Pavan, Renan Herculano, Lucas de Paula
**Duracao alvo:** 8 a 10 minutos
**Material:** abrir `pitch.html` em tela cheia. Navegar com as setas <- ->.

> Dica: respire, fale devagar e olhe para a plateia nas transicoes. O texto abaixo
> e um guia, nao um script para ler palavra por palavra. Os trechos em _italico_ sao
> deixas de acao (trocar de slide, apontar, pausar).

---

## Slide 1 - Capa

> _Comece com o slide da capa ja aberto._

"Boa tarde a todos. Meu nome e Guilherme Arcanjo e, junto com Leandro Pavan, Renan
Herculano e Lucas de Paula, eu desenvolvi o **Hand 2 Hand**.

A ideia cabe em uma frase: **alugue o que voce precisa e lucre com o que esta parado**.
E uma plataforma de aluguel entre pessoas, com um diferencial que vou mostrar daqui a
pouco: a retirada acontece em **armarios digitais**, sem nenhum encontro presencial."

> _Pausa breve. Avancar._

---

## Slide 2 - O problema

"Antes da solucao, o problema. Todos nos compramos coisas que usamos pouquissimas vezes.

Uma furadeira que liga duas vezes por ano. Uma barraca de camping que vai a praia uma vez.
Um projetor para uma unica festa. Esses itens ficam **parados em casa**, ocupando espaco,
depois de a gente ter gastado caro neles.

E qual e o mercado atual para resolver isso? Hoje a gente recorre a **OLX** ou ao
**Facebook Marketplace**. Mas repare: esses canais sao de **compra e venda**, presenciais,
sem garantia e sem nenhum rastro. Inclusive isso mostra que a demanda existe &mdash;
**milhoes de pessoas ja negociam usados nessas plataformas**. So que, para quem so quer
**alugar** por alguns dias, com seguranca, simplesmente nao existe uma solucao boa.

Ou seja: tem item parado de um lado, tem gente precisando do outro &mdash; **falta uma
ponte confiavel** entre os dois."

> _Avancar._

---

## Slide 3 - A solucao

"E essa ponte e o Hand 2 Hand. A forma mais facil de explicar e: pense no **Airbnb das
suas coisas**.

Quem tem um item ocioso anuncia e define o preco por dia. Quem precisa, reserva, paga
pelo app e retira. O fluxo todo e: **anuncie, reserve, retire e devolva**.

E o ponto central esta aqui _(aponta para o cartao da direita)_: **zero encontros
presenciais** para retirar o item, e **cem por cento das retiradas com chave digital e
seguro incluso**. E isso que tira o medo da equacao."

> _Avancar._

---

## Slide 4 - Como funciona

"Na pratica, sao quatro passos.

**Um, encontre:** o usuario busca por categoria e por localizacao, e ve preco, nota e
avaliacoes de cada item.

**Dois, reserve:** escolhe o periodo num calendario e paga por Pix ou cartao.

**Tres, retire:** vai ate o armario e digita no painel a chave que foi gerada na reserva.
A porta do compartimento abre.

**Quatro, devolva:** volta ao mesmo armario dentro do prazo e avalia a experiencia.

E importante dizer que **atraso e dano tem regras claras** &mdash; tem multa por hora de
atraso e taxa de reposicao &mdash; entao o locador fica protegido."

> _Avancar._

---

## Slide 5 - O armario digital

> _Este e o slide visual. Deixe a imagem aparecer e aponte para as partes ao falar._

"Esse e o coracao do projeto: o **armario digital**.

Repare na estrutura _(aponta para a esquerda)_: temos compartimentos de tamanhos
diferentes &mdash; pequeno, medio e grande &mdash; entao cabe desde uma furadeira ate algo
bem maior.

Do lado direito _(aponta para o painel)_ fica o **painel geral**. Na reserva, o sistema
gera uma **chave unica**, como esse `7K4Q` na tela. O usuario digita no teclado &mdash;
que e alfanumerico, com numeros e letras &mdash; e a fechadura libera so aquele
compartimento, so durante o periodo contratado.

Cada porta ainda tem um indicador de status, e o sistema registra exatamente quando o
item foi retirado e devolvido. E isso que sustenta a confianca e as regras de multa."

> _Avancar._

---

## Slide 6 - O produto

"E quero deixar claro: **isto nao e so uma ideia no papel. O MVP esta de pe e funcionando.**

Ja temos: _(passe os olhos pelos cartoes)_ busca e anuncio completo &mdash; com foto,
edicao, pausar e excluir; reserva com calendario, horarios e pagamento, gerando a chave do
locker; sistema de avaliacoes; chat entre as partes; a area 'minha conta' com perfil,
alugueis e anuncios; e tudo isso sobre um acesso seguro, com login e senha protegida."

> _Avancar._

---

## Slide 7 - Tecnologia

"Por baixo, uma arquitetura moderna e enxuta.

No **frontend**, React com Vite e Bootstrap &mdash; uma aplicacao responsiva, com
componentes proprios, como o calendario de reserva que mostrei.

No **backend**, Node com Express e banco PostgreSQL. A API e REST, organizada por modulos:
autenticacao, itens, reservas, chat, conta e avaliacoes. O acesso e protegido por token e
as senhas ficam criptografadas.

Front e back sao **desacoplados**, o que deixa o projeto pronto para evoluir e escalar."

> _Avancar._

---

## Slide 8 - Modelo de negocio

"Como o Hand 2 Hand ganha dinheiro? Em cada aluguel, por tres vias.

Uma **taxa de servico** fixa por reserva &mdash; a taxa do locker. Uma **comissao** sobre o
valor que o locador recebe. E a camada de **seguro e multas**, que ao mesmo tempo protege a
operacao e gera receita.

O modelo e recorrente: **quanto mais alugueis passam pelos armarios, maior a receita.**"

> _Avancar._

---

## Slide 9 - Mercado e oportunidade

"Sobre mercado: o setor de usados e de economia compartilhada ja movimenta **bilhoes de
reais por ano** no Brasil. A gente entra pela camada que ninguem resolveu direito &mdash; o
**aluguel seguro, por bairro**.

A estrategia e comecar por **Curitiba**, com armarios em pontos de grande circulacao, e
crescer de forma replicavel: cada novo armario e um ponto de receita.

E aqui esta a projecao _(aponte para o quadro da direita)_: em **doze meses**, nossa meta
minima e ter **mais de 50 armarios** em rede de parceiros, **3 cidades** atendidas e **mais
de 10 mil alugueis** no primeiro ano. E uma projecao conservadora &mdash; o modelo escala
junto com a quantidade de armarios."

> _Avancar._

---

## Slide 10 - Roadmap

"Para mostrar que isso e concreto, esse e o nosso roadmap.

A **Fase 1, o MVP, ja esta entregue** &mdash; e tudo que mostrei: anuncio, busca, reserva,
chave, chat, avaliacoes e conta, com backend e banco.

No **curto prazo**, entram o pagamento real, por Pix e cartao, e a integracao fisica com a
fechadura dos armarios.

No **medio prazo**, um app mobile e os primeiros armarios em parceiros, aqui no piloto de
Curitiba.

E no **longo prazo**, a expansao para novas cidades e categorias, com uma rede de armarios
parceiros. Ou seja: ja temos base pronta, e um caminho claro para virar operacao real."

> _Avancar._

---

## Slide 11 - O time

"Esse projeto foi construido por quatro pessoas: eu, Guilherme Arcanjo, atuando como
full-stack; Renan Herculano, tambem full-stack; e Leandro Pavan e Lucas de Paula, no
front-end."

> _Avancar para o encerramento._

---

## Slide 12 - Encerramento

"Para fechar: a proposta do Hand 2 Hand e simples &mdash; **menos compras, mais
aproveitamento.**

A gente transforma o que esta parado na sua casa em renda, e o que voce precisa em um
aluguel rapido, seguro e sem encontro presencial.

Muito obrigado. Estou a disposicao para as perguntas."

> _Sorria, agradeca e abra para perguntas._

---

## Perguntas provaveis (prepare-se)

- **"E se o item nao for devolvido ou voltar danificado?"**
  Ha seguro incluso, multa automatica por hora de atraso e taxa de reposicao baseada no
  valor de mercado. O armario registra retirada e devolucao, entao ha rastro de tudo.

- **"De quem sao os armarios?"**
  No piloto, ficam em parceiros de grande circulacao (conveniencias, condominios,
  mercados). O modelo de receita cobre a operacao desses pontos.

- **"Como garantem que so a pessoa certa abre o compartimento?"**
  A chave e unica por reserva e so e valida naquele periodo. Fora da janela contratada,
  ela nao abre.

- **"Qual a diferenca para um marketplace comum (OLX, etc.)?"**
  La a entrega e por sua conta e risco, presencial. Aqui o armario digital elimina o
  encontro, padroniza a retirada e dá garantia para os dois lados.

- **"O que ja esta pronto x o que e visao futura?"**
  Pronto: web app completo (anuncio, busca, reserva, pagamento mock, chave, chat,
  avaliacoes, conta) com backend e banco. Futuro: integracao fisica com a fechadura dos
  armarios e pagamento real.
