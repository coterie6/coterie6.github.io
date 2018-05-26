function onBodyLoad() {
    axios({
        url: "https://api.airtable.com/v0/appUAGkftlEA5caav/Locations",
        method: "get",
        headers: {
            "Authorization": "Bearer keyAgG52BdBvlu1p6"
        }
    }).then(function (response) {
        console.log(response);
        var records = response.data.records;
        console.log(records);
        for (var i = 0; i < records.length; i++) {
            console.log(i);
            var record = records[i];
            console.log(record);
            var recordId = record.id;
            var name = record.fields.Name;
            var option = document.createElement("option");
            option.id = recordId;
            option.innerHTML = name;
            document.getElementById("name-select").appendChild(option);
        }
    });
}

function onFormSubmit() {
    var nameSelect = document.getElementById("name-select");
    var recordId = nameSelect.options[nameSelect.selectedIndex].id;
    var newAddress = document.getElementById("address").value;
    var patchUrl = "https://api.airtable.com/v0/appUAGkftlEA5caav/Locations/" + recordId;
    axios({
        url: patchUrl,
        method: "patch",
        headers: {
            "Authorization": "Bearer keyAgG52BdBvlu1p6"
        },
        data: {
            fields: {
                "Address": newAddress
            }
        }
    }).then(function (response2) {
        console.log(response2);
        var groupMeMessage = "Heads up!  " + nameSelect.options[nameSelect.selectedIndex].innerHTML + " has just updated the Coterie 6 Map at https://whereintheworldiscoterie6.tk";
        axios({
            url: "https://api.groupme.com/v3/bots/post",
            method: "post",
            data: {
                "bot_id": "fb6991215228d4de434bc44cbc",
                "text": groupMeMessage
            }
        }).then(function (response3) {
            console.log(response3);
            var newContent = "<h2>Thank you for updating.</h2>";
            document.getElementById("form").innerHTML = newContent;
        });
    });
}
