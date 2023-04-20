updateData = {
    setupUserInterface: function () {
        var selectEls = [document.getElementById("LocSelect1"), document.getElementById("LocSelect2"),
            document.getElementById("LocSelect3")];
        var locationOptions = ["Location1", "Location2", "Location3", "Location4", "Location5"];
        var refactorButton = document.getElementById("RefactorButton");
        var xValues = ["Time 1","Time 2","Time 3","Time 4","Time 5"];

        var trs = [document.getElementById("tr1"), document.getElementById("tr2"),
        document.getElementById("tr3")];

        var data = {Location1:[1,2,3,3,2], Location2:[2,3,1,3,2], Location3:[3,3,3,3,3],
            Location4:[1,2,3,4,5], Location5:[1,3,1,3,2]};
        console.log("done");


        for (var i=0; i<3; i++)
        {
            let selectEl = selectEls[i];
            for (let i = 0; i < locationOptions.length; i++) {
                let option = locationOptions[i];
                let optionEl = document.createElement("option");
                optionEl.text = option;
                selectEl.add(optionEl, null);
            }
        }

        refactorButton.onclick = function (){
            let currentLocations = [document.getElementById("LocSelect1").value,
                document.getElementById("LocSelect2").value,
                document.getElementById("LocSelect3").value];

            callAPI("Location1");

            let newData = [];

            for (let i = 0; i<3; i++){
                let location = currentLocations[i];
                let locationData = data[location];
                let tds = trs[i].getElementsByTagName("td");
                newData[i] = locationData;

                for (var j=0; j<tds.length;j++)
                {
                    tds[j].innerHTML = locationData[j];
                }
            }

            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        data: newData[0],
                        borderColor: "red",
                        fill: false
                    }, {
                        data: newData[1],
                        borderColor: "green",
                        fill: false
                    }, {
                        data: newData[2],
                        borderColor: "blue",
                        fill: false
                    }, {
                        data: [4,4,4,4,4],
                        borderColor: "black",
                        fill: false
                    }]
                },
                options: {
                    legend: {display: false}
                }
            });
        }
        var callAPI = (locationName)=>{
            // instantiate a headers object
            var myHeaders = new Headers();
            // add content type header to object
            myHeaders.append("Content-Type", "application/json");
            // using built in JSON utility package turn object to string and store in a variable
            var raw = JSON.stringify({"locationName":locationName});
            // create a JSON object with parameters for API call and store in a variable
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            // make API call with parameters and use promises to get response
            fetch("https://nk3tvryab3.execute-api.ap-southeast-2.amazonaws.com/dev2", requestOptions)
                .then(response => response.text())
                .then(result => alert(JSON.parse(result).body))
                .catch(error => console.log('error', error));
        }

        const request = ( url, params = {}, method = 'GET' ) => {
            let options = {
                method
            };

            return fetch( url, options ).then( response => response.json()).then(result => alert(JSON.parse(result)));
        };
        const get = ( url, params ) => request( url, params, 'GET' );
    }
}

