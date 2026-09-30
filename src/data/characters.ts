export interface CostumeTraits {
  mainColors: string[];
  hasHelmetOrMask: boolean;
  hasCape: boolean;
  hasBeard: boolean;
  hasWeapon: boolean;
  notes: string;
}

export interface Character {
  id: string;
  name: string;
  universe: 'marvel' | 'the_boys' | 'invincible' | 'star_wars';
  avatar: string;
  shortDesc: string;
  wiki: string;
  traits: CostumeTraits;
}

export const CHARACTERS_DB: Character[] = [
  // ================= MARVEL =================
  {
    id: 'iron_man',
    name: 'Тони Старк (Железный Человек)',
    universe: 'marvel',
    avatar: '/characters/iron_man.png',
    shortDesc: 'Броня Mark 85 с нано-реактором.',
    wiki: 'Тони Старк в боевой нано-броне красно-золотого цвета. Лицо скрыто шлемом, на груди сияет реактор.',
    traits: {
      mainColors: ['красный', 'золотой'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Шлем закрывает лицо полностью, глаза светятся белым.'
    }
  },
  {
    id: 'spider_man',
    name: 'Питер Паркер (Человек-Паук)',
    universe: 'marvel',
    avatar: '/characters/spider_man.png',
    shortDesc: 'Классическое красно-синее трико с паутиной.',
    wiki: 'Дружелюбный сосед в маске с белыми линзами, скрывающей лицо целиком.',
    traits: {
      mainColors: ['красный', 'синий'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Маска надета, лица не видно, узор паутины по ткани.'
    }
  },
  {
    id: 'captain_america',
    name: 'Стив Роджерс (Капитан Америка)',
    universe: 'marvel',
    avatar: '/characters/captain_america.png',
    shortDesc: 'Темно-синий кевлар со звездой и щитом.',
    wiki: 'Суперсолдат в шлеме с буквой А (подбородок открыт), в руках держит круглый вибраниумовый щит.',
    traits: {
      mainColors: ['синий', 'коричневый'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Лицо видно частично, щит в руке.'
    }
  },
  {
    id: 'thor',
    name: 'Тор Одинсон',
    universe: 'marvel',
    avatar: '/characters/thor.png',
    shortDesc: 'Бог грома в черных латах и красном плаще.',
    wiki: 'Сын Одина с короткой стрижкой и бородой, вооружен секирой Штормбрейкер.',
    traits: {
      mainColors: ['черный', 'красный'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: true,
      hasWeapon: true,
      notes: 'Лицо открыто, русая борода, секира в руке, красный плащ за спиной.'
    }
  },
  {
    id: 'hulk',
    name: 'Брюс Бэннер (Халк)',
    universe: 'marvel',
    avatar: '/characters/hulk.png',
    shortDesc: 'Зеленый мускулистый гигант.',
    wiki: 'Халк с обнаженным торсом в порванных темных штанах. Зеленая кожа и черные волосы.',
    traits: {
      mainColors: ['зеленый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Голый торс, без шлема и оружия.'
    }
  },
  {
    id: 'thanos',
    name: 'Танос',
    universe: 'marvel',
    avatar: '/characters/thanos.png',
    shortDesc: 'Безумный Титан в золотом доспехе.',
    wiki: 'Фиолетовый гигант в золотом шлеме и кирасе, на левой руке надета Перчатка Бесконечности.',
    traits: {
      mainColors: ['золотой', 'фиолетовый'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Золотой шлем на голове, перчатка с камнями.'
    }
  },
  {
    id: 'loki',
    name: 'Локи Лафейсон',
    universe: 'marvel',
    avatar: '/characters/loki.png',
    shortDesc: 'Бог обмана в зеленой мантии с рогатым шлемом.',
    wiki: 'Асгардский трикстер в шлеме с двумя большими золотыми рогами и зеленым плащом.',
    traits: {
      mainColors: ['зеленый', 'золотой'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Длинные черные волосы, два загнутых рога на шлеме.'
    }
  },
  {
    id: 'doctor_strange',
    name: 'Стивен Стрэндж',
    universe: 'marvel',
    avatar: '/characters/doctor_strange.png',
    shortDesc: 'Синяя туника мага и красный Плащ Левитации.',
    wiki: 'Верховный маг Земли с седыми висками и амулетом Глаз Агамотто на шее.',
    traits: {
      mainColors: ['синий', 'красный'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: true,
      hasWeapon: false,
      notes: 'Лицо открыто, аккуратная бородка, высокий воротник плаща.'
    }
  },
  {
    id: 'black_widow',
    name: 'Наташа Романофф',
    universe: 'marvel',
    avatar: '/characters/black_widow.png',
    shortDesc: 'Черный тактический комбинезон шпионки.',
    wiki: 'Черная Вдова в облегающем костюме на молнии с рыжими волосами и кобурами на бедрах.',
    traits: {
      mainColors: ['черный'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Женщина, рыжие волосы, пистолеты в кобурах.'
    }
  },
  {
    id: 'scarlet_witch',
    name: 'Ванда Максимофф (Алая Ведьма)',
    universe: 'marvel',
    avatar: '/characters/scarlet_witch.png',
    shortDesc: 'Бордовый корсет и алая корона.',
    wiki: 'Ванда в темно-красном костюме с заостренной тиарой на голове и светящимися ладонями.',
    traits: {
      mainColors: ['красный', 'черный'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Алая корона на голове, длинные распущенные волосы.'
    }
  },
  {
    id: 'wolverine',
    name: 'Логан (Росомаха)',
    universe: 'marvel',
    avatar: '/characters/wolverine.png',
    shortDesc: 'Желто-синий костюм с маской и когтями.',
    wiki: 'Мутант в знаменитой желтой форме с черными ушами на маске и стальными когтями из кулаков.',
    traits: {
      mainColors: ['желтый', 'синий'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Маска с большими ушами, когти выпущены.'
    }
  },
  {
    id: 'deadpool',
    name: 'Уэйд Уилсон (Дэдпул)',
    universe: 'marvel',
    avatar: '/characters/deadpool.png',
    shortDesc: 'Красно-черное трико с катанами за спиной.',
    wiki: 'Наемник в глухой красно-черной маске с рукоятями мечей, торчащими из-за спины.',
    traits: {
      mainColors: ['красный', 'черный'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Лицо скрыто наглухо, мечи за плечами.'
    }
  },
  {
    id: 'black_panther',
    name: 'Т’Чалла (Черная Пантера)',
    universe: 'marvel',
    avatar: '/characters/black_panther.png',
    shortDesc: 'Черный комбинезон из вибраниума с маской пантеры.',
    wiki: 'Король Ваканды в монолитно-черной броне с ушками на шлеме и серебряным колье-когтями.',
    traits: {
      mainColors: ['черный', 'серебряный'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Черная маска с ушками кошки, лицо полностью скрыто.'
    }
  },
  {
    id: 'star_lord',
    name: 'Питер Квилл (Звёздный Лорд)',
    universe: 'marvel',
    avatar: '/characters/star_lord.png',
    shortDesc: 'Бордовая куртка и маска с красными окулярами.',
    wiki: 'Лидер Стражей Галактики в кожаном плаще и высокотехнологичном шлеме-респираторе.',
    traits: {
      mainColors: ['коричневый', 'красный'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Маска со светящимися красными линзами.'
    }
  },
  {
    id: 'groot',
    name: 'Грут',
    universe: 'marvel',
    avatar: '/characters/groot.png',
    shortDesc: 'Древовидный великан из коры и веток.',
    wiki: 'Существо из живого дерева с зелеными побегами на плечах, одежды не носит.',
    traits: {
      mainColors: ['коричневый', 'зеленый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Полностью древесное тело без одежды.'
    }
  },
  {
    id: 'hawkeye',
    name: 'Клинт Бартон',
    universe: 'marvel',
    avatar: '/characters/hawkeye.png',
    shortDesc: 'Темно-фиолетовый жилет лучника с колчаном.',
    wiki: 'Меткий стрелок без маски с блочным луком в руках и стрелами за спиной.',
    traits: {
      mainColors: ['черный', 'фиолетовый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Лицо открыто, лук со стрелами в руках.'
    }
  },
  {
    id: 'ant_man',
    name: 'Скотт Лэнг (Человек-Муравей)',
    universe: 'marvel',
    avatar: '/characters/ant_man.png',
    shortDesc: 'Черно-красный костюм со стальным шлемом.',
    wiki: 'Герой в закрытом металлическом шлеме с респиратором и красными окулярами.',
    traits: {
      mainColors: ['красный', 'черный', 'серебряный'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Шлем закрывает голову целиком.'
    }
  },
  {
    id: 'winter_soldier',
    name: 'Баки Барнс',
    universe: 'marvel',
    avatar: '/characters/winter_soldier.png',
    shortDesc: 'Тактический жилет и хромированная кибер-рука.',
    wiki: 'Боец с длинными волосами до плеч, левая рука полностью железная со звездой.',
    traits: {
      mainColors: ['черный', 'серебряный'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: true,
      hasWeapon: true,
      notes: 'Лицо открыто, блестящая металлическая рука.'
    }
  },
  {
    id: 'vision',
    name: 'Вижн',
    universe: 'marvel',
    avatar: '/characters/vision.png',
    shortDesc: 'Красное лицо, зеленый костюм и желтый плащ.',
    wiki: 'Синтезоид с желтым Камнем Разума во лбу и золотистой мантией за спиной.',
    traits: {
      mainColors: ['зеленый', 'красный', 'желтый'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Красная кожа лица, камень во лбу, длинный плащ.'
    }
  },
  {
    id: 'captain_marvel',
    name: 'Кэрол Дэнверс',
    universe: 'marvel',
    avatar: '/characters/captain_marvel.png',
    shortDesc: 'Красно-синий костюм с золотой звездой.',
    wiki: 'Супергероиня со светлыми волосами, без шлема, на груди сияет золотая восьмиконечная звезда.',
    traits: {
      mainColors: ['синий', 'красный', 'золотой'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Женщина, светлые волосы, открытое лицо.'
    }
  },
  {
    id: 'magneto',
    name: 'Эрик Леншерр (Магнето)',
    universe: 'marvel',
    avatar: '/characters/magneto.png',
    shortDesc: 'Темно-красный шлем и фиолетовый плащ.',
    wiki: 'Повелитель магнетизма в шлеме с вырезом под лицо и металлическим воротником.',
    traits: {
      mainColors: ['красный', 'фиолетовый'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Шлем закрывает лоб и щеки, седые брови, плащ.'
    }
  },
  {
    id: 'green_goblin',
    name: 'Норман Озборн (Зеленый Гоблин)',
    universe: 'marvel',
    avatar: '/characters/green_goblin.png',
    shortDesc: 'Зеленая чешуйчатая броня и оскаленная маска.',
    wiki: 'Злодей в остроконечном зеленом шлеме с желтыми линзами глаз и тыквенной бомбой.',
    traits: {
      mainColors: ['зеленый', 'желтый'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Зеленый шлем-маска с зубастым оскалом, бомба в руке.'
    }
  },
  {
    id: 'daredevil',
    name: 'Мэтт Мёрдок (Сорвиголова)',
    universe: 'marvel',
    avatar: '/characters/daredevil.png',
    shortDesc: 'Бордовый костюм с дьявольскими рожками.',
    wiki: 'Слепой защитник в маске с маленькими рожками на лбу и красными стеклами на глазах.',
    traits: {
      mainColors: ['красный', 'черный'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Рожки на шлеме, палочки-дубинки в руках.'
    }
  },
  {
    id: 'ikaris',
    name: 'Икарис',
    universe: 'marvel',
    avatar: '/characters/ikaris.png',
    shortDesc: 'Синий костюм Вечного с золотыми кругами.',
    wiki: 'Лидер Вечных в сине-голубом облачении с золотым узором, глаза светятся космическим лазером.',
    traits: {
      mainColors: ['синий', 'золотой'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Открытое лицо, светящиеся глаза лазером.'
    }
  },

  // ================= STAR WARS =================
  {
    id: 'darth_vader',
    name: 'Дарт Вейдер',
    universe: 'star_wars',
    avatar: '/characters/darth_vader.png',
    shortDesc: 'Черная глянцевая броня ситха с респиратором.',
    wiki: 'Повелитель ситхов в черном шлеме, мантии, с панелью жизнеобеспечения на груди и красным мечом.',
    traits: {
      mainColors: ['черный'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Лицо полностью скрыто респиратором, красный световой меч.'
    }
  },
  {
    id: 'luke_skywalker',
    name: 'Люк Скайуокер',
    universe: 'star_wars',
    avatar: '/characters/luke_skywalker.png',
    shortDesc: 'Черный джедайский костюм и зеленый меч.',
    wiki: 'Люк образца Возвращения Джедая: черная туника, перчатка на правой руке, зеленый клинок.',
    traits: {
      mainColors: ['черный'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Светлые волосы, без шлема, зеленый световой меч.'
    }
  },
  {
    id: 'yoda',
    name: 'Магистр Йода',
    universe: 'star_wars',
    avatar: '/characters/yoda.png',
    shortDesc: 'Зеленый пришелец в бежевой мантии с тростью.',
    wiki: 'Гранд-магистр с длинными заостренными ушами, седыми прядями и коричневой туникой.',
    traits: {
      mainColors: ['зеленый', 'коричневый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Маленький зеленый старец с большими ушами, деревянная палка.'
    }
  },
  {
    id: 'obi_wan',
    name: 'Оби-Ван Кеноби',
    universe: 'star_wars',
    avatar: '/characters/obi_wan.png',
    shortDesc: 'Бежевая роба джедая и синий световой меч.',
    wiki: 'Мастер-джедай с рыжевато-русой бородой, открытым лицом и синим клинком Силы.',
    traits: {
      mainColors: ['бежевый', 'коричневый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: true,
      hasWeapon: true,
      notes: 'Рыжая борода, светлая туника, синий меч.'
    }
  },
  {
    id: 'han_solo',
    name: 'Хан Соло',
    universe: 'star_wars',
    avatar: '/characters/han_solo.png',
    shortDesc: 'Белая рубаха, черная жилетка и бластер.',
    wiki: 'Контрабандист в расстегнутой рубахе, черном жилете и с пистолетом-бластером DL-44.',
    traits: {
      mainColors: ['белый', 'черный', 'коричневый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Черная жилетка, кобура на бедре, бластер в руке.'
    }
  },
  {
    id: 'leia_organa',
    name: 'Принцесса Лея',
    universe: 'star_wars',
    avatar: '/characters/leia_organa.png',
    shortDesc: 'Белое струящееся платье и прическа-бублики.',
    wiki: 'Принцесса Альдераана в длинном белом платье с серебряным поясом и двумя круглыми пучками волос.',
    traits: {
      mainColors: ['белый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Женщина в белом платье, знаменитая прическа «булочки» по бокам.'
    }
  },
  {
    id: 'chewbacca',
    name: 'Чубакка',
    universe: 'star_wars',
    avatar: '/characters/chewbacca.png',
    shortDesc: 'Мохнатый вуки с кожаным патронташем.',
    wiki: 'Высокий вуки, целиком покрытый коричневой шерстью, с серебристым арбалетом-бластером.',
    traits: {
      mainColors: ['коричневый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Всё тело в шерсти, ремень через плечо, тяжелый арбалет.'
    }
  },
  {
    id: 'boba_fett',
    name: 'Боба Фетт',
    universe: 'star_wars',
    avatar: '/characters/boba_fett.png',
    shortDesc: 'Зеленый мандалорский шлем с Т-визором.',
    wiki: 'Охотник за головами в поцарапанной зеленой броне, желтых наплечниках и ранцем за спиной.',
    traits: {
      mainColors: ['зеленый', 'желтый', 'серый'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Шлем мандалорца с дальномером, лицо скрыто.'
    }
  },
  {
    id: 'palpatine',
    name: 'Император Палпатин',
    universe: 'star_wars',
    avatar: '/characters/palpatine.png',
    shortDesc: 'Черный балахон и синие молнии из рук.',
    wiki: 'Морщинистый владыка ситхов в глубоком черном капюшоне, стреляющий молниями из пальцев.',
    traits: {
      mainColors: ['черный'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Черный капюшон скрывает лоб, бледное лицо, желтые глаза.'
    }
  },
  {
    id: 'mandalorian',
    name: 'Дин Джарин (Мандалорец)',
    universe: 'star_wars',
    avatar: '/characters/mandalorian.png',
    shortDesc: 'Зеркальная броня из чистого бескара.',
    wiki: 'Воин в серебристом металлическом шлеме, глухом визоре и коричневом плаще.',
    traits: {
      mainColors: ['серебряный', 'серый'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Блестящий хромированный шлем без лица.'
    }
  },
  {
    id: 'grogu',
    name: 'Грогу (Малыш)',
    universe: 'star_wars',
    avatar: '/characters/grogu.png',
    shortDesc: 'Крошечный зеленый малыш в бежевой робе.',
    wiki: 'Зеленый найденыш с гигантскими глазами и длинными ушами в теплой просторной кофте.',
    traits: {
      mainColors: ['зеленый', 'бежевый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: false,
      notes: 'Крохотный размер, длинные уши, темные глаза.'
    }
  },
  {
    id: 'ahsoka_tano',
    name: 'Асока Тано',
    universe: 'star_wars',
    avatar: '/characters/ahsoka_tano.png',
    shortDesc: 'Оранжевая кожа, бело-синие лекку и белые мечи.',
    wiki: 'Тогрута с полосатыми отростками на голове, белыми узорами на лице и двумя белыми мечами.',
    traits: {
      mainColors: ['оранжевый', 'синий', 'белый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Оранжевое лицо, длинные полосатые отростки вместо волос.'
    }
  },
  {
    id: 'darth_maul',
    name: 'Дарт Мол',
    universe: 'star_wars',
    avatar: '/characters/darth_maul.png',
    shortDesc: 'Красно-черные татуировки, рога и двойной меч.',
    wiki: 'Забрак с рожками на черепе, раскрашенным лицом и двухсторонним красным световым клинком.',
    traits: {
      mainColors: ['красный', 'черный'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Красное лицо с черными узорами, маленькие рожки.'
    }
  },
  {
    id: 'mace_windu',
    name: 'Мейс Винду',
    universe: 'star_wars',
    avatar: '/characters/mace_windu.png',
    shortDesc: 'Светлая туника джедая и фиолетовый меч.',
    wiki: 'Лысый магистр Ордена в традиционной светлой робе с ярким фиолетовым световым мечом.',
    traits: {
      mainColors: ['бежевый', 'коричневый'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Лысая голова, открытое лицо, фиолетовый световой меч.'
    }
  },
  {
    id: 'kylo_ren',
    name: 'Кайло Рен',
    universe: 'star_wars',
    avatar: '/characters/kylo_ren.png',
    shortDesc: 'Черная маска с серебром и меч с гардой.',
    wiki: 'Рыцарь Рен в черном капюшоне, маске с серебряными линиями и крестообразным красным мечом.',
    traits: {
      mainColors: ['черный', 'серебряный'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Черная маска закрывает лицо, меч с боковыми зубьями.'
    }
  },
  {
    id: 'rey_skywalker',
    name: 'Рей Скайуокер',
    universe: 'star_wars',
    avatar: '/characters/rey_skywalker.png',
    shortDesc: 'Светлые льняные повязки мусорщицы.',
    wiki: 'Джедайка с тремя пучками на затылке, светлыми тканевыми полосами на теле и синим мечом.',
    traits: {
      mainColors: ['белый', 'серый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Женщина, прическа из трех узелков, световой меч.'
    }
  },
  {
    id: 'anakin_skywalker',
    name: 'Энакин Скайуокер',
    universe: 'star_wars',
    avatar: '/characters/anakin_skywalker.png',
    shortDesc: 'Темно-коричневая кожаная туника со шрамом.',
    wiki: 'Энакин из «Мести ситхов»: вьющиеся волосы, шрам на правом глазу, синий световой меч.',
    traits: {
      mainColors: ['черный', 'коричневый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Шрам у правого глаза, волосы до плеч, синий меч.'
    }
  },
  {
    id: 'general_grievous',
    name: 'Генерал Гривус',
    universe: 'star_wars',
    avatar: '/characters/general_grievous.png',
    shortDesc: 'Белый скелет-киборг с четырьмя мечами.',
    wiki: 'Командующий дроидов с белой маской-черепом, четырьмя руками и зелеными/синими мечами.',
    traits: {
      mainColors: ['белый', 'серый'],
      hasHelmetOrMask: true,
      hasCape: true,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Киборг с 4 руками, держит сразу 4 световых меча.'
    }
  },
  {
    id: 'count_dooku',
    name: 'Граф Дуку',
    universe: 'star_wars',
    avatar: '/characters/count_dooku.png',
    shortDesc: 'Коричневый плащ с цепочкой и изогнутый меч.',
    wiki: 'Лорд Тиранус с благородной сединой, аккуратной бородой и мечом с изогнутой рукоятью.',
    traits: {
      mainColors: ['коричневый', 'черный'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: true,
      hasWeapon: true,
      notes: 'Седые волосы и бородка, изогнутый красный световой меч.'
    }
  },
  {
    id: 'padme_amidala',
    name: 'Падме Амидала',
    universe: 'star_wars',
    avatar: '/characters/padme_amidala.png',
    shortDesc: 'Белый облегающий костюм с бластером.',
    wiki: 'Сенатор Набу на арене Джеонозиса: белый костюм с открытым животом и пистолетом в руке.',
    traits: {
      mainColors: ['белый'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Женщина, темные волосы в хвосте, белый костюм.'
    }
  },
  {
    id: 'qui_gon_jinn',
    name: 'Квай-Гон Джинн',
    universe: 'star_wars',
    avatar: '/characters/qui_gon_jinn.png',
    shortDesc: 'Просторная туника джедая и длинные волосы.',
    wiki: 'Учитель Оби-Вана с длинными каштановыми волосами, аккуратной бородой и зеленым клинком.',
    traits: {
      mainColors: ['бежевый', 'коричневый'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: true,
      hasWeapon: true,
      notes: 'Длинные волосы назад, борода, зеленый световой меч.'
    }
  },
  {
    id: 'lando_calrissian',
    name: 'Лэндо Калриссиан',
    universe: 'star_wars',
    avatar: '/characters/lando_calrissian.png',
    shortDesc: 'Синяя рубашка и стильный плащ с золотом.',
    wiki: 'Барон Облачного города в синем костюме с атласным плащом и аккуратными усами.',
    traits: {
      mainColors: ['синий', 'золотой'],
      hasHelmetOrMask: false,
      hasCape: true,
      hasBeard: true,
      hasWeapon: false,
      notes: 'Пышные усы, сине-золотой плащ.'
    }
  },
  {
    id: 'finn',
    name: 'Финн (FN-2187)',
    universe: 'star_wars',
    avatar: '/characters/finn.png',
    shortDesc: 'Коричневая кожаная куртка с красной полосой.',
    wiki: 'Бывший штурмовик в куртке По Дэмерона и темной футболке с бластером в руках.',
    traits: {
      mainColors: ['коричневый', 'черный'],
      hasHelmetOrMask: false,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Короткая стрижка, кожаная куртка с красными вставками.'
    }
  },
  {
    id: 'stormtrooper',
    name: 'Имперский Штурмовик',
    universe: 'star_wars',
    avatar: '/characters/stormtrooper.png',
    shortDesc: 'Белая составная пластиковая броня и шлем.',
    wiki: 'Солдат Империи в чисто-белой кирасе, закрытом белом шлеме и с черным карабином E-11.',
    traits: {
      mainColors: ['белый', 'черный'],
      hasHelmetOrMask: true,
      hasCape: false,
      hasBeard: false,
      hasWeapon: true,
      notes: 'Белый шлем с черной полосой над визором, лица не видно.'
    }
  }
];

export type UniverseType = 'all' | 'marvel' | 'the_boys' | 'invincible' | 'star_wars';

export const getRandom24 = (universe: UniverseType): Character[] => {
  let pool = CHARACTERS_DB;
  if (universe !== 'all') {
    pool = CHARACTERS_DB.filter(c => c.universe === universe);
  }
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 24);
};
