const urlElton = "./src/papers/elton.csv";
const urlErnesto = "./src/papers/ernesto.csv";
const urlLucia = "./src/papers/lucia.csv";
let years = [];

function getPapers(callback) {
	$.ajax({
		type: "GET",
		url: urlElton,
		success: function (result) {
			const eltonPapers = $.csv.toObjects(result);

			$.ajax({
				type: "GET",
				url: urlErnesto,
				success: function (result) {
					const ernestoPapers = $.csv.toObjects(result);

					$.ajax({
						type: "GET",
						url: urlLucia,
						success: function (result) {
							const luciaPapers = $.csv.toObjects(result);
							const papers = eltonPapers.concat(ernestoPapers, luciaPapers);

							callback(papers);
						},
					});
				},
			});
		},
	});
}

getPapers(function (data) {
	let papers = data.sort((a, b) => b.Year.localeCompare(a.Year));

	for (let i = 0; i < papers.length; i++) {
		const paperList = document.getElementById("papersList");
		paperList.innerHTML += `<div class="citationEntry"><p class="numberEntry"></p><p class="citation"><span class="authors"> ${papers[i].Authors}</span> "<span class="title">${papers[i].Title}</span>". <span class="journal">${papers[i].Journal}</span>, vol. <span class="vol">${papers[i].Volume}</span>, <span class="year">${papers[i].Year}</span>. <span class="doi">DOI: <a href="${papers[i].Link}" target="_blank">${papers[i].DOI}</a></span>.</div>`;
	}
	numerate();
	listYears();
});

function numerate() {
	const citations = document.getElementsByClassName("numberEntry");
	for (let n = 0; n < citations.length; n++) {
		citations[n].innerHTML = n + 1 + ".";
	}
}

function listYears() {
	const yearField = document.getElementsByClassName("year");
	for (let n = 0; n < yearField.length; n++) {
		years[n] = yearField[n].innerText;
	}
	years = years.filter((value, index, array) => array.indexOf(value) === index);
	const yearOptions = document.getElementsByClassName("yearOption");
	for (let i = 0; i < years.length; i++) {
		yearOptions[i].setAttribute("value", years[i]);
		yearOptions[i].nextElementSibling.innerHTML = years[i];
	}
}

function formApply(event) {
	event.preventDefault();
	const filters = document.querySelectorAll('input[type="checkbox"]:checked');
	const citations = document.getElementsByClassName("citationEntry");

	for (let n = 0; n < citations.length; n++) {
		const text2search =
			citations[n].children[1].children[0].innerText +
			" " +
			citations[n].children[1].children[4].innerText;
		console.log(text2search);

		citations[n].classList.add("hidden");
		citations[n].classList.remove("num");

		if (filters.length === 0) {
			citations[n].classList.remove("hidden");
			citations[n].classList.add("num");
		} else {
			for (let option = 0; option < filters.length; option++) {
				const choice = filters[option].getAttribute("value");
				if (text2search.includes(choice)) {
					citations[n].classList.remove("hidden");
					citations[n].classList.add("num");
				}
			}
		}
	}
	renumerate();
}

function renumerate() {
	const toNumerate = document.getElementsByClassName("num");
	for (let n = 0; n < toNumerate.length; n++) {
		toNumerate[n].firstChild.innerHTML = n + 1 + ".";
	}
}

const form = document.querySelector("form");
form.addEventListener("submit", formApply);
