/**
 * KYT Digital - Google TV Interactive Application Logic
 * PT. SOMIC INDONESIA - Maintenance Section
 */

// 1. Fungsi Pindah Layar Navigasi Tab (Screen 1, Screen 2, Screen 3)
function switchScreen(screenNum) {
    // Sembunyikan seluruh container layar aktif
    document.querySelectorAll('.screen-content').forEach(el => {
        el.classList.add('hidden');
    });

    // Tampilkan layar yang dipilih
    const targetScreen = document.getElementById(`screen-${screenNum}`);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }

    // Update styling tombol tab navigasi di header utama
    document.querySelectorAll('.nav-tab').forEach((btn, idx) => {
        if (idx + 1 === screenNum) {
            btn.className = "nav-tab px-6 py-3 rounded-lg text-xl font-bold transition flex items-center gap-3 bg-safety-orange text-white shadow-md";
        } else {
            btn.className = "nav-tab px-6 py-3 rounded-lg text-xl font-bold transition flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700";
        }
    });
}

// 2. Fungsi Setup Group Chip Selector Insiden (No. 3) yang Stabil (Grid 4 Kolom)
function setupChipGroup(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const chips = container.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Jika diklik chip biasa di grup insiden, sembunyikan kotak input custom
            if (chip.id !== 'btn-custom-insiden' && containerId === 'chip-container-insiden') {
                const box = document.getElementById('box-custom-insiden');
                if (box) box.classList.add('hidden');
                
                const btnCustom = document.getElementById('btn-custom-insiden');
                if (btnCustom) {
                    btnCustom.className = "chip-btn col-span-4 py-2 px-2 bg-amber-50 text-amber-900 font-extrabold rounded-lg text-xs border-2 border-amber-300 hover:border-safety-orange transition text-center flex items-center justify-center gap-1 shadow-sm";
                }
            }

            // Reset semua chip dalam grup ke status default
            chips.forEach(c => {
                if (c.id !== 'btn-custom-insiden') {
                    c.className = "chip-btn py-2 px-2 bg-white text-slate-800 font-extrabold rounded-lg text-xs border-2 border-slate-200 hover:border-safety-orange transition text-center shadow-sm";
                }
            });

            // Terapkan status aktif (Safety Orange)
            if (chip.id !== 'btn-custom-insiden') {
                chip.className = "chip-btn py-2 px-2 bg-safety-orange text-white font-extrabold rounded-lg text-xs border-2 border-safety-orange transition text-center shadow-sm";
            }
        });
    });
}

// 3. Toggle Input Box Custom Insiden (+ Lainnya) No. 3
function toggleCustomInsidenInput() {
    const box = document.getElementById('box-custom-insiden');
    const btnCustom = document.getElementById('btn-custom-insiden');
    const container = document.getElementById('chip-container-insiden');

    if (!box || !container) return;

    const chips = container.querySelectorAll('.chip-btn');
    chips.forEach(c => {
        if (c.id !== 'btn-custom-insiden') {
            c.className = "chip-btn py-2 px-2 bg-slate-50 text-slate-800 font-extrabold rounded-lg text-xs border-2 border-slate-200 hover:border-safety-orange transition text-center shadow-sm";
        }
    });

    btnCustom.className = "chip-btn col-span-4 py-2 px-2 bg-safety-orange text-white font-extrabold rounded-lg text-xs border-2 border-safety-orange transition text-center flex items-center justify-center gap-1 shadow-sm";

    box.classList.remove('hidden');
    const inputCustom = document.getElementById('input-insiden-custom');
    if (inputCustom) inputCustom.focus();
}

// 4. Fungsi Setup Group Chip Selector Mengenai Bagian (No. 4) yang Stabil (Grid 3 Kolom)
function setupBagianChipGroup() {
    const container = document.getElementById('chip-container-bagian');
    if (!container) return;

    const chips = container.querySelectorAll('.chip-bagian');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (chip.id !== 'btn-custom-bagian') {
                const box = document.getElementById('box-custom-bagian');
                if (box) box.classList.add('hidden');
                
                const btnCustom = document.getElementById('btn-custom-bagian');
                if (btnCustom) {
                    btnCustom.className = "chip-bagian col-span-3 py-2 px-2 bg-amber-50 text-amber-900 font-extrabold rounded-lg text-xs border-2 border-amber-300 hover:border-safety-orange transition text-center flex items-center justify-center gap-1 shadow-sm";
                }

                chips.forEach(c => {
                    if (c.id !== 'btn-custom-bagian') {
                        c.className = "chip-bagian py-2 px-1 bg-white text-slate-800 font-extrabold rounded-lg text-xs border-2 border-slate-200 hover:border-safety-orange transition text-center shadow-sm";
                    }
                });
                chip.className = "chip-bagian py-2 px-1 bg-safety-orange text-white font-extrabold rounded-lg text-xs border-2 border-safety-orange transition text-center shadow-sm";
            }
        });
    });
}

