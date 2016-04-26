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
var base_color = "#6FC9F0"
var dark_grey = "#47565C"
var light_grey = "#F9FBFB"

var font_size = "30px"

var heading = {
  color: dark_grey,
  fontSize: font_size
}

var gf_content = [
 [ // row
    { // block
      title: "Nik Skoufis",
      keywords: "Software developer",
      style: {
        color: light_grey,
        backgroundColor: base_color,
        fontSize: "50px",
        letterSpacing: "1px"
      }
    },
    { // block
      title: "RasPlayer",
      link: "https://github.com/niksko/rasplayer",
      imageURL: "./assets/rasplayer.png",
      keywords: ["nodejs", "raspberry pi", "omxplayer", "purecss"],
      style: heading
    },
    { // block
      title: "GoPixel",
      link: "https://github.com/niksko/gopixel",
      imageURL: "./assets/lake-sorted.png",
      keywords: ["golang", "pixel sorting", "GIFT"],
      style: heading
    },
    { // block
      title: "Reddit Comment Analysis",
      link: "https://github.com/niksko/redditCommentData",
      imageURL: "./assets/comment-data.png",
      keywords: ["python", "jupyter", "bokeh", "pandas"],
      style: heading
    }
  ],
  [  // row
    { // block
      title: "Honours Thesis",
      link: "https://github.com/Niksko/HonoursThesis/raw/master/Thesis.pdf",
      imageURL: "./assets/thesis.png",
      keywords: ["DEs", "octave", "numerical methods"],
      style: heading
    },
    { // block
      title: "Repeated Games with Mistakes",
      link: "https://github.com/Niksko/AdvancedProjectReport2015/raw/master/endSemReport/endSemReport.pdf",
      imageURL: "./assets/repeated-games.png",
      keywords: ["game theory", "python", "evolutionary dynamics"],
      style: heading
    },
    { // block
      title: "JEDy: Julia for Evolutionary Dynamics",
      link: "http://nbviewer.jupyter.org/github/niksko/JEDyPresentation/blob/master/Presentation.ipynb",
      imageURL: "./assets/jedy.png",
      keywords: ["julia", "game theory", "evolutionary dynamics"],
      style: heading
    }
  ]
]


var gf_styles = {
  squareMode: true,
  innerBlock: {
    fontFamily: "Montserrat",
    padding: "10px",
    backgroundColor: light_grey
  },
  blockTitle: {
    margin: "0 auto",
    textTransform: "uppercase",
  },
  keyword: {
    fontSize: "11px",
    backgroundColor: "rgba(71,86,92,0.7)",
    padding: "2px 5px",
    margin: "2px"
  },
  keywords: {
    color: light_grey,
    fontSize: "10px",
    marginTop: "-50px"
  }
}
