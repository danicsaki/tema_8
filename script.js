let projects = []
let taskslists = []
let tasks = []

async function main() {
    // Get all Projects
    await fetch("https://app.paymoapp.com/api/projects/", {
            headers: {
                "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
            },
        })
        .then(res => res.json())
        .then(data => {
            projects.push(Object.values(data["projects"]))
        })

    // Get all Tasklists
    await fetch("https://app.paymoapp.com/api/tasklists/", {
            headers: {
                "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
            },
        })
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            taskslists.push(Object.values(data["tasklists"]))
        })

    // Get all Tasks
    await fetch("https://app.paymoapp.com/api/tasks/", {
            headers: {
                "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
            },
        })
        .then(res => res.json())
        .then(data => {
            tasks.push(Object.values(data["tasks"]))
        })

    projects.forEach(project => {
        project.forEach(project_element => {
            console.log(project_element.name)
            taskslists.forEach(task => {
                task.forEach(list_element => {
                    if (list_element.project_id == project_element.id) {
                        console.log("  " + list_element.name)
                        tasks.forEach(task => {
                            task.forEach(task_element => {
                                if (task_element.tasklist_id == list_element.id) {
                                    console.log("      " + task_element.name)
                                }
                            });
                        });
                    }
                });
            });
        });
    });
}

main()