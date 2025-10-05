document.getElementById('weddingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name1 = document.getElementById('name1').value;
            const birth1 = document.getElementById('birth1').value;
            const name2 = document.getElementById('name2').value;
            const birth2 = document.getElementById('birth2').value;
            const weddingDate = document.getElementById('weddingDate').value;
            
            // Calculate compatibility (simple algorithm for demo)
            const date1 = new Date(birth1);
            const date2 = new Date(birth2);
            const wDate = new Date(weddingDate);
            
            // Simple compatibility calculation based on birth dates
            const dayDiff = Math.abs(date1.getDate() - date2.getDate());
            const monthDiff = Math.abs(date1.getMonth() - date2.getMonth());
            const compatibility = Math.max(20, 100 - (dayDiff * 2) - (monthDiff * 3) + Math.random() * 20);
            
            // Wedding date analysis
            const weddingDay = wDate.getDay();
            const weddingMonth = wDate.getMonth();
            const luckyDays = [5, 6, 0]; // Friday, Saturday, Sunday
            const luckyMonths = [1, 4, 5, 9, 10]; // Feb, May, June, Oct, Nov
            
            let dateScore = 70;
            if (luckyDays.includes(weddingDay)) dateScore += 15;
            if (luckyMonths.includes(weddingMonth)) dateScore += 15;
            
            // Generate result
            let scoreClass, scoreText, advice;
            if (compatibility >= 85) {
                scoreClass = 'score-excellent';
                scoreText = 'ยอดเยี่ยม!';
                advice = 'คู่รักของคุณเข้ากันได้อย่างสมบูรณ์แบบ! ความรักนี้จะยั่งยืนและมีความสุขตลอดไป 💕';
            } else if (compatibility >= 70) {
                scoreClass = 'score-good';
                scoreText = 'ดีมาก!';
                advice = 'คู่รักของคุณมีความเข้ากันได้ดี การสื่อสารและความเข้าใจจะทำให้ความรักแข็งแกร่งขึ้น 💖';
            } else if (compatibility >= 50) {
                scoreClass = 'score-fair';
                scoreText = 'พอใช้';
                advice = 'คู่รักของคุณต้องใช้ความพยายามในการทำความเข้าใจกัน แต่ความรักที่แท้จริงจะเอาชนะทุกอุปสรรค 💛';
            } else {
                scoreClass = 'score-poor';
                scoreText = 'ต้องปรับปรุง';
                advice = 'คู่รักของคุณอาจมีความแตกต่างกันมาก แต่ความแตกต่างนี้อาจเป็นจุดเด่นที่ทำให้เติมเต็มกัน 💙';
            }

            const resultHTML = `
                <div class="text-center mb-4">
                    <div class="compatibility-score ${scoreClass}">
                        ${Math.round(compatibility)}%
                    </div>
                    <h4 class="fw-bold ${scoreClass}">${scoreText}</h4>
                </div>
                
                <div class="result-section">
                    <h5><i class="fa-solid fa-heart me-2 text-danger"></i>ความเข้ากันของคู่รัก</h5>
                    <p class="mb-2"><strong>${name1}</strong> และ <strong>${name2}</strong></p>
                    <p>${advice}</p>
                </div>
                
                <div class="result-section">
                    <h5><i class="fa-solid fa-calendar-alt me-2 text-success"></i>การวิเคราะห์วันแต่งงาน</h5>
                    <p><strong>วันที่เลือก:</strong> ${new Date(weddingDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                    })}</p>
                    <p><strong>คะแนนวันแต่งงาน:</strong> <span class="${dateScore >= 85 ? 'text-success' : dateScore >= 70 ? 'text-info' : 'text-warning'}">${Math.round(dateScore)}%</span></p>
                    <p>${dateScore >= 85 ? '🌟 วันที่เลือกเป็นวันมงคลมาก!' : dateScore >= 70 ? '✨ วันที่เลือกเป็นวันดี!' : '💫 วันที่เลือกโอเค แต่อาจพิจารณาวันอื่นด้วย'}</p>
                </div>
                
                <div class="result-section">
                    <h5><i class="fa-solid fa-lightbulb me-2 text-warning"></i>คำแนะนำ</h5>
                    <ul class="mb-0">
                        <li>จัดงานในช่วงเวลา 09:00-11:00 น. หรือ 13:00-15:00 น.</li>
                        <li>เลือกสีธีมงานเป็นสีชมพู ทอง หรือขาว</li>
                        <li>จัดพิธีในสถานที่ที่มีความหมายพิเศษสำหรับทั้งคู่</li>
                        <li>เชิญแขกที่ใกล้ชิดและให้พรจริงใจ</li>
                    </ul>
                </div>
                
                <div class="text-center mt-4">
                    <p class="text-muted"><i class="fa-solid fa-info-circle me-1"></i>ผลการทำนายนี้เป็นเพียงการสนุกสนาน ความรักที่แท้จริงขึ้นอยู่กับใจของทั้งสองคน</p>
                </div>
            `;
            
            document.getElementById('resultContent').innerHTML = resultHTML;
            document.getElementById('result').classList.remove('d-none');
            
            // Scroll to result
            document.getElementById('result').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add celebration animation
            if (compatibility >= 85) {
                createCelebration();
            }
        });

        function createCelebration() {
            // Create floating hearts animation
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const heart = document.createElement('i');
                    heart.className = 'fa-solid fa-heart position-fixed';
                    heart.style.cssText = `
                        left: ${Math.random() * 100}vw;
                        top: 100vh;
                        color: #ff6b6b;
                        font-size: ${Math.random() * 20 + 15}px;
                        z-index: 9999;
                        pointer-events: none;
                        animation: floatUp 3s ease-out forwards;
                    `;
                    document.body.appendChild(heart);
                    
                    setTimeout(() => heart.remove(), 3000);
                }, i * 100);
            }
        }

        // Add floating animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'989b5bd1a7c81d37',t:'MTc1OTY1MDk0Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();