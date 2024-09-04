BASE_URL = 'https://2cqpsvakacq74y2axdh5o7fcj40vrnth.lambda-url.eu-west-3.on.aws/api/'

function getQuery() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const params = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
}

function loadTitle() {
    fetch('files/subjects.json')
    .then(
        (response) => {
            return response.json();
        }
    ).then((subjectJson) => {
        const titleElement = document.getElementById('title-h1');
        const engSubject = getQuery()['subject'];
        const subjects = subjectJson['subjects'];
        for(sub of subjects) {
            if (sub.eng==engSubject) {
                titleElement.textContent = sub.name;
                document.title += " | "+sub.name;
            }
        }
    });
}

function getFilesBySubject(subject) {
    const grade = getCookie('grade');
    var subject = getQuery()['subject'];
    const url = BASE_URL+'get_file_list?' + new URLSearchParams({
        'grade': grade,
        'subject': subject
    }).toString();

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
    })
}

function loadFiles() {
    getFilesBySubject();
}