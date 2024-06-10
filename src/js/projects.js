const path = "./src/images/logos/";

let sorted = projects.sort((a, b) => a.title.localeCompare(b.title));

for (let i = 0; i < sorted.length; i++) {
	const fullPath = path + sorted[i].agency;
	document.getElementById(
		"projectsList"
	).innerHTML += `<div class="projectCard">
    <div class="photoFrame"><img src="${fullPath}" alt="Logo agencia"/></div>
        <div class="textInfo">
            <h3>${sorted[i].title}</h3>
            <p><strong>Processo:</strong> nº ${sorted[i].grant}</p>
            <p><strong>Vigência:</strong> de ${sorted[i].termStart} até ${sorted[i].termEnd}</p>
            <p><strong>Convênio:</strong> ${sorted[i].agreement}</p>
            <div class="buttons"><a href=" ${sorted[i].link}" target="_blank"><i class="fa-solid fa-circle-info"></i>Saiba mais aqui</a></p>
        </div>
    </div>`;
}
