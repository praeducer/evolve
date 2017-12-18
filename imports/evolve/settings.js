import Color from "color";
import { PhenotypeHelpers } from "dargen";
let { choose } = PhenotypeHelpers;

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
    proto: {
      phenotype: {
        mutate: [
          {
            name: "substitution",
            selection: 0.05
          },
          {
            name: choose(["incrementation", "decrementation"]),
            selection: {
              rate: choose([1 / 5, 1 / 2]),
              selection: "styles.title.color"
            },
            params: {
              increment: 1 / 60,
              decrement: 1 / 60
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
          primary: choose(Titles.Primary),
          secondary: choose(Titles.Secondary)
        },
        baseHue: g => g,
        styles: {
          title: {
            color: decodeColor,
            fontWeight: choose(FontWeights),
            fontFamily: choose(Fonts)
          },
          text: {
            color: decodeColor,
            fontWeight: choose(FontWeights),
            fontFamily: choose(Fonts)
          },
          card: {
            backgroundColor: decodeColor
          }
        }
      }
    }
  }
});

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
