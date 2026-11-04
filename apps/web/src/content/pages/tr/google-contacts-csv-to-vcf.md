---
url: google-kisiler-csv-vcf
title: "Google Kişiler CSV'yi VCF'ye Dönüştürme (Google CSV → vCard)"
h1: "Google Kişiler CSV'den VCF'ye"
description: "Google Kişiler CSV dosyasını (güncel veya eski düzen) iPhone ya da Outlook için VCF'ye dönüştürün. Etiketler, çoklu numaralar ve doğum günleri korunur. Yükleme yok."
lead: "“Google CSV” kişi dışa aktarımını bir vCard dosyasına çevirir. Telefon ve e-posta etiketleri, tek hücredeki birden çok değer (` ::: `), gruplar ve yılı olmayan doğum günleri aktarılır."
nav: "Google Kişiler CSV'den VCF'ye"
summary: "Google Kişiler CSV dışa aktarımından (yeni ve eski düzen) vCard."
steps:
  - "Google Kişiler'den dışa aktarılan CSV'yi bırakın (Dışa aktar → Google CSV). Hem güncel düzen (`First Name`, `Phone 1 - Label`) hem eski düzen (`Given Name`, `Group Membership`) tanınır."
  - "Sütunlar otomatik bağlanır ve **kesin** olarak işaretlenir; genellikle değiştirecek bir şey kalmaz."
  - "Ülke kodu olmadan kaydedilmiş numaralar için ülkeyi seçin ve yinelenenlerin birleştirilip birleştirilmeyeceğine karar verin."
  - ".vcf dosyasını indirip [iPhone'a](/tr/iphone-vcf-rehber-aktarma/) ya da [Outlook'a](/tr/outlook-kisileri-ice-aktarma/) aktarın."
features:
  - feature: "Düzenler"
    value: "Güncel Google CSV (`First Name`, `Labels`, `E-mail 1 - Label`…) ve eski düzen (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type`…)."
  - feature: "Birden çok değer"
    value: "Tek hücrede ` ::: ` ile ayrılmış birkaç numara veya e-posta, etiketleriyle birlikte ayrı `TEL` / `EMAIL` satırları olur."
  - feature: "Etiketler"
    value: "Mobile, Work, Home, Main, Work Fax, Home Fax, Pager vCard türlerine dönüşür; özel etiketler (ör. “WhatsApp”) `X-ABLabel` olarak korunur."
  - feature: "Gruplar"
    value: "`Labels` / `Group Membership` sütunları `CATEGORIES` olur; `* myContacts` ve `* starred` sistem etiketleri atılır."
  - feature: "Tarihler"
    value: "Yıllı ve yılsız (`--05-17`) doğum günleri; `Event 1` sütunundaki yıl dönümü de korunur."
  - feature: "Aktarılmayanlar"
    value: "Fotoğraflar (CSV'de yalnızca bağlantıları bulunur). “File As” ve özel alanlar nota yazılır."
faq:
  - q: "Google Kişiler zaten vCard dışa aktarabiliyor. Neden CSV'yi dönüştüreyim?"
    a: "Google hesabına hâlâ erişiminiz varsa Dışa aktar → vCard en kolay yoldur. Bu sayfa, elinizde yalnızca CSV olduğunda işe yarar: başkası göndermiş, yıllar önce dışa aktarılmış ya da Excel'de düzenlenmiş olabilir. Önce numaraları düzeltip yinelenenleri birleştirmek istediğinizde de kullanabilirsiniz."
  - q: "CSV'mdeki ` ::: ` ne anlama geliyor?"
    a: "Google aynı türden birkaç değeri tek hücreye koyar ve ` ::: ` ile ayırır. Örneğin iki cep numarası: `+90 532 123 45 67 ::: +90 555 123 45 67`. Bunlar kartta iki ayrı telefon satırı olur."
  - q: "Gruplar (etiketler) korunur mu?"
    a: "Evet, `CATEGORIES` olarak. iPhone kategorileri göstermez, ama Google Kişiler, Outlook ve çoğu Android uygulaması gösterir."
  - q: "Bazı numaralar neden geçersiz olarak işaretleniyor?"
    a: "Google numaraları yazıldıkları gibi dışa aktarır. Ülke kodu olmayan yerel bir numara seçtiğiniz ülkeye göre kontrol edilir; o ülkenin numaralandırma planına uymazsa değiştirilmeden yazılır ve işaretlenir."
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

**Google CSV**, Google Kişiler'in dışa ve içe aktarmada kullandığı tablo biçimidir ve basit bir listeden farklıdır. Her telefon, e-posta, adres ve web sitesi için bir sütun çifti vardır (`Phone 1 - Label` ve `Phone 1 - Value`) ve tek bir hücre, ` ::: ` ile ayrılmış birkaç değer içerebilir. Genel amaçlı dönüştürücüler bunu çoğu zaman kaçırır: `+90 532 123 45 67 ::: +90 555 123 45 67` değerini tek bir alana koyar ya da etiketleri kaybeder.

**Etiketler nasıl vCard türüne dönüşür?** Her satırın türünü etiket belirler:

| Google etiketi | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| özel, ör. “WhatsApp” | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

Eski dışa aktarımlarda etiketin önündeki yıldız (`* Work`) birincil değeri gösterir; dönüştürmede kaldırılır.

**İki düzen.** Google, CSV dışa aktarımındaki sütun adlarını değiştirdi. Güncel dosyalar `First Name, Middle Name, Last Name` ile başlar; eskiler `Name, Given Name, Additional Name, Family Name` ile başlar ve `Label` yerine `Type` kullanır. İkisi de otomatik algılanır; hangisinin bulunduğunu dosya panelinde görürsünüz.

**Yılı olmayan doğum günleri.** Google bunları `--05-17` olarak saklar. vCard'a da aynı biçimde yazılır; böylece yıl 1604 ya da 1900 olmaz, boş kalır.
