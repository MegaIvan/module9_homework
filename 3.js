const button = document.querySelector('.btn');
const result = document.querySelector('.result');

function displayResult(apiData) { 
    let cards = '';
    
    apiData.forEach(item => {
        const cardBlock = `
          <div class="card">
            <img
              src="${item.download_url}"
              class="card-image"
            />
            <p>${item.author}</p>
          </div>
        `;
        cards = cards + cardBlock;
    });
  
    result.innerHTML = cards;
}

function createXMRRequest(picNumber, callback) {
    var url = `https://picsum.photos/v2/list?limit=${picNumber}`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
          console.log('Статус ответа: ', xhr.status);
        } else {
          const result = JSON.parse(xhr.response);
          if (callback) {
            callback(result);
          }
        }
    };

    xhr.send();
}

function buttonOnClick() {
    const value = document.querySelector('input').value;
    if  (value < 1 || value > 10) {
        result.textContent = "число вне диапазона от 1 до 10"
    } else {
        createXMRRequest(value, displayResult);
    }
}

button.addEventListener("click", buttonOnClick);