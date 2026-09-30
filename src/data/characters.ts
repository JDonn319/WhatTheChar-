export interface Character {
  id: string;
  name: string;
  universe: 'marvel' | 'the_boys' | 'invincible' | 'star_wars';
  avatar: string;
  shortDesc: string;
  wiki: string;
}

export const CHARACTERS_DB: Character[] = [
  // THE BOYS
  {
    id: 'homelander',
    name: 'Хоумлендер (Джон)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    shortDesc: 'Лидер «Семёрки», сильнейший супергерой на Земле.',
    wiki: 'Джон Гиллман, более известный как Хоумлендер — главный антагонист сериала. Обладает полетом, неуязвимостью, сверхсилой и тепловым зрением. Психопат с нарциссическим расстройством, выросший в лаборатории Vought.'
  },
  {
    id: 'billy_butcher',
    name: 'Билли Бутчер',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    shortDesc: 'Лидер отряда «Пацаны», бывший оперативник SAS.',
    wiki: 'Уильям «Билли» Бутчер ведет личную вендетту против супергероев, в особенности Хоумлендера, виня его в гибели своей жены Бекки. Не брезгует жестокими методами и временной сывороткой V.'
  },
  {
    id: 'starlight',
    name: 'Старлайт (Энни)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Манипулирует электричеством и излучает свет.',
    wiki: 'Энни Дженьюэри — идеалистка, искренне желавшая помогать людям. Попав в «Семёрку», столкнулась с циничной корпоративной машиной Vought и перешла на сторону отряда Бутчера.'
  },
  {
    id: 'soldier_boy',
    name: 'Солдатик',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    shortDesc: 'Первый супергерой Америки времён Второй мировой.',
    wiki: 'Бен (Солдатик) был легендой до появления Хоумлендера. В результате советского плена научился излучать радиоактивные импульсы, выжигающие сыворотку V из крови суперов.'
  },

  // MARVEL
  {
    id: 'iron_man',
    name: 'Тони Старк (Железный Человек)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400&q=80',
    shortDesc: 'Гений, миллиардер, плейбой, филантроп в броне.',
    wiki: 'Энтони Эдвард Старк создал высокотехнологичный экзоскелет, чтобы сбежать из плена. Является сооснователем Мстителей и главным технологическим двигателем команды.'
  },
  {
    id: 'spider_man',
    name: 'Питер Паркер (Человек-Паук)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=400&q=80',
    shortDesc: 'Дружелюбный сосед со сверхчеловеческой ловкостью.',
    wiki: 'Укушенный радиоактивным пауком подросток из Квинса руководствуется правилом: «С великой силой приходит великая ответственность». Владеет паучьим чутьем и стреляет паутиной.'
  },
  {
    id: 'thanos',
    name: 'Танос',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    shortDesc: 'Безумный Титан, искатель Камней Бесконечности.',
    wiki: 'Военачальник с луны Титан, веривший, что спасти вселенную от перенаселения и гибели ресурсов можно лишь уничтожением половины всего живого щелчком пальцев.'
  },

  // INVINCIBLE
  {
    id: 'omni_man',
    name: 'Омни-Мэн (Нолан Грейсон)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    shortDesc: 'Вилтрумитский завоеватель, скрывавшийся на Земле.',
    wiki: 'Отец Марка Грейсона. Был послан империей Вилтрум для ослабления защитных сил Земли перед ее порабощением. Обладает практически нерушимой физиологией и колоссальной силой.'
  },
  {
    id: 'invincible',
    name: 'Неуязвимый (Марк Грейсон)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    shortDesc: 'Полувилтрумит, защищающий Землю вопреки всему.',
    wiki: 'Сын Нолана Грейсона. Унаследовал вилтрумитские способности в старшей школе. Выбрал путь защиты человечества, вступив в противостояние с собственным отцом и всей империей Вилтрум.'
  },

  // STAR WARS
  {
    id: 'darth_vader',
    name: 'Дарт Вейдер (Энакин)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1546561892-65bf811416b9?w=400&q=80',
    shortDesc: 'Лорд ситхов, бывший Избранный джедай.',
    wiki: 'Энакин Скайуокер, павший на Тёмную сторону Силы из-за страха потерять Падме. Киборг в черной жизнеобеспечивающей броне, внушающий ужас всей Галактике.'
  },
  {
    id: 'luke_skywalker',
    name: 'Люк Скайуокер',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    shortDesc: 'Великий магистр возрожденного Ордена джедаев.',
    wiki: 'Фермер с Татуина, ставший героем Восстания после уничтожения «Звезды Смерти». Сын Энакина Скайуокера, вернувший отца к Свету.'
  },
  {
    id: 'mandalorian',
    name: 'Дин Джарин (Мандалорец)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    shortDesc: 'Охотник за головами в броне из бескара.',
    wiki: 'Одинокий стрелок из клана Детей Дозора. Его жизнь круто изменилась после того, как он отказался отдать имперцам чувствительного к Силе младенца Грогу.'
  }
];

export type UniverseType = 'all' | 'marvel' | 'the_boys' | 'invincible' | 'star_wars';

export const getRandom24 = (universe: UniverseType): Character[] => {
  let pool = CHARACTERS_DB;
  if (universe !== 'all') {
    pool = CHARACTERS_DB.filter(c => c.universe === universe);
  }
  // Перемешивание Фишера-Йетса
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 24);
};
