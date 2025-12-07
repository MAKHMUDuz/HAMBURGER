# HAMBURGER - Çevrimiçi Burger Sipariş Sistemi

![Animasyon](https://github.com/MAKHMUDuz/HAMBURGER/raw/main/Animation.gif)

Bu, Next.js, TypeScript ve Prisma ile oluşturulmuş, çevrimiçi bir burger sipariş sistemi için tam donanımlı bir web uygulamasıdır. Müşterilerin menüyü taraması, burgerlerini özelleştirmesi ve sipariş vermesi için sorunsuz bir deneyim sunar. Ayrıca ürünleri, siparişleri ve kampanyaları yönetmek için kapsamlı bir yönetici paneli içerir.

## ✨ Özellikler

### Müşteri Arayüzü

*   **Menüyü Gözden Geçirme:** Tüm mevcut ürünleri ayrıntıları ve fiyatları ile görüntüleyin.
*   **Ürün Özelleştirme:** Burgerleri ekstra malzemeler ve soslarla özelleştirin.
*   **Alışveriş Sepeti:** Ürünleri sepete ekleyin ve kolayca yönetin.
*   **Ödeme:** Basit ve sezgisel bir ödeme süreci ile sipariş verin.
*   **Sipariş Takibi:** Siparişin durumunu gerçek zamanlı olarak takip edin.
*   **Duyarlı Tasarım:** Tüm cihazlarda çalışan tam duyarlı tasarım.

### Yönetici Paneli

*   **Gösterge Paneli:** Satışlara, siparişlere ve diğer önemli metriklere genel bir bakış.
*   **Sipariş Yönetimi:** Siparişlerin durumunu görüntüleyin, yönetin ve güncelleyin.
*   **Ürün Yönetimi:** Ürünleri, kategorileri ve varyasyonları ekleyin, düzenleyin ve silin.
*   **Kampanya Yönetimi:** Promosyon kampanyaları oluşturun ve yönetin.
*   **Kullanıcı Yönetimi:** Yönetici kullanıcıları yönetin.

## API Uç Noktaları

*   `POST /api/admin/login`: Yönetici girişi.
    *   **Body**: `{ "username": "...", "password": "..." }`
    *   **Response**: `{ "success": true }`
*   `POST /api/auth/login`: Müşteri girişi.
    *   **Body**: `{ "username": "...", "password": "..." }`
    *   **Response**: `{ "success": true }`
*   `GET /api/campaigns`: Tüm kampanyaları alır. (Yönetici yetkisi gerektirir)
*   `POST /api/campaigns`: Yeni bir kampanya oluşturur veya mevcut bir kampanyayı günceller. (Yönetici yetkisi gerektirir)
    *   **Body**: `Campaign` nesnesi
*   `POST /api/campaigns/verify`: Bir kupon kodunu doğrular.
    *   **Body**: `{ "code": "...", "cartTotal": ... }`
*   `GET /api/orders`: Tüm siparişleri alır. (Şu an için sahte veri kullanılıyor)
*   `POST /api/orders`: Yeni bir sipariş oluşturur.
    *   **Body**: `{ "name": "...", "phone": "...", "fullAddress": "...", "note": "...", "items": [...], "total": ..., "paymentMethod": "..." }`
*   `GET /api/products`: Tüm ürünleri alır.
*   `PUT /api/products`: Tüm ürünleri günceller. (Yönetici yetkisi gerektirir)
    *   **Body**: `Product[]` nesne dizisi

## 🚀 Kullanılan Teknolojiler

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Dil:** [TypeScript](https://www.typescriptlang.org/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Stil:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Bileşenleri:** [Headless UI](https://headlessui.dev/)
*   **3D Render:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [Drei](https://github.com/pmndrs/drei)
*   **Animasyon:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
*   **Linting:** [ESLint](https://eslint.org/)

## 📦 Başlarken

### Ön Koşullar

*   Node.js (v20 veya üstü)
*   npm / yarn / pnpm

### Kurulum

1.  Depoyu klonlayın:
    ```bash
    git clone https://github.com/HAMBURGER.git
    ```
2.  Proje dizinine gidin:
    ```bash
    cd hamburger
    ```
3.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
4.  Veritabanını kurun:
    ```bash
    npx prisma db push
    ```
5.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```
    Sonucu görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
/
├── app/                  # Next.js Uygulama Yönlendiricisi
│   ├── api/              # API rotaları
│   ├── components/       # React bileşenleri
│   ├── admin/            # Yönetici paneli sayfaları
│   └── ...
├── prisma/               # Prisma şeması ve veritabanı dosyaları
│   └── schema.prisma     # Veritabanı şeması
├── public/               # Statik varlıklar
└── lib/                  # Yardımcı fonksiyonlar ve araçlar
```

## Veritabanı Şeması

Veritabanı şemasını [prisma/schema.prisma](prisma/schema.prisma) dosyasında bulabilirsiniz.