var parseInit = false;
if (!parseInit) {
	Parse.initialize("ms6BSiOOzXCmkZuNMEKAbk3AiDlaWff1Yutqmb5Z", "7xOFDK3eApzVXxX8ntQBPeYSAKX7t5DXmMT8O5mZ");
	parseInit = true;
}

function onClickSignIn() {
	var email = document.getElementById('usermail').value;
	var password = document.getElementById('password').value;
	Parse.User.logIn(email, password, {
		success: function(user) {
			alert('Login success');
			window.location.href = '../src/welcome.html';
		},
		error: function(user, error) {
			alert('Error: ' + error.code + ' ' + error.message);
		}
	});
}

function onClickSignUp() {
	var signUpText = document.getElementById('signInMessage');
	signUpText.style.display = 'block';
	var user = new Parse.User();
	var email = document.getElementById('usermail').value;
	var password = document.getElementById('password').value;
	console.log(password);
	user.set('username', email);
	user.set('email', email);
	user.set('password', password);
	user.signUp(null, {
		success: function(user) {
			alert('Sign up success');
			window.location.href = '../src/welcome.html';
		},
		error: function(user, error) {
			alert('Error: ' + error.code + ' ' + error.message);
		}
	});
}