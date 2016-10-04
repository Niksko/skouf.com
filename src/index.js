// DOM Element selectors
var gridfolioContainer = document.getElementById("gridfolio")


// Prototype Elements
var linkProto = document.createElement("a")

var rowProto = document.createElement("div")
rowProto.className = "gf-row"

var blockProto = document.createElement("div")
blockProto.className = "gf-block"

var innerBlockProto = document.createElement("div")
innerBlockProto.className = "gf-block--inner"

var innerBlockSpacer = document.createElement("div")
innerBlockSpacer.className = "gf-block--inner--spacer"

var blockTitleProto = document.createElement("div")
blockTitleProto.className = "gf-block--inner--title"

var blockKeywordsProto = document.createElement("div")
blockKeywordsProto.className = "gf-block--inner--keywords"

var blockKeywordProto = document.createElement("div")
blockKeywordProto.className = "gf-block--inner--keyword"

var clickableSpanProto = document.createElement("span")
clickableSpanProto.className = "gf-block--link-span"

var backTitleProto = document.createElement("div")
backTitleProto.className = "gf-block--flip-container--backTitle"

var backTextProto = document.createElement("div")
backTextProto.className = "gf-block--flip-container--backText"

// Global functions
function squareify() {
  var blocks = document.querySelectorAll(".gf-block.square")
  var blocksArray = Array.prototype.slice.call(blocks)

  blocksArray.forEach(function(element, i) {
    element.style.height = element.clientWidth + "px"
  })
}

function addStyles(node, style) {
  for (var i in style) {
    node.style[i] = style[i]
  }
  return node
}

// Run through Gridfolio content array.
requirejs(["gridfolio"], function() {

  gf_content.forEach(function(row, i) {
    if (typeof row == "object") {
      var rowElement = rowProto.cloneNode()

      row.forEach(function(block, i) {
        // create outer block
        var blockElement = blockProto.cloneNode()
        blockElement.className += " gf-block-" + row.length
        blockElement.className += gf_styles.squareMode && !block.customHeight ? " square" : ""

        // create inner block
        var innerBlockElement = innerBlockProto.cloneNode()
        innerBlockElement.style.backgroundImage = block.imageURL ? "url(" + block.imageURL + ")" : ""
        innerBlockElement = addStyles(innerBlockElement, gf_styles.innerBlock)
        innerBlockElement = addStyles(innerBlockElement, block.style)

        // set block title
        var blockTitle = blockTitleProto.cloneNode()
        blockTitle.innerHTML = block.title || ""
        // If the block has the attribute nameBlock set to true, add things specific to the name block
        // Add the gf-block--inner--nameBlock
        if (block.nameBlock === true) {
          blockTitle.className += " gf-block--inner--nameBlock"
        }
        blockTitle = addStyles(blockTitle, gf_styles.blockTitle)
        var link = linkProto.cloneNode()
        if (block.link) {
          link.href = block.link
          link.appendChild(blockTitle)
          // Place a span inside the link
          link.appendChild(clickableSpanProto.cloneNode())
          blockTitle = link
        }

        // set block keywords
        var blockKeywords = blockKeywordsProto.cloneNode()
        if (block.keywords) {
          block.keywords.forEach(function(keyword, i) {
            var blockKeyword = blockKeywordProto.cloneNode()
            blockKeyword.innerHTML = keyword
            blockKeyword = addStyles(blockKeyword, gf_styles.keyword)
            blockKeywords.appendChild(blockKeyword)
          })
        }
        blockKeywords = addStyles(blockKeywords, gf_styles.keywords)


        // append the nested elements
        innerBlockElement.appendChild(innerBlockSpacer.cloneNode())
        innerBlockElement.appendChild(blockTitle)
        innerBlockElement.appendChild(blockKeywords)
        blockElement.appendChild(innerBlockElement)

        // Check for the backTitle and backText attributes
        if (block.backTitle || block.backText){
          // Add the flip container class to the rowElement
          rowElement.className += " gf-block--flip-container"
          // Add the flipper class to the blockElement
          blockElement.className += " gf-block--flip-container--flipper"
          // Add the flip front class to the inner block
          innerBlockElement.className += " gf-block--flip-container--front"
          // Construct a new innerBlockElement object
          var back = innerBlockProto.cloneNode()
          // Add the flip back class to the back element
          back.className += " gf-block--flip-container--back"
          back = addStyles(back, gf_styles.innerBlock)
          back = addStyles(back, block.backStyle)
          // Add back title and back text nodes
          var backTitle = backTitleProto.cloneNode()
          backTitle.innerHTML = block.backTitle || ""
          var backText = backTextProto.cloneNode()
          backText.innerHTML = block.backText || ""
          // Append these to the back
          back.appendChild(backTitle)
          back.appendChild(backText)
          // Add the back to the blockElement
          blockElement.appendChild(back)
        }

        rowElement.appendChild(blockElement)
      })

      // append the row to the container
      gridfolioContainer.appendChild(rowElement)
    }

    // if squareMode is on, make the width & height of the blocks equal
    if (gf_styles.squareMode) squareify()
  })

})

// re-calculate the dimensions on window resize
window.addEventListener("resize", squareify)