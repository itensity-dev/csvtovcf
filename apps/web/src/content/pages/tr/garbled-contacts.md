---
url: rehber-turkce-karakter-sorunu
title: "Rehberde Türkçe Karakter Sorunu (Ayþe, AyÅŸe, ???) ve Çözümü"
h1: "Aktarılan kişilerde isimler neden bozuk çıkar, nasıl düzeltilir"
description: "Kişileri aktardıktan sonra “Ayþe Yýlmaz”, “AyÅŸe” veya “????” gibi isimler yanlış metin kodlamasından kaynaklanır. Nedeni nasıl anlaşılır, dosya nasıl doğru dönüştürülür."
lead: "`Ayþe Yýlmaz`, `Ã‡aÄŸrÄ±`, `Ð˜Ð²Ð°Ð½`, `????` gibi bozuk isimler, dosyanın yazıldığından farklı bir metin kodlamasıyla okunduğunu gösterir. Çözüm, kaynağı doğru kodlamayla okuyup vCard'ı UTF-8 ile yazmaktır."
nav: "Türkçe karakter sorunu"
summary: "Ayþe, Ã§ veya ??? gibi kodlama karışıklıklarını tanıyın ve düzeltin."
faq:
  - q: "Telefonumda zaten bozuk görünen isimleri onarabilir miyim?"
    a: "Genellikle içe aktarılan grubu silip doğru bir dosyayı içe aktarmak daha kolaydır. Yerinde onarım ancak bozulma geri döndürülebilirse (örneğin UTF-8'in Latin-1 olarak okunması) işe yarar; soru işaretleri ise harflerin kaybolduğunu gösterir."
  - q: "Excel CSV'mi neden soru işaretleriyle kaydediyor?"
    a: "“CSV (Virgülle ayrılmış)” biçimi, sisteminizin Windows kod sayfasıyla kaydeder. Bu kod sayfasında olmayan harfler (Batı Avrupa dili ayarlı bir bilgisayarda ğ, ş, ı, İ ya da Kiril harfleri) `?` olur: `Ayşe Yılmaz` → `Ay?e Y?lmaz`. Bunun yerine “CSV UTF-8 (Virgülle ayrılmış)” olarak kaydedin ya da .xlsx dosyasını doğrudan dönüştürün."
  - q: "vCard hangi kodlamada olmalı?"
    a: "UTF-8. vCard 3.0 ve 4.0 bunu varsayar; vCard 2.1'de ise ASCII dışı her değer `CHARSET=UTF-8` ve Quoted-Printable kodlaması taşımalıdır. Bu sitedeki dönüştürücü bunu her zaman yapar."
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Bozulmanın türünü tanıyın

Her bozulma türünün tipik bir görünümü vardır ve bu görünüm neyin yanlış gittiğini söyler:

| Gördüğünüz | Olması gereken | Neden |
| --- | --- | --- |
| `Ayþe Yýlmaz`, `Çaðrý` | Ayşe Yılmaz, Çağrı | Windows-1254 (Türkçe) dosya Windows-1252 olarak okunmuş |
| `AyÅŸe YÄ±lmaz`, `Ã‡aÄŸrÄ± Ã–ztÃ¼rk` | Ayşe Yılmaz, Çağrı Öztürk | UTF-8 dosya Windows-1252, Windows-1254 veya Latin-1 olarak okunmuş |
| `Ay�e Y�lmaz` | Ayşe Yılmaz | Windows-1254 dosya UTF-8 olarak okunmuş |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | Kiril UTF-8 dosya Windows-1252 olarak okunmuş |
| `Èâàí Ïåòðîâ` | Иван Петров | Windows-1251 dosya Windows-1252 olarak okunmuş |
| `ÇáÇÓã` | الاسم | Windows-1256 (Arapça) dosya Latin-1 olarak okunmuş |
| `Ay?e Y?lmaz` | Ayşe Yılmaz | bu harfleri içermeyen bir kod sayfasıyla kaydederken harfler kaybolmuş |
| ismin ortasında `Ã` veya `�` | — | uzun bir satır çok baytlı bir harfin ortasından kesilmiş |

İlk altı durum özgün dosyadan onarılabilir. Soru işaretleri onarılamaz: harfler, dosya kaydedilirken `?` ile değiştirildi.

## Nasıl düzeltilir

1. **Özgün dosyaya dönün:** bozuk vCard'a değil, CSV'ye veya Excel çalışma kitabına.
2. **Dosyayı [dönüştürücüde](/tr/) açın.** Dönüştürücü kodlamayı algılar (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS ve diğerleri) ve ilk satırları gösterir. İsimler hâlâ yanlışsa *Kodlama* listesinden başka bir kodlama seçin; Türkçe Excel'den kaydedilmiş CSV'lerde bu çoğu zaman Windows-1254'tür. Önizleme hemen değişir, hangisinin doğru olduğunu görürsünüz.
3. **vCard 3.0 indirin.** Dosya, bugünkü her telefonun okuduğu UTF-8 ile yazılır.
4. **Bozuk içe aktarımı silip yeni dosyayı içe aktarın.** Google Kişiler'de içe aktarma tarihini taşıyan etiket, tüm grubu birlikte silmenizi sağlar.

## Neden olur

Bir metin dosyası hangi kodlamayı kullandığını söylemez. Excel'in klasik “CSV” biçimi, Outlook'un CSV dışa aktarımı ve birçok CRM, bilgisayarın **Windows kod sayfasıyla** yazar: Türkçe Windows'ta Windows-1254, Batı Avrupa ve Amerika'da Windows-1252, Kiril için 1251, Arapça için 1256. Telefon veya web servisi dosyayı sonra UTF-8 olarak okur ve İngilizce dışındaki harfler bozulur: `Ayşe` → `Ay�e`. Tersi de olur: Windows-1252 bekleyen eski bir yazılımda açılan UTF-8 dosyada `ş` yerine `ÅŸ`, `ü` yerine `Ã¼` görünür.

Eski telefonlar üçüncü bir sorun ekler. Bu telefonlar vCard 2.1 bekler ve ASCII dışı metni ancak `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` olarak işaretlendiğinde anlar. Bu işaret olmadan kusursuz bir UTF-8 dosya bile onlarda bozuk görünür. Böyle telefonlar için dönüştürücüde **vCard 2.1**'i seçin.

## Bir dahaki sefere önlemek için

- Excel'de **Dosya → Farklı Kaydet → CSV UTF-8 (Virgülle ayrılmış)** kullanın ya da CSV'yi hiç kullanmadan .xlsx dosyasını dönüştürün.
- Outlook'ta dışa aktarıp hemen dönüştürün; CSV'yi Excel'de yeniden kaydetmeyin.
- Google E-Tablolar'dan indirilen CSV dosyaları her zaman UTF-8'dir.
