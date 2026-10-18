function mic(cb) {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) return alert('Chrome ব্রাউজার ব্যবহার করুন বা লিখে দিন');
    const r = new R();
    r.lang = 'bn-BD';
    r.onresult = e => cb(e.results[0][0].transcript);
    r.start();
}

function say(t, me) {
    $('#log').innerHTML += `<div class="msg ${me ? 'me' : ''}">${t}</div>`;
    $('#log').scrollTop = 1e5;
    if (!me && !mute && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(t);
        u.lang = 'bn-BD';
        speechSynthesis.speak(u);
    }
}

function openBot() {
    $('#bot').hidden = false;
    if (S.area && !$('#map').hidden) {
        step = 'own';
        say('জমির মালিকের নাম বলুন');
    } else {
        step = 'd';
        say('কোন বিভাগ? ' + Object.keys(D).join(', '));
    }
}

function translateInput(text) {
    let lowerText = text.toLowerCase();
    for (let key in EN_MAP) {
        if (lowerText.includes(key)) {
            return EN_MAP[key];
        }
    }
    return text;
}

const fd = (a, t) => a.find(x => t.includes(x)) || a.find(x => x.includes(t));

function handle(t) {
    t = t.trim();
    if (!t) return;
    say(t, 1);
    
    let bnText = translateInput(t);
    let m;
    
    if (step == 'd') {
        m = fd(Object.keys(D), bnText);
        if (!m) return say('বুঝতে পারিনি, আবার বলুন');
        B.d = m; step = 'k';
        say('কোন জেলা? ' + Object.keys(D[m]).join(', '));
    } else if (step == 'k') {
        m = fd(Object.keys(D[B.d]), bnText);
        if (!m) return say('বুঝতে পারিনি, আবার বলুন');
        B.k = m; step = 'u';
        say('কোন উপজেলা/থানা? ' + D[B.d][m].join(', '));
    } else if (step == 'u') {
        m = fd(D[B.d][B.k], bnText);
        if (!m) return say('বুঝতে পারিনি, আবার বলুন');
        go('map'); 
        initMap(); 
        setArea(B.d, B.k, m);
        $('#bot').hidden = true; 
        step = 'own';
        $('#info').textContent = '✅ ম্যাপ খোলা হয়েছে। এখন 🎙️ চেপে মালিকের নাম বলুন।';
    } else if (step == 'own') {
        m = N.find(n => bnText.includes(n) || n.includes(bnText));
        if (!m) return say('এই নামে জমি পাইনি। আবার বলুন। উদাহরণ: ' + N.slice(0, 3).join(', '));
        hlOwner(m);
        say(`${m} নামে ${bn(S.hl.length)}টি জমি সবুজ করা হয়েছে। ম্যাপে জমিতে ট্যাপ করলে বিস্তারিত দেখবেন।`);
        setTimeout(() => $('#bot').hidden = true, 1800);
    }
}