import type {
  ContactInfo,
  EventItem,
  Localized,
} from './schema';

export const EVENTS: EventItem[] = [
  {
    key: "perf",
    cat: "Culture",
    en: { tag: "Weekly", date: "Tue & Fri", title: "Barong & keris dance", desc: "The village troupe performs the barong ket with full gamelan on the Pura Puseh stage. About 60 minutes.", loc: "Pura Puseh stage" },
    id: { tag: "Mingguan", date: "Sel & Jum", title: "Tari Barong & keris", desc: "Sekaa desa mementaskan barong ket dengan gamelan lengkap di panggung Pura Puseh. Sekitar 60 menit.", loc: "Panggung Pura Puseh" }
  },
  {
    key: "odalan",
    cat: "Sacred",
    en: { tag: "Aug 2026", date: "28 Aug", title: "Odalan at Pura Puseh", desc: "The temple's anniversary by the 210-day pawukon calendar: three days of decoration, procession and night gamelan.", loc: "Pura Puseh" },
    id: { tag: "Agu 2026", date: "28 Agu", title: "Odalan Pura Puseh", desc: "Piodalan pura menurut kalender pawukon 210 hari: tiga hari penuh hiasan, iring-iringan, dan gamelan malam.", loc: "Pura Puseh" }
  },
  {
    key: "purnama",
    cat: "Sacred",
    en: { tag: "Monthly", date: "Full moon", title: "Purnama offerings", desc: "On every full moon the temples fill with offerings and prayer from dusk. Visitors may watch respectfully from the outer courtyard.", loc: "All village temples" },
    id: { tag: "Tiap bulan", date: "Purnama", title: "Persembahyangan Purnama", desc: "Setiap purnama, pura dipenuhi banten dan persembahyangan sejak senja. Pengunjung dipersilakan menyaksikan dengan hormat dari jaba pura.", loc: "Seluruh pura desa" }
  },
  {
    key: "galungan",
    cat: "Culture",
    en: { tag: "Jan 2027", date: "13 & 23 Jan", title: "Galungan & Kuningan", desc: "Bali's great homecoming of the ancestors. Penjor poles arch over every street, and each family compound opens its shrines.", loc: "Village-wide" },
    id: { tag: "Jan 2027", date: "13 & 23 Jan", title: "Galungan & Kuningan", desc: "Hari kemenangan dharma dan pulangnya para leluhur. Penjor melengkung di sepanjang jalan, dan sanggah setiap pekarangan dibuka.", loc: "Seluruh desa" }
  },
  {
    key: "ngelawang",
    cat: "Culture",
    en: { tag: "Jan 2027", date: "14–22 Jan", title: "Ngelawang barong processions", desc: "Between Galungan and Kuningan, children and elders carry the barong door to door to cleanse the village. Small offerings welcome.", loc: "Village lanes" },
    id: { tag: "Jan 2027", date: "14–22 Jan", title: "Ngelawang barong", desc: "Di antara Galungan dan Kuningan, barong diarak dari pintu ke pintu untuk menyucikan desa. Sesari seikhlasnya.", loc: "Gang-gang desa" }
  }
];

