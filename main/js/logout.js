let inactivityTime = function () {
  let time;

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
  document.onclick = resetTimer;

  async function forcedLogout() {
    alert("You have been logged out for inactivity, please login again!");
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      response.statusText;
    }
  }

  function resetTimer() {
    clearTimeout(time);
    // logout after 30 min of inactivity
    time = setTimeout(forcedLogout, 1800000000);
  }
};

window.onload = function () {
  inactivityTime();
};