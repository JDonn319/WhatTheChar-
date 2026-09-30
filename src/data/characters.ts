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
  // ================= MARVEL (36) =================
  {
    id: 'iron_man',
    name: 'Тони Старк (Железный Человек)',
    universe: 'marvel',
    avatar: '/characters/iron_man.png',
    shortDesc: 'Броня Mark 85 с нано-реактором.',
    wiki: 'Тони Старк в боевой нано-броне красно-золотого цвета. Лицо скрыто шлемом, на груди сияет реактор.',
    traits: { mainColors: ['красный', 'золотой'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Шлем закрывает лицо, глаза светятся белым.' }
  },
  {
    id: 'spider_man',
    name: 'Питер Паркер (Человек-Паук)',
    universe: 'marvel',
    avatar: '/characters/spider_man.png',
    shortDesc: 'Классическое красно-синее трико с паутиной.',
    wiki: 'Дружелюбный сосед в маске с белыми линзами, скрывающей лицо целиком.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Маска надета, лица не видно.' }
  },
  {
    id: 'captain_america',
    name: 'Стив Роджерс (Капитан Америка)',
    universe: 'marvel',
    avatar: '/characters/captain_america.png',
    shortDesc: 'Темно-синий кевлар со звездой и щитом.',
    wiki: 'Суперсолдат в шлеме с буквой А, в руках круглый щит из вибраниума.',
    traits: { mainColors: ['синий', 'коричневый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Лицо видно частично, щит в руке.' }
  },
  {
    id: 'thor',
    name: 'Тор Одинсон',
    universe: 'marvel',
    avatar: '/characters/thor.png',
    shortDesc: 'Бог грома в черных латах и красном плаще.',
    wiki: 'Сын Одина с короткой стрижкой и бородой, вооружен секирой Штормбрейкер.',
    traits: { mainColors: ['черный', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, notes: 'Русая борода, секира в руке, красный плащ.' }
  },
  {
    id: 'hulk',
    name: 'Брюс Бэннер (Халк)',
    universe: 'marvel',
    avatar: '/characters/hulk.png',
    shortDesc: 'Зеленый мускулистый гигант.',
    wiki: 'Халк с обнаженным торсом в порванных темных штанах. Зеленая кожа и черные волосы.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Голый торс, без шлема и оружия.' }
  },
  {
    id: 'thanos',
    name: 'Танос',
    universe: 'marvel',
    avatar: '/characters/thanos.png',
    shortDesc: 'Безумный Титан в золотом доспехе.',
    wiki: 'Фиолетовый гигант в золотом шлеме и кирасе, на левой руке надета Перчатка Бесконечности.',
    traits: { mainColors: ['золотой', 'фиолетовый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Золотой шлем на голове, перчатка с камнями.' }
  },
  {
    id: 'loki',
    name: 'Локи Лафейсон',
    universe: 'marvel',
    avatar: '/characters/loki.png',
    shortDesc: 'Бог обмана в зеленой мантии с рогатым шлемом.',
    wiki: 'Асгардский трикстер в шлеме с двумя большими золотыми рогами и зеленым плащом.',
    traits: { mainColors: ['зеленый', 'золотой'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Длинные черные волосы, два загнутых рога.' }
  },
  {
    id: 'doctor_strange',
    name: 'Стивен Стрэндж',
    universe: 'marvel',
    avatar: '/characters/doctor_strange.png',
    shortDesc: 'Синяя туника мага и красный Плащ Левитации.',
    wiki: 'Верховный маг Земли с седыми висками и амулетом Глаз Агамотто на шее.',
    traits: { mainColors: ['синий', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: false, notes: 'Аккуратная бородка, высокий воротник плаща.' }
  },
  {
    id: 'black_widow',
    name: 'Наташа Романофф',
    universe: 'marvel',
    avatar: '/characters/black_widow.png',
    shortDesc: 'Черный тактический комбинезон шпионки.',
    wiki: 'Черная Вдова в облегающем костюме на молнии с рыжими волосами и кобурами на бедрах.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, рыжие волосы, пистолеты в кобурах.' }
  },
  {
    id: 'scarlet_witch',
    name: 'Ванда Максимофф (Алая Ведьма)',
    universe: 'marvel',
    avatar: '/characters/scarlet_witch.png',
    shortDesc: 'Бордовый корсет и алая корона.',
    wiki: 'Ванда в темно-красном костюме с заостренной тиарой на голове и светящимися ладонями.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Алая корона на голове, длинные волосы.' }
  },
  {
    id: 'wolverine',
    name: 'Логан (Росомаха)',
    universe: 'marvel',
    avatar: '/characters/wolverine.png',
    shortDesc: 'Желто-синий костюм с маской и когтями.',
    wiki: 'Мутант в желтой форме с черными ушами на маске и стальными когтями из кулаков.',
    traits: { mainColors: ['желтый', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Маска с длинными ушами, когти выпущены.' }
  },
  {
    id: 'deadpool',
    name: 'Уэйд Уилсон (Дэдпул)',
    universe: 'marvel',
    avatar: '/characters/deadpool.png',
    shortDesc: 'Красно-черное трико с катанами за спиной.',
    wiki: 'Наемник в глухой красно-черной маске с рукоятями мечей, торчащими из-за спины.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Лицо скрыто наглухо, мечи за плечами.' }
  },
  {
    id: 'black_panther',
    name: 'Т’Чалла (Черная Пантера)',
    universe: 'marvel',
    avatar: '/characters/black_panther.png',
    shortDesc: 'Черный комбинезон из вибраниума с маской пантеры.',
    wiki: 'Король Ваканды в монолитно-черной броне с ушками на шлеме и серебряным колье-когтями.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Черная маска с ушками кошки, лицо скрыто.' }
  },
  {
    id: 'star_lord',
    name: 'Питер Квилл (Звёздный Лорд)',
    universe: 'marvel',
    avatar: '/characters/star_lord.png',
    shortDesc: 'Бордовая куртка и маска с красными окулярами.',
    wiki: 'Лидер Стражей Галактики в кожаном плаще и высокотехнологичном шлеме-респираторе.',
    traits: { mainColors: ['коричневый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Маска со светящимися красными линзами.' }
  },
  {
    id: 'groot',
    name: 'Грут',
    universe: 'marvel',
    avatar: '/characters/groot.png',
    shortDesc: 'Древовидный великан из коры и веток.',
    wiki: 'Существо из живого дерева с зелеными побегами на плечах, одежды не носит.',
    traits: { mainColors: ['коричневый', 'зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Полностью древесное тело без одежды.' }
  },
  {
    id: 'hawkeye',
    name: 'Клинт Бартон',
    universe: 'marvel',
    avatar: '/characters/hawkeye.png',
    shortDesc: 'Темно-фиолетовый жилет лучника с колчаном.',
    wiki: 'Меткий стрелок без маски с блочным луком в руках и стрелами за спиной.',
    traits: { mainColors: ['черный', 'фиолетовый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Лицо открыто, лук со стрелами в руках.' }
  },
  {
    id: 'ant_man',
    name: 'Скотт Лэнг (Человек-Муравей)',
    universe: 'marvel',
    avatar: '/characters/ant_man.png',
    shortDesc: 'Черно-красный костюм со стальным шлемом.',
    wiki: 'Герой в закрытом металлическом шлеме с респиратором и красными окулярами.',
    traits: { mainColors: ['красный', 'черный', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Шлем закрывает голову целиком.' }
  },
  {
    id: 'winter_soldier',
    name: 'Баки Барнс',
    universe: 'marvel',
    avatar: '/characters/winter_soldier.png',
    shortDesc: 'Тактический жилет и хромированная кибер-рука.',
    wiki: 'Боец с темными волосами до плеч, левая рука полностью железная со звездой.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Лицо открыто, блестящая металлическая рука.' }
  },
  {
    id: 'vision',
    name: 'Вижн',
    universe: 'marvel',
    avatar: '/characters/vision.png',
    shortDesc: 'Красное лицо, зеленый костюм и желтый плащ.',
    wiki: 'Синтезоид с желтым Камнем Разума во лбу и золотистой мантией за спиной.',
    traits: { mainColors: ['зеленый', 'красный', 'желтый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Красная кожа лица, камень во лбу, плащ.' }
  },
  {
    id: 'captain_marvel',
    name: 'Кэрол Дэнверс',
    universe: 'marvel',
    avatar: '/characters/captain_marvel.png',
    shortDesc: 'Красно-синий костюм с золотой звездой.',
    wiki: 'Супергероиня со светлыми волосами, без шлема, на груди золотая звезда.',
    traits: { mainColors: ['синий', 'красный', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, светлые волосы, открытое лицо.' }
  },
  {
    id: 'magneto',
    name: 'Эрик Леншерр (Магнето)',
    universe: 'marvel',
    avatar: '/characters/magneto.png',
    shortDesc: 'Темно-красный шлем и фиолетовый плащ.',
    wiki: 'Повелитель магнетизма в шлеме с вырезом под лицо и металлическим воротником.',
    traits: { mainColors: ['красный', 'фиолетовый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Шлем закрывает лоб и щеки, седые брови.' }
  },
  {
    id: 'green_goblin',
    name: 'Норман Озборн (Зеленый Гоблин)',
    universe: 'marvel',
    avatar: '/characters/green_goblin.png',
    shortDesc: 'Зеленая чешуйчатая броня и оскаленная маска.',
    wiki: 'Злодей в остроконечном зеленом шлеме с желтыми линзами глаз и тыквенной бомбой.',
    traits: { mainColors: ['зеленый', 'желтый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Зеленый шлем-маска с зубастым оскалом.' }
  },
  {
    id: 'daredevil',
    name: 'Мэтт Мёрдок (Сорвиголова)',
    universe: 'marvel',
    avatar: '/characters/daredevil.png',
    shortDesc: 'Бордовый костюм с дьявольскими рожками.',
    wiki: 'Слепой защитник в маске с маленькими рожками на лбу и красными стеклами.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Рожки на шлеме, палочки-дубинки в руках.' }
  },
  {
    id: 'ikaris',
    name: 'Икарис',
    universe: 'marvel',
    avatar: '/characters/ikaris.png',
    shortDesc: 'Синий костюм Вечного с золотыми кругами.',
    wiki: 'Лидер Вечных в сине-голубом облачении с золотым узором, глаза светятся лазером.',
    traits: { mainColors: ['синий', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Открытое лицо, глаза горят космическим лучом.' }
  },
  // +12 новых MARVEL:
  {
    id: 'moon_knight',
    name: 'Лунный Рыцарь (Марк Спектор)',
    universe: 'marvel',
    avatar: '/characters/moon_knight.png',
    shortDesc: 'Белоснежный тактический костюм с капюшоном.',
    wiki: 'Аватар бога Хонсу в белом саване с капюшоном и светящимися глазами-полумесяцами.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Полностью белый костюм, капюшон и полумесяцы.' }
  },
  {
    id: 'shang_chi',
    name: 'Шан-Чи',
    universe: 'marvel',
    avatar: '/characters/shang_chi.png',
    shortDesc: 'Красно-черный костюм и Десять Колец.',
    wiki: 'Мастер боевых искусств в чешуйчатой броне, на руках сияют золотые кольца.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Открытое лицо, светящиеся кольца на руках.' }
  },
  {
    id: 'falcon',
    name: 'Сокол (Сэм Уилсон)',
    universe: 'marvel',
    avatar: '/characters/falcon.png',
    shortDesc: 'Летный жилет с механическими крыльями.',
    wiki: 'Мститель в высокотехнологичных очках с распахнутыми за спиной алыми крыльями.',
    traits: { mainColors: ['серый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Очки-визор на глазах, огромные крылья за спиной.' }
  },
  {
    id: 'war_machine',
    name: 'Воитель (Джеймс Роуди)',
    universe: 'marvel',
    avatar: '/characters/war_machine.png',
    shortDesc: 'Тяжелая серо-черная броня с пулеметом.',
    wiki: 'Броня от Старка с мощным шестиствольным пулеметом на правом плече и красными окулярами.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Шлем закрывает лицо, пулемет на плече.' }
  },
  {
    id: 'nebula',
    name: 'Небула',
    universe: 'marvel',
    avatar: '/characters/nebula.png',
    shortDesc: 'Синяя кибер-кожа и металлический череп.',
    wiki: 'Приемная дочь Таноса, киборг с синим лицом и механическими имплантами на голове.',
    traits: { mainColors: ['синий', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Синяя кожа, лысая, железная пластина на виске.' }
  },
  {
    id: 'nick_fury',
    name: 'Ник Фьюри',
    universe: 'marvel',
    avatar: '/characters/nick_fury.png',
    shortDesc: 'Черный кожаный плащ и повязка на глазу.',
    wiki: 'Директор Щ.И.Т.а в строгом плаще, с черной повязкой на левом глазу и седой эспаньолкой.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, notes: 'Повязка на левом глазу, длинный плащ.' }
  },
  {
    id: 'blade',
    name: 'Блейд (Эрик Брукс)',
    universe: 'marvel',
    avatar: '/characters/blade.png',
    shortDesc: 'Темные очки, кожаный плащ и меч за спиной.',
    wiki: 'Полувампир-охотник в солнцезащитных очках, бронежилете и с титановым мечом.',
    traits: { mainColors: ['черный', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Черные очки, меч торчит из-за плеча.' }
  },
  {
    id: 'ghost_rider',
    name: 'Призрачный Гонщик',
    universe: 'marvel',
    avatar: '/characters/ghost_rider.png',
    shortDesc: 'Пылающий череп в шипастой косухе.',
    wiki: 'Дух возмездия с горящим огнем черепом вместо лица и железной цепью через грудь.',
    traits: { mainColors: ['черный', 'оранжевый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Огненный череп, цепь через плечо.' }
  },
  {
    id: 'punisher',
    name: 'Каратель (Фрэнк Касл)',
    universe: 'marvel',
    avatar: '/characters/punisher.png',
    shortDesc: 'Бронежилет с белым черепом и автомат.',
    wiki: 'Линчеватель в темном тактическом снаряжении с гигантской эмблемой черепа на груди.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Белый череп на бронежилете, открытое лицо со щетиной.' }
  },
  {
    id: 'venom',
    name: 'Веном',
    universe: 'marvel',
    avatar: '/characters/venom.png',
    shortDesc: 'Черная пасть с зубами и длинным языком.',
    wiki: 'Инопланетный симбиот чудовищных размеров с гигантскими белыми глазами и острыми клыками.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Огромный язык, зубастая пасть, нет человеческого лица.' }
  },
  {
    id: 'mysterio',
    name: 'Мистерио (Квентин Бек)',
    universe: 'marvel',
    avatar: '/characters/mysterio.png',
    shortDesc: 'Дымчатый шлем-аквариум и фиолетовый плащ.',
    wiki: 'Иллюзионист в матовом непрозрачном куполе на голове и зеленом бронированном костюме.',
    traits: { mainColors: ['зеленый', 'фиолетовый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Круглый шлем без лица, фиолетовый плащ.' }
  },
  {
    id: 'doctor_doom',
    name: 'Доктор Дум (Виктор)',
    universe: 'marvel',
    avatar: '/characters/doctor_doom.png',
    shortDesc: 'Стальная маска и темно-зеленый капюшон.',
    wiki: 'Правитель Латверии в железной маске с прорезями для глаз и зеленой средневековой накидке.',
    traits: { mainColors: ['зеленый', 'серебряный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Железное лицо-маска, зеленый капюшон.' }
  },

  // ================= STAR WARS (36) =================
  {
    id: 'darth_vader',
    name: 'Дарт Вейдер',
    universe: 'star_wars',
    avatar: '/characters/darth_vader.png',
    shortDesc: 'Черная глянцевая броня ситха с респиратором.',
    wiki: 'Повелитель ситхов в черном шлеме, мантии, с панелью на груди и красным мечом.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Лицо полностью скрыто респиратором, красный меч.' }
  },
  {
    id: 'luke_skywalker',
    name: 'Люк Скайуокер',
    universe: 'star_wars',
    avatar: '/characters/luke_skywalker.png',
    shortDesc: 'Черный джедайский костюм и зеленый меч.',
    wiki: 'Люк в черной тунике джедая, с перчаткой на правой руке и зеленым клинком.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Светлые волосы, без шлема, зеленый световой меч.' }
  },
  {
    id: 'yoda',
    name: 'Магистр Йода',
    universe: 'star_wars',
    avatar: '/characters/yoda.png',
    shortDesc: 'Зеленый пришелец в бежевой мантии с тростью.',
    wiki: 'Гранд-магистр с длинными заостренными ушами, седыми прядями и коричневой туникой.',
    traits: { mainColors: ['зеленый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Маленький зеленый старец с большими ушами.' }
  },
  {
    id: 'obi_wan',
    name: 'Оби-Ван Кеноби',
    universe: 'star_wars',
    avatar: '/characters/obi_wan.png',
    shortDesc: 'Бежевая роба джедая и синий световой меч.',
    wiki: 'Мастер-джедай с рыжевато-русой бородой, открытым лицом и синим клинком Силы.',
    traits: { mainColors: ['бежевый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Рыжая борода, светлая туника, синий меч.' }
  },
  {
    id: 'han_solo',
    name: 'Хан Соло',
    universe: 'star_wars',
    avatar: '/characters/han_solo.png',
    shortDesc: 'Белая рубаха, черная жилетка и бластер.',
    wiki: 'Контрабандист в расстегнутой рубахе, черном жилете и с пистолетом-бластером DL-44.',
    traits: { mainColors: ['белый', 'черный', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Черная жилетка, кобура на бедре, бластер в руке.' }
  },
  {
    id: 'leia_organa',
    name: 'Принцесса Лея',
    universe: 'star_wars',
    avatar: '/characters/leia_organa.png',
    shortDesc: 'Белое струящееся платье и прическа-бублики.',
    wiki: 'Принцесса в длинном белом платье с серебряным поясом и двумя круглыми пучками волос.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина в белом платье, прическа «булочки» по бокам.' }
  },
  {
    id: 'chewbacca',
    name: 'Чубакка',
    universe: 'star_wars',
    avatar: '/characters/chewbacca.png',
    shortDesc: 'Мохнатый вуки с кожаным патронташем.',
    wiki: 'Высокий вуки, целиком покрытый коричневой шерстью, с серебристым арбалетом-бластером.',
    traits: { mainColors: ['коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Всё тело в шерсти, ремень через плечо, тяжелый арбалет.' }
  },
  {
    id: 'boba_fett',
    name: 'Боба Фетт',
    universe: 'star_wars',
    avatar: '/characters/boba_fett.png',
    shortDesc: 'Зеленый мандалорский шлем с Т-визором.',
    wiki: 'Охотник за головами в зеленой броне, желтых наплечниках и ранцем за спиной.',
    traits: { mainColors: ['зеленый', 'желтый', 'серый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Шлем мандалорца с дальномером, лицо скрыто.' }
  },
  {
    id: 'palpatine',
    name: 'Император Палпатин',
    universe: 'star_wars',
    avatar: '/characters/palpatine.png',
    shortDesc: 'Черный балахон и синие молнии из рук.',
    wiki: 'Морщинистый владыка ситхов в глубоком черном капюшоне, стреляющий молниями из пальцев.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Черный капюшон скрывает лоб, желтые глаза.' }
  },
  {
    id: 'mandalorian',
    name: 'Дин Джарин (Мандалорец)',
    universe: 'star_wars',
    avatar: '/characters/mandalorian.png',
    shortDesc: 'Зеркальная броня из чистого бескара.',
    wiki: 'Воин в серебристом металлическом шлеме, глухом визоре и коричневом плаще.',
    traits: { mainColors: ['серебряный', 'серый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Блестящий хромированный шлем без лица.' }
  },
  {
    id: 'grogu',
    name: 'Грогу (Малыш)',
    universe: 'star_wars',
    avatar: '/characters/grogu.png',
    shortDesc: 'Крошечный зеленый малыш в бежевой робе.',
    wiki: 'Зеленый найденыш с гигантскими глазами и длинными ушами в теплой просторной кофте.',
    traits: { mainColors: ['зеленый', 'бежевый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Крохотный размер, длинные уши, темные глаза.' }
  },
  {
    id: 'ahsoka_tano',
    name: 'Асока Тано',
    universe: 'star_wars',
    avatar: '/characters/ahsoka_tano.png',
    shortDesc: 'Оранжевая кожа, бело-синие лекку и белые мечи.',
    wiki: 'Тогрута с полосатыми отростками на голове, белыми узорами на лице и двумя белыми мечами.',
    traits: { mainColors: ['оранжевый', 'синий', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Оранжевое лицо, длинные полосатые отростки волос.' }
  },
  {
    id: 'darth_maul',
    name: 'Дарт Мол',
    universe: 'star_wars',
    avatar: '/characters/darth_maul.png',
    shortDesc: 'Красно-черные татуировки, рога и двойной меч.',
    wiki: 'Забрак с рожками на черепе, раскрашенным лицом и двухсторонним красным световым клинком.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Красное лицо с черными узорами, рожки.' }
  },
  {
    id: 'mace_windu',
    name: 'Мейс Винду',
    universe: 'star_wars',
    avatar: '/characters/mace_windu.png',
    shortDesc: 'Светлая туника джедая и фиолетовый меч.',
    wiki: 'Лысый магистр Ордена в светлой робе с ярким фиолетовым световым мечом.',
    traits: { mainColors: ['бежевый', 'коричневый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Лысая голова, открытое лицо, фиолетовый меч.' }
  },
  {
    id: 'kylo_ren',
    name: 'Кайло Рен',
    universe: 'star_wars',
    avatar: '/characters/kylo_ren.png',
    shortDesc: 'Черная маска с серебром и меч с гардой.',
    wiki: 'Рыцарь Рен в черном капюшоне, маске с серебряными линиями и крестообразным красным мечом.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Черная маска закрывает лицо, меч с зубьями.' }
  },
  {
    id: 'rey_skywalker',
    name: 'Рей Скайуокер',
    universe: 'star_wars',
    avatar: '/characters/rey_skywalker.png',
    shortDesc: 'Светлые льняные повязки мусорщицы.',
    wiki: 'Джедайка с тремя пучками на затылке, светлыми тканевыми полосами на теле и синим мечом.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, прическа из трех узелков, световой меч.' }
  },
  {
    id: 'anakin_skywalker',
    name: 'Энакин Скайуокер',
    universe: 'star_wars',
    avatar: '/characters/anakin_skywalker.png',
    shortDesc: 'Темно-коричневая кожаная туника со шрамом.',
    wiki: 'Энакин из «Мести ситхов»: вьющиеся волосы, шрам на правом глазу, синий световой меч.',
    traits: { mainColors: ['черный', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Шрам у правого глаза, волосы до плеч, синий меч.' }
  },
  {
    id: 'general_grievous',
    name: 'Генерал Гривус',
    universe: 'star_wars',
    avatar: '/characters/general_grievous.png',
    shortDesc: 'Белый скелет-киборг с четырьмя мечами.',
    wiki: 'Командующий дроидов с белой маской-черепом, четырьмя руками и четырьмя мечами.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Киборг с 4 руками, держит 4 световых меча.' }
  },
  {
    id: 'count_dooku',
    name: 'Граф Дуку',
    universe: 'star_wars',
    avatar: '/characters/count_dooku.png',
    shortDesc: 'Коричневый плащ с цепочкой и изогнутый меч.',
    wiki: 'Лорд Тиранус с благородной сединой, аккуратной бородой и мечом с изогнутой рукоятью.',
    traits: { mainColors: ['коричневый', 'черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, notes: 'Седые волосы и бородка, изогнутый красный меч.' }
  },
  {
    id: 'padme_amidala',
    name: 'Падме Амидала',
    universe: 'star_wars',
    avatar: '/characters/padme_amidala.png',
    shortDesc: 'Белый облегающий костюм с бластером.',
    wiki: 'Сенатор Набу на арене Джеонозиса: белый костюм с открытым животом и пистолетом в руке.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, темные волосы в хвосте, белый костюм.' }
  },
  {
    id: 'qui_gon_jinn',
    name: 'Квай-Гон Джинн',
    universe: 'star_wars',
    avatar: '/characters/qui_gon_jinn.png',
    shortDesc: 'Просторная туника джедая и длинные волосы.',
    wiki: 'Учитель Оби-Вана с длинными каштановыми волосами, аккуратной бородой и зеленым клинком.',
    traits: { mainColors: ['бежевый', 'коричневый'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, notes: 'Длинные волосы назад, борода, зеленый меч.' }
  },
  {
    id: 'lando_calrissian',
    name: 'Лэндо Калриссиан',
    universe: 'star_wars',
    avatar: '/characters/lando_calrissian.png',
    shortDesc: 'Синяя рубашка и стильный плащ с золотом.',
    wiki: 'Барон Облачного города в синем костюме с атласным плащом и аккуратными усами.',
    traits: { mainColors: ['синий', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: false, notes: 'Пышные усы, сине-золотой плащ.' }
  },
  {
    id: 'finn',
    name: 'Финн (FN-2187)',
    universe: 'star_wars',
    avatar: '/characters/finn.png',
    shortDesc: 'Коричневая кожаная куртка с красной полосой.',
    wiki: 'Бывший штурмовик в куртке По Дэмерона и темной футболке с бластером в руках.',
    traits: { mainColors: ['коричневый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Короткая стрижка, куртка с красными вставками.' }
  },
  {
    id: 'stormtrooper',
    name: 'Имперский Штурмовик',
    universe: 'star_wars',
    avatar: '/characters/stormtrooper.png',
    shortDesc: 'Белая составная пластиковая броня и шлем.',
    wiki: 'Солдат Империи в чисто-белой кирасе, закрытом белом шлеме и с черным карабином.',
    traits: { mainColors: ['белый', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Белый шлем с черной полосой, лица не видно.' }
  },
  // +12 новых STAR WARS:
  {
    id: 'c3po',
    name: 'C-3PO',
    universe: 'star_wars',
    avatar: '/characters/c3po.png',
    shortDesc: 'Золотой металлический корпус дроида.',
    wiki: 'Протокольный дроид из чистого золота со светящимися круглыми фоторецепторами.',
    traits: { mainColors: ['золотой'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Полностью золотой дроид, лицо из металла.' }
  },
  {
    id: 'r2d2',
    name: 'R2-D2',
    universe: 'star_wars',
    avatar: '/characters/r2d2.png',
    shortDesc: 'Бело-синий куполообразный астродроид.',
    wiki: 'Преданный механический напарник Люка на трех колесных опорах с синей отделкой.',
    traits: { mainColors: ['белый', 'синий', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Бочонок-дроид с куполом, нет человеческого тела.' }
  },
  {
    id: 'jabba_the_hutt',
    name: 'Джабба Хатт',
    universe: 'star_wars',
    avatar: '/characters/jabba_the_hutt.png',
    shortDesc: 'Гигантский зеленый слизень-криминал.',
    wiki: 'Огромный владыка преступного мира Татуина с массивным хвостом и оранжевыми глазами.',
    traits: { mainColors: ['зеленый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Огромный толстый слизень без одежды.' }
  },
  {
    id: 'tarkin',
    name: 'Гранд-мофф Таркин',
    universe: 'star_wars',
    avatar: '/characters/tarkin.png',
    shortDesc: 'Серый имперский мундир офицера.',
    wiki: 'Командующий Звезды Смерти с ледяным взглядом, впалыми щеками и седыми висками.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Серый строгий китель, худощавое бледное лицо.' }
  },
  {
    id: 'cassian_andor',
    name: 'Кассиан Андор',
    universe: 'star_wars',
    avatar: '/characters/cassian_andor.png',
    shortDesc: 'Коричневая полевая куртка разведчика.',
    wiki: 'Капитан разведки Повстанцев с темной щетиной, каштановыми волосами и бластером.',
    traits: { mainColors: ['коричневый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Открытое лицо с легкой щетиной, теплая куртка.' }
  },
  {
    id: 'jyn_erso',
    name: 'Джин Эрсо',
    universe: 'star_wars',
    avatar: '/characters/jyn_erso.png',
    shortDesc: 'Тактический жилет и темный шарф.',
    wiki: 'Лидер отряда Изгой-один, похитившая чертежи Звезды Смерти на Скарифе.',
    traits: { mainColors: ['зеленый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, шарф на шее, пистолет-бластер в руке.' }
  },
  {
    id: 'cad_bane',
    name: 'Кэд Бэйн',
    universe: 'star_wars',
    avatar: '/characters/cad_bane.png',
    shortDesc: 'Синяя кожа, ковбойская шляпа и трубки.',
    wiki: 'Охотник на джедаев с широкополой шляпой, красными глазами и дыхательными шлангами.',
    traits: { mainColors: ['синий', 'коричневый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Широкая шляпа, синее лицо с дыхательными трубками.' }
  },
  {
    id: 'asajj_ventress',
    name: 'Асажж Вентресс',
    universe: 'star_wars',
    avatar: '/characters/asajj_ventress.png',
    shortDesc: 'Бледно-серая лысая ассасинка с 2 мечами.',
    wiki: 'Темная ученица графа Дуку в облегающем корсете с двумя изогнутыми красными мечами.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, лысая бледная голова, два красных меча.' }
  },
  {
    id: 'captain_rex',
    name: 'Капитан Рекс (CT-7567)',
    universe: 'star_wars',
    avatar: '/characters/captain_rex.png',
    shortDesc: 'Белая броня клона с синей маркировкой.',
    wiki: 'Легендарный командир 501-го легиона в шлеме с Т-визором и двумя пистолетами.',
    traits: { mainColors: ['белый', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Шлем клона с синими полосами, два бластера.' }
  },
  {
    id: 'bo_katan',
    name: 'Бо-Катан Крайз',
    universe: 'star_wars',
    avatar: '/characters/bo_katan.png',
    shortDesc: 'Синяя мандалорская броня с совой.',
    wiki: 'Лидер Ночных Сов с короткими рыжими волосами и сине-серым шлемом из бескара.',
    traits: { mainColors: ['синий', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, синий шлем с совиными узорами.' }
  },
  {
    id: 'poe_dameron',
    name: 'По Дэмерон',
    universe: 'star_wars',
    avatar: '/characters/poe_dameron.png',
    shortDesc: 'Оранжевый комбинезон пилота X-Wing.',
    wiki: 'Лучший ас Сопротивления в ярко-оранжевой форме пилота с белым нагрудным блоком.',
    traits: { mainColors: ['оранжевый', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Оранжевая форма пилота, темные кудри со щетиной.' }
  },
  {
    id: 'thrawn',
    name: 'Гранд-адмирал Траун',
    universe: 'star_wars',
    avatar: '/characters/thrawn.png',
    shortDesc: 'Синяя кожа, горящие красные глаза и мундир.',
    wiki: 'Гениальный стратег расы чиссов в чисто-белом парадном кителе Империи с эполетами.',
    traits: { mainColors: ['белый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Синее лицо, горящие красные зрачки, белый китель.' }
  },

  // ================= THE BOYS (36) =================
  {
    id: 'homelander',
    name: 'Хоумлендер',
    universe: 'the_boys',
    avatar: '/characters/homelander.png',
    shortDesc: 'Синий костюм с плащом-флагом США.',
    wiki: 'Джон Гиллман — сильнейший супергерой Vought со светлыми волосами и орлами на плечах.',
    traits: { mainColors: ['синий', 'красный', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Светлые волосы, плащ в виде американского флага.' }
  },
  {
    id: 'billy_butcher',
    name: 'Билли Бутчер',
    universe: 'the_boys',
    avatar: '/characters/billy_butcher.png',
    shortDesc: 'Черный плащ, гавайская рубашка и борода.',
    wiki: 'Бывший спецназовец SAS, готовый пожертвовать всем ради мести Хоумлендеру.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, notes: 'Густая черная борода, длинное темное пальто.' }
  },
  {
    id: 'hughie_campbell',
    name: 'Хьюи Кэмпбелл',
    universe: 'the_boys',
    avatar: '/characters/hughie_campbell.png',
    shortDesc: 'Ветровка поверх футболки с рок-принтом.',
    wiki: 'Обычный парень, чью девушку убил Поезд-А. Присоединился к отряду Бутчера.',
    traits: { mainColors: ['серый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Худощавый, темная ветровка, без бороды.' }
  },
  {
    id: 'starlight',
    name: 'Старлайт (Энни)',
    universe: 'the_boys',
    avatar: '/characters/starlight.png',
    shortDesc: 'Белое платье с золотыми звездами.',
    wiki: 'Искренняя супергероиня, взбунтовавшаяся против лицемерия Vought со светящимися глазами.',
    traits: { mainColors: ['белый', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Женщина, светлые волосы, белое платье со звездами.' }
  },
  {
    id: 'soldier_boy',
    name: 'Солдатик',
    universe: 'the_boys',
    avatar: '/characters/soldier_boy.png',
    shortDesc: 'Зеленый чешуйчатый доспех и щит с орлом.',
    wiki: 'Лидер команды Payback времён Второй мировой с радиоактивным лучом из груди.',
    traits: { mainColors: ['зеленый', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Густая борода, темно-зеленая броня, треугольный щит.' }
  },
  {
    id: 'a_train',
    name: 'Поезд-А (Реджи)',
    universe: 'the_boys',
    avatar: '/characters/a_train.png',
    shortDesc: 'Сине-белый костюм спидстера с очками.',
    wiki: 'Самый быстрый человек на Земле в спортивных синих очках и сетчатом трико.',
    traits: { mainColors: ['синий', 'белый'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Спортивные синие очки на глазах, аккуратная бородка.' }
  },
  {
    id: 'the_deep',
    name: 'Подводный (Кевин)',
    universe: 'the_boys',
    avatar: '/characters/the_deep.png',
    shortDesc: 'Зеленый костюм-безрукавка с чешуей.',
    wiki: 'Повелитель морей из Семёрки с открытыми накачанными плечами и короткой стрижкой.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Открытые мускулистые руки, короткая борода.' }
  },
  {
    id: 'black_noir',
    name: 'Черный Нуар',
    universe: 'the_boys',
    avatar: '/characters/black_noir.png',
    shortDesc: 'Абсолютно черный тактический костюм ниндзя.',
    wiki: 'Немой киллер Семёрки в глухой матовой черной маске без разрезов для глаз.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Полностью черная глухая маска, лица не видно.' }
  },
  {
    id: 'queen_maeve',
    name: 'Королева Мэйв',
    universe: 'the_boys',
    avatar: '/characters/queen_maeve.png',
    shortDesc: 'Стальной античный корсет и тиара.',
    wiki: 'Сильнейшая женщина Земли в доспехах амазонки с диадемой на голове.',
    traits: { mainColors: ['серый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, диадема на лбу, рыже-каштановые волосы.' }
  },
  {
    id: 'frenchie',
    name: 'Французик (Серж)',
    universe: 'the_boys',
    avatar: '/characters/frenchie.png',
    shortDesc: 'Куртка хаки, серьги и короткий ежик.',
    wiki: 'Химик и оружейник Пацанов с темным прошлым, преданный защитник Кимико.',
    traits: { mainColors: ['зеленый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Короткий ежик, щетина, военная куртка хаки.' }
  },
  {
    id: 'kimiko',
    name: 'Кимико (Самка)',
    universe: 'the_boys',
    avatar: '/characters/kimiko.png',
    shortDesc: 'Темная толстовка и растрепанная челка.',
    wiki: 'Немая воительница с мгновенной регенерацией, разрывающая суперов голыми руками.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, азиатская внешность, черные растрепанные волосы.' }
  },
  {
    id: 'mothers_milk',
    name: 'Молоко Матери (ММ)',
    universe: 'the_boys',
    avatar: '/characters/mothers_milk.png',
    shortDesc: 'Темный берет, бородка и рубашка.',
    wiki: 'Координатор операций Пацанов, мощный бывший военный медик с аккуратной эспаньолкой.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: true, notes: 'Берет/кепка на голове, ровная бородка-эспаньолка.' }
  },
  {
    id: 'victoria_neuman',
    name: 'Виктория Ньюман',
    universe: 'the_boys',
    avatar: '/characters/victoria_neuman.png',
    shortDesc: 'Строгий женский деловой костюм.',
    wiki: 'Конгрессвумен, способная тайно взрывать головы взглядом.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, деловой пиджак, завитые темные волосы.' }
  },
  {
    id: 'stormfront',
    name: 'Штормфронт (Клара)',
    universe: 'the_boys',
    avatar: '/characters/stormfront.png',
    shortDesc: 'Черный костюм с выбритым виском.',
    wiki: 'Нацистка из 1940-х, мечущая фиолетовые плазменные молнии из рук.',
    traits: { mainColors: ['черный', 'бордовый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, асимметричная стрижка с выбритым виском.' }
  },
  {
    id: 'stan_edgar',
    name: 'Стэн Эдгар',
    universe: 'the_boys',
    avatar: '/characters/stan_edgar.png',
    shortDesc: 'Идеальный серый костюм-тройка в очках.',
    wiki: 'Хладнокровный генеральный директор Vought, ни капли не боявшийся Хоумлендера.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Очки в тонкой оправе, деловой галстук, без бороды.' }
  },
  {
    id: 'sister_sage',
    name: 'Сестра Сэйдж',
    universe: 'the_boys',
    avatar: '/characters/sister_sage.png',
    shortDesc: 'Коричневый жакет, косички и очки.',
    wiki: 'Самый умный человек на планете с бесконечно регенерирующим мозгом.',
    traits: { mainColors: ['коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, афро-косички, очки для чтения.' }
  },
  {
    id: 'firecracker',
    name: 'Петарда',
    universe: 'the_boys',
    avatar: '/characters/firecracker.png',
    shortDesc: 'Ковбойский жилет, шорты и шляпа.',
    wiki: 'Стримерша из Семёрки, стреляющая искрами из пальцев ради хайпа.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, рыжие волосы, ковбойская шляпа на голове.' }
  },
  {
    id: 'translucent',
    name: 'Прозрачный',
    universe: 'the_boys',
    avatar: '/characters/translucent.png',
    shortDesc: 'Серый костюм с ромбами из углепластика.',
    wiki: 'Член Семёрки с нерушимой кожей из углеродного алмаза, становящийся невидимым.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Короткие темные волосы, легкая щетина, серый комбинезон.' }
  },
  {
    id: 'lamplighter',
    name: 'Фонарщик',
    universe: 'the_boys',
    avatar: '/characters/lamplighter.png',
    shortDesc: 'Черный капюшон и посох с огнем.',
    wiki: 'Пирокинетик из старого состава Семёрки с массивным медным посохом-зажигалкой.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, notes: 'Глубокий капюшон, посох с огнем в руке.' }
  },
  {
    id: 'ashley_barrett',
    name: 'Эшли Барретт',
    universe: 'the_boys',
    avatar: '/characters/ashley_barrett.png',
    shortDesc: 'Красный деловой костюм и телефон у уха.',
    wiki: 'Генеральный директор Vought на грани нервного срыва, вырывающая волосы от ужаса.',
    traits: { mainColors: ['красный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, светлые волосы, телефон в руке.' }
  },
  {
    id: 'ryan_butcher',
    name: 'Райан Бутчер',
    universe: 'the_boys',
    avatar: '/characters/ryan_butcher.png',
    shortDesc: 'Красная толстовка и горящие лазерные глаза.',
    wiki: 'Биологический сын Хоумлендера, первый прирожденный обладатель суперсил.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Мальчик-подросток, красные светящиеся глаза.' }
  },
  {
    id: 'marie_moreau',
    name: 'Мари Моро',
    universe: 'the_boys',
    avatar: '/characters/marie_moreau.png',
    shortDesc: 'Бордовый бомбер Годолкина и сферы крови.',
    wiki: 'Студентка, повелевающая кровью как хлыстами и летающими лезвиями.',
    traits: { mainColors: ['бордовый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, длинные косы, сферы красной крови в руках.' }
  },
  {
    id: 'sam_riordan',
    name: 'Сэм Риордан',
    universe: 'the_boys',
    avatar: '/characters/sam_riordan.png',
    shortDesc: 'Серая больничная майка и синяки.',
    wiki: 'Сверхсильный безумный супер из лаборатории «Лес», видящий людей куклами.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Растрепанные темные волосы, майка, яростный взгляд.' }
  },
  {
    id: 'golden_boy',
    name: 'Золотой Мальчик (Люк)',
    universe: 'the_boys',
    avatar: '/characters/golden_boy.png',
    shortDesc: 'Тело целиком объято золотым пламенем.',
    wiki: 'Лучший студент университета Годолкина, чье тело вспыхивает ослепительным огнем.',
    traits: { mainColors: ['золотой', 'оранжевый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Полностью охвачен огненным золотым сиянием.' }
  },
  // +12 новых THE BOYS:
  {
    id: 'popclaw',
    name: 'Попклоу (Шарлотта)',
    universe: 'the_boys',
    avatar: '/characters/popclaw.png',
    shortDesc: 'Костяные лезвия из запястий.',
    wiki: 'Актриса и бывшая героиня с острыми выдвижными когтями из рук.',
    traits: { mainColors: ['розовый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, лезвия торчат из запястий.' }
  },
  {
    id: 'blindspot',
    name: 'Слепое Пятно',
    universe: 'the_boys',
    avatar: '/characters/blindspot.png',
    shortDesc: 'Черная повязка на глазах и синий костюм.',
    wiki: 'Слепой мастер боевых искусств, чьи барабанные перепонки лопнул Хоумлендер.',
    traits: { mainColors: ['синий', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Глаза плотно завязаны черной тканью.' }
  },
  {
    id: 'supersonic',
    name: 'Суперсоник (Алекс)',
    universe: 'the_boys',
    avatar: '/characters/supersonic.png',
    shortDesc: 'Бело-серебристый поп-костюм.',
    wiki: 'Бывший парень Старлайт, генерирующий звуковые взрывы при хлопке ладонями.',
    traits: { mainColors: ['белый', 'серебряный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Белый блестящий костюм, уложенная прическа.' }
  },
  {
    id: 'gunpowder',
    name: 'Порох',
    universe: 'the_boys',
    avatar: '/characters/gunpowder.png',
    shortDesc: 'Камуфляж, шлем и штурмовой автомат.',
    wiki: 'Оружейный эксперт старой команды Солдатика, не промахивающийся ни единой пулей.',
    traits: { mainColors: ['зеленый', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Военный шлем, автомат в руках, патронташ.' }
  },
  {
    id: 'blue_hawk',
    name: 'Синий Ястреб',
    universe: 'the_boys',
    avatar: '/characters/blue_hawk.png',
    shortDesc: 'Синяя маска на глазах и кожаный жилет.',
    wiki: 'Патрульный-линчеватель в синей полумаске, убитый Поездом-А на асфальте.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Синяя маска на верхней части лица.' }
  },
  {
    id: 'love_sausage',
    name: 'Сосиска Любви (Василий)',
    universe: 'the_boys',
    avatar: '/characters/love_sausage.png',
    shortDesc: 'Серый советский спортивный костюм.',
    wiki: 'Русский супергерой из психбольницы с гигантским управляемым эластичным органом.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Седой старик с редкими волосами в спортивном костюме.' }
  },
  {
    id: 'crimson_countess',
    name: 'Алая Графиня',
    universe: 'the_boys',
    avatar: '/characters/crimson_countess.png',
    shortDesc: 'Красный корсет и огненные шары в руках.',
    wiki: 'Певица и бывшая подруга Солдатика, мечущая взрывные сгустки алого пламени.',
    traits: { mainColors: ['красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Женщина, ярко-рыжие волосы, красные перчатки.' }
  },
  {
    id: 'andre_anderson',
    name: 'Андре Андерсон',
    universe: 'the_boys',
    avatar: '/characters/andre_anderson.png',
    shortDesc: 'Бордовый университетский бомбер с золотом.',
    wiki: 'Студент Годолкина, управляющий магнитными полями и гнущий металл силой мысли.',
    traits: { mainColors: ['бордовый', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Куртка-бомбер, короткая стрижка, кольца на пальцах.' }
  },
  {
    id: 'jordan_li',
    name: 'Джордан Ли',
    universe: 'the_boys',
    avatar: '/characters/jordan_li.png',
    shortDesc: 'Серебристо-черный спортивный костюм.',
    wiki: 'Двуполый супергерой: неуязвимый парень в защите и подвижная девушка с энерго-ударами.',
    traits: { mainColors: ['серебряный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Короткие темные волосы, серебристые наручи.' }
  },
  {
    id: 'emma_meyer',
    name: 'Эмма Майер (Сверчок)',
    universe: 'the_boys',
    avatar: '/characters/emma_meyer.png',
    shortDesc: 'Миниатюрная девушка в розовом топе.',
    wiki: 'Подруга Мари, способная уменьшаться до размеров насекомого или вырастать в гиганта.',
    traits: { mainColors: ['розовый', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, длинные русые волосы, открытое лицо.' }
  },
  {
    id: 'tek_knight',
    name: 'Тек-Рыцарь (Роберт)',
    universe: 'the_boys',
    avatar: '/characters/tek_knight.png',
    shortDesc: 'Твидовый костюм и очки детектива.',
    wiki: 'Богатый супергерой-детектив с кибернетической пещерой и непреодолимой опухолью мозга.',
    traits: { mainColors: ['коричневый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Стильные очки, твидовый пиджак, бородка.' }
  },
  {
    id: 'todd',
    name: 'Тодд',
    universe: 'the_boys',
    avatar: '/characters/todd.png',
    shortDesc: 'Красная кепка и футболка Хоумлендера.',
    wiki: 'Отчим Дженнифер, ставший фанатичным сторонником Хоумлендера в толпе.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Красная кепка на голове, очки, футболка с принтом.' }
  },

  // ================= INVINCIBLE (36) =================
  {
    id: 'omni_man',
    name: 'Омни-Мэн (Нолан Грейсон)',
    universe: 'invincible',
    avatar: '/characters/omni_man.png',
    shortDesc: 'Бело-красный костюм с плащом и усами.',
    wiki: 'Вилтрумитский завоеватель с буквой О на груди, черными волосами и седыми висками.',
    traits: { mainColors: ['белый', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: false, notes: 'Густые черные усы, красный длинный плащ.' }
  },
  {
    id: 'invincible_mark',
    name: 'Неуязвимый (Марк Грейсон)',
    universe: 'invincible',
    avatar: '/characters/invincible_mark.png',
    shortDesc: 'Желто-сине-черный костюм с буквой «i».',
    wiki: 'Сын Нолана в маске, закрывающей челюсть и лоб (волосы торчат наружу сверху).',
    traits: { mainColors: ['желтый', 'синий', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Маска на голове, темные волосы торчат сверху.' }
  },
  {
    id: 'atom_eve',
    name: 'Атомная Ева (Саманта)',
    universe: 'invincible',
    avatar: '/characters/atom_eve.png',
    shortDesc: 'Розовый костюм со знаком атома и плащом.',
    wiki: 'Могущественная героиня с длинными рыжими волосами и розовым энерго-полем в руках.',
    traits: { mainColors: ['розовый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Женщина, ярко-рыжие волосы, розовый короткий плащ.' }
  },
  {
    id: 'allen_alien',
    name: 'Аллен Пришелец',
    universe: 'invincible',
    avatar: '/characters/allen_alien.png',
    shortDesc: 'Оранжевая кожа и один огромный глаз.',
    wiki: 'Могучий унопианец с одним глазом на лбу, без носа, в космической форме федерации.',
    traits: { mainColors: ['оранжевый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Один большой глаз, оранжевая кожа, без носа.' }
  },
  {
    id: 'robot',
    name: 'Робот (Дрон Руди)',
    universe: 'invincible',
    avatar: '/characters/robot.png',
    shortDesc: 'Оранжево-бронзовый металлический дрон.',
    wiki: 'Угловатый механический воин с одним светящимся круглым оком по центру лица.',
    traits: { mainColors: ['оранжевый', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Целиком из металла, круглое светящееся око.' }
  },
  {
    id: 'monster_girl',
    name: 'Девочка-Монстр (Тролль)',
    universe: 'invincible',
    avatar: '/characters/monster_girl.png',
    shortDesc: 'Зеленый рогатый гигант-огр.',
    wiki: 'Аманда в форме чудовищного тролля с клыками из нижней челюсти и каменными мышцами.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Огромный зеленый монстр с рогами и клыками.' }
  },
  {
    id: 'battle_beast',
    name: 'Боевой Зверь',
    universe: 'invincible',
    avatar: '/characters/battle_beast.png',
    shortDesc: 'Белый лев-гладиатор с секирой.',
    wiki: 'Гуманоидный лев с густой гривой в боевых латах, вооруженный тяжелой булавой.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Морда льва, густая шерсть, оружие в лапе.' }
  },
  {
    id: 'cecil_stedman',
    name: 'Сесил Стедман',
    universe: 'invincible',
    avatar: '/characters/cecil_stedman.png',
    shortDesc: 'Черный костюм, седина и шрам на горле.',
    wiki: 'Глава Агентства Обороны в строгом пиджаке с горизонтальным шрамом через всю шею.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Седые гладкие волосы, глубокий шрам на шее.' }
  },
  {
    id: 'the_immortal',
    name: 'Бессмертный',
    universe: 'invincible',
    avatar: '/characters/the_immortal.png',
    shortDesc: 'Синий костюм с золотой буквой «I».',
    wiki: 'Древний воин с густой черной бородой без усов, летающий на сверхзвуковой скорости.',
    traits: { mainColors: ['синий', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Борода без усов (шкиперская), золотой пояс.' }
  },
  {
    id: 'rex_splode',
    name: 'Рекс Сплоуд',
    universe: 'invincible',
    avatar: '/characters/rex_splode.png',
    shortDesc: 'Оранжевый костюм и желтые очки.',
    wiki: 'Взрывной герой с кибер-руками, бросающий заряженные розовой энергией предметы.',
    traits: { mainColors: ['оранжевый', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Круглые желтые очки на глазах, светящиеся заряды.' }
  },
  {
    id: 'angstrom_levy',
    name: 'Ангстром Леви',
    universe: 'invincible',
    avatar: '/characters/angstrom_levy.png',
    shortDesc: 'Гигантский изуродованный мозг сзади.',
    wiki: 'Путешественник по Мультивселенной с колоссально раздутым назад бугристым мозгом.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Огромная пульсирующая голова, визор на одном глазу.' }
  },
  {
    id: 'conquest',
    name: 'Завоеватель',
    universe: 'invincible',
    avatar: '/characters/conquest.png',
    shortDesc: 'Седой вилтрумит с железным глазом.',
    wiki: 'Самый кровожадный вилтрумит в шрамах, с седой бородой и стальной пластиной на глазу.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Стальная заплатка на правом глазу, седая борода.' }
  },
  {
    id: 'thragg',
    name: 'Великий Регент Трагг',
    universe: 'invincible',
    avatar: '/characters/thragg.png',
    shortDesc: 'Вилтрумитский мундир с красными эполетами.',
    wiki: 'Абсолютный правитель Вилтрума с темными усами и боевыми шрамами на подбородке.',
    traits: { mainColors: ['белый', 'красный'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Густые черные усы, короткая военная стрижка.' }
  },
  {
    id: 'dupli_kate',
    name: 'Дупли-Кейт',
    universe: 'invincible',
    avatar: '/characters/dupli_kate.png',
    shortDesc: 'Красно-белое кимоно с цифрой «1».',
    wiki: 'Героиня Стражей Земли азиатской внешности, создающая армии собственных копий.',
    traits: { mainColors: ['красный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, две косички по бокам, цифра 1 на груди.' }
  },
  {
    id: 'anissa',
    name: 'Анисса',
    universe: 'invincible',
    avatar: '/characters/anissa.png',
    shortDesc: 'Белая вилтрумитская форма с коротким рукавом.',
    wiki: 'Безжалостная воительница Вилтрума с короткой черной стрижкой каре и надменным взглядом.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, короткая стрижка каре, белый костюм.' }
  },
  {
    id: 'bulletproof',
    name: 'Пуленепробиваемый',
    universe: 'invincible',
    avatar: '/characters/bulletproof.png',
    shortDesc: 'Оранжево-коричневый костюм с белым кругом.',
    wiki: 'Второй Неуязвимый, поглощающий кинетическую энергию любых ударов и выстрелов.',
    traits: { mainColors: ['оранжевый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Открытое лицо, защитные очки на лбу.' }
  },
  {
    id: 'damien_darkblood',
    name: 'Дэмиен Даркблад',
    universe: 'invincible',
    avatar: '/characters/damien_darkblood.png',
    shortDesc: 'Красный демон в плаще и шляпе детектива.',
    wiki: 'Сбежавший из Ада детектив с загнутыми рогами, красной кожей и бежевым тренчем.',
    traits: { mainColors: ['красный', 'бежевый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Красная демоническая кожа, рога, шляпа-федора.' }
  },
  {
    id: 'doc_seismic',
    name: 'Док Сейсмик',
    universe: 'invincible',
    avatar: '/characters/doc_seismic.png',
    shortDesc: 'Зеленые очки и сейсмические рукавицы.',
    wiki: 'Безумный геолог с горбом, управляющий землетрясениями и лавой из перчаток.',
    traits: { mainColors: ['серый', 'зеленый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Зеленые круглые очки, массивные наручи-пушки.' }
  },
  {
    id: 'red_rush',
    name: 'Красная Ракета (Red Rush)',
    universe: 'invincible',
    avatar: '/characters/red_rush.png',
    shortDesc: 'Красный костюм спидстера со шлемом.',
    wiki: 'Русский бегун из Стражей с белыми полосами на боках, погибший от рук Омни-Мэна.',
    traits: { mainColors: ['красный', 'белый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Шлем спидстера закрывает уши и лоб.' }
  },
  {
    id: 'war_woman',
    name: 'Воительница (War Woman)',
    universe: 'invincible',
    avatar: '/characters/war_woman.png',
    shortDesc: 'Бронзовый шлем спартанки и булава.',
    wiki: 'Амазонка в античном панцире с белым плюмажем на шлеме и тяжелой булавой в руке.',
    traits: { mainColors: ['золотой', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, античный шлем с перьями, булава в руке.' }
  },
  {
    id: 'darkwing',
    name: 'Темнокрыл',
    universe: 'invincible',
    avatar: '/characters/darkwing.png',
    shortDesc: 'Сине-черный костюм с крыльями-перепонками.',
    wiki: 'Ночной детектив в маске летучей мыши с плащом-крыльями под мышками.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Маска летучей мыши с ушками, крылья под руками.' }
  },
  {
    id: 'aquarus',
    name: 'Акварус',
    universe: 'invincible',
    avatar: '/characters/aquarus.png',
    shortDesc: 'Зеленая чешуя и золотой пояс Атлантиды.',
    wiki: 'Рыбоподобный владыка подводного мира с круглыми рыбьими глазами и плавниками.',
    traits: { mainColors: ['зеленый', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Рыбья голова с круглыми глазами, чешуя.' }
  },
  {
    id: 'green_ghost',
    name: 'Зеленый Призрак',
    universe: 'invincible',
    avatar: '/characters/green_ghost.png',
    shortDesc: 'Светящийся зеленый костюм-капюшон.',
    wiki: 'Неосязаемая героиня в изумрудном полупрозрачном комбинезоне с капюшоном.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, полупрозрачное зеленое сияние вокруг тела.' }
  },
  {
    id: 'martian_man',
    name: 'Марсианин',
    universe: 'invincible',
    avatar: '/characters/martian_man.png',
    shortDesc: 'Растянутое зеленое тело пришельца.',
    wiki: 'Беглец с Марса, растягивающий свои эластичные конечности и тело словно резиновые жгуты.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Голова без носа и ушей, гибкое зеленое тело-лента.' }
  },
  // +12 новых INVINCIBLE:
  {
    id: 'lucan',
    name: 'Люкан',
    universe: 'invincible',
    avatar: '/characters/lucan.png',
    shortDesc: 'Бородатый вилтрумит со шрамом на животе.',
    wiki: 'Один из сильнейших ветеранов империи Вилтрум с пышной бородой и бакенбардами.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Густая черная борода, гигантский шрам поперек торса.' }
  },
  {
    id: 'general_kregg',
    name: 'Генерал Крегг',
    universe: 'invincible',
    avatar: '/characters/general_kregg.png',
    shortDesc: 'Седой вилтрумит с красным кибер-глазом.',
    wiki: 'Командующий вилтрумитов с короткими усами и светящимся алым оптическим имплантом.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Красный кибернетический правый глаз, седые усы.' }
  },
  {
    id: 'thula',
    name: 'Тула',
    universe: 'invincible',
    avatar: '/characters/thula.png',
    shortDesc: 'Седая воительница с кинжалом на косе.',
    wiki: 'Смертоносная престарелая вилтрумитка с длинной седой косой, оканчивающейся лезвием.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Женщина, длинная седая коса с металлическим клинком.' }
  },
  {
    id: 'oliver_grayson',
    name: 'Оливер (Кид Омни-Мэн)',
    universe: 'invincible',
    avatar: '/characters/oliver_grayson.png',
    shortDesc: 'Фиолетовая кожа и костюм с плащом.',
    wiki: 'Младший брат Марка от трэксанской королевы с фиолетовым лицом и высокой скоростью роста.',
    traits: { mainColors: ['фиолетовый', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, notes: 'Фиолетовая кожа лица, темные волосы, плащ.' }
  },
  {
    id: 'shapesmith',
    name: 'Шейпсмит',
    universe: 'invincible',
    avatar: '/characters/shapesmith.png',
    shortDesc: 'Красно-синий костюм со стрелой.',
    wiki: 'Марсианин, принявший облик астронавта Рассветного Корпуса, меняющий плотность тела.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Заостренная форма головы, стрела на груди.' }
  },
  {
    id: 'shrink_rae',
    name: 'Сжимающаяся Рэй',
    universe: 'invincible',
    avatar: '/characters/shrink_rae.png',
    shortDesc: 'Зелено-черный костюм микро-героини.',
    wiki: 'Член нового состава Стражей, уменьшающаяся до микроскопических величин.',
    traits: { mainColors: ['зеленый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Женщина, короткая стрижка, очки на лбу.' }
  },
  {
    id: 'black_samson',
    name: 'Черный Самсон',
    universe: 'invincible',
    avatar: '/characters/black_samson.png',
    shortDesc: 'Серый силовой бронекостюм Стражей.',
    wiki: 'Ветеран команды, сражавшийся в специальном экзоскелете до возвращения своих сил.',
    traits: { mainColors: ['серый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, notes: 'Седеющая бородка, высокотехнологичный экзоскелет.' }
  },
  {
    id: 'killcannon',
    name: 'Киллкэннон',
    universe: 'invincible',
    avatar: '/characters/killcannon.png',
    shortDesc: 'Лазерная пушка вместо правой руки.',
    wiki: 'Киборг-рецидивист в синих латах с колоссальным энергетическим орудием на предплечье.',
    traits: { mainColors: ['синий', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, notes: 'Огромная лазерная пушка вместо правой руки.' }
  },
  {
    id: 'machine_head',
    name: 'Автоматоголовый',
    universe: 'invincible',
    avatar: '/characters/machine_head.png',
    shortDesc: 'Золотая квадратная голова и белый смокинг.',
    wiki: 'Криминальный босс с микрочипом предсказания ходов и золотым металлическим блоком-головой.',
    traits: { mainColors: ['белый', 'золотой'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Золотая робо-голова без лица, белый смокинг.' }
  },
  {
    id: 'titan',
    name: 'Титан',
    universe: 'invincible',
    avatar: '/characters/titan.png',
    shortDesc: 'Тело покрыто броней из каменных валунов.',
    wiki: 'Криминальный лидер, наращивающий сверхпрочный скальный панцирь вокруг своего тела.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Кожа из серых каменных плит и валунов.' }
  },
  {
    id: 'tether_tyrant',
    name: 'Тиран Привязи',
    universe: 'invincible',
    avatar: '/characters/tether_tyrant.png',
    shortDesc: 'Живые розовые щупальца из груди.',
    wiki: 'Наемник в зеленом скафандре, управляющий инопланетным симбиотом из щупалец в торсе.',
    traits: { mainColors: ['зеленый', 'розовый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Круглый шлем, клубок щупалец вырывается из груди.' }
  },
  {
    id: 'magmanite',
    name: 'Магманит',
    universe: 'invincible',
    avatar: '/characters/magmanite.png',
    shortDesc: 'Монстр из пылающей лавы и камня.',
    wiki: 'Подземный великан, состоящий из растрескавшейся базальтовой коры и кипящей магмы.',
    traits: { mainColors: ['оранжевый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, notes: 'Пылающее лавовое тело с черными камнями.' }
  }
];

export type UniverseType = 'all' | 'marvel' | 'the_boys' | 'invincible' | 'star_wars';

export const getRandom36 = (universe: UniverseType): Character[] => {
  let pool = CHARACTERS_DB;
  if (universe !== 'all') {
    pool = CHARACTERS_DB.filter(c => c.universe === universe);
  }
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 36);
};
