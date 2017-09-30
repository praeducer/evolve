import Color from "color";

let Titles = {
  Primary: [
    "Software",
    "Engineering",
    "Marketing",
    "Applications",
    "Learning",
    "Solutions"
  ],
  Secondary: [
    "Data Science",
    "Data Processing",
    "Data Collection",
    "Artificial Intelligence",
    "Cognitive Computing",
    "Chat Bots",
    "Cloud Services"
  ]
};

const FontWeights = [500, 700];

const Fonts = [
  "Open Sans",
  "Josefin Slab",
  "Arvo",
  "Lato",
  "Vollkorn",
  "Abril Fatface",
  "Ubuntu",
  "PT Sans",
  "PT Serif",
  "Old Standard TT",
  "Droid Sans",
  "Anivers",
  "Junction",
  "Fertigo",
  "Aller",
  "Audimat",
  "Delicious",
  "Prociono"
];

export default (EvolveSettings = {
  population: {
    phenotype: {
      mutate: [
        {
          name: "sustitution",
          selection: 0.03
        },
        {
          name: chooseElement(["incrementation", "decrementation"]),
          selection: {
            rate: chooseElement([1 / 5, 1 / 2]),
            selection: "style.title.color"
          },
          params: {
            increment: 1 / 60,
            decrement: 1 / 60
          }
        },
        {
          name: "sustitution",
          selection: {
            rate: 0.1,
            selection: "mutate.1.name"
          }
        },
        {
          name: "substitution",
          selection: {
            rate: 0.05,
            selection: "baseHue"
          }
        }
      ],
      titles: {
        primary: chooseElement(Titles.Primary),
        secondary: chooseElement(Titles.Secondary)
      },
      baseHue: g => g,
      styles: {
        title: {
          color: decodeColor,
          fontWeight: chooseElement(FontWeights),
          fontFamily: chooseElement(Fonts)
        },
        text: {
          color: decodeColor,
          fontWeight: chooseElement(FontWeights),
          fontFamily: chooseElement(Fonts)
        },
        card: {
          backgroundColor: decodeColor
        }
      }
    }
  }
});


function chooseElement(arr) {
  return g => arr[Math.floor(g * arr.length)];
}

function decodeColor(c1, c2, c3) {
  let [h, s, l] = Array.from(arguments);
  // Tie all the colors to the same base hue.
  let bh = this.genome[this.epigenome.selection("baseHue")[0]];
  return Color({
    h: h + bh % 360,
    s: s * 100,
    l: l * 100
  }).rgbString();
}
