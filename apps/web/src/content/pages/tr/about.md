---
url: hakkinda
title: "csvtovcf Hakkında: Kim Yapıyor, Nasıl Çalışıyor"
h1: "csvtovcf hakkında"
description: "csvtovcf, kişi tablolarını vCard'a dönüştüren, tamamen tarayıcınızda çalışan ücretsiz ve açık kaynaklı bir araçtır. Kim yapıyor, nasıl finanse ediliyor, nasıl ulaşılır."
lead: "csvtovcf kişi tablolarını hiçbir yere göndermeden vCard dosyalarına dönüştürür. Açık kaynaklı bir motoru olan küçük, bağımsız bir projedir."
nav: "Hakkında"
summary: "csvtovcf'yi kim yapıyor, nasıl çalışıyor, nasıl ulaşılır."
updated: 2026-11-04
---

## Nedir

csvtovcf.com; Excel, Google E-Tablolar, Google Kişiler, Outlook, LinkedIn veya herhangi bir CRM'deki kişi listelerini, telefonların ve e-posta programlarının içe aktardığı **vCard (.vcf)** dosyalarına dönüştürür. Mevcut seçenekler ya on kişilik deneme sürümü olan ücretli masaüstü programlarıydı ya da adres defterinizi bir sunucuya yükleyip sütunları tahmin eden web siteleriydi; csvtovcf bu yüzden yapıldı.

**Bilgiler:**

- Yayına giriş: Kasım 2026. Bu sayfa en son aşağıda gösterilen tarihte güncellendi.
- Diller: İngilizce, İspanyolca, Portekizce (Brezilya), Endonezce, Türkçe, Almanca, Fransızca, Rusça.
- Biçimler: girişte CSV, TSV, XLSX, XLS, ODS; çıkışta vCard 2.1, 3.0, 4.0, Google CSV ve Outlook CSV.
- Ücret: ücretsiz, hesap yok, satır sınırı yok.

## Nasıl çalışır

Sayfa bir kez yüklenir. Sonrasında her adım (dosyayı okumak, kodlamayı algılamak, sütunları eşleştirmek, telefon numaralarını düzeltmek, vCard'ı yazmak) tarayıcınızdaki bir Web Worker'da çalışır. Hiçbir şey yüklenmez ve ilk ziyaretten sonra dönüştürücü çevrimdışı da çalışır. [Gizlilik sayfası](/tr/gizlilik/) ağ üzerinden neyin gönderildiğini ve neyin gönderilmediğini tam olarak açıklar.

Dönüştürme motoru MIT lisansıyla açık kaynaktır: [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf); npm'de [`csvtovcf`](https://www.npmjs.com/package/csvtovcf) adıyla da bulunur. Telefon numaraları [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js) ile kontrol edilir, tablolar [SheetJS](https://sheetjs.com/) ile okunur. Tüm kütüphaneler ve yazı tipleri [lisanslar sayfasında](/tr/lisanslar/) listelenir.

## Kim yapıyor

csvtovcf'yi, tek amaçlı birkaç araç daha işleten bağımsız bir geliştirici yapıyor: [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/) ve her sayfanın altında listelenen diğerleri. Her biri tek bir iş yapar ve hesap gerektirmez.

## İletişim

Hata bildirimleri, yanlış sütun eşleştirmeleri, bir dosyayı içe aktarmayan bir telefon: **hello@csvtovcf.com** adresine yazın ya da [GitHub](https://github.com/itensity-dev/csvtovcf/issues) üzerinde bir issue açın. Bir dosya yanlış dönüştürülüyorsa sütunlarını ve uydurma bir örnek satırı anlatın; lütfen gerçek kişi verisi göndermeyin.

csvtovcf'nin Apple, Google, Microsoft, Samsung veya LinkedIn ile bir bağlantısı yoktur; bu şirketlerin ürün adları yalnızca uyumluluğu anlatmak için kullanılır.
