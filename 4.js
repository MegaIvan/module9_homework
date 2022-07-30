const button = document.querySelector('.btn');
const result = document.querySelector('.result');

function displayImage(imageUrl) { 
    let image = '';
    
    const imageBlock = `
    <div class="card">
      <img
        src="${imageUrl}"
        class="card-image"
      />
    </div>
    `;
    image = image + imageBlock;
  
    result.innerHTML = image;
}

function buttonOnClick() {
    let value1 = document.querySelector(".input1").value;
    let value2= document.querySelector(".input2").value;
    if ((isNaN(value1) || isNaN(value2)) 
        || ((value1 < 100 || value1 > 300) || (value2 < 100 || value2 > 300))) {
        result.textContent = "число вне диапазона от 100 до 300";
    } else {
        let url = `https://picsum.photos/${value1}/${value2}`;
        fetch(url).then((response) => {
            const binaryImage = response.blob();
            return binaryImage;
        })
        .then((imageBlob) => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            displayImage(imageObjectURL);
            console.log(imageObjectURL);
        })
    }
}

button.addEventListener("click", buttonOnClick);