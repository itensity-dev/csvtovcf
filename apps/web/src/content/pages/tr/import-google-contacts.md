---
url: google-kisiler-vcf-ice-aktarma
title: "VCF veya CSV Dosyasını Google Kişiler'e Aktarma"
h1: "Kişiler Google Kişiler'e nasıl aktarılır"
description: ".vcf (veya Google CSV) dosyasını web'de Google Kişiler'e aktarın: İçe aktar → Dosya seç. Sınırlar (dosya başına 3.000, hesap başına 25.000), etiketler ve yinelenenler."
lead: "Web'deki Google Kişiler bir .vcf veya Google CSV dosyasını birkaç tıklamayla içe aktarır. Kişiler sonra her Android telefona, Gmail'e ve Google hesabı ekli bir iPhone'a eşitlenir."
nav: "Google Kişiler'e aktarma"
summary: "contacts.google.com'da .vcf veya CSV içe aktarma ve sınırları."
steps:
  - "Tablonuzu [dönüştürücüyle](/tr/) çevirin: .vcf (vCard 3.0) ya da *İndirme biçimi* altında “Google Kişiler CSV”."
  - "[contacts.google.com](https://contacts.google.com/) adresini açın ve kişilerin gideceği hesapla oturum açın."
  - "Soldaki menüde **İçe aktar**'a, ardından **Dosya seç**'e tıklayın, dosyayı seçin ve **İçe aktar**'a tıklayın."
  - "İçe aktarılan kişiler, içe aktarma tarihini taşıyan bir etiket alır (İngilizce arayüzde “Imported on 4/11/2026”). Zaten kayıtlı kişilerle yinelenenleri birleştirmek için **Birleştir ve düzelt**'i açın."
faq:
  - q: "VCF mi, Google CSV mi? Google için hangisi daha iyi?"
    a: "İkisi de eksiksiz içe aktarılır. vCard telefon ve e-posta türlerini korur ve başka uygulamalarda da çalışır; Google CSV ise listeyi içe aktarmadan önce bir tabloda görmek veya düzenlemek istiyorsanız kullanışlıdır."
  - q: "Kaç kişi içe aktarabilirim?"
    a: "Google, 3.000'den fazla kişi içeren dosyaları bölmenizi ister; bir hesap en fazla 25.000 kişi (fotoğraflar hariç yaklaşık 20 MB) tutar. Daha büyük listeleri birkaç dosyaya bölün."
  - q: "İçe aktarmayı nasıl geri alırım?"
    a: "Soldaki menüde içe aktarma tarihini taşıyan etikete tıklayın, içindeki tüm kişileri seçin (üstteki onay kutusu) ve silin. Silinen kişiler 30 gün boyunca çöp kutusunda kalır."
  - q: "İçe aktarılan kişiler telefonumda görünmüyor."
    a: "Telefonun bu Google hesabını eşitlediğinden emin olun. Android'de: Ayarlar → Şifreler ve hesaplar (Passwords & accounts) → Google → Hesap senkronizasyonu → Kişiler. iPhone'da: Ayarlar → Uygulamalar → Kişiler → Hesaplar → Gmail → Kişiler açık olmalı."
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Adım adım içe aktarma

1. Bilgisayarda [contacts.google.com](https://contacts.google.com/) adresine gidin.
2. Soldaki menüde **İçe aktar**'a (Import) tıklayın.
3. **Dosya seç**'e (Select file) tıklayın ve .vcf veya .csv dosyasını seçin.
4. **İçe aktar**'a tıklayın.

Google içe aktarılan her kişiyi, içe aktarma tarihiyle adlandırılmış yeni bir etikete ekler. Böylece sonucu kontrol etmek ya da bir şey ters gittiyse tüm grubu silmek kolaylaşır.

## Bilinmesi gereken sınırlar

| Sınır | Değer |
| --- | --- |
| İçe aktarma dosyası başına kişi | yaklaşık 3.000; daha büyük dosyaları bölün |
| Hesap başına kişi | 25.000 |
| Kişiler için depolama | 20 MB (fotoğraflar hariç) |
| Tek bir kişi | en fazla 128 KB, 500 alan |

Dönüştürücü kişi sayısı ne olursa olsun tek bir dosya yazar. 3.000'den fazla satır için tabloyu filtreleyerek parçalara ayırın ve her parçayı ayrı dönüştürün ya da aynı .vcf dosyasını, dosya başına sınırı olmayan bir Android telefonda içe aktarın.

## Yinelenenler

Google içe aktarırken birleştirme yapmaz. Aynı kişiyi iki kez içe aktarırsanız iki kart olur. Bunu önlemenin iki yolu var:

- içe aktarmadan **önce**: dönüştürücüde *Yinelenenler* sekmesini açıp birleştirme kutusunu işaretleyin; aynı telefona veya e-postaya sahip kişiler tek kart olur;
- içe aktardıktan **sonra**: Google Kişiler → **Birleştir ve düzelt** (Merge & fix) tüm hesabınızdaki yinelenenleri önerir.

## Telefon numaraları

Google numaraları içe aktarıldıkları gibi, metin olarak saklar. Uluslararası biçimdeki numaralar (`+90 532 123 45 67`) her ülkede doğru görünür ve WhatsApp gibi mesajlaşma uygulamaları onları eşleştirebilir. Ülke kodu olmayan numaralar telefonun bölgesine göre yorumlanır ve yurt dışında yanlış olabilir. Dönüştürücünün varsayılan olarak `+` ile başlayan numaralar yazmasının nedeni budur.
