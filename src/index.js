// Utility method to remove classes
HTMLElement.prototype.removeClass = function(remove) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== remove) {
            newClassName += classes[i] + " ";
        }
    }
    // Need to trim to remove extra space
    this.className = newClassName.trim();
}

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

function flipperMouseoverListener() {
  console.log("mouseover")
  var flipper = document.querySelector(".gf-block--flip-container--flipper")
  // Remove the event listener so that we don't trigger again until we're ready
  flipper.removeEventListener("mouseover", flipperMouseoverListener)
  // Add the class that will make it animate
  flipper.className += " gf-block--flip-container--flipper-active"
  // Add an event listener for animation ending
  flipper.addEventListener("transitionend", flipperAnimationEndListener)
}

function flipperAnimationEndListener() {
  console.log('animationend')
  var flipper = document.querySelector(".gf-block--flip-container--flipper")
  // Add a mouseout event listener
  flipper.addEventListener("mouseout", flipperMouseOutListener);
  // Detect hover state. If the mouse is no longer hovering, fire a mouseout event
  var hoverStatus = document.querySelector(".gf-block--flip-container--flipper:hover")
  if (hoverStatus == null) {
    var mouseoutEvent = new Event('mouseout')
    flipper.dispatchEvent(mouseoutEvent)
  }
  // Remove the animationEndListener
  flipper.removeEventListener("transitionend", flipperAnimationEndListener)
}

function flipperMouseOutListener() {
  console.log('mouseout')
  var flipper = document.querySelector(".gf-block--flip-container--flipper")
  flipper.removeEventListener("mouseout", flipperMouseOutListener);
  // Remove the class active
  flipper.removeClass("gf-block--flip-container--flipper-active")
  // Add a listener for when the animation ends
  flipper.addEventListener("transitionend", flipperAddMouseoverListener)
}

function flipperAddMouseoverListener() {
  console.log('animation end 2')
  var flipper = document.querySelector(".gf-block--flip-container--flipper")
  flipper.removeEventListener("transitionend", flipperAddMouseoverListener)
  flipper.addEventListener("mouseover", flipperMouseoverListener)
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

        // Use Modernizr to detect webp compatible browsers and serve different images depending on what is supported
        Modernizr.on('webp', function(webp) {
          // If there's an imageURL at all
          if (block.imageURL) {
            // If webp is supported serve webp versions of the images
            if (webp.alpha) {
              var webpUrl = block.imageURL.replace(".png", ".webp");
              innerBlockElement.style.backgroundImage = "url(" + webpUrl + ")"
            }
            else {
              // otherwise see if jpegxr is supported
              Modernizr.on('jpegxr', function(result) {
                // If it is, serve jpegxr versions of the images
                if (result) {
                  var jpegxrUrl = block.imageURL.replace(".png", ".jxr");
                  innerBlockElement.style.backgroundImage = "url(" + jpegxrUrl + ")"
                }
                // Otherwise just serve the normal png version
                else {
                  innerBlockElement.style.backgroundImage = "url(" + block.imageURL + ")"
                }
              })
            }
          }
          // If there's no image then leave the background image style blank
          else {
            innerBlockElement.style.backgroundImage = ""
          }
        });

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
          // Add a listener to the blockElement
          blockElement.addEventListener("mouseover", flipperMouseoverListener)
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
