domein = "https://tsukada-cs.github.io/tsukada/"
urlDict = {
    "jp":
        {
            "Home": domein + "index.html",
            "About": domein + "about.html",
            "Research": domein + "research.html",
            "Publications": domein + "publications.html",
        },
    "en":
    {
        "Home": domein + "index_en.html",
        "About": domein + "about_en.html",
        "Research": domein + "research_en.html",
        "Publications": domein + "publications_en.html",
    }
}

function header(pageName, lang) {
    function active(pageName, linkName) {
        if (pageName == linkName) { return "active" };
    }
    var html = 
    `
    <header>
        <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
            <a href="${urlDict[lang]['Home']}" class="name" style="text-decoration: none;">TAIGA <span class="font-weight-bold">TSUKADA</span></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ${active(pageName, "Home")} ml-2"><a class="nav-link" href="${urlDict[lang]['Home']}">Home</a></li>
                    <li class="nav-item ${active(pageName, "About")} ml-2"><a class="nav-link" href="${urlDict[lang]['About']}">About</a></li>
                    <li class="nav-item ${active(pageName, "Research")} ml-2"><a class="nav-link" href="${urlDict[lang]['Research']}">Research</a></li>
                    <li class="nav-item ${active(pageName, "Publications")} ml-2"><a class="nav-link" href="${urlDict[lang]['Publications']}">Publications</a></li>
                </ul>
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item dropdown bg-light">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Language</a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                        <a class="dropdown-item" href="${urlDict["jp"][pageName]}">
                            <img src="images/flags/Japan.png" class="flag-image-japan">
                            <span class="ml-2">日本語</span>
                        </a>
                        <a class="dropdown-item" href="${urlDict["en"][pageName]}">
                            <img src="images/flags/England.png" class="flag-image">
                            <span class="ml-2">English</span>
                        </a>
                    </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    `
    document.write(html)
}

function footer(lang) {
    // urlDict = {
    //     "jp": {
    //         "lab": "http://wwwoa.ees.hokudai.ac.jp/people/horinouchi-lab/index.htm",
    //     },
    //     "en": {
    //         "lab": "http://wwwoa.ees.hokudai.ac.jp/people/horinouchi-lab/index.en.htm",
    //     }
    // }
    var html = 
    `
    <footer class="footer bg-light d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <p class="text-center my-0"><a href="https://researchmap.jp/ttsukada?lang=${lang}" target="_blank" class="px-3">Researchmap</a><a href="https://orcid.org/0000-0003-2036-308X" target="_blank" class="px-3">ORCID</a><a href="https://github.com/tsukada-cs" target="_blank" class="px-3">GitHub</a></p> 
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-none d-sm-block">
                    <p class="text-center my-0">&copy; 2020 – Taiga Tsukada. Graduate School of Environmental Science, Hokkaido University. / Photo by Reo Tsukada.</p>
                </div>
                <div class="col-12 d-sm-none">
                    <p class="text-center my-0">&copy; 2020 – Taiga Tsukada. / Photo by Reo Tsukada.</p>
                </div>
            </div>
        </div>
    </footer>
    `
    document.write(html)
}

function preload() {
    $('<img src="images/covers/cover1.JPG".png">');
    $('<img src="images/covers/cover2.JPG".png">');
    $('<img src="images/covers/cover3.JPG".png">');
    $('<img src="images/covers/cover4.jpg".png">');
    $('<img src="images/covers/cover5.jpg".png">');
    $('<img src="images/covers/cover6.jpg".png">');
    $('<img src="images/covers/cover7.jpg".png">');
    $('<img src="images/covers/cover8.jpg".png">');
    $('<img src="images/covers/cover9.jpg".png">');
    $('<img src="images/covers/cover10.jpg".png">');
    $('<img src="images/covers/cover11.jpg".png">');
    $('<img src="images/covers/cover12.jpg".png">');
}