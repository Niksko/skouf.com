function squareify(){var a=document.querySelectorAll(".gf-block.square"),b=Array.prototype.slice.call(a);b.forEach(function(a,b){a.style.height=a.clientWidth+"px"})}function addStyles(a,b){for(var c in b)a.style[c]=b[c];return a}var gridfolioContainer=document.getElementById("gridfolio"),linkProto=document.createElement("a"),rowProto=document.createElement("div");rowProto.className="gf-row";var blockProto=document.createElement("div");blockProto.className="gf-block";var innerBlockProto=document.createElement("div");innerBlockProto.className="gf-block--inner";var innerBlockSpacer=document.createElement("div");innerBlockSpacer.className="gf-block--inner--spacer";var blockTitleProto=document.createElement("div");blockTitleProto.className="gf-block--inner--title";var blockKeywordsProto=document.createElement("div");blockKeywordsProto.className="gf-block--inner--keywords";var blockKeywordProto=document.createElement("div");blockKeywordProto.className="gf-block--inner--keyword";var clickableSpanProto=document.createElement("span");clickableSpanProto.className="gf-block--link-span";var backTitleProto=document.createElement("div");backTitleProto.className="gf-block--flip-container--backTitle";var backTextProto=document.createElement("div");backTextProto.className="gf-block--flip-container--backText",requirejs(["gridfolio"],function(){gf_content.forEach(function(a,b){if("object"==typeof a){var c=rowProto.cloneNode();a.forEach(function(b,d){var e=blockProto.cloneNode();e.className+=" gf-block-"+a.length,e.className+=gf_styles.squareMode&&!b.customHeight?" square":"";var f=innerBlockProto.cloneNode();f.style.backgroundImage=b.imageURL?"url("+b.imageURL+")":"",f=addStyles(f,gf_styles.innerBlock),f=addStyles(f,b.style);var g=blockTitleProto.cloneNode();g.innerHTML=b.title||"",b.nameBlock===!0&&(g.className+=" gf-block--inner--nameBlock"),g=addStyles(g,gf_styles.blockTitle);var h=linkProto.cloneNode();b.link&&(h.href=b.link,h.appendChild(g),h.appendChild(clickableSpanProto.cloneNode()),g=h);var i=blockKeywordsProto.cloneNode();if(b.keywords&&b.keywords.forEach(function(a,b){var c=blockKeywordProto.cloneNode();c.innerHTML=a,c=addStyles(c,gf_styles.keyword),i.appendChild(c)}),i=addStyles(i,gf_styles.keywords),f.appendChild(innerBlockSpacer.cloneNode()),f.appendChild(g),f.appendChild(i),e.appendChild(f),b.backTitle||b.backText){c.className+=" gf-block--flip-container",e.className+=" gf-block--flip-container--flipper",f.className+=" gf-block--flip-container--front";var j=innerBlockProto.cloneNode();j.className+=" gf-block--flip-container--back",j=addStyles(j,gf_styles.innerBlock),j=addStyles(j,b.backStyle);var k=backTitleProto.cloneNode();k.innerHTML=b.backTitle||"";var l=backTextProto.cloneNode();l.innerHTML=b.backText||"",j.appendChild(k),j.appendChild(l),e.appendChild(j)}c.appendChild(e)}),gridfolioContainer.appendChild(c)}gf_styles.squareMode&&squareify()})}),window.addEventListener("resize",squareify);