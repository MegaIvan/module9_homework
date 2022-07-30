const button = document.querySelector('.btn');
const result = document.querySelector('.result');

function putImagesLinksToStorage(imagesData) {
    let dataArray = new Array();

    imagesData.forEach(element => {
        let imageInfo = {
            id: element.id,
            download_url: element.download_url,
            author: element.author
        }
        dataArray.push(imageInfo);
    })

    localStorage.setItem("imageData", JSON.stringify(dataArray));
}

function displayImages(imagesData) {
    let images = '';

    imagesData.forEach(element => {
        const imageBlock = `
        <div class="card">
          <img
            id="${element.id}"
            src="${element.download_url}"
            alt="${element.author}"
            class="card-image"
          />
        </div>
        `;
        images = images + imageBlock;
    });

    result.innerHTML = images;

   putImagesLinksToStorage(imagesData);//Я знаю, что при перезагрузке страницы данные снова записываются в localStorage, 
                                        //но это те же самые данные. А писать еще точно такую же функцию выше, но без
                                        //putImagesLinksToStorage(imagesData), которую я бы вызывал после перезагрузки страницы я не стал, т.к. 
                                        //дублирование кода - плохо. 
}


function buttonOnClick() {
    let value1 = document.querySelector(".input1").value;
    let value2= document.querySelector(".input2").value;

    let numberNotValid = value1 < 1 || value1 > 10 || isNaN(value1);
    let limitNotValid = value2 < 1 || value2 > 10 || isNaN(value2);

    if (numberNotValid && limitNotValid) {
        result.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
    } else if (numberNotValid) {
        result.textContent = "Номер страницы вне диапазона от 1 до 10";
    } else if (limitNotValid) {
        result.textContent = "Лимит вне диапазона от 1 до 10";
    } else {
        let url = `https://picsum.photos/v2/list?page=${value1}&limit=${value2}`;
        fetch(url).then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            displayImages(data);   
        })
        .catch(() => { console.log("error") });
    }
}

button.addEventListener("click", buttonOnClick);

//Если страница перезагружается, берем картинки из хранилища
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info( "This page was reloaded" );

    let imageString = localStorage.getItem("imageData");
    if (imageString != null) {
        let imageData = JSON.parse(imageString);
        displayImages(imageData);
    }
} 