// ===== CONTENT: edit here, no HTML change needed =====
// Skills from your own project + this site. Add team-project tech only if you really used it.
const skills = ['Python', 'pandas', 'HTML5', 'CSS3', 'JavaScript', 'Git & GitHub'];
// Team-project stack, enable after you confirm your role:
// 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Next.js', 'Docker', 'XGBoost'

// role: fill in 1 line per project (blank = hidden). demo: blank = button hidden.
const projects = [
    {
        title: 'Razorpay Recon AI',
        desc: 'AI-assisted finance pipeline that reconciles settlements, audits fee and GST deductions, and allocates partial refunds.',
        details: 'Built for the Razorpay AI Buildathon 2026. Matches settlement records using fuzzy matching, flags fee and GST discrepancies, and splits partial refunds across orders.',
        tech: ['Python', 'pandas', 'rapidfuzz'],
        team: false,
        role: '',   // TODO e.g. "Built the fuzzy-matching engine and the HTML report."
        github: 'https://github.com/SmitKapadia13/razorpay-recon-ai',
        demo: ''
    },
    {
        title: 'RelayGrid',
        desc: 'Human-governed crisis-response engine that invalidates stale plans and re-plans automatically as evidence changes.',
        details: 'Built for the Dominion 2026 hackathon, Climate & Disaster Resilience track. Repo lives on a teammate\'s GitHub account.',
        tech: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'WebSockets'],
        team: true,
        role: '',   // TODO state your real contribution
        github: 'https://github.com/Sahil-Patel180/relaygrid',
        demo: ''
    },
    {
        title: 'MuleGraph',
        desc: 'Fraud-operations console that visualizes how funds move through possible mule-account networks.',
        details: 'Shows transaction flows between accounts as a network so analysts can spot suspected mule rings. Repo lives on a teammate\'s GitHub account.',
        tech: ['FastAPI', 'Next.js', 'Docker', 'XGBoost'],
        team: true,
        role: '',   // TODO state your real contribution
        github: 'https://github.com/Ashmipande-y/Mule_Graph',
        demo: ''
    }
];

// ===== helpers =====
const $ = (id) => document.getElementById(id);
const tagList = (items) => `<ul class="tags">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

// ===== render skills + projects =====
$('skills-grid').innerHTML = skills.map((s) => `<li>${s}</li>`).join('');

$('projects-grid').innerHTML = projects.map((p, i) => `
    <button class="card" data-index="${i}" aria-haspopup="dialog">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        ${tagList(p.team ? ['Team project', ...p.tech] : p.tech)}
    </button>`).join('');

// ===== project modal =====
const modal = $('modal');
$('projects-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const p = projects[card.dataset.index];
    $('modal-body').innerHTML = `
        <h3 id="modal-title">${p.title}</h3>
        <p>${p.details}</p>
        ${p.role ? `<p><strong>My role:</strong> ${p.role}</p>` : ''}
        ${tagList(p.team ? ['Team project', ...p.tech] : p.tech)}
        <div class="links">
            ${p.github ? `<a class="btn primary" href="${p.github}" target="_blank" rel="noopener">View code</a>` : ''}
            ${p.demo ? `<a class="btn ghost" href="${p.demo}" target="_blank" rel="noopener">Live demo</a>` : ''}
        </div>`;
    modal.showModal();
});
$('modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); }); // backdrop click

// ===== theme toggle =====
const root = document.documentElement;
const themeBtn = $('theme-toggle');
const syncThemeLabel = () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', `Switch to ${next} theme`);
};
themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    syncThemeLabel();
});
syncThemeLabel();

// ===== mobile menu =====
const nav = $('nav');
const menuBtn = $('menu-toggle');
const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '✕' : '☰';
};
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// ===== footer year =====
$('year').textContent = new Date().getFullYear();