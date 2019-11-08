import React, {Component} from 'react';
import './App.css';
import Nav from './componenets/Nav/Nav'
import Logo from './componenets/Logo/Logo'
import ImageLinkForm from './componenets/ImageLinkForm/ImageLinkForm'
import Rank from './componenets/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './componenets/FaceRecognition/FaceRecognition'

const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }

const app = new Clarifai.App({
  apiKey : process.env.REACT_APP_CLARIFAI_API_KEY
})
  

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box})
  }

  onInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
      input: e.target.value
    })
  }

  onSubmit = () => {
    console.log('click')
    this.setState({
      imageUrl: this.state.input
    })
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
        // const faces = response.outputs[0].data.regions.map((face)=> face.region_info.bounding_box)
        // const test_face = response.outputs[0].data.regions[0].region_info.bounding_box
      .catch(err => console.log(err))
      )
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Nav />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    )
  }
}

export default App;
