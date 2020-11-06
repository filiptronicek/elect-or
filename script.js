const dom = {
    democraticDiv: document.getElementById("vote-d"),
    republicanDiv: document.getElementById("vote-r")
};

const url = "https://cors-anywhere.herokuapp.com/www.politico.com/2020-national-results/balance-of-power.json";
const votesRequired = 270;

function updateStats() {
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
    });
}

updateStats();
setInterval(() => updateStats(), 2000);