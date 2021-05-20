import './App.css';
import HTML from "./Inputs/HTML/HTML"
import CSS from "./Inputs/CSS/CSS"
import React from 'react';
import RenderBox from './RenderBox/RenderBox';
import ImgSrc1 from "./Assets/1.png";
import ImgSrc2 from "./Assets/2.png";
import ImgSrc3 from "./Assets/3.png";
import ImgSrc4 from "./Assets/4.png";
import ImgSrc5 from "./Assets/5.png";
import ImgSrc6 from "./Assets/6.png";
import ImgSrc7 from "./Assets/7.png";
import ImgSrc8 from "./Assets/8.png";
import ImgSrc9 from "./Assets/9.png";
import ImgSrc10 from "./Assets/10.png";
import ImgSrc11 from "./Assets/11.png";
import ImgSrc12 from "./Assets/12.png";
import ImgSrc13 from "./Assets/13.png";


import ControlBox from './ControlBox/ControlBox';

const ImgSrc = [
  ImgSrc1,
  ImgSrc2,
  ImgSrc3,
  ImgSrc4,
  ImgSrc5,
  ImgSrc6, 
  ImgSrc7,
  ImgSrc8,
  ImgSrc9,
  ImgSrc10,
  ImgSrc11,
  ImgSrc12,
  ImgSrc13
]

const defaultCSS = `
.example {
  font-size: 50px; 
  color: rgb(18, 10, 74);
  margin: 20px 0px;
} 

.center { 
  text-align: center; 
} 

.full {
  width: 100%; 
  background-color: rgb(18, 10, 74); 
  padding: 25px;
}

.full > h3 {
  color: white;
}

#exampleImg {
  border: cornsilk 3px solid;
}
`

const defaultHTML = `<h1 class="example center">Write HTML and CSS to build a page similar to the image displayed!</h1>
<div class="center full">
  <img id="exampleImg" src="https://i.imgur.com/0dqdq3m.jpg" />
  <h3>Example image above</h3>
</div>`

class App extends React.Component {
  
  state={
    css: defaultCSS,
    html: defaultHTML,
    currentHTMLtoRender: "",
    currentCSStoRender: "",
    img: 1,
    display: "all"
  }

