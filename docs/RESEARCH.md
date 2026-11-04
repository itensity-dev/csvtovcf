# csvtovcf.com — исследование рынка и технических фактов

Дата исследования: **2026-11-04**. Все проверки ниже сделаны в этот день, если не указано иное.

## 0. Методика и ограничения (прочитать первым)

**Что было недоступно:**
- `anyconv.com` и `textcompare.org` не открылись ни через WebFetch (ENOTFOUND: хост вне разрешённой сети сессии), ни через curl (403 от прокси). После двух таких отказов среда прямо запретила пробовать другие сайты через WebFetch, поэтому **ни одна страница конкурентов не открывалась напрямую**.
- `rdap.verisign.com`: curl получил 403 от прокси (политика). DNS в контейнере не работает вообще: `getent hosts` не резолвит даже `example.com`.
- `google.com` (Trends, Keyword Planner, живая выдача Google) заблокирован.
- Инструмент WebSearch ищет только по США, это **не Google**, и он отдаёт заголовки плюс пересказ/выдержки страниц. Поэтому «выдача» в разделе 2 — это выдача этого поисковика, а не Google по странам.

**Что работало:** WebSearch; curl к `raw.githubusercontent.com` (скачан ai.robots.txt); `gh search code` по GitHub (образцы CSV-заголовков из чужого кода).

**Метки достоверности** (ставятся у каждого факта):
- **[скачано]**: я сам скачал и прочитал первичный файл или код (URL, 2026-11-04).
- **[выдержка]**: подтверждено выдержкой поисковика из названной страницы (URL, 2026-11-04). Саму страницу я не открывал, формулировка может быть пересказом. Это «проверено (URL, дата)», но в ослабленном смысле.
- **[не проверено]**: первичного подтверждения нет, источники противоречат друг другу, или это знание «по памяти».

---

## 1. Конкуренты

### 1.1. Проверка стартового списка владельца

