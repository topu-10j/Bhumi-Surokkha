// স্ক্যান (ডেমো সিমুলেশন)
$('#sf').onchange = e => {
    F = e.target.files[0];
    if (!F) return;
    $('#sp').src = URL.createObjectURL(F);
    $('#sp').hidden = $('#sb').hidden = false;
    $('#sr').innerHTML = '';
};

$('#sb').onclick = () => {
    $('#sr').innerHTML = '🔍 এআই বিশ্লেষণ চলছে…';
    setTimeout(() => {
        const C = ['সরকারি সিল / ওয়াটারমার্ক', 'রেজিস্ট্রি নম্বর ফরম্যাট', 'দাগ ও খতিয়ান মিল', 'স্বাক্ষর ও তারিখ'].map((n, k) => [n, (F.size >> k) % 3 != 0]);
        const ok = C.filter(c => c[1]).length >= 3;
        $('#sr').innerHTML = `<div class="a" style="background:${ok ? '#f0fdf4' : '#fff1f1'}"><b>${ok ? '✅ সম্ভবত আসল দলিল' : '❌ জাল হওয়ার সম্ভাবনা বেশি'}</b></div>` +
            C.map(c => `<div class="bd"><span>${c[0]}</span><b>${c[1] ? '✔ মিলেছে' : '✘ সন্দেহজনক'}</b></div>`).join('') +
            '<small style="color:var(--m)">* ডেমো সিমুলেশন — আসল সিস্টেমে OCR + সরকারি ডেটাবেস যুক্ত হবে।</small>';
    }, 1800);
};

// উত্তরাধিকার (সরলীকৃত ইসলামি হিসাব)
function calc() {
    const m = $('#ig').value == 'm', a = +$('#ia').value || 0, s = +$('#iso').value || 0, d = +$('#ida').value || 0;
    if (s + d == 0) return $('#ir').innerHTML = '<div class="a">সন্তান না থাকলে হিসাব ভিন্ন হয় — আলেম/আদালতের পরামর্শ নিন।</div>';
    const R = []; let used = 0;
    const add = (n, f, c = 1) => { R.push([n, f, c]); used += f * c };
    if ($('#isp').checked) add(m ? 'স্ত্রী' : 'স্বামী', m ? 1 / 8 : 1 / 4);
    if ($('#ifa').checked) add('পিতা', 1 / 6);
    if ($('#imo').checked) add('মাতা', 1 / 6);
    const rest = 1 - used, u = s * 2 + d;
    if (s) add('প্রতি ছেলে', rest * 2 / u, s);
    if (d) add('প্রতি মেয়ে', rest / u, d);
    $('#ir').innerHTML = R.map(([n, f, c]) => `<div class="bd"><span>${n}${c > 1 ? ' (' + bn(c) + ' জন)' : ''}</span><b>${bn((f * 100).toFixed(2))}% = ${bn((f * a).toFixed(2))} শতাংশ</b></div>`).join('') +
        '<small style="color:var(--m)">* সরলীকৃত হিসাব (ছেলে:মেয়ে = ২:১)। চূড়ান্ত বণ্টনে আইনজীবী/আলেমের পরামর্শ নিন।</small>';
}