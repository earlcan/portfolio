// Renders the village map and the contents list from window.VILLAGE_POSTS.
// Links fill in automatically when a Medium post with the same title appears in posts.json.
(function () {
    const posts = window.VILLAGE_POSTS || [];
    const svg = document.getElementById('villageMap');
    const panel = document.getElementById('villagePanel');
    const toc = document.getElementById('villageToc');
    if (!posts.length) return;

    const NS = 'http://www.w3.org/2000/svg';
    const el = (name, attrs, parent) => {
        const node = document.createElementNS(NS, name);
        Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, v));
        if (parent) parent.appendChild(node);
        return node;
    };
    const two = n => String(n).padStart(2, '0');

    let nodes = [];
    let activeIdx = -1;

    function renderMap() {
        if (!svg) return;
        svg.textContent = '';

        // River crossing the bottom, under the bridge
        el('path', {
            d: 'M -20 545 C 200 505, 350 585, 520 545 S 850 505, 1020 560 L 1020 620 L -20 620 Z',
            class: 'village-river'
        }, svg);

        // Road through all points, smoothed with quadratic curves through midpoints
        let d = `M ${posts[0].x} ${posts[0].y}`;
        for (let i = 1; i < posts.length - 1; i++) {
            const mx = (posts[i].x + posts[i + 1].x) / 2;
            const my = (posts[i].y + posts[i + 1].y) / 2;
            d += ` Q ${posts[i].x} ${posts[i].y} ${mx} ${my}`;
        }
        const last = posts[posts.length - 1];
        d += ` L ${last.x} ${last.y}`;
        el('path', { d, class: 'village-road-bed' }, svg);
        el('path', { d, class: 'village-road' }, svg);

        nodes = posts.map((p, i) => {
            const g = el('g', {
                class: 'village-node' + (p.url ? ' is-live' : ''),
                tabindex: 0,
                role: 'button',
                'aria-label': `Post ${p.n}: ${p.title}`,
                transform: `translate(${p.x} ${p.y})`
            }, svg);
            el('circle', { r: 20, class: 'village-node-ring' }, g);
            const num = el('text', { class: 'village-node-num', y: 5 }, g);
            num.textContent = two(p.n);
            const label = el('text', { class: 'village-node-label', y: 46 }, g);
            label.textContent = p.place;

            g.addEventListener('click', () => show(i));
            g.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
            });
            return g;
        });

        // Start with the first unpublished post (or the first one) selected
        show(activeIdx >= 0 ? activeIdx : Math.max(0, posts.findIndex(p => !p.url)));
    }

    function show(i) {
        const p = posts[i];
        activeIdx = i;
        nodes.forEach(n => n.classList.remove('is-active'));
        nodes[i].classList.add('is-active');
        if (!panel) return;
        panel.textContent = '';

        const make = (tag, cls, text, parent) => {
            const n = document.createElement(tag);
            if (cls) n.className = cls;
            n.textContent = text;
            parent.appendChild(n);
            return n;
        };
        make('span', 'village-panel-meta', `No. ${two(p.n)} · ${p.layer}`, panel);
        const body = make('div', '', '', panel);
        make('h3', '', p.title, body);
        make('p', '', `${p.place}: ${p.topic}.`, body);
        if (p.url) {
            const a = make('a', 'village-panel-link', 'Read on Medium ↗', body);
            a.href = p.url;
            a.target = '_blank';
            a.rel = 'noopener';
        } else {
            make('span', 'village-panel-soon', `Publishes ${p.date}`, body);
        }
    }

    function renderToc() {
        if (!toc) return;
        toc.textContent = '';
        posts.forEach(p => {
            const li = document.createElement('li');
            const cell = (cls, text) => {
                const s = document.createElement('span');
                s.className = cls;
                s.textContent = text;
                li.appendChild(s);
                return s;
            };
            cell('toc-num', two(p.n));
            const title = cell('toc-title', '');
            if (p.url) {
                const a = document.createElement('a');
                a.href = p.url;
                a.target = '_blank';
                a.rel = 'noopener';
                a.textContent = p.title;
                title.appendChild(a);
            } else {
                title.textContent = p.title;
            }
            const topic = document.createElement('span');
            topic.className = 'toc-topic';
            topic.textContent = p.topic;
            title.appendChild(topic);
            cell('toc-layer', p.layer);
            cell('toc-date', p.date);
            toc.appendChild(li);
        });
    }

    const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

    document.addEventListener('medium:loaded', e => {
        const byTitle = new Map((e.detail || []).map(m => [norm(m.title), m.url]));
        let changed = false;
        posts.forEach(p => {
            const url = byTitle.get(norm(p.title));
            if (!p.url && url) { p.url = url; changed = true; }
        });
        if (changed) { renderMap(); renderToc(); }
    });

    renderMap();
    renderToc();
})();
