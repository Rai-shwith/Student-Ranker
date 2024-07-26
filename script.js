let main = document.querySelector('main')

let mainForm = document.querySelector('.mainForm');
let actionButtons = document.querySelector('.actionButtons');

let addMore = document.querySelector('.addMore');
let arrange = document.querySelector('.arrange');

let unsortedStudentInfo = new Array()
let sortedStudentInfo = new Array()

let subFormHTMLString = `
                <div class="flex justify-evenly w-full gap-2 my-2 inputFields overflow-clip text-slate-900 font-medium">
                    <input type="text" placeholder="Name" required class="h-8 rounded indent-4 studentName w-5/12 bg-slate-400 focus:outline-none placeholder:text-slate-300">
                    <input type="number" placeholder="Marks" required min="0"
                        class="h-8 rounded indent-4 studentMarks w-5/12 bg-slate-400 focus:outline-none placeholder:text-slate-300">
                </div>
                <div class="cancelbtn bg-slate-400 cursor-pointer active:scale-125 rounded p-0.5" onclick="removeField(this)">
                    <img src="assets/images/cancel.svg" alt="" srcset="">
                </div>
            `;


addMore.addEventListener('click', () => {
    let subForm = document.createElement('form');
    subForm.innerHTML = subFormHTMLString;
    subForm.classList.add('w-full', 'subForm','flex','items-center');
    actionButtons.insertAdjacentElement('beforebegin', subForm);
})

arrange.addEventListener('click', () => {
    let allStudentArray = mainForm.querySelectorAll('.subForm');
    allStudentArray.forEach((studentData) => {
        let studentName = studentData.querySelector('.studentName').value;
        let studentMarks = studentData.querySelector('.studentMarks').value;
        unsortedStudentInfo.push([studentName, studentMarks]);
    })
    sortedStudentInfo = getRankersList(unsortedStudentInfo)
    updatePage(sortedStudentInfo)
})

function getRankersList(unsortedStudentInfo) {
    sortedStudentInfo = [...unsortedStudentInfo]
    sortedStudentInfo.sort((a, b) => b[1] - a[1])
    return sortedStudentInfo;
}

function updatePage(sortedStudentInfo) {
    main.querySelector('h2').innerHTML = 'Sorted List';
    let headingElement = main.querySelector('h2').cloneNode(true);
    headingElement.classList.add('mb-2');
    main.innerHTML = '';
    let tableMain = `
        <thead class="text-lg text-slate-500 h-10">
                <tr >
                    <th class="text-center border-gray-800 border w-16">Rank</th>
                    <th class="text-center border-gray-800 border">Name</th>
                    <th class="text-center border-gray-800 border">Marks</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `
    let table = document.createElement('table')
    table.classList.add('table-auto', 'w-full', 'border', 'border-black', 'bg-slate-400', 'border-collapse');
    table.innerHTML = tableMain;
    let tbody = table.querySelector('tbody')
    for (let index = 0; index < sortedStudentInfo.length; index++) {
        let rank = index + 1;
        if (sortedStudentInfo[index][0] == '' || sortedStudentInfo[index][1] == '') {
            sortedStudentInfo[index][0] = 'No Name';
            sortedStudentInfo[index][1] = 'No Marks';
        }
        let studentName = sortedStudentInfo[index][0];
        let studentMarks = sortedStudentInfo[index][1];
        let tableRow = `
        <td class="border border-gray-600 text-center rank" rowspan="1"></td>
        <td class="border border-gray-600 text-center name" rowspan="1"></td>
        <td class="border border-gray-600 text-center marks" rowspan="1"></td>
        `
        // if (index < sortedStudentInfo.length - 1) {
        //     if (sortedStudentInfo[index][1] == sortedStudentInfo[index + 1][1]) {
        //         let nextStudentName = sortedStudentInfo[index + 1][0];
        //         let nextStudentMarks = sortedStudentInfo[index + 1][1];
        //         let tableRowElement1 = document.createElement('tr');
        //         let tableRowElement2= document.createElement('tr');
        //         tableRowElement1.innerHTML = tableRow;
        //         tableRowElement2.innerHTML = tableRow;
        //         let tdArray = tableRowElement1.querySelectorAll('td')
        //         tdArray[0].innerHTML = rank;
        //         tdArray[0].setAttribute('rowspan', '2');
        //         tdArray[1].innerHTML = studentName;
        //         tdArray[2].innerHTML = studentMarks;
        //         tdArray[4].innerHTML = nextStudentName;;
        //         tdArray[5].innerHTML = nextStudentMarks;
        //         tbody.appendChild(tableRowElement);
        //         index += 1
        //     }
        //     else {
        //         let tableRowElement = document.createElement('tr');
        //         tableRowElement.innerHTML = tableRow;
        //         let tdArray = tableRowElement.querySelectorAll('td')
        //         tdArray[0].innerHTML = rank;
        //         tdArray[1].innerHTML = studentName;
        //         tdArray[2].innerHTML = studentMarks;
        //         tbody.appendChild(tableRowElement);
        //     }
        // } else {
        //     let tableRowElement = document.createElement('tr');
        //     tableRowElement.innerHTML = tableRow;
        //     let tdArray = tableRowElement.querySelectorAll('td')
        //     tdArray[0].innerHTML = rank;
        //     tdArray[1].innerHTML = studentName;
        //     tdArray[2].innerHTML = studentMarks;
        //     tbody.appendChild(tableRowElement);
        // }

        let tableRowElement = document.createElement('tr');
        tableRowElement.innerHTML = tableRow;
        let tdArray = tableRowElement.querySelectorAll('td')
        tdArray[0].innerHTML = rank;
        tdArray[1].innerHTML = studentName;
        tdArray[2].innerHTML = studentMarks;
        tbody.appendChild(tableRowElement);
    }
    table = setProperRank(table)
    main.appendChild(headingElement);
    main.appendChild(table);
    let restartButton = document.createElement('div')
    restartButton.classList.add('grid', 'p-2', 'mt-4', 'rounded-lg', 'btnSubmit', 'bg-slate-400', 'place-items-center', 'text-slate-100', 'active:bg-slate-400', 'cursor-pointer')
    restartButton.innerHTML = 'Restart'
    restartButton.setAttribute('onclick', 'location.reload()')
    main.appendChild(restartButton);
}

function setProperRank(table) {
    let tbody = table.querySelector('tbody');
    let rows = tbody.querySelectorAll('tr');
    let previousMarks = -1;
    let currentMarks;
    let previousRowRank;
    rows.forEach((row) => {
        currentMarks = parseFloat(row.querySelector('.marks').innerHTML);
        if (currentMarks == previousMarks) {
            let currentRowSpanOfPreviousRowRank = parseInt(previousRowRank.getAttribute('rowspan'));
            previousRowRank.setAttribute('rowspan', currentRowSpanOfPreviousRowRank + 1);
            row.querySelector('.rank').remove()
        } else {
            previousRowRank = row.querySelector('.rank')
        }
        previousMarks = currentMarks;
    })

    return table;
}

function removeField(cancelbtn){
    cancelbtn.parentNode.remove()
    
    
}