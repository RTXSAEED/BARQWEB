// رقم الطلب
let orderCounter = 1001;
const orderPrefix = "BRQ";
const part3 = "373000";

// ربط الفورم
const form = document.getElementById('orderForm');
const messageDiv = document.getElementById('formMessage');

form.addEventListener('submit', function(e){
    e.preventDefault();

    // تنظيف الرسائل السابقة
    messageDiv.innerHTML = "";

    // جلب البيانات
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const address = document.getElementById('address').value.trim();
    const restaurant = document.getElementById('restaurant').value;
    const orderType = document.getElementById('orderType').value;
    const notes = document.getElementById('notes').value.trim();

    // ✅ التحقق من البيانات

    if (name.length < 3) {
        messageDiv.innerHTML = "<p style='color:red;'>الاسم يجب ان يكون 3 أحرف على الأقل</p>";
        return;
    }

    if (!phone.startsWith("09") || phone.length !== 10) {
        messageDiv.innerHTML = "<p style='color:red;'>رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام</p>";
        return;
    }

    if (address.length < 5) {
        messageDiv.innerHTML = "<p style='color:red;'>العنوان غير كافي</p>";
        return;
    }

    if (restaurant === "") {
        messageDiv.innerHTML = "<p style='color:red;'>اختر المطعم أو المكان</p>";
        return;
    }

    if (orderType === "") {
        messageDiv.innerHTML = "<p style='color:red;'>اختر نوع الطلب</p>";
        return;
    }

    // إنشاء رقم الطلب
    const orderID = `${orderPrefix}-${orderCounter}-${part3}`;
    const now = new Date();
    const dateTime = now.toLocaleString('ar-EG', { hour12: false });

    orderCounter++;

    // حفظ البيانات
    localStorage.setItem('latestOrder', JSON.stringify({
        orderID,
        dateTime,
        name,
        phone,
        address,
        restaurant,
        orderType,
        notes
    }));

    // رسالة نجاح داخل الصفحة
    messageDiv.innerHTML = "<p style='color:green;'>✅ تم إرسال الطلب بنجاح</p>";

    // إرسال واتساب
    const whatsappNumber = "963965245016";
    const message = `مرحبًا البرق!%0Aرقم طلبي: ${orderID}%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالعنوان: ${address}%0Aالمطعم/المكان: ${restaurant}%0Aنوع الطلب: ${orderType}%0Aملاحظات: ${notes}%0Aتاريخ ووقت الطلب: ${dateTime}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    // تحويل بعد ثانيتين (ليظهر النجاح)
    setTimeout(() => {
        window.location.href = "order-info.html";
    }, 2000);
});