import type {
  ContactInfo,
  Localized,
} from './schema';

export const TRANSLATIONS = {
  en: {
    nav: { home: "Home", destinations: "Destinations", about: "About the village" },
    cats: { All: "All", Culture: "Culture", Nature: "Nature", Craft: "Craft", Family: "Family", Sacred: "Sacred" },
    menu: { lang: "Language", theme: "Dark mode", map: "Map", contact: "Help & contact", all: "All destinations" },
    home: {
      slides: [
        { title: "A day among tropical birds.", sub: "Explore aviaries, educational shows, and conservation programs across two hectares.", loc: "Bali Bird Park · Singapadu", cta: "Visit bird park" },
        { title: "Riverside daycation in Singapadu.", sub: "Relax by the cave-inspired infinity pool, restaurant, and valley views.", loc: "Tlaga Singha · Singapadu", cta: "Explore Tlaga Singha" },
        { title: "Silver shaped by your own hands.", sub: "Browse Balinese jewelry, then learn the process in a two-hour silver class.", loc: "Krisna Yuna Gallery · Banjar Apuan", cta: "Explore the gallery" },
        { title: "From plantation to cup.", sub: "Meet local coffee, traditional firewood roasting, and the family behind Alam Sari.", loc: "Alam Sari · Singapadu", cta: "Discover the process" },
        { title: "Art and heritage of Singapadu.", sub: "Discover historical paintings, carvings, and masks visualising the village story.", loc: "Puri Anyar Art Space · Banjar Kebon", cta: "Visit art space" }
      ],
      quick: { all: "All destinations", plan: "Plan your visit" },
      destEyebrow: "Destinations", destTitle: "Places to explore", destAction: "See all destinations",
      rec: {
        eyebrow: "Experiences",
        title: "Pick your kind of day",
        tag: "Culture",
        f: "Art and heritage, gathered in one place",
        fSub: "Paintings, carvings, and masks trace the creative history of Singapadu.",
        c1: "Make silver by hand",
        c2: "Coffee from plantation to cup",
        c3: "A day with birds",
        c4: "Sacred places"
      },
      spotEyebrow: "Must-see", spotCta: "Discover",
      craftEyebrow: "Craft", craftTitle: "Shape a piece of Bali in silver.",
      craftBody: "At Krisna Yuna Gallery, you can browse more than 1,000 reported jewelry designs or join a guided silver class that takes you from the first sketch to the final polish.",
      craftCta: "Explore the gallery",
      tipsEyebrow: "Good to know", tipsTitle: "Plan an easy visit",
      tips: [
        { t: "Getting here", b: "Twenty minutes south of Ubud, forty-five from the airport. Every driver knows Jl. Raya Singapadu." },
        { t: "Temple etiquette", b: "Sarong and sash at every temple — borrowed free at the gate. Shoulders covered, voices low." },
        { t: "When to come", b: "April to October is the dry season. Arrive by 09:00 for cool light and a village at work." },
        { t: "Cash & tickets", b: "Workshops and warungs are cash-first. The nearest ATMs line Jl. Raya Singapadu." },
        { t: "What to pack", b: "Sandals you can rinse, a hat for the fields, a light layer for temple evenings." },
        { t: "Getting around", b: "Everything sits along one shaded road — walk it, or ask the village office about scooters." }
      ],
      cta: {
        eyebrow: "Plan your visit",
        title: "One message to the village office.",
        body: "Tickets, guides and workshop seats — the office answers on WhatsApp, Monday to Friday, 08:00–15:00.",
        btn: "WhatsApp the village",
        btn2: "See destinations"
      }
    },
    dests: { eyebrow: "Destinations", title: "All of Singapadu, sorted.", sub: "Eleven destinations from the village inventory. Filter by the kind of visit you're planning." },
    detail: {
      plan: "Plan your visit", hours: "Hours", tickets: "Tickets", getting: "Getting there",
      waBtn: "Ask via WhatsApp", allBtn: "All destinations",
      galleryEyebrow: "Gallery", galleryTitle: "A closer look",
      facilitiesEyebrow: "Facilities", facilitiesTitle: "What's available",
      tipsEyebrow: "Tips", tipsTitle: "Good to know",
      mapEyebrow: "Map", mapTitle: "Where you'll find it", mapOpen: "Open in Google Maps",
      nearbyEyebrow: "Nearby", nearbyTitle: "Keep exploring"
    },
    about: {
      eyebrow: "About the village", title: "Get to know Singapadu.",
      paras: [
        "Singapadu sits between Ubud and the coast in Gianyar's Sukawati district — a ribbon of banjar neighbourhoods, temples and rice fields along one shaded road. Its name is said to come from singa (lion) and padu (to meet in contest), a memory of two rival kingdoms that settled here.",
        "Today the village is known across Bali for what its families make: barong and rangda masks, temple carvings, gilded dance costumes and the gamelan that plays them all to life. Tourism here is village-run — every ticket and workshop fee goes back into the banjar."
      ],
      facts: [
        { icon: "map-pin", label: "Location", value: "Sukawati, Gianyar — 20 min south of Ubud" },
        { icon: "car", label: "Getting here", value: "About 45 min from Ngurah Rai Airport" },
        { icon: "landmark", label: "Village office", value: "Mon–Fri, 08:00–15:00" }
      ],
      partnerEyebrow: "Partners", partnerTitle: "Built with the village",
      partnerBody: "This site is a collaboration between the Singapadu village government and a community-service (KKN) team from Politeknik Negeri Bali.",
      mapCaption: "Desa Singapadu, Sukawati district, Gianyar regency, Bali."
    },
    footer: {
      blurb: "The village of barong dance, mask carving and living Balinese tradition. Sukawati, Gianyar, Bali.",
      explore: "Explore", visit: "Visit", contact: "Contact",
      plan: "Plan your visit", getting: "Getting here", wa: "WhatsApp the village"
    },
    waMsg: "Hello! I'd like to ask about {x} in Singapadu.",
    waGeneral: "Hello! I have a question about visiting Singapadu."
  },
  id: {
    nav: { home: "Beranda", destinations: "Destinasi", about: "Tentang Desa" },
    cats: { All: "Semua", Culture: "Budaya", Nature: "Alam", Craft: "Kriya", Family: "Keluarga", Sacred: "Sakral" },
    menu: { lang: "Bahasa", theme: "Mode gelap", map: "Peta", contact: "Bantuan & kontak", all: "Semua destinasi" },
    home: {
      slides: [
        { title: "Sehari bersama burung tropis.", sub: "Jelajahi aviari, pertunjukan edukatif, dan program konservasi di area dua hektare.", loc: "Bali Bird Park · Singapadu", cta: "Kunjungi taman burung" },
        { title: "Daycation tepi sungai di Singapadu.", sub: "Bersantai di kolam infinity berkonsep gua, restoran, dan pemandangan lembah.", loc: "Tlaga Singha · Singapadu", cta: "Jelajahi Tlaga Singha" },
        { title: "Perak yang dibentuk tangan Anda.", sub: "Lihat perhiasan Bali, lalu kenali prosesnya melalui silver class selama dua jam.", loc: "Krisna Yuna Gallery · Banjar Apuan", cta: "Jelajahi galeri" },
        { title: "Dari kebun hingga cangkir.", sub: "Kenali kopi lokal, penyangraian dengan kayu bakar, dan keluarga di balik Alam Sari.", loc: "Alam Sari · Singapadu", cta: "Kenali prosesnya" },
        { title: "Seni dan warisan budaya Singapadu.", sub: "Temukan lukisan sejarah, ukiran, dan topeng yang memvisualisasikan kisah desa.", loc: "Puri Anyar Art Space · Banjar Kebon", cta: "Kunjungi galeri seni" }
      ],
      quick: { all: "Semua destinasi", plan: "Rencanakan kunjungan" },
      destEyebrow: "Destinasi", destTitle: "Tempat untuk dijelajahi", destAction: "Lihat semua destinasi",
      rec: {
        eyebrow: "Pengalaman",
        title: "Pilih hari versi Anda",
        tag: "Budaya",
        f: "Seni dan warisan dalam satu ruang",
        fSub: "Lukisan, ukiran, dan topeng menelusuri sejarah kreatif Singapadu.",
        c1: "Buat perhiasan perak",
        c2: "Kopi dari kebun ke cangkir",
        c3: "Sehari bersama burung",
        c4: "Tempat-tempat sakral"
      },
      spotEyebrow: "Wajib disinggahi", spotCta: "Jelajahi",
      craftEyebrow: "Kriya", craftTitle: "Bentuk sepotong Bali dalam perak.",
      craftBody: "Di Krisna Yuna Gallery, Anda dapat melihat lebih dari 1.000 desain perhiasan yang dilaporkan tersedia atau mengikuti silver class dari sketsa pertama hingga pemolesan akhir.",
      craftCta: "Jelajahi galeri",
      tipsEyebrow: "Perlu diketahui", tipsTitle: "Kunjungan tanpa repot",
      tips: [
        { t: "Menuju desa", b: "Dua puluh menit di selatan Ubud, empat puluh lima dari bandara. Semua sopir tahu Jl. Raya Singapadu." },
        { t: "Etika pura", b: "Kamen dan selendang wajib di setiap pura — dipinjamkan gratis di gerbang. Bahu tertutup, suara pelan." },
        { t: "Waktu terbaik", b: "April–Oktober musim kering. Datanglah sebelum 09.00: cahaya sejuk, desa sedang bekerja." },
        { t: "Tunai & tiket", b: "Lokakarya dan warung utamanya tunai. ATM terdekat berjajar di Jl. Raya Singapadu." },
        { t: "Bawaan", b: "Sandal yang mudah dibilas, topi untuk ke sawah, dan luaran tipis untuk malam di pura." },
        { t: "Berkeliling", b: "Semua berada di satu jalan yang teduh — jalan kaki saja, atau tanyakan sewa skuter di kantor desa." }
      ],
      cta: {
        eyebrow: "Rencanakan kunjungan",
        title: "Cukup satu pesan ke kantor desa.",
        body: "Tiket, pemandu, dan kursi lokakarya — kantor desa membalas lewat WhatsApp, Senin–Jumat, 08.00–15.00.",
        btn: "WhatsApp desa",
        btn2: "Lihat destinasi"
      }
    },
    dests: { eyebrow: "Destinasi", title: "Seluruh Singapadu, tersusun rapi.", sub: "Sebelas destinasi dari inventaris desa. Saring sesuai kunjungan yang Anda rencanakan." },
    detail: {
      plan: "Rencanakan kunjungan", hours: "Jam buka", tickets: "Tiket", getting: "Menuju lokasi",
      waBtn: "Tanya via WhatsApp", allBtn: "Semua destinasi",
      galleryEyebrow: "Galeri", galleryTitle: "Lebih dekat",
      facilitiesEyebrow: "Fasilitas", facilitiesTitle: "Yang tersedia",
      tipsEyebrow: "Kiat", tipsTitle: "Perlu diketahui",
      mapEyebrow: "Peta", mapTitle: "Lokasi", mapOpen: "Buka di Google Maps",
      nearbyEyebrow: "Di sekitar", nearbyTitle: "Lanjutkan menjelajah"
    },
    about: {
      eyebrow: "Tentang desa", title: "Mengenal Singapadu.",
      paras: [
        "Singapadu terletak di antara Ubud dan pesisir, di Kecamatan Sukawati, Gianyar — deretan banjar, pura, dan persawahan di sepanjang satu jalan yang teduh. Namanya konon berasal dari kata singa dan padu, kenangan akan dua kerajaan yang pernah bertemu di sini.",
        "Kini desa ini dikenal di seluruh Bali lewat karya keluarga-keluarganya: topeng barong dan rangda, ukiran pura, busana tari berprada emas, serta gamelan yang menghidupkan semuanya. Pariwisata di sini dikelola desa — setiap tiket dan biaya lokakarya kembali ke banjar."
      ],
      facts: [
        { icon: "map-pin", label: "Lokasi", value: "Sukawati, Gianyar — 20 menit di selatan Ubud" },
        { icon: "car", label: "Akses", value: "Sekitar 45 menit dari Bandara Ngurah Rai" },
        { icon: "landmark", label: "Kantor desa", value: "Sen–Jum, 08.00–15.00" }
      ],
      partnerEyebrow: "Mitra", partnerTitle: "Dibangun bersama desa",
      partnerBody: "Situs ini merupakan kolaborasi Pemerintah Desa Singapadu dengan tim KKN Politeknik Negeri Bali.",
      mapCaption: "Desa Singapadu, Kecamatan Sukawati, Kabupaten Gianyar, Bali."
    },
    footer: {
      blurb: "Desa tari barong, tatah topeng, dan tradisi Bali yang tetap hidup. Sukawati, Gianyar, Bali.",
      explore: "Jelajahi", visit: "Berkunjung", contact: "Kontak",
      plan: "Rencanakan kunjungan", getting: "Akses ke desa", wa: "WhatsApp desa"
    },
    waMsg: "Halo! Saya ingin bertanya tentang {x} di Singapadu.",
    waGeneral: "Halo! Saya ingin bertanya tentang kunjungan ke Singapadu."
  }
} satisfies Localized<unknown>;

export const CONTACT_INFO = {
  whatsappNumber: "+62 812-3956-2711",
  email: "info@singapadu.desa.id",
  address: "Desa Singapadu, Sukawati, Gianyar, Bali 80582"
} as const satisfies ContactInfo;
