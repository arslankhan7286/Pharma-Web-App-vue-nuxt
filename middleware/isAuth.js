export default function({redirect, route, store}) {
	let stringValue;
	if (process.browser) {
		stringValue = store.state.userAuth.isAuthenticated || localStorage.getItem('isAuthenticated');
	}
	const newPath = route.path.endsWith('/login/') ? route.path.slice(0, -1) : route.path;
	if (stringValue === 'true' && newPath.includes('/login')) {
		return redirect('/er/dashboard');
	}
	if (stringValue === 'false' || typeof stringValue === "undefined" || stringValue === null) {
		if (newPath.includes('/er')) {
			return redirect('/login');
		}
		if (newPath.includes('/er/dashboard')) {
		  	return redirect('/login');
		}
	}
}
