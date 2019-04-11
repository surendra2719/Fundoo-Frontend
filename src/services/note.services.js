import axios from 'axios'


export function createNote(data) {
    console.log("create note call", data);

    return axios.post('/createNote', data, { headers: { "access-token": localStorage.getItem("token") } },

    )
}
export function getNotes() {
    return axios.get('/getNotes', {
        headers: { 'access-token': localStorage.getItem('token') }
    })
}
export function updateColor(data) {
    console.log("Scsafdsadas", data);

    return axios.put('/updateColor', data, {
        headers: {
            'access-token': localStorage.getItem('token')
        }

    });



}
export function updateArchives(data) {

    return axios.put('/isArchived', data, {
        headers: { 'access-token': localStorage.getItem('token') }

    })

}


export function isTrashed(data) {
    return axios.put('/isTrashed', data, {
        headers: {
            'access-token': localStorage.getItem('token')
        },
    })
}

export function updatePin(data) {
    return axios.put('/isPinned', data, {
        headers: {
            'access-token': localStorage.getItem('token')
        },
    })
}
export function setReminder(data) {
    console.log("sdsdsdAdadsa", data);

    return axios.put('/reminder', data, {
        headers: {
            'access-token': localStorage.getItem('token')
        },

    })
}
export function deleteNote(data) {
    return axios.post('/deleteNote', data, {
        headers: { 'access-token': localStorage.getItem('token') }

    })
}
export function updateTitle(data) {
    console.log("xsadasdasdsadsdsd", data);

    return axios.put('/editTitle', data, {
        headers: { 'access-token': localStorage.getItem('token') }

    })
}
export function updateDescription(data) {
    return axios.put('/editDescription', data, {
        headers: { 'access-token': localStorage.getItem('token') }

    })
}

export function updateImages(data) {
    var headers = {
        "access-token": localStorage.getItem("token"),
    }
    return axios.put('/uploadImage',
        data, {
            headers: headers
        }
    )
}

export function uploadProfilePic1(data) {
    var headers = {
        "access-token": localStorage.getItem("token"),
    }
    return axios.put('/setProfilePic1',
        data, {
            headers: headers
        }
    )
}
export function saveLabel(url,data) {
    return axios(url, {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
}
 export function addLabel(url,data) {
    console.log("create note call",data);
    
    return axios(url, {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
}
 export function getLabels() {
    return axios('/getLabels', {
        method: "GET",
        headers: {
            "access-token": localStorage.getItem("token")
        }
    }).then(function (response) {
        const result = response.data.data;
        return result;
    })
}   
 export function deleteLabel(data) {
    
    return axios('/deleteLabels', {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
} 
export function updateLabel(data) {
    return axios('/updateLabels', {
        method: "PUT",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
}


/*************************************************************************************************** */
export function remiderArray(notesData) {
    let reminderArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].reminder !== "" && !notesData[i].trash) {
            reminderArr.push(notesData[i]);
        }
    }

    return reminderArr;
}
export function archiveArray(notesData) {
    let archiveArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].archive) {
            archiveArr.push(notesData[i]);
        }
    }
    return archiveArr;
}
export function trashArray(notesData) {
    let trashArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].trash) {
            trashArr.push(notesData[i]);
        }
    }
    return trashArr;
}

export function otherArray(notesData) {
    let otherArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (!notesData[i].pinned && !notesData[i].archive && !notesData[i].trash) {
            otherArr.push(notesData[i]);
        }
    }
    return otherArr;
}
export function pinArray(notesData) {
    let pinArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].pinned) {
            pinArr.push(notesData[i]);
        }
    }
    return pinArr;
}
