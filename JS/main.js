  let siteName = document.getElementById("siteName");
        let siteUrl = document.getElementById("siteUrl");
        let container;

        if (localStorage.getItem("urlList") == null) {
            container = [];
        } else {
            container = JSON.parse(localStorage.getItem("urlList"));
        }

        displayItems();

        function submit() {
            let nameError = document.getElementById("nameError");
            let urlError = document.getElementById("urlError");
            
            nameError.classList.remove('show');
            urlError.classList.remove('show');

            let isValid = true;

            if (siteName.value.trim() === "") {
                nameError.classList.add('show');
                isValid = false;
            }

            if (siteUrl.value.trim() === "") {
                urlError.classList.add('show');
                isValid = false;
            }

            if (isValid) {
                let site = {
                    name: siteName.value.trim(),
                    url: siteUrl.value.trim()
                };
                
                container.push(site);
                localStorage.setItem("urlList", JSON.stringify(container));
                displayItems();
                clear();
            }
        }

        function clear() {
            siteName.value = "";
            siteUrl.value = "";
        }

        function displayItems() {
            let bookmarkList = document.getElementById("bookmarkList");

            if (container.length === 0) {
                bookmarkList.innerHTML = `
                    <div class="empty-state">
                        <svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <h3>No bookmarks yet</h3>
                        <p>Add your first bookmark to get started!</p>
                    </div>
                `;
                return;
            }

            let html = "";
            for (let i = 0; i < container.length; i++) {
                html += `
                    <div class="bookmark-card">
                        <div class="card-body p-4">
                            <div class="row align-items-center">
                                <div class="col-12 col-md-8 mb-3 mb-md-0">
                                    <div class="bookmark-name">${container[i].name}</div>
                                    <div class="bookmark-url">${container[i].url}</div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="bookmark-actions d-flex gap-2 justify-content-md-end">
                                        <button class="btn btn-visit" onclick="visitSite(${i})">Visit</button>
                                        <button class="btn btn-delete" onclick="deleteItem(${i})">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            bookmarkList.innerHTML = html;
        }

        function deleteItem(index) {
            container.splice(index, 1);
            localStorage.setItem("urlList", JSON.stringify(container));
            displayItems();
        }

        function visitSite(index) {
            let url = container[index].url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            window.open(url, '_blank');
        }

        siteName.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                siteUrl.focus();
            }
        });

        siteUrl.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submit();
            }
        });