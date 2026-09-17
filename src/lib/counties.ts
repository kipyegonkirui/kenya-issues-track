// Kenya counties, constituencies, and wards
export interface Ward {
  id: string;
  name: string;
}

export interface Constituency {
  id: string;
  name: string;
  wards: Ward[];
}

export interface County {
  id: string;
  name: string;
  constituencies: Constituency[];
}

export const counties: County[] = [
  {
    "id": "001",
    "name": "Mombasa",
    "constituencies": [
      {
        "id": "001-001",
        "name": "Changamwe",
        "wards": [
          { "id": "001-001-001", "name": "Port Reitz" },
          { "id": "001-001-002", "name": "Kipevu" },
          { "id": "001-001-003", "name": "Airport" },
          { "id": "001-001-004", "name": "Changamwe" },
          { "id": "001-001-005", "name": "Chaani" }
        ]
      },
      {
        "id": "001-002",
        "name": "Jomvu",
        "wards": [
          { "id": "001-002-001", "name": "Jomvu Kuu" },
          { "id": "001-002-002", "name": "Magongo" },
          { "id": "001-002-003", "name": "Miritini" }
        ]
      },
      {
        "id": "001-003",
        "name": "Kisauni",
        "wards": [
          { "id": "001-003-001", "name": "Mjambere" },
          { "id": "001-003-002", "name": "Junda" },
          { "id": "001-003-003", "name": "Bamburi" },
          { "id": "001-003-004", "name": "Mwakirunge" },
          { "id": "001-003-005", "name": "Mtopanga" },
          { "id": "001-003-006", "name": "Magogoni" },
          { "id": "001-003-007", "name": "Shanzu" }
        ]
      },
      {
        "id": "001-004",
        "name": "Nyali",
        "wards": [
          { "id": "001-004-001", "name": "Frere Town" },
          { "id": "001-004-002", "name": "Ziwa La Ng’ombe" },
          { "id": "001-004-003", "name": "Mkomani" },
          { "id": "001-004-004", "name": "Kongowea" },
          { "id": "001-004-005", "name": "Kadzandani" }
        ]
      },
      {
        "id": "001-005",
        "name": "Likoni",
        "wards": [
          { "id": "001-005-001", "name": "Mtongwe" },
          { "id": "001-005-002", "name": "Shika Adabu" },
          { "id": "001-005-003", "name": "Bofu" },
          { "id": "001-005-004", "name": "Likoni" },
          { "id": "001-005-005", "name": "Timbwani" }
        ]
      },
      {
        "id": "001-006",
        "name": "Mvita",
        "wards": [
          { "id": "001-006-001", "name": "Mji wa Kale/Makadara" },
          { "id": "001-006-002", "name": "Tudor" },
          { "id": "001-006-003", "name": "Tononoka" },
          { "id": "001-006-004", "name": "Shimanzi/Ganjoni" },
          { "id": "001-006-005", "name": "Majengo" }
        ]
      }
    ]
  },

  {
    "id": "002",
    "name": "Kwale",
    "constituencies": [
      {
        "id": "002-001",
        "name": "Msambweni",
        "wards": [
          { "id": "002-001-001", "name": "Gombato Bongwe" },
          { "id": "002-001-002", "name": "Ukunda" },
          { "id": "002-001-003", "name": "Kinondo" },
          { "id": "002-001-004", "name": "Ramisi" }
        ]
      },
      {
        "id": "002-002",
        "name": "Lungalunga",
        "wards": [
          { "id": "002-002-001", "name": "Pongwe/Kidimu" },
          { "id": "002-002-002", "name": "Dzombo" },
          { "id": "002-002-003", "name": "Vanga" },
          { "id": "002-002-004", "name": "Mwereni" }
        ]
      },
      {
        "id": "002-003",
        "name": "Matuga",
        "wards": [
          { "id": "002-003-001", "name": "Tsimba Golini" },
          { "id": "002-003-002", "name": "Waa" },
          { "id": "002-003-003", "name": "Tiwi" },
          { "id": "002-003-004", "name": "Kubo South" },
          { "id": "002-003-005", "name": "Mkongani" }
        ]
      },
      {
        "id": "002-004",
        "name": "Kinango",
        "wards": [
          { "id": "002-004-001", "name": "Ndavaya" },
          { "id": "002-004-002", "name": "Puma" },
          { "id": "002-004-003", "name": "Kinango" },
          { "id": "002-004-004", "name": "Mackinnon Road" },
          { "id": "002-004-005", "name": "Chengoni/Samburu" },
          { "id": "002-004-006", "name": "Mwavumbo" },
          { "id": "002-004-007", "name": "Kasemeni" }
        ]
      }
    ]
  },

  {
    "id": "003",
    "name": "Kilifi",
    "constituencies": [
      {
        "id": "003-001",
        "name": "Kilifi North",
        "wards": [
          { "id": "003-001-001", "name": "Tezo" },
          { "id": "003-001-002", "name": "Sokoni" },
          { "id": "003-001-003", "name": "Kibarani" },
          { "id": "003-001-004", "name": "Dabaso" },
          { "id": "003-001-005", "name": "Matsangoni" },
          { "id": "003-001-006", "name": "Watamu" },
          { "id": "003-001-007", "name": "Mnarani" }
        ]
      },
      {
        "id": "003-002",
        "name": "Kilifi South",
        "wards": [
          { "id": "003-002-001", "name": "Junju" },
          { "id": "003-002-002", "name": "Mwarakaya" },
          { "id": "003-002-003", "name": "Shimo La Tewa" },
          { "id": "003-002-004", "name": "Chasimba" },
          { "id": "003-002-005", "name": "Mtepeni" }
        ]
      },
      {
        "id": "003-003",
        "name": "Kaloleni",
        "wards": [
          { "id": "003-003-001", "name": "Mariakani" },
          { "id": "003-003-002", "name": "Kayafungo" },
          { "id": "003-003-003", "name": "Kaloleni" },
          { "id": "003-003-004", "name": "Mwanamwinga" }
        ]
      },
      {
        "id": "003-004",
        "name": "Rabai",
        "wards": [
          { "id": "003-004-001", "name": "Ruruma" },
          { "id": "003-004-002", "name": "Kambe/Ribe" },
          { "id": "003-004-003", "name": "Rabai/Kisurutini" },
          { "id": "003-004-004", "name": "Kiliﬁ South" }
        ]
      },
      {
        "id": "003-005",
        "name": "Ganze",
        "wards": [
          { "id": "003-005-001", "name": "Dabaso" },
          { "id": "003-005-002", "name": "Bamba" },
          { "id": "003-005-003", "name": "Jaribuni" },
          { "id": "003-005-004", "name": "Sokoke" }
        ]
      },
      {
        "id": "003-006",
        "name": "Malindi",
        "wards": [
          { "id": "003-006-001", "name": "Jilore" },
          { "id": "003-006-002", "name": "Kakuyuni" },
          { "id": "003-006-003", "name": "Ganda" },
          { "id": "003-006-004", "name": "Malindi Town" },
          { "id": "003-006-005", "name": "Shella" }
        ]
      },
      {
        "id": "003-007",
        "name": "Magarini",
        "wards": [
          { "id": "003-007-001", "name": "Garashi" },
          { "id": "003-007-002", "name": "Adu" },
          { "id": "003-007-003", "name": "Marafa" },
          { "id": "003-007-004", "name": "Magarini" },
          { "id": "003-007-005", "name": "Gongoni" },
          { "id": "003-007-006", "name": "Sabaki" },
          { "id": "003-007-007", "name": "Fundisa" }
        ]
      }
    ]
  }
  ,
  {
    "id": "004",
    "name": "Tana River",
    "constituencies": [
      {
        "id": "004-001",
        "name": "Garsen",
        "wards": [
          { "id": "004-001-001", "name": "Kipini East" },
          { "id": "004-001-002", "name": "Garsen South" },
          { "id": "004-001-003", "name": "Garsen Central" },
          { "id": "004-001-004", "name": "Garsen West" },
          { "id": "004-001-005", "name": "Garsen North" },
          { "id": "004-001-006", "name": "Kipini West" }
        ]
      },
      {
        "id": "004-002",
        "name": "Galole",
        "wards": [
          { "id": "004-002-001", "name": "Mikinduni" },
          { "id": "004-002-002", "name": "Chewani" },
          { "id": "004-002-003", "name": "Wayu" },
          { "id": "004-002-004", "name": "Kinakomba" }
        ]
      },
      {
        "id": "004-003",
        "name": "Bura",
        "wards": [
          { "id": "004-003-001", "name": "Sala" },
          { "id": "004-003-002", "name": "Madogo" },
          { "id": "004-003-003", "name": "Bura" },
          { "id": "004-003-004", "name": "Chewele" },
          { "id": "004-003-005", "name": "Bangale" }
        ]
      }
    ]
  }
  ,
  {
    "id": "005",
    "name": "Lamu",
    "constituencies": [
      {
        "id": "005-001",
        "name": "Lamu East",
        "wards": [
          { "id": "005-001-001", "name": "Faza" },
          { "id": "005-001-002", "name": "Kiunga" },
          { "id": "005-001-003", "name": "Basuba" }
        ]
      },
      {
        "id": "005-002",
        "name": "Lamu West",
        "wards": [
          { "id": "005-002-001", "name": "Mkunumbi" },
          { "id": "005-002-002", "name": "Hongwe" },
          { "id": "005-002-003", "name": "Witu" },
          { "id": "005-002-004", "name": "Bahari" },
          { "id": "005-002-005", "name": "Hindi" },
          { "id": "005-002-006", "name": "Mkomani" },
          { "id": "005-002-007", "name": "Shella" }
        ]
      }
    ]
  }
  ,
  {
    "id": "006",
    "name": "Taita Taveta",
    "constituencies": [
      {
        "id": "006-001",
        "name": "Taveta",
        "wards": [
          { "id": "006-001-001", "name": "Chala" },
          { "id": "006-001-002", "name": "Mahoo" },
          { "id": "006-001-003", "name": "Bomani" },
          { "id": "006-001-004", "name": "Mboghoni" },
          { "id": "006-001-005", "name": "Mata" }
        ]
      },
      {
        "id": "006-002",
        "name": "Wundanyi",
        "wards": [
          { "id": "006-002-001", "name": "Wundanyi/Mbale" },
          { "id": "006-002-002", "name": "Werugha" },
          { "id": "006-002-003", "name": "Wumingu/Kishushe" },
          { "id": "006-002-004", "name": "Mwanda/Mgange" }
        ]
      },
      {
        "id": "006-003",
        "name": "Mwatate",
        "wards": [
          { "id": "006-003-001", "name": "Ronge" },
          { "id": "006-003-002", "name": "Mwatate" },
          { "id": "006-003-003", "name": "Bura" },
          { "id": "006-003-004", "name": "Chawia" },
          { "id": "006-003-005", "name": "Wusi/Kishamba" }
        ]
      },
      {
        "id": "006-004",
        "name": "Voi",
        "wards": [
          { "id": "006-004-001", "name": "Mbololo" },
          { "id": "006-004-002", "name": "Sagalla" },
          { "id": "006-004-003", "name": "Kaloleni" },
          { "id": "006-004-004", "name": "Marungu" },
          { "id": "006-004-005", "name": "Ngolia" }
        ]
      }
    ]
  }
  ,
  {
    "id": "007",
    "name": "Garissa",
    "constituencies": [
      {
        "id": "007-001",
        "name": "Garissa Township",
        "wards": [
          { "id": "007-001-001", "name": "Waberi" },
          { "id": "007-001-002", "name": "Galbet" },
          { "id": "007-001-003", "name": "Township" },
          { "id": "007-001-004", "name": "Iftin" }
        ]
      },
      {
        "id": "007-002",
        "name": "Balambala",
        "wards": [
          { "id": "007-002-001", "name": "Balambala" },
          { "id": "007-002-002", "name": "Saka" },
          { "id": "007-002-003", "name": "Saka Sub-Location" },
          { "id": "007-002-004", "name": "Saka North" }
        ]
      },
      {
        "id": "007-003",
        "name": "Lagdera",
        "wards": [
          { "id": "007-003-001", "name": "Modogashe" },
          { "id": "007-003-002", "name": "Benane" },
          { "id": "007-003-003", "name": "Goreale" },
          { "id": "007-003-004", "name": "Maalimin" },
          { "id": "007-003-005", "name": "Simbir" }
        ]
      },
      {
        "id": "007-004",
        "name": "Dadaab",
        "wards": [
          { "id": "007-004-001", "name": "Dertu" },
          { "id": "007-004-002", "name": "Dadaab" },
          { "id": "007-004-003", "name": "Labasigale" },
          { "id": "007-004-004", "name": "Damajale" },
          { "id": "007-004-005", "name": "Liboi" },
          { "id": "007-004-006", "name": "Abakaile" }
        ]
      },
      {
        "id": "007-005",
        "name": "Fafi",
        "wards": [
          { "id": "007-005-001", "name": "Bura" },
          { "id": "007-005-002", "name": "Dekar" },
          { "id": "007-005-003", "name": "Jarajila" },
          { "id": "007-005-004", "name": "Nanighi" }
        ]
      },
      {
        "id": "007-006",
        "name": "Ijara",
        "wards": [
          { "id": "007-006-001", "name": "Hulugho" },
          { "id": "007-006-002", "name": "Sangailu" },
          { "id": "007-006-003", "name": "Ijara" },
          { "id": "007-006-004", "name": "Masalani" }
        ]
      }
    ]
  }
  ,
  {
    "id": "008",
    "name": "Wajir",
    "constituencies": [
      {
        "id": "008-001",
        "name": "Wajir North",
        "wards": [
          { "id": "008-001-001", "name": "Gurar" },
          { "id": "008-001-002", "name": "Bute" },
          { "id": "008-001-003", "name": "Korondile" },
          { "id": "008-001-004", "name": "Malkagufu" },
          { "id": "008-001-005", "name": "Batalu" },
          { "id": "008-001-006", "name": "Danaba" },
          { "id": "008-001-007", "name": "Godoma" }
        ]
      },
      {
        "id": "008-002",
        "name": "Wajir East",
        "wards": [
          { "id": "008-002-001", "name": "Wagberi" },
          { "id": "008-002-002", "name": "Barwago" },
          { "id": "008-002-003", "name": "Khorof Harar" },
          { "id": "008-002-004", "name": "Township" },
          { "id": "008-002-005", "name": "Central" }
        ]
      },
      {
        "id": "008-003",
        "name": "Tarbaj",
        "wards": [
          { "id": "008-003-001", "name": "Elben" },
          { "id": "008-003-002", "name": "Sarman" },
          { "id": "008-003-003", "name": "Tarbaj" },
          { "id": "008-003-004", "name": "Wargadud" }
        ]
      },
      {
        "id": "008-004",
        "name": "Wajir West",
        "wards": [
          { "id": "008-004-001", "name": "Arbajahan" },
          { "id": "008-004-002", "name": "Hadado/Athibohol" },
          { "id": "008-004-003", "name": "Adamasajide" },
          { "id": "008-004-004", "name": "Kagitaba" }
        ]
      },
      {
        "id": "008-005",
        "name": "Eldas",
        "wards": [
          { "id": "008-005-001", "name": "Eldas" },
          { "id": "008-005-002", "name": "Della" },
          { "id": "008-005-003", "name": "Lakoley South/Basir" },
          { "id": "008-005-004", "name": "Elnur/Tula Tula" }
        ]
      },
      {
        "id": "008-006",
        "name": "Wajir South",
        "wards": [
          { "id": "008-006-001", "name": "Benane" },
          { "id": "008-006-002", "name": "Burder" },
          { "id": "008-006-003", "name": "Dadaja Bulla" },
          { "id": "008-006-004", "name": "Habaswein" },
          { "id": "008-006-005", "name": "Lagboghol South" },
          { "id": "008-006-006", "name": "Ibrahim Ure" },
          { "id": "008-006-007", "name": "Diif" }
        ]
      }
    ]
  }
  ,
  {
    "id": "009",
    "name": "Mandera",
    "constituencies": [
      {
        "id": "009-001",
        "name": "Mandera West",
        "wards": [
          { "id": "009-001-001", "name": "Takaba South" },
          { "id": "009-001-002", "name": "Takaba" },
          { "id": "009-001-003", "name": "Lagsure" },
          { "id": "009-001-004", "name": "Dandu" },
          { "id": "009-001-005", "name": "Gither" }
        ]
      },
      {
        "id": "009-002",
        "name": "Banisa",
        "wards": [
          { "id": "009-002-001", "name": "Banissa" },
          { "id": "009-002-002", "name": "Derkhale" },
          { "id": "009-002-003", "name": "Guba" },
          { "id": "009-002-004", "name": "Malkamari" },
          { "id": "009-002-005", "name": "Kiliwehiri" }
        ]
      },
      {
        "id": "009-003",
        "name": "Mandera North",
        "wards": [
          { "id": "009-003-001", "name": "Rhamu" },
          { "id": "009-003-002", "name": "Rhamu-Dimtu" },
          { "id": "009-003-003", "name": "Ashabito" },
          { "id": "009-003-004", "name": "Guticha" },
          { "id": "009-003-005", "name": "Morothile" }
        ]
      },
      {
        "id": "009-004",
        "name": "Mandera South",
        "wards": [
          { "id": "009-004-001", "name": "Wargadud" },
          { "id": "009-004-002", "name": "Kutulo" },
          { "id": "009-004-003", "name": "Elwak South" },
          { "id": "009-004-004", "name": "Elwak North" },
          { "id": "009-004-005", "name": "Shimbir Fatuma" }
        ]
      },
      {
        "id": "009-005",
        "name": "Mandera East",
        "wards": [
          { "id": "009-005-001", "name": "Arabia" },
          { "id": "009-005-002", "name": "Bulla Mpya" },
          { "id": "009-005-003", "name": "Khalalio" },
          { "id": "009-005-004", "name": "Neboi" },
          { "id": "009-005-005", "name": "Township" }
        ]
      },
      {
        "id": "009-006",
        "name": "Lafey",
        "wards": [
          { "id": "009-006-001", "name": "Sala" },
          { "id": "009-006-002", "name": "Fino" },
          { "id": "009-006-003", "name": "Lafey" },
          { "id": "009-006-004", "name": "Warankara" },
          { "id": "009-006-005", "name": "Alango Gof" }
        ]
      }
    ]
  }
  ,
  {
    "id": "010",
    "name": "Marsabit",
    "constituencies": [
      {
        "id": "010-001",
        "name": "Moyale",
        "wards": [
          { "id": "010-001-001", "name": "Butiye" },
          { "id": "010-001-002", "name": "Sololo" },
          { "id": "010-001-003", "name": "Heillu-Manyatta" },
          { "id": "010-001-004", "name": "Golbo" },
          { "id": "010-001-005", "name": "Moyale Township" }
        ]
      },
      {
        "id": "010-002",
        "name": "North Horr",
        "wards": [
          { "id": "010-002-001", "name": "Illeret" },
          { "id": "010-002-002", "name": "North Horr" },
          { "id": "010-002-003", "name": "Dukana" },
          { "id": "010-002-004", "name": "Maikona" },
          { "id": "010-002-005", "name": "Turbi" }
        ]
      },
      {
        "id": "010-003",
        "name": "Saku",
        "wards": [
          { "id": "010-003-001", "name": "Sagante/Jaldesa" },
          { "id": "010-003-002", "name": "Karare" },
          { "id": "010-003-003", "name": "Marsabit Central" },
          { "id": "010-003-004", "name": "Marsabit Mountain" }
        ]
      },
      {
        "id": "010-004",
        "name": "Laisamis",
        "wards": [
          { "id": "010-004-001", "name": "Loiyangalani" },
          { "id": "010-004-002", "name": "Kargi/South Horr" },
          { "id": "010-004-003", "name": "Korr/Ngurunit" },
          { "id": "010-004-004", "name": "Laisamis" },
          { "id": "010-004-005", "name": "Logo Logo" }
        ]
      }
    ]
  }
  ,
  {
    "id": "011",
    "name": "Isiolo",
    "constituencies": [
      {
        "id": "011-001",
        "name": "Isiolo North",
        "wards": [
          { "id": "011-001-001", "name": "Wabera" },
          { "id": "011-001-002", "name": "Bulla Pesa" },
          { "id": "011-001-003", "name": "Chari" },
          { "id": "011-001-004", "name": "Cherab" },
          { "id": "011-001-005", "name": "Ngare Mara" },
          { "id": "011-001-006", "name": "Oldonyiro" }
        ]
      },
      {
        "id": "011-002",
        "name": "Isiolo South",
        "wards": [
          { "id": "011-002-001", "name": "Garbatulla" },
          { "id": "011-002-002", "name": "Kinna" },
          { "id": "011-002-003", "name": "Sericho" }
        ]
      }
    ]
  }
  ,
  [
    {
      "id": "012",
      "name": "Meru",
      "constituencies": [
        {
          "id": "012-001",
          "name": "Igembe South",
          "wards": [
            { "id": "012-001-001", "name": "Maua" },
            { "id": "012-001-002", "name": "Kiegaene" },
            { "id": "012-001-003", "name": "Mikinduri" },
            { "id": "012-001-004", "name": "Kangeta" },
            { "id": "012-001-005", "name": "Athiru Gaiti" }
          ]
        },
        {
          "id": "012-002",
          "name": "Igembe Central",
          "wards": [
            { "id": "012-002-001", "name": "Akachiu" },
            { "id": "012-002-002", "name": "Athiru Ruujine" },
            { "id": "012-002-003", "name": "Kiirua/Naari" },
            { "id": "012-002-004", "name": "Njia" },
            { "id": "012-002-005", "name": "Kangeta" }
          ]
        },
        {
          "id": "012-003",
          "name": "Igembe North",
          "wards": [
            { "id": "012-003-001", "name": "Antubetwe Kiongo" },
            { "id": "012-003-002", "name": "Naathu" },
            { "id": "012-003-003", "name": "Amwathi" },
            { "id": "012-003-004", "name": "Mutuati" },
            { "id": "012-003-005", "name": "Ntunene" }
          ]
        },
        {
          "id": "012-004",
          "name": "Tigania West",
          "wards": [
            { "id": "012-004-001", "name": "Athwana" },
            { "id": "012-004-002", "name": "Akithii" },
            { "id": "012-004-003", "name": "Kianjai" },
            { "id": "012-004-004", "name": "Nkomo" },
            { "id": "012-004-005", "name": "Kisima" }
          ]
        },
        {
          "id": "012-005",
          "name": "Tigania East",
          "wards": [
            { "id": "012-005-001", "name": "Thangatha" },
            { "id": "012-005-002", "name": "Muthara" },
            { "id": "012-005-003", "name": "Karama" },
            { "id": "012-005-004", "name": "Kiguchwa" },
            { "id": "012-005-005", "name": "Mikinduri" }
          ]
        },
        {
          "id": "012-006",
          "name": "North Imenti",
          "wards": [
            { "id": "012-006-001", "name": "Municipality" },
            { "id": "012-006-002", "name": "Ntima East" },
            { "id": "012-006-003", "name": "Ntima West" },
            { "id": "012-006-004", "name": "Nyaki West" },
            { "id": "012-006-005", "name": "Nyaki East" }
          ]
        },
        {
          "id": "012-007",
          "name": "Buuri",
          "wards": [
            { "id": "012-007-001", "name": "Timau" },
            { "id": "012-007-002", "name": "Kisima" },
            { "id": "012-007-003", "name": "Kiirua/Naari" },
            { "id": "012-007-004", "name": "Ruiri/Rwarera" }
          ]
        },
        {
          "id": "012-008",
          "name": "Central Imenti",
          "wards": [
            { "id": "012-008-001", "name": "Mwanganthia" },
            { "id": "012-008-002", "name": "Abothuguchi West" },
            { "id": "012-008-003", "name": "Abothuguchi Central" },
            { "id": "012-008-004", "name": "Kibirichia" }
          ]
        },
        {
          "id": "012-009",
          "name": "South Imenti",
          "wards": [
            { "id": "012-009-001", "name": "Mitunguu" },
            { "id": "012-009-002", "name": "Igoji East" },
            { "id": "012-009-003", "name": "Igoji West" },
            { "id": "012-009-004", "name": "Abogeta East" },
            { "id": "012-009-005", "name": "Abogeta West" },
            { "id": "012-009-006", "name": "Nkuene" }
          ]
        }
      ]
    },
    {
      "id": "013",
      "name": "Tharaka Nithi",
      "constituencies": [
        {
          "id": "013-001",
          "name": "Tharaka",
          "wards": [
            { "id": "013-001-001", "name": "Gatunga" },
            { "id": "013-001-002", "name": "Mukothima" },
            { "id": "013-001-003", "name": "Nkondi" },
            { "id": "013-001-004", "name": "Chiakariga" },
            { "id": "013-001-005", "name": "Marimanti" }
          ]
        },
        {
          "id": "013-002",
          "name": "Chuka/Igambang'ombe",
          "wards": [
            { "id": "013-002-001", "name": "Magumoni" },
            { "id": "013-002-002", "name": "Mugwe" },
            { "id": "013-002-003", "name": "Karingani" },
            { "id": "013-002-004", "name": "Igambang'ombe" }
          ]
        },
        {
          "id": "013-003",
          "name": "Maara",
          "wards": [
            { "id": "013-003-001", "name": "Mitheru" },
            { "id": "013-003-002", "name": "Muthambi" },
            { "id": "013-003-003", "name": "Mwimbi" },
            { "id": "013-003-004", "name": "Ganga" },
            { "id": "013-003-005", "name": "Chogoria" }
          ]
        }
      ]
    }
  ]
  ,
  {
    "id": "014",
    "name": "Embu",
    "constituencies": [
      {
        "id": "014-001",
        "name": "Manyatta",
        "wards": [
          { "id": "014-001-001", "name": "Ruguru/Ngandori" },
          { "id": "014-001-002", "name": "Kithimu" },
          { "id": "014-001-003", "name": "Nginda" },
          { "id": "014-001-004", "name": "Mbeti North" },
          { "id": "014-001-005", "name": "Kirimari" },
          { "id": "014-001-006", "name": "Gaturi South" }
        ]
      },
      {
        "id": "014-002",
        "name": "Runyenjes",
        "wards": [
          { "id": "014-002-001", "name": "Kyeni North" },
          { "id": "014-002-002", "name": "Kyeni South" },
          { "id": "014-002-003", "name": "Central Ward" },
          { "id": "014-002-004", "name": "Kagaari North" },
          { "id": "014-002-005", "name": "Kagaari South" }
        ]
      },
      {
        "id": "014-003",
        "name": "Mbeere North",
        "wards": [
          { "id": "014-003-001", "name": "Nthawa" },
          { "id": "014-003-002", "name": "Muminji" },
          { "id": "014-003-003", "name": "Evurore" }
        ]
      },
      {
        "id": "014-004",
        "name": "Mbeere South",
        "wards": [
          { "id": "014-004-001", "name": "Mavuria" },
          { "id": "014-004-002", "name": "Kiambere" },
          { "id": "014-004-003", "name": "Mwea" },
          { "id": "014-004-004", "name": "Makima" },
          { "id": "014-004-005", "name": "Mbeti South" }
        ]
      }
    ]
  },
  {
    "id": "015",
    "name": "Kitui",
    "constituencies": [
      {
        "id": "015-001",
        "name": "Mwingi North",
        "wards": [
          { "id": "015-001-001", "name": "Ngomeni" },
          { "id": "015-001-002", "name": "Kyuso" },
          { "id": "015-001-003", "name": "Mumoni" },
          { "id": "015-001-004", "name": "Tseikuru" },
          { "id": "015-001-005", "name": "Tharaka" }
        ]
      },
      {
        "id": "015-002",
        "name": "Mwingi West",
        "wards": [
          { "id": "015-002-001", "name": "Kyome/Thaana" },
          { "id": "015-002-002", "name": "Nguutani" },
          { "id": "015-002-003", "name": "Migwani" },
          { "id": "015-002-004", "name": "Kiomo/Kyethani" }
        ]
      },
      {
        "id": "015-003",
        "name": "Mwingi Central",
        "wards": [
          { "id": "015-003-001", "name": "Central" },
          { "id": "015-003-002", "name": "Kivou" },
          { "id": "015-003-003", "name": "Nguni" },
          { "id": "015-003-004", "name": "Nuu" },
          { "id": "015-003-005", "name": "Mui" },
          { "id": "015-003-006", "name": "Waita" }
        ]
      },
      {
        "id": "015-004",
        "name": "Kitui West",
        "wards": [
          { "id": "015-004-001", "name": "Mutonguni" },
          { "id": "015-004-002", "name": "Kauwi" },
          { "id": "015-004-003", "name": "Matinyani" },
          { "id": "015-004-004", "name": "Kwa Mutonga/Kithumula" }
        ]
      },
      {
        "id": "015-005",
        "name": "Kitui Rural",
        "wards": [
          { "id": "015-005-001", "name": "Kisasi" },
          { "id": "015-005-002", "name": "Mbitini" },
          { "id": "015-005-003", "name": "Kwavonza/Yatta" },
          { "id": "015-005-004", "name": "Kanyangi" }
        ]
      },
      {
        "id": "015-006",
        "name": "Kitui Central",
        "wards": [
          { "id": "015-006-001", "name": "Miambani" },
          { "id": "015-006-002", "name": "Township" },
          { "id": "015-006-003", "name": "Kyangwithya West" },
          { "id": "015-006-004", "name": "Mulango" },
          { "id": "015-006-005", "name": "Kyangwithya East" }
        ]
      },
      {
        "id": "015-007",
        "name": "Kitui East",
        "wards": [
          { "id": "015-007-001", "name": "Zombe/Mwitika" },
          { "id": "015-007-002", "name": "Nzambani" },
          { "id": "015-007-003", "name": "Chuluni" },
          { "id": "015-007-004", "name": "Voo/Kyamatu" },
          { "id": "015-007-005", "name": "Endau/Malalani" },
          { "id": "015-007-006", "name": "Mutito/Kaliku" }
        ]
      },
      {
        "id": "015-008",
        "name": "Kitui South",
        "wards": [
          { "id": "015-008-001", "name": "Ikanga/Kyatune" },
          { "id": "015-008-002", "name": "Mutomo" },
          { "id": "015-008-003", "name": "Mutha" },
          { "id": "015-008-004", "name": "Athi" },
          { "id": "015-008-005", "name": "Ikutha" },
          { "id": "015-008-006", "name": "Kanziko" },
          { "id": "015-008-007", "name": "Kibwea" }
        ]
      }
    ]
  }
  ,


  {
    "id": "016",
    "name": "Machakos",
    "constituencies": [
      {
        "id": "016-001",
        "name": "Masinga",
        "wards": [
          { "id": "016-001-001", "name": "Kivaa" },
          { "id": "016-001-002", "name": "Masinga Central" },
          { "id": "016-001-003", "name": "Ekalakala" },
          { "id": "016-001-004", "name": "Muthesya" },
          { "id": "016-001-005", "name": "Ndithini" }
        ]
      },
      {
        "id": "016-002",
        "name": "Yatta",
        "wards": [
          { "id": "016-002-001", "name": "Ndalani" },
          { "id": "016-002-002", "name": "Matuu" },
          { "id": "016-002-003", "name": "Kithimani" },
          { "id": "016-002-004", "name": "Ikomba" },
          { "id": "016-002-005", "name": "Katangi" }
        ]
      },
      {
        "id": "016-003",
        "name": "Kangundo",
        "wards": [
          { "id": "016-003-001", "name": "Kangundo North" },
          { "id": "016-003-002", "name": "Kangundo Central" },
          { "id": "016-003-003", "name": "Kangundo East" },
          { "id": "016-003-004", "name": "Kangundo West" }
        ]
      },
      {
        "id": "016-004",
        "name": "Matungulu",
        "wards": [
          { "id": "016-004-001", "name": "Tala" },
          { "id": "016-004-002", "name": "Matungulu North" },
          { "id": "016-004-003", "name": "Matungulu East" },
          { "id": "016-004-004", "name": "Matungulu West" },
          { "id": "016-004-005", "name": "Kyeleni" }
        ]
      },
      {
        "id": "016-005",
        "name": "Kathiani",
        "wards": [
          { "id": "016-005-001", "name": "Mitaboni" },
          { "id": "016-005-002", "name": "Kathiani Central" },
          { "id": "016-005-003", "name": "Upper Kaewa/Iveti" },
          { "id": "016-005-004", "name": "Lower Kaewa/Kaani" }
        ]
      },
      {
        "id": "016-006",
        "name": "Mavoko",
        "wards": [
          { "id": "016-006-001", "name": "Athi River" },
          { "id": "016-006-002", "name": "Kinanie" },
          { "id": "016-006-003", "name": "Muthwani" },
          { "id": "016-006-004", "name": "Syokimau/Mulolongo" }
        ]
      },
      {
        "id": "016-007",
        "name": "Machakos Town",
        "wards": [
          { "id": "016-007-001", "name": "Kalama" },
          { "id": "016-007-002", "name": "Mua" },
          { "id": "016-007-003", "name": "Mutituni" },
          { "id": "016-007-004", "name": "Machakos Central" },
          { "id": "016-007-005", "name": "Mumbuni North" },
          { "id": "016-007-006", "name": "Muvuti/Kiima-Kimwe" },
          { "id": "016-007-007", "name": "Kola" }
        ]
      },
      {
        "id": "016-008",
        "name": "Mwala",
        "wards": [
          { "id": "016-008-001", "name": "Muthetheni" },
          { "id": "016-008-002", "name": "Wamunyu" },
          { "id": "016-008-003", "name": "Mwala" },
          { "id": "016-008-004", "name": "Masii" },
          { "id": "016-008-005", "name": "Mbiuni" },
          { "id": "016-008-006", "name": "Makutano/Mwala" },
          { "id": "016-008-007", "name": "Kibauni" }
        ]
      }
    ]
  },
  {
    "id": "017",
    "name": "Makueni",
    "constituencies": [
      {
        "id": "017-001",
        "name": "Mbooni",
        "wards": [
          { "id": "017-001-001", "name": "Tulimani" },
          { "id": "017-001-002", "name": "Mbooni" },
          { "id": "017-001-003", "name": "Kithungo/Kitundu" },
          { "id": "017-001-004", "name": "Kiteta/Kisau" },
          { "id": "017-001-005", "name": "Wote" },
          { "id": "017-001-006", "name": "Kalawa" }
        ]
      },
      {
        "id": "017-002",
        "name": "Kilome",
        "wards": [
          { "id": "017-002-001", "name": "Kiima Kiu/Kalanzoni" },
          { "id": "017-002-002", "name": "Kasikeu" },
          { "id": "017-002-003", "name": "Mukaa" }
        ]
      },
      {
        "id": "017-003",
        "name": "Kaiti",
        "wards": [
          { "id": "017-003-001", "name": "Ukia" },
          { "id": "017-003-002", "name": "Kee" },
          { "id": "017-003-003", "name": "Kilungu" },
          { "id": "017-003-004", "name": "Ilima" }
        ]
      },
      {
        "id": "017-004",
        "name": "Makueni",
        "wards": [
          { "id": "017-004-001", "name": "Wote" },
          { "id": "017-004-002", "name": "Muvau/Kikuumini" },
          { "id": "017-004-003", "name": "Mavindini" },
          { "id": "017-004-004", "name": "Kitise/Kithuki" },
          { "id": "017-004-005", "name": "Kathonzweni" },
          { "id": "017-004-006", "name": "Nzaui/Kalamba" },
          { "id": "017-004-007", "name": "Mbitini" }
        ]
      },
      {
        "id": "017-005",
        "name": "Kibwezi West",
        "wards": [
          { "id": "017-005-001", "name": "Makindu" },
          { "id": "017-005-002", "name": "Nguumo" },
          { "id": "017-005-003", "name": "Kikumbulyu North" },
          { "id": "017-005-004", "name": "Kikumbulyu South" },
          { "id": "017-005-005", "name": "Nguu/Masumba" },
          { "id": "017-005-006", "name": "Emali/Mulala" }
        ]
      },
      {
        "id": "017-006",
        "name": "Kibwezi East",
        "wards": [
          { "id": "017-006-001", "name": "Masongaleni" },
          { "id": "017-006-002", "name": "Mtito Andei" },
          { "id": "017-006-003", "name": "Thange" },
          { "id": "017-006-004", "name": "Ivingoni/Nzambani" }
        ]
      }
    ]
  }
  ,

  {
    "id": "018",
    "name": "Nyandarua",
    "constituencies": [
      {
        "id": "018-001",
        "name": "Kinangop",
        "wards": [
          { "id": "018-001-001", "name": "Engineer" },
          { "id": "018-001-002", "name": "Gathara" },
          { "id": "018-001-003", "name": "North Kinangop" },
          { "id": "018-001-004", "name": "Murungaru" },
          { "id": "018-001-005", "name": "Njabini/Kiburu" },
          { "id": "018-001-006", "name": "Nyakio" },
          { "id": "018-001-007", "name": "Githabai" },
          { "id": "018-001-008", "name": "Magumu" }
        ]
      },
      {
        "id": "018-002",
        "name": "Kipipiri",
        "wards": [
          { "id": "018-002-001", "name": "Wanjohi" },
          { "id": "018-002-002", "name": "Kipipiri" },
          { "id": "018-002-003", "name": "Geta" },
          { "id": "018-002-004", "name": "Githioro" }
        ]
      },
      {
        "id": "018-003",
        "name": "Ol Kalou",
        "wards": [
          { "id": "018-003-001", "name": "Karau" },
          { "id": "018-003-002", "name": "Kanjuiri Range" },
          { "id": "018-003-003", "name": "Mirangine" },
          { "id": "018-003-004", "name": "Kaimbaga" },
          { "id": "018-003-005", "name": "Rurii" }
        ]
      },
      {
        "id": "018-004",
        "name": "Ol Jorok",
        "wards": [
          { "id": "018-004-001", "name": "Gathanji" },
          { "id": "018-004-002", "name": "Gatimu" },
          { "id": "018-004-003", "name": "Weru" },
          { "id": "018-004-004", "name": "Charagita" }
        ]
      },
      {
        "id": "018-005",
        "name": "Ndaragwa",
        "wards": [
          { "id": "018-005-001", "name": "Leshau/Pondo" },
          { "id": "018-005-002", "name": "Kiriita" },
          { "id": "018-005-003", "name": "Central" },
          { "id": "018-005-004", "name": "Shamata" }
        ]
      }
    ]
  },
  {
    "id": "019",
    "name": "Nyeri",
    "constituencies": [
      {
        "id": "019-001",
        "name": "Tetu",
        "wards": [
          { "id": "019-001-001", "name": "Dedan Kimathi" },
          { "id": "019-001-002", "name": "Wamagana" },
          { "id": "019-001-003", "name": "Aguthi/Gaaki" }
        ]
      },
      {
        "id": "019-002",
        "name": "Kieni",
        "wards": [
          { "id": "019-002-001", "name": "Mweiga" },
          { "id": "019-002-002", "name": "Naromoru/Kiamathaga" },
          { "id": "019-002-003", "name": "Mwiyogo/Endarasha" },
          { "id": "019-002-004", "name": "Mugunda" },
          { "id": "019-002-005", "name": "Gatarakwa" },
          { "id": "019-002-006", "name": "Thegu River" },
          { "id": "019-002-007", "name": "Kabaru" },
          { "id": "019-002-008", "name": "Gakawa" }
        ]
      },
      {
        "id": "019-003",
        "name": "Mathira",
        "wards": [
          { "id": "019-003-001", "name": "Ruguru" },
          { "id": "019-003-002", "name": "Magutu" },
          { "id": "019-003-003", "name": "Iriaini" },
          { "id": "019-003-004", "name": "Konyu" },
          { "id": "019-003-005", "name": "Kirimukuyu" },
          { "id": "019-003-006", "name": "Karatina Town" }
        ]
      },
      {
        "id": "019-004",
        "name": "Othaya",
        "wards": [
          { "id": "019-004-001", "name": "Mahiga" },
          { "id": "019-004-002", "name": "Iria-ini" },
          { "id": "019-004-003", "name": "Chinga" },
          { "id": "019-004-004", "name": "Karima" }
        ]
      },
      {
        "id": "019-005",
        "name": "Mukurweini",
        "wards": [
          { "id": "019-005-001", "name": "Gikondi" },
          { "id": "019-005-002", "name": "Rugi" },
          { "id": "019-005-003", "name": "Mukurwe-ini West" },
          { "id": "019-005-004", "name": "Mukurwe-ini Central" }
        ]
      },
      {
        "id": "019-006",
        "name": "Nyeri Town",
        "wards": [
          { "id": "019-006-001", "name": "Kiganjo/Mathari" },
          { "id": "019-006-002", "name": "Rware" },
          { "id": "019-006-003", "name": "Gatitu/Muruguru" },
          { "id": "019-006-004", "name": "Ruring’u" },
          { "id": "019-006-005", "name": "Kamakwa/Mukaro" }
        ]
      }
    ]
  }
  ,

  {
    "id": "020",
    "name": "Kirinyaga",
    "constituencies": [
      {
        "id": "020-001",
        "name": "Mwea",
        "wards": [
          { "id": "020-001-001", "name": "Mutithi" },
          { "id": "020-001-002", "name": "Kangai" },
          { "id": "020-001-003", "name": "Thiba" },
          { "id": "020-001-004", "name": "Wamumu" },
          { "id": "020-001-005", "name": "Nyangati" },
          { "id": "020-001-006", "name": "Murinduko" },
          { "id": "020-001-007", "name": "Gathigiriri" },
          { "id": "020-001-008", "name": "Tebere" }
        ]
      },
      {
        "id": "020-002",
        "name": "Gichugu",
        "wards": [
          { "id": "020-002-001", "name": "Kabare" },
          { "id": "020-002-002", "name": "Baragwi" },
          { "id": "020-002-003", "name": "Njukiini" },
          { "id": "020-002-004", "name": "Ngariama" },
          { "id": "020-002-005", "name": "Karumandi" }
        ]
      },
      {
        "id": "020-003",
        "name": "Ndia",
        "wards": [
          { "id": "020-003-001", "name": "Mukure" },
          { "id": "020-003-002", "name": "Kiine" },
          { "id": "020-003-003", "name": "Kariti" }
        ]
      },
      {
        "id": "020-004",
        "name": "Kirinyaga Central",
        "wards": [
          { "id": "020-004-001", "name": "Mutira" },
          { "id": "020-004-002", "name": "Kanyekine" },
          { "id": "020-004-003", "name": "Kerugoya" },
          { "id": "020-004-004", "name": "Inoi" }
        ]
      }
    ]
  },
  {
    "id": "021",
    "name": "Murang’a",
    "constituencies": [
      {
        "id": "021-001",
        "name": "Kangema",
        "wards": [
          { "id": "021-001-001", "name": "Kanyenyaini" },
          { "id": "021-001-002", "name": "Muguru" },
          { "id": "021-001-003", "name": "Rwathia" }
        ]
      },
      {
        "id": "021-002",
        "name": "Mathioya",
        "wards": [
          { "id": "021-002-001", "name": "Gitugi" },
          { "id": "021-002-002", "name": "Kiru" },
          { "id": "021-002-003", "name": "Kamacharia" }
        ]
      },
      {
        "id": "021-003",
        "name": "Kiharu",
        "wards": [
          { "id": "021-003-001", "name": "Wangu" },
          { "id": "021-003-002", "name": "Mugoiri" },
          { "id": "021-003-003", "name": "Mbiri" },
          { "id": "021-003-004", "name": "Township" },
          { "id": "021-003-005", "name": "Murarandia" },
          { "id": "021-003-006", "name": "Gaturi" }
        ]
      },
      {
        "id": "021-004",
        "name": "Kigumo",
        "wards": [
          { "id": "021-004-001", "name": "Kangari" },
          { "id": "021-004-002", "name": "Kigumo" },
          { "id": "021-004-003", "name": "Muthithi" },
          { "id": "021-004-004", "name": "Kinyona" }
        ]
      },
      {
        "id": "021-005",
        "name": "Maragwa",
        "wards": [
          { "id": "021-005-001", "name": "Kimorori/Wempa" },
          { "id": "021-005-002", "name": "Makuyu" },
          { "id": "021-005-003", "name": "Kamahuha" },
          { "id": "021-005-004", "name": "Ichagaki" },
          { "id": "021-005-005", "name": "Nginda" }
        ]
      },
      {
        "id": "021-006",
        "name": "Kandara",
        "wards": [
          { "id": "021-006-001", "name": "Ng’araria" },
          { "id": "021-006-002", "name": "Muruka" },
          { "id": "021-006-003", "name": "Kagundu-Ini" },
          { "id": "021-006-004", "name": "Gaichanjiru" },
          { "id": "021-006-005", "name": "Ithiru" },
          { "id": "021-006-006", "name": "Ruchu" }
        ]
      },
      {
        "id": "021-007",
        "name": "Gatanga",
        "wards": [
          { "id": "021-007-001", "name": "Ithanga" },
          { "id": "021-007-002", "name": "Kakuzi/Mitubiri" },
          { "id": "021-007-003", "name": "Mugumo-ini" },
          { "id": "021-007-004", "name": "Kihumbu-ini" },
          { "id": "021-007-005", "name": "Gatanga" },
          { "id": "021-007-006", "name": "Kariara" }
        ]
      }
    ]
  },
  {
    "id": "022",
    "name": "Kiambu",
    "constituencies": [
      {
        "id": "022-001",
        "name": "Gatundu South",
        "wards": [
          { "id": "022-001-001", "name": "Kiamwangi" },
          { "id": "022-001-002", "name": "Kiganjo" },
          { "id": "022-001-003", "name": "Ndarugu" },
          { "id": "022-001-004", "name": "Ngenda" }
        ]
      },
      {
        "id": "022-002",
        "name": "Gatundu North",
        "wards": [
          { "id": "022-002-001", "name": "Gituamba" },
          { "id": "022-002-002", "name": "Githobokoni" },
          { "id": "022-002-003", "name": "Chania" },
          { "id": "022-002-004", "name": "Mang’u" }
        ]
      },
      {
        "id": "022-003",
        "name": "Juja",
        "wards": [
          { "id": "022-003-001", "name": "Murera" },
          { "id": "022-003-002", "name": "Theta" },
          { "id": "022-003-003", "name": "Juja" },
          { "id": "022-003-004", "name": "Witeithie" },
          { "id": "022-003-005", "name": "Kalimoni" }
        ]
      },
      {
        "id": "022-004",
        "name": "Thika Town",
        "wards": [
          { "id": "022-004-001", "name": "Township" },
          { "id": "022-004-002", "name": "Kamenu" },
          { "id": "022-004-003", "name": "Hospital" },
          { "id": "022-004-004", "name": "Gatuanyaga" },
          { "id": "022-004-005", "name": "Ngoliba" }
        ]
      },
      {
        "id": "022-005",
        "name": "Ruiru",
        "wards": [
          { "id": "022-005-001", "name": "Gitothua" },
          { "id": "022-005-002", "name": "Biashara" },
          { "id": "022-005-003", "name": "Gatongora" },
          { "id": "022-005-004", "name": "Kahawa Sukari" },
          { "id": "022-005-005", "name": "Kahawa Wendani" },
          { "id": "022-005-006", "name": "Kiuu" },
          { "id": "022-005-007", "name": "Mwiki" },
          { "id": "022-005-008", "name": "Mwihoko" }
        ]
      },
      {
        "id": "022-006",
        "name": "Githunguri",
        "wards": [
          { "id": "022-006-001", "name": "Githunguri" },
          { "id": "022-006-002", "name": "Githiga" },
          { "id": "022-006-003", "name": "Ikinu" },
          { "id": "022-006-004", "name": "Ngewa" },
          { "id": "022-006-005", "name": "Komothai" }
        ]
      },
      {
        "id": "022-007",
        "name": "Kiambu",
        "wards": [
          { "id": "022-007-001", "name": "Ting’ang’a" },
          { "id": "022-007-002", "name": "Ndumberi" },
          { "id": "022-007-003", "name": "Riabai" },
          { "id": "022-007-004", "name": "Township" }
        ]
      },
      {
        "id": "022-008",
        "name": "Kiambaa",
        "wards": [
          { "id": "022-008-001", "name": "Cianda" },
          { "id": "022-008-002", "name": "Karuri" },
          { "id": "022-008-003", "name": "Ndenderu" },
          { "id": "022-008-004", "name": "Muchatha" },
          { "id": "022-008-005", "name": "Kihara" }
        ]
      },
      {
        "id": "022-009",
        "name": "Kabete",
        "wards": [
          { "id": "022-009-001", "name": "Gitaru" },
          { "id": "022-009-002", "name": "Muguga" },
          { "id": "022-009-003", "name": "Nyadhuna" },
          { "id": "022-009-004", "name": "Kabete" },
          { "id": "022-009-005", "name": "Uthiru" }
        ]
      },
      {
        "id": "022-010",
        "name": "Kikuyu",
        "wards": [
          { "id": "022-010-001", "name": "Karai" },
          { "id": "022-010-002", "name": "Nachu" },
          { "id": "022-010-003", "name": "Sigona" },
          { "id": "022-010-004", "name": "Kikuyu" },
          { "id": "022-010-005", "name": "Kinoo" }
        ]
      },
      {
        "id": "022-011",
        "name": "Limuru",
        "wards": [
          { "id": "022-011-001", "name": "Bibirioni" },
          { "id": "022-011-002", "name": "Limuru Central" },
          { "id": "022-011-003", "name": "Ndeiya" },
          { "id": "022-011-004", "name": "Limuru East" },
          { "id": "022-011-005", "name": "Ngecha Tigoni" }
        ]
      },
      {
        "id": "022-012",
        "name": "Lari",
        "wards": [
          { "id": "022-012-001", "name": "Kamburu" },
          { "id": "022-012-002", "name": "Kinale" },
          { "id": "022-012-003", "name": "Kijabe" },
          { "id": "022-012-004", "name": "Nyanduma" },
          { "id": "022-012-005", "name": "Kambaa" }
        ]
      }
    ]
  },


  {
    "id": "023",
    "name": "Turkana",
    "constituencies": [
      {
        "id": "023-001",
        "name": "Turkana North",
        "wards": [
          { "id": "023-001-001", "name": "Kaeris" },
          { "id": "023-001-002", "name": "Lake Zone" },
          { "id": "023-001-003", "name": "Lapur" },
          { "id": "023-001-004", "name": "Kaaleng/Kaikor" },
          { "id": "023-001-005", "name": "Kibish" },
          { "id": "023-001-006", "name": "Nakalale" }
        ]
      },
      {
        "id": "023-002",
        "name": "Turkana West",
        "wards": [
          { "id": "023-002-001", "name": "Kakuma" },
          { "id": "023-002-002", "name": "Lopur" },
          { "id": "023-002-003", "name": "Letea" },
          { "id": "023-002-004", "name": "Songot" },
          { "id": "023-002-005", "name": "Kalobeyei" },
          { "id": "023-002-006", "name": "Lokichoggio" },
          { "id": "023-002-007", "name": "Nanaam" }
        ]
      },
      {
        "id": "023-003",
        "name": "Turkana Central",
        "wards": [
          { "id": "023-003-001", "name": "Kerio Delta" },
          { "id": "023-003-002", "name": "Kang’atotha" },
          { "id": "023-003-003", "name": "Kalokol" },
          { "id": "023-003-004", "name": "Lodwar Township" },
          { "id": "023-003-005", "name": "Kanamkemer" }
        ]
      },
      {
        "id": "023-004",
        "name": "Loima",
        "wards": [
          { "id": "023-004-001", "name": "Lokiriama/Lorengippi" },
          { "id": "023-004-002", "name": "Lobokat" },
          { "id": "023-004-003", "name": "Loima" },
          { "id": "023-004-004", "name": "Turkwel" },
          { "id": "023-004-005", "name": "Nabwal" }
        ]
      },
      {
        "id": "023-005",
        "name": "Turkana South",
        "wards": [
          { "id": "023-005-001", "name": "Kaputir" },
          { "id": "023-005-002", "name": "Katilu" },
          { "id": "023-005-003", "name": "Lobokat" },
          { "id": "023-005-004", "name": "Kalapata" },
          { "id": "023-005-005", "name": "Lokichar" }
        ]
      },
      {
        "id": "023-006",
        "name": "Turkana East",
        "wards": [
          { "id": "023-006-001", "name": "Katilia" },
          { "id": "023-006-002", "name": "Lokori/Kochodin" },
          { "id": "023-006-003", "name": "Kapedo/Napeitom" },
          { "id": "023-006-004", "name": "Lokwamosing" }
        ]
      }
    ]
  },
  {
    "id": "024",
    "name": "West Pokot",
    "constituencies": [
      {
        "id": "024-001",
        "name": "Kapenguria",
        "wards": [
          { "id": "024-001-001", "name": "Riwo" },
          { "id": "024-001-002", "name": "Kapenguria" },
          { "id": "024-001-003", "name": "Mnagei" },
          { "id": "024-001-004", "name": "Siyoi" },
          { "id": "024-001-005", "name": "Endugh" },
          { "id": "024-001-006", "name": "Sook" }
        ]
      },
      {
        "id": "024-002",
        "name": "Sigor",
        "wards": [
          { "id": "024-002-001", "name": "Sekerr" },
          { "id": "024-002-002", "name": "Masool" },
          { "id": "024-002-003", "name": "Lelan" },
          { "id": "024-002-004", "name": "Siyoi" }
        ]
      },
      {
        "id": "024-003",
        "name": "Kacheliba",
        "wards": [
          { "id": "024-003-001", "name": "Suam" },
          { "id": "024-003-002", "name": "Kodich" },
          { "id": "024-003-003", "name": "Kasei" },
          { "id": "024-003-004", "name": "Kapchok" },
          { "id": "024-003-005", "name": "Kiwawa" },
          { "id": "024-003-006", "name": "Alale" }
        ]
      },
      {
        "id": "024-004",
        "name": "Pokot South",
        "wards": [
          { "id": "024-004-001", "name": "Chepareria" },
          { "id": "024-004-002", "name": "Batei" },
          { "id": "024-004-003", "name": "Lelan" },
          { "id": "024-004-004", "name": "Tapach" }
        ]
      }
    ]
  },
  {
    "id": "025",
    "name": "Samburu",
    "constituencies": [
      {
        "id": "025-001",
        "name": "Samburu West",
        "wards": [
          { "id": "025-001-001", "name": "Lodokejek" },
          { "id": "025-001-002", "name": "Suguta Marmar" },
          { "id": "025-001-003", "name": "Maralal" },
          { "id": "025-001-004", "name": "Loosuk" },
          { "id": "025-001-005", "name": "Poro" }
        ]
      },
      {
        "id": "025-002",
        "name": "Samburu North",
        "wards": [
          { "id": "025-002-001", "name": "El-Barta" },
          { "id": "025-002-002", "name": "Nachola" },
          { "id": "025-002-003", "name": "Ndoto" },
          { "id": "025-002-004", "name": "Nyiro" },
          { "id": "025-002-005", "name": "Angata Nanyokie" },
          { "id": "025-002-006", "name": "Baawa" }
        ]
      },
      {
        "id": "025-003",
        "name": "Samburu East",
        "wards": [
          { "id": "025-003-001", "name": "Waso" },
          { "id": "025-003-002", "name": "Wamba West" },
          { "id": "025-003-003", "name": "Wamba East" },
          { "id": "025-003-004", "name": "Wamba North" }
        ]
      }
    ]
  }
  ,

  {
    "id": "026",
    "name": "Trans Nzoia",
    "constituencies": [
      {
        "id": "026-001",
        "name": "Kwanza",
        "wards": [
          { "id": "026-001-001", "name": "Kapomboi" },
          { "id": "026-001-002", "name": "Kwanza" },
          { "id": "026-001-003", "name": "Keiyo" },
          { "id": "026-001-004", "name": "Bidii" }
        ]
      },
      {
        "id": "026-002",
        "name": "Endebess",
        "wards": [
          { "id": "026-002-001", "name": "Chepchoina" },
          { "id": "026-002-002", "name": "Endebess" },
          { "id": "026-002-003", "name": "Matumbei" }
        ]
      },
      {
        "id": "026-003",
        "name": "Saboti",
        "wards": [
          { "id": "026-003-001", "name": "Matisi" },
          { "id": "026-003-002", "name": "Tuwani" },
          { "id": "026-003-003", "name": "Saboti" },
          { "id": "026-003-004", "name": "Machewa" },
          { "id": "026-003-005", "name": "Matisi" }
        ]
      },
      {
        "id": "026-004",
        "name": "Kiminini",
        "wards": [
          { "id": "026-004-001", "name": "Kiminini" },
          { "id": "026-004-002", "name": "Waitaluk" },
          { "id": "026-004-003", "name": "Sirende" },
          { "id": "026-004-004", "name": "Hospital" },
          { "id": "026-004-005", "name": "Sikhendu" },
          { "id": "026-004-006", "name": "Nabiswa" }
        ]
      },
      {
        "id": "026-005",
        "name": "Cherangany",
        "wards": [
          { "id": "026-005-001", "name": "Sitatunga" },
          { "id": "026-005-002", "name": "Makutano" },
          { "id": "026-005-003", "name": "Kaplamai" },
          { "id": "026-005-004", "name": "Motosiet" },
          { "id": "026-005-005", "name": "Cherangany/Suwerwa" },
          { "id": "026-005-006", "name": "Sinyerere" },
          { "id": "026-005-007", "name": "Makutano" }
        ]
      }
    ]
  },
  {
    "id": "027",
    "name": "Uasin Gishu",
    "constituencies": [
      {
        "id": "027-001",
        "name": "Soy",
        "wards": [
          { "id": "027-001-001", "name": "Moi’s Bridge" },
          { "id": "027-001-002", "name": "Kapkures" },
          { "id": "027-001-003", "name": "Ziwa" },
          { "id": "027-001-004", "name": "Segero/Barsombe" },
          { "id": "027-001-005", "name": "Kipsomba" },
          { "id": "027-001-006", "name": "Soy" },
          { "id": "027-001-007", "name": "Kuinet/Kapsuswa" }
        ]
      },
      {
        "id": "027-002",
        "name": "Turbo",
        "wards": [
          { "id": "027-002-001", "name": "Ngenyilel" },
          { "id": "027-002-002", "name": "Tapsagoi" },
          { "id": "027-002-003", "name": "Kamagut" },
          { "id": "027-002-004", "name": "Kiplombe" },
          { "id": "027-002-005", "name": "Megun" },
          { "id": "027-002-006", "name": "Kapsaos" }
        ]
      },
      {
        "id": "027-003",
        "name": "Moiben",
        "wards": [
          { "id": "027-003-001", "name": "Tembelio" },
          { "id": "027-003-002", "name": "Sergoit" },
          { "id": "027-003-003", "name": "Karuna/Meibeki" },
          { "id": "027-003-004", "name": "Moiben" },
          { "id": "027-003-005", "name": "Kimumu" }
        ]
      },
      {
        "id": "027-004",
        "name": "Ainabkoi",
        "wards": [
          { "id": "027-004-001", "name": "Kapsoya" },
          { "id": "027-004-002", "name": "Kaptagat" },
          { "id": "027-004-003", "name": "Ainabkoi/Olare" }
        ]
      },
      {
        "id": "027-005",
        "name": "Kapseret",
        "wards": [
          { "id": "027-005-001", "name": "Simat/Kapseret" },
          { "id": "027-005-002", "name": "Megun" },
          { "id": "027-005-003", "name": "Ngeria" },
          { "id": "027-005-004", "name": "Langas" },
          { "id": "027-005-005", "name": "Kipkenyo" }
        ]
      },
      {
        "id": "027-006",
        "name": "Kesses",
        "wards": [
          { "id": "027-006-001", "name": "Racecourse" },
          { "id": "027-006-002", "name": "Cheptiret/Kipchamo" },
          { "id": "027-006-003", "name": "Tulwet/Chuiyat" },
          { "id": "027-006-004", "name": "Tarakwa" }
        ]
      }
    ]
  },
  {
    "id": "028",
    "name": "Elgeyo Marakwet",
    "constituencies": [
      {
        "id": "028-001",
        "name": "Marakwet East",
        "wards": [
          { "id": "028-001-001", "name": "Kapyego" },
          { "id": "028-001-002", "name": "Sambirir" },
          { "id": "028-001-003", "name": "Endo" },
          { "id": "028-001-004", "name": "Embobut/Embolot" }
        ]
      },
      {
        "id": "028-002",
        "name": "Marakwet West",
        "wards": [
          { "id": "028-002-001", "name": "Lelan" },
          { "id": "028-002-002", "name": "Sengwer" },
          { "id": "028-002-003", "name": "Cherangany/Chebororwa" },
          { "id": "028-002-004", "name": "Moiben/Kuserwo" },
          { "id": "028-002-005", "name": "Kapsowar" },
          { "id": "028-002-006", "name": "Arror" }
        ]
      },
      {
        "id": "028-003",
        "name": "Keiyo North",
        "wards": [
          { "id": "028-003-001", "name": "Emsoo" },
          { "id": "028-003-002", "name": "Kamariny" },
          { "id": "028-003-003", "name": "Kapchemutwa" },
          { "id": "028-003-004", "name": "Tambach" }
        ]
      },
      {
        "id": "028-004",
        "name": "Keiyo South",
        "wards": [
          { "id": "028-004-001", "name": "Kaptarakwa" },
          { "id": "028-004-002", "name": "Chepkorio" },
          { "id": "028-004-003", "name": "Soy North" },
          { "id": "028-004-004", "name": "Soy South" },
          { "id": "028-004-005", "name": "Metkei" }
        ]
      }
    ]
  }
  ,


  {
    "id": "029",
    "name": "Nandi",
    "constituencies": [
      {
        "id": "029-001",
        "name": "Tinderet",
        "wards": [
          { "id": "029-001-001", "name": "Songhor/Soba" },
          { "id": "029-001-002", "name": "Tindiret" },
          { "id": "029-001-003", "name": "Chemelil/Chemase" },
          { "id": "029-001-004", "name": "Kapsimotwo" }
        ]
      },
      {
        "id": "029-002",
        "name": "Aldai",
        "wards": [
          { "id": "029-002-001", "name": "Kabwareng" },
          { "id": "029-002-002", "name": "Kaptumo-Kaboi" },
          { "id": "029-002-003", "name": "Kobujoi" },
          { "id": "029-002-004", "name": "Koyo-Ndurio" },
          { "id": "029-002-005", "name": "Kemeloi-Maraba" }
        ]
      },
      {
        "id": "029-003",
        "name": "Nandi Hills",
        "wards": [
          { "id": "029-003-001", "name": "Nandi Hills" },
          { "id": "029-003-002", "name": "Chepkunyuk" },
          { "id": "029-003-003", "name": "Ol'lessos" },
          { "id": "029-003-004", "name": "Kapchorua" }
        ]
      },
      {
        "id": "029-004",
        "name": "Chesumei",
        "wards": [
          { "id": "029-004-001", "name": "Chemundu/Kapng’etuny" },
          { "id": "029-004-002", "name": "Kosirai" },
          { "id": "029-004-003", "name": "Lelmokwo/Ngechek" },
          { "id": "029-004-004", "name": "Kaptel/Kamoiywo" },
          { "id": "029-004-005", "name": "Kiptuya" }
        ]
      },
      {
        "id": "029-005",
        "name": "Emgwen",
        "wards": [
          { "id": "029-005-001", "name": "Chepkumia" },
          { "id": "029-005-002", "name": "Kapkangani" },
          { "id": "029-005-003", "name": "Kapsabet" },
          { "id": "029-005-004", "name": "Kilibwoni" }
        ]
      },
      {
        "id": "029-006",
        "name": "Mosop",
        "wards": [
          { "id": "029-006-001", "name": "Chepterwai" },
          { "id": "029-006-002", "name": "Kipkaren" },
          { "id": "029-006-003", "name": "Kurgung/Surungai" },
          { "id": "029-006-004", "name": "Kabiyet" },
          { "id": "029-006-005", "name": "Ndalat" },
          { "id": "029-006-006", "name": "Kabisaga" },
          { "id": "029-006-007", "name": "Sangalo/Kebulonik" }
        ]
      }
    ]
  },
  {
    "id": "030",
    "name": "Baringo",
    "constituencies": [
      {
        "id": "030-001",
        "name": "Tiaty",
        "wards": [
          { "id": "030-001-001", "name": "Tirioko" },
          { "id": "030-001-002", "name": "Kolowa" },
          { "id": "030-001-003", "name": "Ribkwo" },
          { "id": "030-001-004", "name": "Silale" },
          { "id": "030-001-005", "name": "Loiyamorock" },
          { "id": "030-001-006", "name": "Tangulbei/Korossi" },
          { "id": "030-001-007", "name": "Churo/Amaya" }
        ]
      },
      {
        "id": "030-002",
        "name": "Baringo North",
        "wards": [
          { "id": "030-002-001", "name": "Barwessa" },
          { "id": "030-002-002", "name": "Kabartonjo" },
          { "id": "030-002-003", "name": "Saimo/Kipsaraman" },
          { "id": "030-002-004", "name": "Saimo/Soi" },
          { "id": "030-002-005", "name": "Bartabwa" }
        ]
      },
      {
        "id": "030-003",
        "name": "Baringo Central",
        "wards": [
          { "id": "030-003-001", "name": "Kabarnet" },
          { "id": "030-003-002", "name": "Sacho" },
          { "id": "030-003-003", "name": "Tenges" },
          { "id": "030-003-004", "name": "Ewalel/Chapchap" },
          { "id": "030-003-005", "name": "Kapropita" }
        ]
      },
      {
        "id": "030-004",
        "name": "Baringo South",
        "wards": [
          { "id": "030-004-001", "name": "Marigat" },
          { "id": "030-004-002", "name": "Ilchamus" },
          { "id": "030-004-003", "name": "Mochongoi" },
          { "id": "030-004-004", "name": "Mukutani" }
        ]
      },
      {
        "id": "030-005",
        "name": "Mogotio",
        "wards": [
          { "id": "030-005-001", "name": "Mogotio" },
          { "id": "030-005-002", "name": "Emining" },
          { "id": "030-005-003", "name": "Kisanana" }
        ]
      },
      {
        "id": "030-006",
        "name": "Eldama Ravine",
        "wards": [
          { "id": "030-006-001", "name": "Lembus" },
          { "id": "030-006-002", "name": "Lembus Kwen" },
          { "id": "030-006-003", "name": "Ravine" },
          { "id": "030-006-004", "name": "Mumberes/Maji Mazuri" },
          { "id": "030-006-005", "name": "Lembus/Perkerra" },
          { "id": "030-006-006", "name": "Koibatek" }
        ]
      }
    ]
  }
  ,

  {
    "id": "031",
    "name": "Laikipia",
    "constituencies": [
      {
        "id": "031-001",
        "name": "Laikipia West",
        "wards": [
          { "id": "031-001-001", "name": "Ol-Moran" },
          { "id": "031-001-002", "name": "Rumuruti Township" },
          { "id": "031-001-003", "name": "Githiga" },
          { "id": "031-001-004", "name": "Marmanet" },
          { "id": "031-001-005", "name": "Igwamiti" }
        ]
      },
      {
        "id": "031-002",
        "name": "Laikipia East",
        "wards": [
          { "id": "031-002-001", "name": "Ngobit" },
          { "id": "031-002-002", "name": "Tigithi" },
          { "id": "031-002-003", "name": "Thingithu" },
          { "id": "031-002-004", "name": "Nanyuki" },
          { "id": "031-002-005", "name": "Umande" }
        ]
      },
      {
        "id": "031-003",
        "name": "Laikipia North",
        "wards": [
          { "id": "031-003-001", "name": "Sosian" },
          { "id": "031-003-002", "name": "Segera" },
          { "id": "031-003-003", "name": "Mugogodo West" },
          { "id": "031-003-004", "name": "Mugogodo East" }
        ]
      }
    ]
  },
  {
    "id": "032",
    "name": "Nakuru",
    "constituencies": [
      {
        "id": "032-001",
        "name": "Molo",
        "wards": [
          { "id": "032-001-001", "name": "Mariashoni" },
          { "id": "032-001-002", "name": "Elburgon" },
          { "id": "032-001-003", "name": "Turi" },
          { "id": "032-001-004", "name": "Molo" }
        ]
      },
      {
        "id": "032-002",
        "name": "Njoro",
        "wards": [
          { "id": "032-002-001", "name": "Mauche" },
          { "id": "032-002-002", "name": "Kihingo" },
          { "id": "032-002-003", "name": "Nessuit" },
          { "id": "032-002-004", "name": "Lare" },
          { "id": "032-002-005", "name": "Njoro" }
        ]
      },
      {
        "id": "032-003",
        "name": "Naivasha",
        "wards": [
          { "id": "032-003-001", "name": "Biashara" },
          { "id": "032-003-002", "name": "Hells Gate" },
          { "id": "032-003-003", "name": "Lake View" },
          { "id": "032-003-004", "name": "Mai Mahiu" },
          { "id": "032-003-005", "name": "Maiella" },
          { "id": "032-003-006", "name": "Olkaria" },
          { "id": "032-003-007", "name": "Viwandani" }
        ]
      },
      {
        "id": "032-004",
        "name": "Gilgil",
        "wards": [
          { "id": "032-004-001", "name": "Gilgil" },
          { "id": "032-004-002", "name": "Elementaita" },
          { "id": "032-004-003", "name": "Mbaruk/Eburu" },
          { "id": "032-004-004", "name": "Malewa West" },
          { "id": "032-004-005", "name": "Murindati" }
        ]
      },
      {
        "id": "032-005",
        "name": "Kuresoi South",
        "wards": [
          { "id": "032-005-001", "name": "Amalo" },
          { "id": "032-005-002", "name": "Keringet" },
          { "id": "032-005-003", "name": "Kiptagich" },
          { "id": "032-005-004", "name": "Tinet" }
        ]
      },
      {
        "id": "032-006",
        "name": "Kuresoi North",
        "wards": [
          { "id": "032-006-001", "name": "Kiptororo" },
          { "id": "032-006-002", "name": "Nyota" },
          { "id": "032-006-003", "name": "Sirikwa" },
          { "id": "032-006-004", "name": "Kamara" }
        ]
      },
      {
        "id": "032-007",
        "name": "Subukia",
        "wards": [
          { "id": "032-007-001", "name": "Subukia" },
          { "id": "032-007-002", "name": "Waseges" },
          { "id": "032-007-003", "name": "Kabazi" }
        ]
      },
      {
        "id": "032-008",
        "name": "Rongai",
        "wards": [
          { "id": "032-008-001", "name": "Menengai West" },
          { "id": "032-008-002", "name": "Soilo" },
          { "id": "032-008-003", "name": "Visoi" },
          { "id": "032-008-004", "name": "Mosop" },
          { "id": "032-008-005", "name": "Soin" }
        ]
      },
      {
        "id": "032-009",
        "name": "Bahati",
        "wards": [
          { "id": "032-009-001", "name": "Dundori" },
          { "id": "032-009-002", "name": "Kabatini" },
          { "id": "032-009-003", "name": "Kiamaina" },
          { "id": "032-009-004", "name": "Lanet/Umoja" },
          { "id": "032-009-005", "name": "Bahati" }
        ]
      },
      {
        "id": "032-010",
        "name": "Nakuru Town West",
        "wards": [
          { "id": "032-010-001", "name": "Barut" },
          { "id": "032-010-002", "name": "London" },
          { "id": "032-010-003", "name": "Kaptembwo" },
          { "id": "032-010-004", "name": "Rhoda" },
          { "id": "032-010-005", "name": "Shaabab" }
        ]
      },
      {
        "id": "032-011",
        "name": "Nakuru Town East",
        "wards": [
          { "id": "032-011-001", "name": "Biashara" },
          { "id": "032-011-002", "name": "Kivumbini" },
          { "id": "032-011-003", "name": "Flamingo" },
          { "id": "032-011-004", "name": "Menengai" },
          { "id": "032-011-005", "name": "Nakuru East" }
        ]
      }
    ]
  },
  {
    "id": "033",
    "name": "Narok",
    "constituencies": [
      {
        "id": "033-001",
        "name": "Kilgoris",
        "wards": [
          { "id": "033-001-001", "name": "Kilgoris Central" },
          { "id": "033-001-002", "name": "Keyian" },
          { "id": "033-001-003", "name": "Angata Barikoi" },
          { "id": "033-001-004", "name": "Shankoe" },
          { "id": "033-001-005", "name": "Kimintet" },
          { "id": "033-001-006", "name": "Lolgorian" }
        ]
      },
      {
        "id": "033-002",
        "name": "Emurua Dikirr",
        "wards": [
          { "id": "033-002-001", "name": "Ilkerin" },
          { "id": "033-002-002", "name": "Ololmasani" },
          { "id": "033-002-003", "name": "Mogondo" },
          { "id": "033-002-004", "name": "Kapsasian" }
        ]
      },
      {
        "id": "033-003",
        "name": "Narok North",
        "wards": [
          { "id": "033-003-001", "name": "Olposimoru" },
          { "id": "033-003-002", "name": "Olokurto" },
          { "id": "033-003-003", "name": "Narok Town" },
          { "id": "033-003-004", "name": "Nkareta" },
          { "id": "033-003-005", "name": "Olorropil" },
          { "id": "033-003-006", "name": "Melili" }
        ]
      },
      {
        "id": "033-004",
        "name": "Narok East",
        "wards": [
          { "id": "033-004-001", "name": "Mosiro" },
          { "id": "033-004-002", "name": "Ildamat" },
          { "id": "033-004-003", "name": "Keekonyokie" },
          { "id": "033-004-004", "name": "Suswa" }
        ]
      },
      {
        "id": "033-005",
        "name": "Narok South",
        "wards": [
          { "id": "033-005-001", "name": "Majimoto/Naroosura" },
          { "id": "033-005-002", "name": "Ololulung’a" },
          { "id": "033-005-003", "name": "Melelo" },
          { "id": "033-005-004", "name": "Loita" },
          { "id": "033-005-005", "name": "Sogoo" },
          { "id": "033-005-006", "name": "Sagambe" }
        ]
      },
      {
        "id": "033-006",
        "name": "Narok West",
        "wards": [
          { "id": "033-006-001", "name": "Ilmotiok" },
          { "id": "033-006-002", "name": "Mara" },
          { "id": "033-006-003", "name": "Siana" },
          { "id": "033-006-004", "name": "Naikarra" }
        ]
      }
    ]
  },

  {
    "id": "034",
    "name": "Kajiado",
    "constituencies": [
      {
        "id": "034-001",
        "name": "Kajiado North",
        "wards": [
          { "id": "034-001-001", "name": "Ongata Rongai" },
          { "id": "034-001-002", "name": "Nkaimurunya" },
          { "id": "034-001-003", "name": "Oloolua" },
          { "id": "034-001-004", "name": "Ngong" },
          { "id": "034-001-005", "name": "Olkeri" }
        ]
      },
      {
        "id": "034-002",
        "name": "Kajiado Central",
        "wards": [
          { "id": "034-002-001", "name": "Purko" },
          { "id": "034-002-002", "name": "Ildamat" },
          { "id": "034-002-003", "name": "Dalalekutuk" },
          { "id": "034-002-004", "name": "Matapato North" },
          { "id": "034-002-005", "name": "Matapato South" }
        ]
      },
      {
        "id": "034-003",
        "name": "Kajiado East",
        "wards": [
          { "id": "034-003-001", "name": "Kaputiei North" },
          { "id": "034-003-002", "name": "Kitengela" },
          { "id": "034-003-003", "name": "Oloosirkon/Sholinke" },
          { "id": "034-003-004", "name": "Kenyawa-Poka" },
          { "id": "034-003-005", "name": "Imaroro" }
        ]
      },
      {
        "id": "034-004",
        "name": "Kajiado West",
        "wards": [
          { "id": "034-004-001", "name": "Keekonyokie" },
          { "id": "034-004-002", "name": "Iloodokilani" },
          { "id": "034-004-003", "name": "Magadi" },
          { "id": "034-004-004", "name": "Ewuaso Oonkidong’i" },
          { "id": "034-004-005", "name": "Mosiro" }
        ]
      },
      {
        "id": "034-005",
        "name": "Kajiado South",
        "wards": [
          { "id": "034-005-001", "name": "Entonet/Lenkism" },
          { "id": "034-005-002", "name": "Kimana" },
          { "id": "034-005-003", "name": "Kenyewa" },
          { "id": "034-005-004", "name": "Rombo" },
          { "id": "034-005-005", "name": "Kuku" }
        ]
      }
    ]
  },
  {
    "id": "035",
    "name": "Kericho",
    "constituencies": [
      {
        "id": "035-001",
        "name": "Kipkelion East",
        "wards": [
          { "id": "035-001-001", "name": "Tendeno/Sorget" },
          { "id": "035-001-002", "name": "Londiani" },
          { "id": "035-001-003", "name": "Kedowa/Kimugul" },
          { "id": "035-001-004", "name": "Chepseon" }
        ]
      },
      {
        "id": "035-002",
        "name": "Kipkelion West",
        "wards": [
          { "id": "035-002-001", "name": "Kunyak" },
          { "id": "035-002-002", "name": "Kamasian" },
          { "id": "035-002-003", "name": "Kipkelion" },
          { "id": "035-002-004", "name": "Chilchila" }
        ]
      },
      {
        "id": "035-003",
        "name": "Ainamoi",
        "wards": [
          { "id": "035-003-001", "name": "Kapsoit" },
          { "id": "035-003-002", "name": "Ainamoi" },
          { "id": "035-003-003", "name": "Kapkugerwet" },
          { "id": "035-003-004", "name": "Kipchebor" },
          { "id": "035-003-005", "name": "Kipchimchim" },
          { "id": "035-003-006", "name": "Kapsaos" }
        ]
      },
      {
        "id": "035-004",
        "name": "Bureti",
        "wards": [
          { "id": "035-004-001", "name": "Kisiara" },
          { "id": "035-004-002", "name": "Tebesonik" },
          { "id": "035-004-003", "name": "Cheboin" },
          { "id": "035-004-004", "name": "Litein" },
          { "id": "035-004-005", "name": "Cheplanget" },
          { "id": "035-004-006", "name": "Kapkatet" }
        ]
      },
      {
        "id": "035-005",
        "name": "Belgut",
        "wards": [
          { "id": "035-005-001", "name": "Waldai" },
          { "id": "035-005-002", "name": "Kabianga" },
          { "id": "035-005-003", "name": "Cheptororiet/Seretut" },
          { "id": "035-005-004", "name": "Chaik" }
        ]
      },
      {
        "id": "035-006",
        "name": "Sigowet/Soin",
        "wards": [
          { "id": "035-006-001", "name": "Sigowet" },
          { "id": "035-006-002", "name": "Kaplelartet" },
          { "id": "035-006-003", "name": "Soliat" },
          { "id": "035-006-004", "name": "Soin" }
        ]
      }
    ]
  },
  {
    "id": "036",
    "name": "Bomet",
    "constituencies": [
      {
        "id": "036-001",
        "name": "Sotik",
        "wards": [
          { "id": "036-001-001", "name": "Ndanai/Abosi" },
          { "id": "036-001-002", "name": "Chemagel" },
          { "id": "036-001-003", "name": "Kipsonoi" },
          { "id": "036-001-004", "name": "Manaret/Bargetuny" },
          { "id": "036-001-005", "name": "Kapletundo" }
        ]
      },
      {
        "id": "036-002",
        "name": "Chepalungu",
        "wards": [
          { "id": "036-002-001", "name": "Nyangores" },
          { "id": "036-002-002", "name": "Sigor" },
          { "id": "036-002-003", "name": "Chebunyo" },
          { "id": "036-002-004", "name": "Siongiroi" }
        ]
      },
      {
        "id": "036-003",
        "name": "Bomet East",
        "wards": [
          { "id": "036-003-001", "name": "Merigi" },
          { "id": "036-003-002", "name": "Kembu" },
          { "id": "036-003-003", "name": "Longisa" },
          { "id": "036-003-004", "name": "Kipreres" },
          { "id": "036-003-005", "name": "Chemaner" }
        ]
      },
      {
        "id": "036-004",
        "name": "Bomet Central",
        "wards": [
          { "id": "036-004-001", "name": "Silibwet Township" },
          { "id": "036-004-002", "name": "Ndaraweta" },
          { "id": "036-004-003", "name": "Singorwet" },
          { "id": "036-004-004", "name": "Chesoen" },
          { "id": "036-004-005", "name": "Mutarakwa" }
        ]
      },
      {
        "id": "036-005",
        "name": "Konoin",
        "wards": [
          { "id": "036-005-001", "name": "Chepchabas" },
          { "id": "036-005-002", "name": "Kimulot" },
          { "id": "036-005-003", "name": "Mogogosiek" },
          { "id": "036-005-004", "name": "Boito" },
          { "id": "036-005-005", "name": "Embomos" }
        ]
      }
    ]
  }
  ,

  {
    "id": "037",
    "name": "Kakamega",
    "constituencies": [
      {
        "id": "037-001",
        "name": "Lugari",
        "wards": [
          { "id": "037-001-001", "name": "Mautuma" },
          { "id": "037-001-002", "name": "Lugari" },
          { "id": "037-001-003", "name": "Lumakanda" },
          { "id": "037-001-004", "name": "Chekalini" },
          { "id": "037-001-005", "name": "Chevaywa" },
          { "id": "037-001-006", "name": "Lwandeti" }
        ]
      },
      {
        "id": "037-002",
        "name": "Likuyani",
        "wards": [
          { "id": "037-002-001", "name": "Likuyani" },
          { "id": "037-002-002", "name": "Sango" },
          { "id": "037-002-003", "name": "Kongoni" },
          { "id": "037-002-004", "name": "Nzoia" },
          { "id": "037-002-005", "name": "Sinoko" }
        ]
      },
      {
        "id": "037-003",
        "name": "Malava",
        "wards": [
          { "id": "037-003-001", "name": "West Kabras" },
          { "id": "037-003-002", "name": "Chevaywa" },
          { "id": "037-003-003", "name": "South Kabras" },
          { "id": "037-003-004", "name": "Chemuche" },
          { "id": "037-003-005", "name": "Butali/Chegulo" },
          { "id": "037-003-006", "name": "Manda-Shivanga" }
        ]
      },
      {
        "id": "037-004",
        "name": "Lurambi",
        "wards": [
          { "id": "037-004-001", "name": "Butsotso East" },
          { "id": "037-004-002", "name": "Butsotso South" },
          { "id": "037-004-003", "name": "Butsotso Central" },
          { "id": "037-004-004", "name": "Sheywe" },
          { "id": "037-004-005", "name": "Mahiakalo" },
          { "id": "037-004-006", "name": "Shirere" }
        ]
      },
      {
        "id": "037-005",
        "name": "Navakholo",
        "wards": [
          { "id": "037-005-001", "name": "Ingostse-Mathia" },
          { "id": "037-005-002", "name": "Shinoyi-Shikomari-Esumeiya" },
          { "id": "037-005-003", "name": "Bunyala West" },
          { "id": "037-005-004", "name": "Bunyala East" },
          { "id": "037-005-005", "name": "Bunyala Central" }
        ]
      },
      {
        "id": "037-006",
        "name": "Mumias West",
        "wards": [
          { "id": "037-006-001", "name": "Mumias Central" },
          { "id": "037-006-002", "name": "Mumias North" },
          { "id": "037-006-003", "name": "Etenje" },
          { "id": "037-006-004", "name": "Musanda" }
        ]
      },
      {
        "id": "037-007",
        "name": "Mumias East",
        "wards": [
          { "id": "037-007-001", "name": "Malaha/Isongo/Makunga" },
          { "id": "037-007-002", "name": "East Wanga" },
          { "id": "037-007-003", "name": "Lubinu/Lusheya" }
        ]
      },
      {
        "id": "037-008",
        "name": "Matungu",
        "wards": [
          { "id": "037-008-001", "name": "Koyonzo" },
          { "id": "037-008-002", "name": "Kholera" },
          { "id": "037-008-003", "name": "Khalaba" },
          { "id": "037-008-004", "name": "Mayoni" },
          { "id": "037-008-005", "name": "Namamali" }
        ]
      },
      {
        "id": "037-009",
        "name": "Butere",
        "wards": [
          { "id": "037-009-001", "name": "Marama West" },
          { "id": "037-009-002", "name": "Marama Central" },
          { "id": "037-009-003", "name": "Marama North" },
          { "id": "037-009-004", "name": "Marama South" },
          { "id": "037-009-005", "name": "Shianda/Lusui" }
        ]
      },
      {
        "id": "037-010",
        "name": "Khwisero",
        "wards": [
          { "id": "037-010-001", "name": "Kisa North" },
          { "id": "037-010-002", "name": "Kisa East" },
          { "id": "037-010-003", "name": "Kisa West" },
          { "id": "037-010-004", "name": "Kisa Central" }
        ]
      },
      {
        "id": "037-011",
        "name": "Shinyalu",
        "wards": [
          { "id": "037-011-001", "name": "Isukha North" },
          { "id": "037-011-002", "name": "Murhanda" },
          { "id": "037-011-003", "name": "Isukha Central" },
          { "id": "037-011-004", "name": "Isukha South" },
          { "id": "037-011-005", "name": "Isukha East" },
          { "id": "037-011-006", "name": "Isukha West" }
        ]
      },
      {
        "id": "037-012",
        "name": "Ikolomani",
        "wards": [
          { "id": "037-012-001", "name": "Idakho South" },
          { "id": "037-012-002", "name": "Idakho East" },
          { "id": "037-012-003", "name": "Idakho North" },
          { "id": "037-012-004", "name": "Idakho Central" }
        ]
      }
    ]
  },
  {
    "id": "038",
    "name": "Vihiga",
    "constituencies": [
      {
        "id": "038-001",
        "name": "Vihiga",
        "wards": [
          { "id": "038-001-001", "name": "Lugaga-Wamuluma" },
          { "id": "038-001-002", "name": "South Maragoli" },
          { "id": "038-001-003", "name": "Central Maragoli" },
          { "id": "038-001-004", "name": "Mungoma" }
        ]
      },
      {
        "id": "038-002",
        "name": "Sabatia",
        "wards": [
          { "id": "038-002-001", "name": "Lyaduywa/Izava" },
          { "id": "038-002-002", "name": "West Sabatia" },
          { "id": "038-002-003", "name": "Chavakali" },
          { "id": "038-002-004", "name": "North Maragoli" },
          { "id": "038-002-005", "name": "Wodanga" },
          { "id": "038-002-006", "name": "Busali" }
        ]
      },
      {
        "id": "038-003",
        "name": "Hamisi",
        "wards": [
          { "id": "038-003-001", "name": "Shiru" },
          { "id": "038-003-002", "name": "Gisambai" },
          { "id": "038-003-003", "name": "Shamakhokho" },
          { "id": "038-003-004", "name": "Banja" },
          { "id": "038-003-005", "name": "Tambua" },
          { "id": "038-003-006", "name": "Jepkoyai" }
        ]
      },
      {
        "id": "038-004",
        "name": "Luanda",
        "wards": [
          { "id": "038-004-001", "name": "Luanda Township" },
          { "id": "038-004-002", "name": "Wemilabi" },
          { "id": "038-004-003", "name": "Mwibona" },
          { "id": "038-004-004", "name": "Luanda South" },
          { "id": "038-004-005", "name": "Emabungo" }
        ]
      },
      {
        "id": "038-005",
        "name": "Emuhaya",
        "wards": [
          { "id": "038-005-001", "name": "North East Bunyore" },
          { "id": "038-005-002", "name": "Central Bunyore" },
          { "id": "038-005-003", "name": "West Bunyore" }
        ]
      }
    ]
  },
  {
    "id": "039",
    "name": "Bungoma",
    "constituencies": [
      {
        "id": "039-001",
        "name": "Mount Elgon",
        "wards": [
          { "id": "039-001-001", "name": "Cheptais" },
          { "id": "039-001-002", "name": "Chesikaki" },
          { "id": "039-001-003", "name": "Chepyuk" },
          { "id": "039-001-004", "name": "Kapkateny" },
          { "id": "039-001-005", "name": "Kaptama" },
          { "id": "039-001-006", "name": "Elgon" }
        ]
      },
      {
        "id": "039-002",
        "name": "Sirisia",
        "wards": [
          { "id": "039-002-001", "name": "Namwela" },
          { "id": "039-002-002", "name": "Malakisi/South Kulisiru" },
          { "id": "039-002-003", "name": "Lwandanyi" }
        ]
      },
      {
        "id": "039-003",
        "name": "Kabuchai",
        "wards": [
          { "id": "039-003-001", "name": "Kabuchai/Chwele" },
          { "id": "039-003-002", "name": "West Nalondo" },
          { "id": "039-003-003", "name": "Bumula" },
          { "id": "039-003-004", "name": "Mukuyuni" }
        ]
      },
      {
        "id": "039-004",
        "name": "Bumula",
        "wards": [
          { "id": "039-004-001", "name": "Siboti" },
          { "id": "039-004-002", "name": "Khasoko" },
          { "id": "039-004-003", "name": "Kabula" },
          { "id": "039-004-004", "name": "Kimaeti" },
          { "id": "039-004-005", "name": "West Bukusu" },
          { "id": "039-004-006", "name": "South Bukusu" },
          { "id": "039-004-007", "name": "Bumula" },
          { "id": "039-004-008", "name": "Siboti" }
        ]
      },
      {
        "id": "039-005",
        "name": "Kanduyi",
        "wards": [
          { "id": "039-005-001", "name": "Bukembe West" },
          { "id": "039-005-002", "name": "Bukembe East" },
          { "id": "039-005-003", "name": "Township" },
          { "id": "039-005-004", "name": "Khalaba" },
          { "id": "039-005-005", "name": "Musikoma" },
          { "id": "039-005-006", "name": "East Sang’alo" },
          { "id": "039-005-007", "name": "Marakaru/Tuuti" },
          { "id": "039-005-008", "name": "West Sang’alo" }
        ]
      },
      {
        "id": "039-006",
        "name": "Webuye East",
        "wards": [
          { "id": "039-006-001", "name": "Mihuu" },
          { "id": "039-006-002", "name": "Ndivisi" },
          { "id": "039-006-003", "name": "Maraka" }
        ]
      },
      {
        "id": "039-007",
        "name": "Webuye West",
        "wards": [
          { "id": "039-007-001", "name": "Misikhu" },
          { "id": "039-007-002", "name": "Matulo" },
          { "id": "039-007-003", "name": "Sitikho" },
          { "id": "039-007-004", "name": "Bokoli" }
        ]
      },
      {
        "id": "039-008",
        "name": "Kimilili",
        "wards": [
          { "id": "039-008-001", "name": "Maeni" },
          { "id": "039-008-002", "name": "Kimilili" },
          { "id": "039-008-003", "name": "Kibingei" },
          { "id": "039-008-004", "name": "Kamusinde" }
        ]
      },
      {
        "id": "039-009",
        "name": "Tongaren",
        "wards": [
          { "id": "039-009-001", "name": "Milima" },
          { "id": "039-009-002", "name": "Naitiri/Kabuyefwe" },
          { "id": "039-009-003", "name": "Mihuu" },
          { "id": "039-009-004", "name": "Ndalu/Tabani" },
          { "id": "039-009-005", "name": "Tongaren" },
          { "id": "039-009-006", "name": "Soysambu/Mitua" }
        ]
      }
    ]
  }
  ,

  {
    "id": "040",
    "name": "Busia",
    "constituencies": [
      {
        "id": "040-001",
        "name": "Teso North",
        "wards": [
          { "id": "040-001-001", "name": "Malaba Central" },
          { "id": "040-001-002", "name": "Malaba North" },
          { "id": "040-001-003", "name": "Angurai South" },
          { "id": "040-001-004", "name": "Angurai North" },
          { "id": "040-001-005", "name": "Angurai East" }
        ]
      },
      {
        "id": "040-002",
        "name": "Teso South",
        "wards": [
          { "id": "040-002-001", "name": "Angorom" },
          { "id": "040-002-002", "name": "Chakol South" },
          { "id": "040-002-003", "name": "Chakol North" },
          { "id": "040-002-004", "name": "Amukura West" },
          { "id": "040-002-005", "name": "Amukura East" },
          { "id": "040-002-006", "name": "Amukura Central" }
        ]
      },
      {
        "id": "040-003",
        "name": "Nambale",
        "wards": [
          { "id": "040-003-001", "name": "Nambale Township" },
          { "id": "040-003-002", "name": "Bukhayo North/Waltsi" },
          { "id": "040-003-003", "name": "Bukhayo East" },
          { "id": "040-003-004", "name": "Bukhayo Central" }
        ]
      },
      {
        "id": "040-004",
        "name": "Matayos",
        "wards": [
          { "id": "040-004-001", "name": "Bukhayo West" },
          { "id": "040-004-002", "name": "Mayenje" },
          { "id": "040-004-003", "name": "Matayos South" },
          { "id": "040-004-004", "name": "Busibwabo" },
          { "id": "040-004-005", "name": "Burumba" }
        ]
      },
      {
        "id": "040-005",
        "name": "Butula",
        "wards": [
          { "id": "040-005-001", "name": "Marachi West" },
          { "id": "040-005-002", "name": "Kingandole" },
          { "id": "040-005-003", "name": "Marachi Central" },
          { "id": "040-005-004", "name": "Marachi East" },
          { "id": "040-005-005", "name": "Marachi North" },
          { "id": "040-005-006", "name": "Elugulu" }
        ]
      },
      {
        "id": "040-006",
        "name": "Funyula",
        "wards": [
          { "id": "040-006-001", "name": "Namboboto Nambuku" },
          { "id": "040-006-002", "name": "Nangina" },
          { "id": "040-006-003", "name": "Ageng’a Nanguba" },
          { "id": "040-006-004", "name": "Bwiri" }
        ]
      },
      {
        "id": "040-007",
        "name": "Budalangi",
        "wards": [
          { "id": "040-007-001", "name": "Bunyala Central" },
          { "id": "040-007-002", "name": "Bunyala North" },
          { "id": "040-007-003", "name": "Bunyala West" },
          { "id": "040-007-004", "name": "Bunyala South" }
        ]
      }
    ]
  },
  {
    "id": "041",
    "name": "Siaya",
    "constituencies": [
      {
        "id": "041-001",
        "name": "Ugenya",
        "wards": [
          { "id": "041-001-001", "name": "West Ugenya" },
          { "id": "041-001-002", "name": "Ukwala" },
          { "id": "041-001-003", "name": "North Ugenya" },
          { "id": "041-001-004", "name": "East Ugenya" }
        ]
      },
      {
        "id": "041-002",
        "name": "Ugunja",
        "wards": [
          { "id": "041-002-001", "name": "Sidindi" },
          { "id": "041-002-002", "name": "Sigomere" },
          { "id": "041-002-003", "name": "Ugunja" }
        ]
      },
      {
        "id": "041-003",
        "name": "Alego Usonga",
        "wards": [
          { "id": "041-003-001", "name": "Usonga" },
          { "id": "041-003-002", "name": "West Alego" },
          { "id": "041-003-003", "name": "Central Alego" },
          { "id": "041-003-004", "name": "Siaya Township" },
          { "id": "041-003-005", "name": "North Alego" },
          { "id": "041-003-006", "name": "South East Alego" }
        ]
      },
      {
        "id": "041-004",
        "name": "Gem",
        "wards": [
          { "id": "041-004-001", "name": "West Gem" },
          { "id": "041-004-002", "name": "Central Gem" },
          { "id": "041-004-003", "name": "Yala Township" },
          { "id": "041-004-004", "name": "East Gem" },
          { "id": "041-004-005", "name": "North Gem" }
        ]
      },
      {
        "id": "041-005",
        "name": "Bondo",
        "wards": [
          { "id": "041-005-001", "name": "West Yimbo" },
          { "id": "041-005-002", "name": "Central Sakwa" },
          { "id": "041-005-003", "name": "South Sakwa" },
          { "id": "041-005-004", "name": "Yimbo East" },
          { "id": "041-005-005", "name": "West Sakwa" }
        ]
      },
      {
        "id": "041-006",
        "name": "Rarieda",
        "wards": [
          { "id": "041-006-001", "name": "East Asembo" },
          { "id": "041-006-002", "name": "West Asembo" },
          { "id": "041-006-003", "name": "North Uyoma" },
          { "id": "041-006-004", "name": "South Uyoma" },
          { "id": "041-006-005", "name": "West Uyoma" }
        ]
      }
    ]
  }
  ,


  {
    "id": "042",
    "name": "Kisumu",
    "constituencies": [
      {
        "id": "042-001",
        "name": "Kisumu East",
        "wards": [
          { "id": "042-001-001", "name": "Kajulu" },
          { "id": "042-001-002", "name": "Kolwa East" },
          { "id": "042-001-003", "name": "Manyatta B" },
          { "id": "042-001-004", "name": "Nyalenda A" },
          { "id": "042-001-005", "name": "Kolwa Central" }
        ]
      },
      {
        "id": "042-002",
        "name": "Kisumu West",
        "wards": [
          { "id": "042-002-001", "name": "South West Kisumu" },
          { "id": "042-002-002", "name": "Central Kisumu" },
          { "id": "042-002-003", "name": "West Kisumu" },
          { "id": "042-002-004", "name": "North West Kisumu" },
          { "id": "042-002-005", "name": "North Kisumu" }
        ]
      },
      {
        "id": "042-003",
        "name": "Kisumu Central",
        "wards": [
          { "id": "042-003-001", "name": "Railways" },
          { "id": "042-003-002", "name": "Migosi" },
          { "id": "042-003-003", "name": "Shaurimoyo Kaloleni" },
          { "id": "042-003-004", "name": "Market Milimani" },
          { "id": "042-003-005", "name": "Kondele" }
        ]
      },
      {
        "id": "042-004",
        "name": "Seme",
        "wards": [
          { "id": "042-004-001", "name": "West Seme" },
          { "id": "042-004-002", "name": "Central Seme" },
          { "id": "042-004-003", "name": "East Seme" },
          { "id": "042-004-004", "name": "North Seme" }
        ]
      },
      {
        "id": "042-005",
        "name": "Nyando",
        "wards": [
          { "id": "042-005-001", "name": "East Kano/Wawidhi" },
          { "id": "042-005-002", "name": "Ahero" },
          { "id": "042-005-003", "name": "Awasi/Onjiko" },
          { "id": "042-005-004", "name": "Kabonyo/Kanyagwal" },
          { "id": "042-005-005", "name": "Kobura" }
        ]
      },
      {
        "id": "042-006",
        "name": "Muhoroni",
        "wards": [
          { "id": "042-006-001", "name": "Miwani" },
          { "id": "042-006-002", "name": "Ombeyi" },
          { "id": "042-006-003", "name": "Masogo/Nyangoma" },
          { "id": "042-006-004", "name": "Chemelil" },
          { "id": "042-006-005", "name": "Muhoroni/Koru" }
        ]
      },
      {
        "id": "042-007",
        "name": "Nyakach",
        "wards": [
          { "id": "042-007-001", "name": "South West Nyakach" },
          { "id": "042-007-002", "name": "North Nyakach" },
          { "id": "042-007-003", "name": "Central Nyakach" },
          { "id": "042-007-004", "name": "West Nyakach" },
          { "id": "042-007-005", "name": "South East Nyakach" }
        ]
      }
    ]
  },
  {
    "id": "043",
    "name": "Homa Bay",
    "constituencies": [
      {
        "id": "043-001",
        "name": "Kasipul",
        "wards": [
          { "id": "043-001-001", "name": "West Kasipul" },
          { "id": "043-001-002", "name": "South Kasipul" },
          { "id": "043-001-003", "name": "Central Kasipul" },
          { "id": "043-001-004", "name": "East Kamagak" },
          { "id": "043-001-005", "name": "West Kamagak" }
        ]
      },
      {
        "id": "043-002",
        "name": "Kabondo Kasipul",
        "wards": [
          { "id": "043-002-001", "name": "Kabondo East" },
          { "id": "043-002-002", "name": "Kabondo West" },
          { "id": "043-002-003", "name": "Kokwanyo/Kakelo" },
          { "id": "043-002-004", "name": "Kojwach" }
        ]
      },
      {
        "id": "043-003",
        "name": "Karachuonyo",
        "wards": [
          { "id": "043-003-001", "name": "West Karachuonyo" },
          { "id": "043-003-002", "name": "North Karachuonyo" },
          { "id": "043-003-003", "name": "Central" },
          { "id": "043-003-004", "name": "Kanyaluo" },
          { "id": "043-003-005", "name": "Kibiri" },
          { "id": "043-003-006", "name": "Wangchieng" },
          { "id": "043-003-007", "name": "Kendu Bay Town" }
        ]
      },
      {
        "id": "043-004",
        "name": "Rangwe",
        "wards": [
          { "id": "043-004-001", "name": "West Gem" },
          { "id": "043-004-002", "name": "East Gem" },
          { "id": "043-004-003", "name": "Kagan" },
          { "id": "043-004-004", "name": "Kochia" }
        ]
      },
      {
        "id": "043-005",
        "name": "Homa Bay Town",
        "wards": [
          { "id": "043-005-001", "name": "Homa Bay Central" },
          { "id": "043-005-002", "name": "Homa Bay Arujo" },
          { "id": "043-005-003", "name": "Homa Bay West" },
          { "id": "043-005-004", "name": "Homa Bay East" }
        ]
      },
      {
        "id": "043-006",
        "name": "Ndhiwa",
        "wards": [
          { "id": "043-006-001", "name": "Kanyadoto" },
          { "id": "043-006-002", "name": "Kanyikela" },
          { "id": "043-006-003", "name": "Kabuoch North" },
          { "id": "043-006-004", "name": "Kabuoch South/Pala" },
          { "id": "043-006-005", "name": "Kanyamwa Kosewe" },
          { "id": "043-006-006", "name": "Kanyamwa Kologi" },
          { "id": "043-006-007", "name": "Kanyamwa West" }
        ]
      },
      {
        "id": "043-007",
        "name": "Suba North",
        "wards": [
          { "id": "043-007-001", "name": "Mfangano Island" },
          { "id": "043-007-002", "name": "Rusinga Island" },
          { "id": "043-007-003", "name": "Kasgunga" },
          { "id": "043-007-004", "name": "Gembe" },
          { "id": "043-007-005", "name": "Lambwe" }
        ]
      },
      {
        "id": "043-008",
        "name": "Suba South",
        "wards": [
          { "id": "043-008-001", "name": "Gwassi South" },
          { "id": "043-008-002", "name": "Gwassi North" },
          { "id": "043-008-003", "name": "Kaksingri West" },
          { "id": "043-008-004", "name": "Ruma-Kaksingri East" }
        ]
      }
    ]
  },
  {
    "id": "044",
    "name": "Migori",
    "constituencies": [
      {
        "id": "044-001",
        "name": "Rongo",
        "wards": [
          { "id": "044-001-001", "name": "North Kamagambo" },
          { "id": "044-001-002", "name": "Central Kamagambo" },
          { "id": "044-001-003", "name": "East Kamagambo" },
          { "id": "044-001-004", "name": "South Kamagambo" }
        ]
      },
      {
        "id": "044-002",
        "name": "Awendo",
        "wards": [
          { "id": "044-002-001", "name": "North Sakwa" },
          { "id": "044-002-002", "name": "South Sakwa" },
          { "id": "044-002-003", "name": "Central Sakwa" },
          { "id": "044-002-004", "name": "West Sakwa" }
        ]
      },
      {
        "id": "044-003",
        "name": "Suna East",
        "wards": [
          { "id": "044-003-001", "name": "God Jope" },
          { "id": "044-003-002", "name": "Suna Central" },
          { "id": "044-003-003", "name": "Kakrao" },
          { "id": "044-003-004", "name": "Kwa" }
        ]
      },
      {
        "id": "044-004",
        "name": "Suna West",
        "wards": [
          { "id": "044-004-001", "name": "Wiga" },
          { "id": "044-004-002", "name": "Wasweta II" },
          { "id": "044-004-003", "name": "Ragan Oruba" },
          { "id": "044-004-004", "name": "Riana" }
        ]
      },
      {
        "id": "044-005",
        "name": "Uriri",
        "wards": [
          { "id": "044-005-001", "name": "West Kanyamkago" },
          { "id": "044-005-002", "name": "North Kanyamkago" },
          { "id": "044-005-003", "name": "Central Kanyamkago" },
          { "id": "044-005-004", "name": "South Kanyamkago" },
          { "id": "044-005-005", "name": "East Kanyamkago" }
        ]
      },
      {
        "id": "044-006",
        "name": "Nyatike",
        "wards": [
          { "id": "044-006-001", "name": "Kachieng" },
          { "id": "044-006-002", "name": "Kanyasa" },
          { "id": "044-006-003", "name": "North Kadem" },
          { "id": "044-006-004", "name": "Macalder/Kanyarwanda" },
          { "id": "044-006-005", "name": "Kaler" },
          { "id": "044-006-006", "name": "Got Kachola" },
          { "id": "044-006-007", "name": "Muhuru" }
        ]
      },
      {
        "id": "044-007",
        "name": "Kuria West",
        "wards": [
          { "id": "044-007-001", "name": "Bukira East" },
          { "id": "044-007-002", "name": "Bukira Central/Ikerege" },
          { "id": "044-007-003", "name": "Isibania" },
          { "id": "044-007-004", "name": "Makerero" },
          { "id": "044-007-005", "name": "Masaba" },
          { "id": "044-007-006", "name": "Tagare" },
          { "id": "044-007-007", "name": "Nyamosense/Komerera" }
        ]
      },
      {
        "id": "044-008",
        "name": "Kuria East",
        "wards": [
          { "id": "044-008-001", "name": "Gokeharaka/Getambwega" },
          { "id": "044-008-002", "name": "Ntimaru West" },
          { "id": "044-008-003", "name": "Ntimaru East" },
          { "id": "044-008-004", "name": "Nyabasi East" },
          { "id": "044-008-005", "name": "Nyabasi West" }
        ]
      }
    ]
  }
  ,

  {
    "id": "045",
    "name": "Kisii",
    "constituencies": [
      {
        "id": "045-001",
        "name": "Bonchari",
        "wards": [
          { "id": "045-001-001", "name": "Bomariba" },
          { "id": "045-001-002", "name": "Bogiakumu" },
          { "id": "045-001-003", "name": "Riana" },
          { "id": "045-001-004", "name": "Bomorenda" }
        ]
      },
      {
        "id": "045-002",
        "name": "South Mugirango",
        "wards": [
          { "id": "045-002-001", "name": "Tabaka" },
          { "id": "045-002-002", "name": "Boikang’a" },
          { "id": "045-002-003", "name": "Bogetenga" },
          { "id": "045-002-004", "name": "Borabu/Chitago" },
          { "id": "045-002-005", "name": "Moticho" },
          { "id": "045-002-006", "name": "Getenga" }
        ]
      },
      {
        "id": "045-003",
        "name": "Bomachoge Borabu",
        "wards": [
          { "id": "045-003-001", "name": "Boochi Borabu" },
          { "id": "045-003-002", "name": "Boochi/Tendere" },
          { "id": "045-003-003", "name": "Bombaba Borabu" },
          { "id": "045-003-004", "name": "Magenche" }
        ]
      },
      {
        "id": "045-004",
        "name": "Bobasi",
        "wards": [
          { "id": "045-004-001", "name": "Masige West" },
          { "id": "045-004-002", "name": "Masige East" },
          { "id": "045-004-003", "name": "Basi Central" },
          { "id": "045-004-004", "name": "Nyacheki" },
          { "id": "045-004-005", "name": "Bassi Bogetaorio" },
          { "id": "045-004-006", "name": "Bassi Chache" },
          { "id": "045-004-007", "name": "Sameta/Mokwerero" },
          { "id": "045-004-008", "name": "Bobasi Chache" }
        ]
      },
      {
        "id": "045-005",
        "name": "Bomachoge Chache",
        "wards": [
          { "id": "045-005-001", "name": "Majoge Basi" },
          { "id": "045-005-002", "name": "Boochi/Tendere" },
          { "id": "045-005-003", "name": "Bosoti/Sengera" }
        ]
      },
      {
        "id": "045-006",
        "name": "Nyaribari Masaba",
        "wards": [
          { "id": "045-006-001", "name": "Ichuni" },
          { "id": "045-006-002", "name": "Nyamasibi" },
          { "id": "045-006-003", "name": "Masimba" },
          { "id": "045-006-004", "name": "Gesusu" },
          { "id": "045-006-005", "name": "Kiamokama" }
        ]
      },
      {
        "id": "045-007",
        "name": "Nyaribari Chache",
        "wards": [
          { "id": "045-007-001", "name": "Birongo" },
          { "id": "045-007-002", "name": "Ibeno" },
          { "id": "045-007-003", "name": "Keumbu" },
          { "id": "045-007-004", "name": "Kisii Central" },
          { "id": "045-007-005", "name": "Kiogoro" },
          { "id": "045-007-006", "name": "Bobaracho" },
          { "id": "045-007-007", "name": "Kegogi" }
        ]
      },
      {
        "id": "045-008",
        "name": "Kitutu Chache North",
        "wards": [
          { "id": "045-008-001", "name": "Monyerero" },
          { "id": "045-008-002", "name": "Sensi" },
          { "id": "045-008-003", "name": "Marani" },
          { "id": "045-008-004", "name": "Kegogi" }
        ]
      },
      {
        "id": "045-009",
        "name": "Kitutu Chache South",
        "wards": [
          { "id": "045-009-001", "name": "Bogusero" },
          { "id": "045-009-002", "name": "Bogeka" },
          { "id": "045-009-003", "name": "Nyakoe" },
          { "id": "045-009-004", "name": "Kitutu Central" },
          { "id": "045-009-005", "name": "Nyatieko" }
        ]
      }
    ]
  },
  {
    "id": "046",
    "name": "Nyamira",
    "constituencies": [
      {
        "id": "046-001",
        "name": "West Mugirango",
        "wards": [
          { "id": "046-001-001", "name": "Nyamaiya" },
          { "id": "046-001-002", "name": "Bogichora" },
          { "id": "046-001-003", "name": "Bosamaro" },
          { "id": "046-001-004", "name": "Bonyamatuta" },
          { "id": "046-001-005", "name": "Township" }
        ]
      },
      {
        "id": "046-002",
        "name": "North Mugirango",
        "wards": [
          { "id": "046-002-001", "name": "Itibo" },
          { "id": "046-002-002", "name": "Bomwagamo" },
          { "id": "046-002-003", "name": "Bokeira" },
          { "id": "046-002-004", "name": "Magwagwa" },
          { "id": "046-002-005", "name": "Ekerenyo" }
        ]
      },
      {
        "id": "046-003",
        "name": "Borabu",
        "wards": [
          { "id": "046-003-001", "name": "Mekenene" },
          { "id": "046-003-002", "name": "Kiabonyoru" },
          { "id": "046-003-003", "name": "Esise" },
          { "id": "046-003-004", "name": "Nyansiongo" }
        ]
      },
      {
        "id": "046-004",
        "name": "Kitutu Masaba",
        "wards": [
          { "id": "046-004-001", "name": "Rigoma" },
          { "id": "046-004-002", "name": "Gachuba" },
          { "id": "046-004-003", "name": "Kemera" },
          { "id": "046-004-004", "name": "Magombo" },
          { "id": "046-004-005", "name": "Manga" },
          { "id": "046-004-006", "name": "Gesima" }
        ]
      }
    ]
  },
  {
    "id": "047",
    "name": "Nairobi",
    "constituencies": [
      {
        "id": "047-001",
        "name": "Westlands",
        "wards": [
          { "id": "047-001-001", "name": "Kitisuru" },
          { "id": "047-001-002", "name": "Parklands/Highridge" },
          { "id": "047-001-003", "name": "Karura" },
          { "id": "047-001-004", "name": "Kangemi" },
          { "id": "047-001-005", "name": "Mountain View" }
        ]
      },
      {
        "id": "047-002",
        "name": "Dagoretti North",
        "wards": [
          { "id": "047-002-001", "name": "Kilimani" },
          { "id": "047-002-002", "name": "Kawangware" },
          { "id": "047-002-003", "name": "Gatina" },
          { "id": "047-002-004", "name": "Kileleshwa" },
          { "id": "047-002-005", "name": "Kabiro" }
        ]
      },
      {
        "id": "047-003",
        "name": "Dagoretti South",
        "wards": [
          { "id": "047-003-001", "name": "Mutu-Ini" },
          { "id": "047-003-002", "name": "Ngando" },
          { "id": "047-003-003", "name": "Riruta" },
          { "id": "047-003-004", "name": "Uthiru/Ruthimitu" },
          { "id": "047-003-005", "name": "Waithaka" }
        ]
      },
      {
        "id": "047-004",
        "name": "Lang’ata",
        "wards": [
          { "id": "047-004-001", "name": "Karen" },
          { "id": "047-004-002", "name": "Nairobi West" },
          { "id": "047-004-003", "name": "Mugumo-Ini" },
          { "id": "047-004-004", "name": "South C" },
          { "id": "047-004-005", "name": "Nyayo Highrise" }
        ]
      },
      {
        "id": "047-005",
        "name": "Kibra",
        "wards": [
          { "id": "047-005-001", "name": "Laini Saba" },
          { "id": "047-005-002", "name": "Lindi" },
          { "id": "047-005-003", "name": "Makina" },
          { "id": "047-005-004", "name": "Woodley/Kenyatta Golf Course" },
          { "id": "047-005-005", "name": "Sarang’ombe" }
        ]
      },
      {
        "id": "047-006",
        "name": "Roysambu",
        "wards": [
          { "id": "047-006-001", "name": "Githurai" },
          { "id": "047-006-002", "name": "Kahawa West" },
          { "id": "047-006-003", "name": "Zimmerman" },
          { "id": "047-006-004", "name": "Roysambu" },
          { "id": "047-006-005", "name": "Kahawa" }
        ]
      },
      {
        "id": "047-007",
        "name": "Kasarani",
        "wards": [
          { "id": "047-007-001", "name": "Clay City" },
          { "id": "047-007-002", "name": "Mwiki" },
          { "id": "047-007-003", "name": "Kasarani" },
          { "id": "047-007-004", "name": "Njiru" },
          { "id": "047-007-005", "name": "Ruai" }
        ]
      },
      {
        "id": "047-008",
        "name": "Ruaraka",
        "wards": [
          { "id": "047-008-001", "name": "Baba Dogo" },
          { "id": "047-008-002", "name": "Utalii" },
          { "id": "047-008-003", "name": "Mathare North" },
          { "id": "047-008-004", "name": "Lucky Summer" },
          { "id": "047-008-005", "name": "Korogocho" }
        ]
      },
      {
        "id": "047-009",
        "name": "Embakasi South",
        "wards": [
          { "id": "047-009-001", "name": "Imara Daima" },
          { "id": "047-009-002", "name": "Kwa Njenga" },
          { "id": "047-009-003", "name": "Kwa Reuben" },
          { "id": "047-009-004", "name": "Pipeline" },
          { "id": "047-009-005", "name": "Kware" }
        ]
      },
      {
        "id": "047-010",
        "name": "Embakasi North",
        "wards": [
          { "id": "047-010-001", "name": "Kariobangi North" },
          { "id": "047-010-002", "name": "Dandora Area I" },
          { "id": "047-010-003", "name": "Dandora Area II" },
          { "id": "047-010-004", "name": "Dandora Area III" },
          { "id": "047-010-005", "name": "Dandora Area IV" }
        ]
      },
      {
        "id": "047-011",
        "name": "Embakasi Central",
        "wards": [
          { "id": "047-011-001", "name": "Kayole North" },
          { "id": "047-011-002", "name": "Kayole Central" },
          { "id": "047-011-003", "name": "Kayole South" },
          { "id": "047-011-004", "name": "Komarock" },
          { "id": "047-011-005", "name": "Matopeni/Spring Valley" }
        ]
      },
      {
        "id": "047-012",
        "name": "Embakasi East",
        "wards": [
          { "id": "047-012-001", "name": "Upper Savannah" },
          { "id": "047-012-002", "name": "Lower Savannah" },
          { "id": "047-012-003", "name": "Embakasi" },
          { "id": "047-012-004", "name": "Utawala" },
          { "id": "047-012-005", "name": "Mihango" }
        ]
      },
      {
        "id": "047-013",
        "name": "Embakasi West",
        "wards": [
          { "id": "047-013-001", "name": "Umoja I" },
          { "id": "047-013-002", "name": "Umoja II" },
          { "id": "047-013-003", "name": "Mowlem" },
          { "id": "047-013-004", "name": "Kariobangi South" },
          { "id": "047-013-005", "name": "Maringo/Hamza" }
        ]
      },
      {
        "id": "047-014",
        "name": "Makadara",
        "wards": [
          { "id": "047-014-001", "name": "Maringo/Hamza" },
          { "id": "047-014-002", "name": "Harambee" },
          { "id": "047-014-003", "name": "Viwandani" }
        ]
      },
      {
        "id": "047-015",
        "name": "Kamukunji",
        "wards": [
          { "id": "047-015-001", "name": "Pumwani" },
          { "id": "047-015-002", "name": "Eastleigh North" },
          { "id": "047-015-003", "name": "Eastleigh South" },
          { "id": "047-015-004", "name": "Airbase" },
          { "id": "047-015-005", "name": "California" }
        ]
      },
      {
        "id": "047-016",
        "name": "Starehe",
        "wards": [
          { "id": "047-016-001", "name": "Nairobi Central" },
          { "id": "047-016-002", "name": "Ngara" },
          { "id": "047-016-003", "name": "Pangani" },
          { "id": "047-016-004", "name": "Ziwani/Kariokor" },
          { "id": "047-016-005", "name": "Landimawe" },
          { "id": "047-016-006", "name": "Nairobi South" }
        ]
      },
      {
        "id": "047-017",
        "name": "Mathare",
        "wards": [
          { "id": "047-017-001", "name": "Hospital" },
          { "id": "047-017-002", "name": "Mabatini" },
          { "id": "047-017-003", "name": "Huruma" },
          { "id": "047-017-004", "name": "Ngei" },
          { "id": "047-017-005", "name": "Mlango Kubwa" },
          { "id": "047-017-006", "name": "Kiamaiko" }
        ]
      }
    ]
  }


] as County[];

// Flat list of every ward in a given county, e.g. for populating a
// "which ward do you cover" select when assigning a Ward Officer.
export function getWardsForCounty(countyId: string | null | undefined): Ward[] {
  if (!countyId) return [];
  const county = counties.find((c) => c.id === countyId);
  if (!county) return [];
  return county.constituencies.flatMap((c) => c.wards);
}

export function getCountyName(countyId: string | null | undefined): string {
  return counties.find((c) => c.id === countyId)?.name ?? "";
}

export function getWardName(countyId: string | null | undefined, wardId: string | null | undefined): string {
  if (!wardId) return "";
  return getWardsForCounty(countyId).find((w) => w.id === wardId)?.name ?? "";
}
