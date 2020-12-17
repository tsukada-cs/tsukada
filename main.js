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

function footer() {
    var html = 
    `
    <footer class="footer bg-light d-flex align-items-center">
        <div class="container">
            <p class="text-center my-0">© 2020 – Taiga Tsukada. Graduate School of Environmental Science, Hokkaido University. / Photo by Reo Tsukada.</p>
        </div>
    </footer>
    `
    document.write(html)
}