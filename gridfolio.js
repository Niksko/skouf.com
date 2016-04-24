                                    /*
Sample Structure:

gf_content =  [
                [ row 1
                  { block 1 },
                  { block 2 },
                  { block 3 }
                ],
                etc.
              ]

Rows can have 1 - 9 blocks.
                                    */

var gf_content = [
 [ // row
    { // block
      title: "Nik Skoufis",
      style: {
        backgroundColor: "#6877BA",
        fontSize: "50px",
        letterSpacing: "1px"
      }
    },
    { // block
      title: "RasPlayer",
      link: "https://github.com/niksko/rasplayer",
      imageURL: "",
      keywords: ["nodejs", "raspberry pi", "omxplayer", "purecss"]
    },
    { // block
      title: "GoPixel",
      link: "https://github.com/niksko/gopixel",
      imageURL: "./assets/lake-sorted.jpg",
      keywords: ["golang", "pixel sorting", "GIFT"]
    },
    { // block
      title: "Reddit Comment Analysis",
      link: "https://github.com/niksko/redditCommentAnalysis",
      imageURL: "",
      keywords: ["python", "jupyter", "bokeh", "pandas"]
    }
  ],
  [  // row
    { // block
      title: "Honours Thesis",
      link: "https://github.com/Niksko/HonoursThesis/raw/master/Thesis.pdf",
      imageURL: "",
      keywords: ["DEs", "octave", "numerical methods"]
    },
    { // block
      title: "Repeated Games with Mistakes",
      link: "https://github.com/Niksko/AdvancedProjectReport2015/raw/master/endSemReport/endSemReport.pdf",
      imageURL: "",
      keywords: ["game theory", "python", "evolutionary dynamics"]
    },
    { // block
      title: "JEDy: Julia for Evolutionary Dynamics",
      link: "http://nbviewer.jupyter.org/github/niksko/JEDyPresentation/blob/master/Presentation.ipynb",
      imageURL: "",
      keywords: ["julia", "game theory", "evolutionary dynamics"]
    }
  ]
]


var gf_styles = {
  squareMode: true,
  innerBlock: {
    fontFamily: "Montserrat",
    color: "#f9fbfb",
    padding: "10px"
  },
  blockTitle: {
    margin: "0 auto",
    textTransform: "uppercase"
  },
  keyword: {
    fontSize: "11px",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "2px 5px",
    margin: "2px"
  },
  keywords: {
    fontSize: "10px",
    marginTop: "-50px"
  }
}