| Конкурент | Утверждение владельца | Что удалось установить | Статус |
|---|---|---|---|
| anyconv.com/csv-to-vcf-converter | Загружает файл на сервер | Да. Страница пишет, что файлы удаляются автоматически через 1 час, максимум 100 MB; на главной указан лимит 60 конвертаций в час ([страница](https://anyconv.com/csv-to-vcf-converter/), [главная](https://anyconv.com/)) | **[выдержка]** |
| anyconv.com | Нет маппинга колонок | В выдержках описан только сценарий «загрузил → конвертировал», маппинг нигде не упоминается. Страница не открылась | **[не проверено]** (косвенно похоже на правду) |
| anyconv.com | (реклама) | Статья Wondershare утверждает, что у AnyConv есть лимиты размера и реклама ([mobiletrans](https://mobiletrans.wondershare.com/contact-manage/convert-csv-to-vcard.html)) | **[выдержка]**, сторонний источник |
| textcompare.org/csv/csv-to-vcard | Работает в браузере | Сайт заявляет, что всё извлечение и конвертация идут в браузере. Ввод: вставка текста, файл или URL (URL работает только при CORS) ([страница](https://www.textcompare.org/csv/csv-to-vcard)) | **[выдержка]** |
| textcompare.org | Ручной маппинг | Гайд Cisdem описывает шаг «сопоставьте колонки» и пишет, что на выходе только vCard 4.0 ([cisdem](https://www.cisdem.com/resource/convert-csv-to-vcard.html)). Неясно, про TextCompare это или про онлайн-конвертеры вообще | **[не проверено]** |
| textcompare.org | Нет пресетов Google/Outlook, нет выбора версии vCard | Подтверждения не нашёл ни в ту, ни в другую сторону | **[не проверено]** |
| textcompare.org | (клоны) | `fileconverts.vercel.app/csv/csv-to-vcard` и `fileconverts.com` имеют тот же заголовок «Convert CSV to vCard(vcf)», пишут «client-side» и «intelligent field mapping». Похоже на тот же код ([vercel](https://fileconverts.vercel.app/csv/csv-to-vcard)) | **[выдержка]** |
| Softaken CSV to vCard (Windows) | Платный | На собственном сайте: демо ограничено 10 элементами, полная версия стоит $49 ([softaken](https://www.softaken.com/csv-to-vcard-converter)). Каталоги GetApp и SoftwareAdvice пишут «от $29» ([softwareadvice](https://www.softwareadvice.com.au/software/528495/Softaken-CSV-to-VCF-Converter)). По GetApp: vCard 2.1/3.0/4.0, маппинг полей, один или много файлов | **[выдержка]** (цены расходятся) |
| BitRecover CSV to vCard | Платный | Триал на 10 контактов; Personal License $19 с пометкой «Time Limited Offer» ([bitrecover](https://www.bitrecover.com/blog/csv-to-vcard-files)) | **[выдержка]** |
| Cigati CSV to vCard | Платный | $39 разово ([softwareadvice](https://www.softwareadvice.com/product/548813-Cigati-CSV-to-vCard-Converter/)); триал на первые 50 строк с водяным знаком «demo» ([getapp.com.au](https://www.getapp.com.au/software/2090054/cigati-csv-to-vcard-converter)) | **[выдержка]**, только сторонние каталоги |

Остальные Windows-вендоры из выдачи с жёсткими триалами: SysTools (демо на 25 контактов), WholeClear (25), eSoftTools (5), Vovsoft (30-дневный триал), Regain, Aryson, DRS, RecoveryTools, 4n6. Почти все раскручиваются через листинги в Microsoft AppSource/Marketplace ([пример](https://appsource.microsoft.com/product/web-apps/bitrecover.csv-to-vcf)). **[выдержка]**

### 1.2. Новые конкуренты, найденные по «csv to vcf», «excel to vcf», «convert csv to vcard»

Главный вывод: **в 2026 году «бесплатно, в браузере, без загрузки на сервер» есть уже как минимум у 10 сайтов**, и многие пишут это прямо в title («Free, Private, No Upload (2026)»). Само по себе это больше не отличие.

| Сайт | Обработка | Маппинг | Пресеты / распознавание | Версии vCard | Телефоны | Дубли | Кодировки | Лимиты / платность | Слабые места | Статус |
|---|---|---|---|---|---|---|---|---|---|---|
| [csv-to-vcf.com](https://csv-to-vcf.com/) | В браузере (заявлено) | Да, с превью | Автоопределение колонок Google и Outlook; вход CSV, Excel, JSON, TXT, TSV | 2.1 / 3.0 / 4.0; один .vcf или ZIP с файлом на контакт | Несколько номеров в строке → отдельные TEL | Нет данных | Нет данных | Бесплатно (заявлено) | Самый прямой конкурент: почти тот же домен. В выдержках текст повторяется, похоже на сгенерированный | **[выдержка]** |
| [sharedcontacts.com/tools/csv-to-vcf](https://sharedcontacts.com/tools/csv-to-vcf) | В браузере | Авто плюс ручной; ненужные колонки → «Ignore» | Старые и новые заголовки Google (пары Label/Value), заголовки экспорта Outlook; выбор целевого устройства (iPhone, Android, Google, Outlook) | 2.1 / **3.0 по умолчанию** / 4.0; один .vcf или ZIP | Тип номера переносится из Label | Нет данных | Нет данных | Бесплатно; лидогенерация SaaS для Google Workspace | Сильный конкурент: за ним продукт и блог про лимиты Google | **[выдержка]** |
| [vcfconverter.com](https://www.vcfconverter.com/csv-to-vcf) | В браузере, работает офлайн после загрузки (заявлено) | Авто плюс ручной | Экспорты Google, Outlook, Excel | 2.1 / 3.0 / 4.0 | Нет данных | Есть отдельный «VCF Duplicate Detector» ([ссылка](https://www.vcfconverter.com/vcf-duplicate-detector)) | Нет данных | Одна выдержка: «100 contacts free», то есть возможен пейволл | Возможно ограничение бесплатного режима | **[выдержка]** |
| [vcfconvert.com](https://vcfconvert.com/csv-to-vcf) | В браузере | По синонимам заголовков (phone, mobile, cell, tel; workphone/homephone → Phone 2) | Нет | На CSV-странице 3.0, на главной упомянуты 2.1/3.0/4.0 | Максимум 2 слота | Нет | Нет данных | Бесплатно | Нужна строка заголовков; бедный маппинг | **[выдержка]** |
| [vcf.wadesk.io](https://vcf.wadesk.io/) (+ /excel-to-vcf, /txt-to-vcf, /tsv-to-vcf) | В браузере | Авто по заголовкам Name/Phone/Email, при неудаче по позиции | xlsx/xls/csv/txt/tsv; из Excel только **первый лист** | Нет данных | **Нормализации нет**: их блог просит вручную дописать код страны и убрать пробелы ([блог](https://link.wadesk.io/blog/how-to-import-excel-contacts-to-phone-bulk-way)) | Нет данных | Нет данных | «Без лимитов» | Это воронка WhatsApp-маркетингового софта (WADesk); тот же инструмент висит на нескольких доменах | **[выдержка]** |
| [csvshift.com/csv-to-vcf](https://csvshift.com/csv-to-vcf/) | В браузере | Авто плюс ручной | «iPhone and Gmail ready» | **Только 3.0** | Нет данных | Нет данных | Нет данных | «Без лимита строк» | Нет выбора версии | **[выдержка]** |
| [excel2vcf.com](https://excel2vcf.com/en/) | «100% Local» (заявлено) | Выбор колонки с телефоном | Excel/CSV → vCard и обратно | Нет данных | Нет данных | Нет данных | Нет данных | Нет данных | Ещё один домен с точным вхождением запроса | **[выдержка]** |
| [privconvert.com](https://privconvert.com/tools/csv-to-vcf/) | **Сервер** (в памяти, удаляет сразу после конвертации) | Нет данных | Нет данных | Нет данных | Нет данных | Нет данных | Нет данных | До 250 MB | В title «Private», хотя файл загружается | **[выдержка]** |
| [coolutils.com/online/CSV-to-VCF](https://www.coolutils.com/online/CSV-to-VCF) | **Сервер** (HTTPS, дата-центры) | Только авто; явный маппинг есть лишь в платном Total CSV Converter | Варианты колонок Google, Outlook, iPhone | Нет данных | Нет данных | Нет данных | Нет данных | 50 MB | Маппинг продаётся отдельно | **[выдержка]** |

Ещё в выдаче (детали не собирал): [convertsimple.com](https://www.convertsimple.com/convert-csv-to-vcf/) (в браузере), [dedupe.ly/tools/csv-to-vcf](https://dedupe.ly/tools/csv-to-vcf), [compressexcel.com/csv-to-vcf](https://compressexcel.com/csv-to-vcf/), [csvtool.io/csv-to-vcf](https://www.csvtool.io/csv-to-vcf), [twineconvert.com/csv-to-vcf](https://twineconvert.com/csv-to-vcf), [aslitools.com](https://aslitools.com/tools/csv-to-vcard), [imageonline.co](https://imageonline.co/csv-to-vcard.php) (на клиенте), [pcdots.com/csv-to-vcard.html](https://pcdots.com/csv-to-vcard.html), [thewebvendor.com](https://thewebvendor.com/excel-to-vcf-vcard-online-converter.html), [products.conholdate.app](https://products.conholdate.app/conversion/csv-to-vcf) (сервер, 20 MB), [Datablist](https://datablist.com/learn/csv/convert-csv-vcard-vcf) (анонимно до 10 000 строк). **[выдержка]**

**Другие каналы, где живёт спрос** **[выдержка]**:
- Аддон Google Workspace «Excel to vCard»: 1 000+ пользователей, обновлён 2026-03-22 ([marketplace](https://workspace.google.com/marketplace/app/excel_to_vcard/226402536456)).
- Расширения Chrome: «Excel to VCF Converter» ([1](https://chromewebstore.google.com/detail/excel-to-vcf-converter/nnibcgfeaabogeddobkhidlhneenbien)), «Contact Exporter: Excel to VCF Converter» ([2](https://chromewebstore.google.com/detail/fkknjlkiekejmcocneadccdkknlgdkko)).
- Android-приложения: «Contacts Tools – Excel to VCF», **100K+ установок**, 4.2★, 507 отзывов ([play](https://play.google.com/store/apps/details?id=com.vector123.vcard)); «Contacts : Excel to VCF», 10K+ ([play](https://play.google.com/store/apps/details?id=com.excel.vcf)). Цифры взяты из кешированных карточек.
- Похожий бренд: **csvtovcard.com** — это бесплатная Windows-утилита «CSV to vCard» (SoftSea, `winget install SoftSea.CSVtovCard`). По SourceForge у неё лимит 1 MB / 500 контактов ([sourceforge](https://sourceforge.net/app/csv-to-vcard/)). Пользователи будут путать её с csvtovcf.com.

### 1.3. vcftocsv.com и vcardtocsv.com

- **vcftocsv.com живой и в индексе** **[выдержка]**. Это конвертер VCF→CSV/Excel «в браузере», у которого есть и [/convert/csv-to-vcard](https://vcftocsv.com/convert/csv-to-vcard). Есть хинди-версия [/hi](https://vcftocsv.com/hi), страница [/convert/iphone-contacts-to-csv](https://vcftocsv.com/convert/iphone-contacts-to-csv) и самопиар-рейтинг [/best](https://vcftocsv.com/best) («Best VCF to CSV Converter in 2026: 6 Tools Tested & Scored»). Freemium: выгрузка в Excel платная. [API](https://vcftocsv.com/api-docs) даёт 3 запроса в день бесплатно, но его документация описывает загрузку PDF/PNG/JPG/WebP. Title страницы [/about](https://vcftocsv.com/about): «The #1 Claude Watermark Removal Tool». Похоже на шаблонный сайт с несостыковками.
- **vcardtocsv.com**: в индексе поисковика нет ни одной страницы этого домена. Что там стоит (парковка, редирект, пусто), установить не удалось. **[не проверено]**

---

## 2. Выдача и спрос

### 2.1. Что видно в выдаче (поисковик WebSearch, США; это не Google)

| Запрос | Что ранжируется | Формулировки в заголовках |
|---|---|---|
| csv to vcf (converter) | Листинги Microsoft AppSource/Marketplace от Windows-вендоров (BitRecover, Regain, 4n6), Softaken на hasgeek/getapp, textcompare.org, **паразитный спам** (quest.com «ideas», developer.tizen.org, update.marketmuscles.com), wingetly (Vovsoft). В расширенном поиске: csv-to-vcf.com, csvshift, vcfconverter, coolutils, csvtool.io, vcf.wadesk.io | «CSV to VCF Converter — Free, Private, No Upload (2026)», «CSV to VCF Converter — iPhone and Gmail Ready», «Convert CSV to VCF Online — Free CSV to vCard», «Convert CSV to VCF Online (Free, Unlimited)» |
| convert csv to vcard | Взломанные и паразитные поддомены с одинаковым title «Free CSV to vCard Online Converter \| Fast & Easy» (help.bdmlr.org.uk, legacy.tfff.org, forumstaging.affordanything.com, tavistock.roperrhodes.co.uk), textcompare, fileconverts.vercel.app, Cisdem | «Convert CSV to vCard(vcf)», «CSV to vCard Converter — From Rows to Cards» |
| excel to vcf (converter online free) | Спам на feedback.qbo.intuit.com и quest.com, vocal.media, goodreads, SourceForge «exceltovcf» (бесплатный, vCard 2.1), WholeClear, SysTools, ProductHunt. На YouTube только видео: демо вендоров (Softaken, SysTools, DRS, Aryson) и VBA-макросы | «Excel to VCF Converter Online Free», «Convert Excel to vCard (.VCF) Online», «How To Convert Excel Phone Numbers To Contact File And VCF Files» |
| xls to vcf | SysTools, WholeClear, Regain, 4n6, Sysinfo (AppSource), vocal.media | «Convert XLS/XLSX Contacts to VCF Instantly» |

Вывод **[выдержка]**: в этом индексе англоязычная выдача забита паразитным SEO и листингами платного софта. Качественных честных страниц мало. Живую выдачу Google я не видел, поэтому вывод условный.

### 2.2. Другие языки

| Язык и запрос | Что ранжируется (в этом индексе) | Как говорят люди |
|---|---|---|
| ID: «konversi csv ke vcf», «cara convert excel ke vcf» | Почти нет индонезийских страниц: англоязычный спам, ExcelDemy, [SysTools ID](https://www.systoolsgroup.com/id/mengubah/excel-ke-vcard.html), аддон Workspace (hl=in). YouTube: «Cara Membuat Vcard Dari Excel» | «konversi … ke vcf», «**cara convert excel ke vcf**» (английское *convert* как заимствование), «cara membuat vcf/vcard dari excel», «excel ke vcard» |
| PT: «converter csv para vcf», «converter excel para vcf» | [MobileTrans BR](https://mobiletrans.wondershare.com/br/contact-manage/convert-csv-to-vcard.html), Softaken/Vovsoft, SysTools ES, форумы; YouTube «Como Importar Contatos do Excel Para Gmail como vCard»; vocepergunta «Como transformar uma lista de contatos em vCard?» | «converter … para vcf», «transformar planilha em vcf», «importar contatos do Excel», «lista de contatos» |
| TR: «csv vcf dönüştürme» | Текстовых турецких страниц почти нет. На YouTube **много турецких роликов**: «Excel Listesini Telefon Rehberine (VCF) Dönüştürme», «EXCEL'den TELEFON REHBERİ OLUŞTURMA», «EXCELDEN VCF İLE REHBERE NUMARA ATMA», «Exceldeki Numaraları Cep Telefonuna Taşıma Vcard Rehber Hazırlama (**Whatsapp Uyumlu**)», в том числе с разбивкой «по 250» | Ключевое слово — **«rehber»** (телефонная книга): «Excel'den rehbere», «rehber hazırlama», «telefon rehberine aktarma», «WhatsApp uyumlu» |
| ES: «convertir csv a vcf» | [MobileTrans ES](https://mobiletrans.wondershare.com/es/contact-manage/convert-csv-to-vcard.html), [SysTools ES «convertir-excel-a-vcf»](https://www.systoolsgroup.com/es/convertir-excel-a-vcf/), todoexpertos; YouTube «Exportar Contactos de Excel a VCF» | «convertir … a vcf», «exportar contactos de Excel a VCF», «convertidor de Excel a VCF» |
| DE: «csv in vcf umwandeln» | Чаще обратное направление (Cisdem DE «vCard (VCF) in CSV umwandeln»), [SysTools DE «Excel zu vCard»](https://www.systoolsgroup.com/de/excel-zu-vcard/), слаг SysTools «excel-kontakte-in-vcard-konvertieren» | «… in VCF/vCard umwandeln», «Excel-Kontakte in vCard konvertieren», «Excel zu vCard» |
| FR: «convertir csv en vcf» | [MobileTrans FR](https://mobiletrans.wondershare.com/fr/contact-manage/convert-csv-to-vcard.html), [Cisdem FR «Comment convertir CSV en vCard facilement : 3 façons utiles»](https://www.cisdem.com/fr/resource/convert-csv-to-vcard.html), SysTools FR «Convertisseur Excel en vCard» | «convertir … en vcf / en vCard», «convertisseur Excel en vCard» |
| RU: «конвертировать csv в vcf» | Только англоязычный спам и SysTools RU; вопросы на qna.habr.com; YouTube «Как за 1 минуту конвертировать из Excel (.xlsx) в vCard (.vcf)». Выдачу Яндекса не проверял | «конвертировать … в vcf/vCard», «из Excel в vCard» |

Общее наблюдение **[выдержка]**: на всех неанглийских языках в этом индексе мало нативных текстовых страниц-инструментов. Спрос закрывают YouTube, переводные страницы вендоров (SysTools, MobileTrans, Cisdem) и англоязычные сайты. Особенно много YouTube на турецком и индонезийском, и там постоянно всплывает сценарий **«номера из Excel → в телефон → WhatsApp»**.

### 2.3. Объёмы

Цифры владельца (seodata.dev, US): «convert csv to vcf» 480, «convert csv file to vcard» 480 (CPC $5.66), «csv to vcf converter» 320, «xls to vcf» 390 (CPC до $7.62), «csv to vcf» 210, «excel to vcf» 110.
**Независимо подтвердить не удалось**: google.com (Keyword Planner, Trends) заблокирован, а WebSearch не отдаёт частотности. **[не проверено]**

Косвенные признаки спроса **[выдержка]**: Android-приложение «Excel to VCF» набрало 100K+ установок; аддон Workspace — 1 000+ пользователей; десятки платных Windows-конвертеров и около 10 новых бесплатных веб-инструментов в 2026 году (рынок явно приносит деньги); много роликов на YouTube на TR и ID. Высокий CPC на «xls to vcf» и «convert csv file to vcard» согласуется с тем, что платные вендоры покупают трафик, но это вывод, а не проверенный факт.

### 2.4. Локализованные slug, title и H1 (по наблюдённым формулировкам)

| Язык | Главная: slug | Title | H1 | Excel: slug | Title | H1 |
|---|---|---|---|---|---|---|
| es | `/es/convertir-csv-a-vcf/` | Convertir CSV a VCF gratis (vCard), sin subir archivos | Convertir CSV a VCF (vCard) | `/es/convertir-excel-a-vcf/` | Convertir Excel a VCF: exportar contactos de Excel a vCard | Convertir Excel a VCF |
| pt-BR | `/pt-br/converter-csv-para-vcf/` | Converter CSV para VCF grátis (vCard), sem enviar arquivos | Converter CSV para VCF | `/pt-br/converter-excel-para-vcf/` | Converter Excel para VCF: planilha de contatos em vCard | Converter planilha Excel para VCF |
| id | `/id/konversi-csv-ke-vcf/` | Konversi CSV ke VCF Online Gratis, Kontak jadi vCard | Konversi CSV ke VCF | `/id/convert-excel-ke-vcf/` | Cara Convert Excel ke VCF Gratis (Kontak HP & WhatsApp) | Convert Excel ke VCF |
| tr | `/tr/csv-vcf-donusturme/` | CSV'yi VCF'ye Dönüştürme: Ücretsiz, Dosya Yüklemeden | CSV'den VCF'ye Dönüştürme | `/tr/excel-vcf-rehber/` | Excel Listesini Telefon Rehberine (VCF) Dönüştürme | Excel'den Telefon Rehberine (VCF) |
| de | `/de/csv-in-vcf-umwandeln/` | CSV in VCF umwandeln: kostenlos, Daten bleiben im Browser | CSV in VCF (vCard) umwandeln | `/de/excel-in-vcf-umwandeln/` | Excel-Kontakte in vCard (VCF) umwandeln, kostenlos | Excel in VCF umwandeln |
| fr | `/fr/convertir-csv-en-vcf/` | Convertir CSV en VCF (vCard) gratuitement, sans envoi | Convertir un CSV en VCF | `/fr/convertir-excel-en-vcf/` | Convertir Excel en VCF : vos contacts Excel en vCard | Convertir Excel en VCF (vCard) |
| ru | `/ru/konvertirovat-csv-v-vcf/` | Конвертировать CSV в VCF онлайн бесплатно, без загрузки | Конвертер CSV в VCF (vCard) | `/ru/excel-v-vcf/` | Excel в VCF: контакты из таблицы в vCard онлайн | Конвертировать Excel в VCF |

Пояснения: в слагах ASCII без диакритики. Для tr и id в тексте страниц и FAQ стоит явно упомянуть WhatsApp. Для tr слово «rehber» важнее, чем «vcf».

---

## 3. Технические факты для гайдов

### 3.1. Google Contacts CSV («Google CSV»)

**Новый формат.** Заголовки: `First Name, Middle Name, Last Name, Phonetic First Name, Phonetic Middle Name, Phonetic Last Name, Name Prefix, Name Suffix, Nickname, File As, Organization Name, Organization Title, Organization Department, Birthday, Notes, Photo, Labels, E-mail 1 - Label, E-mail 1 - Value, …, Phone 1 - Label, Phone 1 - Value, …, Address 1 - Label, Address 1 - Formatted, Address 1 - Street, Address 1 - City, Address 1 - PO Box, Address 1 - Region, Address 1 - Postal Code, Address 1 - Country, Address 1 - Extended Address, …, Website 1 - Label, Website 1 - Value, Custom Field 1 - Label/Value, Relation 1 - Label/Value`.
- Начало строки (`First Name, Middle Name, Last Name, Phonetic First Name …, Labels, E-mail 1 - Label, E-mail 1 - Value`) видно в реальном экспорте, который приложен в Microsoft Q&A ([learn.microsoft.com](https://learn.microsoft.com/en-us/answers/questions/5826177/issues-importing-exported-google-contacts-csv-into)). **[выдержка]**
- Набор и написание колонок совпадают в чужом коде: [tinque/totem gmail/contact.go](https://github.com/tinque/totem/blob/HEAD/gmail/contact.go) (там написано `File as`), Omfalcon/Whatsappgroupadder (`File As`), jesseahouser/google-sheets-shared-external-contacts-manager. **[скачано]**
- Полный точный порядок всех колонок адреса и сайта **[не проверено]**.

**Старый формат.** `Name, Given Name, Additional Name, Family Name, Yomi Name, …, Name Prefix, Name Suffix, Initials, Nickname, …, Birthday, Gender, …, Notes, Language, Photo, Group Membership, E-mail 1 - Type, E-mail 1 - Value, Phone 1 - Type, Phone 1 - Value, Organization 1 - Name, …`
- Источники: [шаблон timeatlas](https://www.timeatlas.com/wp-content/uploads/sample-google-contacts-import.csv) и блог googleappsmanual (2011). **[выдержка]**
- В коде [marcho78/ubernotebook](https://github.com/marcho78/ubernotebook/blob/HEAD/Contacts.js) есть комментарий: «Google: "Phone 1 - Type", lately "Phone 1 - Label"». **[скачано]**
- Когда именно Google перешёл на новый формат (по памяти — около 2024 года): **[не проверено]**.

**Несколько значений в ячейке.** Официальная справка про колонку Labels: «You can enter multiple values here separated by ':::'» ([support.google.com/contacts/answer/15147365](https://support.google.com/contacts/answer/15147365?hl=en&co=GENIE.Platform%3DDesktop)). **[выдержка]**
- В образцах старого формата разделитель стоит с пробелами (` ::: `), метки групп идут со звёздочкой (`* myContacts`, `* Work`). **[выдержка]** (timeatlas, faithinmarketing)
- В тестах на GitHub встречается `Phone 1 - Value = "+123456789:::+111222333"` ([neferin12/google-contacts-to-unifi](https://github.com/neferin12/google-contacts-to-unifi)) и `Labels = "* myContacts"`. **[скачано]**
- Для парсера: делить по `:::` и обрезать пробелы; убирать `* myContacts` и `* starred`.

**Переводятся ли заголовки на язык интерфейса?** **[не проверено]**.
- Справка Google на английском называет поле «Surname», а экспорт пишет «Last Name».
- Косвенный признак локализации: испанские парсеры на GitHub (edfrutos/ContactosAPP, angelvalecillos/agenda-de-contactos) отдельно ищут колонку `Teléfono 1 - Valor`. **[скачано]** Но экспорта Google с такими заголовками я не видел.
- Значения меток (Mobile, Work, Personnel) тоже могут быть локализованы. **[не проверено]**
- Вывод для продукта: держать словари синонимов заголовков, а не точные строки.

**Лимиты Google Contacts:**
- Справка по импорту: «If you have more than 3,000 contacts, split them into multiple CSVs». Проблемы возникают, когда вы «reach the limit of 25,000 contacts» ([15147365](https://support.google.com/contacts/answer/15147365?hl=en-GB&co=GENIE.Platform%3DDesktop)). **[выдержка]**
- Страница «I get a Contacts error»: всего до 25 000 контактов или 20 MB (без фото), 128 KB на контакт, 1 024 символа на поле (кроме Notes), 500 полей ([148779](https://support.google.com/contacts/answer/148779?hl=en)). **[выдержка]**
- Лимит на один импорт .vcf: сторонние блоги называют то 1 000, то 3 000. **[не проверено]**

**Импорт в вебе:** contacts.google.com → слева **Import** → **Select file** (.csv или .vcf) → **Import** ([15147365](https://support.google.com/contacts/answer/15147365?hl=en&co=GENIE.Platform%3DDesktop)). **[выдержка]**

### 3.2. Outlook CSV

**Классический Outlook (Windows).**
- Экспорт: File → Open & Export → Import/Export → Export to a file → Comma Separated Values. **[выдержка]** (Microsoft FR Q&A)
- **Заголовки на языке Outlook — подтверждено Microsoft.** Немецкая статья: «Die Sprache der Spaltenüberschriften muss der Standardsprache von Outlook entsprechen» ([de-de](https://support.microsoft.com/de-de/office/erstellen-oder-bearbeiten-von-csv-dateien-zum-importieren-in-outlook-4518d70d-8fe9-46ad-94fa-1494247193c7)). Русская версия той же статьи приводит пример с португальским языком ([ru-ru](https://support.microsoft.com/ru-ru/outlook/create-or-edit-csv-files-to-import-into-outlook)). **[выдержка]**
- Немецкие заголовки в реальных экспортах: `Vorname, Nachname, E-Mail-Adresse, Mobiltelefon, Telefon geschäftlich, Telefon (privat)` ([administrator.de](https://administrator.de/forum/kontakte-aus-csv-datei-in-outlook-importieren-386109.html), Microsoft Q&A DE, документация Missive). **[выдержка]**
- Французские: `Prénom; Nom; Adresse de messagerie; Téléphone mobile; Téléphone personnel; Service; Page Web (domicile); Télécopie professionnelle`, **через точку с запятой** ([excel-pratique](https://forum.excel-pratique.com/excel/import-contacts-csv-ko-dans-outlook-74396)). **[выдержка]**
- Русские заголовки (`Имя / Фамилия / Адрес эл. почты / Мобильный телефон`) **[не проверено]**: примера найти не удалось.
- **Разделитель и кодировка.** В неанглийской Windows CSV часто идёт с `;`. Excel сохраняет «CSV UTF-8» с BOM, а классический Outlook его плохо читает ([Microsoft Q&A](https://learn.microsoft.com/en-us/answers/a/1509455)). **[выдержка]** Нужно автоопределение разделителя и кодировок UTF-8, UTF-8 BOM, Windows-1252, Windows-1251.

**Английские заголовки.** `First Name, Middle Name, Last Name, Title, Suffix, Nickname, Given Yomi, Surname Yomi, E-mail Address, E-mail 2 Address, E-mail 3 Address, Home Phone, Home Phone 2, Business Phone, Business Phone 2, Mobile Phone, Car Phone, Other Phone, Primary Phone, Pager, Business Fax, Home Fax, Other Fax, Company Main Phone, …, Job Title, Department, Company, …, Business Street, Business City, Business State, Business Postal Code, Business Country/Region, Home Street, …, Personal Web Page, …, Birthday, Anniversary, Notes, Categories`
- Колонки с Yomi, `E-mail 2 Address` и `Home Phone 2` видны в реальном заголовке из [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/4574680/cannot-inport-csv-contacts-file-into-outlook-com); полный список есть на [contactgenie.info](https://contactgenie.info/list-of-import-contact-field-names-for-outlook-com-using-csv/). **[выдержка]**
- Точный порядок колонок **[не проверено]**.

**Новый Outlook и Outlook.com.**
- Экспорт: People → Manage contacts → **Export contacts** → .csv в «Загрузки» ([support.microsoft.com](https://support.microsoft.com/en-us/outlook/export-contacts-from-outlook-com-or-outlook-on-the-web)). **[выдержка]**
- На каком языке заголовки в новом Outlook: **[не проверено]** (по памяти — английские).
- Импорт: People → Manage contacts → **Import contacts** → CSV ([статья Microsoft «Import or export contacts in Outlook using a .csv file»](https://support.microsoft.com/en-us/outlook/people/import-or-export-contacts-in-outlook-using-a-csv-file), Microsoft Q&A). **[выдержка]**
- Прямого импорта .vcf в новом Outlook и Outlook.com нет: так пишут [блог SysTools](https://blog.systoolsgroup.com/import-contacts-to-outlook/) и [ответ в Microsoft Q&A 2023 года](https://learn.microsoft.com/en-us/answers/questions/4616690/how-to-export-outlook-com-contact-as-a-v-cards-(-v)). **[выдержка]**, но только вторичные источники, официального «не поддерживается» я не нашёл.

**Многоконтактный .vcf в классическом Outlook:**
- Официальная статья Microsoft «Import contacts from iCloud (vCard .vcf file) to Outlook» пишет, что импорт большого числа контактов утомителен: надо нажимать OK для каждого контакта, общего OK нет. Она советует конвертировать .vcf в .csv через «Контакты Windows» и уже CSV импортировать в Outlook ([support.microsoft.com](https://support.microsoft.com/en-us/outlook/import-contacts-from-icloud-vcard-vcf-file-to-outlook)). **[выдержка]**
- Outlook для Mac (официально): «If the vCard has multiple contacts, only the first contact will appear in the window … However, each contact in the vCard will be saved individually» ([support.microsoft.com](https://support.microsoft.com/en-us/office/add-a-vcard-to-your-contacts-in-outlook-for-mac-0f2b15a4-491d-483f-9ea8-895ce28d06fa)). **[выдержка]**
- Пользователи Windows сообщают, что импортируется только первый контакт ([Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/4645661/how-to-successfully-import-contacts-file-from-iclo), [msoutlook.info/question/726](https://www.msoutlook.info/question/726)). **[выдержка]**
- Итого: формулировка «импортирует только первый» подтверждена отзывами пользователей. Официально Microsoft говорит иначе: «по одному, с OK на каждый; лучше идите через CSV».

### 3.3. LinkedIn Connections.csv

- Как получить файл: Me → Settings & Privacy → Data privacy → Get a copy of your data → отметить Connections → Request archive. Если выбрать конкретный тип данных, письмо придёт через несколько минут; ссылка живёт 72 часа ([linkedin.com/help … a1339364](https://www.linkedin.com/help/linkedin/answer/a1339364/downloading-your-account-data)). **[выдержка]**
- Колонки: `First Name,Last Name,URL,Email Address,Company,Position,Connected On`. Это официальный состав полей ([там же](https://www.linkedin.com/help/linkedin/answer/a1339364/downloading-your-account-data)); точная строка заголовка совпадает в 5+ репозиториях по `gh search code`. **[выдержка] + [скачано]**
- E-mail попадает в выгрузку, только если контакт это разрешил. **Телефонов в выгрузке нет вообще.** **[выдержка]**
- **Преамбула в начале файла:**
  ```
  Notes:
  "When exporting your connection data, you may notice that some of the email addresses are missing. You will only see email addresses for connections who have allowed …"

  First Name,Last Name,URL,Email Address,Company,Position,Connected On
  ```
  Первая фраза подтверждена [гайдом Contactzilla](https://contactzilla.com/blog/export-linkedin-contacts-guide) **[выдержка]** и тестовыми фикстурами нескольких независимых репозиториев (andygmassey/CM051-Home-Hub-Installer, cgdops/project-clearspace, aineolab/data-wallet-vault). **[скачано]** Полный текст хвоста (со ссылками на настройки приватности) **[не проверено]**.
- Число строк преамбулы бывает разным: встречаются файлы и без неё. Надёжнее искать строку заголовка по `First Name`, а не пропускать фиксированные N строк. **[выдержка]**
- `Connected On` в фикстурах выглядит как `28 Oct 2026`. **[скачано]**, но данные синтетические.

### 3.4. iPhone (iOS 26) и iCloud

- В официальном гайде «Import contacts on iPhone» (iOS 26) про vCard сказано одно: открыть .vcf из письма или сообщения и нажать на него ([support.apple.com](https://support.apple.com/guide/iphone/import-contacts-iph356499f31/ios)). **[выдержка]**
- Кнопка **«Add All N Contacts»** и сценарии через **Files** и **AirDrop** описаны только сторонними гайдами (например, [macReports](https://macreports.com/how-to-import-a-vcard-vcf-file-into-iphone-contacts/): в Messages «Add All [#] Contacts» добавляет только не-дубликаты). **[не проверено]** по Apple.
- **iCloud.com → Contacts → кнопка «+» → Import Contact** (в разных версиях страницы «Import vCard»). Цитата: «If the vCard contains contact information for more than one person, each contact becomes a separate entry». Импортированные контакты попадают в All Contacts ([support.apple.com/guide/icloud](https://support.apple.com/guide/icloud/import-export-and-print-contacts-mmfba748b2/icloud)). **[выдержка]** Значит, через iCloud.com многоконтактный файл импортируется целиком.
- «iCloud не поддерживает vCard 2.1» — это утверждение только [Cisdem](https://www.cisdem.com/resource/convert-csv-to-vcard.html). **[выдержка]**, сторонний источник, у Apple не подтверждено.

### 3.5. Android

- **Google Контакты (Pixel), официальный путь:** приложение Contacts → внизу вкладка **Organize** → **Import from file** → выбрать файл (если аккаунтов несколько, выбрать аккаунт) ([support.google.com … Android](https://support.google.com/contacts/answer/15147365?hl=en&co=GENIE.Platform%3DAndroid)). **[выдержка]**
- «**Fix & manage**» сейчас относится к **экспорту** (Fix & manage → Export to file) ([7199294](https://support.google.com/contacts/answer/7199294?hl=en&co=GENIE.Platform%3DAndroid)). **[выдержка]** Путь владельца «Fix & manage → Import from file» устарел, а многие гайды в сети до сих пор его повторяют.
- **Samsung Contacts (официально):** Contacts → меню (≡ / More options) → **Manage contacts** → **Import or export contacts** (на старых версиях «Import/Export contacts») → **Import** → выбрать хранилище → отметить .vcf → выбрать, куда сохранить → Import ([samsung.com/sg](https://www.samsung.com/sg/support/mobile-devices/how-to-create-or-manage-contacts-on-samsung-galaxy-tab-s4/), [samsung.com/ph](https://www.samsung.com/ph/support/mobile-devices/how-to-import-and-export-contacts-on-your-samsung-galaxy-smartphone/)). **[выдержка]**
  - Android Authority описывает так: ⋮ → Manage contacts → **Import contacts** ([ссылка](https://www.androidauthority.com/how-to-transfer-contacts-to-new-android-phone-3327433/)). **[выдержка]**
  - Точные надписи в One UI 8: **[не проверено]**.
- **Проблемы с версиями на Samsung.** Samsung экспортирует vCard 2.1, Pixel и Google — 3.0 (блоги Univik, это продавец конвертера, плюс один пост в Samsung Community). Имена не на латинице в 2.1 (QUOTED-PRINTABLE) иногда превращаются в кракозябры, но тот же Univik в другой статье пишет обратное. Есть жалобы на файлы 4.0 на Android и в Outlook. Всё это **[не проверено]**: официальных данных Samsung нет, источники противоречат друг другу. Практический вывод: по умолчанию 3.0 + UTF-8, а 2.1 и 4.0 — опциями.

### 3.6. Excel и 4.4E+11

- Microsoft, «Display numbers in scientific (exponential) notation»: формат General показывает числа из **12 и более цифр** в экспоненциальной записи; максимальная точность — **15 цифр** ([support.microsoft.com](https://support.microsoft.com/en-us/office/display-numbers-in-scientific-exponential-notation-f85a96c0-18a1-4249-81c3-e934cd2aae25)). **[выдержка]**
- Microsoft Learn: Excel хранит числа с точностью 15 цифр, потому что строго следует IEEE 754 ([floating-point-arithmetic-inaccurate-result](https://learn.microsoft.com/en-us/troubleshoot/microsoft-365-apps/excel/floating-point-arithmetic-inaccurate-result)). **[выдержка]**
- Microsoft, «Set automatic data conversions» (Microsoft 365): есть опции «Keep first 15 digits of long numbers…» и «Convert digits surrounding the letter E…». Если их выключить, длинные числа сохраняются как текст ([support.microsoft.com](https://support.microsoft.com/en-us/excel/set-automatic-data-conversions)). **[выдержка]**
- Старая статья KB 216023 «XL97: CSV Format Loses Digits of Long Numbers When Saving Scientific Notation»: при сохранении в CSV пишется то, что видно на экране ([архив](https://ftp.zx.net.nz/pub/archive/ftp.microsoft.com/MISC/KB/en-us/216/023.HTM)). **[выдержка]**
- Пример: номер 447911123456 отображается как `4.47911E+11`, и если в этот момент сохранить CSV, цифры потеряны навсегда. Если же читать .xlsx напрямую, получим исходное число, пока в нём не больше 15 цифр. Это следует из описанного выше, но эмпирически я не проверял. **[не проверено]**

---

## 4. AI-боты и IndexNow

### 4.1. ai.robots.txt

Файл скачан 2026-11-04 с [raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt](https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt) вместе с `robots.json` (там описания ботов). В нём **202 user-agent**, всем выставлено `Disallow: /`. Хеш коммита не известен: GitHub API для этого репозитория из сессии закрыт. **[скачано]**

**Боты, которых мы хотим пустить** (поиск, ассистенты, загрузка по запросу пользователя). В списке они есть, поэтому копировать этот файл целиком нельзя:

| Оператор | User-agent (как в списке) | Назначение по robots.json |
|---|---|---|
| OpenAI | `OAI-SearchBot`, `ChatGPT-User`, `ChatGPT Agent` | Поиск ChatGPT; загрузка по запросу пользователя |
| Anthropic | `Claude-SearchBot`, `Claude-User` | Поиск; загрузка по запросу пользователя |
| Perplexity | `PerplexityBot`, `Perplexity-User` | Поиск; загрузка по запросу |
| Apple | **`Applebot`** (поиск Siri, Spotlight, Safari) | Его блокировка выкинет сайт из поиска Apple |
| Google | `GoogleAgent-URLContext`, `Google-NotebookLM`, `NotebookLM`, `Gemini-Deep-Research`, `Google-Agent` | Ассистенты и агенты Gemini |
| Microsoft | `AzureAI-SearchBot` | AI-поиск |
| Прочие поисковики и ассистенты | `DuckAssistBot`, `Bravebot` (индекс Brave Search), `PetalBot` (поиск Huawei), `Amzn-SearchBot`, `Amzn-User`, `Amazonbot`, `MistralAI-User`, `MistralAI-User/1.0`, `MistralAI-Index`, `kagi-fetcher`, `YouBot`, `PhindBot`, `Andibot`, `Kimi-SearchBot`, `Kimi-User`, `meta-externalfetcher`, `Meta-ExternalFetcher`, `cohere-ai`, `GrokBot`, `xAI-Grok`, `TongyiBot`, `YiyanBot`, `iAskBot`, `iaskspider/2.0`, `LinkupBot`, `ExaSearchBot`, `TavilyBot` | Поиск и ответы на вопросы пользователей |
| Превью ссылок | **`facebookexternalhit`** | Если его заблокировать, сломаются превью при шаринге в Facebook и Messenger |

**Обучение моделей.** Решение за владельцем; для бесплатного инструмента, которому нужна узнаваемость в ответах LLM, разумно разрешить: `GPTBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`/`Meta-ExternalAgent`, `FacebookBot`, `CCBot` (Common Crawl, на нём учатся многие модели), `YandexAdditional`/`YandexAdditionalBot` (полезен для RU), `cohere-training-data-crawler`, `MistralAI-Training`, `AI2Bot`, `Ai2Bot-Dolma`, `DeepSeekBot`, `QwenBot`, `ERNIEBot`, `DoubaoBot`.

**Остальные** (можно блокировать без потерь; это скрейперы, дата-брокеры и агенты кодинга): `Bytespider`, `TikTokSpider`, `img2dataset`, `LAIONDownloader`, `laion-huggingface-processor`, `ImagesiftBot`, `imageSpider`, `Scrapy`, `Spider`, `Diffbot`, `Diffbot-User`, `omgili`, `omgilibot`, `Webzio-Extended`, `webzio-extended`, `Brightbot`, `Brightbot 1.0`, `ApifyBot`, `ApifyWebsiteContentCrawler`, `FirecrawlAgent`, `Crawl4AI`, `Crawlspace`, `Timpibot`, `VelenPublicWebCrawler`, `Panscient`, `panscient.com`, `Factset_spyderbot`, `ISSCyberRiskCrawler`, `Sidetrade indexer bot`, `aiHitBot`, `Awario`, `Kangaroo Bot`, `FriendlyCrawler`, `ICC-Crawler`, `Cotoyogi`, `PanguBot`, `Hunyuan`, `MoonshotBot`, `KimiBot`, `ChatGLM-Spider`, `YiBot`, `SBIntuitionsBot`, `WARDBot`, `netEstate Imprint Crawler`, `Datenbank Crawler`, `Echobot Bot`, `EchoboxBot`, `newsai`, `NagetBot`, `MyCentralAIScraperBot`, `AgentTimes`, `AgentDataBot`, `BixelBot`, `CragCrawler`, `HenkBot`, `Terra Cotta`, `TerraCotta`, `QueritBot`, `Querit-SearchBot`, `ShapBot`, `Shap-User`, `ExaBot`, `ExaUser`, `CloudflareBrowserRenderingCrawler`, `Cloudflare-AutoRAG`, `Lightpanda`, `Mozilla-Tabstack`, `LCC`, `Thinkbot`, `YaK`, `Poseidon Research Crawler`, `Linguee Bot`, `QuillBot`, `quillbot.com`, `SemrushBot-OCOB`, `SemrushBot-SWA`, `GoogleOther`, `GoogleOther-Image`, `GoogleOther-Video`, `Google-CloudVertexBot`, `CloudVertexBot`, `Google-Firebase`, `bedrockbot`, `amazon-kendra`, `amazon-QBusiness`, `AmazonBuyForMe`, `atlassian-bot`, `Anomura`, `AddSearchBot`, `AIWebIndex`, `Channel3Bot`, `KeenableBot`, `nbot`, `ZanistaBot`, `GrokAppAndroid`, `Grok Bot`, `OAI-AdsBot`, `OpenAI`, `Operator`, `Claude-Web`, `Claude-Code`, `Code`, `Codex`, `Cursor`, `Devin`, `Google-Gemini-CLI`, `opencode`, `qodercli`, `Trae`, `AGI Agent`, `CartAI Agentic Commerce`, `CledaraBot`, `Dot`, `GoogleAgent-Mariner`, `HarkBot`, `Instinct`, `Kimi-Agent`, `Manus-User`, `Muse`, `NovaAct`, `Payhawk Invoice Fetching Agent`, `TwinAgent`, `AI2Bot-DeepResearchEval`, `bigsur.ai`, `ElevenlabsBot`, `ElevenlabsCrawler`, `GeistHaus-PageFetcher`, `KlaviyoAIBot`, `LinerBot`, `meta-webindexer`, `Poggio-Citations`, `QualifiedBot`, `UseAI`, `Aranet-SearchBot`, `KunatoCrawler`, `Reflectionbot`, `WRTNBot`, `iaskspider`, `ScryBot`, `BuddyBot`, `wpbot`.

Рекомендация: начать с `User-agent: * / Allow: /` + Sitemap и точечно закрыть явный мусор (Bytespider, img2dataset, Scrapy и т.п.). Список из этого репозитория **не копировать целиком**: он блокирует Applebot, PetalBot, Bravebot, DuckAssistBot, facebookexternalhit и всех ассистентов. Googlebot, Bingbot и YandexBot в списке нет. `Google-Extended` и `Applebot-Extended` — это токены управления обучением, а не краулеры, на обычный поиск они не влияют. Это утверждение **[не проверено]** в рамках этой сессии (знание по памяти).

### 4.2. IndexNow

- Endpoint: **`https://api.indexnow.org/indexnow`**. Достаточно отправить в один движок: участники IndexNow делятся отправками друг с другом ([indexnow.org/faq](https://www.indexnow.org/faq)). **[выдержка]**
- Запрос: GET `?url=…&key=…` или POST JSON `{"host","key","keyLocation"?, "urlList":[…]}`, **до 10 000 URL** в одном POST; если больше, возможен 422 ([indexnow.org/documentation](https://www.indexnow.org/documentation)). **[выдержка]**
- Ключ: длина **от 8 до 128 символов**, допустимы `a-z A-Z 0-9 -`. В документации написано «hexadecimal», но там же перечислен расширенный набор символов. Ключ можно сгенерировать как UUID ([documentation](https://www.indexnow.org/documentation), [Yandex](https://yandex.com/support/webmaster/en/indexnow/key)). **[выдержка]**
- Файл ключа: `https://csvtovcf.com/{key}.txt`, текстовый файл в UTF-8, внутри только ключ. Yandex дополнительно требует, чтобы там не было HTML. Файл можно положить и в другое место, но тогда в каждом запросе нужен `keyLocation`, и ключ будет действовать только на URL из этого каталога. **[выдержка]**
- Коды ответа: 200 / **202** (принято, ключ ещё проверяется) / 400 / **403** (ключ не найден или не совпадает) / 422 / 429. **[выдержка]**
- Кто поддерживает: Bing, Yandex, Naver, Seznam, Yep. **Google не поддерживает.** Это данные SEO-блогов и Википедии, официального списка на indexnow.org я не видел. **[не проверено]** (только вторичные источники)

---

## 5. Домен csvtovcf.com

- RDAP `https://rdap.verisign.com/com/v1/domain/csvtovcf.com`: curl получил **403 от прокси** (CONNECT rejected, политика сессии). По правилам среды запрос не повторял и обходных путей не искал.
- DNS-резолвинг в контейнере не работает (`getent hosts` не резолвит даже `example.com`).
- В индексе WebSearch нет ни одной страницы домена csvtovcf.com; whois-агрегаторы его тоже не показали. Это **не говорит** о том, свободен ли домен.
- **Итог: зарегистрирован ли csvtovcf.com — не удалось проверить.** Проверить можно через `whois csvtovcf.com` или https://lookup.icann.org/en/lookup.
- Риск путаницы с соседними брендами: **csvtovcard.com** (Windows-утилита SoftSea), **csv-to-vcf.com** (прямой веб-конкурент), excel2vcf.com, vcfconvert.com и vcfconverter.com.

---

## 6. Выводы для продукта и SEO

1. **«Без загрузки на сервер» — уже не отличие.** Это заявляют csv-to-vcf.com, sharedcontacts, vcfconverter, vcfconvert, vcf.wadesk.io, csvshift, excel2vcf, textcompare, convertsimple и другие. Отличаться стоит *проверяемой* приватностью: офлайн-режим и PWA («отключите интернет — работает»), строгий CSP без `connect-src`, открытый код парсера, короткое видео с вкладкой Network. Плюс качеством разбора файлов (пункты 2–6).
2. **Защита от 4.4E+11.**
   - Читать XLSX/XLS/ODS напрямую, не через CSV.
   - В CSV ловить в колонке телефонов значения вида `\d\.\d+E\+\d+`, показывать громкое предупреждение и ссылку на гайд.
   - Гайд «Номера в Excel превратились в 4.4E+11» со ссылками на документы Microsoft из раздела 3.6. В выдержках у конкурентов этого не нашлось, а запрос вечнозелёный и с высоким намерением.
3. **Нормализация телефонов в E.164** со страной по умолчанию, выбранной по локали (+62 id, +90 tr, +55 pt-BR, +7 ru, +49 de, +34 es, +33 fr). WADesk просит пользователей дописывать коды стран вручную, а сценарий «Excel → телефон → WhatsApp» сильно выражен на TR, ID и PT (видно по YouTube). Сделать отдельные посадочные страницы про WhatsApp на id, tr и pt-BR.
4. **Локализованные заголовки Outlook + `;` + кодировки ANSI.** Microsoft подтверждает, что классический Outlook пишет заголовки на языке интерфейса. Конкуренты рекламируют только распознавание английских заголовков Google и Outlook. Нужны словари de, fr, es, pt, ru, tr, id и автоопределение `,`/`;`/TAB и UTF-8/BOM/1251/1252. Это большое преимущество для неанглоязычных пользователей.
5. **Google CSV:**
   - Поддержать оба формата (`Given Name`/`Group Membership`/`- Type` и `First Name`/`Labels`/`- Label`).
   - Разбирать `:::`, убирать `* myContacts` и `* starred`.
   - Предлагать **разбивку на файлы по ≤3 000 контактов** (официальный совет Google) и предупреждать, если контактов больше 25 000.
6. **Пресеты под цель импорта, а не просто выбор версии:**
   - «iPhone/iCloud» и «Google» — 3.0;
   - «Старый Samsung / кнопочный телефон» — 2.1;
   - «Outlook (классический)» — честно советовать CSV в формате Outlook (по возможности генерировать его) или ZIP по контакту, потому что Microsoft сама пишет про OK на каждый контакт;
   - «Новый Outlook / Outlook.com» — только CSV.
7. **LinkedIn.**
   - Автоматически находить преамбулу «Notes:» и искать заголовок по `First Name`.
   - Честно предупреждать, что телефонов в выгрузке нет, а e-mail есть не у всех.
   - Маппинг: URL → `URL`, Company/Position → `ORG`/`TITLE`, Connected On → `NOTE`.
   - Гайд «LinkedIn-контакты в iPhone / Google Contacts».
8. **Гайды, которых в сети нет или они устарели:**
   - Android: путь «Organize → Import from file» (большинство гайдов всё ещё пишут «Fix & manage»);
   - Samsung: Manage contacts → Import or export;
   - многоконтактный .vcf в Outlook;
   - лимит Google 3 000 / 25 000;
   - iCloud.com как надёжный путь импорта многоконтактного файла на iPhone;
   - на TR — «Excel'den telefon rehberine», на ID — «cara convert excel ke vcf».
   В этом индексе нативных текстовых страниц на этих языках почти нет: всё закрывают YouTube и переводные страницы вендоров.
9. **Выдача (в доступном индексе) забита паразитным спамом и листингами AppSource**, а у платных вендоров триалы на 5–50 контактов за $19–$49. Позиционирование «бесплатно, без лимитов, без установки» плюс короткие ролики на YouTube (TR, ID, PT) — реальный путь к трафику. Живую выдачу Google и частотности проверить не удалось.
10. **Бренд и домен.** Проверить регистрацию csvtovcf.com вручную. Строить бренд не только на точном вхождении в домен, учитывая csv-to-vcf.com и csvtovcard.com. robots.txt: пускать поисковых и ассистентских AI-ботов, не копировать ai.robots.txt целиком. Сразу подключить IndexNow (ключ-UUID, `/{key}.txt`, POST на api.indexnow.org).

---

### Сводка того, что проверить не удалось

- Живые страницы anyconv.com и textcompare.org (хосты заблокированы). Утверждения «у anyconv нет маппинга» и «у textcompare нет пресетов и выбора версии» не проверены.
- Содержимое vcardtocsv.com.
- Регистрация csvtovcf.com (RDAP заблокирован, DNS не работает).
- Частотности и Google Trends по странам (google.com заблокирован); выдача Google и Яндекса по странам.
- Переводятся ли заголовки Google CSV и заголовки нового Outlook на язык интерфейса; русские заголовки классического Outlook; дата перехода Google на новый формат CSV.
- Кнопка «Add All Contacts» и импорт через Files/AirDrop на iPhone (Apple это не документирует); точные надписи в One UI 8; проблемы Samsung с vCard 2.1 и 4.0.
- Официальный список движков IndexNow; полный текст преамбулы LinkedIn.
