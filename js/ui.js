function go(id) {
    $$('.scr').forEach(s => s.hidden = s.id != id);
    $$('nav button').forEach(b => b.classList.toggle('on', b.dataset.g == id));
    if (id == 'map' && !S.area) initMap();
    if (id == 'map' && LM) setTimeout(() => LM.invalidateSize(), 60);
}

function sheet(h) {
    $('#shc').innerHTML = h;
    $('#ov').hidden = false;
}

function toggleMute(b) {
    mute = !mute;
    b.textContent = mute ? '🔇' : '🔊';
}

function notif() {
    sheet(`<b>🔔 নোটিফিকেশন</b>
    <div class="a" style="background:#f0fdf4;border-color:#bbf7d0">📢 ভূমি উন্নয়ন কর পরিশোধের শেষ তারিখ ৩০ চৈত্র</div>
    <div class="a" style="background:#eff6ff;border-color:#bfdbfe">🏛️ নামজারি আবেদনে নতুন নিয়ম কার্যকর</div>
    <div class="a">⚠️ আপনার এলাকায় ২টি জাল দলিলের রিপোর্ট পাওয়া গেছে</div>`);
}