function navigateTo(url) {
    console.log("Redirecting to: " + url);

    document.body.style.opacity = "0.5";
    document.body.style.transition = "0.5s";

    setTimeout(() => {
        window.location.href = url
    }, 300);
}
