var id = 0;
var btnSend = document.getElementById('btn-send');
var inputTask = document.getElementById('text-task');
var contentTask = document.getElementById('content-task');
var dataAllTask = [];
var emptyContent = `<tr>
                        <th scope="2">#</th>
                        <td>You don't have task.</td>
                        <td>No action</td>
                    </tr>`


btnSend.onclick = function() {
    var inputTaskValue = inputTask.value;
    dataAllTask[id] = createTaskObj(id, inputTaskValue);
    id++;
    // console.log(generateContentTask());
    refreshHtmlCode();
    // console.log(dataAllTask);
}

function refreshHtmlCode() {
    // remove empty element in array
    dataAllTask = dataAllTask.filter(function(el) {
        return el != null;
    });
    new Promise((resolve) => {
        console.log(dataAllTask);
        if (dataAllTask.length == 0) {
            console.log(dataAllTask.length);
            resolve(emptyContent);
        } else
            resolve(generateContentTask());
    }).then((htmlContentAllTask) => {
        //console.log(htmlContentAllTask);
        // console.log(contentTask.innerText.value);
        contentTask.innerHTML = htmlContentAllTask;
    }).catch(() => {
        console.error("ERROR PROMISE ln20");
    });
}

function generateContentTask() {
    return dataAllTask.reduce(function(accumulator, task) {
        // console.log(accumulator);
        var htmlContentTask = ` <tr>
                                    <th scope ="2">${task.id}</th>
                                    <td id="task${task.id}">${task.task}</td>
                                    <td>
                                        ${gennerateButtonAction(task.action[0],task.id)}
                                        ${gennerateButtonAction(task.action[1],task.id)}</td>
                                    </tr>`;
        return accumulator.concat(htmlContentTask);
    }, "");
}

function gennerateButtonAction(action, id) {
    return `<button onclick ="taskAction(this)" class="btn btn-primary mb-2" id="${id}"> ${action} </button>`
}

function taskAction(elm) {
    var indexAction = findIndexFromId(elm.id);
    if (elm.innerText === 'Delete') {

        if (indexAction != -1) {
            dataAllTask.splice(indexAction, 1);
            refreshHtmlCode();
            return;
        }
    } else if (elm.innerText === 'Edit') {
        var editContent = document.getElementById('task' + elm.id);
        editContent.contentEditable = true;
        editContent.focus();
        editContent.onblur = function() {
            afterEditTask(editContent, elm.id);
        };

        editContent.onkeypress = function(e) {
            if (e.key == 'Enter')
                afterEditTask(editContent, elm.id);
        }
    }

}

function afterEditTask(editContent, id) {
    editContent.contentEditable = false;
    var index = findIndexFromId(id);
    dataAllTask[index].task = editContent.innerText;

}

function findIndexFromId(id) {
    //console.log('id: ', id);
    for (let i = 0; i < dataAllTask.length; i++) {
        if (dataAllTask[i])
            if (dataAllTask[i].id == id) return i;
    }
    return -1;
}

function createTaskObj(id, task) {
    return {
        id: id,
        task: task,
        action: ["Edit", "Delete"],
    }
}