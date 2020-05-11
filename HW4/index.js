
function viewJSON(what){
    var URL = what.URL.value;
    console.log(URL)
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", URL, false);
    xhttp.send(null);
    if (xhttp.status == 200) {
        // console.log(xhttp.responseText);
        jsonObj = JSON.parse(xhttp.responseText);
        jsonObj.onload = writeHTML(jsonObj);
        hWin = window.open("", "Assignment4", "height=800,width=600");
        hWin.document.write(html_text);
        hWin.document.close();
    }
    else{
        window.alert(xhttp.statusText);
    }    
}

function writeHTML(jsonObj) {
    html_text = "<html><head>HW4</head><body>"
    html_text += "<table border='2'><tr>"
    table_data = jsonObj.Mainline.Table
    if(table_data.hasOwnProperty('Row')){
        // get headers
        header = table_data.Header.Data
        for(var i = 0; i < header.length; i++) {
            line = "<th>"+header[i]+"</th>"
            html_text+=line
        }
        html_text += "</tr>"
        // get data
        buildings = table_data.Row
        for(var building_index = 0; building_index < buildings.length; building_index++) {
            row = "<tr>"
            current_building = buildings[building_index]
            var building_keys = Object.keys(current_building)
            for(var key_index = 0; key_index < building_keys.length; key_index++) {
                property = building_keys[key_index]
                if(property == "Hubs"){
                    line = "<td><ul>"
                    for(var hub_index = 0 ; hub_index<current_building[property]['Hub'].length; hub_index++){
                        line += "<li>"
                        if(hub_index == 0){
                            line += "<strong>"
                        }
                        line+= current_building[property]['Hub'][hub_index]

                        if(hub_index == 0){
                            line += "</strong>"
                        }
                        line += "</li>"
                    }
                    line += "</ul></td>"
                    row += line
                }
                else if(property == "Logo"){
                    line = "<td><img src='"+ current_building[property] +"' width='"+200+"' height='"+200+"'></td>"
                    row += line 
                }
                else if(property == "HomePage"){
                    line = "<td><a href='"+current_building[property]+"'>"+current_building[property]+"</td>"
                    row += line
                }
                else {
                    line = "<td>"+current_building[property]+"</td>"
                    row += line
                }  
            }
            row += "</tr>"
            html_text += row
        }
        html_text += "</table>"
    
    }
    else{
        html_text = "<h1>No Buildings found</h1>"
    }
        

}