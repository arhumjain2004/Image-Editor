let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit :"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit :"%"
    } ,
    saturation:{
        value:100,
        min:0,
        max:200,
        unit :"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit :"deg"
        
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit :"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit :"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit :"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit :"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit :"%"
    },

}
const filtersContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtxt = imageCanvas.getContext("2d")
const resetButton = document.querySelector("#reset-btn")
const downloadBtn = document.querySelector("#download-btn")
const presetContainer = document.querySelector(".presets")
let file = null
let image = null

function createFilterElement(name,unit = "%",value,min,max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range";
    input.min = min;
    input.max= max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",(event) => {
    filters[name].value = input.value
    applyFilters()
    })

    return div

}
function createFilters(){
Object.keys(filters).forEach(key=>{
    const filterElement = createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max)
    filtersContainer.appendChild(filterElement)
})
}

createFilters()


imgInput.addEventListener("change",(event)=>{
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () =>{
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtxt.drawImage(img,0,0)
    }
})

function applyFilters(){
    canvasCtxt.clearRect(0,0,imageCanvas.width,imageCanvas.height)
    canvasCtxt.filter = ` brightness(${filters.brightness.value}${filters.brightness.unit})
     contrast(${filters.contrast.value}${filters.contrast.unit})
      saturate(${filters.saturation.value}${filters.saturation.unit})
       hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
          grayscale(${filters.grayscale.value}${filters.grayscale.unit})
         sepia(${filters.sepia.value}${filters.sepia.unit})
       opacity(${filters.opacity.value}${filters.opacity.unit})
         invert(${filters.invert.value}${filters.invert.unit})`
         .trim()
    
     canvasCtxt.drawImage(image,0,0)
     
}
resetButton.addEventListener("click", () =>{
   filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit :"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit :"%"
    } ,
    saturation:{
        value:100,
        min:0,
        max:200,
        unit :"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit :"deg"
        
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit :"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit :"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit :"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit :"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit :"%"
    },

}
  applyFilters()
  filtersContainer.innerHTML = ""
  createFilters()
})
downloadBtn.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download = "edited image.png"
    link.href = imageCanvas.toDataURL()
    link.click()

})

const presets = {
    drama: {
        brightness: 90,
        contrast: 150,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 95,
        contrast: 85,
        saturation: 80,
        hueRotation: 15,
        blur: 0,
        grayscale: 20,
        sepia: 60,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 100,
        contrast: 90,
        saturation: 70,
        hueRotation: 0,
        blur: 1,
        grayscale: 40,
        sepia: 50,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 80,
        contrast: 130,
        saturation: 85,
        hueRotation: -10,
        blur: 0,
        grayscale: 10,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    brightPop: {
        brightness: 120,
        contrast: 110,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    blackWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    invertedCool: {
        brightness: 100,
        contrast: 110,
        saturation: 120,
        hueRotation: 180,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 100
    }
};
Object.keys(presets).forEach(presetName=>{
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetContainer.appendChild(presetButton)
    presetButton.addEventListener("click",()=>{
        const preset = presets[presetName]
        Object.keys(preset).forEach(filterName =>{
        filters[filterName].value = preset[filterName]
        })
        applyFilters()
        filtersContainer.innerHTML = ""
         createFilters()
        
    })
})
