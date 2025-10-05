let selectedAvatar = '👤';
let selectedColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
let currentCategory = 'people';

// Category switching
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        currentCategory = this.dataset.category;

        // Show/hide avatars based on category
        document.querySelectorAll('.avatar-option').forEach(option => {
            if (option.dataset.category === currentCategory) {
                option.style.display = 'flex';
            } else {
                option.style.display = 'none';
            }
        });
    });
});

// Avatar selection
document.querySelectorAll('.avatar-option').forEach(option => {
    option.addEventListener('click', function () {
        // Remove selected class from all options
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        this.classList.add('selected');

        // Update selected avatar
        selectedAvatar = this.dataset.avatar;

        // Update preview
        updatePreview();
    });
});

// Color selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function () {
        // Remove selected class from all color options
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        this.classList.add('selected');

        // Update selected color
        selectedColor = this.dataset.color;

        // Update preview
        updatePreview();
    });
});

// Input field updates
document.getElementById('userName').addEventListener('input', updatePreview);
document.getElementById('userEmail').addEventListener('input', updatePreview);

// Update preview function
function updatePreview() {
    const userName = document.getElementById('userName').value || 'Guest User';
    const userEmail = document.getElementById('userEmail').value || 'guest@example.com';

    // Update current avatar
    document.getElementById('currentAvatar').textContent = selectedAvatar;
    document.getElementById('currentAvatar').style.background = selectedColor;

    // Update current name
    document.getElementById('currentName').textContent = userName;

    // Update preview
    document.getElementById('previewAvatar').textContent = selectedAvatar;
    document.getElementById('previewAvatar').style.background = selectedColor;
    document.getElementById('previewName').textContent = userName;
    document.getElementById('previewEmail').textContent = userEmail;
}

// Save button
document.getElementById('saveBtn').addEventListener('click', function () {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    // Simulate saving to localStorage
    const userProfile = {
        avatar: selectedAvatar,
        name: userName,
        email: userEmail,
        themeColor: selectedColor,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Show success notification
    showNotification('บันทึกการตั้งค่าเรียบร้อยแล้ว!', 'success');

    // Add save animation
    this.innerHTML = '<i class="fa-solid fa-check me-2"></i>บันทึกแล้ว!';
    this.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

    setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-save me-2"></i>บันทึกการตั้งค่า';
        this.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    }, 2000);
});

// Cancel button
document.getElementById('cancelBtn').addEventListener('click', function () {
    // Reset to default values
    selectedAvatar = '👤';
    selectedColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    document.getElementById('userName').value = 'Guest User';
    document.getElementById('userEmail').value = 'guest@example.com';

    // Reset selections
    document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector('.avatar-option[data-avatar="👤"]').classList.add('selected');

    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector('.color-option[data-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"]').classList.add('selected');

    updatePreview();
    showNotification('ยกเลิกการแก้ไขแล้ว', 'info');
});

// Load saved profile on page load
window.addEventListener('load', function () {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);

        selectedAvatar = profile.avatar || '👤';
        selectedColor = profile.themeColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

        document.getElementById('userName').value = profile.name || 'Guest User';
        document.getElementById('userEmail').value = profile.email || 'guest@example.com';

        // Update selections
        document.querySelectorAll('.avatar-option').forEach(opt => {
            if (opt.dataset.avatar === selectedAvatar) {
                opt.classList.add('selected');
            }
        });

        document.querySelectorAll('.color-option').forEach(opt => {
            if (opt.dataset.color === selectedColor) {
                opt.classList.add('selected');
            }
        });

        updatePreview();
    }
});

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;

    const icon = type === 'success' ? 'fa-check-circle' :
        type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle';

    notification.innerHTML = `
                <i class="fa-solid ${icon} me-2"></i>
                ${message}
                <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
            `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Add hover effects to avatar options
document.querySelectorAll('.avatar-option').forEach(option => {
    option.addEventListener('mouseenter', function () {
        if (!this.classList.contains('selected')) {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        }
    });

    option.addEventListener('mouseleave', function () {
        if (!this.classList.contains('selected')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

function chooseAvatar(avatar) {
  selectedAvatar = avatar;
  console.log("เลือก Avatar:", selectedAvatar);
}