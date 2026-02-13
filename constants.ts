import { Category, WordPair } from './types';

export const WORD_LISTS: Record<Exclude<Category, 'Aleatório'>, WordPair[]> = {
  'Comida': [
    { normal: 'Coxinha', impostor: 'Pastel' },
    { normal: 'Hambúrguer', impostor: 'Sanduíche' },
    { normal: 'Pizza', impostor: 'Lasanha' },
    { normal: 'Chocolate', impostor: 'Brigadeiro' },
    { normal: 'Sorvete', impostor: 'Açaí' },
    { normal: 'Ketchup', impostor: 'Mostarda' },
    { normal: 'Arroz', impostor: 'Macarrão' },
    { normal: 'Leite', impostor: 'Iogurte' },
    { normal: 'Suco', impostor: 'Refrigerante' },
    { normal: 'Bolo', impostor: 'Torta' }
  ],
  'Animais': [
    { normal: 'Cachorro', impostor: 'Lobo' },
    { normal: 'Gato', impostor: 'Tigre' },
    { normal: 'Cavalo', impostor: 'Burro' },
    { normal: 'Jacaré', impostor: 'Crocodilo' },
    { normal: 'Pato', impostor: 'Ganso' },
    { normal: 'Tartaruga', impostor: 'Cágado' },
    { normal: 'Golfinho', impostor: 'Baleia' },
    { normal: 'Abelha', impostor: 'Vespa' },
    { normal: 'Sapo', impostor: 'Perereca' },
    { normal: 'Águia', impostor: 'Falcão' }
  ],
  'Países': [
    { normal: 'Brasil', impostor: 'Portugal' },
    { normal: 'Espanha', impostor: 'Itália' },
    { normal: 'China', impostor: 'Japão' },
    { normal: 'EUA', impostor: 'Canadá' },
    { normal: 'Argentina', impostor: 'Uruguai' },
    { normal: 'Alemanha', impostor: 'Holanda' },
    { normal: 'Colômbia', impostor: 'Venezuela' },
    { normal: 'Egito', impostor: 'Marrocos' },
    { normal: 'Austrália', impostor: 'Nova Zelândia' },
    { normal: 'Noruega', impostor: 'Suécia' }
  ],
  'Esportes': [
    { normal: 'Futebol', impostor: 'Futsal' },
    { normal: 'Tênis', impostor: 'Ping Pong' },
    { normal: 'Vôlei', impostor: 'Futevôlei' },
    { normal: 'Natação', impostor: 'Polo Aquático' },
    { normal: 'Corrida', impostor: 'Caminhada' },
    { normal: 'Surfe', impostor: 'Skate' },
    { normal: 'Judô', impostor: 'Jiu-Jitsu' },
    { normal: 'Basquete', impostor: 'Handebol' },
    { normal: 'Boxe', impostor: 'Muay Thai' },
    { normal: 'Ciclismo', impostor: 'Motocross' }
  ],
  'Jogos': [
    { normal: 'Free Fire', impostor: 'Fortnite' },
    { normal: 'Minecraft', impostor: 'Roblox' },
    { normal: 'FIFA', impostor: 'PES' },
    { normal: 'League of Legends', impostor: 'Dota 2' },
    { normal: 'Among Us', impostor: 'Werewolf' },
    { normal: 'GTA', impostor: 'Mafia' },
    { normal: 'Mario', impostor: 'Sonic' },
    { normal: 'Call of Duty', impostor: 'Battlefield' },
    { normal: 'Xadrez', impostor: 'Dama' },
    { normal: 'Dominó', impostor: 'Uno' }
  ],
  'Filmes': [
    { normal: 'Vingadores', impostor: 'Liga da Justiça' },
    { normal: 'Star Wars', impostor: 'Star Trek' },
    { normal: 'Harry Potter', impostor: 'Senhor dos Anéis' },
    { normal: 'Batman', impostor: 'Homem-Aranha' },
    { normal: 'Toy Story', impostor: 'Shrek' },
    { normal: 'Titanic', impostor: 'Avatar' },
    { normal: 'Frozen', impostor: 'Moana' },
    { normal: 'Rei Leão', impostor: 'Mogli' },
    { normal: 'Matrix', impostor: 'Exterminador do Futuro' },
    { normal: 'Velozes e Furiosos', impostor: 'Carga Explosiva' }
  ],
  'Música': [
    { normal: 'Violão', impostor: 'Guitarra' },
    { normal: 'Piano', impostor: 'Teclado' },
    { normal: 'Samba', impostor: 'Pagode' },
    { normal: 'Rock', impostor: 'Metal' },
    { normal: 'Rap', impostor: 'Trap' },
    { normal: 'Funk', impostor: 'Reggaeton' },
    { normal: 'Violino', impostor: 'Violoncelo' },
    { normal: 'Bateria', impostor: 'Tambor' },
    { normal: 'Flauta', impostor: 'Clarinete' },
    { normal: 'Microfone', impostor: 'Alto-falante' }
  ],
  'Objetos': [
    { normal: 'Cadeira', impostor: 'Banco' },
    { normal: 'Caneta', impostor: 'Lápis' },
    { normal: 'Celular', impostor: 'Tablet' },
    { normal: 'Garfo', impostor: 'Colher' },
    { normal: 'Copo', impostor: 'Taça' },
    { normal: 'Meia', impostor: 'Sapato' },
    { normal: 'Mochila', impostor: 'Mala' },
    { normal: 'Relógio', impostor: 'Pulseira' },
    { normal: 'Óculos', impostor: 'Lente' },
    { normal: 'Travesseiro', impostor: 'Almofada' }
  ],
  'Transportes': [
    { normal: 'Carro', impostor: 'Caminhonete' },
    { normal: 'Ônibus', impostor: 'Trem' },
    { normal: 'Moto', impostor: 'Bicicleta' },
    { normal: 'Avião', impostor: 'Helicóptero' },
    { normal: 'Barco', impostor: 'Navio' },
    { normal: 'Táxi', impostor: 'Uber' },
    { normal: 'Patinete', impostor: 'Skate' },
    { normal: 'Metrô', impostor: 'Bonde' },
    { normal: 'Caminhão', impostor: 'Carreta' },
    { normal: 'Lancha', impostor: 'Jet Ski' }
  ]
};