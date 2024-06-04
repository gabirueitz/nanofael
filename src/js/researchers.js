const url =
	"https://docs.google.com/spreadsheets/d/e/2PACX-1vTA7rpRQc8v8h1qR16Mi-47FZh0DqOrKN151lcVQ318ng4DFDfMGqvk5YtqJ1Q1KaQamRn7mQ90WI06/pub?output=csv";

const urlPhoto = "https://drive.google.com/thumbnail?id=";
const photoSize = "&sz=w1000";
let n = 0;

$.ajax({
	type: "GET",
	url: url,
	success: function (result) {
		CSVdata = $.csv.toObjects(result);
		for (let i = 0; i < result.length; i++) {
			if (CSVdata[i].Categoria === "Pos-Doc") {
				const str = CSVdata[i].Foto;
				const photoId = str.split("=");
				const photoLink = urlPhoto + photoId[1] + photoSize;

				document.getElementById("studentsLists").innerHTML +=
					'<div class="photoCard">' +
					'<img src="' +
					photoLink +
					'" alt="Profile photo" />' +
					'<div class="textInfo">' +
					"<p>" +
					CSVdata[i].Nome +
					"</p>" +
					'<p class="category">(' +
					CSVdata[i].Categoria +
					")</p>" +
					'<div class="moreText">' +
					"<br />" +
					'<p class="advisor"><strong>Orientador:</strong> ' +
					CSVdata[i].Orientador +
					"</p>" +
					'<div class="buttons">' +
					'<a href="' +
					CSVdata[i].Lattes +
					'" target="_blank"><i class="ai ai-lattes"></i> Lattes</a>' +
					'<a href="' +
					CSVdata[i].Scholar +
					'" target="_blank"><i class="ai ai-google-scholar"></i> Google Scholar</a>' +
					"</div></div></div></div>";
			} else {
				n++;
			}
		}
	},
});