import { destinationSlugs } from "@/content/destination-slugs";
import type {
  Destination,
  ImageAsset,
  LocalizedText,
  VisualTone,
} from "@/domain/tourism";

const referenceSource = {
  label: "Singapadu Tourism_revisi_3.html — prototype content; verify operational details before launch",
  checkedAt: "2026-07-27",
} as const;

function placeholder(
  tone: VisualTone,
  idAlt: string,
  enAlt: string,
  width = 1600,
  height = 1000,
): ImageAsset {
  return {
    // CHANGE THE PHOTO HERE: add the optimized public path, e.g. /heroes/barong-1920w.webp.
    src: undefined,
    alt: { id: idAlt, en: enAlt },
    width,
    height,
    tone,
  };
}

const daily = (display: LocalizedText, lastVerified = "2026-07-27") => ({
  timezone: "Asia/Makassar" as const,
  periods: [
    {
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const,
      opens: "09:00",
      closes: "17:00",
    },
  ],
  display,
  lastVerified,
});

export const destinations = [
  {
    id: "barong",
    slug: destinationSlugs.barong,
    status: "published",
    categoryIds: ["culture", "sacred"],
    featured: true,
    content: {
      id: {
        title: "Tari Barong di Pura Puseh",
        location: "Pura Puseh · pusat desa",
        summary:
          "Suara gamelan terdengar sebelum sang topeng terlihat. Barong Singapadu diukir, disucikan, dan ditarikan oleh keluarga yang sama—turun-temurun.",
        story: [
          "Singapadu adalah salah satu desa barong terkemuka di Bali. Topeng yang disaksikan ditatah dari kayu pule yang disakralkan, disucikan di pura, dan diperlakukan sebagai sosok yang hidup.",
          "Pentas berlangsung di panggung terbuka dekat Pura Puseh. Datang lebih awal untuk melihat penabuh gamelan bersiap, lalu tinggal sejenak setelah pertunjukan untuk mengamati topeng dari dekat.",
        ],
        tips: [
          "Kenakan kamen dan selendang yang tersedia di gerbang.",
          "Bawa uang tunai untuk tiket dan punia.",
          "Boleh memotret, tetapi hindari lampu kilat saat adegan trance.",
        ],
        distanceLabel: "0,4 km dari pusat desa",
      },
      en: {
        title: "Barong dance at Pura Puseh",
        location: "Pura Puseh · village centre",
        summary:
          "You hear the gamelan before you see the mask. Singapadu's Barong is carved, blessed, and danced by the same families across generations.",
        story: [
          "Singapadu is one of Bali's renowned Barong villages. The mask is carved from sacred pule wood, blessed at the temple, and treated as a living presence.",
          "Performances take place on the open stage near Pura Puseh. Arrive early to watch the gamelan warm up and stay afterwards to see the masks up close.",
        ],
        tips: [
          "Wear a sarong and sash, available at the gate.",
          "Bring cash for tickets and offerings.",
          "Photography is welcome, but avoid flash during trance scenes.",
        ],
        distanceLabel: "0.4 km from the village centre",
      },
    },
    heroImage: placeholder(
      "temple",
      "Penari Barong tampil di pelataran Pura Puseh",
      "Barong dancers performing at Pura Puseh",
      2000,
      1200,
    ),
    gallery: [
      placeholder("gold", "Detail topeng Barong", "Detail of a Barong mask"),
      placeholder("temple", "Penabuh gamelan desa", "Village gamelan musicians"),
      placeholder("sunrise", "Pelataran Pura Puseh", "Pura Puseh courtyard"),
    ],
    address: {
      village: "Singapadu",
      district: "Sukawati",
      regency: "Gianyar",
      province: "Bali",
    },
    mapQuery: "Pura Puseh Singapadu Gianyar",
    distanceFromVillageCenterKm: 0.4,
    openingHours: {
      timezone: "Asia/Makassar",
      periods: [
        { days: ["tue", "fri"], opens: "19:00", closes: "20:00" },
      ],
      display: {
        id: "Pentas Selasa & Jumat, 19.00",
        en: "Performances Tuesday & Friday, 19:00",
      },
      lastVerified: "2026-07-27",
    },
    price: {
      kind: "fixed",
      currency: "IDR",
      amount: 100000,
      unit: "person",
      display: {
        id: "Rp100.000 · anak-anak gratis",
        en: "IDR 100k · children free",
      },
    },
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "zoo",
    slug: destinationSlugs.zoo,
    status: "published",
    categoryIds: ["family"],
    featured: true,
    content: {
      id: {
        title: "Bali Zoo",
        location: "Jl. Raya Singapadu",
        summary:
          "Enam hektare taman di sepanjang jalan desa, rumah bagi beruang madu, owa, dan pengalaman sarapan bersama orangutan.",
        story: [
          "Kebun binatang ini berawal dari taman burung keluarga dan tetap terasa seperti taman: jalur teduh, pepohonan pura, dan kandang yang menyatu dengan tepi lembah sungai.",
          "Pagi hari adalah waktu terbaik—satwa sedang aktif dan sesi sarapan berlangsung hingga menjelang siang. Periksa kembali jadwal pengalaman khusus sebelum datang.",
        ],
        tips: [
          "Pesan sesi interaksi satwa setidaknya sehari sebelumnya.",
          "Jalur berpaving cukup nyaman untuk kereta bayi.",
          "Padukan dengan jalur sungai untuk perjalanan sehari penuh.",
        ],
        distanceLabel: "1,1 km dari pusat desa",
      },
      en: {
        title: "Bali Zoo",
        location: "Jl. Raya Singapadu",
        summary:
          "Six hectares of gardens along the village road, home to sun bears, gibbons, and the much-loved breakfast with orangutans.",
        story: [
          "The zoo grew from a family bird park and still feels like a garden first: shaded paths, temple trees, and enclosures built into the river valley edge.",
          "Mornings are best while the animals are active. Reconfirm special experience schedules before travelling.",
        ],
        tips: [
          "Book animal encounters at least a day ahead.",
          "Paved paths are suitable for strollers.",
          "Pair it with the river trail for a full day out.",
        ],
        distanceLabel: "1.1 km from the village centre",
      },
    },
    heroImage: placeholder(
      "forest",
      "Suasana taman tropis Bali Zoo",
      "Tropical gardens at Bali Zoo",
      2000,
      1200,
    ),
    gallery: [
      placeholder("forest", "Jalur rindang kebun binatang", "Shaded zoo pathway"),
      placeholder("gold", "Pengalaman satwa keluarga", "Family animal experience"),
      placeholder("river", "Lembah hijau di Singapadu", "Green valley in Singapadu"),
    ],
    address: {
      street: "Jl. Raya Singapadu",
      village: "Singapadu",
      district: "Sukawati",
      regency: "Gianyar",
      province: "Bali",
    },
    mapQuery: "Bali Zoo Singapadu",
    distanceFromVillageCenterKm: 1.1,
    openingHours: daily({
      id: "Setiap hari, 09.00–17.00",
      en: "Daily, 09:00–17:00",
    }),
    price: {
      kind: "from",
      currency: "IDR",
      amount: 150000,
      unit: "person",
      display: { id: "Mulai Rp150.000", en: "From IDR 150k" },
    },
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "carving",
    slug: destinationSlugs.carving,
    status: "published",
    categoryIds: ["craft"],
    featured: true,
    content: {
      id: {
        title: "Sanggar ukir batu paras",
        location: "Banjar Sengguan",
        summary:
          "Belajar mengukir batu paras dari para pematung yang memugar pura-pura Gianyar. Dua jam, alat disediakan, dan dijamin berdebu.",
        story: [
          "Paras adalah batu vulkanik yang cukup lunak bagi pemula untuk membentuk panel teratai dalam satu sore.",
          "Para pengajar adalah pematung aktif yang mengerjakan arca penjaga pura dan relief gerbang di sela sesi lokakarya.",
        ],
        tips: [
          "Kenakan pakaian yang boleh kotor berdebu.",
          "Kelas berlangsung dalam kelompok kecil—pesan lebih dulu.",
          "Ukiran perlu dua hingga tiga hari untuk mengering sebelum dikirim.",
        ],
        distanceLabel: "0,8 km dari pusat desa",
      },
      en: {
        title: "Paras stone carving workshop",
        location: "Banjar Sengguan",
        summary:
          "Learn paras-stone carving from sculptors who restore Gianyar's temples. Two hours, tools included, dust guaranteed.",
        story: [
          "Paras is a soft volcanic stone—approachable enough for beginners to shape a lotus panel in an afternoon.",
          "Your teachers are working sculptors who carve temple guardians and gateway reliefs between workshop sessions.",
        ],
        tips: [
          "Wear clothes that can get dusty.",
          "Workshops run in small groups, so book ahead.",
          "Your carving needs two to three days to dry before shipping.",
        ],
        distanceLabel: "0.8 km from the village centre",
      },
    },
    heroImage: placeholder(
      "stone",
      "Perajin memahat batu paras di Banjar Sengguan",
      "A craftsperson carving paras stone in Banjar Sengguan",
      2000,
      1200,
    ),
    gallery: [
      placeholder("stone", "Detail pahat batu paras", "Paras-stone carving detail"),
      placeholder("sunrise", "Sanggar terbuka perajin", "Open-air craft studio"),
      placeholder("temple", "Relief penjaga pura", "Temple guardian relief"),
    ],
    address: {
      banjar: "Sengguan",
      village: "Singapadu",
      district: "Sukawati",
      regency: "Gianyar",
      province: "Bali",
    },
    mapQuery: "Banjar Sengguan Singapadu",
    distanceFromVillageCenterKm: 0.8,
    openingHours: {
      timezone: "Asia/Makassar",
      periods: [
        {
          days: ["mon", "tue", "wed", "thu", "fri", "sat"],
          opens: "10:00",
          closes: "16:00",
        },
      ],
      display: {
        id: "Senin–Sabtu, sesi 10.00 & 14.00",
        en: "Monday–Saturday, sessions at 10:00 & 14:00",
      },
      lastVerified: "2026-07-27",
    },
    price: {
      kind: "fixed",
      currency: "IDR",
      amount: 250000,
      unit: "person",
      display: { id: "Rp250.000 per orang", en: "IDR 250k per person" },
    },
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "subak",
    slug: destinationSlugs.subak,
    status: "published",
    categoryIds: ["nature"],
    featured: true,
    content: {
      id: {
        title: "Susur sawah subak",
        location: "Singapadu Kaler",
        summary:
          "Satu jam berjalan bersama pemandu menyusuri saluran irigasi subak, ditutup kelapa muda di warung petani.",
        story: [
          "Subak adalah sistem irigasi gotong royong Bali yang menghubungkan pura air, saluran, dan paruman petani. Pemandu Anda adalah salah satu petaninya.",
          "Rutenya datar dan santai: bendung dan bagi air, pelinggih Dewi Sri, serta burung kuntul mengikuti bajak. Berangkatlah pagi untuk cahaya terbaik.",
        ],
        tips: [
          "Kenakan alas kaki yang mudah dibilas karena pematang dapat berlumpur.",
          "Bawa topi; naungan berkurang setelah pukul 09.00.",
          "Siapkan uang kecil untuk minuman di warung.",
        ],
        distanceLabel: "1,6 km dari pusat desa",
      },
      en: {
        title: "Subak rice-field walk",
        location: "Singapadu Kaler",
        summary:
          "A guided hour along the subak irrigation channels, ending with young coconut at a farmer's warung.",
        story: [
          "Subak is Bali's cooperative irrigation system linking water temples, channels, and farmer councils. Your guide is one of the farmers.",
          "The route is flat and unhurried: weirs, water splits, a shrine to Dewi Sri, and herons following the plough. Start early for the finest light.",
        ],
        tips: [
          "Wear shoes you can rinse; the paths can be muddy.",
          "Bring a hat as shade becomes scarce after 09:00.",
          "Keep small notes for refreshments at the warung.",
        ],
        distanceLabel: "1.6 km from the village centre",
      },
    },
    heroImage: placeholder(
      "sunrise",
      "Petani berjalan di pematang sawah Singapadu",
      "A farmer walking through Singapadu rice fields",
      2000,
      1200,
    ),
    gallery: [
      placeholder("sunrise", "Cahaya pagi di persawahan", "Morning light over rice fields"),
      placeholder("river", "Saluran air subak", "A subak irrigation channel"),
      placeholder("forest", "Pelinggih Dewi Sri", "A shrine to Dewi Sri"),
    ],
    address: {
      village: "Singapadu Kaler",
      district: "Sukawati",
      regency: "Gianyar",
      province: "Bali",
    },
    mapQuery: "Singapadu Kaler Gianyar",
    distanceFromVillageCenterKm: 1.6,
    openingHours: daily({
      id: "Setiap hari, terbaik 07.00–10.00",
      en: "Daily, best between 07:00–10:00",
    }),
    price: {
      kind: "fixed",
      currency: "IDR",
      amount: 75000,
      unit: "person",
      display: { id: "Rp75.000 dengan pemandu", en: "IDR 75k with guide" },
    },
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "river",
    slug: destinationSlugs.river,
    status: "published",
    categoryIds: ["nature"],
    featured: false,
    content: {
      id: {
        title: "Jalur sungai Tukad Oos",
        location: "Tebing barat desa",
        summary:
          "Jalur teduh menyusuri lembah sungai melewati pura pemandian dan habitat burung raja udang. Bawa sandal yang boleh basah.",
        story: [
          "Tukad Oos membelah ngarai hijau di tepi barat Singapadu. Jalurnya menurun melewati pakis dan pancuran pemandian berukir yang masih dipakai sehari-hari.",
          "Jalur ini pas digabung dengan susur sawah: turun ke lembah saat pagi masih sejuk, lalu naik lewat persawahan sebelum makan siang.",
        ],
        tips: [
          "Anak tangga batu licin setelah hujan.",
          "Hormati pura pemandian dan minta izin sebelum memotret.",
          "Pemandu lokal dapat diatur melalui kantor desa.",
        ],
        distanceLabel: "2 km dari pusat desa",
      },
      en: {
        title: "Tukad Oos river trail",
        location: "Western village ridge",
        summary:
          "A shaded river-valley path past bathing temples and kingfishers. Bring sandals that can get wet.",
        story: [
          "The Oos river cuts a green gorge along Singapadu's western edge. The trail descends past ferns and carved bathing places still used in daily life.",
          "It pairs naturally with the subak walk: descend into the valley in the cool morning, then return through the rice fields before lunch.",
        ],
        tips: [
          "Stone steps are slippery after rain.",
          "Respect bathing temples and ask before taking photographs.",
          "A local guide can be arranged through the village office.",
        ],
        distanceLabel: "2 km from the village centre",
      },
    },
    heroImage: placeholder(
      "river",
      "Jalur hijau di lembah Tukad Oos",
      "Green valley trail along Tukad Oos",
      2000,
      1200,
    ),
    gallery: [
      placeholder("river", "Aliran Tukad Oos", "The Tukad Oos river"),
      placeholder("forest", "Pakis di jalur lembah", "Ferns along the valley trail"),
      placeholder("stone", "Pancuran pemandian berukir", "Carved bathing fountains"),
    ],
    address: {
      village: "Singapadu",
      district: "Sukawati",
      regency: "Gianyar",
      province: "Bali",
    },
    mapQuery: "Tukad Oos Gianyar",
    distanceFromVillageCenterKm: 2,
    openingHours: daily({ id: "Buka sepanjang hari", en: "Open all day" }),
    price: { kind: "free", display: { id: "Gratis", en: "Free" } },
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "mask",
    slug: destinationSlugs.mask,
    status: "published",
    categoryIds: ["craft", "culture"],
    featured: false,
    content: {
      id: {
        title: "Studio tatah topeng",
        location: "Banjar Mukti",
        summary:
          "Saksikan kayu pule menjelma wajah topeng—atau tatah topeng Anda sendiri di bawah bimbingan seorang maestro.",
        story: [
          "Para penatah topeng Singapadu memasok wajah barong dan topeng untuk pura di seluruh Bali. Studionya menyatu dengan pekarangan keluarga.",
          "Kunjungan berlangsung santai. Lokakarya setengah hari dimulai dari bakalan topeng, sedangkan kursus panjang dapat ditutup dengan pemberkatan.",
        ],
        tips: [
          "Pagi adalah waktu terbaik melihat proses menatah.",
          "Harga topeng sangat bervariasi berdasarkan ukuran dan tingkat kerumitan.",
          "Minta izin sebelum menyentuh topeng jadi; sebagian telah dipasupati.",
        ],
        distanceLabel: "0,6 km dari pusat desa",
      },
      en: {
        title: "Mask-making studio",
        location: "Banjar Mukti",
        summary:
          "Watch pule wood become a mask—or carve your own blank under the eye of a master craftsperson.",
        story: [
          "Singapadu's mask carvers supply Barong and Topeng faces to temples across Bali. Their studios are woven into family compounds.",
          "Visits are relaxed. A half-day workshop begins with a prepared blank, while longer courses may conclude with a blessing.",
        ],
        tips: [
          "Morning is the best time to see carving in progress.",
          "Mask prices vary greatly by scale and complexity.",
          "Ask before touching finished masks; some have been consecrated.",
        ],
        distanceLabel: "0.6 km from the village centre",
      },
    },
    heroImage: placeholder(
      "gold",
      "Penatah mengerjakan topeng kayu pule",
      "A craftsperson carving a pule-wood mask",
      2000,
      1200,
    ),
    gallery: [
      placeholder("gold", "Topeng dalam proses pewarnaan", "A mask being painted"),
      placeholder("stone", "Alat tatah tradisional", "Traditional carving tools"),
      placeholder("temple", "Koleksi topeng di sanggar", "A studio mask collection"),
    ],
    address: {
      banjar: "Mukti",
      village: "Singapadu",
      district: "Sukawati",
      regency: "Gianyar",
      province: "Bali",
    },
    mapQuery: "Banjar Mukti Singapadu",
    distanceFromVillageCenterKm: 0.6,
    openingHours: {
      timezone: "Asia/Makassar",
      periods: [
        {
          days: ["mon", "tue", "wed", "thu", "fri", "sat"],
          opens: "09:00",
          closes: "16:00",
        },
      ],
      display: {
        id: "Senin–Sabtu, 09.00–16.00",
        en: "Monday–Saturday, 09:00–16:00",
      },
      lastVerified: "2026-07-27",
    },
    price: {
      kind: "from",
      currency: "IDR",
      amount: 300000,
      unit: "session",
      display: {
        id: "Kunjungan gratis · lokakarya mulai Rp300.000",
        en: "Visits free · workshops from IDR 300k",
      },
    },
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
] satisfies Destination[];
