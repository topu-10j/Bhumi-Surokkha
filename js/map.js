function parcels(sd) {
    const P = [];
    const cols = 10, rows = 10;
    const startX = 20, startY = 20;
    const cellW = 28, cellH = 32;
    const points = []; 

    for (let r = 0; r <= rows; r++) {
        points[r] = [];
        for (let c = 0; c <= cols; c++) {
            let px = startX + c * cellW;
            let py = startY + r * cellH;

            if (r > 0 && r < rows) py += (Math.random() - 0.5) * 8;
            if (c > 0 && c < cols) px += (Math.random() - 0.5) * 8;

            points[r][c] = [px, py];
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const i = r * cols + c;
            
            const a = points[r][c];
            const b = points[r][c + 1];
            const d = points[r + 1][c + 1];
            const e = points[r + 1][c];
            
            let t = 'own';
            if (i % 19 === 0) t = 'khas';
            else if (i % 23 === 0) t = 'mamla';

            const s = sd + i;
            const randomDag = 100 + Math.floor(Math.random() * 1900);
            
            const hist = RC.map((x, k) => ({ rec: x[0], yr: x[1], who: N[(s + k * 3) % 8], why: WHY[k] }));
            if (t == 'khas') {
                hist.forEach((h, k) => { 
                    h.who = k < 2 ? 'জমিদার/এস্টেট' : 'বাংলাদেশ সরকার'; 
                    h.why = k < 2 ? 'প্রথম রেকর্ড' : 'অধিগ্রহণ/খাস' 
                });
            }
            
            P.push({ 
                i, 
                dag: randomDag, 
                pts: [a, b, d, e], 
                cx: (a[0] + b[0] + d[0] + e[0]) / 4, 
                cy: (a[1] + b[1] + d[1] + e[1]) / 4, 
                t, 
                area: (10 + (s * 7) % 50), 
                owner: hist[4].who, 
                hist 
            });
        }
    }
    return P;
}

function opts(el, a) { el.innerHTML = a.map(x => `<option>${x}</option>`).join('') }

function initMap() {
    opts($('#sd'), Object.keys(D));
    $('#sd').onchange = () => {
        opts($('#sk'), Object.keys(D[$('#sd').value]));
        $('#sk').onchange();
    };
    $('#sk').onchange = () => opts($('#su'), D[$('#sd').value][$('#sk').value]);
    $('#sd').onchange();
    
    if (!LM) {
        const st = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' });
        const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Esri' });
        
        LM = L.map('lmap', { layers: [st] }).setView([23.8103, 90.4125], 13);
        L.control.layers({ '🗺️ রাস্তা': st, '🛰️ স্যাটেলাইট': sat }).addTo(LM);
        LG = L.layerGroup().addTo(LM);
    }
    
    $('#info').textContent = '📍 অনুগ্রহ করে বিভাগ, জেলা ও উপজেলা সিলেক্ট করে "ম্যাপ দেখুন" বাটনে ক্লিক করুন।';
    if (LG) LG.clearLayers();
    S.P = [];
}

function applyArea() { 
    const d = $('#sd').value;
    const k = $('#sk').value;
    const u = $('#su').value;
    if (!d || !k || !u) return alert("সব ঘর সিলেক্ট করুন");
    setArea(d, k, u); 
}

function setArea(d, k, u) {
    S.area = [d, k, u]; S.hl = []; S.sel = null;
    
    S.P = parcels([...u].reduce((a, c) => a + c.charCodeAt(0), 0) % 7);
    S.c = CO[u] || [23.8103, 90.4125];
    
    $('#info').textContent = `📍 ${d} বিভাগ › ${k} › ${u} — জমিতে ট্যাপ করুন`;
    
    if (LM) {
        LM.flyTo(S.c, 16, { duration: 1.5 });
        draw(); 
        setTimeout(() => fit(), 1600);
    }
}

const ll = (x, y) => [S.c[0] + (150 - y) * 2e-5, S.c[1] + (x - 160) * 2e-5];

