function login() {
    const n = $('#ln').value.trim();
    const p = $('#lp').value.trim();
    if (!n || !/^01\d{9}$/.test(en(p))) {
        return alert('সঠিক নাম ও ১১ ডিজিট মোবাইল নম্বর দিন');
    }
    U = { name: n, phone: en(p) };
    localStorage.setItem('u', JSON.stringify(U));
    boot();
}

function logout() {
    if(confirm("লগআউট করবেন?")) {
        localStorage.removeItem('u');
        U = null;
        location.reload();
    }
}

function saveP() {
    U = { name: $('#pn').value, phone: $('#pp').value };
    localStorage.setItem('u', JSON.stringify(U));
    alert('সংরক্ষিত হয়েছে ✅');
    $('#un').textContent = U.name;
}