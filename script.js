// Loads Medium posts from posts.json (kept fresh by .github/workflows/medium.yml).
// Renders them as a list where #posts exists, and tells the village map about them.
(function () {
    const list = document.getElementById('posts');
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const fmt = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' });

    function entry(p) {
        const li = document.createElement('li');
        li.className = 'entry';
        const a = document.createElement('a');
        a.href = p.url;
        a.target = '_blank';
        a.rel = 'noopener';

        const date = document.createElement('span');
        date.className = 'entry-date';
        date.textContent = fmt.format(new Date(p.date));
        const body = document.createElement('span');
        const title = document.createElement('span');
        title.className = 'entry-title';
        title.textContent = p.title;
        const excerpt = document.createElement('span');
        excerpt.className = 'entry-excerpt';
        excerpt.textContent = p.excerpt;
        body.append(title, excerpt);
        a.append(date, body);
        if (p.image) {
            const img = document.createElement('img');
            img.className = 'entry-img';
            img.src = p.image;
            img.alt = '';
            img.loading = 'lazy';
            a.appendChild(img);
            li.classList.add('has-img');
        }
        li.appendChild(a);
        return li;
    }

    fetch('posts.json')
        .then(r => r.ok ? r.json() : [])
        .then(posts => {
            document.dispatchEvent(new CustomEvent('medium:loaded', { detail: posts }));
            if (!list) return;
            if (!posts.length) throw new Error('empty');
            posts.slice(0, 5).forEach(p => list.appendChild(entry(p)));
        })
        .catch(() => {
            if (list) list.innerHTML = '<li class="entries-empty">Posts are on Medium for now.</li>';
        });
})();
