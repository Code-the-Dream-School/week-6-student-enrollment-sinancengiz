//student list to put student data inside it
students_list = []
// fecth student data
fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json")
.then(response => response.json())
.then(data => student_table_func(data))

// function to loop student data and put it in student list
function student_table_func(students_data){
    for(i=0; i< students_data.length; i++){
        dummy_dict = {
            name:students_data[i].name,
            last_name:students_data[i].last_name,
            status:students_data[i].status,
            id:students_data[i].id,
            courses:["Basic SQL"],
        }

        students_list.push(dummy_dict)
    }   
}

console.log(students_list)


const form = document.getElementById('form');
form.addEventListener('submit', form_submit);
// submit new student form
function form_submit(e){
    e.preventDefault();
    var nameValue = document.getElementById("fname").value;
    var lastNameValue = document.getElementById("lname").value;
    var activeValue = document.getElementById("active_select").value;

    current_students_name_list =[]
    for(i = 0; i< students_list.length;i++){
        current_students_name_list.push(students_list[i].name+" "+students_list[i].last_name)
    }
    if (current_students_name_list.includes(nameValue+" "+lastNameValue)){
        alert("student already excit in the database")
    }
    else{
        if(activeValue === 'true'){
            var status = true;
        }
        else{
            var status = false;
        }
        students_list.push({name:nameValue,last_name:lastNameValue,id:students_list.length,status:status,courses:[]})
        console.log(students_list)
        
        handle_students_function(students_list)
    }


}

var students = document.getElementById("students");

students.addEventListener("click", students_function);

