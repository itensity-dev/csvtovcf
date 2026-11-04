---
url: excel-telefon-numarasi-e11
title: "Excel Telefon Numarası E+11 Sorunu (9,05E+11): Neden ve Çözüm"
h1: "Excel telefon numaralarını neden 9,05E+11 yapar"
description: "Excel 12 ve daha fazla basamaklı sayıları bilimsel gösterimle gösterir, CSV'yi de öyle kaydeder ve rakamlar kaybolur. Tam numaraları geri alma ve sorunu önleme yolları."
lead: "Excel 12 veya daha fazla basamaklı her sayıyı bilimsel gösterimle gösterir: `905321234567`, `9,05321E+11` olur. CSV kaydedene kadar bu yalnızca bir görüntüleme biçimidir; kaydettiğinizde Excel kısaltılmış metni yazar ve eksik rakamlar dosyadan gider."
nav: "9,05E+11 görünen numaralar"
summary: "Bilimsel gösterim, kaybolan rakamlar ve sıfırlar: nedenleri ve çözümleri."
faq:
  - q: "9,05E+11 içeren bir CSV'den asıl numaralar geri alınabilir mi?"
    a: "Hayır. CSV yalnızca görünen rakamları içerir, ör. `9,05E+11`; gerisi dosyada yoktur. Excel çalışma kitabına (tam numara orada hâlâ saklıdır) ya da özgün kaynağa dönün."
  - q: "Baştaki sıfır neden kayboldu?"
    a: "Genel biçimli bir hücreye yazılan `05321234567` değerini Excel 5321234567 sayısı olarak ele alır ve sayıların başında sıfır olmaz. Uluslararası numaraların `+` işareti de aynı şekilde kaybolur. Yazmadan veya yapıştırmadan önce sütunu Metin olarak biçimlendirin."
  - q: "Dönüştürücü bu numaraları düzeltir mi?"
    a: "Mümkün olduğunda. Baştaki 0'ı veya `+` işareti eksik numaralar seçtiğiniz ülkeye göre tamamlanır ve o ülkenin numaralandırma planına göre kontrol edilir. Tüm rakamların korunduğu bilimsel gösterim (`9,05321234567E+11`) geri çevrilir. Rakamları kaybolmuş `9,05E+11` ise raporda işaretlenir, asla tahminle doldurulmaz."
  - q: "Bunu durduracak bir Excel ayarı var mı?"
    a: "Windows için Microsoft 365'te: Dosya → Seçenekler → Veri → Otomatik veri dönüştürme (Automatic data conversion) bölümünde “Uzun sayıların ilk 15 basamağını koru ve gerekirse bilimsel gösterimde görüntüle” ve “Baştaki sıfırları kaldır” seçeneklerinin işaretini kaldırın. Ayar, yeni yazdığınız veya açtığınız verilere uygulanır."
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## Adım adım ne oluyor

1. **Yazma veya yapıştırma.** Varsayılan *Genel* biçimli bir hücreye girilen telefon numarası sayı olarak saklanır. Baştaki `0` ve `+` hemen kaybolur: `+905321234567` → 905321234567.
2. **Görüntüleme.** Genel biçimde Excel, sütun darsa 12 veya daha fazla basamaklı sayıları bilimsel gösterimle gösterir: `9,05321E+11`. Hücrenin içinde tam sayı hâlâ saklıdır (Excel en fazla 15 anlamlı basamak tutar).
3. **CSV olarak kaydetme.** CSV düz metindir ve Excel her hücreyi *göründüğü gibi* yazar. Dosyada artık `9,05321E+11` vardır ve son rakamlar (`234567`) gitmiştir. Microsoft bu davranışı Excel 97'den beri belgeliyor.

Veriyi yok eden 3. adımdır. Ondan önce numara hâlâ kurtarılabilir.

## Numaralar nasıl kurtarılır

- **CSV'yi değil, çalışma kitabını kullanın.** .xlsx veya .xls dosyasını [Excel'den VCF'ye dönüştürücüye](/tr/excel-vcf-rehber/) bırakın: ekrandaki görüntüyü değil, saklanan sayıları okur.
- **Ya da sütunu genişletip biçimlendirin.** Sütunu seçin → Hücreleri Biçimlendir → **Sayı**, 0 ondalık basamak (veya `0` özel biçimi). Tam rakamlar görünür; ardından CSV'yi yeniden kaydedin.
- **Elinizde yalnızca CSV varsa** kaybolan rakamlar geri getirilemez. Özgün listeyi bulun.

## Nasıl önlenir

- **Numaraları girmeden önce telefon sütununu Metin olarak biçimlendirin** (Giriş → Sayı Biçimi → Metin). Böylece `+90 532 123 45 67`, artısı ve boşluklarıyla yazdığınız gibi kalır.
- **CSV dosyalarını çift tıklayarak açmak yerine metin olarak içe aktarın:** Veri → Metinden/CSV'den → *Verileri Dönüştür* (Data → From Text/CSV → Transform Data) → telefon sütununu *Metin* yapın.
- **Microsoft 365:** Dosya → Seçenekler → Veri → *Otomatik veri dönüştürme*: baştaki sıfırların kaldırılmasını ve uzun sayıların 15 basamakla bilimsel gösterimde tutulmasını kapatın.
- **Kaynakta numaraları uluslararası biçimde tutun** (`+90…`). Metin olarak saklandıklarında en iyi korunan biçim budur.

## Dönüştürücü bozuk numaralarla ne yapar

| Dosyada | Sonuç | Gösterilen |
| --- | --- | --- |
| `5321234567` + ülke Türkiye | `+905321234567` | geçerli |
| `905321234567` (`+` yok) | `+905321234567` | “eksik + eklendi” |
| `9,05321234567E+11` | `+905321234567` | “Excel gösteriminden geri alındı” |
| `9,05E+11` | değiştirilmeden yazılır | “Excel'in bozduğu”, kırmızı |

Bozuk numaralar asla uydurulmuş rakamlarla “tamamlanmaz”. Kartta işaretlenir ve *Uyarılar* sekmesinde satır numaralarıyla listelenir; böylece onları kaynakta düzeltebilirsiniz.
