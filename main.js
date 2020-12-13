function header() {
    var html = 
    `
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <a href="index.html" class="name" style="text-decoration: none;">TAIGA <span class="font-weight-bold">TSUKADA</span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item ml-2"><a class="nav-link" href="index.html"> Home</a></li>
                <li class="nav-item ml-2"><a class="nav-link" href="about.html">About <span class="sr-only">(current)</span></a></li>
                <li class="nav-item ml-2"><a class="nav-link" href="research.html">Research</a></li>
                <li class="nav-item active ml-2"><a class="nav-link" href="publications.html">Publications</a></li>
                <li class="nav-item ml-2"><a class="nav-link" href="links.html">Link</a></li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item dropdown bg-light">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Language</a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                    <a class="dropdown-item" href="publications.html">
                        <img src="images/flags/Japan.png" class="flag-image-japan">
                        <span class="ml-2">日本語</span>
                    </a>
                    <a class="dropdown-item" href="publications_en.html">
                        <img src="images/flags/England.png" class="flag-image">
                        <span class="ml-2">English</span>
                    </a>
                </div>
                </li>
            </ul>
        </div>
    </nav>
    `
    document.write(html)
}

function footer() {
    var html = 
    `
    <footer class="footer bg-light d-flex align-items-center">
        <div class="container">
            <p class="text-center">© 2020 – Taiga Tsukada. Graduate School of Environmental Science, Hokkaido University. / Photo by Reo Tsukada.</p>
        </div>
    </footer>
    `
    document.write(html)
}