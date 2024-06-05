const url =
	"https://docs.google.com/spreadsheets/d/e/2PACX-1vTA7rpRQc8v8h1qR16Mi-47FZh0DqOrKN151lcVQ318ng4DFDfMGqvk5YtqJ1Q1KaQamRn7mQ90WI06/pub?output=csv";

const urlPhoto = "https://drive.google.com/thumbnail?id=";
const photoSize = "&sz=w1000";
let n = 0;

//Construct Page
$.ajax({
	type: "GET",
	url: url,
	success: function (result) {
		CSVdata = $.csv.toObjects(result);
		let sorted = CSVdata.sort((a, b) => a.Nome.localeCompare(b.Nome));

		for (let i = 0; i < result.length; i++) {
			if (
				sorted[i].Categoria === "Pos-Doc" ||
				sorted[i].Categoria === "Professor Visitante"
			) {
				n++;
			} else {
				let category = "";

				if (sorted[i].Categoria === "Graduação") {
					sorted[i].category = "graduacao";
				} else if (sorted[i].Categoria === "Mestrado") {
					sorted[i].category = "mestrado";
				} else if (sorted[i].Categoria === "Doutorado") {
					sorted[i].category = "doutorado";
				}
				const str = sorted[i].Foto;
				const photoId = str.split("=");
				const photoLink = urlPhoto + photoId[1] + photoSize;

				document.getElementById("studentsLists").innerHTML +=
					'<div class="photoCard ' +
					sorted[i].category +
					'">' +
					'<img src="' +
					photoLink +
					'" alt="Profile photo" />' +
					'<div class="textInfo">' +
					"<p>" +
					sorted[i].Nome +
					"</p>" +
					'<p class="category">(' +
					sorted[i].Categoria +
					")</p>" +
					'<div class="moreText">' +
					"<br />" +
					'<p class="advisor"><strong>Orientador:</strong> ' +
					sorted[i].Orientador +
					"</p>" +
					'<div class="buttons">' +
					'<a href="' +
					sorted[i].Lattes +
					'" target="_blank"><i class="ai ai-lattes"></i> Lattes</a>' +
					'<a href="' +
					sorted[i].Scholar +
					'" target="_blank"><i class="ai ai-google-scholar"></i> Google Scholar</a>' +
					"</div></div></div></div>";
			}
		}
	},
});

//Select Category
const options = document.querySelectorAll('input[name="category"]');
for (let option = 0; option < options.length; option++) {
	options[option].addEventListener("change", (event) => {
		selectCategory();
	});
}

function selectCategory() {
	const categorySelected = document.querySelector(
		'input[name="category"]:checked'
	).id;
	const allCards = document.getElementsByClassName("photoCard");
	const toShow = document.getElementsByClassName(categorySelected);

	if (categorySelected === "todos") {
		for (let cardNumber = 0; cardNumber < allCards.length; cardNumber++) {
			allCards[cardNumber].classList.remove("hidden");
		}
		
	} else {
		for (let cardNumber = 0; cardNumber < allCards.length; cardNumber++) {
			allCards[cardNumber].classList.add("hidden");
		}

		for (let cardNumber = 0; cardNumber < toShow.length; cardNumber++) {
			toShow[cardNumber].classList.remove("hidden");
		}
	}
}