export const TRANSLATIONS = {
  en: {
    nav: { home: "Home", destinations: "Destinations", events: "Events", about: "About the village" },
    cats: { All: "All", Culture: "Culture", Nature: "Nature", Craft: "Craft", Family: "Family", Sacred: "Sacred" },
    menu: { lang: "Language", theme: "Dark mode", map: "Map", contact: "Help & contact", all: "All destinations" },
    home: {
      slides: [
        { title: "Silver shaped by your own hands.", sub: "Browse Balinese jewelry, then learn the process in a two-hour silver class.", loc: "Krisna Yuna Gallery · Banjar Apuan", cta: "Explore the gallery" },
        { title: "From plantation to cup.", sub: "Meet local coffee, traditional firewood roasting, and the family behind Alam Sari.", loc: "Alam Sari · Singapadu", cta: "Discover the process" }
      ],
      quick: { all: "All destinations", plan: "Plan your visit" },
      destEyebrow: "Destinations", destTitle: "Places to explore", destAction: "See all destinations",
      rec: {
        eyebrow: "Experiences",
        title: "Pick your kind of day",
        tag: "Events",
        f: "Living stages and village ceremonies",
        fSub: "Performances and sacred dates follow the rhythm of the village calendar.",
        c1: "Make silver by hand",
        c2: "Coffee from plantation to cup",
        c3: "A day with birds",
        c4: "Sacred places"
      },
      spotEyebrow: "Must-see", spotCta: "Discover",
      craftEyebrow: "Craft", craftTitle: "Shape a piece of Bali in silver.",
      craftBody: "At Krisna Yuna Gallery, you can browse more than 1,000 reported jewelry designs or join a guided silver class that takes you from the first sketch to the final polish.",
      craftCta: "Explore the gallery",
      evEyebrow: "Ceremonies", evTitle: "On the village calendar", evAction: "See all events",
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
        btn2: "See events"
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
    events: {
      eyebrow: "Events", title: "Ceremonies and performances", sub: "The village lives by the pawukon and lunar calendars. These are the moments worth planning around.",
      note: "Ceremony dates follow the Balinese pawukon and lunar calendars — confirm at the village office before you travel.",
      ask: "Ask the village"
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
    nav: { home: "Beranda", destinations: "Destinasi", events: "Acara", about: "Tentang Desa" },
    cats: { All: "Semua", Culture: "Budaya", Nature: "Alam", Craft: "Kriya", Family: "Keluarga", Sacred: "Sakral" },
    menu: { lang: "Bahasa", theme: "Mode gelap", map: "Peta", contact: "Bantuan & kontak", all: "Semua destinasi" },
    home: {
      slides: [
        { title: "Perak yang dibentuk tangan Anda.", sub: "Lihat perhiasan Bali, lalu kenali prosesnya melalui silver class selama dua jam.", loc: "Krisna Yuna Gallery · Banjar Apuan", cta: "Jelajahi galeri" },
        { title: "Dari kebun hingga cangkir.", sub: "Kenali kopi lokal, penyangraian dengan kayu bakar, dan keluarga di balik Alam Sari.", loc: "Alam Sari · Singapadu", cta: "Kenali prosesnya" }
      ],
      quick: { all: "Semua destinasi", plan: "Rencanakan kunjungan" },
      destEyebrow: "Destinasi", destTitle: "Tempat untuk dijelajahi", destAction: "Lihat semua destinasi",
      rec: {
        eyebrow: "Pengalaman",
        title: "Pilih hari versi Anda",
        tag: "Acara",
        f: "Panggung hidup dan upacara desa",
        fSub: "Pementasan dan hari sakral mengikuti irama kalender desa.",
        c1: "Buat perhiasan perak",
        c2: "Kopi dari kebun ke cangkir",
        c3: "Sehari bersama burung",
        c4: "Tempat-tempat sakral"
      },
      spotEyebrow: "Wajib disinggahi", spotCta: "Jelajahi",
      craftEyebrow: "Kriya", craftTitle: "Bentuk sepotong Bali dalam perak.",
      craftBody: "Di Krisna Yuna Gallery, Anda dapat melihat lebih dari 1.000 desain perhiasan yang dilaporkan tersedia atau mengikuti silver class dari sketsa pertama hingga pemolesan akhir.",
      craftCta: "Jelajahi galeri",
      evEyebrow: "Upacara", evTitle: "Di kalender desa", evAction: "Lihat semua acara",
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
        btn2: "Lihat acara"
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
    events: {
      eyebrow: "Acara", title: "Upacara dan pementasan", sub: "Desa ini hidup mengikuti kalender pawukon dan sasih. Inilah momen-momen yang layak direncanakan.",
      note: "Tanggal upacara mengikuti kalender pawukon dan sasih Bali — pastikan di kantor desa sebelum berkunjung.",
      ask: "Tanya desa"
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
