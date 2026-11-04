---
url: outlook-csv-vcf-donusturme
title: "Outlook CSV'yi VCF'ye Dönüştürme: Outlook Kişilerinden vCard"
h1: "Outlook CSV'den VCF'ye dönüştürme"
description: "Outlook kişi dışa aktarımını (her dilde CSV) iPhone, Android veya Gmail için tek VCF dosyasına dönüştürün. Türkçe başlıklar ve Windows kodlamaları okunur. Yükleme yok."
lead: "Outlook kişi dışa aktarımını tek bir .vcf dosyasına çevirir. İngilizce, Türkçe, Almanca, Fransızca, Rusça ve diğer Outlook dillerindeki başlıklarla ve Outlook'un yazdığı Windows kodlamalarıyla çalışır."
nav: "Outlook CSV'den VCF'ye"
summary: "Outlook kişi dışa aktarımından (her dilde CSV) tek vCard dosyası."
steps:
  - "Outlook'tan dışa aktarın. Klasik Outlook: Dosya → Aç ve Dışarı Aktar → İçeri/Dışarı Aktar → Dosyaya ver (Export to a file) → Virgülle Ayrılmış Değerler → Kişiler. Yeni Outlook ve Outlook.com: Kişiler → Kişileri yönet → Kişileri dışarı aktar (Export contacts)."
  - ".csv dosyasını yukarıya bırakın. Dönüştürücü kodlamayı (Outlook çoğu zaman UTF-8 değil, Türkçe Windows'ta Windows-1254, Batı Avrupa dillerinde 1252, Kiril'de 1251 yazar) ve ayırıcıyı (Türkçe ve birçok Avrupa ayarında `;`) algılar."
  - "Eşleştirmeleri kontrol edin: Outlook'un `Title` sütunu ön unvandır (Bay, Dr.), `Job Title` ise görevdir. Boş sütunlar gizlenir; Outlook yaklaşık 90 sütun dışa aktarır."
  - ".vcf dosyasını indirip [iPhone'a](/tr/iphone-vcf-rehber-aktarma/) veya [Android'e](/tr/android-vcf-rehber-aktarma/) aktarın."
features:
  - feature: "Outlook sürümleri"
    value: "Windows için klasik Outlook (2010–2024, Microsoft 365), yeni Outlook, Outlook.com ve Mac için Outlook CSV dışa aktarımları."
  - feature: "Başlık dilleri"
    value: "İngilizce, Türkçe (`Ad`, `Soyadı`, `Cep Telefonu`, `İş Telefonu`), Almanca (`Vorname`, `Telefon geschäftlich`), Fransızca (`Prénom`, `Tél. mobile`), Rusça (`Имя`, `Рабочий телефон`), İspanyolca, Portekizce, İtalyanca, Felemenkçe, Lehçe."
  - feature: "Telefonlar"
    value: "İş, ev, cep, birincil, şirket ana hattı, faks ve çağrı cihazı sütunları türlerini korur; araç, geri arama, ISDN ve telsiz numaraları “diğer” olur."
  - feature: "Adresler"
    value: "İş / ev / diğer adreslerin sokak, şehir, il, posta kodu ve ülke alanları, türü belli üç `ADR` kaydı olur; Sokak 2 ve 3 birleştirilir."
  - feature: "Boş değerler"
    value: "Outlook boş tarihleri `0/0/00` olarak yazar; bunlar yok sayılır, 2000 yılına çevrilmez."
  - feature: "Aktarılmayanlar"
    value: "Fotoğraflar, bayraklar, “Internet Free Busy”, kullanıcı alanları 1–4 (gerekirse nota bağlayın)."
faq:
  - q: "Outlook bir kişiyi vCard olarak kaydedebiliyor. Neden CSV'yi dönüştüreyim?"
    a: "Outlook her kişi için ayrı bir vCard kaydeder; tüm kişileri tek .vcf dosyasına aktarma seçeneği yoktur. CSV dışa aktarımı ise herkesi içerir ve bu sayfa onu tek bir .vcf dosyasına (ya da her kişi için ayrı kart içeren bir ZIP'e) çevirir."
  - q: "Dışa aktarımımda Türkçe (veya Almanca, Fransızca…) başlıklar var. Sorun olur mu?"
    a: "Hayır. Klasik Outlook başlıkları arayüz dilinde yazar ve dönüştürücü bunları tanır. Dosya panelinde “Outlook CSV, yerelleştirilmiş başlıklar” ve algılanan dil görünür."
  - q: "İsimde neden `Mr.` ya da `Bay` görüyorum?"
    a: "Outlook'un `Title` sütunu hitap unvanını tutar, bu yüzden adın ön unvanına yazılır. Telefonda görünmesini istemiyorsanız bu sütunu *atla* olarak ayarlayın."
  - q: "İsimler `Ayþe Yýlmaz` gibi ya da soru işaretleriyle çıkıyor."
    a: "Kodlama yanlış okunmuş. Outlook'un kullandığı kodlamayı seçin: Türkçe için Windows-1254, Batı Avrupa dilleri için Windows-1252, Kiril için Windows-1251, Orta Avrupa dilleri için Windows-1250. Önizleme hemen güncellenir. [Bozuk isimler hakkında daha fazlası](/tr/rehber-turkce-karakter-sorunu/)."
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

Outlook kişileri en fazla ~90 sütunlu bir CSV olarak dışa aktarır: üç adres, on dokuz telefon alanı, üç e-posta, kullanıcı alanları ve daha fazlası. Çoğu kişi için bu sütunların çoğu boştur. Dönüştürücü boş sütunları gizler, kalanları vCard alanlarına bağlar ve her kişi için bir kart yazar.

**Yerelleştirilmiş başlıklar.** Klasik Outlook sütunları arayüz dilinde adlandırır. Microsoft'un belgelerine göre içe aktarmada başlık dili Outlook'un diliyle eşleşmelidir; bu yüzden Almanca bir Outlook `Vorname, Nachname, Mobiltelefon` yazar. Dönüştürücü bu başlıkları sabit bir listeyle değil, içerdikleri kelimelerle tanır. Bu sayede `İş Telefonu`, `Telefon geschäftlich`, `Téléphone (bureau)` ve `Рабочий телефон` hepsi iş telefonu olur.

**Diğer dönüştürücüleri şaşırtan alanlar.**

- `Title` hitap unvanıdır (Bay, Bayan, Dr.); `Job Title` ise görevdir.
- `Business Street`, `Business Street 2`, `Business Street 3` tek bir adrese aittir.
- `E-mail Type` (`SMTP`) ve `E-mail Display Name` adres değildir, atlanır.
- `Birthday` = `0/0/00` “doğum günü yok” demektir.

**Kodlamalar.** Klasik Outlook CSV'yi çoğu zaman UTF-8 ile değil, sisteminizin Windows kod sayfasıyla yazar; Türkçe Windows'ta bu Windows-1254'tür. Türkçe veya başka bir Avrupa dilindeki Excel'de yeniden kaydedilmiş bir CSV ise noktalı virgül kullanır. İkisi de algılanır. İsimler yanlış görünüyorsa dosya panelinde kodlamayı değiştirin ve önizlemenin nasıl değiştiğine bakın.

**Outlook'a geri mi aktaracaksınız?** Kişileri Outlook'a *aktarmak* için CSV daha güvenli yoldur: klasik Outlook çok kişili bir .vcf dosyasını kart kart içe aktarır. *İndirme biçimi* altında “Outlook CSV”yi seçin. [Outlook içe aktarma kılavuzu](/tr/outlook-kisileri-ice-aktarma/).