function students_function(){
    // fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json")
    // .then(response => response.json())
    // .then(data => handle_students_function(data))
    handle_students_function(students_list)
}
// handle student function handles student data
function handle_students_function(students_data){
    var new_student_form = document.getElementById("form");
    new_student_form.style.display = "none";
    console.log(students_data)
    var the_table = document.getElementById("table")
    the_table.innerHTML = "";

    // students_data.push({name:"Sinan",last_name:"Cengiz",status:false,id:9})

    for(i=0; i< students_data.length; i++){
        var student_div = document.createElement("div")
        student_div.innerHTML = "";

        var h4_element = document.createElement("h4")
        h4_element.innerHTML = students_data[i].name+" "+students_data[i].last_name;
        h4_element.classList.add("h4_element")
        student_div.appendChild(h4_element)

        var active_element = document.createElement("p")
        if (students_data[i].status != false){
            active_element.classList.add("active")
            active_element.classList.add("col-3")
        }
        student_div.appendChild(active_element)

        var ul_element = document.createElement("ul")
        for(j=0; j < students_data[i].courses.length; j++){
            var li_element = document.createElement("li")
            li_element.innerHTML = students_data[i].courses[j];
            ul_element.appendChild(li_element)
        }
        student_div.appendChild(ul_element)

        var form_element = document.createElement("form")
        var select_element = document.createElement("select")
        select_element.setAttribute("id", "select_course"+students_data[i].id.toString());
        for(j=0; j < courses_list.length; j++){
                 var option_element = document.createElement("option")
                option_element.innerHTML = courses_list[j].name;
                select_element.appendChild(option_element)
        }

        var submit_course_button = document.createElement("button")
        submit_course_button.innerHTML = "Submit Course";
        submit_course_button.setAttribute("value", students_data[i].id.toString());
        submit_course_button.setAttribute("class", "btn btn-primary");
        submit_course_button.onclick = function (event) {
            event.preventDefault()
            document.getElementById("add_course_form"+event.srcElement.value).style.display = "none";
            document.getElementById(event.srcElement.value).style.display = "block";
            var e = document.getElementById("select_course"+event.srcElement.value);
            var dummy_course = e.options[e.selectedIndex].value;
            //find corresponding course id
            var corresponding_course_id = 0
            for(c=0; c < courses_list.length; c++){
                if(courses_list[c].name  == dummy_course){
                    corresponding_course_id = courses_list[c].id
                }
            }
            console.log(corresponding_course_id)

            if ( students_list[event.srcElement.value].courses.includes(dummy_course)){
                alert("This course is already taken by student")
                handle_students_function(students_list)
            }
            else if (courses_list[corresponding_course_id].students.length >= 3){
                alert("not more then 3 students can take this course is full")
                handle_students_function(students_list)
            }
            else if(parseInt(students_list[event.srcElement.value].courses.length) < 4){
                students_list[event.srcElement.value].courses.push(dummy_course)
                handle_students_function(students_list)

                for(s=0; s < courses_list.length; s++){
                    if(courses_list[s].name == dummy_course){
                        courses_list[s].students.push(students_data[event.srcElement.value].name+" "+students_data[event.srcElement.value].last_name)
                    }
                }
                console.log(courses_list)
            }else{
                alert("Student cannot take more then 4 courses")
                handle_students_function(students_list)
            }
           
        }

        form_element.appendChild(select_element)
        form_element.appendChild(submit_course_button)
        form_element.setAttribute("id", "add_course_form"+students_data[i].id.toString());
        form_element.style.display = "none";
        student_div.appendChild(form_element)

        if (students_data[i].status == true){
            var add_course_button = document.createElement("button")
            button_id = students_data[i].id.toString();
            add_course_button.setAttribute("id", button_id);
            add_course_button.innerHTML = "Add Course";
            add_course_button.classList.add("add_course_button")
            add_course_button.setAttribute("class", "btn btn-primary");
            add_course_button.onclick = function (event) {
                document.getElementById("add_course_form"+ event.srcElement.id).style.display = "block";
                document.getElementById(event.srcElement.id).style.display = "none";
                document.getElementById("edit"+event.srcElement.id).style.display = "none";

            }
            student_div.appendChild(add_course_button)

        }

        var edit_student_form = document.createElement("form")
        var student_name_label = document.createElement("LABEL")
        student_name_label.innerHTML = "First Name";
        var student_name_input = document.createElement("input")
        student_name_input.setAttribute("id", "student_name_input"+students_data[i].id.toString());
        student_name_input.setAttribute("value", students_data[i].name);
        var student_last_name_label = document.createElement("LABEL")
        student_last_name_label.innerHTML = "Last Name";
        var student_last_name_input = document.createElement("input")
        student_last_name_input.setAttribute("id", "student_last_name_input"+students_data[i].id.toString());
        student_last_name_input.setAttribute("value", students_data[i].last_name);
        var set_active_or_not = document.createElement("select")
        set_active_or_not.setAttribute("id", "select_active_or_not"+students_data[i].id.toString());
        var option_element = document.createElement("option")
        option_element.innerHTML = "Active";
        set_active_or_not.appendChild(option_element)
        var option_element = document.createElement("option")
        option_element.innerHTML = "Not Active";
        set_active_or_not.appendChild(option_element)
        var submit_edit_button = document.createElement("button")
        submit_edit_button.innerHTML = "Submit Edit";
        submit_edit_button.setAttribute("value", students_data[i].id.toString());
        submit_edit_button.setAttribute("class", "btn btn-primary");
        submit_edit_button.onclick = function (event) {
            event.preventDefault()
            var name_input = document.getElementById("student_name_input"+ event.srcElement.value).value
            students_list[event.srcElement.value].name = name_input
            var last_name_input = document.getElementById("student_last_name_input"+ event.srcElement.value).value
            students_list[event.srcElement.value].last_name = last_name_input
            //set student active or not
            students_list[event.srcElement.value].last_name = last_name_input
            var active_or_not = document.getElementById("select_active_or_not"+event.srcElement.value);
            var dummy_status = active_or_not.options[active_or_not.options.selectedIndex].value;
            if(dummy_status=="Active"){
                students_list[event.srcElement.value].status = true
                handle_students_function(students_list)
            }else{
                students_list[event.srcElement.value].status = false
                handle_students_function(students_list)
            }

            
        }
        edit_student_form.appendChild(student_name_label)
        edit_student_form.appendChild(student_name_input)
        edit_student_form.appendChild(student_last_name_label)
        edit_student_form.appendChild(student_last_name_input)
        edit_student_form.appendChild(set_active_or_not)
        edit_student_form.appendChild(submit_edit_button)
        edit_student_form.setAttribute("id", "edit_student_form"+students_data[i].id.toString());
        edit_student_form.classList.add("edit_info_form")
        edit_student_form.style.display = "none";
        student_div.appendChild(edit_student_form)

        var edit_info_button = document.createElement("button")
        edit_info_button.innerHTML = "Edit Info ";
        button_id = students_data[i].id.toString();
        edit_info_button.setAttribute("id", "edit"+button_id);
        edit_info_button.setAttribute("value", students_data[i].id.toString());
        edit_info_button.classList.add("edit_info_button")
        edit_info_button.setAttribute("class", "btn btn-primary");
        edit_info_button.onclick = function (event) {
            document.getElementById("edit_student_form"+ event.srcElement.value).style.display = "block";
            if(document.getElementById(event.srcElement.value)){
                document.getElementById(event.srcElement.value).style.display = "none";
            }
            
            document.getElementById("edit"+event.srcElement.value).style.display = "none";
        }
        student_div.appendChild(edit_info_button)
        student_div.classList.add("student_div")
        the_table.appendChild(student_div)
    }

    
}
// course list for courses data
courses_list = []
// fecth course data
fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json")
.then(response => response.json())
.then(data => courses_table_func(data))
// function to loop over course data end pu it in course list
function courses_table_func(courses_data){
    for(i=0; i< courses_data.length; i++){
        dummy_dict = {
            name:courses_data[i].name,
            duration:courses_data[i].duration,
            id:courses_data[i].id,
            students:["Sinan"],
        }

        courses_list.push(dummy_dict)
    }   
}

