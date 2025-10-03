import { supabase } from '/supabase.js'

let selectedRating = 0;

// ⭐ ระบบให้คะแนน
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', function () {
        selectedRating = parseInt(this.dataset.rating);
        updateStars();
    });
    star.addEventListener('mouseenter', function () {
        highlightStars(parseInt(this.dataset.rating));
    });
});
document.getElementById('starRating').addEventListener('mouseleave', updateStars);

function highlightStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) { star.classList.add('active'); star.classList.remove('text-muted'); }
        else { star.classList.remove('active'); star.classList.add('text-muted'); }
    });
}
function updateStars() {
    stars.forEach((star, index) => {
        if (index < selectedRating) { star.classList.add('active'); star.classList.remove('text-muted'); }
        else { star.classList.remove('active'); star.classList.add('text-muted'); }
    });
}

// 📝 โหลดความคิดเห็นจาก Supabase
async function loadComments() {
    const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
    if (error) { console.error(error); return; }

    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = "";
    let total = data.length;
    let sumRating = 0, positive = 0;

    data.forEach(c => {
        const newComment = createCommentElement(c.name, c.rating, c.comment, new Date(c.created_at).toLocaleString());
        commentsContainer.appendChild(newComment);
        sumRating += c.rating;
        if (c.rating >= 4) positive++;
    });

    document.getElementById('totalComments').textContent = total;
    document.getElementById('averageRating').textContent = total > 0 ? (sumRating / total).toFixed(1) : "0.0";
    document.getElementById('positivePercent').textContent = total > 0 ? Math.round((positive / total) * 100) + "%" : "0%";
}

// ➕ ส่งความคิดเห็นไป Supabase
document.getElementById('commentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const commentText = document.getElementById('commentText').value;

    if (selectedRating === 0) { alert('กรุณาให้คะแนนด้วยครับ'); return; }

    const { error } = await supabase.from('comments').insert([
        { name: userName, email: userEmail, rating: selectedRating, comment: commentText }
    ]);

    if (error) { console.error(error); alert("เกิดข้อผิดพลาด: " + error.message); return; }

    await loadComments();
    this.reset();
    selectedRating = 0;
    updateStars();
    showSuccessToast();
});

function createCommentElement(name, rating, text, time) {
    const div = document.createElement('div');
    div.className = 'comment-card bg-light p-3 rounded mb-3';
    const stars = '⭐'.repeat(rating);
    div.innerHTML = `
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5 class="fw-bold text-dark mb-1">
                            <i class="bi bi-person-circle text-primary"></i> ${name}
                        </h5>
                        <div class="text-warning">${stars}</div>
                    </div>
                    <small class="text-muted"><i class="bi bi-clock"></i> ${time}</small>
                </div>
                <p class="text-dark mb-0">${text}</p>`;
    return div;
}

function showSuccessToast() {
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// โหลดครั้งแรก
loadComments();