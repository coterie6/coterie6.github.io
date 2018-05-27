function onBodyLoad() {
    axios({
        url: "https://api.airtable.com/v0/appUAGkftlEA5caav/People",
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

function onLocationSubmit() {
    var nameSelect = document.getElementById("name-select");
    var recordId = nameSelect.options[nameSelect.selectedIndex].id;
    var newAddress = document.getElementById("address").value;
    var patchUrl = "https://api.airtable.com/v0/appUAGkftlEA5caav/People/" + recordId;
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
            var newContent = "<h2>Thank you for updating your location.</h2>";
            document.getElementById("locationForm").innerHTML = newContent;
        });
    });
}

function autoFillGPS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(parseGPSPosition);
    } else {
        alert("Your browser does not support location services.");
    }
}

function parseGPSPosition(position) {
    var geocoder = new google.maps.Geocoder();
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var latLng = {
        lat: latitude,
        lng: longitude
    };
    geocoder.geocode({
        'location': latLng
    }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById("address").value = results[0].formatted_address;
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

function onJobSubmit() {
    var nameSelect = document.getElementById("name-select");
    var recordId = nameSelect.options[nameSelect.selectedIndex].id;
    var newJob = document.getElementById("jobTitle").value;
    var patchUrl = "https://api.airtable.com/v0/appUAGkftlEA5caav/People/" + recordId;
    axios({
        url: patchUrl,
        method: "patch",
        headers: {
            "Authorization": "Bearer keyAgG52BdBvlu1p6"
        },
        data: {
            fields: {
                "Job Title": newJob
            }
        }
    }).then(function (response2) {
        console.log(response2);
        var newContent = "<h2>Thank you for updating your job title.</h2>";
        document.getElementById("jobForm").innerHTML = newContent;
    });
}

function onEmailSubmit() {
    var nameSelect = document.getElementById("name-select");
    var recordId = nameSelect.options[nameSelect.selectedIndex].id;
    var newEmail = document.getElementById("email").value;
    var patchUrl = "https://api.airtable.com/v0/appUAGkftlEA5caav/People/" + recordId;
    axios({
        url: patchUrl,
        method: "patch",
        headers: {
            "Authorization": "Bearer keyAgG52BdBvlu1p6"
        },
        data: {
            fields: {
                "Email": newEmail
            }
        }
    }).then(function (response2) {
        console.log(response2);
        var newContent = "<h2>Thank you for updating your email.</h2>";
        document.getElementById("emailForm").innerHTML = newContent;
    });
}

function onPhoneSubmit() {
    var nameSelect = document.getElementById("name-select");
    var recordId = nameSelect.options[nameSelect.selectedIndex].id;
    var newPhone = document.getElementById("phoneNumber").value;
    var patchUrl = "https://api.airtable.com/v0/appUAGkftlEA5caav/People/" + recordId;
    axios({
        url: patchUrl,
        method: "patch",
        headers: {
            "Authorization": "Bearer keyAgG52BdBvlu1p6"
        },
        data: {
            fields: {
                "Phone": newPhone
            }
        }
    }).then(function (response2) {
        console.log(response2);
        var newContent = "<h2>Thank you for updating your phone number.</h2>";
        document.getElementById("phoneForm").innerHTML = newContent;
    });
}
