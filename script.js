const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        upadateFlag(evt.target);
    })
}

const upadateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    console.log("updated flag");
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 0) {
        amtValue = 1;
        amount.value = 1;
    }

    let fromCurrency = fromCurr.value.toLowerCase();
    let toCurrency = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurrency}.json`

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            let rate = data[fromCurrency][toCurrency];

            if(!rate){
                alert("Conversion rate not available!");
                return;
            }

            let final = (amtValue * rate).toFixed(2);

            document.querySelector(".msg").innerText = `Conversion Rate: 1 ${fromCurr.value} = ${rate.toFixed(2)} ${toCurr.value}`;

            document.querySelector(".result").innerText = `Result: ${amtValue} ${fromCurr.value} = ${final} ${toCurr.value}`;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        })
})