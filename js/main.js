function boot(keep) {
    const splash = document.getElementById('splash');
    
    setTimeout(() => {
        splash.classList.add('fade-out');
        
        setTimeout(() => {
            splash.style.display = 'none';
            $('#login').hidden = !!U;
            $('#main').hidden = !U;
            
            if (U) {
                $('#un').textContent = U.name;
                $('#pn').value = U.name;
                $('#pp').value = U.phone;
                if (!keep) go('home');
            }
        }, 500); 
    }, 3000); 
}

boot();