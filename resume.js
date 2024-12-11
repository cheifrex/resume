function addNewWEField() {
    //console.log("Adding new field")

    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');    
    newNode.classList.add('weField');
    newNode.classList.add('mt-2');
    newNode.setAttribute('rows', 2);
    newNode.setAttribute('placeholder','Enter here');


    let weOb = document.getElementById('we')
    let weAddButtonOb = document.getElementById('weAddButton');

    weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewEQField() {
    //console.log("Adding new field")

    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');    
    newNode.classList.add('eqField');
    newNode.classList.add('mt-2');
    newNode.setAttribute('rows', 2);
    newNode.setAttribute('placeholder','Enter here');


    let eqOb = document.getElementById('eq')
    let eqAddButtonOb = document.getElementById('eqAddButton');

    eqOb.insertBefore(newNode, eqAddButtonOb);
}

function addNewIHField() {
    //console.log("Adding new field")

    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');    
    newNode.classList.add('ihField');
    newNode.classList.add('mt-2');
    newNode.setAttribute('rows', 2);
    newNode.setAttribute('placeholder','Enter here');


    let ihOb = document.getElementById('ih')
    let ihAddButtonOb = document.getElementById('ihAddButton');

    ihOb.insertBefore(newNode, ihAddButtonOb);
}    

// generating cv
function generateresume() {

    let nameField=document.getElementById('nameField').value;

    let nameT1=document.getElementById('nameT1');

    nameT1.innerHTML = nameField;

    document.getElementById('nameT2').innerHTML=nameField;

    //contact
    document.getElementById('contactT').innerHTML=document.getElementById('contactField').value;

    //address
    document.getElementById('addressT').innerHTML=document.getElementById('addressField').value;

    //facebook
    document.getElementById('fbT').innerHTML=document.getElementById('fbField').value;

    //insta
    document.getElementById('instaT').innerHTML=document.getElementById('instaField').value;

    //linked
    document.getElementById('linkedT').innerHTML=document.getElementById('linkedField').value;

    //objective
    document.getElementById('objectiveT').innerHTML=document.getElementById('objectiveField').value;

    // work experience
    let wes=document.getElementsByClassName('weField');

    let str = '';

    for(let e of wes) {
        str=str+`<li> ${e.value} </li>`;
    }

    document.getElementById('weT').innerHTML = str;

    //education qualifaction
    let eqs=document.getElementsByClassName('eqField');

    let str1 = '';

    for(let e of eqs) {
        str1+=`<li> ${e.value} </li>`;
    }

    document.getElementById('eqT').innerHTML = str1;

    let ihs=document.getElementsByClassName('ihField');

    let str2 = '';

    for(let e of ihs) {
        str2+=`<li> ${e.value} </li>`;
    }

    document.getElementById('ihT').innerHTML = str2;

    //setting image

    let file=document.getElementById('imgField').files[0];

    console.log(file);

    let reader=new FileReader();

    reader.readAsDataURL(file);

    console.log(reader.result);

    //set image to template
    reader.onloadend=function() {
        document.getElementById('imgTemplate').src=reader.result;
    }

    document.getElementById('cv-form').style.display='none';
    document.getElementById('cv-template').style.display='block';

}

//print resume
function printresume() {
    window.print();
}

async function generateresume() {
    const userInputs = {
        name: document.getElementById('nameField').value,
        contact: document.getElementById('contactField').value,
        address: document.getElementById('addressField').value,
        objective: document.getElementById('objectiveField').value,
        workExperience: Array.from(document.getElementsByClassName('weField')).map(field => field.value),
        education: Array.from(document.getElementsByClassName('eqField')).map(field => field.value),
        hobbies: Array.from(document.getElementsByClassName('ihField')).map(field => field.value),
    };

    const text = `
    Name: ${userInputs.name}
    Contact: ${userInputs.contact}
    Address: ${userInputs.address}
    Objective: ${userInputs.objective}
    Work Experience: ${userInputs.workExperience.join(", ")}
    Education: ${userInputs.education.join(", ")}
    Hobbies: ${userInputs.hobbies.join(", ")}
    `;

    try {
        const response = await fetch('http://127.0.0.1:5500/resume-generator.', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        document.getElementById('objectiveT').innerText = data.summary;
        document.getElementById('cv-template').style.display = 'block';
        document.getElementById('cv-form').style.display = 'none';
    } catch (error) {
        console.error("Error generating resume:", error);
        alert("Failed to generate resume. Please try again.");
    }
}

// Replace the existing button event
document.querySelector('.btn btn-primary btn-lg').setAttribute('onclick', 'generateresume()');
