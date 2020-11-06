const dom = {
    democraticDiv: document.getElementById("vote-d"),
    republicanDiv: document.getElementById("vote-r")
};

const url = "https://www.politico.com/2020-national-results/balance-of-power.json";
const votesRequired = 270;

function updateStats() {
    fetch(url).then(res => res.json()).then(responce => {
        const diff = {
            r: votesRequired - responce.president["called-r"],
            d: votesRequired - responce.president["called-d"],
        };
        dom.democraticDiv.innerText = diff.d;
        dom.republicanDiv.innerText = diff.r;
    });
}

updateStats();
setInterval(() => updateStats(), 2000);