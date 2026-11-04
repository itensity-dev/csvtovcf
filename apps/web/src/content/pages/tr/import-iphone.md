---
url: iphone-vcf-rehber-aktarma
title: "VCF Dosyasını iPhone Rehberine Aktarma (Tüm Kişiler Tek Seferde)"
h1: "VCF dosyası iPhone rehberine nasıl aktarılır"
description: ".vcf dosyasındaki tüm kişileri iPhone'a tek seferde ekleyin: telefonda AirDrop, Mail veya Dosyalar ile ya da bilgisayarda iCloud.com ile. iOS 26 adımları ve sık sorunlar."
lead: "Çok kişili bir .vcf dosyasını bütünüyle içe aktaran iki yol var: dosyayı iPhone'da açıp “Tüm Kişileri Ekle”ye dokunmak ya da iCloud.com'da içe aktarıp eşitlenmesini beklemek."
nav: "iPhone'a aktarma"
summary: "Tek .vcf dosyasındaki tüm kişileri iPhone'a alın: telefonda veya iCloud.com ile."
steps:
  - ".vcf dosyasını [dönüştürücüyle](/tr/) oluşturun: vCard 3.0, telefon biçimi E.164 (`+905321234567`)."
  - "Dosyayı iPhone'a gönderin: Mac'ten AirDrop ile, kendinize e-postayla ya da iCloud Drive'a kaydedip Dosyalar uygulamasında açarak."
  - "Dosyaya dokunun. iOS içindeki kişileri gösterir; **Tüm Kişileri Ekle**'ye (Add All Contacts) dokunun. iOS bu düğmede kişi sayısını da gösterebilir. Dosyalar yalnızca önizleme gösteriyorsa Paylaş → **Kişiler**'e dokunun."
  - "Kişilerin doğru hesaba gittiğini kontrol edin: Ayarlar → Uygulamalar → Kişiler → **Varsayılan Hesap**, kişilerin iCloud'a, Gmail'e ya da “iPhone'umda”ya kaydedileceğini belirler."
faq:
  - q: "iPhone yalnızca ilk kişiyi gösteriyor. Diğerleri nerede?"
    a: "Dosya önizlemeyle (Hızlı Bakış) açıldıysa yalnızca bir kart görünür. Paylaş → Kişiler'i kullanın ya da dosyayı Mail, Mesajlar veya Dosyalar'dan açın; bunlar tam listeyi “Tüm Kişileri Ekle” düğmesiyle gösterir. Ya da dosyayı iCloud.com'da içe aktarın: her kart ayrı bir kişi olur."
  - q: "Kişileri içe aktarmak için iCloud gerekli mi?"
    a: "Hayır. .vcf dosyasını telefonda açmak iCloud olmadan da çalışır; kişiler varsayılan hesaba kaydedilir. iCloud.com, dosya bilgisayarınızdayken işe yarar."
  - q: "Bazı kişiler atlandı. Neden?"
    a: "Mesajlar üzerinden içe aktarırken iOS yalnızca rehberinizde zaten olmayan kartları ekler. Dönüştürücünün raporundaki yinelenenlere ve atlanan satırlar listesine bakın."
  - q: "İçe aktardıktan sonra isimlerde garip karakterler var."
    a: "vCard büyük olasılıkla 2.1'di ya da UTF-8 değildi. vCard 3.0 ile yeniden dönüştürün; dönüştürücü her zaman UTF-8 yazar. [İsimler neden bozulur](/tr/rehber-turkce-karakter-sorunu/)."
  - q: "Yılı olmayan doğum günleri 1604 olarak görünüyor."
    a: "iOS dahili olarak 1604'ü “yıl yok” anlamında kullanır. Burada dönüştürülen kişilerde yılı olmayan doğum günleri `--05-17` olarak kalır; iOS sürümünüz yine de bir yıl gösterirse kartı bir kez düzenleyip yılı silin."
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## 1. yöntem: iPhone'da

Dosya zaten telefondaysa veya gelen kutunuzdaysa en hızlı yol budur.

1. **Dosyayı iPhone'a alın.** Mac'ten AirDrop ile gönderin, kendinize e-postayla ya da Mesajlar'la yollayın veya iCloud Drive'a koyun.
2. **Açın.** Mail'de veya Mesajlar'da eke dokunun. Dosyalar'da dosyaya dokunun; yalnızca tek bir kart önizlemesi görüyorsanız Paylaş düğmesine dokunup **Kişiler**'i seçin.
3. **Hepsini ekleyin.** Liste dosyadaki her kartı gösterir. **Tüm Kişileri Ekle**'ye dokunun; düğmenin tam metni iOS sürümüne göre değişir ve kişi sayısını içerebilir.
4. **Bitti.** Kişiler, Kişiler uygulamasında ve Telefon uygulamasında görünür. WhatsApp, Telegram ve diğer uygulamalar onları bir sonraki rehber eşitlemesinden sonra görür.

## 2. yöntem: bilgisayarda iCloud.com

Apple bu yolu resmi olarak belgeliyor. Çok kişili dosyalarla da çalışır ve .vcf bilgisayarınızdayken kullanışlıdır.

1. [icloud.com](https://www.icloud.com/) adresinde oturum açın ve **Kişiler**'i açın.
2. **+** düğmesine tıklayıp **Kişiyi İçe Aktar**'ı (Import Contact) seçin. Sayfanın bazı sürümlerinde bunun yerine bir dişli simgesi ve **vCard'ı İçe Aktar** (Import vCard) görünür.
3. .vcf dosyasını seçin. Dosyadaki her kişi *Tüm Kişiler* altında ayrı bir kişi olur.
4. iPhone'da iCloud Kişiler açık olmalıdır: Ayarlar → [adınız] → iCloud → Kişiler. Yeni kişiler bir dakika içinde gelir.

## İçe aktarmadan önce

- **vCard 3.0 kullanın.** iPhone'ların kendisi bu sürümü dışa aktarır. vCard 2.1 yalnızca eski telefonlar içindir.
- **Numaraları uluslararası biçimde yazın.** `+905321234567` yurt dışındayken de, mesajlaşma uygulamalarında da çalışır; ülke kodu olmayan numaralar WhatsApp hesaplarıyla eşleşmeyebilir.
- **Önce yinelenenleri temizleyin.** Dönüştürücünün *Yinelenenler* sekmesi tablonuzda iki kez geçen kişileri gösterir; birleştirmek için Seçenekler'deki birleştirme kutusunu işaretleyin.
- **Yedek alın.** İçe aktarmayı tekrarlamak kolaydır ama geri almak zahmetlidir: yüzlerce yeni kişi eklemeden önce mevcut kişilerinizi iCloud.com'dan dışa aktarın.

## İçe aktarmayı geri alma

iOS'ta “içe aktarmayı geri al” diye bir seçenek yoktur. iCloud.com'da Shift veya Cmd ile tıklayarak birden çok kişiyi seçip birlikte silebilirsiniz; yine de binlerce kişiyi içe aktarmadan önce dosyayı birkaç satırla deneyin.
