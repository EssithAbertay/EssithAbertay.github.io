
function loadProjects() {
    fetch('./projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            console.log(data);
            var box

            // Loop through projects and create HTML
            data.forEach(project => {

                var highlighted = false;

                if(project.filter == "personal"){
                    box = document.getElementById('dynamic_personal_projects');
                }  
                else if (project.filter == "uni") {
                    box = document.getElementById('dynamic_uni_projects');
                }
                else if (project.filter == "highlighted"){
                    box = document.getElementById('dynamic_highlighted_projects');
                    highlighted = true;
                }
                const projectDiv = document.createElement('div');

                projectDiv.className = 'project-item'; 

                tagsHTML = '<div class="tag_container">';
                project.tags.forEach(tag => {
                tagsHTML += `<p class = "tag">${tag}</p>`;
                });

                tagsHTML += '</div>';
                console.log(tagsHTML);

                downloadBox = '';
                if(project.downloadLink != "") // check if the download link is empty
                {
                    downloadBox = `
                    <a href="${project.downloadLink}" style="text-decoration: none;">
                        <div class="download_button" style="display: flex; justify-content: center; ">
                            <img src="images/download.svg">
                            <p>Download this project</p>
                        </div>
                    </a>
                    `
                }

                videoBox = '';
                imageBox = '';


                // first bit is the button
                // second bit is the project info that will be made visible by the button
                if(highlighted == false)
                {    
                    
                    if(project.videoLink != "") // check if the video link is empty
                    {
                        videoBox = `
                        <iframe  style="border-radius: 16px; width: 100%; margin-bottom: 15px;" src="${project.videoLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        `
                    }
                    else if(project.image != "") // use an image if no video 
                    {
                        imageBox = `
                        <img src="${project.image}" style="width: 100%; margin-bottom: 15px; border-radius: 15px;">
                        `
                    }

                    projectDiv.innerHTML= `
                    <button onclick="handleDropdownClick('${project.id}')" style="width: 100%; border-radius: 16px; margin-bottom:15px">
                        <h3>${project.title}</h3>
                        <p>${project.subtitle}</p>
                    </button>

                    <div class = "project_block" id="${project.id}" style = "display: none;">
                        ${tagsHTML}
                        <p>Status: ${project.progress}</p>
                        ${videoBox}
                        ${imageBox}
                        <p>${project.description}</p>
                        ${downloadBox}
                    </div>
                `;
                }
                else
                {
                    videoBox = `<iframe  style="border-radius: 16px; width: 100%; height: 100%;margin-bottom: 15px;" src="${project.videoLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                    imageBox = `<img src="${project.image}" style="width: 100%; margin-bottom: 15px; border-radius: 15px;">`

                    console.log("HELLO!");
                    projectDiv.innerHTML= `
                    <div class="highlighted_project">
                        <div class = "highlighted_project_title">
                            <h2>${project.title}</h2>
                            ${project.subtitle}
                        </div>

                        <div class="flex">
                            <div class="overview_block">
                                ${imageBox}
                                ${downloadBox}
                                ${tagsHTML}
                            </div>

                            <div style="width: 60%; display: flex; flex-direction: column;">
                                ${videoBox}
                                <button onclick="handleDropdownClick('${project.id}')" style="width: 100%; border-radius: 16px; ">
                                    <p>More Info &#8626;</p>
                                </button>
                            </div>
                        </div>
                        <div id="${project.id}" style ="display: none; margin-top: 15px;">
                            <div class="flex">
                                <div class="description">
                                    <p>${project.description}</p>
                                </div>

                                <div class ="features">
                                    <p>${project.features}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
                
                box.appendChild(projectDiv);
            });
        })  
        .catch(error => console.error('Failed to fetch data:', error)); 
}

loadProjects();  


function handleDropdownClick(id) {
    var x = document.getElementById(id)
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
    else {
        x.style.display = "none";
    }
}

function handlePictureClick(){
    var face = document.getElementById("about_me_pic");
    face.src = "images/pic of me with gleeble.png";
}

function handleFixedSectionSwap(id){
    if(id === "abtme"){
        document.getElementById("fixed_section_cv").style.display = "none";
        document.getElementById("fixed_section_about_me").style.display = "inline-block";
            document.getElementById("fixed_section_blog").style.display = "none";
    }
    else if (id === "cv")
    {
        document.getElementById("fixed_section_cv").style.display = "inline-block";
        document.getElementById("fixed_section_about_me").style.display = "none";
        document.getElementById("fixed_section_blog").style.display = "none";
    }
    else if (id === "blog")
    {
        document.getElementById("fixed_section_cv").style.display = "none";
        document.getElementById("fixed_section_about_me").style.display = "none";
        document.getElementById("fixed_section_blog").style.display = "inline-block";
    }
}
