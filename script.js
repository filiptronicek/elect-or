const dom = {
    democraticDiv: document.getElementById("vote-d"),
    republicanDiv: document.getElementById("vote-r")
};

const url = "https://www.politico.com/2020-national-results/balance-of-power.json";
const votesRequired = 270;

function updateStats(disco = document.getElementById("disco-mode").checked) {
    fetch(url).then(res => res.json()).then(responce => {
        const diff = {
            r: votesRequired - responce.president["called-r"],
            d: votesRequired - responce.president["called-d"],
        };

        dom.democraticDiv.innerText = diff.d;
        dom.republicanDiv.innerText = diff.r;

        const winner = (Object.keys(diff).reduce((a, b) => diff[a] < diff[b] ? a : b));
        const looser = (Object.keys(diff).reduce((a, b) => diff[a] > diff[b] ? a : b));

        if(diff[winner] < 1) {
            document.querySelector(`.peep-${looser}`).style.display = 'none';
            document.querySelector(`.results-${winner}`).innerText = "won";
        } 

        const winningColor = winner === 'd' ? "#00b0f3" : "#e9141e";
        document.querySelector("body").style.background = disco ? winningColor : "white";
        document.querySelector("body").style.color = disco ? "white" : "black";
        
    });
}

function updateSettings(el) {
    updateStats(el.checked);
}

updateStats();
setInterval(() => updateStats(), 2000);