function draw() {
    if (!LM) return;
    LG.clearLayers();
    if (S.P.length === 0) return; 

    S.P.forEach(p => {
        const h = S.hl.includes(p.i), s = S.sel == p.i;
        
        let col = '#475569'; 
        if (p.t == 'khas') col = '#ef4444'; 
        if (p.t == 'mamla') col = '#a855f7'; 
        if (h) col = '#10b981'; 

        L.polygon(p.pts.map(q => ll(...q)), { 
            color: s ? '#000' : col, 
            weight: s ? 3 : 1, 
            fillColor: col, 
            fillOpacity: h ? 0.6 : 0.15 
        })
        .addTo(LG)
        .on('click', () => show(p.i))
        .bindTooltip(bn(p.dag), { permanent: true, direction: 'center', className: 'dg' });
        
        if (p.t == 'mamla') {
            L.circle(ll(p.cx, p.cy), { 
                radius: 15, 
                color: '#7e22ce', 
                weight: 2, 
                fillColor: '#a855f7', 
                fillOpacity: 0.2, 
                interactive: false 
            }).addTo(LG);
        }
    });
    setTimeout(() => LM.invalidateSize(), 50);
}

function fit() { 
    if (S.P.length > 0) {
        LM.fitBounds(L.latLngBounds(S.P.flatMap(p => p.pts.map(q => ll(...q)))), { padding: [40, 40] }) 
    }
}

function locate() { 
    if (!LM) return; 
    LM.locate({ setView: true, maxZoom: 17 }); 
    LM.once('locationfound', e => L.marker(e.latlng).addTo(LG).bindPopup('📍 আপনি এখানে').openPopup()) 
}

function show(i) {
    S.sel = i; 
    draw();
    const p = S.P[i];
    const st = p.t == 'khas' ? '<span class="tag" style="background:#fee2e2;color:#b91c1c">সরকারি খাস জমি — কেনা-বেচা নিষেধ</span>' :
        p.t == 'mamla' ? '<span class="tag" style="background:#f3e8ff;color:#7e22ce">মামলাধীন — বিক্রয়/হস্তান্তর নিষেধ</span>' : '<span class="tag" style="background:#dcfce7;color:#166534">সাধারণ মালিকানা</span>';
    const unsafe = p.t != 'own' ? '<div class="a">🚫 এই জমি কিনবেন না/বিক্রি করবেন না।</div>' : '';
    
    sheet(`<b style="font-size:18px">দাগ নম্বর ${bn(p.dag)}</b> ${st}${unsafe}
    <div class="bd"><span>বর্তমান মালিক</span><b>${p.owner}</b></div>
    <div class="bd"><span>পরিমাণ</span><b>${bn(p.area)} শতাংশ</b></div>
    <h3>📜 মালিকানার ইতিহাস (খতিয়ান চেইন)</h3>
    ${p.hist.map(h => `<div class="tl"><b>${h.rec}</b> · ${bn(h.yr)}<br>মালিক: ${h.who}<br><small style="color:var(--m)">${h.why}</small></div>`).join('')}
    <a class="btn" target="_blank" href="https://dlrms.land.gov.bd">সরকারি পর্চা দেখুন</a>`)
}

function hlOwner(n) {
    S.hl = S.P.filter(p => p.owner == n).map(p => p.i);
    draw();
    $('#info').textContent = `✅ ${n} নামে ${bn(S.hl.length)}টি জমি সবুজ করা হয়েছে`;
}

function search() {
    const q = en($('#q').value.trim());
    if (!q) return;
    go('map');
    if (!LM) initMap();
    if (S.P.length === 0) {
        return alert('অনুগ্রহ করে আগে বিভাগ, জেলা ও থানা সিলেক্ট করে ম্যাপ দেখুন।');
    }
    const o = N.find(n => n.includes(q) || q.includes(n)), p = S.P.find(p => String(p.dag) == q);
    if (o) hlOwner(o);
    else if (p) show(p.i);
    else alert('এই এলাকায় কিছু পাওয়া যায়নি।');
}