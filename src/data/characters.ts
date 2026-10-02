export interface CostumeTraits {
  mainColors: string[];
  hasHelmetOrMask: boolean;
  hasCape: boolean;
  hasBeard: boolean;
  hasWeapon: boolean;
  isHuman: boolean;
  isVillain: boolean;
  race: string;
  fraction: string;
  powers: string;
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
  // =========================================================================
  // 1. MARVEL (48 персонажей — Фильмы MCU)
  // =========================================================================
  {
    id: 'iron_man', name: 'Тони Старк (Железный Человек)', universe: 'marvel', avatar: '/characters/iron_man.png',
    shortDesc: 'Броня Mark 85 с нано-реактором.', wiki: 'Тони Старк в высокотехнологичной нано-броне красно-золотого цвета с репульсорами в ладонях.',
    traits: { mainColors: ['красный', 'золотой'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Мстители', powers: 'Гениальный интеллект, полет на репульсорах, микро-ракеты, нано-щит', notes: 'Шлем закрывает лицо полностью, глаза светятся белым.' }
  },
  {
    id: 'spider_man', name: 'Питер Паркер (Человек-Паук)', universe: 'marvel', avatar: '/characters/spider_man.png',
    shortDesc: 'Классическое красно-синее трико с паутиной.', wiki: 'Дружелюбный сосед из Квинса в спандекс-костюме с белыми линзами глаз. Не летает, а раскачивается на паутине.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек-мутант', fraction: 'Мстители', powers: 'Паучье чутьё, прилипание к поверхностям, стрельба паутиной', notes: 'Маска надета наглухо, лица не видно.' }
  },
  {
    id: 'captain_america', name: 'Стив Роджерс (Капитан Америка)', universe: 'marvel', avatar: '/characters/captain_america.png',
    shortDesc: 'Темно-синий кевлар со звездой и круглым щитом.', wiki: 'Суперсолдат Второй мировой войны в шлеме с буквой А (подбородок открыт) и вибраниумовым щитом.',
    traits: { mainColors: ['синий', 'коричневый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек (Сыворотка)', fraction: 'Мстители', powers: 'Пиковая физическая сила и выносливость, рикошетный бой со щитом', notes: 'Лицо видно частично, круглый щит в руке.' }
  },
  {
    id: 'thor', name: 'Тор Одинсон', universe: 'marvel', avatar: '/characters/thor.png',
    shortDesc: 'Первые Мстители: длинные волосы и молот Мьёльнир.', wiki: 'Тор из первых «Мстителей»: длинные золотистые волосы, серебряные круглые пластины на доспехе, красный плащ и квадратный молот Мьёльнир.',
    traits: { mainColors: ['серебряный', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, isHuman: false, isVillain: false, race: 'Асгардец (Бог)', fraction: 'Мстители / Асгард', powers: 'Призыв молний, полет при помощи молота Мьёльнир, неуязвимость', notes: 'Длинные русые волосы, молот Мьёльнир в руке (не секира!), красный плащ.' }
  },
  {
    id: 'hulk', name: 'Брюс Бэннер (Халк)', universe: 'marvel', avatar: '/characters/hulk.png',
    shortDesc: 'Зеленый мускулистый гигант.', wiki: 'Гамма-монстр колоссальной разрушительной силы. Не летает, но совершает гигантские прыжки на километры.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Гамма-мутант', fraction: 'Мстители', powers: 'Бесконечная физическая мощь от ярости, гипер-прыжки, регенерация', notes: 'Обнаженный торс, зеленые мускулы, без шлема и оружия.' }
  },
  {
    id: 'thanos', name: 'Танос', universe: 'marvel', avatar: '/characters/thanos.png',
    shortDesc: 'Безумный Титан в золотом боевом доспехе.', wiki: 'Фиолетовый военачальник с луны Титан в золотом шлеме и с Перчаткой Бесконечности на левой руке.',
    traits: { mainColors: ['золотой', 'фиолетовый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Титан / Вечный', fraction: 'Черный Орден', powers: 'Управление Камнями Бесконечности, невероятная сила и стойкость', notes: 'Золотой шлем на голове, перчатка с цветными камнями.' }
  },
  {
    id: 'loki', name: 'Локи Лафейсон', universe: 'marvel', avatar: '/characters/loki.png',
    shortDesc: 'Бог обмана в зеленой мантии с рогатым шлемом.', wiki: 'Асгардский трикстер в церемониальном шлеме с двумя длинными золотыми рогами и зеленым плащом.',
    traits: { mainColors: ['зеленый', 'золотой'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Ледяной великан (Йотун)', fraction: 'Асгард', powers: 'Магия иллюзий, гипноз, смена облика, кинжальный бой', notes: 'Два длинных загнутых золотых рога на шлеме, длинные темные волосы.' }
  },
  {
    id: 'doctor_strange', name: 'Стивен Стрэндж', universe: 'marvel', avatar: '/characters/doctor_strange.png',
    shortDesc: 'Синяя туника мага и красный Плащ Левитации.', wiki: 'Верховный маг Земли в синем кимоно с парящим алым плащом и амулетом Глаз Агамотто на груди.',
    traits: { mainColors: ['синий', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек (Маг)', fraction: 'Мастера мистических искусств', powers: 'Магия искривления реальности, создание порталов, зеркальное измерение', notes: 'Седые виски, аккуратная эспаньолка, высокий воротник плаща.' }
  },
  {
    id: 'black_widow', name: 'Наташа Романофф', universe: 'marvel', avatar: '/characters/black_widow.png',
    shortDesc: 'Черный тактический комбинезон шпионки.', wiki: 'Мастер тайных операций из Красной Комнаты в облегающем черном кевларе с кобурами на бедрах.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Мстители / Щ.И.Т.', powers: 'Шпионаж, акробатический рукопашный бой, электрошокеры', notes: 'Женщина, рыжие волосы, пистолеты в кобурах на бедрах.' }
  },
  {
    id: 'scarlet_witch', name: 'Ванда Максимофф', universe: 'marvel', avatar: '/characters/scarlet_witch.png',
    shortDesc: 'Эра Альтрона: красная кожаная куртка и черное платье.', wiki: 'Ванда времен битвы за Заковию: темные длинные волосы, красная кожанка поверх черного платья, БЕЗ короны.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек (Эксперимент Камня)', fraction: 'Мстители', powers: 'Телекинез, псионическая энергия, манипуляция разумом', notes: 'СТРОГО БЕЗ КОРОНЫ! Открытое лицо, красная кожаная куртка, красная магия в руках.' }
  },
  {
    id: 'wolverine', name: 'Логан (Росомаха)', universe: 'marvel', avatar: '/characters/wolverine.png',
    shortDesc: 'Желто-синий костюм с маской и когтями.', wiki: 'Мутант с адамантиевым скелетом в классической желто-синей форме с черными ушами на маске.',
    traits: { mainColors: ['желтый', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Мутант', fraction: 'Люди Икс', powers: 'Мгновенный исцеляющий фактор, когти из адамантия, звериное чутье', notes: 'Маска с широкими черными ушами-плавниками, стальные когти из кулаков.' }
  },
  {
    id: 'deadpool', name: 'Уэйд Уилсон (Дэдпул)', universe: 'marvel', avatar: '/characters/deadpool.png',
    shortDesc: 'Красно-черное трико с катанами за спиной.', wiki: 'Болтливый наемник в закрытой маске из спандекса с рукоятями двух японских мечей за плечами.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Мутант (Оружие X)', fraction: 'Наемник / Сила Икс', powers: 'Абсолютная регенерация, бессмертие, слом четвертой стены', notes: 'Маска без прорези для рта, рукояти катан торчат из-за спины.' }
  },
  {
    id: 'black_panther', name: 'Т’Чалла (Черная Пантера)', universe: 'marvel', avatar: '/characters/black_panther.png',
    shortDesc: 'Черный комбинезон из вибраниума с маской пантеры.', wiki: 'Король Ваканды в бронекостюме из виброткани с серебряным колье-зубьями и ушками на шлеме.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек (Сердцевидная трава)', fraction: 'Мстители / Ваканда', powers: 'Сверхчеловеческая ловкость, поглощение и возврат кинетической энергии', notes: 'Маска пантеры с кошачьими ушками, лицо полностью закрыто.' }
  },
  {
    id: 'star_lord', name: 'Питер Квилл (Звёздный Лорд)', universe: 'marvel', avatar: '/characters/star_lord.png',
    shortDesc: 'Бордовая куртка и маска с красными окулярами.', wiki: 'Капитан Стражей Галактики в темно-бордовом кожаном плаще и маске-респираторе со светящимися красными линзами.',
    traits: { mainColors: ['коричневый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Получеловек / Полуцелестиал', fraction: 'Стражи Галактики', powers: 'Элементные бластеры, ракетные ботинки, космическая акробатика', notes: 'Высокотехнологичный шлем с круглыми светящимися красными линзами.' }
  },
  {
    id: 'groot', name: 'Грут', universe: 'marvel', avatar: '/characters/groot.png',
    shortDesc: 'Древовидный великан из живой коры.', wiki: 'Гуманоидное дерево колоссальной мощи с зелеными побегами на плечах, не носит никакой одежды.',
    traits: { mainColors: ['коричневый', 'зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Флора Колосс (Инопланетянин)', fraction: 'Стражи Галактики', powers: 'Управление древесной массой, растяжение ветвей, восстановление из щепки', notes: 'Полностью деревянное тело из коры и веток.' }
  },
  {
    id: 'hawkeye', name: 'Клинт Бартон', universe: 'marvel', avatar: '/characters/hawkeye.png',
    shortDesc: 'Темно-фиолетовый жилет лучника с колчаном.', wiki: 'Меткий стрелок Мстителей без маски с блочным луком в руках и набором стрел-гаджетов.',
    traits: { mainColors: ['черный', 'фиолетовый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Мстители / Щ.И.Т.', powers: 'Идеальная меткость, владение луком и стрелами с особыми наконечниками', notes: 'Лицо открыто, блочный лук со стрелой в руках.' }
  },
  {
    id: 'ant_man', name: 'Скотт Лэнг (Человек-Муравей)', universe: 'marvel', avatar: '/characters/ant_man.png',
    shortDesc: 'Черно-красный костюм со стальным шлемом.', wiki: 'Герой в закрытом хромированном шлеме с респиратором, способный менять свои размеры частицами Пима.',
    traits: { mainColors: ['красный', 'черный', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек (Частицы Пима)', fraction: 'Мстители', powers: 'Уменьшение до квантовых размеров, увеличение в гиганта, связь с муравьями', notes: 'Герметичный стальной шлем закрывает голову целиком.' }
  },
  {
    id: 'winter_soldier', name: 'Баки Барнс (Зимний Солдат)', universe: 'marvel', avatar: '/characters/winter_soldier.png',
    shortDesc: 'Тактический жилет и хромированная кибер-рука.', wiki: 'Суперсолдат с темными волосами до плеч и сверкающей металлической левой рукой с красной звездой.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек (Киборг)', fraction: 'Мстители / Воющие Коммандос', powers: 'Титановая кибер-рука колоссальной силы, мастер рукопашного боя и снайпинга', notes: 'Открытое лицо с легкой щетиной, блестящая металлическая рука.' }
  },
  {
    id: 'vision', name: 'Вижн', universe: 'marvel', avatar: '/characters/vision.png',
    shortDesc: 'Красное лицо, зеленый костюм и желтый плащ.', wiki: 'Синтезоид из вибраниума с желтым Камнем Разума во лбу и золотистым плащом за спиной.',
    traits: { mainColors: ['зеленый', 'красный', 'желтый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Синтезоид (Андроид)', fraction: 'Мстители', powers: 'Изменение плотности тела, полет, лазерный луч из Камня Разума', notes: 'Малиново-красная кожа лица, светящийся камень во лбу, золотистый плащ.' }
  },
  {
    id: 'captain_marvel', name: 'Кэрол Дэнверс', universe: 'marvel', avatar: '/characters/captain_marvel.png',
    shortDesc: 'Красно-синий костюм с золотой звездой.', wiki: 'Пилот ВВС, получившая фотонную космическую силу Тессеракта, со светлыми волосами и открытым лицом.',
    traits: { mainColors: ['синий', 'красный', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек-Крии', fraction: 'Мстители / Защитники Галактики', powers: 'Сверхсветовой полет, фотонные плазменные лучи, поглощение энергии', notes: 'Женщина, светлые волосы, восьмиконечная золотая звезда на груди.' }
  },
  {
    id: 'magneto', name: 'Эрик Леншерр (Магнето)', universe: 'marvel', avatar: '/characters/magneto.png',
    shortDesc: 'Темно-красный шлем и фиолетовый плащ.', wiki: 'Лидер мутантов в шлеме, блокирующем телепатию, с металлическим воротником и плащом.',
    traits: { mainColors: ['красный', 'фиолетовый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Мутант', fraction: 'Братство Мутантов', powers: 'Полный контроль магнитных полей, манипуляция металлами, силовые барьеры', notes: 'Шлем закрывает лоб и щеки, седые брови, фиолетовый плащ.' }
  },
  {
    id: 'green_goblin', name: 'Норман Озборн (Зеленый Гоблин)', universe: 'marvel', avatar: '/characters/green_goblin.png',
    shortDesc: 'Зеленая чешуйчатая броня и оскаленная маска.', wiki: 'Психопат на глайдере в зеленом металлическом шлеме с желтыми окулярами и тыквенными бомбами.',
    traits: { mainColors: ['зеленый', 'желтый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек (Сыворотка Гоблина)', fraction: 'Зловещая Шестерка', powers: 'Сверхчеловеческая сила, полет на глайдере, тыквенные гранаты-бомбы', notes: 'Зеленый зубастый шлем-маска с желтыми стеклами.' }
  },
  {
    id: 'daredevil', name: 'Мэтт Мёрдок (Сорвиголова)', universe: 'marvel', avatar: '/characters/daredevil.png',
    shortDesc: 'Бордовый костюм с дьявольскими рожками.', wiki: 'Слепой защитник Адской Кухни в кевларовой маске с рожками на лбу и красными стеклами на глазах.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Защитники', powers: 'Радарное чутье, эхолокация, непревзойденное владение боевыми палками', notes: 'Маленькие рожки на шлеме, парные боевые дубинки в руках.' }
  },
  {
    id: 'ikaris', name: 'Икарис', universe: 'marvel', avatar: '/characters/ikaris.png',
    shortDesc: 'Синий костюм Вечного с золотыми кругами.', wiki: 'Лидер расы Вечных в космическом сине-голубом облачении с золотым узором, стреляющий лазерами из глаз.',
    traits: { mainColors: ['синий', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Вечный (Синтетическое существо)', fraction: 'Вечные', powers: 'Космический полет, лазерные лучи тепловой энергии из глаз, сверхсила', notes: 'Открытое лицо, глаза светятся ослепительным золотым лучом.' }
  },
  {
    id: 'moon_knight', name: 'Лунный Рыцарь (Марк Спектор)', universe: 'marvel', avatar: '/characters/moon_knight.png',
    shortDesc: 'Белоснежный тактический костюм с капюшоном.', wiki: 'Аватар египетского бога Хонсу в белом саване с капюшоном, маской и светящимися глазами-полумесяцами.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек (Аватар бога)', fraction: 'Полуночные Сыновья', powers: 'Усиление сил от фаз луны, владение лезвиями-полумесяцами', notes: 'Полностью белоснежный костюм, белый капюшон и маска.' }
  },
  {
    id: 'shang_chi', name: 'Шан-Чи', universe: 'marvel', avatar: '/characters/shang_chi.png',
    shortDesc: 'Красно-черный костюм и Десять Колец.', wiki: 'Мастер боевых искусств в чешуйчатой броне дракона, на руках которого сияют мистические Десять Колец.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Мстители / Десять Колец', powers: 'Управление энергией Десяти Колец, стиль боя Та Ло', notes: 'Открытое лицо, светящиеся кольца вокруг предплечий.' }
  },
  {
    id: 'falcon', name: 'Сокол (Сэм Уилсон)', universe: 'marvel', avatar: '/characters/falcon.png',
    shortDesc: 'Летный жилет с механическими крыльями.', wiki: 'Боец в тактических очках с огромными металлическими раскрывающимися крыльями за спиной.',
    traits: { mainColors: ['серый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Мстители', powers: 'Полет на реактивных механических крыльях, дрон Редвинг', notes: 'Очки-визор на глазах, огромные крылья за спиной, бородка.' }
  },
  {
    id: 'war_machine', name: 'Воитель (Джеймс Роуди)', universe: 'marvel', avatar: '/characters/war_machine.png',
    shortDesc: 'Тяжелая серо-черная броня с пулеметом.', wiki: 'Тяжелый бронекостюм Старка из темно-серого титана с шестиствольным пулеметом на правом плече.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Мстители / ВВС США', powers: 'Крупнокалиберный пулемет, ракетные залпы, броня высокой прочности', notes: 'Шлем закрывает лицо, шестиствольный пулемет закреплен на плече.' }
  },
  {
    id: 'nebula', name: 'Небула', universe: 'marvel', avatar: '/characters/nebula.png',
    shortDesc: 'Синяя кибер-кожа и металлический череп.', wiki: 'Приемная дочь Таноса с синим лицом, черными глазами и хромированной пластиной на левой стороне головы.',
    traits: { mainColors: ['синий', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Луфомоид (Киборг)', fraction: 'Стражи Галактики', powers: 'Кибернетическая регенерация конечностей, мастерство рукопашного боя', notes: 'Синяя кожа, лысая голова с железной пластиной на виске.' }
  },
  {
    id: 'nick_fury', name: 'Ник Фьюри', universe: 'marvel', avatar: '/characters/nick_fury.png',
    shortDesc: 'Черный кожаный плащ и повязка на глазу.', wiki: 'Основатель инициативы «Мстители» в строгом кожаном плаще с черной повязкой на левом глазу.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Щ.И.Т.', powers: 'Гениальная разведка, тайное руководство, огнестрельное оружие', notes: 'Черная повязка на левом глазу, седая эспаньолка, плащ.' }
  },
  {
    id: 'blade', name: 'Блейд (Эрик Брукс)', universe: 'marvel', avatar: '/characters/blade.png',
    shortDesc: 'Темные очки, кожаный плащ и меч за спиной.', wiki: 'Дневной бродяга — получеловек-полувампир в солнцезащитных очках и с титановым мечом за плечом.',
    traits: { mainColors: ['черный', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Дампир (Полувампир)', fraction: 'Полуночные Сыновья', powers: 'Сила и скорость вампира без уязвимости к солнцу, фехтование мечом', notes: 'Черные солнцезащитные очки, рукоять меча торчит из-за спины.' }
  },
  {
    id: 'ghost_rider', name: 'Призрачный Гонщик (Джонни Блейз)', universe: 'marvel', avatar: '/characters/ghost_rider.png',
    shortDesc: 'Пылающий череп в шипастой косухе.', wiki: 'Дух возмездия с объятым адским огнем черепом вместо лица и тяжелой железной цепью через плечо.',
    traits: { mainColors: ['черный', 'оранжевый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Демоническая сущность / Дух', fraction: 'Одиночка', powers: 'Адский огонь, Карающий взор, раскаленная металлическая цепь', notes: 'Череп объят пламенем, железная цепь через грудь.' }
  },
  {
    id: 'punisher', name: 'Каратель (Фрэнк Касл)', universe: 'marvel', avatar: '/characters/punisher.png',
    shortDesc: 'Бронежилет с белым черепом и автомат.', wiki: 'Ветеран морской пехоты в черном тактическом бронежилете с огромным нарисованным белым черепом.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Одиночка', powers: 'Снайперская стрельба, военная диверсионная тактика, бесчувственность к боли', notes: 'Белый череп на бронежилете, лицо со щетиной, автомат в руках.' }
  },
  {
    id: 'venom', name: 'Веном', universe: 'marvel', avatar: '/characters/venom.png',
    shortDesc: 'Черная пасть с зубами и длинным языком.', wiki: 'Инопланетный симбиот из черной слизи с гигантскими белыми глазами, острыми клыками и языком.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Инопланетный симбиот (Клинтар)', fraction: 'Одиночка', powers: 'Превращение конечностей в хлысты, ползание по стенам, сверхсила', notes: 'Огромный красный язык, зубастая пасть, нет человеческого лица.' }
  },
  {
    id: 'mysterio', name: 'Мистерио (Квентин Бек)', universe: 'marvel', avatar: '/characters/mysterio.png',
    shortDesc: 'Дымчатый шлем-аквариум и фиолетовый плащ.', wiki: 'Иллюзионист в матовом стеклянном куполе без лица, зеленых доспехах и длинном фиолетовом плаще.',
    traits: { mainColors: ['зеленый', 'фиолетовый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Зловещая Шестерка', powers: 'Голографические иллюзии дронов, дымовые завесы', notes: 'Круглый непрозрачный шлем-шар без лица, фиолетовый плащ.' }
  },
  {
    id: 'doctor_doom', name: 'Доктор Дум (Виктор фон Дум)', universe: 'marvel', avatar: '/characters/doctor_doom.png',
    shortDesc: 'Стальная маска и темно-зеленый капюшон.', wiki: 'Владыка Латверии в нерушимой железной маске с прорезями для глаз и зеленой средневековой накидке.',
    traits: { mainColors: ['зеленый', 'серебряный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек (Киборг/Колдун)', fraction: 'Латверия', powers: 'Темная магия, энергетические залпы из брони, гениальный интеллект', notes: 'Стальная маска закрывает лицо, темно-зеленый капюшон.' }
  },
  {
    id: 'ultron', name: 'Альтрон', universe: 'marvel', avatar: '/characters/ultron.png',
    shortDesc: 'Искусственный интеллект в металлическом теле.', wiki: 'Робот-тиран с красными светящимися глазами и пастью, жаждущий стереть органическую жизнь.',
    traits: { mainColors: ['серебряный', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Искусственный интеллект / Робот', fraction: 'Армия Альтрона', powers: 'Гравитационные лучи, управление армией дронов, титановый корпус', notes: 'Металлический череп с красным светящимся оскалом.' }
  },
  {
    id: 'carnage', name: 'Карнаж (Клетус Кэседи)', universe: 'marvel', avatar: '/characters/carnage.png',
    shortDesc: 'Кроваво-красный безумный симбиот с щупальцами.', wiki: 'Кровавый отпрыск Венома, трансформирующий тело в серпы, топоры и острые щупальца.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Инопланетный симбиот', fraction: 'Одиночка / Маньяк', powers: 'Формирование лезвий из тела, сверхчеловеческая скорость и сила', notes: 'Жилистый кроваво-красный симбиот с острыми лезвиями на руках.' }
  },
  {
    id: 'red_skull', name: 'Красный Череп (Иоганн Шмидт)', universe: 'marvel', avatar: '/characters/red_skull.png',
    shortDesc: 'Красное лицо-череп в черном мундире Гидры.', wiki: 'Основатель Гидры с изуродованным ярко-красным безносым черепом в черном кожаном пальто.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Мутировавший человек', fraction: 'Гидра', powers: 'Сверхсила от прототипа сыворотки, Тессеракт-оружие', notes: 'Ярко-красная кожа в форме голого черепа без носа, черный мундир.' }
  },
  {
    id: 'galactus', name: 'Галактус', universe: 'marvel', avatar: '/characters/galactus.png',
    shortDesc: 'Пожиратель миров в гигантском рогатом шлеме.', wiki: 'Космический титан циклопических размеров в фиолетовых латах с широкими рогами на шлеме.',
    traits: { mainColors: ['фиолетовый', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Космическая сущность', fraction: 'Одиночка', powers: 'Поглощение жизненной энергии планет, Космическая Сила', notes: 'Колоссальный фиолетовый шлем с двумя изогнутыми рогами-антеннами.' }
  },
  {
    id: 'apocalypse', name: 'Апокалипсис (Эн Сабах Нур)', universe: 'marvel', avatar: '/characters/apocalypse.png',
    shortDesc: 'Первый мутант в синей броне с трубками.', wiki: 'Древний египетский мутант с серо-синей кожей, синими губами и мощными доспехами целестиалов.',
    traits: { mainColors: ['синий', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Древний мутант', fraction: 'Всадники Апокалипсиса', powers: 'Молекулярный контроль тела, поглощение сил других мутантов', notes: 'Серо-синяя кожа лица, широкие синие губы, массивные трубы на плечах.' }
  },
  {
    id: 'hela', name: 'Хела (Богиня Смерти)', universe: 'marvel', avatar: '/characters/hela.png',
    shortDesc: 'Богиня Смерти в черном рогатом шлеме.', wiki: 'Старшая дочь Одина в черно-зеленом обтягивающем костюме с огромной короной из разветвленных рогов.',
    traits: { mainColors: ['черный', 'зеленый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Асгардка (Богиня)', fraction: 'Асгард', powers: 'Материализация бесконечных клинков из воздуха, некромантия', notes: 'Женщина, гигантская ветвистая черная корона-рога, зеленый плащ.' }
  },
  {
    id: 'kang', name: 'Канг Завоеватель', universe: 'marvel', avatar: '/characters/kang.png',
    shortDesc: 'Фиолетовый шлем с синим лицом-визором.', wiki: 'Владыка времени из 31 века в зеленом костюме и шлеме со сплошным синим светящимся экраном.',
    traits: { mainColors: ['фиолетовый', 'зеленый', 'синий'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек будущего', fraction: 'Совет Кангов', powers: 'Путешествия во времени, футуристические силовые поля и лучи', notes: 'Синий светящийся плоский визор на лице под фиолетовым шлемом.' }
  },
  {
    id: 'dormammu', name: 'Дормамму', universe: 'marvel', avatar: '/characters/dormammu.png',
    shortDesc: 'Пылающий огненный владыка Темного измерения.', wiki: 'Космический демон колоссальных размеров, лицо которого состоит из пылающих полос фиолетового огня.',
    traits: { mainColors: ['фиолетовый', 'оранжевый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Демоническая космическая сущность', fraction: 'Темное Измерение', powers: 'Абсолютный контроль Темного измерения, бессмертие, поглощение миров', notes: 'Лицо из светящихся фиолетовых и огненных полос энергии.' }
  },
  {
    id: 'gorr', name: 'Горр Убийца Богов', universe: 'marvel', avatar: '/characters/gorr.png',
    shortDesc: 'Бледный пришелец с черным Некромечом.', wiki: 'Инопланетянин в белых изодранных лохмотьях с пепельно-серой кожей и черным мечом, истребляющим богов.',
    traits: { mainColors: ['белый', 'черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Инопланетянин', fraction: 'Одиночка', powers: 'Владение Некромечом, призыв теневых монстров, телепортация сквозь тьму', notes: 'Мертвенно-бледная лысая голова, черный меч в руках, белые лохмотья.' }
  },
  {
    id: 'abomination', name: 'Мерзость (Эмиль Блонски)', universe: 'marvel', avatar: '/characters/abomination.png',
    shortDesc: 'Чешуйчатый зеленый монстр с перепонками.', wiki: 'Мутировавший солдат, превратившийся в чешуйчатого зеленого гиганта с перепончатыми ушами-гребнями.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Гамма-мутант', fraction: 'Одиночка', powers: 'Сверхчеловеческая сила, равная Халку, костяные наросты-шипы', notes: 'Зеленая чешуйчатая кожа, перепончатые уши-плавники, острые зубы.' }
  },
  {
    id: 'modok', name: 'МОДОК', universe: 'marvel', avatar: '/characters/modok.png',
    shortDesc: 'Гигантская голова в летающем кресле.', wiki: 'Мутировавший киборг с огромным лицом-головой в парящем золотом боевом кресле с фиолетовым обручем.',
    traits: { mainColors: ['золотой', 'фиолетовый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Кибернетически измененный человек', fraction: 'Квантовый мир / АИМ', powers: 'Лазерные лучи из налобного кристалла, полет на реактивной тяге', notes: 'Огромное уродливое лицо в парящем золотом доспехе-кресле.' }
  },
  {
    id: 'silver_surfer', name: 'Серебряный Сёрфер (Норрин Радд)', universe: 'marvel', avatar: '/characters/silver_surfer.png',
    shortDesc: 'Зеркальное хромированное тело на доске.', wiki: 'Космический вестник Галактуса с зеркально-серебряной кожей, скользящий по космосу на хромированной доске.',
    traits: { mainColors: ['серебряный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Зенн-Лавианин (Вестник)', fraction: 'Вестники Галактуса', powers: 'Космическая Сила, полет быстрее света на сёрф-доске, манипуляция материей', notes: 'Полностью зеркальное металлическое серебряное тело без волос и одежды.' }
  },

  // =========================================================================
  // 2. THE BOYS (48 персонажей — Сериал Amazon, Накиб включен)
  // =========================================================================
  {
    id: 'homelander', name: 'Хоумлендер (Джон)', universe: 'the_boys', avatar: '/characters/homelander.png',
    shortDesc: 'Синий костюм с плащом-флагом США.', wiki: 'Лидер Семёрки, сильнейший супер корпорации Vought со светлыми волосами и орлами на плечах.',
    traits: { mainColors: ['синий', 'красный', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка / Vought', powers: 'Сверхзвуковой полет, лазеры из глаз, рентгеновское зрение, неуязвимость', notes: 'Блондин, плащ в виде флага США, золотые орлы на плечах.' }
  },
  {
    id: 'billy_butcher', name: 'Билли Бутчер', universe: 'the_boys', avatar: '/characters/billy_butcher.png',
    shortDesc: 'Черный плащ, гавайская рубашка и борода.', wiki: 'Бывший оперативник SAS, возглавляющий отряд «Пацаны» ради вендетты против Хоумлендера.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Отряд Пацаны', powers: 'Военная диверсионная подготовка, рукопашный бой, огнестрел', notes: 'Густая черная борода, черное пальто, гавайская рубашка.' }
  },
  {
    id: 'hughie_campbell', name: 'Хьюи Кэмпбелл', universe: 'the_boys', avatar: '/characters/hughie_campbell.png',
    shortDesc: 'Ветровка поверх футболки с рок-принтом.', wiki: 'Обычный парень из магазина техники, ставший моральным компасом отряда Пацанов.',
    traits: { mainColors: ['серый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Отряд Пацаны', powers: 'Острый ум, взлом компьютеров (под временной V — телепортация)', notes: 'Худощавый, темная ветровка, растрепанные волосы, без бороды.' }
  },
  {
    id: 'starlight', name: 'Старлайт (Энни Дженьюэри)', universe: 'the_boys', avatar: '/characters/starlight.png',
    shortDesc: 'Белое платье с золотыми звездами.', wiki: 'Искренняя супергероиня, взбунтовавшаяся против циничной корпоративной машины Vought.',
    traits: { mainColors: ['белый', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Пацаны / бывшая Семёрка', powers: 'Поглощение электроэнергии, мощные световые лучи, сверхсила', notes: 'Женщина, светлые волосы, белое платье со звездами, светящиеся глаза.' }
  },
  {
    id: 'soldier_boy', name: 'Солдатик (Бен)', universe: 'the_boys', avatar: '/characters/soldier_boy.png',
    shortDesc: 'Зеленый чешуйчатый доспех и щит с орлом.', wiki: 'Первый супергерой Америки Второй мировой в чешуйчатой броне с радиоактивным лучом из груди.',
    traits: { mainColors: ['зеленый', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: false, isVillain: true, race: 'Суперчеловек (Оригинальная V)', fraction: 'Payback / Vought', powers: 'Ядерный радиоактивный импульс, сжигающий V, сверхсила, щит', notes: 'Темно-зеленая чешуйчатая броня, борода, треугольный щит.' }
  },
  {
    id: 'a_train', name: 'Поезд-А (Реджи Франклин)', universe: 'the_boys', avatar: '/characters/a_train.png',
    shortDesc: 'Сине-белый костюм спидстера с очками.', wiki: 'Быстрейший человек на Земле из Семёрки в спортивном аэродинамическом трико и синих очках.',
    traits: { mainColors: ['синий', 'белый'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Сверхзвуковой бег, ускоренный метаболизм', notes: 'Синие спортивные очки-визоры, аккуратная бородка.' }
  },
  {
    id: 'the_deep', name: 'Подводный (Кевин Московиц)', universe: 'the_boys', avatar: '/characters/the_deep.png',
    shortDesc: 'Зеленый костюм-безрукавка с чешуей.', wiki: 'Повелитель морей из Семёрки с открытыми накачанными плечами, говорящий с морскими гадами.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Дыхание под водой, телепатическая связь с морскими животными', notes: 'Открытые мускулистые плечи, чешуйчатая безрукавка, борода.' }
  },
  {
    id: 'black_noir', name: 'Чёрный Нуар (Оригинал)', universe: 'the_boys', avatar: '/characters/black_noir.png',
    shortDesc: 'Абсолютно черный тактический костюм ниндзя.', wiki: 'Немой киллер Семёрки в глухой матовой черной маске без разрезов для глаз и рта.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Скрытность, мастерство метания ножей, высокий болевой порог', notes: 'Глухая черная маска без прорезей для глаз и рта.' }
  },
  {
    id: 'queen_maeve', name: 'Королева Мэйв (Мэгги Шоу)', universe: 'the_boys', avatar: '/characters/queen_maeve.png',
    shortDesc: 'Стальной античный корсет и тиара.', wiki: 'Сильнейшая воительница Земли в античных доспехах амазонки с диадемой на голове.',
    traits: { mainColors: ['серый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Колоссальная физическая сила, мастерство меча, прочность', notes: 'Женщина, тиара на лбу, рыже-каштановые волосы.' }
  },
  {
    id: 'frenchie', name: 'Французик (Серж)', universe: 'the_boys', avatar: '/characters/frenchie.png',
    shortDesc: 'Куртка хаки, серьги и короткий ежик.', wiki: 'Химик, оружейник и эксперт по нейтрализации суперов в отряде Бутчера.',
    traits: { mainColors: ['зеленый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Отряд Пацаны', powers: 'Химические яды, подрывное дело, создание оружия против супов', notes: 'Короткий ежик, щетина, военная куртка хаки, кольца.' }
  },
  {
    id: 'kimiko', name: 'Кимико Миясиро', universe: 'the_boys', avatar: '/characters/kimiko.png',
    shortDesc: 'Темная толстовка и растрепанная челка.', wiki: 'Немая воительница с мгновенной регенерацией, жестоко разрывающая врагов голыми руками.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Отряд Пацаны', powers: 'Мгновенное исцеление любых ран, звериная сила и ярость', notes: 'Женщина, азиатская внешность, черные растрепанные волосы.' }
  },
  {
    id: 'mothers_milk', name: 'Молоко Матери (ММ)', universe: 'the_boys', avatar: '/characters/mothers_milk.png',
    shortDesc: 'Темный берет, бородка и рубашка.', wiki: 'Координатор операций Пацанов, бывший военный медик с аккуратной эспаньолкой.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Отряд Пацаны', powers: 'Стратегическое планирование, военная медицина, огнестрел', notes: 'Берет на голове, ровная бородка-эспаньолка.' }
  },
  {
    id: 'victoria_neuman', name: 'Виктория Ньюман (Надя)', universe: 'the_boys', avatar: '/characters/victoria_neuman.png',
    shortDesc: 'Строгий женский деловой костюм.', wiki: 'Конгрессвумен, способная взглядом взрывать кровеносные сосуды и головы людей.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Правительство США / Vought', powers: 'Взрывание голов и крови взглядом на расстоянии', notes: 'Женщина, деловой пиджак, завитые темные волосы.' }
  },
  {
    id: 'stormfront', name: 'Штормфронт (Клара Райзингер)', universe: 'the_boys', avatar: '/characters/stormfront.png',
    shortDesc: 'Черный костюм с выбритым виском.', wiki: 'Нацистка из 1940-х с прической с выбритым виском, мечущая фиолетовые плазменные молнии.',
    traits: { mainColors: ['черный', 'бордовый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Фиолетовые плазменные молнии, полет, сверхчеловеческая стойкость', notes: 'Женщина, асимметричная стрижка с выбритым виском.' }
  },
  {
    id: 'stan_edgar', name: 'Стэн Эдгар', universe: 'the_boys', avatar: '/characters/stan_edgar.png',
    shortDesc: 'Идеальный серый костюм-тройка в очках.', wiki: 'Хладнокровный глава Vought в очках, которого искренне побаивался даже Хоумлендер.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Vought International', powers: 'Абсолютный психологический контроль, корпоративная власть', notes: 'Очки в тонкой оправе, деловой галстук, выбрит.' }
  },
  {
    id: 'sister_sage', name: 'Сестра Сэйдж (Джессика)', universe: 'the_boys', avatar: '/characters/sister_sage.png',
    shortDesc: 'Коричневый жакет, косички и очки.', wiki: 'Самый умный человек на планете с бесконечно регенерирующим мозгом в жакете с косичками.',
    traits: { mainColors: ['коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Неограниченный аналитический интеллект, регенерация мозга', notes: 'Женщина, длинные афро-косички, очки для чтения.' }
  },
  {
    id: 'firecracker', name: 'Петарда', universe: 'the_boys', avatar: '/characters/firecracker.png',
    shortDesc: 'Ковбойский жилет, шорты и шляпа.', wiki: 'Стримерша в ковбойской шляпе, стреляющая искрами из пальцев ради хайпа и пропаганды.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, notes: 'Женщина, рыжие пышные волосы, ковбойская шляпа на голове.' }
  },
  {
    id: 'translucent', name: 'Прозрачный', universe: 'the_boys', avatar: '/characters/translucent.png',
    shortDesc: 'Серый костюм с ромбами из углепластика.', wiki: 'Супер с алмазно-углеродной кожей, преломляющей свет и делающей его невидимым.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Алмазная углеродная невидимость, бронебойная кожа', notes: 'Короткие темные волосы, щетина, серый комбинезон.' }
  },
  {
    id: 'lamplighter', name: 'Фонарщик', universe: 'the_boys', avatar: '/characters/lamplighter.png',
    shortDesc: 'Черный капюшон и посох с огнем.', wiki: 'Пирокинетик из старого состава Семёрки в капюшоне с медным посохом-зажигалкой.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Payback / Семёрка', powers: 'Управление пламенем, создание огненных волн через посох', notes: 'Глубокий капюшон, нижняя часть лица прикрыта, посох с огнем.' }
  },
  {
    id: 'ashley_barrett', name: 'Эшли Барретт', universe: 'the_boys', avatar: '/characters/ashley_barrett.png',
    shortDesc: 'Красный деловой костюм и телефон у уха.', wiki: 'Генеральный директор Vought на грани нервного срыва, вырывающая волосы от ужаса перед супами.',
    traits: { mainColors: ['красный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Vought International', powers: 'Пиар-менеджмент, кризисные коммуникации', notes: 'Женщина, светлые волосы, телефон в руке, деловой костюм.' }
  },
  {
    id: 'ryan_butcher', name: 'Райан Бутчер', universe: 'the_boys', avatar: '/characters/ryan_butcher.png',
    shortDesc: 'Красная толстовка и горящие лазерные глаза.', wiki: 'Биологический сын Хоумлендера, первый прирожденный обладатель суперсил.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Прирожденный супер', fraction: 'Семья Хоумлендера / Пацаны', powers: 'Тепловые лазерные лучи из глаз, полет, сверхсила', notes: 'Мальчик-подросток в красной толстовке, красные светящиеся глаза.' }
  },
  {
    id: 'marie_moreau', name: 'Мари Моро', universe: 'the_boys', avatar: '/characters/marie_moreau.png',
    shortDesc: 'Бордовый бомбер Годолкина и сферы крови.', wiki: 'Студентка Университета Годолкина, управляющая чужой и своей кровью как хлыстами.',
    traits: { mainColors: ['бордовый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Университет Годолкина', powers: 'Гемокинез (управление кровью), обнаружение пульса', notes: 'Женщина, длинные косы, парящие капли крови над ладонями.' }
  },
  {
    id: 'sam_riordan', name: 'Сэм Риордан', universe: 'the_boys', avatar: '/characters/sam_riordan.png',
    shortDesc: 'Серая больничная майка и синяки.', wiki: 'Сверхсильный супер из лаборатории «Лес», видящий людей тряпичными куклами.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Годолкин / Лес', powers: 'Колоссальная физическая мощь, прыжки, галлюцинации кукол', notes: 'Растрепанные темные волосы, майка, синяки под глазами.' }
  },
  {
    id: 'golden_boy', name: 'Золотой Мальчик (Люк Риордан)', universe: 'the_boys', avatar: '/characters/golden_boy.png',
    shortDesc: 'Тело целиком объято золотым пламенем.', wiki: 'Лучший студент Годолкина, чье тело вспыхивает ослепительным термоядерным огнем.',
    traits: { mainColors: ['золотой', 'оранжевый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Университет Годолкина', powers: 'Пирокинез, генерация плазменного золотого огня, полет', notes: 'Тело целиком объято ярким золотым пламенем.' }
  },
  {
    id: 'popclaw', name: 'Попклоу (Шарлотта)', universe: 'the_boys', avatar: '/characters/popclaw.png',
    shortDesc: 'Костяные лезвия из запястий.', wiki: 'Бывшая героиня с острыми 15-сантиметровыми костяными шипами, выдвигающимися из рук.',
    traits: { mainColors: ['розовый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Одиночка', powers: 'Выдвижные костяные когти из запястий, сверхсила', notes: 'Женщина, костяные лезвия торчат из тыльной стороны кистей.' }
  },
  {
    id: 'blindspot', name: 'Слепое Пятно', universe: 'the_boys', avatar: '/characters/blindspot.png',
    shortDesc: 'Черная повязка на глазах и синий костюм.', wiki: 'Слепой мастер акробатики и боевых палок, чьи барабанные перепонки разбил Хоумлендер.',
    traits: { mainColors: ['синий', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Кандидат в Семёрку', powers: 'Эхолокация, слух летучей мыши, боевые палки', notes: 'Глаза плотно завязаны черной тканью, боевые шесты в руках.' }
  },
  {
    id: 'supersonic', name: 'Суперсоник (Алекс)', universe: 'the_boys', avatar: '/characters/supersonic.png',
    shortDesc: 'Бело-серебристый поп-костюм.', wiki: 'Бывший парень Старлайт, генерирующий звуковые взрывные волны хлопком ладоней.',
    traits: { mainColors: ['белый', 'серебряный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Звуковые ударные волны от хлопков, сверхсила', notes: 'Белоснежный блестящий костюм с серебром, уложенная прическа.' }
  },
  {
    id: 'gunpowder', name: 'Порох', universe: 'the_boys', avatar: '/characters/gunpowder.png',
    shortDesc: 'Камуфляж, шлем и штурмовой автомат.', wiki: 'Оружейный эксперт команды Солдатика, управляющий траекторией пуль при рикошетах.',
    traits: { mainColors: ['зеленый', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Payback', powers: 'Абсолютная меткость, баллистический рикошет пуль', notes: 'Военный шлем, автомат в руках, патронташ на груди.' }
  },
  {
    id: 'blue_hawk', name: 'Синий Ястреб', universe: 'the_boys', avatar: '/characters/blue_hawk.png',
    shortDesc: 'Синяя маска на глазах и кожаный жилет.', wiki: 'Патрульный линчеватель в синей полумаске, превышавший силу против мирных жителей.',
    traits: { mainColors: ['синий', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Одиночка / Vought', powers: 'Сверхчеловеческая физическая сила и стойкость', notes: 'Синяя кожаная маска на верхней части лица.' }
  },
  {
    id: 'love_sausage', name: 'Сосиска Любви (Василий)', universe: 'the_boys', avatar: '/characters/love_sausage.png',
    shortDesc: 'Серый советский спортивный костюм.', wiki: 'Супер из клиники Сэйдж Гроув с гигантским управляемым эластичным органом.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Пациенты Сэйдж Гроув', powers: 'Эластичное управление длиной органа, сверхсила', notes: 'Седой старик с редкими волосами в советском спортивном костюме.' }
  },
  {
    id: 'crimson_countess', name: 'Алая Графиня', universe: 'the_boys', avatar: '/characters/crimson_countess.png',
    shortDesc: 'Красный корсет и огненные шары в руках.', wiki: 'Певица и бывшая напарница Солдатика, мечущая концентрированные взрывные сферы пламени.',
    traits: { mainColors: ['красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Payback', powers: 'Взрывные пиро-кинетические огненные сгустки', notes: 'Женщина, огненно-рыжие волосы, красные перчатки, сферы огня.' }
  },
  {
    id: 'andre_anderson', name: 'Андре Андерсон', universe: 'the_boys', avatar: '/characters/andre_anderson.png',
    shortDesc: 'Бордовый университетский бомбер с золотом.', wiki: 'Студент Годолкина, управляющий магнитными полями и силой мысли сгибающий любые металлы.',
    traits: { mainColors: ['бордовый', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Университет Годолкина', powers: 'Магнетизм, манипуляция металлическими конструкциями', notes: 'Куртка-бомбер с кожаными рукавами, короткая стрижка, кольца.' }
  },
  {
    id: 'jordan_li', name: 'Джордан Ли', universe: 'the_boys', avatar: '/characters/jordan_li.png',
    shortDesc: 'Серебристо-черный спортивный костюм.', wiki: 'Двуполый супер: неуязвимый мужчина в защите и подвижная ловкая девушка с энерго-ударами.',
    traits: { mainColors: ['серебряный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Университет Годолкина', powers: 'Смена биологического пола, неуязвимость / кинетические удары', notes: 'Короткие темные волосы, серебристые наручи на руках.' }
  },
  {
    id: 'emma_meyer', name: 'Эмма Майер (Сверчок)', universe: 'the_boys', avatar: '/characters/emma_meyer.png',
    shortDesc: 'Миниатюрная девушка в розовом топе.', wiki: 'Подруга Мари, способная уменьшаться до размеров насекомого или вырастать в гиганта.',
    traits: { mainColors: ['розовый', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Университет Годолкина', powers: 'Изменение размера тела от микронасекомого до гиганта', notes: 'Женщина, длинные русые волосы, открытое миловидное лицо.' }
  },
  {
    id: 'tek_knight', name: 'Тек-Рыцарь (Роберт Вернон)', universe: 'the_boys', avatar: '/characters/tek_knight.png',
    shortDesc: 'Твидовый костюм и очки детектива.', wiki: 'Богатейший супергерой-детектив со сверхчеловеческой дедукцией в стильном твидовом костюме.',
    traits: { mainColors: ['коричневый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Vought International', powers: 'Абсолютная дедукция по микродвижениям лица, кибер-пещера', notes: 'Твидовый пиджак, очки в роговой оправе, ухоженная бородка.' }
  },
  {
    id: 'todd', name: 'Тодд', universe: 'the_boys', avatar: '/characters/todd.png',
    shortDesc: 'Красная кепка и футболка Хоумлендера.', wiki: 'Обычный гражданин в очках и красной кепке, ставший фанатичным ультраправым сторонником Хоумлендера.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Фанаты Хоумлендера', powers: 'Пропаганда в толпе, слепая фанатичность', notes: 'Красная бейсболка на голове, очки, футболка с принтом Хоумлендера.' }
  },
  {
    id: 'black_noir_ii', name: 'Чёрный Нуар II', universe: 'the_boys', avatar: '/characters/black_noir_ii.png',
    shortDesc: 'Новый актер в броне Нуара с серебряными вставками.', wiki: 'Новый Чёрный Нуар из 4 сезона — нанятый актер, страдающий нарколепсией и постоянно говорящий вслух.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Семёрка', powers: 'Сверхчеловеческая сила, боевая акробатика', notes: 'Глянцевая черная броня с серебряными наплечниками, закрытый шлем.' }
  },
  {
    id: 'grace_mallory', name: 'Грейс Мэллори', universe: 'the_boys', avatar: '/characters/grace_mallory.png',
    shortDesc: 'Основательница Пацанов с короткой седой стрижкой.', wiki: 'Бывший заместитель директора ЦРУ, стоявшая у истоков основания отряда охотников на супов.',
    traits: { mainColors: ['черный', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'ЦРУ / Пацаны', powers: 'Государственная разведка, тактическое командование', notes: 'Женщина, седые короткие волосы, строгая рубашка, строгий взгляд.' }
  },
  {
    id: 'becca_butcher', name: 'Бекка Бутчер', universe: 'the_boys', avatar: '/characters/becca_butcher.png',
    shortDesc: 'Жена Бутчера и мать Райана.', wiki: 'Жена Билли Бутчера, тайно воспитывавшая сына Хоумлендера в секретном изолированном поселении.',
    traits: { mainColors: ['синий', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Гражданские', powers: 'Материнская забота, воспитание супергероя', notes: 'Женщина, русые волосы до плеч, светлый кардиган.' }
  },
  {
    id: 'mesmer', name: 'Месмер', universe: 'the_boys', avatar: '/characters/mesmer.png',
    shortDesc: 'Читает мысли прикосновением руки.', wiki: 'Бывшая звезда телесериала Vought, читающая мысли людей при физическом контакте ладонью.',
    traits: { mainColors: ['коричневый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Одиночка', powers: 'Телепатическое считывание воспоминаний при касании', notes: 'Бежевая куртка, темная щетина, открытые ладони.' }
  },
  {
    id: 'shockwave', name: 'Взрывная Волна', universe: 'the_boys', avatar: '/characters/shockwave.png',
    shortDesc: 'Спидстер-соперник Поезда-А в синем шлеме.', wiki: 'Сверхзвуковой бегун в синем полушлеме с желтыми молниями, главный соперник Поезда-А на треке.',
    traits: { mainColors: ['синий', 'желтый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Vought Athletics', powers: 'Сверхчеловеческая скорость бега', notes: 'Синий шлем спидстера с желтыми молниями по бокам.' }
  },
  {
    id: 'ezechiel', name: 'Иезекииль', universe: 'the_boys', avatar: '/characters/ezechiel.png',
    shortDesc: 'Эластичный проповедник в пасторском костюме.', wiki: 'Религиозный супергерой в пасторском облачении, умеющий растягивать свои конечности как жгуты.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Религиозная миссия Vought', powers: 'Эластичность тела, растяжение рук и ног на десятки метров', notes: 'Пасторский костюм с белым воротничком-колораткой, растянутые руки.' }
  },
  {
    id: 'gecko', name: 'Геккон', universe: 'the_boys', avatar: '/characters/gecko.png',
    shortDesc: 'Сотрудник лаборатории с регенерацией конечностей.', wiki: 'Супергерой из исследовательской лаборатории Vought, мгновенно отращивающий отрезанные пальцы и руки.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Лаборатории Vought', powers: 'Быстрая регенерация утраченных конечностей', notes: 'Белый лабораторный халат, очки на носу.' }
  },
  {
    id: 'splinter', name: 'Сплинтер', universe: 'the_boys', avatar: '/characters/splinter.png',
    shortDesc: 'Супергерой, клонирующий себя при прикосновении.', wiki: 'Последователь Сестры Сэйдж, способный отделять от своего тела идентичных взрослых клонов.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Сторонники Сэйдж', powers: 'Клонирование собственного тела при касании', notes: 'Темная одежда, несколько одинаковых лиц рядом.' }
  },
  {
    id: 'mindstorm', name: 'Майндшторм', universe: 'the_boys', avatar: '/characters/mindstorm.png',
    shortDesc: 'Телепат из Расплаты в солдатской каске.', wiki: 'Бывший член команды Солдатика, погружающий человека в бесконечную кому при зрительном контакте.',
    traits: { mainColors: ['зеленый', 'коричневый'], hasHelmetOrMask: true, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Payback', powers: 'Психическая кома через взгляд, чтение мыслей', notes: 'Военная каска с маскировочной сеткой, авиаторы, густая борода.' }
  },
  {
    id: 'naqib', name: 'Накиб', universe: 'the_boys', avatar: '/characters/naqib.png',
    shortDesc: 'Супер-террорист, взрывающий себя мощной волной.', wiki: 'Сирийский супертеррорист, получивший сыворотку V. Генерирует огненный кинетический взрыв вокруг себя.',
    traits: { mainColors: ['коричневый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Супер-террористы', powers: 'Создание мощных огненных взрывов вокруг своего тела без вреда себе', notes: 'Густая темная борода, восточная куртка, огненная вспышка вокруг.' }
  },
  {
    id: 'cate_dunlap', name: 'Кейт Данлэп', universe: 'the_boys', avatar: '/characters/cate_dunlap.png',
    shortDesc: 'Телепатка из Годолкина, внушающая приказы касанием.', wiki: 'Студентка, подчиняющая разум любого человека и заставляющая выполнять любые команды после касания рукой.',
    traits: { mainColors: ['белый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Суперчеловек (Сыворотка V)', fraction: 'Университет Годолкина', powers: 'Абсолютный контроль разума через прикосновение ладонью', notes: 'Женщина, светлые волосы, кожаные перчатки без пальцев.' }
  },
  {
    id: 'webweaver', name: 'Паутина (Вебвивер)', universe: 'the_boys', avatar: '/characters/webweaver.png',
    shortDesc: 'Супер в сине-зеленом паучьем костюме с лапами.', wiki: 'Супергерой-паук с тяжелой зависимостью, выпускающий прочную органическую паутину из нижней части спины.',
    traits: { mainColors: ['зеленый', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Суперчеловек (Сыворотка V)', fraction: 'Бывший герой Vought', powers: 'Выделение органической паутины, ползание по стенам', notes: 'Костюм с узором паутины, закрытая маска, паучьи лапы за спиной.' }
  },

  // =========================================================================
  // 3. INVINCIBLE (48 персонажей — Мультсериал Amazon, проверено по кадрам)
  // =========================================================================
  {
    id: 'omni_man', name: 'Омни-Мэн (Нолан Грейсон)', universe: 'invincible', avatar: '/characters/omni_man.png',
    shortDesc: 'Бело-красный костюм с плащом и усами.', wiki: 'Вилтрумитский завоеватель с буквой О на груди, черными волосами с седыми висками и длинным алым плащом.',
    traits: { mainColors: ['белый', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Вилтрумит', fraction: 'Империя Вилтрум', powers: 'Сверхсветовой полет, колоссальная физическая мощь, неуязвимость', notes: 'Густые черные усы, длинный красный плащ.' }
  },
  {
    id: 'invincible_mark', name: 'Неуязвимый (Марк Грейсон)', universe: 'invincible', avatar: '/characters/invincible_mark.png',
    shortDesc: 'Желто-сине-черный костюм с буквой «i».', wiki: 'Сын Нолана в маске, закрывающей челюсть и лоб (темные волосы торчат наружу сверху).',
    traits: { mainColors: ['желтый', 'синий', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Полувилтрумит / Человек', fraction: 'Защитники Земли', powers: 'Полет, сверхчеловеческая сила, выживание в открытом космосе', notes: 'Маска на голове, темные волосы торчат сверху.' }
  },
  {
    id: 'atom_eve', name: 'Атомная Ева (Саманта Уилкинс)', universe: 'invincible', avatar: '/characters/atom_eve.png',
    shortDesc: 'Розовый костюм со знаком атома и плащом.', wiki: 'Героиня с длинными рыжими волосами, способная перестраивать молекулярную структуру любой материи.',
    traits: { mainColors: ['розовый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Генетически созданный человек', fraction: 'Стражи / Команда Подростков', powers: 'Молекулярная трансмутация, создание розовых силовых конструкций, полет', notes: 'Женщина, длинные рыжие волосы, розовый короткий плащ.' }
  },
  {
    id: 'allen_alien', name: 'Аллен Пришелец', universe: 'invincible', avatar: '/characters/allen_alien.png',
    shortDesc: 'Оранжевый циклоп в белой майке.', wiki: 'Чемпион Коалиции Планет расы унопианцев: один большой глаз, оранжевая кожа, одет в белую майку/кофту.',
    traits: { mainColors: ['оранжевый', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Унопианец (Инопланетянин)', fraction: 'Коалиция Планет', powers: 'Адаптивное усиление после ранений, полет в космосе, колоссальная мощь', notes: 'Один крупный глаз, оранжевая кожа, без носа, белая майка.' }
  },
  {
    id: 'robot', name: 'Робот (Дрон Руди)', universe: 'invincible', avatar: '/characters/robot.png',
    shortDesc: 'Оранжево-бронзовый металлический дрон.', wiki: 'Угловатый механический дрон с круглым светящимся зеленым оком по центру плоского лица.',
    traits: { mainColors: ['оранжевый', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Робот (Управляемый клон)', fraction: 'Стражи Земного Шара', powers: 'Арсенал встроенных ракет, лазеров, анализ тактики боя в реальном времени', notes: 'Целиком металлический корпус, круглое светящееся око на лице.' }
  },
  {
    id: 'monster_girl', name: 'Девочка-Монстр (Аманда)', universe: 'invincible', avatar: '/characters/monster_girl.png',
    shortDesc: 'Зеленый рогатый гигант-огр.', wiki: 'Аманда в форме свирепого зеленокожего тролля с рогами и массивными клыками из нижней челюсти.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Проклятый человек / Монстр', fraction: 'Стражи Земного Шара', powers: 'Превращение в титанического тролля, сверхсила, каменная кожа', notes: 'Огромный зеленый монстр с рогами и клыками.' }
  },
  {
    id: 'battle_beast', name: 'Боевой Зверь (Терок)', universe: 'invincible', avatar: '/characters/battle_beast.png',
    shortDesc: 'Белый лев-гладиатор с секирой.', wiki: 'Гуманоидный белый лев с пышной гривой в гладиаторских доспехах, вооруженный тяжелой булавой.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Инопланетянин-лев', fraction: 'Одиночка', powers: 'Физическая мощь, превосходящая вилтрумитов, боевой транс', notes: 'Морда белого льва, густая грива, тяжелое холодное оружие в лапе.' }
  },
  {
    id: 'cecil_stedman', name: 'Сесил Стедман', universe: 'invincible', avatar: '/characters/cecil_stedman.png',
    shortDesc: 'Черный костюм, седина и шрам на горле.', wiki: 'Директор Агентства Обороны в строгом пиджаке с седыми волосами и длинным шрамом через все горло.',
    traits: { mainColors: ['черный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Агентство Глобальной Обороны', powers: 'Карманный телепортатор, спутниковое орбитальное оружие', notes: 'Седые гладкие волосы, глубокий горизонтальный шрам на шее.' }
  },
  {
    id: 'the_immortal', name: 'Бессмертный', universe: 'invincible', avatar: '/characters/the_immortal.png',
    shortDesc: 'Синий костюм с золотой буквой «I».', wiki: 'Древний воин в синем костюме с черной шкиперской бородой без усов, летающий на сверхзвуке.',
    traits: { mainColors: ['синий', 'золотой'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: false, race: 'Бессмертный человек', fraction: 'Стражи Земного Шара', powers: 'Бессмертие, воскрешение при соединении тела, полет, сверхсила', notes: 'Густая черная борода БЕЗ усов, золотой пояс.' }
  },
  {
    id: 'rex_splode', name: 'Рекс Сплоуд', universe: 'invincible', avatar: '/characters/rex_splode.png',
    shortDesc: 'Оранжевый костюм и круглые желтые очки.', wiki: 'Вспыльчивый герой с кибер-имплантами, заряжающий любые предметы взрывной розовой кинетикой.',
    traits: { mainColors: ['оранжевый', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Кибернетически измененный человек', fraction: 'Стражи Земного Шара', powers: 'Кинетическая зарядка предметов взрывной розовой энергией', notes: 'Круглые желтые очки на глазах, взрывные розовые заряды в руках.' }
  },
  {
    id: 'angstrom_levy', name: 'Ангстром Леви', universe: 'invincible', avatar: '/characters/angstrom_levy.png',
    shortDesc: 'Гигантский мозг, синий пиджак и бородка.', wiki: 'Путешественник по измерениям в синем пиджаке и бордовом свитере, с огромным мозгом со шрамом и эспаньолкой.',
    traits: { mainColors: ['синий', 'бордовый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Мутировавший человек', fraction: 'Одиночка / Враг Марка', powers: 'Открытие порталов между измерениями, память тысяч двойников', notes: 'Огромный выступающий мозг с фиолетовым шрамом, синий пиджак, бородка, БЕЗ маски.' }
  },
  {
    id: 'conquest', name: 'Завоеватель', universe: 'invincible', avatar: '/characters/conquest.png',
    shortDesc: 'Седой вилтрумит с железным глазом.', wiki: 'Кровожадный престарелый вилтрумит со стальной пластиной вместо правого глаза и седой бородой.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Вилтрумит', fraction: 'Империя Вилтрум', powers: 'Колоссальная разрушительная мощь, боевой транс берсерка', notes: 'Стальная пластина на правом глазу, седая борода и волосы.' }
  },
  {
    id: 'thragg', name: 'Великий Регент Трагг', universe: 'invincible', avatar: '/characters/thragg.png',
    shortDesc: 'Вилтрумитский мундир с красными эполетами.', wiki: 'Абсолютный правитель Вилтрума с темными усами и боевыми шрамами на челюсти.',
    traits: { mainColors: ['белый', 'красный'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Вилтрумит', fraction: 'Империя Вилтрум', powers: 'Сильнейшее существо во Вселенной, идеальное боевое искусство', notes: 'Густые темные усы, короткая стрижка, шрамы на челюсти.' }
  },
  {
    id: 'dupli_kate', name: 'Дупли-Кейт (Кейт Ча)', universe: 'invincible', avatar: '/characters/dupli_kate.png',
    shortDesc: 'Красно-белое кимоно с цифрой «1».', wiki: 'Героиня азиатской внешности с двумя хвостиками, создающая клонов своего тела.',
    traits: { mainColors: ['красный', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек с суперсилами', fraction: 'Стражи Земного Шара', powers: 'Мгновенное самоклонирование при помощи цифр на теле', notes: 'Женщина, две косички по бокам, цифра 1 на груди.' }
  },
  {
    id: 'anissa', name: 'Анисса', universe: 'invincible', avatar: '/characters/anissa.png',
    shortDesc: 'Белая вилтрумитская форма с коротким рукавом.', wiki: 'Вилтрумитская воительница-инспектор с короткой черной стрижкой каре и надменным взглядом.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Вилтрумит', fraction: 'Империя Вилтрум', powers: 'Сверхсветовой полет, сокрушительная физическая сила', notes: 'Женщина, короткая стрижка каре, белый костюм с коротким рукавом.' }
  },
  {
    id: 'bulletproof', name: 'Пуленепробиваемый (Зандер)', universe: 'invincible', avatar: '/characters/bulletproof.png',
    shortDesc: 'Оранжево-коричневый костюм с белым кругом.', wiki: 'Герой в оранжево-коричневой форме с круглыми очками на лбу, поглощающий энергию ударов.',
    traits: { mainColors: ['оранжевый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек с суперсилами', fraction: 'Стражи Земного Шара', powers: 'Поглощение и аккумулирование кинетической энергии, полет', notes: 'Открытое лицо, защитные очки подняты на лоб.' }
  },
  {
    id: 'damien_darkblood', name: 'Дэмиен Даркблад', universe: 'invincible', avatar: '/characters/damien_darkblood.png',
    shortDesc: 'Красный демон в плаще и шляпе детектива.', wiki: 'Детектив из Ада с красной кожей, загнутыми рогами, бежевым тренчем и шляпой-федорой.',
    traits: { mainColors: ['красный', 'бежевый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Демон', fraction: 'Одиночка', powers: 'Адское чутье, некромантия, устойчивость к огню', notes: 'Красная кожа лица, два загнутых рога, шляпа-федора.' }
  },
  {
    id: 'doc_seismic', name: 'Док Сейсмик', universe: 'invincible', avatar: '/characters/doc_seismic.png',
    shortDesc: 'Лысый старик в белом халате и красной кофте.', wiki: 'Безумный геолог в белом халате и красной кофте с белой ломаной линией сейсмографа. Без очков.',
    traits: { mainColors: ['белый', 'красный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Одиночка / Враг Марка', powers: 'Сейсмические наручи, вызывающие разломы земли и лаву', notes: 'Лысая голова, открытое лицо БЕЗ очков, белый халат, красный свитер с молнией-зигзагом.' }
  },
  {
    id: 'red_rush', name: 'Красная Ракета (Red Rush)', universe: 'invincible', avatar: '/characters/red_rush.png',
    shortDesc: 'Красный костюм спидстера со шлемом.', wiki: 'Русский сверхзвуковой бегун из первого состава Стражей в красном шлеме, закрывающем уши.',
    traits: { mainColors: ['красный', 'белый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек с суперсилами', fraction: 'Оригинальные Стражи', powers: 'Сверхзвуковая скорость, ускоренные рефлексы', notes: 'Красный шлем закрывает уши и лоб, белые полосы по бокам.' }
  },
  {
    id: 'war_woman', name: 'Воительница (War Woman)', universe: 'invincible', avatar: '/characters/war_woman.png',
    shortDesc: 'Бронзовый шлем спартанки и булава.', wiki: 'Античная амазонка в латах с белым плюмажем на шлеме и массивной металлической булавой.',
    traits: { mainColors: ['золотой', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Амазонка (Мифический человек)', fraction: 'Оригинальные Стражи', powers: 'Полет, сверхчеловеческая мощь, бой булавой', notes: 'Женщина, бронзовый шлем с белыми перьями, булава в руке.' }
  },
  {
    id: 'darkwing', name: 'Темнокрыл (Оригинал)', universe: 'invincible', avatar: '/characters/darkwing.png',
    shortDesc: 'Темно-серый шлем со светящимися белыми глазами.', wiki: 'Оригинальный защитник Полуночного города в шлеме с ушками и светящимися белыми щелками глаз.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек', fraction: 'Оригинальные Стражи', powers: 'Теневой арсенал гаджетов, плащ-крылья, боевые искусства', notes: 'Светящиеся белые глаза без зрачков, темно-серая маска с ушками.' }
  },
  {
    id: 'aquarus', name: 'Акварус', universe: 'invincible', avatar: '/characters/aquarus.png',
    shortDesc: 'Зеленая рыбья чешуя и золотой пояс Атлантиды.', wiki: 'Рыбоподобный король подводного царства с круглыми выпуклыми глазами и плавниками.',
    traits: { mainColors: ['зеленый', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Атлант (Рыбочеловек)', fraction: 'Оригинальные Стражи / Атлантида', powers: 'Гидрокинез, управление морскими течениями, подводное дыхание', notes: 'Зеленая чешуйчатая кожа, круглые рыбьи глаза, золотой пояс.' }
  },
  {
    id: 'green_ghost', name: 'Зеленый Призрак', universe: 'invincible', avatar: '/characters/green_ghost.png',
    shortDesc: 'Светящийся зеленый костюм-капюшон.', wiki: 'Неосязаемая героиня в изумрудном полупрозрачном комбинезоне с капюшоном, проходящая сквозь стены.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек (Инопланетный нефрит)', fraction: 'Оригинальные Стражи', powers: 'Фазирование сквозь материю, полет, неосязаемость', notes: 'Женщина, полупрозрачное зеленое свечение вокруг капюшона.' }
  },
  {
    id: 'martian_man', name: 'Марсианин', universe: 'invincible', avatar: '/characters/martian_man.png',
    shortDesc: 'Растянутое зеленое тело пришельца.', wiki: 'Беглец с Марса, растягивающий свое тело в гибкие жгуты, сети и щиты.',
    traits: { mainColors: ['зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Марсианин', fraction: 'Оригинальные Стражи', powers: 'Пластичность тела, растяжение конечностей, смена формы', notes: 'Зеленое гибкое тело, безносая голова пришельца.' }
  },
  {
    id: 'lucan', name: 'Люкан', universe: 'invincible', avatar: '/characters/lucan.png',
    shortDesc: 'Бородатый вилтрумит со шрамом на животе.', wiki: 'Ветеран империи Вилтрум с пышной бородой и бакенбардами, рассеченный ударом Омни-Мэна.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Вилтрумит', fraction: 'Империя Вилтрум', powers: 'Сверхсила вилтрумита, выживание при смертельных ранах', notes: 'Густая черная борода с бакенбардами, широкий шрам поперек торса.' }
  },
  {
    id: 'general_kregg', name: 'Генерал Крегг', universe: 'invincible', avatar: '/characters/general_kregg.png',
    shortDesc: 'Седой вилтрумит с красным кибер-глазом.', wiki: 'Командующий вилтрумитов с короткими усами и светящимся алым оптическим имплантом.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: false, isVillain: true, race: 'Вилтрумит (Киборг)', fraction: 'Империя Вилтрум', powers: 'Космический полет, кибер-сканирование глаза, сверхсила', notes: 'Светящийся красный кибер-глаз справа, седые усы.' }
  },
  {
    id: 'thula', name: 'Тула', universe: 'invincible', avatar: '/characters/thula.png',
    shortDesc: 'Седая воительница с кинжалом на косе.', wiki: 'Пожилая вилтрумитка в белой тунике с длинной седой косой, оканчивающейся острым стальным клинком.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Вилтрумит', fraction: 'Империя Вилтрум', powers: 'Вилтрумитская скорость, бой лезвием на косе', notes: 'Женщина, длинная седая коса с прикрепленным кинжалом.' }
  },
  {
    id: 'oliver_grayson', name: 'Оливер (Кид Омни-Мэн)', universe: 'invincible', avatar: '/characters/oliver_grayson.png',
    shortDesc: 'Фиолетовая кожа и костюм с плащом.', wiki: 'Младший брат Марка от трэксанской королевы с фиолетовым лицом и ускоренным взрослением.',
    traits: { mainColors: ['фиолетовый', 'красный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Полувилтрумит / Трэксанец', fraction: 'Семья Грейсонов', powers: 'Сверхскоростное развитие, полет, сила вилтрумита', notes: 'Фиолетовая кожа лица, темные волосы, плащ.' }
  },
  {
    id: 'shapesmith', name: 'Шейпсмит', universe: 'invincible', avatar: '/characters/shapesmith.png',
    shortDesc: 'Красно-синий костюм со стрелой.', wiki: 'Марсианин, принявший облик астронавта Рассветного Корпуса, меняющий плотность тела.',
    traits: { mainColors: ['красный', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Марсианин', fraction: 'Стражи Земного Шара', powers: 'Морфинг тела, копирование внешности людей', notes: 'Заостренная форма головы с наростами, стрелка на груди.' }
  },
  {
    id: 'shrink_rae', name: 'Сжимающаяся Рэй', universe: 'invincible', avatar: '/characters/shrink_rae.png',
    shortDesc: 'Зелено-черный костюм микро-героини.', wiki: 'Член нового состава Стражей, уменьшающаяся до микроскопических величин.',
    traits: { mainColors: ['зеленый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек с суперсилами', fraction: 'Стражи Земного Шара', powers: 'Микро-сжатие размеров тела, проникновение внутрь врагов', notes: 'Женщина, короткая стрижка, защитные очки на лбу.' }
  },
  {
    id: 'black_samson', name: 'Черный Самсон', universe: 'invincible', avatar: '/characters/black_samson.png',
    shortDesc: 'Лысый в желто-золотой силовой броне.', wiki: 'Ветеран Стражей Земли в массивном желто-золотом экзоскелете с высоким воротником-стойкой.',
    traits: { mainColors: ['золотой', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек с суперсилами', fraction: 'Стражи Земного Шара', powers: 'Силовой экзокостюм, генерация биоэлектрических взрывов', notes: 'Лысая голова, желто-золотая броня с высоким воротником-стойкой.' }
  },
  {
    id: 'killcannon', name: 'Киллкэннон', universe: 'invincible', avatar: '/characters/killcannon.png',
    shortDesc: 'Красный визор и пушка на левой руке.', wiki: 'Киборг-рецидивист в серой кирасе с красными ремнями и огромной белой пушкой на левой руке.',
    traits: { mainColors: ['серый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Киборг', fraction: 'Одиночка', powers: 'Энергетический лазер высокой мощности из пушки', notes: 'Сплошной красный визор на глазах, пушка на ЛЕВОЙ руке, серая кираса.' }
  },
  {
    id: 'machine_head', name: 'Автоматоголовый', universe: 'invincible', avatar: '/characters/machine_head.png',
    shortDesc: 'Золотая квадратная голова и белый смокинг.', wiki: 'Криминальный босс с микрочипом предсказания ходов и прямоугольным золотым металлическим блоком-головой.',
    traits: { mainColors: ['белый', 'золотой'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Киборг', fraction: 'Организованная преступность', powers: 'Квантовый процессор просчета вероятностей, армия наемников', notes: 'Золотая металлическая голова без черт лица, белый смокинг.' }
  },
  {
    id: 'titan', name: 'Титан', universe: 'invincible', avatar: '/characters/titan.png',
    shortDesc: 'Тело покрыто броней из каменных валунов.', wiki: 'Криминальный лидер, наращивающий сверхпрочный скальный панцирь вокруг своего тела.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Человек с суперсилами', fraction: 'Преступный синдикат', powers: 'Формирование монолитного каменного экзопанциря, сверхсила', notes: 'Кожа покрыта серыми скальными валунами и плитами.' }
  },
  {
    id: 'tether_tyrant', name: 'Тиран Привязи', universe: 'invincible', avatar: '/characters/tether_tyrant.png',
    shortDesc: 'Живые розовые щупальца из груди.', wiki: 'Наемник в зеленом скафандре, управляющий инопланетным симбиотом из щупалец в торсе.',
    traits: { mainColors: ['зеленый', 'розовый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Человек с инопланетным симбиотом', fraction: 'Лига наемников', powers: 'Выброс пучков цепких розовых щупалец из грудной клетки', notes: 'Круглый шлем, клубок щупалец вырывается из груди.' }
  },
  {
    id: 'magmanite', name: 'Магманит', universe: 'invincible', avatar: '/characters/magmanite.png',
    shortDesc: 'Монстр из пылающей лавы и камня.', wiki: 'Подземный великан, состоящий из растрескавшейся базальтовой коры и кипящей магмы.',
    traits: { mainColors: ['оранжевый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Подземное лавовое существо', fraction: 'Слуги Дока Сейсмика', powers: 'Извержение магмы, пирокинез, каменная стойкость', notes: 'Пылающее лавовое тело с черными растрескавшимися камнями.' }
  },
  {
    id: 'debbie_grayson', name: 'Дебби Грейсон', universe: 'invincible', avatar: '/characters/debbie_grayson.png',
    shortDesc: 'Мать Марка и жена Омни-Мэна.', wiki: 'Обычная женщина-риэлтор, пережившая предательство мужа и поддерживающая Марка.',
    traits: { mainColors: ['коричневый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Семья Грейсонов', powers: 'Моральная стойкость, аналитическая проницательность', notes: 'Женщина, каштановые волосы до плеч, открытое доброе лицо.' }
  },
  {
    id: 'william_clockwell', name: 'Уильям Клокуэлл', universe: 'invincible', avatar: '/characters/william_clockwell.png',
    shortDesc: 'Лучший друг Марка в колледже.', wiki: 'Близкий друг Марка, знающий его тайну личности и помогающий не сойти с ума.',
    traits: { mainColors: ['желтый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Гражданские', powers: 'Поддержка супергероя, вождение авто', notes: 'Светлые короткие волосы, худи, без бороды.' }
  },
  {
    id: 'amber_bennett', name: 'Эмбер Беннетт', universe: 'invincible', avatar: '/characters/amber_bennett.png',
    shortDesc: 'Первая девушка Марка Грейсона.', wiki: 'Школьная активистка с кудрявыми волосами, догадавшаяся о супергеройской тайне Марка.',
    traits: { mainColors: ['синий', 'зеленый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Гражданские', powers: 'Социальная активность, расследование', notes: 'Женщина, пышные темные кудри, джинсовая куртка.' }
  },
  {
    id: 'donald_ferguson', name: 'Дональд Фергюсон', universe: 'invincible', avatar: '/characters/donald_ferguson.png',
    shortDesc: 'Правая рука Сесила, киборг Агентства.', wiki: 'Преданный агент Сесила Стедмана, чье тело было многократно восстановлено кибернетикой.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Человек (Киборг)', fraction: 'Агентство Глобальной Обороны', powers: 'Кибернетический скелет, встроенные датчики, боевой пистолет', notes: 'Серый деловой костюм, очки в черной оправе, выбрит.' }
  },
  {
    id: 'da_sinclair', name: 'Д.А. Синклер', universe: 'invincible', avatar: '/characters/da_sinclair.png',
    shortDesc: 'Безумный создатель зомби-киборгов Реаниманов.', wiki: 'Гениальный ученый, похищавший студентов университета для создания механических солдат.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Ученые / Агентство', powers: 'Кибернетическая биоинженерия, создание Реаниманов', notes: 'Белый халат, круглые очки, взъерошенные темные волосы.' }
  },
  {
    id: 'reaniman', name: 'Реанимен', universe: 'invincible', avatar: '/characters/reaniman.png',
    shortDesc: 'Кибернетический бронированный зомби-солдат.', wiki: 'Бесчувственная боевая машина из человеческих останков в тяжелых металлических латах.',
    traits: { mainColors: ['серый', 'красный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Зомби-киборг', fraction: 'Творения Синклера / Агентство', powers: 'Сверхчеловеческая сила, нечувствительность к боли', notes: 'Тяжелый серый шлем, один горизонтальный красный визор.' }
  },
  {
    id: 'flaxan_leader', name: 'Лидер Флаксанцев', universe: 'invincible', avatar: '/characters/flaxan_leader.png',
    shortDesc: 'Зеленый пришелец с усиками в бело-синей броне.', wiki: 'Командующий вторжением из Флаксы с открытым зеленым лицом с усиками и бело-синим панцирем.',
    traits: { mainColors: ['зеленый', 'белый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Флаксанец (Инопланетянин)', fraction: 'Армия Флаксы', powers: 'Сверхбыстрый метаболизм, командование флотом вторжения', notes: 'Зеленая голова с антеннами БЕЗ шлема, белый нагрудник с синей туникой.' }
  },
  {
    id: 'rus_livingston', name: 'Руслан Ливингстон (Секвидды)', universe: 'invincible', avatar: '/characters/rus_livingston.png',
    shortDesc: 'Астронавт, захваченный роем Секвиддов.', wiki: 'Земной астронавт, ставший единым разумом для миллионов инопланетных паразитов.',
    traits: { mainColors: ['белый', 'розовый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Человек под контролем роя', fraction: 'Рой Секвиддов', powers: 'Коллективный разум роя, физическая мощь паразитов', notes: 'Скафандр астронавта, покрытый шевелящимися розовыми кальмарами.' }
  },
  {
    id: 'powerplex', name: 'Пауэрплекс (Скотт Дюваль)', universe: 'invincible', avatar: '/characters/powerplex.png',
    shortDesc: 'Белые светящиеся глаза и желтые молнии.', wiki: 'Суперзлодей со светлыми волосами, горящими белыми глазами и костюмом, излучающим электричество.',
    traits: { mainColors: ['коричневый', 'желтый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Человек с суперсилами', fraction: 'Одиночка / Враг Марка', powers: 'Поглощение кинетической энергии, мощнейшие электрические разряды', notes: 'Светлые волосы, сплошные белые светящиеся глаза, желтые молнии вокруг тела.' }
  },
  {
    id: 'darkwing_ii', name: 'Темнокрыл II', universe: 'invincible', avatar: '/characters/darkwing_ii.png',
    shortDesc: 'Темная маска с вырезом под глаза и подбородок.', wiki: 'Преемник Темнокрыла, погружающий врагов в Теневое измерение. Обычные карие глаза со зрачками.',
    traits: { mainColors: ['черный', 'фиолетовый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Человек с теневыми силами', fraction: 'Одиночка', powers: 'Телепортация сквозь тени, поглощение врагов в Теневой мир', notes: 'Темно-фиолетовая маска, открытые карие глаза с видимыми зрачками (не белые линзы!).' }
  },
  {
    id: 'bolt', name: 'Болт (Брюс)', universe: 'invincible', avatar: '/characters/bolt.png',
    shortDesc: 'Желтый костюм, глаза-молнии и ирокез.', wiki: 'Супергерой из Capes Inc., управляющий электричеством, в желтом комбинезоне с гребнем-молнией на голове.',
    traits: { mainColors: ['желтый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Человек с суперсилами', fraction: 'Capes Inc.', powers: 'Генерация электроразрядов, электрический рывок', notes: 'Ярко-желтый костюм, плавник-молния на маске, глаза в виде молний, голубые разряды за плечами.' }
  },
  {
    id: 'furnace', name: 'Печь (Фёрнес)', universe: 'invincible', avatar: '/characters/furnace.png',
    shortDesc: 'Черный робот с решеткой и вытекающей лавой.', wiki: 'Тяжелый киборг с желтыми полосами на броне, из переднего дула которого струится раскаленная лава.',
    traits: { mainColors: ['черный', 'желтый', 'оранжевый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Киборг', fraction: 'Лига злодеев', powers: 'Выброс потоков кипящей лавы, чугунная огнеупорная броня', notes: 'Черный корпус с желтыми полосами и решеткой на голове, струящаяся желто-оранжевая лава.' }
  },

  // =========================================================================
  // 4. STAR WARS (36 персонажей — Фильмы и канонические сериалы)
  // =========================================================================
  {
    id: 'darth_vader', name: 'Дарт Вейдер (Энакин Скайуокер)', universe: 'star_wars', avatar: '/characters/darth_vader.png',
    shortDesc: 'Черная глянцевая броня ситха с респиратором.', wiki: 'Лорд ситхов в черной броне с системой жизнеобеспечения на груди и красным световым мечом.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек (Киборг)', fraction: 'Галактическая Империя / Ситхи', powers: 'Тёмная сторона Силы, удушение, телекинез, сокрушительный бой на мечах', notes: 'Лицо полностью скрыто респиратором, длинный плащ, красный меч.' }
  },
  {
    id: 'luke_skywalker', name: 'Люк Скайуокер', universe: 'star_wars', avatar: '/characters/luke_skywalker.png',
    shortDesc: 'Черный джедайский костюм и зеленый меч.', wiki: 'Магистр-джедай в черной тунике с перчаткой на кибернетической руке и зеленым световым мечом.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Орден Джедаев / Альянс', powers: 'Светлая сторона Силы, предвидение, акробатический джедайский бой', notes: 'Светлые волосы, без шлема, зеленый световой меч.' }
  },
  {
    id: 'yoda', name: 'Магистр Йода', universe: 'star_wars', avatar: '/characters/yoda.png',
    shortDesc: 'Зеленый пришелец в бежевой мантии с тростью.', wiki: 'Гранд-магистр Ордена джедаев возрастом 900 лет с длинными ушами и зеленой кожей.',
    traits: { mainColors: ['зеленый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Неизвестная раса Йоды', fraction: 'Орден Джедаев', powers: 'Абсолютная связь с Силой, мощный телекинез, стиль Атару', notes: 'Маленький зеленый старец с большими ушами, деревянная трость.' }
  },
  {
    id: 'obi_wan', name: 'Оби-Ван Кеноби', universe: 'star_wars', avatar: '/characters/obi_wan.png',
    shortDesc: 'Бежевая роба джедая и синий световой меч.', wiki: 'Мастер-джедай с рыжеватой бородой в светлой тунике с синим световым клинком.',
    traits: { mainColors: ['бежевый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Орден Джедаев', powers: 'Обман разума Силой, мастер защитного стиля Соресу', notes: 'Рыжая борода, светлая туника, синий меч.' }
  },
  {
    id: 'han_solo', name: 'Хан Соло', universe: 'star_wars', avatar: '/characters/han_solo.png',
    shortDesc: 'Белая рубаха, черная жилетка и бластер.', wiki: 'Капитан «Тысячелетнего Сокола» в белой расстегнутой рубахе, жилете и с бластером DL-44.',
    traits: { mainColors: ['белый', 'черный', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Альянс Повстанцев / Контрабандисты', powers: 'Виртуозное пилотирование, молниеносная реакция при стрельбе', notes: 'Черная жилетка, кобура на бедре, бластер в руке.' }
  },
  {
    id: 'leia_organa', name: 'Принцесса Лея', universe: 'star_wars', avatar: '/characters/leia_organa.png',
    shortDesc: 'Белое струящееся платье и прическа-бублики.', wiki: 'Лидер Повстанцев в белом платье с серебряным поясом и двумя круглыми пучками волос по бокам.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Альянс Повстанцев', powers: 'Дипломатия, скрытая чувствительность к Силе, тактическое командование', notes: 'Женщина в белом платье, прическа «булочки» по бокам головы.' }
  },
  {
    id: 'chewbacca', name: 'Чубакка', universe: 'star_wars', avatar: '/characters/chewbacca.png',
    shortDesc: 'Мохнатый вуки с кожаным патронташем.', wiki: 'Преданный вуки, целиком покрытый коричневой шерстью, с серебристым энергетическим арбалетом.',
    traits: { mainColors: ['коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Вуки', fraction: 'Альянс Повстанцев', powers: 'Сверхчеловеческая сила, стрельба из лазерного арбалета', notes: 'Всё тело в коричневой шерсти, ремень-патронташ через плечо.' }
  },
  {
    id: 'boba_fett', name: 'Боба Фетт', universe: 'star_wars', avatar: '/characters/boba_fett.png',
    shortDesc: 'Зеленый мандалорский шлем с Т-визором.', wiki: 'Легендарный охотник за головами в поцарапанной зеленой мандалорской броне с джетпаком.',
    traits: { mainColors: ['зеленый', 'желтый', 'серый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек (Клон)', fraction: 'Охотники за головами', powers: 'Ракетный ранец, огнемет, наручные ракеты, выживание', notes: 'Шлем мандалорца с антенной-дальномером, лицо скрыто.' }
  },
  {
    id: 'palpatine', name: 'Император Палпатин (Дарт Сидиус)', universe: 'star_wars', avatar: '/characters/palpatine.png',
    shortDesc: 'Черный балахон и синие молнии из рук.', wiki: 'Владыка ситхов в глубоком черном капюшоне, стреляющий молниями Силы из кривых пальцев.',
    traits: { mainColors: ['черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Галактическая Империя / Ситхи', powers: 'Молнии Силы, телекинез, абсолютное манипулирование разумом', notes: 'Черный капюшон скрывает лоб, бледное лицо, желтые глаза.' }
  },
  {
    id: 'mandalorian', name: 'Дин Джарин (Мандалорец)', universe: 'star_wars', avatar: '/characters/mandalorian.png',
    shortDesc: 'Зеркальная броня из чистого бескара.', wiki: 'Одинокий стрелок в зеркально-серебристом бескарском шлеме с Т-образным стеклом.',
    traits: { mainColors: ['серебряный', 'серый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Дети Дозора / Мандалорцы', powers: 'Стрельба из бластера, свистящие птицы-дротики, Тёмный меч', notes: 'Блестящий хромированный шлем без лица, коричневый плащ.' }
  },
  {
    id: 'grogu', name: 'Грогу (Малыш)', universe: 'star_wars', avatar: '/characters/grogu.png',
    shortDesc: 'Крошечный зеленый малыш в бежевой робе.', wiki: 'Чувствительный к Силе зеленый найденыш с огромными черными глазами и длинными ушами.',
    traits: { mainColors: ['зеленый', 'бежевый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Неизвестная раса Йоды', fraction: 'Мандалорцы / Джедаи', powers: 'Силовой щит, усыпление гигантских монстров Силой, исцеление', notes: 'Крошечный размер, огромные уши, темные глаза, теплая роба.' }
  },
  {
    id: 'ahsoka_tano', name: 'Асока Тано', universe: 'star_wars', avatar: '/characters/ahsoka_tano.png',
    shortDesc: 'Оранжевая кожа, бело-синие лекку и белые мечи.', wiki: 'Тогрута с полосатыми головными отростками-лекку, белыми узорами на лице и двумя белыми световыми мечами.',
    traits: { mainColors: ['оранжевый', 'синий', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: false, race: 'Тогрута', fraction: 'Независимый джедай', powers: 'Светлая сторона Силы, парный бой световыми мечами Джар-Кай', notes: 'Оранжевая кожа, полосатые бело-синие рога-лекку вместо волос.' }
  },
  {
    id: 'darth_maul', name: 'Дарт Мол', universe: 'star_wars', avatar: '/characters/darth_maul.png',
    shortDesc: 'Красно-черные татуировки, рога и двойной меч.', wiki: 'Забрак с короной из рожек на черепе, черно-красным раскрашенным лицом и двухклинковым красным мечом.',
    traits: { mainColors: ['красный', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Датомирский забрак', fraction: 'Ситхи / Коллектив теней', powers: 'Акробатический смертоносный бой двухклинковым мечом, ярость Тьмы', notes: 'Красное лицо с черными узорами, корона из рожек.' }
  },
  {
    id: 'mace_windu', name: 'Мейс Винду', universe: 'star_wars', avatar: '/characters/mace_windu.png',
    shortDesc: 'Светлая туника джедая и фиолетовый меч.', wiki: 'Лысый магистр Высшего Совета джедаев в светлой робе с уникальным фиолетовым световым мечом.',
    traits: { mainColors: ['бежевый', 'коричневый'], hasHelmetOrMask: false, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Орден Джедаев', powers: 'Создатель боевого стиля Ваапад, видение уязвимостей в Силе', notes: 'Лысая голова, открытое лицо, фиолетовый световой меч.' }
  },
  {
    id: 'kylo_ren', name: 'Кайло Рен (Бен Соло)', universe: 'star_wars', avatar: '/characters/kylo_ren.png',
    shortDesc: 'Черная маска с серебром и меч с гардой.', wiki: 'Магистр рыцарей Рен в капюшоне, ребристой черной маске и с нестабильным красным мечом-крестовиной.',
    traits: { mainColors: ['черный', 'серебряный'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Первый Орден', powers: 'Остановка бластерных выстрелов в воздухе, допрос Силой', notes: 'Черная маска с серебром закрывает лицо, меч с боковыми зубьями.' }
  },
  {
    id: 'rey_skywalker', name: 'Рей Скайуокер', universe: 'star_wars', avatar: '/characters/rey_skywalker.png',
    shortDesc: 'Светлые льняные повязки мусорщицы.', wiki: 'Джедайка с тремя пучками на затылке в светлых льняных повязках с синим световым мечом.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Сопротивление / Джедаи', powers: 'Светлая сторона Силы, телекинез, исцеление ран Силой', notes: 'Женщина, прическа из трех узелков, световой меч.' }
  },
  {
    id: 'anakin_skywalker', name: 'Энакин Скайуокер', universe: 'star_wars', avatar: '/characters/anakin_skywalker.png',
    shortDesc: 'Темно-коричневая кожаная туника со шрамом.', wiki: 'Рыцарь-джедай времен Войн клонов с вьющимися волосами, шрамом у правого глаза и синим мечом.',
    traits: { mainColors: ['черный', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Орден Джедаев', powers: 'Колоссальный потенциал в Силе, непревзойденный пилотаж, стиль Джем Со', notes: 'Шрам у правого глаза, волосы до плеч, синий световой меч.' }
  },
  {
    id: 'general_grievous', name: 'Генерал Гривус', universe: 'star_wars', avatar: '/characters/general_grievous.png',
    shortDesc: 'Белый скелет-киборг с четырьмя мечами.', wiki: 'Командующий армией дроидов с белой маской-черепом, четырьмя руками и четырьмя трофейными мечами.',
    traits: { mainColors: ['белый', 'серый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Калиш (Киборг)', fraction: 'КНС (Сепаратисты)', powers: 'Владение четырьмя световыми мечами одновременно, молниеносные атаки', notes: 'Белый металлический скелет, маска-череп, 4 световых меча.' }
  },
  {
    id: 'count_dooku', name: 'Граф Дуку (Дарт Тиранус)', universe: 'star_wars', avatar: '/characters/count_dooku.png',
    shortDesc: 'Коричневый плащ с цепочкой и изогнутый меч.', wiki: 'Лорд ситхов с благородной сединой, аккуратной бородой и световым мечом с изогнутой рукоятью.',
    traits: { mainColors: ['коричневый', 'черный'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Ситхи / Сепаратисты', powers: 'Молнии Силы, фехтование стилем Макаши высшего мастерства', notes: 'Седые волосы и бородка, плащ на цепочке, изогнутый красный меч.' }
  },
  {
    id: 'padme_amidala', name: 'Падме Амидала', universe: 'star_wars', avatar: '/characters/padme_amidala.png',
    shortDesc: 'Белый облегающий костюм с бластером.', wiki: 'Сенатор Набу на арене Джеонозиса: белый облегающий костюм с открытым животом и пистолетом в руке.',
    traits: { mainColors: ['белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Галактическая Республика', powers: 'Дипломатия, меткая стрельба из бластера, тактика', notes: 'Женщина, темные волосы в хвосте, белый костюм с открытой талией.' }
  },
  {
    id: 'qui_gon_jinn', name: 'Квай-Гон Джинн', universe: 'star_wars', avatar: '/characters/qui_gon_jinn.png',
    shortDesc: 'Просторная туника джедая и длинные волосы.', wiki: 'Учитель Оби-Вана с длинными каштановыми волосами, аккуратной бородой и зеленым клинком.',
    traits: { mainColors: ['бежевый', 'коричневый'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Орден Джедаев', powers: 'Глубокая Живая Сила, предвидение, форма Атару', notes: 'Длинные волосы назад, аккуратная борода, зеленый меч.' }
  },
  {
    id: 'lando_calrissian', name: 'Лэндо Калриссиан', universe: 'star_wars', avatar: '/characters/lando_calrissian.png',
    shortDesc: 'Синяя рубашка и стильный плащ с золотом.', wiki: 'Барон Облачного города в синем костюме с атласным плащом и аккуратными пышными усами.',
    traits: { mainColors: ['синий', 'золотой'], hasHelmetOrMask: false, hasCape: true, hasBeard: true, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Альянс Повстанцев', powers: 'Азартные игры, харизма, командование флотом повстанцев', notes: 'Пышные усы, сине-золотой плащ с атласной подкладкой.' }
  },
  {
    id: 'finn', name: 'Финн (FN-2187)', universe: 'star_wars', avatar: '/characters/finn.png',
    shortDesc: 'Коричневая кожаная куртка с красной полосой.', wiki: 'Бывший штурмовик в куртке По Дэмерона и темной футболке с бластером в руках.',
    traits: { mainColors: ['коричневый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Сопротивление', powers: 'Военная подготовка штурмовика, скрытая чувствительность к Силе', notes: 'Короткая стрижка, куртка с красными вставками.' }
  },
  {
    id: 'stormtrooper', name: 'Имперский Штурмовик', universe: 'star_wars', avatar: '/characters/stormtrooper.png',
    shortDesc: 'Белая составная пластиковая броня и шлем.', wiki: 'Пехотинец Империи в чисто-белой кирасе, закрытом белом шлеме и с черным карабином E-11.',
    traits: { mainColors: ['белый', 'черный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Галактическая Империя', powers: 'Стрельба из бластера в строю, военная дисциплина', notes: 'Белый шлем с черной полосой, лица не видно.' }
  },
  {
    id: 'c3po', name: 'C-3PO', universe: 'star_wars', avatar: '/characters/c3po.png',
    shortDesc: 'Золотой металлический корпус дроида.', wiki: 'Протокольный дроид из чистого золота со светящимися круглыми фоторецепторами.',
    traits: { mainColors: ['золотой'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Дроид', fraction: 'Альянс Повстанцев', powers: 'Знание более 6 миллионов языков галактики, этикет', notes: 'Полностью золотой дроид, лицо из металла.' }
  },
  {
    id: 'r2d2', name: 'R2-D2', universe: 'star_wars', avatar: '/characters/r2d2.png',
    shortDesc: 'Бело-синий куполообразный астродроид.', wiki: 'Преданный механический напарник Люка на трех опорах с синей отделкой и вращающимся куполом.',
    traits: { mainColors: ['белый', 'синий', 'серебряный'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: false, race: 'Дроид', fraction: 'Альянс Повстанцев', powers: 'Взлом компьютеров, починка звездолетов на лету, проекция голограмм', notes: 'Бочонок-дроид с куполом, нет человеческого тела.' }
  },
  {
    id: 'jabba_the_hutt', name: 'Джабба Хатт', universe: 'star_wars', avatar: '/characters/jabba_the_hutt.png',
    shortDesc: 'Гигантский зеленый слизень-криминал.', wiki: 'Огромный владыка преступного мира Татуина с массивным хвостом и оранжевыми глазами.',
    traits: { mainColors: ['зеленый', 'коричневый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Хатт', fraction: 'Криминальный синдикат Хаттов', powers: 'Иммунитет к обману разума Силой, криминальное влияние', notes: 'Огромный толстый слизень без одежды.' }
  },
  {
    id: 'tarkin', name: 'Гранд-мофф Таркин', universe: 'star_wars', avatar: '/characters/tarkin.png',
    shortDesc: 'Серый имперский мундир офицера.', wiki: 'Командующий Звезды Смерти с ледяным взглядом, впалыми щеками и седыми висками в сером кителе.',
    traits: { mainColors: ['серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: true, isVillain: true, race: 'Человек', fraction: 'Галактическая Империя', powers: 'Доктрина устрашения, командование имперским флотом', notes: 'Серый строгий китель, худощавое бледное лицо.' }
  },
  {
    id: 'cassian_andor', name: 'Кассиан Андор', universe: 'star_wars', avatar: '/characters/cassian_andor.png',
    shortDesc: 'Коричневая полевая куртка разведчика.', wiki: 'Офицер разведки Повстанцев с темной щетиной, каштановыми волосами и бластером.',
    traits: { mainColors: ['коричневый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Альянс Повстанцев', powers: 'Шпионаж, снайперская стрельба, диверсии в тылу врага', notes: 'Открытое лицо с легкой щетиной, теплая куртка.' }
  },
  {
    id: 'jyn_erso', name: 'Джин Эрсо', universe: 'star_wars', avatar: '/characters/jyn_erso.png',
    shortDesc: 'Тактический жилет и темный шарф.', wiki: 'Лидер отряда Изгой-один, похитившая чертежи Звезды Смерти на планете Скариф.',
    traits: { mainColors: ['зеленый', 'серый'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Альянс Повстанцев', powers: 'Уличное выживание, владение бластером и дубинкой', notes: 'Женщина, шарф на шее, пистолет-бластер в руке.' }
  },
  {
    id: 'cad_bane', name: 'Кэд Бэйн', universe: 'star_wars', avatar: '/characters/cad_bane.png',
    shortDesc: 'Синяя кожа, ковбойская шляпа и трубки.', wiki: 'Охотник за головами с синей кожей, широкополой шляпой, красными глазами и дыхательными трубками.',
    traits: { mainColors: ['синий', 'коричневый'], hasHelmetOrMask: true, hasCape: true, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Дурос', fraction: 'Охотники за головами', powers: 'Реактивные ботинки, смертоносная дуэль на двух бластерах', notes: 'Широкая шляпа, синее лицо с дыхательными трубками.' }
  },
  {
    id: 'asajj_ventress', name: 'Асажж Вентресс', universe: 'star_wars', avatar: '/characters/asajj_ventress.png',
    shortDesc: 'Бледно-серая лысая ассасинка с 2 мечами.', wiki: 'Темная ученица графа Дуку с лысой головой и двумя изогнутыми красными световыми мечами.',
    traits: { mainColors: ['серый', 'черный'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: false, isVillain: true, race: 'Датомирка (Сестра ночи)', fraction: 'Сестры Ночи / Конфедерация', powers: 'Тёмная сторона Силы, стремительный парный бой Джар-Кай', notes: 'Женщина, лысая бледная голова, два изогнутых красных меча.' }
  },
  {
    id: 'captain_rex', name: 'Капитан Рекс (CT-7567)', universe: 'star_wars', avatar: '/characters/captain_rex.png',
    shortDesc: 'Белая броня клона с синей маркировкой.', wiki: 'Командир 501-го легиона в модифицированном шлеме клона с синими полосами и двумя пистолетами DC-17.',
    traits: { mainColors: ['белый', 'синий'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек (Клон)', fraction: 'Великая армия Республики / Повстанцы', powers: 'Стрельба с двух рук, тактическое лидерство клонов', notes: 'Шлем клона с синими полосами и дальномером, два бластера.' }
  },
  {
    id: 'bo_katan', name: 'Бо-Катан Крайз', universe: 'star_wars', avatar: '/characters/bo_katan.png',
    shortDesc: 'Синяя мандалорская броня с совой.', wiki: 'Лидер Ночных Сов в сине-сером бескарском шлеме с узором совы и короткими рыжими волосами.',
    traits: { mainColors: ['синий', 'серый'], hasHelmetOrMask: true, hasCape: false, hasBeard: false, hasWeapon: true, isHuman: true, isVillain: false, race: 'Человек (Мандалорка)', fraction: 'Мандалорцы / Ночные Совы', powers: 'Мандалорское боевое искусство, джетпак, щит из бескара', notes: 'Женщина, синий шлем с совиными узорами.' }
  },
  {
    id: 'poe_dameron', name: 'По Дэмерон', universe: 'star_wars', avatar: '/characters/poe_dameron.png',
    shortDesc: 'Оранжевый комбинезон пилота X-Wing.', wiki: 'Лучший пилот Сопротивления в ярко-оранжевом герметичном комбинезоне с белым нагрудным блоком.',
    traits: { mainColors: ['оранжевый', 'белый'], hasHelmetOrMask: false, hasCape: false, hasBeard: true, hasWeapon: false, isHuman: true, isVillain: false, race: 'Человек', fraction: 'Сопротивление', powers: 'Высший пилотаж на крестокрыле T-70 X-Wing, лидерство', notes: 'Оранжевая форма пилота, темные волосы со щетиной.' }
  },
  {
    id: 'thrawn', name: 'Гранд-адмирал Траун', universe: 'star_wars', avatar: '/characters/thrawn.png',
    shortDesc: 'Синяя кожа, горящие красные глаза и мундир.', wiki: 'Гениальный стратег чиссов в белом парадном кителе Империи с пепельно-синей кожей и горящими алыми глазами.',
    traits: { mainColors: ['белый', 'синий'], hasHelmetOrMask: false, hasCape: false, hasBeard: false, hasWeapon: false, isHuman: false, isVillain: true, race: 'Чисс', fraction: 'Галактическая Империя', powers: 'Гениальная тактика, анализ психологии врагов по их искусству', notes: 'Синее лицо, сплошные горящие красные глаза, белый мундир.' }
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
