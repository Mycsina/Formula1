const RSS_URL = `https://crossorigin.me/https://www.formula1.com/content/fom-website/en/latest/all.xml`;

$.ajax(RSS_URL, {
    accepts: {
        xml: "application/rss+xml"
    },

    dataType: "xml",

    success: function (data) {
        $(data)
            .find("item")
            .each(function () {
                const el = $(this);

                const template = `
                    <article>
                        <img src="${el.find("link").text()}/image/large.png alt="">
                        <h2>
                            <a href="${el.find("link").text()}" target="_blank" rel="noopener">
                            ${el.find("title").text()}
                            </a>
                        </h2>
                    </article>
                `;

                $("#storage").body.insertAdjacentHTML("beforeend", template)
            })
    }
})