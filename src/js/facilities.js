const path = "./src/images/equips/";

let sorted = equipments.sort((a, b) => a.name.localeCompare(b.name));

for (let i = 0; i < sorted.length; i++) {
    document.getElementById("equipList").innerHTML +=
        '<div class="equipCard">' +
        '<div class="photoFrame"><img src="' + path + sorted[i].photo + '" alt="Foto equipamento" class="equipament" /></div>' +
        '<div class="textInfo">' +
        '<h3>' + sorted[i].name + '</h3>' +
        '<br />' +
        '<div class="buttons"><a href="' + sorted[i].reserv + '" target="_blank"><i class="fa-regular fa-calendar"></i> Gostaria de usar esse equipamento!</a>' +
        '</div></div></div>';
}