// 5. Toggle Input Box Custom Mengenai Bagian (+ Lainnya) No. 4
function toggleCustomBagianInput() {
    const box = document.getElementById('box-custom-bagian');
    const btnCustom = document.getElementById('btn-custom-bagian');
    const container = document.getElementById('chip-container-bagian');

    if (!box || !container) return;

    const chips = container.querySelectorAll('.chip-bagian');
    chips.forEach(c => {
        if (c.id !== 'btn-custom-bagian') {
            c.className = "chip-bagian py-2 px-1 bg-white text-slate-800 font-extrabold rounded-lg text-xs border-2 border-slate-200 hover:border-safety-orange transition text-center shadow-sm";
        }
    });

    btnCustom.className = "chip-bagian col-span-3 py-2 px-2 bg-safety-orange text-white font-extrabold rounded-lg text-xs border-2 border-safety-orange transition text-center flex items-center justify-center gap-1 shadow-sm";

    box.classList.remove('hidden');
    const inputCustom = document.getElementById('input-bagian-custom');
    if (inputCustom) inputCustom.focus();
}

// 6. Fungsi Upload & Preview Foto Bahaya KYT Instan
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById('photo-preview-img');
            const placeholder = document.getElementById('upload-placeholder');
            
            if (previewImg && placeholder) {
                previewImg.src = e.target.result;
                previewImg.classList.remove('hidden');
                placeholder.classList.add('hidden');
            }
        };
        reader.readAsDataURL(file);
    }
}

// 7. Custom Dropdown UI Member Pengisi
function toggleCustomDropdown() {
    const menu = document.getElementById('custom-dropdown-menu');
    const arrow = document.getElementById('dropdown-arrow');
    
    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('arrow-rotate');
    }
}

function selectMember(name, initial) {
    const nameLabel = document.getElementById('selected-member-name');
    const avatar = document.getElementById('member-avatar');
    
    if (nameLabel) nameLabel.textContent = name;
    if (avatar) avatar.textContent = initial;

    const items = document.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const itemText = item.querySelector('span').textContent;
        const checkIcon = item.querySelector('.check-mark');
        
        if (itemText === name) {
            if (checkIcon) checkIcon.classList.remove('hidden');
            item.classList.add('bg-orange-50');
        } else {
            if (checkIcon) checkIcon.classList.add('hidden');
            item.classList.remove('bg-orange-50');
        }
    });

    toggleCustomDropdown();
}

// 8. Custom Dropdown UI Shift A / Shift B
function toggleShiftDropdown() {
    const menu = document.getElementById('custom-shift-menu');
    const arrow = document.getElementById('shift-dropdown-arrow');
    
    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

function selectShift(shiftName) {
    const shiftText = document.getElementById('selected-shift-text');
    if (shiftText) shiftText.textContent = shiftName;

    const items = document.querySelectorAll('.shift-item');
    items.forEach(item => {
        const text = item.querySelector('span').textContent;
        const checkIcon = item.querySelector('.shift-check');
        const spanText = item.querySelector('span');
        
        if (text === shiftName) {
            if (checkIcon) checkIcon.classList.remove('hidden');
            if (spanText) spanText.className = "text-base font-extrabold text-amber-400";
        } else {
            if (checkIcon) checkIcon.classList.add('hidden');
            if (spanText) spanText.className = "text-base font-extrabold text-slate-200";
        }
    });

    toggleShiftDropdown();
}

// 9. Event Listener Global: Menutup Dropdown saat Klik Luar
document.addEventListener('click', function(event) {
    const memberBtn = document.getElementById('custom-dropdown-btn');
    const memberMenu = document.getElementById('custom-dropdown-menu');
    if (memberBtn && memberMenu && !memberBtn.contains(event.target) && !memberMenu.contains(event.target)) {
        memberMenu.classList.add('hidden');
        const arrow = document.getElementById('dropdown-arrow');
        if (arrow) arrow.classList.remove('arrow-rotate');
    }

    const shiftBtn = document.getElementById('custom-shift-btn');
    const shiftMenu = document.getElementById('custom-shift-menu');
    if (shiftBtn && shiftMenu && !shiftBtn.contains(event.target) && !shiftMenu.contains(event.target)) {
        shiftMenu.classList.add('hidden');
        const arrow = document.getElementById('shift-dropdown-arrow');
        if (arrow) arrow.classList.remove('rotate-180');
    }
});

// Inisialisasi saat DOM Selesai Dimuat
window.addEventListener('DOMContentLoaded', () => {
    setupChipGroup('chip-container-insiden');
    setupBagianChipGroup();
    setupChipGroup('chip-container-cedera');
});