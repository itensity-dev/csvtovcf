---
url: gizlilik
title: "Gizlilik — csvtovcf"
h1: "Gizlilik"
description: "Kişi dosyalarınız cihazınızda işlenir ve asla yüklenmez. csvtovcf neleri saklar, hangi kayıtlar tutulur, hangi üçüncü taraf hizmetler hangi amaçla kullanılır."
lead: "Kısaca: dosyalarınız cihazınızdan hiç çıkmaz. Sitede hesap yoktur, izleme çerezi kullanılmaz ve site, dönüştürdüğünüz isimleri, numaraları veya sütun başlıklarını görmez."
nav: "Gizlilik"
summary: "Ne nerede işlenir, ne kaydedilir, hangi hizmetler kullanılır."
updated: 2026-11-04
---

## Dosyalarınız

- Bıraktığınız, seçtiğiniz veya yapıştırdığınız dosyalar tarayıcınız tarafından okunur ve **cihazınızdaki bir Web Worker'da** işlenir. Yüklenmez, bir sunucuda saklanmaz ve kimseyle paylaşılmaz.
- Bunu kendiniz doğrulayabilirsiniz: tarayıcınızın geliştirici araçlarını açın, Ağ (Network) sekmesine geçin ve bir dosya dönüştürün. Dönüştürücü çalışırken yalnızca csvtovcf.com'dan kendi kodunu yükler (tablo okuyucu, bir Excel dosyasını ilk açtığınızda indirilir). Hiçbir istek verilerinizi içermez.
- Sitenin Content-Security-Policy ayarı, ağ bağlantılarını csvtovcf.com'un kendisiyle sınırlar. Analiz açılırsa aşağıda anlatılan anonim sayaca da izin verir. Analiz komut dosyaları dönüştürücüden asla veri almaz.
- Sekmeyi kapattığınızda veya yenilediğinizde veriler gider. Tarayıcınızın depolama alanına hiçbir şey yazılmaz.

## Sunucunun gördükleri

Sunucu sayfaları sunar ve standart bir erişim günlüğü tutar: IP adresi, zaman, istenen sayfa, tarayıcı türü ve yönlendiren sayfa. Günlük, hizmeti çalışır durumda tutmak ve kötüye kullanımı durdurmak için kullanılır. En fazla 14 gün saklanır ve başka verilerle birleştirilmez. Dosyalarınızı asla içermez, çünkü dosyalar hiç gönderilmez.

## Tarayıcınızdaki depolama

- `localStorage`: değiştirdiyseniz renk teması tercihiniz (açık, koyu veya otomatik).
- `sessionStorage`: “bu sayfa sizin dilinizde de var” bildirimini kapatıp kapatmadığınız.
- Bir service worker, dönüştürücünün çevrimdışı çalışması için sitenin kendi dosyalarını önbelleğe alır. Dosyalarınızı veya sonuçlarınızı asla önbelleğe almaz.

csvtovcf'nin kendisi hiçbir çerez yerleştirmez.

## Analiz

Site varsayılan olarak **analiz olmadan** çalışır. Analiz açılırsa Plausible Analytics kullanırız: çerez yok, kişisel veri yok ve IP adresleri saklanmaz. Yalnızca sayfa görüntülemeleri ve dönüştürme başına bir anonim olay sayılır. Bu olay vCard sürümünü, çıktı biçimini, algılanan kaynak türünü (ör. “Google CSV”) ve kişi sayısını bir aralık olarak (ör. “11–100”) kaydeder. İsimler, numaralar, adresler, dosya adları ve sütun başlıkları asla gönderilmez.

## Reklam

Reklam şu anda **kapalıdır**. Açılırsa reklamlar yalnızca dönüştürücünün dışında görünür. Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre'de, herhangi bir reklam çerezi kullanılmadan önce Google'ın sertifikalı onay penceresi tercihinizi sorar. Reklam komut dosyaları kişi verilerinizi okuyamaz, çünkü veriler sayfada değil Web Worker'da bulunur. Reklamlar yayına girmeden önce reklam sağlayıcısı bu sayfada belirtilecektir.

## Diğer sitelere bağlantılar

Kılavuzlar Apple, Google ve Microsoft yardım sayfalarına; alt bilgi ise aynı geliştiricinin diğer araçlarına bağlantı verir. Bu sitelerin kendi gizlilik politikaları vardır.

## Haklarınız ve iletişim

Dönüştürücü üzerinden kişisel veri toplamadığımız için görüntülenecek, dışa aktarılacak veya silinecek bir şey yoktur. Sunucu günlükleri veya bu sayfadaki herhangi bir konu hakkında sorularınız için **hello@csvtovcf.com** adresine yazın. Veri koruma otoritesine (Türkiye'de Kişisel Verileri Koruma Kurumu) şikâyette bulunma hakkınız da vardır.
