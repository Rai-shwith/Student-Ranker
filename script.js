let main = document.querySelector('main')

let mainForm = document.querySelector('.mainForm');
let actionButtons = document.querySelector('.actionButtons');

let addMore = document.querySelector('.addMore');
let arrange = document.querySelector('.arrange');

let unsortedStudentInfo = new Array()
let sortedStudentInfo = new Array()

let subFormHTMLString = `
                <div class="flex justify-evenly w-full gap-2 my-2 inputFields overflow-clip">
                    <input type="text" placeholder="Name" required class="h-8 rounded indent-4 studentName w-5/12">
                    <input type="number" placeholder="Marks" required min="0"
                        class="h-8 rounded indent-4 studentMarks w-5/12">
                </div>
            `;


addMore.addEventListener('click', () => {
    let subForm = document.createElement('form');
    subForm.innerHTML = subFormHTMLString;
    subForm.classList.add('w-full', 'subForm');
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
    sortedStudentInfo.sort((a, b) => a[1] - b[1])
    return sortedStudentInfo;
}

function updatePage(sortedStudentInfo) {
    main.querySelector('h2').innerHTML = 'Sorted List';
    let headingElement = main.querySelector('h2').cloneNode(true);
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
    table.classList.add('table-auto', 'w-full', 'border', 'border-black', 'bg-slate-200');
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
        <td class="border border-gray-600 text-center" ></td>
        <td class="border border-gray-600 text-center"></td>
        <td class="border border-gray-600 text-center"></td>
        `
        // needs to be fixed
        // if (sortedStudentInfo[index][1] == sortedStudentInfo[index + 1][1]) {
        //     let nextStudentName = sortedStudentInfo[index + 1][0];
        //     let nextStudentMarks = sortedStudentInfo[index + 1][1];
        //     let tableRowElement = document.createElement('tr');
        //     tableRowElement.innerHTML = tableRow;
        //     tableRowElement.innerHTML += tableRow;
        //     let tdArray = tableRowElement.querySelectorAll('td')
        //     tdArray[0].innerHTML = rank;
        //     tdArray[0].setAttribute('rowspan', '2');
        //     tdArray[1].innerHTML = studentName;
        //     tdArray[2].innerHTML = studentMarks;
        //     tdArray[4].innerHTML = nextStudentName;;
        //     tdArray[5].innerHTML = nextStudentMarks;
        //     tbody.appendChild(tableRowElement);
        //     index += 1
        // }
        // else {
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
    main.appendChild(headingElement);
    main.appendChild(table);
    let restartButton  = document.createElement('div')
    restartButton.classList.add('grid','p-2','mt-4','rounded-lg','btnSubmit','bg-slate-50','place-items-center','textsl500','active:bg-slate-400')
    restartButton.innerHTML = 'Restart'
    restartButton.setAttribute('onclick','location.reload()')
    main.appendChild(restartButton);


}