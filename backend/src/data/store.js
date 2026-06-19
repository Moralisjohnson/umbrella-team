// Dados de exemplo (seed) usados para popular o PostgreSQL via src/db/seed.js.
// Espelha os itens do front-end (frontend/src/data/itens.js).
// As imagens sao URLs diretas do Unsplash (licenca gratuita, hotlink permitido).

export const itens = [
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
      "Furadeira de impacto ideal para concreto, madeira e aco. Acompanha maleta de transporte, jogo com 5 brocas multimateriais e chave de mandril.",
    imagem:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Marcos A.", nota: 5, comentario: "Furadeira muito potente e bem conservada." },
      { autor: "Renata L.", nota: 4, comentario: "Funcionou bem. So achei as brocas um pouco gastas." },
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
    descricao: "Barraca espacosa para 4 pessoas, impermeavel e com montagem rapida.",
    imagem:
      "https://images.unsplash.com/photo-1684487747385-442d674962f2?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Diego F.", nota: 5, comentario: "Montagem facil e aguentou bem a chuva." },
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
    descricao: "Caixa de som potente, com bateria de longa duracao e entradas para microfone.",
    imagem:
      "https://images.unsplash.com/photo-1542483381-41a479b1fb88?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Bruno H.", nota: 5, comentario: "Som excelente, encheu a festa toda." },
      { autor: "Aline R.", nota: 5, comentario: "Facil de usar e muito potente." },
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
    descricao: "Lavadora de alta pressao ideal para quintais, calcadas e veiculos.",
    imagem:
      "https://images.unsplash.com/photo-1774031159721-aec9230f38db?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Paulo S.", nota: 4, comentario: "Limpou bem a calcada e o carro." },
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
    descricao: "Projetor Full HD com 3000 lumens e entradas HDMI e USB.",
    imagem:
      "https://images.unsplash.com/photo-1728771175581-3cb1e21fac92?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Fernando K.", nota: 5, comentario: "Imagem nitida mesmo com luz no ambiente." },
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
    descricao: "Kit churrasqueira portatil com grelha, pegador e capa de transporte.",
    imagem:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Gustavo N.", nota: 4, comentario: "Perfeita para um churrasco pequeno no parque." },
    ],
  },
  {
    id: 7,
    nome: "Console PlayStation 5 + 2 Controles",
    categoria: "Games",
    preco: 70,
    nota: 4.9,
    avaliacoes: 31,
    dono: "Lucas D.",
    local: "Centro Civico - Curitiba/PR",
    endereco: "Av. Candido de Abreu, 500 - Curitiba/PR",
    locker: "A-08",
    descricao:
      "Console PlayStation 5 com dois controles sem fio e cabos HDMI inclusos. Ideal para um fim de semana de jogos com os amigos.",
    imagem:
      "https://images.unsplash.com/photo-1750797308931-b0d261abb3d5?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Thiago M.", nota: 5, comentario: "Veio limpinho e com os dois controles carregados." },
      { autor: "Camila V.", nota: 5, comentario: "Otimo para a maratona de games do fim de semana." },
    ],
  },
  {
    id: 8,
    nome: "Drone DJI Mini com Camera 4K",
    categoria: "Tecnologia",
    preco: 90,
    nota: 4.8,
    avaliacoes: 17,
    dono: "Renan H.",
    local: "Ecoville - Curitiba/PR",
    endereco: "Av. Ludovica da Riva Netto, 250 - Curitiba/PR",
    locker: "B-12",
    descricao:
      "Drone compacto com camera 4K, tres baterias e controle remoto. Perfeito para filmagens aereas e fotos de viagem.",
    imagem:
      "https://images.unsplash.com/photo-1594538883485-224882654f65?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Eduardo P.", nota: 5, comentario: "Imagens incriveis e facil de pilotar." },
    ],
  },
  {
    id: 9,
    nome: "Prancha de Stand Up Paddle Inflavel",
    categoria: "Esportes",
    preco: 50,
    nota: 4.6,
    avaliacoes: 14,
    dono: "Marina S.",
    local: "Santa Felicidade - Curitiba/PR",
    endereco: "Av. Manoel Ribas, 6000 - Curitiba/PR",
    locker: "C-03",
    descricao:
      "Prancha de stand up paddle inflavel com remo ajustavel, bomba e mochila de transporte. Suporta ate 120 kg.",
    imagem:
      "https://images.unsplash.com/photo-1655387440716-0cf15140de1a?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Larissa C.", nota: 5, comentario: "Estavel na agua e facil de inflar." },
    ],
  },
  {
    id: 10,
    nome: "Mountain Bike Aro 29",
    categoria: "Esportes",
    preco: 45,
    nota: 4.7,
    avaliacoes: 19,
    dono: "Carlos M.",
    local: "Jardim Botanico - Curitiba/PR",
    endereco: "Rua Ostoja Roguski, 100 - Curitiba/PR",
    locker: "D-01",
    descricao:
      "Mountain bike aro 29 com 21 marchas, freios a disco e suspensao dianteira. Revisada e pronta para a trilha.",
    imagem:
      "https://images.unsplash.com/photo-1534150034764-046bf225d3fa?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Rodrigo A.", nota: 5, comentario: "Bike em otimo estado, marchas afiadas." },
      { autor: "Bia F.", nota: 4, comentario: "Boa para o parque, so faltou um suporte de garrafa." },
    ],
  },
  {
    id: 11,
    nome: "Kit Festa: Mesa + 10 Cadeiras Dobraveis",
    categoria: "Eventos",
    preco: 35,
    nota: 4.5,
    avaliacoes: 11,
    dono: "Paula R.",
    local: "Boa Vista - Curitiba/PR",
    endereco: "Rua Pastor Manoel Virginio de Souza, 400 - Curitiba/PR",
    locker: "C-06",
    descricao:
      "Kit com uma mesa dobravel e dez cadeiras dobraveis, leves e faceis de transportar. Ideal para festas e reunioes.",
    imagem:
      "https://images.unsplash.com/photo-1761070775230-1921952439de?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Sandra T.", nota: 5, comentario: "Resolveu o aniversario, tudo limpo e firme." },
    ],
  },
  {
    id: 12,
    nome: "Maquina de Cafe Expresso",
    categoria: "Casa",
    preco: 25,
    nota: 4.6,
    avaliacoes: 16,
    dono: "Joana P.",
    local: "Cristo Rei - Curitiba/PR",
    endereco: "Rua Fernandes de Barros, 900 - Curitiba/PR",
    locker: "A-10",
    descricao:
      "Maquina de cafe expresso com bico vaporizador para cappuccino. Acompanha porta-filtro e colher dosadora.",
    imagem:
      "https://images.unsplash.com/photo-1461988091159-192b6df7054f?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Henrique D.", nota: 5, comentario: "Cafe sai cremoso, perfeita para o cafe da manha." },
    ],
  },
  {
    id: 13,
    nome: "Aspirador Robo Inteligente",
    categoria: "Limpeza",
    preco: 30,
    nota: 4.4,
    avaliacoes: 13,
    dono: "Rafael T.",
    local: "Hauer - Curitiba/PR",
    endereco: "Av. Comendador Franco, 2800 - Curitiba/PR",
    locker: "D-04",
    descricao:
      "Aspirador robo com mapeamento, controle por app e base de recarga. Otimo para manter a casa limpa sem esforco.",
    imagem:
      "https://images.unsplash.com/photo-1653990480360-31a12ce9723e?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Patricia L.", nota: 4, comentario: "Limpou bem a sala, so e um pouco barulhento." },
    ],
  },
  {
    id: 14,
    nome: "Kit de Ferramentas 120 Pecas",
    categoria: "Ferramentas",
    preco: 20,
    nota: 4.7,
    avaliacoes: 22,
    dono: "Carlos M.",
    local: "Pinheirinho - Curitiba/PR",
    endereco: "Av. Winston Churchill, 2000 - Curitiba/PR",
    locker: "B-07",
    descricao:
      "Maleta com 120 pecas: chaves de fenda, philips, soquetes, alicate e catraca. Para pequenos reparos em casa.",
    imagem:
      "https://images.unsplash.com/photo-1753947687841-eab7644f9a23?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Andre S.", nota: 5, comentario: "Kit completo, atendeu todos os reparos que precisei." },
    ],
  },
  {
    id: 15,
    nome: "Violao Acustico com Capa",
    categoria: "Musica",
    preco: 22,
    nota: 4.8,
    avaliacoes: 10,
    dono: "Marina S.",
    local: "Merces - Curitiba/PR",
    endereco: "Rua Padre Agostinho, 1200 - Curitiba/PR",
    locker: "A-03",
    descricao:
      "Violao acustico com cordas de aco, afinado, com capa acolchoada e palhetas. Ideal para ensaios e rodas de musica.",
    imagem:
      "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Vinicius R.", nota: 5, comentario: "Afinacao estavel e som muito bom." },
    ],
  },
  {
    id: 16,
    nome: "Caixa Termica 50L",
    categoria: "Camping",
    preco: 15,
    nota: 4.5,
    avaliacoes: 8,
    dono: "Paula R.",
    local: "Bacacheri - Curitiba/PR",
    endereco: "Av. Erasto Gaertner, 700 - Curitiba/PR",
    locker: "C-02",
    descricao:
      "Caixa termica de 50 litros que mantem bebidas geladas por horas. Com alca reforcada e dreno para escoar a agua.",
    imagem:
      "https://images.unsplash.com/photo-1577196302794-35c6ab05fdcb?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Carla M.", nota: 4, comentario: "Segurou o gelo o dia todo na praia." },
    ],
  },
  {
    id: 17,
    nome: "Camera DSLR Canon + Lente 50mm",
    categoria: "Tecnologia",
    preco: 80,
    nota: 4.9,
    avaliacoes: 15,
    dono: "Renan H.",
    local: "Batel - Curitiba/PR",
    endereco: "Av. do Batel, 1750 - Curitiba/PR",
    locker: "B-01",
    descricao:
      "Camera DSLR Canon com lente 50mm f/1.8, dois cartoes de memoria e bateria extra. Otima para retratos e eventos.",
    imagem:
      "https://images.unsplash.com/photo-1571689936008-083b32a9dcca?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Juliana P.", nota: 5, comentario: "Fotos lindas, lente otima para retrato." },
    ],
  },
  {
    id: 18,
    nome: "Gazebo Tenda 3x3",
    categoria: "Eventos",
    preco: 40,
    nota: 4.6,
    avaliacoes: 9,
    dono: "Bruno L.",
    local: "Portao - Curitiba/PR",
    endereco: "Rua Republica Argentina, 1500 - Curitiba/PR",
    locker: "D-09",
    descricao:
      "Gazebo tenda 3x3 metros, retratil, com bolsa de transporte. Protege do sol e da chuva em feiras e eventos.",
    imagem:
      "https://images.unsplash.com/photo-1695393386569-cf141ff2c552?w=800&q=80&auto=format&fit=crop",
    avaliacoesLista: [
      { autor: "Marcelo F.", nota: 5, comentario: "Montagem rapida e bem resistente ao vento." },
    ],
  },
];
