
document.getElementById('payButton').addEventListener('click', function() {
	axios.post('/api/checkout').then(res => {
		window.location.href = res.data.url;
	});
});
