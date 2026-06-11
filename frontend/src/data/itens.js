// Fonte unica de dados dos itens (mock ate haver um backend).
// Home, Busca e Detalhes leem daqui para nao duplicar informacao.
export const ITENS = [
  {
    id: 1,
    nome: "Furadeira Profissional Bosch 750W",
    categoria: "Ferramentas",
    preco: 25,
    nota: 4.8,
    avaliacoes: 24,
    dono: "Carlos M.",
    local: "Conveniencia Express - Batel",
    endereco: "Rua Bispo Dom Jose, 1420 - Curitiba/PR",
    locker: "B-04",
    descricao:
      "Furadeira de impacto ideal para concreto, madeira e aco. Acompanha maleta de transporte, jogo com 5 brocas multimateriais e chave de mandril. Equipamento revisado e higienizado antes de cada armazenamento.",
    avaliacoesLista: [
      { autor: "Marcos A.", nota: 5, comentario: "Furadeira muito potente e bem conservada. Retirada no locker foi super pratica." },
      { autor: "Renata L.", nota: 4, comentario: "Funcionou bem para o que precisei. So achei as brocas um pouco gastas." },
    ],
  },
  {
    id: 2,
    nome: "Barraca de Camping 4 Pessoas",
    categoria: "Camping",
    preco: 40,
    nota: 4.6,
    avaliacoes: 12,
    dono: "Marina S.",
    local: "Centro - Curitiba/PR",
    endereco: "Av. Sete de Setembro, 200 - Curitiba/PR",
    locker: "C-11",
    descricao:
      "Barraca espacosa para 4 pessoas, impermeavel e com montagem rapida. Inclui sobreteto, estacas e bolsa de transporte.",
    avaliacoesLista: [
      { autor: "Diego F.", nota: 5, comentario: "Montagem facil e aguentou bem uma noite de chuva. Recomendo!" },
      { autor: "Carla P.", nota: 4, comentario: "Espacosa e limpa. A bolsa de transporte ja esta um pouco desgastada." },
    ],
  },
  {
    id: 3,
    nome: "Caixa de Som JBL PartyBox",
    categoria: "Eventos",
    preco: 60,
    nota: 4.9,
    avaliacoes: 38,
    dono: "Rafael T.",
    local: "Agua Verde - Curitiba/PR",
    endereco: "Rua Carlos de Carvalho, 800 - Curitiba/PR",
    locker: "A-02",
    descricao:
      "Caixa de som potente com bateria de longa duracao, entradas para microfone e luzes de festa integradas.",
    avaliacoesLista: [
      { autor: "Bruno H.", nota: 5, comentario: "Som excelente, encheu a festa toda. Bateria durou a noite inteira." },
      { autor: "Aline R.", nota: 5, comentario: "Facil de usar e muito potente. Locador super atencioso no chat." },
    ],
  },
  {
    id: 4,
    nome: "Lavadora de Alta Pressao",
    categoria: "Limpeza",
    preco: 35,
    nota: 4.5,
    avaliacoes: 9,
    dono: "Joana P.",
    local: "Portao - Curitiba/PR",
    endereco: "Rua Joao Bettega, 1500 - Curitiba/PR",
    locker: "D-07",
    descricao:
      "Lavadora de alta pressao ideal para quintais, calcadas e veiculos. Inclui bicos sortidos e mangueira de 5 metros.",
    avaliacoesLista: [
      { autor: "Paulo S.", nota: 4, comentario: "Limpou bem a calcada e o carro. Pressao boa para uso domestico." },
      { autor: "Tatiane M.", nota: 5, comentario: "Otima! Veio limpa e com todos os bicos. Retirada no locker tranquila." },
    ],
  },
  {
    id: 5,
    nome: "Projetor Full HD 3000 lumens",
    categoria: "Eventos",
    preco: 55,
    nota: 4.7,
    avaliacoes: 21,
    dono: "Bruno L.",
    local: "Bigorrilho - Curitiba/PR",
    endereco: "Rua Padre Anchieta, 1100 - Curitiba/PR",
    locker: "A-05",
    descricao:
      "Projetor Full HD com 3000 lumens e entradas HDMI e USB. Otimo para cinema em casa e apresentacoes.",
    avaliacoesLista: [
      { autor: "Fernando K.", nota: 5, comentario: "Imagem nitida mesmo com um pouco de luz no ambiente. Adorei o cinema em casa." },
      { autor: "Luiza C.", nota: 4, comentario: "Bom projetor, so precisei de um cabo HDMI mais longo que nao acompanha." },
    ],
  },
  {
    id: 6,
    nome: "Kit Churrasqueira Portatil",
    categoria: "Lazer",
    preco: 30,
    nota: 4.4,
    avaliacoes: 7,
    dono: "Paula R.",
    local: "Cabral - Curitiba/PR",
    endereco: "Rua Maua, 300 - Curitiba/PR",
    locker: "C-09",
    descricao:
      "Kit churrasqueira portatil com grelha, pegador e capa de transporte. Facil de montar e limpar.",
    avaliacoesLista: [
      { autor: "Gustavo N.", nota: 4, comentario: "Perfeita para um churrasco pequeno no parque. Leve e facil de carregar." },
      { autor: "Sabrina O.", nota: 5, comentario: "Veio limpinha e completa. Montagem em minutos, recomendo!" },
    ],
  },
];

// Busca um item pelo id. O id vem como string da URL, por isso o String().
export const getItemById = (id) => ITENS.find((i) => String(i.id) === String(id));
