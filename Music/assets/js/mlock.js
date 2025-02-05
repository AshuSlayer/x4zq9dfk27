// Disable right-click context menu
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('You cannot do that');
});

// Disable F12 key
window.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        alert("You cannot do that here.");
    }
});

// Disable Ctrl+Shift+I
window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
        e.preventDefault();
        alert("You cannot do that here.");
    }
});

// Disable Print Screen key
window.addEventListener('keydown', function (e) {
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        alert("You cannot do that here.");
    }
});
