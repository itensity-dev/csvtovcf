---
url: outlook-kisileri-ice-aktarma
title: "Kişileri Outlook'a Aktarma (VCF ve CSV)"
h1: "Kişiler Outlook'a nasıl aktarılır"
description: "Outlook'a çok sayıda kişi aktarın: yeni Outlook, Outlook.com ve klasik Outlook için CSV (çok kişili .vcf kart kart aktarılır), ayrıca Mac için Outlook."
lead: "Outlook'ta toplu aktarmanın yolu CSV'dir. Yeni Outlook ve Outlook.com yalnızca CSV içe aktarır; klasik Outlook ise çok kişili bir .vcf dosyasının her kartı için onay ister. Dönüştürücü iki biçimi de yazar."
nav: "Outlook'a aktarma"
summary: "Yeni Outlook ve Outlook.com için CSV, klasik Outlook ve Mac için CSV veya vCard."
steps:
  - "[Dönüştürücüde](/tr/) *İndirme biçimi* altında **Outlook CSV**'yi seçip dosyayı indirin."
  - "**Yeni Outlook / Outlook.com:** Kişiler → **Kişileri yönet** (Manage contacts) → **Kişileri içeri aktar** (Import contacts) → Gözat → CSV'yi seçin → **İçeri aktar**."
  - "**Windows için klasik Outlook:** Dosya → **Aç ve Dışarı Aktar** → **İçeri/Dışarı Aktar** → *Başka bir programdan veya dosyadan al* → *Virgülle Ayrılmış Değerler* → dosyayı ve yinelenenlerin nasıl ele alınacağını seçin → **Kişiler** klasörünü seçin → **Son**."
  - "Birkaç kişiyi kontrol edin. Eksik alanlar varsa içe aktarmayı tekrarlayın ve sihirbazın son adımında **Özel Alanları Eşle**'yi kullanın."
faq:
  - q: "Neden .vcf dosyasını Outlook'a aktarmıyoruz?"
    a: "Yeni Outlook ve Outlook.com vCard dosyalarını içe aktarmaz. Klasik Outlook çok kişili bir .vcf dosyasını kişi kişi açar; her kartı onaylamanız gerekir ve kullanıcılar sık sık yalnızca ilk kişinin geldiğini bildiriyor. Microsoft da çok sayıda kişi için CSV yolunu öneriyor."
  - q: "Outlook'um Türkçe. İngilizce CSV başlıkları çalışır mı?"
    a: "Microsoft, CSV başlıklarının dilinin Outlook'un diliyle eşleşmesi gerektiğini belirtiyor. İçe aktarmadan sonra alanlar boş kalırsa içe aktarma sihirbazında **Özel Alanları Eşle**'yi kullanın ve her sütunu ilgili Outlook alanına sürükleyin: Mobile Phone → Cep Telefonu gibi."
  - q: "İçe aktardıktan sonra isimler `Ã¶`, `ÅŸ` veya `???` olarak görünüyor."
    a: "Klasik Outlook bazen UTF-8 CSV dosyalarını yanlış okur. Kontrol için birkaç kişiyle .vcf yolunu deneyin ya da CSV'yi Excel'de açıp Windows dilinizde “CSV (Virgülle ayrılmış)” olarak kaydedin ve o dosyayı içe aktarın."
  - q: "Mac için Outlook'a nasıl aktarırım?"
    a: ".vcf dosyasını Kişiler'e sürükleyin ya da Dosya → İçeri Aktar'ı kullanın. Microsoft'a göre pencerede yalnızca ilk kişi gösterilir, ama vCard'daki her kişi kaydedilir."
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## Hangi Outlook için hangi dosya

| Outlook | En uygun dosya | Yol |
| --- | --- | --- |
| Windows için yeni Outlook, Outlook.com, web'de Outlook | Outlook CSV | Kişiler → Kişileri yönet → Kişileri içeri aktar |
| Windows için klasik Outlook (2016–2024, Microsoft 365) | Outlook CSV | Dosya → Aç ve Dışarı Aktar → İçeri/Dışarı Aktar |
| Mac için Outlook | .vcf (vCard 3.0) | Kişiler'e sürükleyin ya da Dosya → İçeri Aktar |
| Herhangi bir Outlook'a tek kişi | .vcf | Dosyayı açın → Kaydet ve Kapat |

## Klasik Outlook: içe aktarma sihirbazı

1. **Dosya** → **Aç ve Dışarı Aktar** (Open & Export) → **İçeri/Dışarı Aktar** (Import/Export).
2. **Başka bir programdan veya dosyadan al**'ı (Import from another program or file) seçin → **İleri**.
3. **Virgülle Ayrılmış Değerler**'i (Comma Separated Values) seçin → **İleri**.
4. CSV dosyasına gidin. Yinelenenlerin nasıl ele alınacağını seçin: içeri aktarılanlarla değiştir, yinelenenlere izin ver ya da yinelenenleri içeri aktarma (Replace / Allow duplicates / Do not import) → **İleri**.
5. Doğru hesabın **Kişiler** klasörünü seçin → **İleri**.
6. Dosya için yapılacak işlemi işaretleyin. Outlook'un dili İngilizce değilse **Özel Alanları Eşle**'ye (Map Custom Fields) tıklayın, her sütunun doğru alana düştüğünü kontrol edin, sonra **Tamam** → **Son**.

## Bu dönüştürücünün Outlook CSV dosyasında neler var

Sütunlar Outlook'un kendi (İngilizce) adlarını taşır: `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday` vb. Telefonlar türlerine göre uygun sütuna yazılır. Fazladan numaralar *Other Phone*, *Car Phone* ve *Callback* sütunlarına gider. Sığmayan her şey (dördüncü e-posta, dördüncü adres) atılmaz, *Notes* alanına eklenir. Doğum günleri, Outlook'un kendi dışa aktarımındaki gibi `M/D/YYYY` biçiminde yazılır.

## Yalnızca birkaç kişi gerekiyorsa

Her .vcf dosyasını tek tek açın (dönüştürücüde “ZIP, her kişi için ayrı .vcf” seçeneğini kullanın). Outlook kişi penceresini gösterir; **Kaydet ve Kapat**'a (Save & Close) tıklayın. On kişi için uygundur, bin kişi için yorucudur.
