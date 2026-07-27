export type Language = 'en' | 'id';

export interface Destination {
  key: string;
  cat: 'Culture' | 'Nature' | 'Craft' | 'Family' | 'Sacred';
  img?: string;
  tone?: 'green' | 'amber' | 'sky' | 'navy';
  imgLabel?: string;
  mapQ: string;
  en: {
    title: string;
    location: string;
    blurb: string;
    hours: string;
    price: string;
    distance: string;
    story: string[];
    tips: string[];
  };
  id: {
    title: string;
    location: string;
    blurb: string;
    hours: string;
    price: string;
    distance: string;
    story: string[];
    tips: string[];
  };
  gallery: string[];
}

export interface EventItem {
  key: string;
  cat: 'Culture' | 'Nature' | 'Craft' | 'Family' | 'Sacred';
  en: {
    tag: string;
    date: string;
    title: string;
    desc: string;
    loc: string;
  };
  id: {
    tag: string;
    date: string;
    title: string;
    desc: string;
    loc: string;
  };
}

export interface HeroSlide {
  key: string;
  cat: 'Culture' | 'Nature' | 'Craft' | 'Family';
  img: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { key: "barong", img: "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=1600", cat: "Culture" },
  { key: "subak", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1600", cat: "Nature" },
  { key: "carving", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1600", cat: "Craft" },
  { key: "zoo", img: "https://images.unsplash.com/photo-1554457945-ba5df6648602?auto=format&fit=crop&q=80&w=1600", cat: "Family" }
];

export const DESTS: Destination[] = [
  {
    key: "barong",
    cat: "Culture",
    img: "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=900",
    tone: "green",
    mapQ: "Pura Puseh Singapadu Gianyar",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=1600"
    ],
    en: {
      title: "Barong dance at Pura Puseh",
      location: "Pura Puseh · village center",
      blurb: "You'll hear the gamelan before you see the mask. Singapadu's barong is carved, blessed and danced by the same families — and has been for generations.",
      hours: "Performances Tue & Fri, 19:00",
      price: "IDR 100k · children free",
      distance: "0.4 km from village center",
      story: [
        "Singapadu is one of Bali's great barong villages. The mask you'll see tonight was carved from sacred pule wood by a village master, blessed at the temple, and treated as a living being — it receives offerings before every performance.",
        "Performances happen on the open stage beside Pura Puseh. Come early to watch the gamelan warm up, and stay after: the dancers often let visitors see the masks up close."
      ],
      tips: [
        "Wear a sash (selendang) — provided at the gate",
        "Bring cash for tickets and offerings",
        "Photography is welcome, but no flash during trance scenes"
      ]
    },
    id: {
      title: "Tari Barong di Pura Puseh",
      location: "Pura Puseh · pusat desa",
      blurb: "Suara gamelan terdengar sebelum sang topeng terlihat. Barong Singapadu diukir, disucikan, dan ditarikan oleh keluarga yang sama — turun-temurun lintas generasi.",
      hours: "Pentas Selasa & Jumat, 19.00",
      price: "IDR 100 rb · anak-anak gratis",
      distance: "0,4 km dari pusat desa",
      story: [
        "Singapadu adalah salah satu desa barong terkemuka di Bali. Topeng yang Anda saksikan malam ini ditatah dari kayu pule yang disakralkan oleh seorang undagi desa, disucikan di pura, dan diperlakukan sebagai sosok yang hidup — selalu dihaturkan banten sebelum pentas.",
        "Pentas digelar di panggung terbuka di samping Pura Puseh. Datanglah lebih awal untuk melihat penabuh gamelan bersiap, dan jangan buru-buru pulang: para penari kerap mempersilakan pengunjung melihat topeng dari dekat."
      ],
      tips: [
        "Kenakan selendang — disediakan di gerbang",
        "Bawa uang tunai untuk tiket dan punia",
        "Boleh memotret, tanpa lampu kilat saat adegan trance"
      ]
    }
  },
  {
    key: "zoo",
    cat: "Family",
    img: "https://images.unsplash.com/photo-1554457945-ba5df6648602?auto=format&fit=crop&q=80&w=900",
    tone: "green",
    mapQ: "Bali Zoo Singapadu",
    gallery: [
      "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1600"
    ],
    en: {
      title: "Bali Zoo",
      location: "Jl. Raya Singapadu",
      blurb: "Six hectares of gardens along the village road, home to sun bears, gibbons and the breakfast-with-orangutans everyone photographs.",
      hours: "Daily, 09:00–17:00",
      price: "From IDR 150k",
      distance: "1.1 km from village center",
      story: [
        "The zoo grew out of a family bird park and still feels like a garden first: shaded paths, temple trees, and enclosures built into the river valley's edge.",
        "Mornings are best — the animals are active, tour buses haven't arrived, and the breakfast sessions run until 10:30. Night safaris run on weekends."
      ],
      tips: [
        "Book the animal-encounter sessions a day ahead",
        "Strollers are fine — paths are paved",
        "Combine with the river trail next door for a full day"
      ]
    },
    id: {
      title: "Bali Zoo",
      location: "Jl. Raya Singapadu",
      blurb: "Enam hektare taman di sepanjang jalan desa, rumah bagi beruang madu, owa, dan sarapan bersama orangutan yang paling banyak difoto.",
      hours: "Setiap hari, 09.00–17.00",
      price: "Mulai IDR 150 rb",
      distance: "1,1 km dari pusat desa",
      story: [
        "Kebun binatang ini berawal dari taman burung keluarga dan tetap terasa seperti taman: jalur teduh, pepohonan pura, dan kandang yang menyatu dengan tepi lembah sungai.",
        "Pagi hari adalah waktu terbaik — satwa sedang aktif, bus wisata belum tiba, dan sesi sarapan berlangsung hingga 10.30. Safari malam dibuka tiap akhir pekan."
      ],
      tips: [
        "Pesan sesi interaksi satwa sehari sebelumnya",
        "Kereta bayi aman — jalur sudah berpaving",
        "Gabungkan dengan jalur sungai di sebelahnya untuk seharian penuh"
      ]
    }
  },
  {
    key: "carving",
    cat: "Craft",
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=900",
    tone: "amber",
    mapQ: "Banjar Sengguan Singapadu",
    gallery: [
      "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1600"
    ],
    en: {
      title: "Stone carving workshop",
      location: "Banjar Sengguan",
      blurb: "Learn paras-stone carving from the sculptors who restore Gianyar's temples. Two hours, tools included, dust guaranteed.",
      hours: "Mon–Sat, 10:00 & 14:00",
      price: "IDR 250k per person",
      distance: "0.8 km from village center",
      story: [
        "Paras is soft volcanic stone — soft enough that a beginner can rough out a lotus panel in an afternoon, which is exactly what you'll do.",
        "Your teachers are working sculptors; between lessons they cut temple guardians and gate reliefs on commission. Finished pieces can be shipped home."
      ],
      tips: [
        "Wear clothes that can get dusty",
        "Workshops run in small groups — book ahead",
        "Your carving needs 2–3 days to dry before shipping"
      ]
    },
    id: {
      title: "Sanggar ukir batu paras",
      location: "Banjar Sengguan",
      blurb: "Belajar mengukir batu paras dari para pematung yang memugar pura-pura Gianyar. Dua jam, alat disediakan, dijamin berdebu.",
      hours: "Sen–Sab, 10.00 & 14.00",
      price: "IDR 250 rb per orang",
      distance: "0,8 km dari pusat desa",
      story: [
        "Paras adalah batu vulkanik yang lunak — cukup lunak sehingga pemula bisa membentuk panel teratai dalam satu sore, dan itulah yang akan Anda kerjakan.",
        "Para pengajar adalah pematung aktif; di sela mengajar mereka mengerjakan pesanan arca penjaga pura dan relief gerbang. Karya jadi bisa dikirim ke rumah Anda."
      ],
      tips: [
        "Kenakan pakaian yang boleh kotor berdebu",
        "Kelas berkelompok kecil — pesan lebih dulu",
        "Ukiran Anda perlu 2–3 hari mengering sebelum dikirim"
      ]
    }
  },
  {
    key: "subak",
    cat: "Nature",
    img: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=900",
    tone: "sky",
    mapQ: "Singapadu Kaler Gianyar",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1600"
    ],
    en: {
      title: "Subak rice terrace walk",
      location: "North Singapadu",
      blurb: "A guided hour through the UNESCO-listed subak irrigation landscape, ending with young coconut at a farmer warung.",
      hours: "Daily, best 07:00–10:00",
      price: "IDR 75k with guide",
      distance: "1.6 km from village center",
      story: [
        "Subak is Bali's thousand-year-old system of shared irrigation — water temples, canals and farmer councils that UNESCO lists as world heritage. Your guide is one of the farmers.",
        "The loop is flat and unhurried: weirs and water splits, a shrine to Dewi Sri, herons trailing the plough. Go at dawn if you can — the light on the paddies is the photograph."
      ],
      tips: [
        "Wear shoes you can rinse — bunds are muddy",
        "Bring a hat; there is little shade after 09:00",
        "Small notes appreciated at the warung"
      ]
    },
    id: {
      title: "Susur sawah subak",
      location: "Singapadu Utara",
      blurb: "Satu jam berjalan bersama pemandu menyusuri lanskap irigasi subak yang diakui UNESCO, ditutup kelapa muda di warung petani.",
      hours: "Setiap hari, terbaik 07.00–10.00",
      price: "IDR 75 rb dengan pemandu",
      distance: "1,6 km dari pusat desa",
      story: [
        "Subak adalah sistem irigasi gotong royong Bali yang berusia seribu tahun — pura air, saluran, dan paruman petani yang tercatat sebagai warisan dunia UNESCO. Pemandu Anda adalah salah satu petaninya.",
        "Rutenya datar dan santai: bendung dan bagi air, pelinggih Dewi Sri, kuntul mengikuti bajak. Usahakan berangkat subuh — cahaya pagi di atas sawah itulah fotonya."
      ],
      tips: [
        "Kenakan alas kaki yang mudah dibilas — pematang berlumpur",
        "Bawa topi; nyaris tak ada naungan setelah pukul 09.00",
        "Uang kecil sangat dihargai di warung"
      ]
    }
  },
  {
    key: "river",
    cat: "Nature",
    img: "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&q=80&w=900",
    tone: "navy",
    mapQ: "Tukad Oos Gianyar",
    gallery: [
      "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1600"
    ],
    en: {
      title: "Tukad Oos river trail",
      location: "West ridge",
      blurb: "Shaded river-valley path past bathing temples and kingfishers. Bring sandals you can get wet.",
      hours: "Open all day",
      price: "Free",
      distance: "2.0 km from village center",
      story: [
        "The Oos river cuts a green gorge along Singapadu's western edge. The trail drops past ferns and carved bathing spots, some still in daily use — greet before you photograph.",
        "It links well with the subak walk: down the valley in the cool morning, up through the rice fields before lunch."
      ],
      tips: [
        "The stone steps are slippery after rain",
        "Respect bathing temples — no swimwear photos",
        "No entrance fee, but guides can be arranged at the office"
      ]
    },
    id: {
      title: "Jalur sungai Tukad Oos",
      location: "Tebing barat desa",
      blurb: "Jalur teduh menyusuri lembah sungai melewati pura pemandian dan burung raja udang. Bawa sandal yang boleh basah.",
      hours: "Buka sepanjang hari",
      price: "Gratis",
      distance: "2,0 km dari pusat desa",
      story: [
        "Tukad Oos membelah ngarai hijau di tepi barat Singapadu. Jalurnya menurun melewati pakis dan pancuran pemandian berukir, sebagian masih dipakai sehari-hari — sapalah dahulu sebelum memotret.",
        "Jalur ini pas digabung dengan susur sawah: turun ke lembah saat pagi masih sejuk, naik lewat persawahan sebelum makan siang."
      ],
      tips: [
        "Anak tangga batu licin setelah hujan",
        "Hormati pura pemandian — jangan berfoto berpakaian renang",
        "Tanpa tiket masuk, pemandu bisa diatur di kantor desa"
      ]
    }
  },
  {
    key: "mask",
    cat: "Craft",
    img: "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&q=80&w=900",
    tone: "amber",
    imgLabel: "Photo: mask carver at work",
    mapQ: "Banjar Mukti Singapadu",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=700",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1600"
    ],
    en: {
      title: "Mask making studio",
      location: "Banjar Mukti",
      blurb: "Watch pule wood become a topeng face — or carve your own blank under a master carver's eye.",
      hours: "Mon–Sat, 09:00–16:00",
      price: "Visits free · workshop IDR 300k",
      distance: "0.6 km from village center",
      story: [
        "Singapadu's mask carvers supply barong and topeng faces to temples across Bali. The studio is a family compound: grandfather sanding, grandson sketching, chickens underfoot.",
        "Visits are free and unhurried. The half-day workshop starts you on a pre-cut blank; the full topeng course, if you have a week, ends with a blessing."
      ],
      tips: [
        "Mornings are the best time to see carving",
        "Masks range from IDR 200k to several million",
        "Ask before touching finished masks — some are consecrated"
      ]
    },
    id: {
      title: "Studio tatah topeng",
      location: "Banjar Mukti",
      blurb: "Saksikan kayu pule menjelma wajah topeng — atau tatah topeng Anda sendiri di bawah bimbingan sang maestro.",
      hours: "Sen–Sab, 09.00–16.00",
      price: "Kunjungan gratis · lokakarya IDR 300 rb",
      distance: "0,6 km dari pusat desa",
      story: [
        "Para penatah topeng Singapadu memasok wajah barong dan topeng untuk pura-pura di seluruh Bali. Studionya berupa pekarangan keluarga: kakek mengamplas, cucu menggambar pola, ayam berkeliaran.",
        "Kunjungan gratis dan santai. Lokakarya setengah hari dimulai dari bakalan topeng; kursus topeng penuh, bila Anda punya waktu seminggu, ditutup dengan upacara pemberkatan."
      ],
      tips: [
        "Pagi hari waktu terbaik melihat proses menatah",
        "Harga topeng mulai IDR 200 rb hingga jutaan",
        "Minta izin sebelum menyentuh topeng jadi — sebagian telah dipasupati"
      ]
    }
  }
];

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
        { title: "Where the barong comes alive.", sub: "Masks carved, blessed and danced by the same families for generations.", loc: "Pura Puseh · village center", cta: "See the dance" },
        { title: "Mornings that begin in the rice fields.", sub: "Walk the UNESCO-listed subak channels with the farmers who tend them.", loc: "Subak fields · north Singapadu", cta: "Walk the subak" },
        { title: "Carved in stone, danced in fire.", sub: "Paras stone and pule wood — workshops open along one village road.", loc: "Banjar Sengguan", cta: "Meet the makers" },
        { title: "Small travellers, big mornings.", sub: "Breakfast beside orangutans, then cool feet in the river valley.", loc: "Jl. Raya Singapadu", cta: "Take the kids" }
      ],
      quick: { all: "All destinations", plan: "Plan your visit" },
      destEyebrow: "Destinations", destTitle: "Places to explore", destAction: "See all destinations",
      rec: {
        eyebrow: "Experiences",
        title: "Pick your kind of day",
        tag: "Events",
        f: "The ceremony season",
        fSub: "Odalan, Galungan and the ngelawang barong — the calendar worth planning around.",
        c1: "Craft workshops",
        c2: "Morning in the subak",
        c3: "With kids",
        c4: "Sacred Singapadu"
      },
      spotEyebrow: "Must-see", spotCta: "Discover",
      craftEyebrow: "Craft", craftTitle: "The village that carves its gods",
      craftBody: "Singapadu's sculptors cut temple guardians from paras stone and barong masks from sacred pule wood. Spend an afternoon in their workshops — most welcome visitors, and a few will hand you a chisel.",
      craftCta: "Meet the makers",
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
    dests: { eyebrow: "Destinations", title: "All of Singapadu, sorted.", sub: "Six places, one village road. Filter by what kind of morning you're after." },
    detail: {
      plan: "Plan your visit", hours: "Hours", tickets: "Tickets", getting: "Getting there",
      waBtn: "Ask via WhatsApp", allBtn: "All destinations",
      galleryEyebrow: "Gallery", galleryTitle: "A closer look",
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
        { title: "Tempat barong menjadi hidup.", sub: "Topeng ditatah, disucikan, dan ditarikan keluarga yang sama lintas generasi.", loc: "Pura Puseh · pusat desa", cta: "Saksikan tarinya" },
        { title: "Pagi yang dimulai di sawah.", sub: "Susuri saluran subak warisan UNESCO bersama para petani penggarapnya.", loc: "Persawahan subak · Singapadu utara", cta: "Susur subak" },
        { title: "Terpahat di batu, hidup di tarian.", sub: "Batu paras dan kayu pule — sanggar terbuka di sepanjang satu jalan desa.", loc: "Banjar Sengguan", cta: "Temui perajin" },
        { title: "Penjelajah kecil, pagi yang besar.", sub: "Sarapan di samping orangutan, lalu main air di lembah sungai.", loc: "Jl. Raya Singapadu", cta: "Ajak si kecil" }
      ],
      quick: { all: "Semua destinasi", plan: "Rencanakan kunjungan" },
      destEyebrow: "Destinasi", destTitle: "Tempat untuk dijelajahi", destAction: "Lihat semua destinasi",
      rec: {
        eyebrow: "Pengalaman",
        title: "Pilih hari versi Anda",
        tag: "Acara",
        f: "Musim upacara",
        fSub: "Odalan, Galungan, dan ngelawang barong — kalender yang layak direncanakan.",
        c1: "Lokakarya kriya",
        c2: "Pagi di subak",
        c3: "Bersama anak",
        c4: "Singapadu yang sakral"
      },
      spotEyebrow: "Wajib disinggahi", spotCta: "Jelajahi",
      craftEyebrow: "Kriya", craftTitle: "Desa yang memahat para dewanya",
      craftBody: "Para pematung Singapadu memahat penjaga pura dari batu paras dan topeng barong dari kayu pule yang disakralkan. Habiskan sore di sanggar mereka — sebagian besar terbuka untuk pengunjung, dan beberapa akan menyerahkan pahatnya ke tangan Anda.",
      craftCta: "Temui para perajin",
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
    dests: { eyebrow: "Destinasi", title: "Seluruh Singapadu, tersusun rapi.", sub: "Enam tempat, satu jalan desa. Saring sesuai pagi seperti apa yang Anda cari." },
    detail: {
      plan: "Rencanakan kunjungan", hours: "Jam buka", tickets: "Tiket", getting: "Menuju lokasi",
      waBtn: "Tanya via WhatsApp", allBtn: "Semua destinasi",
      galleryEyebrow: "Galeri", galleryTitle: "Lebih dekat",
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
};

export const CONTACT_INFO = {
  whatsappNumber: "+62 812-3956-2711",
  email: "info@singapadu.desa.id",
  address: "Desa Singapadu, Sukawati, Gianyar, Bali 80582"
};
