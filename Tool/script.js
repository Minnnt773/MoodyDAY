document.getElementById("weddingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name1 = document.getElementById("name1").value.trim();
  const birth1 = new Date(document.getElementById("birth1").value);
  const name2 = document.getElementById("name2").value.trim();
  const birth2 = new Date(document.getElementById("birth2").value);
  const weddingDate = new Date(document.getElementById("weddingDate").value);

  const resultDiv = document.getElementById("result");

  if (!name1 || !name2 || isNaN(birth1) || isNaN(birth2) || isNaN(weddingDate)) {
    resultDiv.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
    resultDiv.classList.remove("d-none", "alert-success");
    resultDiv.classList.add("alert-danger");
    return;
  }

  const compatibilityScore = calculateCompatibility(birth1, birth2);
  const weddingLucky = isAuspiciousDay(weddingDate);

  let message = `ดวงสมพงศ์ระหว่าง ${name1} และ ${name2}: ${compatibilityScore}/100\n`;
  message += `วันที่แต่งงาน ${weddingDate.toLocaleDateString("th-TH")} ถือว่า `;
  message += weddingLucky ? "เป็นวันมงคล 👍" : "ไม่ค่อยเป็นมงคลนัก ❗";

  resultDiv.textContent = message;
  resultDiv.classList.remove("d-none", "alert-danger");
  resultDiv.classList.add("alert-success");
});

function calculateCompatibility(date1, date2) {
  // ความเข้ากันเบื้องต้นโดยใช้ผลรวมของวันเกิด
  const sum1 = date1.getDate() + (date1.getMonth() + 1) + date1.getFullYear();
  const sum2 = date2.getDate() + (date2.getMonth() + 1) + date2.getFullYear();
  const diff = Math.abs(sum1 - sum2);
  const score = 100 - (diff % 100);
  return score;
}

function isAuspiciousDay(date) {
  // ถือว่าวันที่เป็นเลขคู่และวันเสาร์อาทิตย์เป็นวันมงคล (ตัวอย่างสมมุติ)
  const day = date.getDate();
  const weekDay = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day % 2 === 0 || weekDay === 0 || weekDay === 6;
}
