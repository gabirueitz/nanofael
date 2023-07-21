const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTA7rpRQc8v8h1qR16Mi-47FZh0DqOrKN151lcVQ318ng4DFDfMGqvk5YtqJ1Q1KaQamRn7mQ90WI06/pub?output=csv'

$.ajax({
    type: "GET",
    url: url,
    success: function (result) {
        CSVdata = $.csv.toObjects(result);
        for (let i = 0; i < result.length; i++) {
            document.getElementById("studentsList").innerHTML +=
                '<div class="cards">' +
                '<div class="profile" style="background-image: url("' + CSVdata[i].Foto + '");"></div>' +
                '<h2>' + CSVdata[i].Nome + '</h2>' +
                '<p class="category">(' + CSVdata[i].Categoria + ')</p>' +
                '<p class="descricao">' + CSVdata[i].Texto + '</p>' +
                '<div class="buttons"><a href="' + CSVdata[i].Lattes + '" target="_blank"><i class="ai ai-lattes"></i> Lattes</a></div>' +
                '</div>';
        }
    }
});