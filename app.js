

const tableBody = document.getElementById('table-body');
const form = document.getElementById('add-habit-form');


// CREATE ELEMENT AND RENDER CAFE
function renderCafe(doc){
    let habit = doc.data();
    let id = doc.id;
    let tr = document.createElement('tr');
    let rowData = `        
        <th>${habit.name}</th>
        <td>
            <label for='${id}-sunday'>
                <input type="checkbox" id='${id}-sunday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td>
            <label for='${id}-monday'>
                <input type="checkbox" id='${id}-monday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td>
            <label for='${id}-tuesday'>
                <input type="checkbox" id='${id}-tuesday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td>
            <label for='${id}-wednesday'>
                <input type="checkbox" id='${id}-wednesday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td>
            <label for='${id}-thursday'>
                <input type="checkbox" id='${id}-thursday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td>
            <label for='${id}-friday'>
                <input type="checkbox" id='${id}-friday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td class='last-col'>
            <label for='${id}-saturday'>
                <input type="checkbox" id='${id}-saturday' class='${id} box' />
                <span></span>
            </label>
        </td>
        <td class='cross'>
            <span id='${id}' class='cross'>x</span>
        </td>
    </tr>
    `;

    tr.setAttribute('data-id', doc.id);
    tr.innerHTML = rowData;
    tableBody.appendChild(tr);

    // UPDATING FIELD VALUES IN DOCS
    let boxes = document.querySelectorAll(`.${id}`);

    boxes.forEach(box => {
        box.addEventListener('change', (e) => {
            e.stopPropagation();
            
            let str = e.target.id;
            let arr = str.split('-');
            let docId = arr[0];
            let day = arr[1];
            let newVal = e.target.checked;
            
            console.log(docId, day, ', now: ', newVal);

            db.collection('habits').doc(docId).update({
                [`${day}`]: newVal
            });
        });
    });

    // DELETING DATA
    let cross = document.getElementById(`${id}`);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();

        let idX = e.target.getAttribute('id');
        if(confirm("Do you want to delete this habit?")){
            db.collection('habits').doc(idX).delete();
          }
    });
}

// GETTING DATA
// QUERY DATA w/ 'where(field, comparison operator, comparison value)
// db.collection('cafes').where('city', '==', 'Manchester').get().then((snapshot) => {
// ORDER DATA
// db.collection('cafes').where('city', '==', 'Manchester').orderBy('name').get().then((snapshot) => {
// JUST GET DATA
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// ADDING DATA
form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('habits').add({
        name: form.name.value,
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });
    form.name.value = '';
});

// REAL-TIME LISTENER
db.collection('habits').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // if(change.type == 'modified') {
        //     renderCafe(change.doc);
        // } else 
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed') {
            let tr = tableBody.querySelector('[data-id=' + change.doc.id + ']');
            tableBody.removeChild(tr);
        }
    });
});

// UPDATE CHECKED STATUS OF CHECKBOXES
db.collection('habits').get().then(doc => {
    doc.forEach(item => {
        // console.log(item.data().name, item.data().sunday, item.id);
        let boxId;
        // SUNDAYS
        boxId = `${item.id}-sunday`;
        if(item.data().sunday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().sunday == false) {
            document.getElementById(boxId).checked = false;
        }
        // MONDAYS
        boxId = `${item.id}-monday`;
        if(item.data().monday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().monday == false) {
            document.getElementById(boxId).checked = false;
        }
        // TUESDAYS
        boxId = `${item.id}-tuesday`;
        if(item.data().tuesday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().tuesday == false) {
            document.getElementById(boxId).checked = false;
        }
        // WEDNESDAYS
        boxId = `${item.id}-wednesday`;
        if(item.data().wednesday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().wednesday == false) {
            document.getElementById(boxId).checked = false;
        }
        // THURSDAYS
        boxId = `${item.id}-thursday`;
        if(item.data().thursday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().thursday == false) {
            document.getElementById(boxId).checked = false;
        }
        // FRIDDAYS
        boxId = `${item.id}-fridday`;
        if(item.data().fridday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().fridday == false) {
            document.getElementById(boxId).checked = false;
        }
        // SATURDAYS
        boxId = `${item.id}-saturday`;
        if(item.data().saturday == true){
            document.getElementById(boxId).checked = true;
        } else if(item.data().saturday == false) {
            document.getElementById(boxId).checked = false;
        }
    });
});