  download = () => {
    const fileName = prompt("It is recommended that you save this as a .html file. File name? ", "PracticeEngineMCarroll-temp"+this.state.img+".html");
    if(fileName === null){
      return
    }
    var element = document.createElement('a');
    // TRY DOWNLOADING AND UPLOADING HTML
    var htmlToSave = `
<!doctype html>
  <html>
    <!--IMAGE NUMBER BELOW LINKS YOUR CODE TO THE WEBSITE IMAGE ON THE APPLICATION-->
    <!--CHANGING THIS NUMBER WILL RESULT IN A DIFFERENT IMAGE BEING COMPARED TO YOUR RENDERED HTML-->
    <!--IF YOU WISH TO USE THE APPLICATION WITH YOUR OWN SCREENSHOT, YOU MAY ADD A URL IN PLACE OF THE NUMBER-->
    <!--IMAGE NUMBER: `+this.state.img+` -->
    <head>
      <title>`+ fileName +`</title>

      <style>`+
        this.state.css
      +`
      </style>
    </head>
    <body>`+
      this.state.html
    +`
    </body>
  </html>
    `
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlToSave));
    element.setAttribute('download', fileName);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  upload = async (e) => {
    e.preventDefault()
    let fileText = await e.target.files[0].text()
    console.log(fileText)

    let stylesArr = fileText.split("<style>")
    console.log(stylesArr)

    let styleStr = ""

    for(let i = 1; i < stylesArr.length; ++i){
      styleStr += stylesArr[i].split("</style>")[0]
    }

    console.log(styleStr)

    let body = fileText.split("<body>")[1]
    body = body.split("</body>")[0]

    console.log(body)

    let imgNum = fileText.split("<!--IMAGE NUMBER: ")[1]
    imgNum = imgNum.split(" -->")[0]

    

    if(isNaN(parseInt(imgNum))){
      ImgSrc.push(imgNum)
      imgNum = ImgSrc.length-1
    } else {
      imgNum = parseInt(imgNum)
      if(imgNum >= ImgSrc.length || imgNum < 0){
        
        do {
          imgNum = Math.floor(Math.random() * 12)
        } while (imgNum === this.state.img)
      }
    }

    this.setState({img: imgNum, html: body, css: styleStr}, () => {
      this.renderHTML()
      this.renderCSS()
    })

  }

  changeSite = () => {
    let newNum = this.state.img + 1
    if(newNum >= ImgSrc.length){
      newNum = 0
    }
    // do {
    //   newNum = Math.floor(Math.random() * 12)
    // } while (newNum === this.state.img)

    

    this.setState({img: newNum, html: defaultHTML, css: defaultCSS}, () => {
      this.renderHTML()
      this.renderCSS()
    })
    console.log(newNum)
  }

  componentDidMount() {
    this.changeSite()
    this.renderHTML()
    this.renderCSS()
  }

  changeCSS = (e) => {
    console.log(e)
    this.setState({css: e.target.value})
  }

  changeHTML = (e) => {
    console.log(e)
    
    this.setState({html: e.target.value})
  }

  changeDisplay = (num) => {
    this.setState({display: num})
  }

  renderCSS = () => {
    console.log("CSS")
    let tempCode = this.state.css.split("}")

    console.log(tempCode)
    let renderCode = ".touch " + tempCode.filter(Boolean).join("} .touch ")  + "}"
    renderCode = renderCode.split(/\n/).filter(Boolean).join("")
    console.log(renderCode)
    this.setState({currentCSStoRender: renderCode})
  }

  renderHTML = () => {
    console.log("HTML")
    this.setState({currentHTMLtoRender: `<div class="touch" >` + this.state.html + '</div>'})
  }
  
  render() {
    const articleContent = this.state.currentHTMLtoRender
    const styleSheet = this.state.currentCSStoRender

    let bodyOverflow = null
    let compsToRender = null //Add loading comp here

    //Add conditionals to check the value of this.state.display

    if(this.state.display === "all"){
      bodyOverflow = ` body {overflow: hidden;}`
      compsToRender = (
        <React.Fragment>
          <div className="inputsToRender inputQuarters">
            {/* inputs for HTML and CSS */}

            <CSS css={this.state.css} changeCSS={this.changeCSS.bind()} />

            <HTML html={this.state.html} changeHTML={this.changeHTML.bind()}/>  

          </div>
  

          <div className="renderBox renderQuarters">
            <div className="imgCorner">
              <div className="tempImg">
                <img src={ImgSrc[this.state.img]} />
              </div>
            </div>
            

            <RenderBox HTML={articleContent} />

          </div>
        </React.Fragment>
      )
    }

    if(this.state.display === "inp"){
      bodyOverflow = ` body {overflow: hidden;}`
      compsToRender = (
        <div className="inputsToRender displayFull">
          {/* inputs for HTML and CSS */}

          <CSS css={this.state.css} changeCSS={this.changeCSS.bind()} />

          <HTML html={this.state.html} changeHTML={this.changeHTML.bind()}/>  

        </div>
      )
    }

    if(this.state.display === "html"){
      compsToRender = (
        <div className="renderBox displayFull">
          <RenderBox HTML={articleContent} />
        </div> 
      )
    }

    if(this.state.display === "img"){
      compsToRender = (
        <div className="renderBox displayFull">
          <img src={ImgSrc[this.state.img]} />
        </div> 
      )
    }

    if(this.state.display === "img/html"){
      compsToRender = (
        <div className="renderBox displayFull overlay">
          <img src={ImgSrc[this.state.img]} />
          <RenderBox HTML={articleContent} />
        </div>
      )
    }

    return (
      <React.Fragment>
        <style>
          {styleSheet  + bodyOverflow}
        </style>
        <div className="App">
  
        <ControlBox dload={this.download} fileUpload={this.upload.bind()} changeDisplay={this.changeDisplay.bind()} changeSite={this.changeSite} display={this.state.display} renderCSS={this.renderCSS} renderHTML={this.renderHTML} />
          <div className="container">
            {compsToRender}
         
          </div> 
        </div>
      </React.Fragment>
      
    )
    
  }
  
}

export default App;
