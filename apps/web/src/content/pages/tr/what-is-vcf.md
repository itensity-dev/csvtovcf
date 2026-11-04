---
url: vcf-dosyasi-nedir
title: "VCF Dosyası Nedir? vCard 2.1, 3.0 ve 4.0 Sürümleri"
h1: "VCF dosyası (vCard) nedir?"
description: "VCF dosyası bir vCard'dır: her telefonun ve e-posta uygulamasının içe aktarabildiği düz metin kişi kartı. İçinde ne var, 2.1, 3.0 ve 4.0 nasıl farklı, nasıl açılır."
lead: "VCF dosyası bir vCard'dır: bir veya daha fazla kişi kartını (isim, telefon numaraları, e-postalar, adres, doğum günü) her telefonun ve e-posta programının anladığı bir standartta tanımlayan düz metin. Telefonlarda çoğu zaman “rehber dosyası” ya da “kartvizit dosyası” olarak geçer."
nav: "VCF dosyası nedir"
summary: "vCard'ın içinde ne var, 2.1, 3.0 ve 4.0 sürümleri nasıl farklı."
faq:
  - q: "VCF dosyası nasıl açılır?"
    a: "Telefonda dosyaya dokunun: iPhone ve Android kişileri eklemeyi önerir. Bilgisayarda çift tıklamak adres defterini açar (Mac'te Kişiler, Windows'ta Outlook veya Kişiler uygulaması). Herhangi bir metin düzenleyici ham metni gösterir."
  - q: "Bir VCF dosyasında çok sayıda kişi olabilir mi?"
    a: "Evet. Dosya, art arda dizilmiş birkaç `BEGIN:VCARD … END:VCARD` bloğundan ibarettir. iPhone, Android ve Google Kişiler hepsini tek seferde içe aktarır; klasik Outlook ise tek tek ilerler."
  - q: "Hangi sürümü kullanmalıyım?"
    a: "Telefonlar, Google ve Outlook için vCard 3.0. 4.0'ı yalnızca bir uygulama isterse, 2.1'i ise eski tuşlu telefonlar için kullanın."
  - q: "VCF dosyasını açmak güvenli mi?"
    a: "vCard, makro veya kod içermeyen düz metindir. Risk, tanımadığınız birinden gelen her ekteki kadardır: kişi bilgilerinin kendisi yanıltıcı olabilir."
  - q: ".vcf ile .vcard arasındaki fark nedir?"
    a: "Fark yok; iki uzantı da aynı biçim için kullanılır. MIME türü `text/vcard`'dır (eski yazılımlar `text/x-vcard` kullanır)."
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## İçinde ne var

vCard metindir. Her kart `BEGIN:VCARD` ile başlar ve `END:VCARD` ile biter; aradaki her satır bir özelliktir:

```text
BEGIN:VCARD
VERSION:3.0
N:Yılmaz;Ayşe;;;
FN:Ayşe Yılmaz
TEL;TYPE=CELL:+905321234567
TEL;TYPE=WORK,VOICE:+902125550123
EMAIL;TYPE=INTERNET,WORK:ayse@example.com.tr
ORG:Yılmaz Tekstil
TITLE:Müdür
ADR;TYPE=WORK:;;Atatürk Cad. No 12;Kadıköy;İstanbul;34710;Türkiye
BDAY:1990-05-17
NOTE:Fuarda tanıştık
END:VCARD
```

En yaygın özellikler:

| Özellik | Anlamı |
| --- | --- |
| `N` | İsim parçaları: soyadı; ad; ikinci ad; ön unvan; son ek |
| `FN` | Görünen ad |
| `TEL` | Telefon numarası; `CELL`, `WORK`, `HOME`, `FAX` gibi türlerle |
| `EMAIL` | E-posta adresi |
| `ADR` | Adres: posta kutusu; ek adres; sokak; şehir/ilçe; il/bölge; posta kodu; ülke |
| `ORG`, `TITLE` | Şirket (ve departman), unvan |
| `BDAY`, `ANNIVERSARY` | Tarihler |
| `NOTE`, `URL`, `CATEGORIES` | Not, web sitesi, gruplar |

## Üç sürüm

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Yayımlanma | 1996, Versit Konsorsiyumu | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| ASCII dışı metin | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | varsayılan olarak UTF-8 | yalnızca UTF-8 |
| Tür parametreleri | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, numaralar `tel:` URI'si olarak |
| Zorunlu alanlar | `N` | `N`, `FN` | `FN` |
| Tipik kullanım | eski telefonlar, bazı Android dışa aktarımları | iPhone, Android, Google, Outlook | CardDAV sunucuları, yeni uygulamalar |

**vCard 3.0** güvenli seçimdir: iOS ve Google Kişiler'in dışa aktardığı sürümdür ve her içe aktarıcı onu okur. **4.0** biçimi toparlar (örneğin yılsız doğum günleri `--0517`, numaralar `tel:+905321234567` olarak yazılır), ama içe aktarıcılar onu daha az tutarlı işler. **2.1** ise 2000'li yılların telefonları için önemlidir: bu telefonlar, ASCII dışındaki her değer Quoted-Printable olarak kodlanmadıkça UTF-8'i anlamaz.

## İçe aktarmayı bozan ayrıntılar

- **Satır sonları** CRLF olmalıdır.
- **Uzun satırlar** 75 baytta katlanır: satır bölünür ve sonraki satır bir boşlukla başlar. Kötü bir dönüştürücü `ş` ya da `ğ` gibi çok baytlı bir harfi ortadan keser ve ismin ortasında `�` görürsünüz.
- **Değer içindeki virgül ve noktalı virgüller** kaçış karakteriyle yazılmalıdır (`\,` `\;`); yoksa “Kat 4, Daire 12” gibi bir adres parçalanır.
- **Kodlama**: UTF-8 yerine Windows-1254 ile yazılmış bir vCard 3.0 dosyası, Türkçe harfleri her telefonda bozuk gösterir.

[Bu sitedeki dönüştürücü](/tr/) bunların hepsini her sürümde doğru yazar. İndirmeden önce ilk kartın tam metnini *vCard metni* sekmesinde görebilirsiniz.
