

// Khởi tạo bản đồ và đặt tâm tại một vị trí cụ thể (Sài Gòn)
const map = L.map('map').setView([10.782733, 106.667995], 19);

// Thêm layer bản đồ từ OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Biến để lưu trữ danh sách các circle hiện tại
let circles = [];

// Biến để lưu trữ marker hiện tại
let currentMarker = null;

// Lắng nghe sự kiện click trên bản đồ
map.on('click', function(e) {
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    currentMarker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);
});

// Xử lý sự kiện click của nút "Draw Circle"
document.getElementById('draw-circle').addEventListener('click', function() {
    const radius = document.getElementById('radius').value;
    if (radius && currentMarker) {
        const position = currentMarker.getLatLng();
        
        // Tạo circle mới với bán kính và vị trí do người dùng nhập vào
        const newCircle = L.circle([position.lat, position.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: parseFloat(radius)
        }).addTo(map);

        // Thêm circle mới vào danh sách
        circles.push(newCircle);

        // Nếu có nhiều hơn 4 circles, xóa cái cũ nhất
        if (circles.length > 4) {
            const oldCircle = circles.shift();
            map.removeLayer(oldCircle);
        }

        // Reset marker hiện tại
        map.removeLayer(currentMarker);
        currentMarker = null;
    } else {
        alert('Please select a position on the map and enter a radius.');
    }
});
