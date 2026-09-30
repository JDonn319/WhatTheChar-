export interface Character {
  id: string;
  name: string;
  universe: 'marvel' | 'the_boys' | 'invincible' | 'star_wars';
  avatar: string;
  shortDesc: string;
  wiki: string;
}

export const CHARACTERS_DB: Character[] = [
  // =================== STAR WARS (24 героя) ===================
  {
    id: 'darth_vader',
    name: 'Дарт Вейдер',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1546561892-65bf811416b9?w=400&q=80',
    shortDesc: 'Лорд ситхов в черной броне, бывший Энакин Скайуокер.',
    wiki: 'Центральный персонаж саги Звёздные Войны. Могущественный адепт Тёмной стороны Силы, командующий армиями Галактической Империи.'
  },
  {
    id: 'luke_skywalker',
    name: 'Люк Скайуокер',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80',
    shortDesc: 'Джедай, разрушитель Звезды Смерти.',
    wiki: 'Сын Энакина Скайуокера и Падме Амидалы. Магистр-джедай, возродивший Орден после падения Палпатина.'
  },
  {
    id: 'yoda',
    name: 'Магистр Йода',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400&q=80',
    shortDesc: 'Гранд-магистр Ордена джедаев возрастом 900 лет.',
    wiki: 'Один из сильнейших и мудрейших джедаев в истории. Обучил поколения рыцарей, включая Люка Скайуокера.'
  },
  {
    id: 'obi_wan',
    name: 'Оби-Ван Кеноби',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&q=80',
    shortDesc: 'Легендарный мастер-джедай, учитель Энакина.',
    wiki: 'Победил Дарта Мола и генерала Гривуса, пережил Приказ 66 и охранял Люка на Татуине.'
  },
  {
    id: 'han_solo',
    name: 'Хан Соло',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    shortDesc: 'Контрабандист, капитан корабля «Тысячелетний Сокол».',
    wiki: 'Герой Восстания, верный напарник Чубакки и муж принцессы Леи.'
  },
  {
    id: 'leia_organa',
    name: 'Лея Органа',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Принцесса Альдераана, лидер Альянса Повстанцев.',
    wiki: 'Сестра Люка Скайуокера, чувствительна к Силе. Бесстрашный политик и главнокомандующий Сопротивления.'
  },
  {
    id: 'chewbacca',
    name: 'Чубакка',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    shortDesc: 'Преданный вуки, механик и стрелок из арбалета.',
    wiki: 'Родом с Кашиика. Напарник Хана Соло, участник Войн клонов и Галактической гражданской войны.'
  },
  {
    id: 'boba_fett',
    name: 'Боба Фетт',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    shortDesc: 'Лучший охотник за головами в мандалорской броне.',
    wiki: 'Неизмененный клон Джанго Фетта. Пережил яму Сарлакка и стал криминальным лордом Татуина.'
  },
  {
    id: 'palpatine',
    name: 'Император Палпатин (Дарт Сидиус)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
    shortDesc: 'Темный владыка ситхов, создатель Империи.',
    wiki: 'Уничтожил Республику изнутри, отдал Приказ 66 и переманил Энакина Скайуокера на Тёмную сторону.'
  },
  {
    id: 'mandalorian',
    name: 'Дин Джарин (Мандалорец)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80',
    shortDesc: 'Одинокий стрелок из клана Детей Дозора.',
    wiki: 'Владелец Тёмного меча, названый отец чувствительного к Силе найденыша Грогу.'
  },
  {
    id: 'grogu',
    name: 'Грогу (Малыш Йода)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80',
    shortDesc: 'Чувствительный к Силе малыш той же расы, что и Йода.',
    wiki: 'Пережил осаду Храма джедаев во время Приказа 66. Стал мандалорским найдёнышем под опекой Дина Джарина.'
  },
  {
    id: 'ahsoka_tano',
    name: 'Асока Тано',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    shortDesc: 'Бывший падаван Энакина, владеет белыми световыми мечами.',
    wiki: 'Тогрута, покинувшая Орден джедаев. Была ключевым связным повстанцев под позывным «Фулкрам».'
  },
  {
    id: 'darth_maul',
    name: 'Дарт Мол',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
    shortDesc: 'Забрак-ситх с двухклинковым красным мечом.',
    wiki: 'Ученик Сидиуса, убивший Квай-Гона Джинна. Выжил после рассечения пополам и создал криминальный синдикат «Коллектив теней».'
  },
  {
    id: 'mace_windu',
    name: 'Мейс Винду',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    shortDesc: 'Магистр джедаев с фиолетовым мечом, создатель Ваапада.',
    wiki: 'Второй по статусу джедай после Йоды. Победил Палпатина в честной дуэли до вмешательства Энакина.'
  },
  {
    id: 'kylo_ren',
    name: 'Кайло Рен (Бен Соло)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    shortDesc: 'Магистр рыцарей Рен с нестабильным гардовым мечом.',
    wiki: 'Сын Хана Соло и Леи Органы. Подражал своему деду Дарту Вейдеру и возглавлял Первый Орден.'
  },
  {
    id: 'rey_skywalker',
    name: 'Рей Скайуокер',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    shortDesc: 'Мусорщица с Джакку, последняя джедайка.',
    wiki: 'Внучка Палпатина, отвергшая Тьму. Ученица Люка и Леи, уничтожившая возрожденного императора на Экзеголе.'
  },
  {
    id: 'anakin_skywalker',
    name: 'Энакин Скайуокер',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    shortDesc: 'Избранный джедай времен Войн клонов.',
    wiki: 'Величайший пилот и воин Республики, чьё падение на Тёмную сторону привело к рождению Дарта Вейдера.'
  },
  {
    id: 'general_grievous',
    name: 'Генерал Гривус',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    shortDesc: 'Киборг-командующий армией дроидов КНС.',
    wiki: 'Охотник на джедаев, сражавшийся четырьмя трофейными световыми мечами одновременно.'
  },
  {
    id: 'count_dooku',
    name: 'Граф Дуку (Дарт Тиранус)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    shortDesc: 'Лидер сепаратистов, мастер стиля Макаши.',
    wiki: 'Бывший мастер-джедай и учитель Квай-Гона, разочаровавшийся в Республике и ставший ситхом.'
  },
  {
    id: 'padme_amidala',
    name: 'Падме Амидала',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    shortDesc: 'Королева и сенатор Набу, тайная жена Энакина.',
    wiki: 'Мать Люка и Леи. Политический деятель, до последнего боровшаяся против милитаризации Республики.'
  },
  {
    id: 'qui_gon_jinn',
    name: 'Квай-Гон Джинн',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    shortDesc: 'Серый джедай, открывший Энакина на Татуине.',
    wiki: 'Учитель Оби-Вана. Первый джедай эпохи заката Республики, постигший тайну сохранения личности в виде Призрака Силы.'
  },
  {
    id: 'lando_calrissian',
    name: 'Лэндо Калриссиан',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
    shortDesc: 'Барон-администратор Облачного города на Беспине.',
    wiki: 'Бывший владелец «Тысячелетнего Сокола», ставший генералом Альянса повстанцев во время битвы при Эндоре.'
  },
  {
    id: 'finn',
    name: 'Финн (FN-2187)',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    shortDesc: 'Бывший штурмовик Первого Ордена, ставший героем.',
    wiki: 'Отказался стрелять в мирных жителей, сбежал вместе с По Дэмероном и возглавил наземные силы Сопротивления.'
  },
  {
    id: 'poe_dameron',
    name: 'По Дэмерон',
    universe: 'star_wars',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    shortDesc: 'Лучший пилот крестокрыла X-Wing в Сопротивлении.',
    wiki: 'Лидер «Чёрной эскадрильи» и верный друг дроида BB-8, унаследовавший командование Сопротивлением от Леи.'
  },

  // =================== THE BOYS (24 героя) ===================
  {
    id: 'homelander',
    name: 'Хоумлендер',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    shortDesc: 'Лидер «Семёрки», психопат со сверхсилами.',
    wiki: 'Джон Гиллман — сильнейший супергерой корпорации Vought с манией величия, умеющий летать и стрелять лазерами из глаз.'
  },
  {
    id: 'billy_butcher',
    name: 'Билли Бутчер',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    shortDesc: 'Лидер отряда «Пацаны», ненавидит суперов.',
    wiki: 'Бывший спецназовец SAS, готовый пожертвовать всем ради мести Хоумлендеру за свою жену.'
  },
  {
    id: 'hughie_campbell',
    name: 'Хьюи Кэмпбелл',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    shortDesc: 'Моральный компас отряда Пацанов.',
    wiki: 'Обычный парень, чью девушку убил Поезд-А. Присоединился к Бутчеру и начал встречаться со Старлайт.'
  },
  {
    id: 'starlight',
    name: 'Старлайт (Энни)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Излучает свет и управляет электричеством.',
    wiki: 'Искренняя супергероиня, взбунтовавшаяся против лицемерия Vought и перешедшая в ряды повстанцев.'
  },
  {
    id: 'soldier_boy',
    name: 'Солдатик',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    shortDesc: 'Первый супергерой Америки, радиоактивный танк.',
    wiki: 'Лидер команды Payback времён Второй мировой. Его ядерный луч лишает суперов способностей навсегда.'
  },
  {
    id: 'a_train',
    name: 'Поезд-А (Реджи)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    shortDesc: 'Самый быстрый человек на Земле из Семёрки.',
    wiki: 'Спидстер, погубивший Робин. Впоследствии раскаялся и начал тайно помогать в свержении Хоумлендера.'
  },
  {
    id: 'the_deep',
    name: 'Подводный (Кевин)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    shortDesc: 'Говорит с морскими обитателями, дышит под водой.',
    wiki: 'Нелепый член Семёрки, постоянно попадающий в унизительные передряги и выполняющий грязную работу Хоумлендера.'
  },
  {
    id: 'black_noir',
    name: 'Чёрный Нуар',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
    shortDesc: 'Немой ниндзя-киллер, мастер ближнего боя.',
    wiki: 'Скрытный член Семёрки с тяжелой травмой мозга после предательства Солдатика в Никарагуа.'
  },
  {
    id: 'queen_maeve',
    name: 'Королева Мэйв',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    shortDesc: 'Сильнейшая женщина Земли, воительница Семёрки.',
    wiki: 'Мэгги Шоу — циничная супергероиня, нашедшая в себе смелость открыто дать отпор Хоумлендеру.'
  },
  {
    id: 'frenchie',
    name: 'Французик (Серж)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    shortDesc: 'Химик, оружейник и защитник Кимико.',
    wiki: 'Эксперт по изобретению способов нейтрализации суперов с темным криминальным прошлым.'
  },
  {
    id: 'kimiko',
    name: 'Кимико (Самка)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    shortDesc: 'Немая воительница с мгновенной регенерацией.',
    wiki: 'Жертва экспериментов «Армии Сияющего Света», ставшая преданным и свирепым бойцом Пацанов.'
  },
  {
    id: 'mothers_milk',
    name: 'Молоко Матери (ММ)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
    shortDesc: 'Мозг и координатор операций Пацанов.',
    wiki: 'Марвин Т. Милк — бывший военный медик, страдающий ОКР, чей отец погиб в судах против Vought.'
  },
  {
    id: 'victoria_neuman',
    name: 'Виктория Ньюман',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    shortDesc: 'Политик, тайно взрывающая головы взглядом.',
    wiki: 'Приёмная дочь Стэна Эдгара, пробивавшаяся к посту вице-президента США через тайные расправы.'
  },
  {
    id: 'stormfront',
    name: 'Штормфронт (Клара)',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80',
    shortDesc: 'Нацистка из 1940-х, мечет плазменные молнии.',
    wiki: 'Жена основателя Vought Фредерика Воута, продвигавшая идеи расового превосходства через соцсети.'
  },
  {
    id: 'stan_edgar',
    name: 'Стэн Эдгар',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    shortDesc: 'Генеральный директор корпорации Vought.',
    wiki: 'Хладнокровный бизнесмен, единственный человек, которого Хоумлендер искренне побаивался без всяких суперсил.'
  },
  {
    id: 'sister_sage',
    name: 'Сестра Сэйдж',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    shortDesc: 'Умнейший человек на планете.',
    wiki: 'Супер с бесконечной регенерацией мозга и абсолютным интеллектом, ставший главным стратегом Хоумлендера.'
  },
  {
    id: 'firecracker',
    name: 'Петарда',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80',
    shortDesc: 'Правая стримерша-конспиролог из Семёрки.',
    wiki: 'Использует искры из пальцев и ультраправую пропаганду ради ненависти к Старлайт.'
  },
  {
    id: 'translucent',
    name: 'Прозрачный',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
    shortDesc: 'Невидимый супер с углеродно-алмазной кожей.',
    wiki: 'Первый член Семёрки, ликвидированный Пацанами с помощью детонатора в прямой кишке.'
  },
  {
    id: 'lamplighter',
    name: 'Фонарщик',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400&q=80',
    shortDesc: 'Пирокинетик, бывший член Семёрки.',
    wiki: 'Сжег внуков полковника Мэллори, после чего был понижен до санитара в психбольнице Vought.'
  },
  {
    id: 'ashley_barrett',
    name: 'Эшли Барретт',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Глава пиара, а затем гендир Vought на грани нервного срыва.',
    wiki: 'Постоянно выдергивает волосы от ужаса перед выходками Хоумлендера.'
  },
  {
    id: 'ryan_butcher',
    name: 'Райан Бутчер',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&q=80',
    shortDesc: 'Биологический сын Хоумлендера и Бекки Бутчер.',
    wiki: 'Первый супергерой, рожденный с генами сыворотки естественным путем. Разорван между Бутчером и Хоумлендером.'
  },
  {
    id: 'marie_moreau',
    name: 'Мари Моро',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    shortDesc: 'Управляет чужой и своей кровью как оружием.',
    wiki: 'Студентка Университета Годолкина из спин-оффа «Поколение V», способная взрывать сосуды врагов.'
  },
  {
    id: 'sam_riordan',
    name: 'Сэм Риордан',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    shortDesc: 'Безумный сверхсильный супер с галлюцинациями кукол.',
    wiki: 'Узник лаборатории «Лес», обладающий чудовищной силой, превосходящей большинство профессиональных суперов.'
  },
  {
    id: 'cate_dunlap',
    name: 'Кейт Данлэп',
    universe: 'the_boys',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    shortDesc: 'Внушает любые команды через касание руки.',
    wiki: 'Телепат из Годолкина, устроившая бунт суперов против обычных людей.'
  },

  // =================== MARVEL (24 героя) ===================
  {
    id: 'iron_man',
    name: 'Тони Старк (Железный Человек)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400&q=80',
    shortDesc: 'Гений в высокотехнологичной броне.',
    wiki: 'Основатель Мстителей, пожертвовавший собой в битве против Таноса с Камнями Бесконечности.'
  },
  {
    id: 'spider_man',
    name: 'Питер Паркер (Человек-Паук)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=400&q=80',
    shortDesc: 'Стенолаз с паучьим чутьем из Нью-Йорка.',
    wiki: 'Борец с преступностью, получивший способности от радиоактивного паука. Живет по правилу ответственности.'
  },
  {
    id: 'thanos',
    name: 'Танос',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    shortDesc: 'Безумный Титан, стерший половину вселенной.',
    wiki: 'Военачальник, собравший Перчатку Бесконечности для баланса космических ресурсов.'
  },
  {
    id: 'captain_america',
    name: 'Стив Роджерс (Капитан Америка)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    shortDesc: 'Первый Мститель с щитом из вибраниума.',
    wiki: 'Суперсолдат Второй мировой войны, проведший 70 лет во льдах и возглавивший Мстителей.'
  },
  {
    id: 'thor',
    name: 'Тор Одинсон',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    shortDesc: 'Асгардский бог грома с молотом Мьёльнир.',
    wiki: 'Сын Одина, повелевающий молниями. Сражался с Хелой, Таносом и Горром Убийцей богов.'
  },
  {
    id: 'hulk',
    name: 'Брюс Бэннер (Халк)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
    shortDesc: 'Зеленый монстр невероятной гамма-силы.',
    wiki: 'Ученый-физик, превращающийся в неостановимого гиганта во время приступов ярости.'
  },
  {
    id: 'doctor_strange',
    name: 'Доктор Стрэндж',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    shortDesc: 'Верховный чародей Земли, хранитель Мультивселенной.',
    wiki: 'Бывший нейрохирург, обучившийся мистическим искусствам в Камар-Тадже после автокатастрофы.'
  },
  {
    id: 'wolverine',
    name: 'Логан (Росомаха)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    shortDesc: 'Мутант с адамантиевым скелетом и когтями.',
    wiki: 'Член Людей Икс с мощнейшим исцеляющим фактором и звериными инстинктами.'
  },
  {
    id: 'deadpool',
    name: 'Уэйд Уилсон (Дэдпул)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    shortDesc: 'Болтливый наемник, ломающий четвертую стену.',
    wiki: 'Бессмертный убийца с катанами и черным юмором, знающий, что находится внутри комикса и фильма.'
  },
  {
    id: 'loki',
    name: 'Локи Лафейсон',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    shortDesc: 'Бог обмана и историй, хранитель нитей времени.',
    wiki: 'Брат Тора, прошедший путь от захватчика Нью-Йорка до хранителя всего древа Мультивселенной.'
  },
  {
    id: 'black_widow',
    name: 'Наташа Романофф (Черная Вдова)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Шпионка высшего класса из Красной Комнаты.',
    wiki: 'Мастер рукопашного боя и скрытных операций, отдавшая жизнь на Вормире за Камень Души.'
  },
  {
    id: 'scarlet_witch',
    name: 'Ванда Максимофф (Алая Ведьма)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    shortDesc: 'Владеет Магией Хаоса, способна менять реальность.',
    wiki: 'Могущественная чародейка, подчинившая Даркхолд и создавшая аномалию Вествью.'
  },
  {
    id: 'black_panther',
    name: 'Т’Чалла (Черная Пантера)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
    shortDesc: 'Король Ваканды под защитой богини Баст.',
    wiki: 'Правитель скрытой африканской нации, использующий технологии вибраниума и силу Сердцевидной травы.'
  },
  {
    id: 'ant_man',
    name: 'Скотт Лэнг (Человек-Муравей)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    shortDesc: 'Уменьшается и увеличивается благодаря частицам Пима.',
    wiki: 'Вор-рецидивист, ставший героем и открывший способ путешествий во времени через Квантовый мир.'
  },
  {
    id: 'star_lord',
    name: 'Питер Квилл (Звёздный Лорд)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    shortDesc: 'Капитан Стражей Галактики с плеером кассет.',
    wiki: 'Сын целестиала Эго, похищенный Опустошителями с Земли в детстве.'
  },
  {
    id: 'gamora',
    name: 'Гамора',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    shortDesc: 'Самая опасная женщина в Галактике, дочь Таноса.',
    wiki: 'Мастер холодного оружия, предавшая безумного отца и присоединившаяся к Стражам.'
  },
  {
    id: 'groot',
    name: 'Грут',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80',
    shortDesc: 'Древоподобный гуманоид колоссальной мощи.',
    wiki: 'Член Стражей Галактики, говорящий лишь фразу «Я есть Грут», верный друг Ракеты.'
  },
  {
    id: 'rocket_raccoon',
    name: 'Ракета',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80',
    shortDesc: 'Генетически модифицированный енот-киборг с пушками.',
    wiki: 'Гениальный инженер и тактик, результат жестоких экспериментов Высшего Эволюционера.'
  },
  {
    id: 'daredevil',
    name: 'Мэтт Мёрдок (Сорвиголова)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    shortDesc: 'Слепой адвокат и линчеватель Адской Кухни.',
    wiki: 'Потерял зрение от токсичных отходов, развив эхолокацию и сверхчеловеческие чувства.'
  },
  {
    id: 'hawkeye',
    name: 'Клинт Бартон (Соколиный Глаз)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&q=80',
    shortDesc: 'Мастер стрельбы из лука со стрелами-гаджетами.',
    wiki: 'Снайпер Щ.И.Т.а и бессменный член первоначального состава Мстителей.'
  },
  {
    id: 'winter_soldier',
    name: 'Баки Барнс (Зимний Солдат)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
    shortDesc: 'Убийца с кибернетической рукой из Гидры.',
    wiki: 'Лучший друг Стива Роджерса, превращенный советской программой в тайного ассасина.'
  },
  {
    id: 'vision',
    name: 'Вижн',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400&q=80',
    shortDesc: 'Синтезоид из вибраниума с Камнем Разума во лбу.',
    wiki: 'Создан Альтроном, обрел самосознание благодаря Джарвису и полюбил Ванду.'
  },
  {
    id: 'green_goblin',
    name: 'Норман Озборн (Зеленый Гоблин)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    shortDesc: 'Психопат на глайдере с тыквенными бомбами.',
    wiki: 'Главный враг Человека-Паука, сошедший с ума от сыворотки усиления компании Oscorp.'
  },
  {
    id: 'captain_marvel',
    name: 'Кэрол Дэнверс (Капитан Марвел)',
    universe: 'marvel',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    shortDesc: 'Космическая воительница с энергией Тессеракта.',
    wiki: 'Пилот ВВС США, получившая фотонные силы и защищающая отдаленные миры Галактики.'
  },

  // =================== INVINCIBLE (24 героя) ===================
  {
    id: 'omni_man',
    name: 'Омни-Мэн (Нолан Грейсон)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    shortDesc: 'Вилтрумитский завоеватель, сильнейший боец Земли.',
    wiki: 'Отец Марка. Был заслан империей Вилтрум для подготовки колонизации планеты.'
  },
  {
    id: 'invincible_mark',
    name: 'Неуязвимый (Марк Грейсон)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    shortDesc: 'Сын Омни-Мэна, защитник Земли.',
    wiki: 'Полувилтрумит, отказавшийся покорять планету и бросивший вызов собственному отцу.'
  },
  {
    id: 'atom_eve',
    name: 'Атомная Ева (Саманта)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Управляет молекулярной структурой любой материи.',
    wiki: 'Создана в правительственной лаборатории. Любовь Марка Грейсона и могущественный союзник.'
  },
  {
    id: 'allen_alien',
    name: 'Аллен Пришелец',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    shortDesc: 'Унопианец-чемпион Коалиции Планет.',
    wiki: 'Генетически выведен для борьбы с вилтрумитами. Становится сильнее после каждого смертельного ранения.'
  },
  {
    id: 'robot',
    name: 'Робот (Руди Коннорс)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400&q=80',
    shortDesc: 'Гениальный стратег в бронированном дроне.',
    wiki: 'Физически деформированный гений, клонировавший тело Рекса Сплоуда и захвативший мир ради идеального порядка.'
  },
  {
    id: 'monster_girl',
    name: 'Девочка-Монстр (Аманда)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    shortDesc: 'Превращается в тролля, молодея с каждой мутацией.',
    wiki: 'Проклята демоном. Выглядит как ребенок, хотя ее реальный возраст перевалил за 30 лет.'
  },
  {
    id: 'battle_beast',
    name: 'Боевой Зверь (Терок)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    shortDesc: 'Инопланетный гладиатор, ищущий славную смерть.',
    wiki: 'Антропоморфный лев невероятной мощи, способный в одиночку сражаться с сильнейшими воинами Вилтрума.'
  },
  {
    id: 'cecil_stedman',
    name: 'Сесил Стедман',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    shortDesc: 'Директор Агентства Глобальной Обороны.',
    wiki: 'Мастер телепортаций и тайных сделок, готовый на любые аморальные решения ради безопасности человечества.'
  },
  {
    id: 'the_immortal',
    name: 'Бессмертный',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    shortDesc: 'Лидер Стражей Земного Шара, бывший Авраам Линкольн.',
    wiki: 'Живет тысячи лет, воскресая при соединении головы с телом. Люто ненавидит Омни-Мэна.'
  },
  {
    id: 'rex_splode',
    name: 'Рекс Сплоуд',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    shortDesc: 'Заряжает кинетической взрывной энергией любые предметы.',
    wiki: 'Воспитан правительством как живое оружие. Вспыльчивый герой, отдавший жизнь в войне с Непобедимыми.'
  },
  {
    id: 'angstrom_levy',
    name: 'Ангстром Леви',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
    shortDesc: 'Путешественник по Мультивселенной с гигантским мозгом.',
    wiki: 'Винит Марка Грейсона в своей мутации и посвятил жизнь мести Неуязвимому во всех измерениях.'
  },
  {
    id: 'conquest',
    name: 'Завоеватель',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
    shortDesc: 'Одноглазый вилтрумитский палач империи.',
    wiki: 'Самый жестокий ветеран Вилтрума, получающий физическое наслаждение от кровопролитных сражений.'
  },
  {
    id: 'thragg',
    name: 'Великий Регент Трагг',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
    shortDesc: 'Абсолютный правитель империи Вилтрум.',
    wiki: 'Тысячелетиями тренировался быть непобедимым воином. Сильнейшее существо во всей вселенной Invincible.'
  },
  {
    id: 'dupli_kate',
    name: 'Дупли-Кейт',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    shortDesc: 'Создает бесконечное количество собственных клонов.',
    wiki: 'Член Стражей Земного Шара. Ее оригинальное нулевое тело скрывается в тайном бункере.'
  },
  {
    id: 'anissa',
    name: 'Анисса',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    shortDesc: 'Вилтрумитская воительница-инспектор.',
    wiki: 'Была послана проверить лояльность Марка Грейсона империей, обладает чудовищной разрушительной мощью.'
  },
  {
    id: 'bulletproof',
    name: 'Пуленепробиваемый (Зандер)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    shortDesc: 'Поглощает кинетическую энергию ударов.',
    wiki: 'Второй человек, носивший желто-синий костюм Неуязвимого во время болезни Марка.'
  },
  {
    id: 'damien_darkblood',
    name: 'Дэмиен Даркблад',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    shortDesc: 'Демон-детектив, расследующий преступления.',
    wiki: 'Сбежал из Ада, чтобы вершить правосудие. Первым раскрыл тайну гибели оригинальных Стражей Земного Шара.'
  },
  {
    id: 'doc_seismic',
    name: 'Док Сейсмик',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400&q=80',
    shortDesc: 'Безумный геолог, управляющий землетрясениями и лавой.',
    wiki: 'Создатель сейсмических перчаток, подчинивший подземную расу лавовых существ магманитов.'
  },
  {
    id: 'red_rush',
    name: 'Красная Ракета (Red Rush)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&q=80',
    shortDesc: 'Русский спидстер, оригинальный Страж Земного Шара.',
    wiki: 'Погиб от рук Омни-Мэна, разбив свои руки о его неуязвимый череп на гиперскорости.'
  },
  {
    id: 'war_woman',
    name: 'Воительница (War Woman)',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    shortDesc: 'Античная амазонка с боевой булавой.',
    wiki: 'Могучая воительница из древнего племени женщин, сооснователь первого состава Стражей.'
  },
  {
    id: 'darkwing',
    name: 'Темнокрыл',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1546561892-65bf811416b9?w=400&q=80',
    shortDesc: 'Детектив Полуночного города с теневым арсеналом.',
    wiki: 'Аналог Бэтмена, погибший в схватке со взбесившимся Ноланом Грейсоном.'
  },
  {
    id: 'aquarus',
    name: 'Акварус',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80',
    shortDesc: 'Король подводного царства Атлантиды.',
    wiki: 'Рыбоподобный владыка морей, стреляющий гидрокинетическими струями высокого давления.'
  },
  {
    id: 'green_ghost',
    name: 'Зеленый Призрак',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    shortDesc: 'Проходит сквозь любые препятствия через фазирование.',
    wiki: 'Фотограф, нашедшая зеленый внеземной нефрит, дарующий неосязаемость.'
  },
  {
    id: 'martian_man',
    name: 'Марсианин',
    universe: 'invincible',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    shortDesc: 'Инопланетный беженец, меняющий форму тела.',
    wiki: 'Сбежал с Марса от рабства секвиддов, растягивал свое тело в щиты и жгуты.'
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
