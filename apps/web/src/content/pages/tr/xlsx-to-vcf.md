---
url: xlsx-vcf-donusturme
title: "XLSX Dosyasını VCF'ye Dönüştürme: Excel Kişilerinden vCard Rehberi"
h1: "XLSX'i VCF'ye dönüştürme"
description: ".xlsx kişi sayfasını VCF (vCard) dosyasına dönüştürün. Sayfayı seçin, numaralar ve tarihler eksiksiz kalsın; iPhone, Android veya Google için tek .vcf alın. Yükleme yok."
lead: ".xlsx çalışma kitabınızdan bir sayfa seçin, her satırın bir kart olduğu bir .vcf alın. Telefon numaraları eksiksiz okunur, tarih hücreleri doğum günü olur."
nav: "XLSX'i VCF'ye"
summary: "Güncel Excel çalışma kitaplarından (.xlsx) vCard, sayfa seçimiyle."
steps:
  - ".xlsx dosyasını yukarıya bırakın. Veri içeren ilk görünür sayfa açılır; başka bir sayfaya “Sayfa” listesinden geçebilirsiniz."
  - "İlk satırların önizlemesine bakın: sütun harfleri ve satır numaraları Excel'dekiyle aynıdır."
  - "Sütun eşleştirmelerini kontrol edin, telefon ülkesini ve vCard sürümünü ayarlayın (3.0 tüm güncel telefonlara uyar)."
  - ".vcf dosyasını indirin; kartları tek tek eklemeniz gerekiyorsa her kişi için ayrı dosya içeren ZIP'i seçin."
features:
  - feature: "Çalışma kitapları"
    value: ".xlsx, .xlsm ve .xlsb; her sayfa seçilebilir, gizli olanlar işaretlidir."
  - feature: "Formüller"
    value: 'Son hesaplanan değer kullanılır; örneğin `=B2&" "&C2` formülüyle oluşturulmuş bir isim.'
  - feature: "Birleştirilmiş ve boş hücreler"
    value: "Birleştirilmiş bir hücre bir kez, sol üst hücresinden okunur. Boş sütunlar eşleştirme panelinde gizlenir."
  - feature: "Uzun sayılar"
    value: "15 basamağa kadar tam olarak okunur; bu, Excel'in kendi hassasiyet sınırıdır. Daha uzun rakam dizileri Excel'de metin olarak saklanmalıdır."
  - feature: "Çıktı"
    value: "vCard 3.0, 4.0 veya 2.1; tek dosya veya ZIP; Google ya da Outlook CSV."
faq:
  - q: "Neden sayfayı CSV olarak dışa aktarıp onu dönüştürmüyoruz?"
    a: "Çünkü Excel'in CSV dışa aktarımı hücrede görüneni yazar. `9,05321E+11` olarak görünen bir telefon numarası rakamları kesilmiş olarak aktarılır. .xlsx ise numaranın tamamını hâlâ saklar; bu yüzden çalışma kitabının kendisini dönüştürün."
  - q: "Kişilerim birkaç sayfaya dağılmış. Birleştirebilir miyim?"
    a: "Her sayfayı dönüştürüp dosyaları sırayla içe aktarın ya da önce satırları tek bir sayfaya kopyalayın. Birden çok dosyayı birleştirmek desteklenir: hepsini birlikte bırakın."
  - q: "Excel'de saklanan doğum günleri nasıl okunur?"
    a: "Tarih biçimli hücreler, gösterim biçimi ne olursa olsun tarih olarak okunur. Metin tarihler de okunur: `17.05.1990`, `05/17/1990`, `1990-05-17` ve Türkçe dahil 13 dilde `17 Mayıs 1990` gibi yazımlar."
  - q: "Formüller veya makrolar çalıştırılır mı?"
    a: "Hayır. Makrolar asla çalışmaz. Formül hücreleri, Excel'in dosyaya kaydettiği değerler olarak okunur."
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

Bir **.xlsx** dosyası, XML parçalarından oluşan bir ZIP arşividir: her sayfa için bir parça, ayrıca ortak metinler ve hücre stilleri. Dönüştürücü bu arşivi tarayıcınızda [SheetJS](https://sheetjs.com/) ile açar ve seçtiğiniz sayfanın hücrelerini okur. Hiçbir şey bir yere gönderilmez.

**Sayılar ve metin.** Excel bir telefon numarasını ya sayı ya da metin olarak tutar. Sayı olarak tutulan numaralar baştaki `0`'ı ve `+` işaretini kaybeder. Dönüştürücü bunları seçtiğiniz ülkeye göre geri ekler ve her sonucu o ülkenin numaralandırma planına göre kontrol eder. Kontrolden geçmeyen numaralar değiştirilmeden yazılır ve işaretlenir; hiçbir şey sessizce kaybolmaz. Bir sütunda birkaç numaradan fazlası etkilenmişse dosya adının altındaki bir not kaç tane olduğunu söyler.

**Tarihler.** Excel bir tarihi 1900'den (eski Mac çalışma kitaplarında 1904'ten) bu yana geçen gün sayısı olarak saklar. Dönüştürücü hücre türünü okur ve gerçek tarih hücrelerini `BDAY` değerine çevirir. Yılı olmayan bir doğum günü (`--05-17`) yılsız kalır.

**Eşleştirme.** Eşleştirme paneli boş olmayan her sütunu harfi, başlığı ve örnek değerleriyle gösterir. Herhangi bir eşleştirmeyi listesinden değiştirebilirsiniz; ikinci liste türü belirler, böylece bir sütunu cep, iş veya ev numarası olarak işaretleyebilirsiniz. Değişiklikleriniz kart önizlemesine hemen yansır.

Genel durum ve CSV girişi için [CSV'den VCF'ye dönüştürücüye](/tr/) bakın.
