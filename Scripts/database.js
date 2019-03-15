var datas = [];

//===========================================================================
//Input Page
//===========================================================================
var memberData = {
name: "",
email: ""
};

var memberArray = [];

function inputPageOnLoad()
{
    if(sessionStorage.getItem("datas") != null)
    {
        datas = JSON.parse(sessionStorage.getItem("datas"));
    }
    window.alert("Current situation:\n1. import csv from Mac will not read the last row \n2. havent tested on all machines/web browers");
}

function resetForm(){
    document.getElementById("memberForm").reset();
}

function viewData(){
    window.location.href = "output_page.html";
}

function submit() {
    var name = document.getElementById("first_name").value;
    var email = document.getElementById("email").value; 
    var phone = document.getElementById("phone").value;
    var major = document.getElementById("major").value;
    memberData = {
        name: "",
        email: "",
        phone: "",
        major:""
        };
	if(name !== "" && email !== ""){
		memberData.name = name;
		memberData.email = email;
		memberData.phone = phone;
		memberData.major = major;
		datas.push(memberData);
		document.getElementById("displayName").innerHTML = datas[datas.length - 1].name;
		document.getElementById("displayEmail").innerHTML = datas[datas.length - 1].email;
		document.getElementById("displayPhone").innerHTML = datas[datas.length - 1].phone;
		document.getElementById("displayMajor").innerHTML = datas[datas.length - 1].major;
    }else{
		window.alert("Enter name and email.")
	}
    
    sessionStorage.setItem("datas",JSON.stringify(datas));
    resetForm();
}

function changeBG(value)
{
    var bg;
    switch(value)
    {

        case 'bball':
			bg = "url('bball.png')";        
        break;
        case 'soccer':
            bg = "url('soccer.png')";
        break;
        case 'football':
            bg = "url('football.png')";
        break;
        case 'water':
            bg = "url('water.png')";
        break;
        case 'track':
            bg = "url('run.png')";
        break;
		case 'none':
			bg = null;
    }

    document.body.style.backgroundImage = bg;
}

function collapse()
{
	var button_text = document.getElementsByClassName("collapsible");
	var i;
	for (i = 0; i < button_text.length; i++){
		if(button_text[i].innerHTML==="Show Less"){
			button_text[i].innerHTML = "More Tools";
		}else{
			button_text[i].innerHTML = "Show Less";
		}
	}

	var contents = document.getElementById("moreTools");
	if(contents.style.display === "block") {
		contents.style.display = "none";
	}else{
		contents.style.display = "block";
	}
}





//===========================================================================
//Output Page
//===========================================================================

function display()
{
    datas = JSON.parse(sessionStorage.getItem("datas"));
    var keys = Object.keys(datas[0]);
    for(var x = 0; x < datas.length; ++x)
    {
        var content = "";
        //construct the string
        for(var y = 0; y < keys.length; ++y)
        {
            content += keys[y] + ": " + datas[x][keys[y]] + "\n";
        }
        content += "\n";
        var field = document.createElement("PRE"); 
        var text = document.createTextNode(content)//"name: "+ datas[x].name + "\nemail: " +datas[x].email +"\n\n");
        field.appendChild(text);
        //var br = document.createElement("BR"); 
        document.getElementById("display_window").appendChild(field);
        //document.getElementById("display_window").appendChild(br);
    }
}

function resetButton()
{
    datas = [];
    sessionStorage.setItem("datas",JSON.stringify(datas));
    location.reload();
}

function outputToCSV()
{
    if(datas === null || datas.length == 0 || datas === undefined)
    {
        window.alert("You don't have any data. Don't tell me you are the only one in your club. :<");
        return;
    }
    var csv = objectToCSVString(datas);
    if(csv != null)
    {
        csv = "data:text/csv;charset=utf-8," + csv;
        data = encodeURI(csv);
        //download file
        downLink = document.getElementById("dummy_download");
        downLink.setAttribute('href', data);
        downLink.setAttribute('download', 'export.csv');
        downLink.click();
    }
}

function objectToCSVString(data)
{
    if(data == null || data == [])
    {
        return null;
    }
    var csv = "";
    //add title
    keys = Object.keys(data[0]);
    csv += keys.join(",");
    csv += "\n";
    for(var x = 0; x <datas.length ; ++x)
    {
        csv += Object.values(data[x]).join(",");
        csv += "\n";
    }
    return csv;
}

function inputFromCSV()
{
    var fileInput = document.getElementById("csv_inputed").files[0];
    if(fileInput === undefined || fileInput.name.split(".")[1] != "csv")
    {
        window.alert("Wait, stop right there. Don't give me a file whose extension is not .csv")
        return;
    }
    var reader = new FileReader();
    reader.readAsBinaryString(fileInput);
    //wait until finish reading
    reader.onload = function () {
        var csv = reader.result;
        datas = CSVStringToObject(csv);
        //save datas and reload page
        sessionStorage.setItem("datas",JSON.stringify(datas));
        location.reload();
    };
    
}

function CSVStringToObject(csv)
{
    var lines = csv.split("\n");
    var keys = lines[0].trim().split(",");
    var result = [];
    //go thorugh all lines
    for(var x = 1; x < lines.length - 1; ++x)
    {
        //construct the object
        var obj = {};
        var values = lines[x].trim().split(",");
        for(var keyIndex = 0; keyIndex < keys.length; ++ keyIndex)
        {
            obj[keys[keyIndex]] = values[keyIndex];
        }
        result.push(obj);
    }
    
    return result;
}

function outputAsEmailString()
{
    var result = "";
    for(var x = 0; x < datas.length; ++x)
    {
        var temp = datas[x].email.trim();
        if(temp.length > 0)
            result += (temp + ",")
    }
    //print string to window
    document.getElementById("displayEmailString").textContent = result;
}

function goHome(){
    window.location.href = "index.html";
}