var courses = document.getElementById("Courses");
courses.addEventListener("click", courses_function);

function courses_function(){
    // fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json")
    // .then(response => response.json())
    // .then(data => handle_courses_function(data))
    handle_courses_function(courses_list)
}
// handle courses function handles courses
function handle_courses_function(courses_data){
    var new_student_form = document.getElementById("form");
    new_student_form.style.display = "none";

    var the_table = document.getElementById("table")
    the_table.innerHTML = "";


    for(i=0; i< courses_data.length; i++){
        var courses_div = document.createElement("div")
        courses_div.innerHTML = "";

        var h4_element = document.createElement("h4")
        h4_element.innerHTML = courses_data[i].name;
        courses_div.appendChild(h4_element)

        var duration_element = document.createElement("p")
        duration_element.innerHTML = courses_data[i].duration;
        courses_div.appendChild(duration_element)

        var ul_element = document.createElement("ul")
        for(j=0; j < courses_data[i].students.length; j++){
            var li_element = document.createElement("li")
            li_element.innerHTML = courses_data[i].students[j];
            ul_element.appendChild(li_element)
        }
        courses_div.appendChild(ul_element)

        var form_element = document.createElement("form")
        var select_element = document.createElement("select")
        select_element.setAttribute("id", "select_student"+courses_data[i].id.toString());
        for(j=0; j < students_list.length; j++){
            if(students_list[j].status == true){
                var option_element = document.createElement("option")
                option_element.innerHTML = students_list[j].name+" "+ students_list[j].last_name;
                select_element.appendChild(option_element)
            }
        }
        var submit_student_button = document.createElement("button")
        submit_student_button.innerHTML = "Submit Student";
        submit_student_button.setAttribute("value", courses_data[i].id.toString());
        submit_student_button.setAttribute("class", "btn btn-primary");
        submit_student_button.onclick = function (event) {
            event.preventDefault()
            document.getElementById("add_student_form"+event.srcElement.value).style.display = "none";
            document.getElementById(event.srcElement.value).style.display = "block";
            var e = document.getElementById("select_student"+event.srcElement.value);
            var dummy_student = e.options[e.selectedIndex].value;
            //find corresponding student id
            var corresponding_student_id = 0
            for(s=0; s < students_list.length; s++){
                if(students_list[s].name + " "+students_list[s].last_name == dummy_student){
                    corresponding_student_id = students_list[s].id
                }
            }
            console.log(corresponding_student_id)

            if ( courses_list[event.srcElement.value].students.includes(dummy_student)){
                alert("Student already exsit in the course")
                handle_courses_function(courses_list)
            }
            else if (students_list[corresponding_student_id].courses.length >= 3){
                alert("this student has 3 courses, cannot have more")
                handle_courses_function(courses_list)
            }
            else if(parseInt(courses_list[event.srcElement.value].students.length) < 3){
                courses_list[event.srcElement.value].students.push(dummy_student)
                handle_courses_function(courses_list)

                for(s=0; s < students_list.length; s++){
                    if(students_list[s].name + " "+students_list[s].last_name == dummy_student){
                        students_list[s].courses.push(courses_data[event.srcElement.value].name)
                    }
                }
                console.log(students_list)
            }else{
                alert("you can not add more then 3 student per course")
                handle_courses_function(courses_list)
            }              
            
        }

        form_element.appendChild(select_element)
        form_element.appendChild(submit_student_button)
        form_element.setAttribute("id", "add_student_form"+courses_data[i].id.toString());
        form_element.classList.add("add_student_form_class")
        form_element.style.display = "none";
        courses_div.appendChild(form_element)
         

        var add_student_button = document.createElement("button")
        add_student_button.innerHTML = "Add Student";
        button_id = courses_data[i].id.toString();
        add_student_button.setAttribute("id", button_id);
        add_student_button.classList.add("add_student_button")
        add_student_button.setAttribute("class", "btn btn-primary");
        add_student_button.onclick = function (event) {
            document.getElementById("add_student_form"+ event.srcElement.id).style.display = "block";
            document.getElementById(event.srcElement.id).style.display = "none";
        }
        courses_div.appendChild(add_student_button)
        
        courses_div.classList.add("courses_div")
        the_table.appendChild(courses_div)
    }
    
}


var new_student = document.getElementById("new_student");
new_student.addEventListener("click", postData);
// post new student data to database
function postData(e){
    e.preventDefault()
    fetch("https://student-challenge-api.herokuapp.com/student", 
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({name:"Sinan",last_name:"Cengiz"})
        }
    )
        .then(response => response.json())
        .then(data => console.log(data));

        handle_students_function(students_list)
    var new_student_form = document.getElementById("form");
    new_student_form.style.display = "block";
}



